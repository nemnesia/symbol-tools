import WebSocket from 'isomorphic-ws';

import {
  SymbolWebSocketError,
  SymbolWebSocketErrorSeverity,
  SymbolWebSocketErrorType,
  SymbolWebSocketOptions,
} from './symbol.types.js';
import { symbolChannelPaths } from './symbolChannelPaths.js';
import type { SymbolChannel } from './symbolChannelPaths.js';
import type { SymbolNotificationMap } from './symbolNotifications.types.js';

// WebSocket readyState 定数のフォールバック（テスト環境ではモックに定数がないことがあるため）
const WS_OPEN = WebSocket.OPEN ?? 1;
const WS_CONNECTING = WebSocket.CONNECTING ?? 0;

/**
 * Symbol ノードの WebSocket Gateway に接続し、通知チャネルを購読するクライアント。
 *
 * @remarks
 * インスタンス生成時に接続を開始します。接続完了前や再接続待機中に登録した購読は、
 * UID を受信した時点で自動的に送信されます。自動再接続が有効な場合、既存の購読は
 * 新しい接続へ復元されます。
 *
 * `disconnect()` は接続だけでなく、登録済みのすべてのコールバックと購読も破棄します。
 * 接続を再開する API はないため、切断後に再度利用する場合は新しいインスタンスを作成してください。
 */
export class SymbolWebSocket {
  private _client!: WebSocket;
  private _uid: string | null = null;
  private isFirstMessage = true;
  private eventCallbacks: { [event: string]: ((message: unknown) => void)[] } = {};
  private pendingSubscribes: Set<string> = new Set();
  private errorCallbacks: ((err: SymbolWebSocketError) => void)[] = [];
  private onCloseCallback: (event: WebSocket.CloseEvent) => void = () => {};
  private connectCallbacks: ((uid: string) => void)[] = [];
  private reconnectCallbacks: ((attemptCount: number) => void)[] = [];

  // 再接続関連のプロパティ
  private options: SymbolWebSocketOptions;
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private connectionTimeoutTimer: ReturnType<typeof setTimeout> | null = null;
  private isManualDisconnect = false;
  private isFatalError = false;
  private activeSubscriptions: Set<string> = new Set();

  /**
   * 接続を開始します。
   *
   * @param options 接続先と再接続動作の設定。
   */
  constructor(options: SymbolWebSocketOptions) {
    this.options = {
      autoReconnect: true,
      maxReconnectAttempts: Infinity,
      reconnectInterval: 3000,
      timeout: 10000,
      ...options,
    };

    this.createConnection();
  }

  /**
   * WebSocket接続を作成
   */
  private createConnection(): void {
    this.clearConnectionTimeout();

    const endPointHost = this.options.host;
    const ssl = this.options.ssl ?? true;

    const protocol = ssl ? 'wss' : 'ws';
    const endPointPort = ssl ? '3001' : '3000';

    // クライアントを作成
    const client = new WebSocket(`${protocol}://${endPointHost}:${endPointPort}/ws`);
    this._client = client;

    // 接続タイムアウトを設定
    if (this.options.timeout) {
      this.connectionTimeoutTimer = setTimeout(() => {
        if (this._client !== client) {
          return;
        }

        this.connectionTimeoutTimer = null;
        if (client.readyState === WS_CONNECTING || !this._uid) {
          const timeoutError = new Error(`WebSocket connection timeout after ${this.options.timeout}ms`);
          const contextualError = this.createContextualError('timeout', 'fatal', timeoutError, 'Connection timeout');
          this.isFatalError = true;
          if (this.errorCallbacks.length > 0) {
            this.errorCallbacks.forEach((cb) => cb(contextualError));
          } else {
            console.warn('[SymbolWebSocket]', contextualError);
          }
          client.close();
        }
      }, this.options.timeout);
    }

    // クライアント接続時の処理
    client.onclose = (event: WebSocket.CloseEvent) => {
      if (this._client !== client) {
        return;
      }

      this.clearConnectionTimeout();
      this._uid = null;
      this.isFirstMessage = true;
      this.onCloseCallback(event);

      // 手動切断でない場合、かつfatalエラーでない場合は再接続を試みる
      if (!this.isManualDisconnect && !this.isFatalError && this.options.autoReconnect) {
        this.attemptReconnect();
      }

      // fatalフラグをリセット（次の接続のため）
      this.isFatalError = false;
    };

    // エラー発生時の処理
    client.onerror = (err: WebSocket.ErrorEvent) => {
      if (this._client !== client) {
        return;
      }

      const contextualError = this.createContextualError(
        'network',
        'recoverable',
        err,
        err.message || 'WebSocket network error'
      );
      if (this.errorCallbacks.length > 0) {
        this.errorCallbacks.forEach((cb) => cb(contextualError));
      } else {
        console.warn('[SymbolWebSocket]', contextualError);
      }
    };

    // メッセージ受信時の処理
    client.onmessage = (message: WebSocket.MessageEvent) => {
      if (this._client !== client) {
        return;
      }

      let data: unknown;
      try {
        data = JSON.parse(message.data.toString());
      } catch (e) {
        if (this.errorCallbacks.length > 0) {
          const error = e instanceof Error ? e : new Error(String(e));
          const contextualError = this.createContextualError(
            'parse',
            'recoverable',
            error,
            'Failed to parse WebSocket message'
          );
          this.errorCallbacks.forEach((cb) => cb(contextualError));
        } else {
          throw e;
        }
        return;
      }

      if (this.isFirstMessage) {
        const uid =
          typeof data === 'object' && data !== null && 'uid' in data && typeof data.uid === 'string' ? data.uid : null;
        if (!uid) {
          return;
        }

        this._uid = uid;
        // 再接続成功時はカウンターをリセット
        this.reconnectAttempts = 0;
        this.clearConnectionTimeout();

        // 接続コールバックを呼び出す
        this.connectCallbacks.forEach((cb) => cb(uid));

        // 再接続時は既存のサブスクリプションを復元
        this.activeSubscriptions.forEach((subscribePath) => {
          client.send(JSON.stringify({ uid, subscribe: subscribePath }));
        });

        // 保留中のサブスクリプションを送信
        this.pendingSubscribes.forEach((subscribePath) => {
          if (!this.activeSubscriptions.has(subscribePath)) {
            client.send(JSON.stringify({ uid, subscribe: subscribePath }));
            this.activeSubscriptions.add(subscribePath);
          }
        });
        this.pendingSubscribes.clear();
        this.isFirstMessage = false;
        return;
      }

      const channel =
        typeof data === 'object' && data !== null && 'topic' in data && typeof data.topic === 'string' ? data.topic : null;
      if (channel && this.eventCallbacks[channel]) {
        this.eventCallbacks[channel].forEach((cb) => cb(data));
      }
    };
  }

  /**
   * 接続タイムアウトタイマーを解除
   */
  private clearConnectionTimeout(): void {
    if (this.connectionTimeoutTimer) {
      clearTimeout(this.connectionTimeoutTimer);
      this.connectionTimeoutTimer = null;
    }
  }

  /**
   * コンテキスト付きエラーを生成
   *
   * @param type エラータイプ
   * @param severity エラーの深刻度
   * @param originalError 元のエラーオブジェクト
   * @param message エラーメッセージ
   * @returns コンテキスト付きSymbolWebSocketErrorオブジェクト
   */
  private createContextualError(
    type: SymbolWebSocketErrorType,
    severity: SymbolWebSocketErrorSeverity,
    originalError: WebSocket.ErrorEvent | Error,
    message: string
  ): SymbolWebSocketError {
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

    if (this.reconnectTimer || this.reconnectAttempts >= maxAttempts) {
      return;
    }

    this.reconnectAttempts++;

    // 再接続コールバックを呼び出す
    this.reconnectCallbacks.forEach((cb) => cb(this.reconnectAttempts));

    const interval = this.options.reconnectInterval ?? 3000;
    const disconnectedClient = this._client;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (this.isManualDisconnect || this._client !== disconnectedClient) {
        return;
      }

      // 古いWebSocketを明示的にclose
      if (disconnectedClient.readyState === WS_OPEN || disconnectedClient.readyState === WS_CONNECTING) {
        disconnectedClient.close();
      }

      this.isFirstMessage = true;
      this._uid = null;
      this.createConnection();
    }, interval);
  }

  /**
   * 接続完了時のコールバックを登録します。
   *
   * @remarks
   * 初回接続と自動再接続の両方で呼び出されます。すでに接続済みの場合は、登録時に
   * 現在の UID を渡して直ちに 1 回呼び出します。
   *
   * @param callback Gateway から受信した接続 UID を受け取るコールバック。
   */
  public onConnect(callback: (uid: string) => void): void {
    this.connectCallbacks.push(callback);
    // すでに接続済みなら即時呼び出し
    if (this._uid) {
      callback(this._uid);
    }
  }

  /**
   * 自動再接続を開始する直前のコールバックを登録します。
   *
   * @param callback 1 始まりの再接続試行回数を受け取るコールバック。
   */
  public onReconnect(callback: (attemptCount: number) => void): void {
    this.reconnectCallbacks.push(callback);
  }

  /**
   * 現在の接続の Gateway UID。
   *
   * @returns 接続完了前・切断中・切断後は `null`。
   */
  public get uid(): string | null {
    return this._uid;
  }

  /**
   * 現在の内部 WebSocket クライアント。
   *
   * @remarks 自動再接続後は新しいインスタンスに置き換わります。外部から `send` や
   * イベントハンドラを操作せず、公開メソッドを使用してください。
   */
  public get client(): WebSocket {
    return this._client;
  }

  /**
   * ソケットが OPEN 状態かどうか。
   *
   * @returns Gateway UID の受信前でも、WebSocket が OPEN なら `true`。
   */
  public get isConnected(): boolean {
    return this._client.readyState === WS_OPEN;
  }

  /**
   * 構造化された WebSocket エラーのコールバックを追加します。
   *
   * @remarks
   * 複数のコールバックを登録できます。未登録の場合はエラーを `console.warn` に出力します。
   * JSON の解析に失敗した場合も、このコールバックに `type: 'parse'` のエラーを渡します。
   *
   * @param callback エラー情報を受け取るコールバック。
   */
  public onError(callback: (err: SymbolWebSocketError) => void): void {
    this.errorCallbacks.push(callback);
  }

  /**
   * WebSocket のクローズコールバックを設定します。
   *
   * @remarks このメソッドはコールバックを追加せず、以前に設定したコールバックを置き換えます。
   *
   * @param callback クローズイベントを受け取るコールバック。
   */
  public onClose(callback: (event: WebSocket.CloseEvent) => void): void {
    this.onCloseCallback = callback;
  }

  /**
   * アドレスを指定せずに通知チャネルを購読します。
   *
   * @param channel 購読する Symbol 通知チャネル。
   * @param callback パース済みの通知エンベロープを受け取るコールバック。
   */
  on<K extends SymbolChannel>(channel: K, callback: (message: SymbolNotificationMap[K]) => void): void;

  /**
   * アドレスを指定して通知チャネルを購読します。
   *
   * @param channel 購読する Symbol 通知チャネル。
   * @param address チャネルパスに付加する Symbol アドレス。
   * @param callback パース済みの通知エンベロープを受け取るコールバック。
   */
  on<K extends SymbolChannel>(channel: K, address: string, callback: (message: SymbolNotificationMap[K]) => void): void;

  /**
   * チャネルサブスクメソッド実装
   *
   * @param channel チャネル名
   * @param addressOrCallback アドレスまたはコールバック関数
   * @param callback コールバック関数
   */
  on<K extends SymbolChannel>(
    channel: K,
    addressOrCallback: string | ((message: SymbolNotificationMap[K]) => void),
    callback?: (message: SymbolNotificationMap[K]) => void
  ): void {
    // 引数を解析
    const address = typeof addressOrCallback === 'string' ? addressOrCallback : undefined;
    const actualCallback = (typeof addressOrCallback === 'function' ? addressOrCallback : callback) as (
      message: unknown
    ) => void;

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
    if (!this._uid || this._client.readyState !== WS_OPEN) {
      // 接続未完了・再接続待機中なら保留
      this.pendingSubscribes.add(subscribePath);
      return;
    }

    // サブスクライブを実行
    if (!this.activeSubscriptions.has(subscribePath)) {
      this._client.send(JSON.stringify({ uid: this._uid, subscribe: subscribePath }));
      this.activeSubscriptions.add(subscribePath);
    }
  }

  /**
   * アドレスを指定しないチャネルの購読を解除します。
   *
   * @remarks 同じチャネルに登録したすべてのコールバックを解除します。
   *
   * @param channel 解除する Symbol 通知チャネル。
   */
  off(channel: SymbolChannel): void;

  /**
   * アドレスを指定したチャネルの購読を解除します。
   *
   * @remarks 同じチャネル・アドレスに登録したすべてのコールバックを解除します。
   *
   * @param channel 解除する Symbol 通知チャネル。
   * @param address チャネルパスに付加した Symbol アドレス。
   */
  off(channel: SymbolChannel, address: string): void;

  /**
   * チャネルアンサブスクメソッド
   *
   * @param channel チャネル名
   * @param address アドレス
   */
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
    this.pendingSubscribes.delete(subscribePath);

    // アンサブスクライブを実行
    if (this._uid && this._client.readyState === WS_OPEN) {
      this._client.send(JSON.stringify({ uid: this._uid, unsubscribe: subscribePath }));
    }
  }

  /**
   * 接続を手動で切断し、すべての購読とコールバックを破棄します。
   *
   * @remarks 自動再接続は行われません。再び接続するには新しいインスタンスを作成してください。
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
    this.clearConnectionTimeout();

    // すべてのコールバックをクリーンアップ
    this.eventCallbacks = {};
    this.pendingSubscribes.clear();
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
    this.isFatalError = false;
  }

  /**
   * {@link disconnect} のエイリアス。
   */
  close(): void {
    this.disconnect();
  }
}
