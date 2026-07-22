import { Client, type IFrame, StompSubscription } from '@stomp/stompjs';
import WebSocket from 'isomorphic-ws';

import {
  NemWebSocketError,
  NemWebSocketErrorSeverity,
  NemWebSocketErrorType,
  NemWebSocketOptions,
} from './nem.types.js';
import { nemChannelPaths } from './nemChannelPaths.js';
import type { NemChannel } from './nemChannelPaths.js';

/**
 * NEMウェブソケットモニタークラス
 */
export class NemWebSocket {
  private _client!: Client;
  private _isConnected = false;
  private _uid: string | null = null;
  private subscriptions: Map<string, Map<(message: string) => void, StompSubscription>> = new Map();
  private errorCallbacks: ((err: NemWebSocketError) => void)[] = [];
  private onCloseCallback: (event: WebSocket.CloseEvent) => void = () => {};
  private connectCallbacks: ((uid: string) => void)[] = [];
  private reconnectCallbacks: ((attemptCount: number) => void)[] = [];

  // 再接続関連のプロパティ
  private options: NemWebSocketOptions;
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isManualDisconnect = false;
  private activeSubscriptions: Map<string, Set<(message: string) => void>> = new Map();

  /**
   * コンストラクタ
   *
   * @param options NEMウェブソケットオプション
   */
  constructor(options: NemWebSocketOptions) {
    this.options = {
      autoReconnect: true,
      maxReconnectAttempts: Infinity,
      reconnectInterval: 3000,
      ...options,
    };

    this.createConnection();
  }

  /**
   * WebSocket接続を作成
   */
  private createConnection(): void {
    const endPointHost = this.options.host;
    const timeout = this.options.timeout ?? 5000;
    const ssl = this.options.ssl ?? false;

    const protocol = ssl ? 'wss' : 'ws';
    const endPointPort = ssl ? '7779' : '7778';

    // クライアントを作成
    const client = new Client({
      connectionTimeout: timeout,
      reconnectDelay: 0, // 手動で再接続を管理
      webSocketFactory: () => new WebSocket(`${protocol}://${endPointHost}:${endPointPort}/w/messages/websocket`),
    });
    this._client = client;

    // クライアントエラー時の処理
    client.onWebSocketError = (event: WebSocket.ErrorEvent) => {
      if (this._client !== client) {
        return;
      }
      const contextualError = this.createContextualError(
        'network',
        'recoverable',
        event,
        (event as WebSocket.ErrorEvent).message || 'WebSocket network error'
      );
      if (this.errorCallbacks.length > 0) {
        this.errorCallbacks.forEach((cb) => cb(contextualError));
      } else {
        console.warn('[NemWebSocket]', contextualError);
      }
    };

    // クライアントクローズ時の処理
    client.onWebSocketClose = (event: WebSocket.CloseEvent) => {
      if (this._client !== client) {
        return;
      }
      this._isConnected = false;
      this._uid = null;
      this.subscriptions.clear();
      this.onCloseCallback(event);

      // 手動切断でない場合は再接続を試みる
      if (!this.isManualDisconnect && this.options.autoReconnect) {
        this.attemptReconnect();
      }
    };

    // クライアント接続時の処理
    client.onConnect = (frame?: IFrame) => {
      if (this._client !== client) {
        return;
      }
      this._isConnected = true;
      // 再接続成功時はカウンターをリセット
      this.reconnectAttempts = 0;

      const connectionId = frame?.headers?.session ?? frame?.headers?.server ?? `${endPointHost}:${endPointPort}`;
      this._uid = connectionId;

      // 接続コールバックを呼び出す
      this.connectCallbacks.forEach((cb) => cb(this._uid!));

      // 再接続時は既存のサブスクリプションを復元
      this.subscriptions.clear();
      this.activeSubscriptions.forEach((callbacks, subscribePath) => {
        callbacks.forEach((callback) => this.subscribe(subscribePath, callback));
      });
    };

    // クライアント切断時の処理
    client.onDisconnect = () => {
      if (this._client !== client) {
        return;
      }
      this._isConnected = false;
      this._uid = null;
      // サブスクリプションをクリア（再接続時に復元される）
      this.subscriptions.clear();
    };

    // クライアントをアクティブ化
    client.activate();
  }

  /**
   * アクティブな購読を登録する
   *
   * @returns 新しく登録された場合はtrue
   */
  private addActiveSubscription(subscribePath: string, callback: (message: string) => void): boolean {
    let callbacks = this.activeSubscriptions.get(subscribePath);
    if (!callbacks) {
      callbacks = new Set();
      this.activeSubscriptions.set(subscribePath, callbacks);
    }

    if (callbacks.has(callback)) {
      return false;
    }

    callbacks.add(callback);
    return true;
  }

  /**
   * STOMPサブスクリプションを作成して追跡する
   */
  private subscribe(subscribePath: string, callback: (message: string) => void): void {
    const subscription = this._client.subscribe(subscribePath, (message) => callback(message.body));
    let subscriptions = this.subscriptions.get(subscribePath);
    if (!subscriptions) {
      subscriptions = new Map();
      this.subscriptions.set(subscribePath, subscriptions);
    }
    subscriptions.set(callback, subscription);
  }

  /**
   * コンテキスト付きエラーを生成
   */
  private createContextualError(
    type: NemWebSocketErrorType,
    severity: NemWebSocketErrorSeverity,
    originalError: WebSocket.ErrorEvent | Error,
    message: string
  ): NemWebSocketError {
    return {
      type,
      severity,
      host: this.options.host,
      reconnecting: severity === 'recoverable' && this.reconnectAttempts > 0,
      reconnectAttempts: this.reconnectAttempts,
      originalError,
      timestamp: Date.now(),
      message,
    };
  }

  /**
   * 再接続を試みる
   */
  private attemptReconnect(): void {
    const maxAttempts = this.options.maxReconnectAttempts ?? Infinity;

    if (this.reconnectAttempts >= maxAttempts) {
      return;
    }

    if (this.reconnectTimer) {
      return;
    }

    this.reconnectAttempts++;

    // 再接続コールバックを呼び出す
    this.reconnectCallbacks.forEach((cb) => cb(this.reconnectAttempts));

    const interval = this.options.reconnectInterval ?? 3000;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (!this.isManualDisconnect) {
        this.createConnection();
      }
    }, interval);
  }

  /**
   * クライアントインスタンスを取得
   */
  public get client(): Client {
    return this._client;
  }

  /**
   * UID (STOMP session ID or fallback identifier)
   */
  public get uid(): string | null {
    return this._uid;
  }

  /**
   * 接続状態を取得
   */
  public get isConnected(): boolean {
    return this._isConnected;
  }

  /**
   * WebSocket接続完了イベント登録
   *
   * @param callback 接続時に呼ばれるコールバック
   */
  public onConnect(callback: (uid: string) => void): void {
    this.connectCallbacks.push(callback);
    // すでに接続済みなら即時呼び出し
    if (this._isConnected) {
      callback(this._uid ?? this.options.host);
    }
  }

  /**
   * WebSocket再接続イベント登録
   *
   * @param callback 再接続試行時に呼ばれるコールバック
   */
  public onReconnect(callback: (attemptCount: number) => void): void {
    this.reconnectCallbacks.push(callback);
  }

  /**
   * チャネルサブスクメソッド
   *
   * @param channel チャネル名
   * @param callback コールバック関数
   */
  on(channel: NemChannel, callback: (message: string) => void): void;

  /**
   * チャネルサブスクメソッド
   *
   * @param channel チャネル名
   * @param address アドレス
   * @param callback コールバック関数
   */
  on(channel: NemChannel, address: string, callback: (message: string) => void): void;

  /**
   * チャネルサブスクメソッド実装
   *
   * @param channel チャネル名
   * @param addressOrCallback アドレスまたはコールバック関数
   * @param callback コールバック関数
   */
  on(
    channel: NemChannel,
    addressOrCallback: string | ((message: string) => void),
    callback?: (message: string) => void
  ): void {
    // 引数を解析
    const address = typeof addressOrCallback === 'string' ? addressOrCallback : undefined;
    const actualCallback = typeof addressOrCallback === 'function' ? addressOrCallback : callback!;

    const channelPath = nemChannelPaths[channel];

    // アドレスが必要なチャネルでアドレスが提供されていない場合、エラーをスロー
    if (typeof channelPath.subscribe === 'function' && !address) {
      throw new Error(`Address parameter is required for channel: ${channel}`);
    }

    // サブスクライブパスを決定
    const subscribePath =
      typeof channelPath.subscribe === 'function' ? channelPath.subscribe(address) : channelPath.subscribe;
    if (!subscribePath) {
      throw new Error(`Subscribe path could not be determined for channel: ${channel}`);
    }

    if (!this.addActiveSubscription(subscribePath, actualCallback)) {
      return;
    }

    // 接続されていない場合、接続時にアクティブな購読を復元する
    if (!this._isConnected) {
      return;
    }

    // サブスクライブを実行
    try {
      this.subscribe(subscribePath, actualCallback);
    } catch (error) {
      const callbacks = this.activeSubscriptions.get(subscribePath);
      callbacks?.delete(actualCallback);
      if (callbacks?.size === 0) {
        this.activeSubscriptions.delete(subscribePath);
      }
      throw error;
    }
  }

  /**
   * WebSocketエラーイベント登録
   *
   * @param callback エラー時に呼ばれるコールバック
   */
  public onError(callback: (err: NemWebSocketError) => void): void {
    this.errorCallbacks.push(callback);
  }

  /**
   * WebSocketクローズイベント登録
   *
   * @param callback クローズ時に呼ばれるコールバック
   */
  public onClose(callback: (event: WebSocket.CloseEvent) => void): void {
    this.onCloseCallback = callback;
  }

  /**
   * チャネルアンサブスクメソッド
   *
   * @param channel チャネル名
   */
  off(channel: NemChannel): void;

  /**
   * チャネルアンサブスクメソッド
   *
   * @param channel チャネル名
   * @param address アドレス
   */
  off(channel: NemChannel, address: string): void;

  /**
   * チャネルアンサブスクメソッド実装
   *
   * @param channel チャネル名
   * @param address アドレス
   */
  off(channel: NemChannel, address?: string): void {
    const channelPath = nemChannelPaths[channel];

    if (typeof channelPath.subscribe === 'function' && !address) {
      throw new Error(`Address parameter is required for channel: ${channel}`);
    }

    // サブスクライブパスを決定
    const subscribePath =
      typeof channelPath.subscribe === 'function' ? channelPath.subscribe(address) : channelPath.subscribe;
    if (!subscribePath) {
      throw new Error(`Subscribe path could not be determined for channel: ${channel}`);
    }

    // アンサブスクライブを実行
    const subscriptions = this.subscriptions.get(subscribePath);
    if (subscriptions) {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
      this.subscriptions.delete(subscribePath);
    }
    // activeSubscriptionsからも削除
    this.activeSubscriptions.delete(subscribePath);
  }

  /**
   * WebSocket接続を切断
   */
  disconnect(): void {
    // 手動切断フラグを立てる
    this.isManualDisconnect = true;

    // 再接続タイマーをクリア
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    // すべてのサブスクリプションを解除
    this.subscriptions.forEach((subscriptions) => subscriptions.forEach((subscription) => subscription.unsubscribe()));
    this.subscriptions.clear();
    this.activeSubscriptions.clear();

    // すべてのコールバックをクリーンアップ
    this.errorCallbacks = [];
    this.connectCallbacks = [];
    this.reconnectCallbacks = [];

    // クライアントを非アクティブ化
    this._client.deactivate();
    this._isConnected = false;
    this._uid = null;
    this.reconnectAttempts = 0;
  }

  /**
   * WebSocket接続を切断（disconnectのエイリアス）
   */
  close(): void {
    this.disconnect();
  }
}
