import WebSocket from 'isomorphic-ws';

import { SymbolWebSocketOptions } from './symbol.types.js';
import { symbolChannelPaths } from './symbolChannelPaths.js';
import type { SymbolChannel } from './symbolChannelPaths.js';

// WebSocket readyState 定数のフォールバック（テスト環境ではモックに定数がないことがあるため）
const WS_OPEN = WebSocket.OPEN ?? 1;
const WS_CONNECTING = WebSocket.CONNECTING ?? 0;

/**
 * Symbolウェブソケットクラス
 */
export class SymbolWebSocket {
  private _client!: WebSocket;
  private _uid: string | null = null;
  private isFirstMessage = true;
  private eventCallbacks: { [event: string]: ((message: WebSocket.MessageEvent) => void)[] } = {};
  private pendingSubscribes: { subscribePath: string; callback: (message: WebSocket.MessageEvent) => void }[] = [];
  private errorCallbacks: ((err: WebSocket.ErrorEvent) => void)[] = [];
  private onCloseCallback: (event: WebSocket.CloseEvent) => void = () => {};
  private connectCallbacks: ((uid: string) => void)[] = [];
  private reconnectCallbacks: ((attemptCount: number) => void)[] = [];

  // 再接続関連のプロパティ
  private options: SymbolWebSocketOptions;
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private connectionTimeoutTimer: ReturnType<typeof setTimeout> | null = null;
  private isManualDisconnect = false;
  private activeSubscriptions: Set<string> = new Set();

  /**
   * コンストラクタ
   * @param options Symbolウェブソケットオプション
   */
  constructor(options: SymbolWebSocketOptions) {
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
    const ssl = this.options.ssl ?? false;

    const protocol = ssl ? 'wss' : 'ws';
    const endPointPort = ssl ? '3001' : '3000';

    // クライアントを作成
    this._client = new WebSocket(`${protocol}://${endPointHost}:${endPointPort}/ws`);

    // 接続タイムアウトを設定
    if (this.options.timeout) {
      this.connectionTimeoutTimer = setTimeout(() => {
        if (this._client.readyState === WS_CONNECTING || !this._uid) {
          const timeoutError = new Error(`WebSocket connection timeout after ${this.options.timeout}ms`);
          const errorEvent = { error: timeoutError, message: timeoutError.message } as WebSocket.ErrorEvent;
          this.errorCallbacks.forEach((cb) => cb(errorEvent));
          this._client.close();
        }
      }, this.options.timeout);
    }

    // クライアント接続時の処理
    this._client.onclose = (event: WebSocket.CloseEvent) => {
      this.onCloseCallback(event);

      // 手動切断でない場合は再接続を試みる
      if (!this.isManualDisconnect && this.options.autoReconnect) {
        this.attemptReconnect();
      }
    };

    // エラー発生時の処理
    this._client.onerror = (err: WebSocket.ErrorEvent) => {
      this.errorCallbacks.forEach((cb) => cb(err));
    };

    // メッセージ受信時の処理
    this._client.onmessage = (message: WebSocket.MessageEvent) => {
      try {
        const data = JSON.parse(message.data.toString());
        if (this.isFirstMessage) {
          if (data.uid) {
            this._uid = data.uid;
            // 再接続成功時はカウンターをリセット
            this.reconnectAttempts = 0;

            // 接続タイムアウトタイマーをクリア
            if (this.connectionTimeoutTimer) {
              clearTimeout(this.connectionTimeoutTimer);
              this.connectionTimeoutTimer = null;
            }

            // 接続コールバックを呼び出す
            this.connectCallbacks.forEach((cb) => cb(this._uid!));

            // 再接続時は既存のサブスクリプションを復元
            this.activeSubscriptions.forEach((subscribePath) => {
              this._client.send(JSON.stringify({ uid: this._uid, subscribe: subscribePath }));
            });

            // pending subscribeをすべて送信
            this.pendingSubscribes.forEach(({ subscribePath }) => {
              this._client.send(JSON.stringify({ uid: this._uid, subscribe: subscribePath }));
              this.activeSubscriptions.add(subscribePath);
            });
            this.pendingSubscribes = [];
          }
          this.isFirstMessage = false;
          return;
        }
        const channel = data.topic;
        if (channel && this.eventCallbacks[channel]) {
          this.eventCallbacks[channel].forEach((cb) => cb(data));
        }
      } catch (e) {
        if (this.errorCallbacks.length > 0) {
          const errorEvent = { ...(e instanceof Error ? e : { message: String(e) }) } as WebSocket.ErrorEvent;
          this.errorCallbacks.forEach((cb) => cb(errorEvent));
        } else {
          throw e;
        }
      }
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

    this.reconnectAttempts++;

    // 再接続コールバックを呼び出す
    this.reconnectCallbacks.forEach((cb) => cb(this.reconnectAttempts));

    const interval = this.options.reconnectInterval ?? 3000;
    this.reconnectTimer = setTimeout(() => {
      this.isFirstMessage = true;
      this._uid = null;
      this.createConnection();
    }, interval);
  }

  /**
   * WebSocket接続完了イベント登録
   * @param callback 接続時に呼ばれるコールバック
   */
  public onConnect(callback: (uid: string) => void): void {
    this.connectCallbacks.push(callback);
    // すでに接続済みなら即時呼び出し
    if (this._uid) {
      callback(this._uid);
    }
  }

  /**
   * WebSocket再接続イベント登録
   * @param callback 再接続試行時に呼ばれるコールバック
   */
  public onReconnect(callback: (attemptCount: number) => void): void {
    this.reconnectCallbacks.push(callback);
  }

  /**
   * UID
   */
  public get uid(): string | null {
    return this._uid;
  }

  /**
   * クライアントインスタンスを取得
   */
  public get client(): WebSocket {
    return this._client;
  }

  /**
   * 接続状態を取得
   */
  public get isConnected(): boolean {
    return this._client.readyState === WS_OPEN;
  }

  /**
   * WebSocketエラーイベント登録
   * @param callback エラー時に呼ばれるコールバック
   */
  public onError(callback: (err: WebSocket.ErrorEvent) => void): void {
    this.errorCallbacks.push(callback);
  }

  /**
   * WebSocketクローズイベント登録
   * @param callback クローズ時に呼ばれるコールバック
   */
  public onClose(callback: (event: WebSocket.CloseEvent) => void): void {
    this.onCloseCallback = callback;
  }

  /**
   * チャネルサブスクメソッド
   * @param channel チャネル名
   * @param callback コールバック関数
   */
  on(channel: SymbolChannel, callback: (message: WebSocket.MessageEvent) => void): void;
  /**
   * チャネルサブスクメソッド
   * @param channel チャネル名
   * @param address アドレス
   * @param callback コールバック関数
   */
  on(channel: SymbolChannel, address: string, callback: (message: WebSocket.MessageEvent) => void): void;
  on(
    channel: SymbolChannel,
    addressOrCallback: string | ((message: WebSocket.MessageEvent) => void),
    callback?: (message: WebSocket.MessageEvent) => void
  ): void {
    // 引数を解析
    const address = typeof addressOrCallback === 'string' ? addressOrCallback : undefined;
    const actualCallback = typeof addressOrCallback === 'function' ? addressOrCallback : callback!;

    const channelPath = symbolChannelPaths[channel];

    // サブスクライブパスを決定
    const subscribePath =
      typeof channelPath.subscribe === 'function' ? channelPath.subscribe(address) : channelPath.subscribe;
    if (!subscribePath) {
      throw new Error(`Subscribe path could not be determined for channel: ${channel}`);
    }

    // コールバック登録
    if (!this.eventCallbacks[subscribePath]) {
      this.eventCallbacks[subscribePath] = [];
    }
    this.eventCallbacks[subscribePath].push(actualCallback);

    // サブスクライブメッセージ送信
    if (!this._uid) {
      // uid未取得なら保留
      this.pendingSubscribes.push({ subscribePath, callback: actualCallback });
      return;
    }

    // サブスクライブを実行
    if (this._client.readyState === WS_OPEN) {
      this._client.send(JSON.stringify({ uid: this._uid, subscribe: subscribePath }));
      this.activeSubscriptions.add(subscribePath);
    }
  }

  /**
   * チャネルアンサブスクメソッド
   * @param channel チャネル名
   */
  off(channel: SymbolChannel): void;
  /**
   * チャネルアンサブスクメソッド
   * @param channel チャネル名
   * @param address アドレス
   */
  off(channel: SymbolChannel, address: string): void;
  off(channel: SymbolChannel, address?: string): void {
    const channelPath = symbolChannelPaths[channel];

    // サブスクライブパスを決定
    const subscribePath =
      typeof channelPath.subscribe === 'function' ? channelPath.subscribe(address) : channelPath.subscribe;
    if (!subscribePath) {
      throw new Error(`Subscribe path could not be determined for channel: ${channel}`);
    }

    // コールバックをクリーンアップ
    delete this.eventCallbacks[subscribePath];
    this.activeSubscriptions.delete(subscribePath);

    // アンサブスクライブを実行
    if (this._uid && this._client.readyState === WS_OPEN) {
      this._client.send(JSON.stringify({ uid: this._uid, unsubscribe: subscribePath }));
    }
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

    // 接続タイムアウトタイマーをクリア
    if (this.connectionTimeoutTimer) {
      clearTimeout(this.connectionTimeoutTimer);
      this.connectionTimeoutTimer = null;
    }

    // すべてのコールバックをクリーンアップ
    this.eventCallbacks = {};
    this.pendingSubscribes = [];
    this.errorCallbacks = [];
    this.connectCallbacks = [];
    this.reconnectCallbacks = [];
    this.activeSubscriptions.clear();

    // WebSocketを閉じる
    if (this._client.readyState === WS_OPEN || this._client.readyState === WS_CONNECTING) {
      this._client.close();
    }

    this._uid = null;
    this.isFirstMessage = true;
    this.reconnectAttempts = 0;
  }
}
