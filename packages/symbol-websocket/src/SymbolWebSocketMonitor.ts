import WebSocket from 'isomorphic-ws';

import { SymbolWebSocketOptions } from './symbol.types.js';
import { symbolChannelPaths } from './symbolChannelPaths.js';
import type { SymbolChannel } from './symbolChannelPaths.js';

// WebSocket readyState 定数のフォールバック（テスト環境ではモックに定数がないことがあるため）
const WS_OPEN = WebSocket.OPEN ?? 1;
const WS_CONNECTING = WebSocket.CONNECTING ?? 0;

/**
 * Symbolウェブソケットモニタークラス / Symbol WebSocket Monitor Class
 */
export class SymbolWebSocketMonitor {
  private _client!: WebSocket;
  private _uid: string | null = null;
  private isFirstMessage = true;
  private eventCallbacks: { [event: string]: ((message: WebSocket.MessageEvent) => void)[] } = {};
  private pendingSubscribes: { subscribePath: string; callback: (message: WebSocket.MessageEvent) => void }[] = [];
  private errorCallbacks: ((err: WebSocket.ErrorEvent) => void)[] = [];
  private onCloseCallback: (event: WebSocket.CloseEvent) => void = () => {};
  private connectCallbacks: ((uid: string) => void)[] = [];
  private reconnectCallbacks: ((attemptCount: number) => void)[] = [];

  // 再接続関連のプロパティ / Reconnection related properties
  private options: SymbolWebSocketOptions;
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isManualDisconnect = false;
  private activeSubscriptions: Set<string> = new Set();

  /**
   * コンストラクタ / Constructor
   * @param options Symbolウェブソケットオプション / Symbol WebSocket Options
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
   * WebSocket接続を作成 / Create WebSocket connection
   */
  private createConnection(): void {
    const endPointHost = this.options.host;
    const timeout = this.options.timeout ?? 5000;
    const ssl = this.options.ssl ?? false;

    const protocol = ssl ? 'wss' : 'ws';
    const endPointPort = ssl ? '3001' : '3000';

    // クライアントを作成 / Create client
    this._client = new WebSocket(`${protocol}://${endPointHost}:${endPointPort}/ws`, { timeout: timeout });

    // クライアント接続時の処理 / On client connect
    this._client.onclose = (event: WebSocket.CloseEvent) => {
      this.onCloseCallback(event);

      // 手動切断でない場合は再接続を試みる / Try to reconnect if not manually disconnected
      if (!this.isManualDisconnect && this.options.autoReconnect) {
        this.attemptReconnect();
      }
    };

    // エラー発生時の処理 / On error occurred
    this._client.onerror = (err: WebSocket.ErrorEvent) => {
      this.errorCallbacks.forEach((cb) => cb(err));
    };

    // メッセージ受信時の処理 / On message received
    this._client.onmessage = (message: WebSocket.MessageEvent) => {
      try {
        const data = JSON.parse(message.data.toString());
        if (this.isFirstMessage) {
          if (data.uid) {
            this._uid = data.uid;
            // 再接続成功時はカウンターをリセット / Reset counter on successful reconnection
            this.reconnectAttempts = 0;

            // 接続コールバックを呼び出す / Call connect callbacks
            this.connectCallbacks.forEach((cb) => cb(this._uid!));

            // 再接続時は既存のサブスクリプションを復元 / Restore existing subscriptions on reconnect
            this.activeSubscriptions.forEach((subscribePath) => {
              this._client.send(JSON.stringify({ uid: this._uid, subscribe: subscribePath }));
            });

            // pending subscribeをすべて送信 / Send all pending subscribes
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
   * 再接続を試みる / Attempt reconnection
   */
  private attemptReconnect(): void {
    const maxAttempts = this.options.maxReconnectAttempts ?? Infinity;

    if (this.reconnectAttempts >= maxAttempts) {
      return;
    }

    this.reconnectAttempts++;

    // 再接続コールバックを呼び出す / Call reconnect callbacks
    this.reconnectCallbacks.forEach((cb) => cb(this.reconnectAttempts));

    const interval = this.options.reconnectInterval ?? 3000;
    this.reconnectTimer = setTimeout(() => {
      this.isFirstMessage = true;
      this._uid = null;
      this.createConnection();
    }, interval);
  }

  /**
   * WebSocket接続完了イベント登録 / Register WebSocket connect event
   * @param callback 接続時に呼ばれるコールバック / Callback called on connect (receives uid)
   */
  public onConnect(callback: (uid: string) => void): void {
    this.connectCallbacks.push(callback);
    // すでに接続済みなら即時呼び出し
    if (this._uid) {
      callback(this._uid);
    }
  }

  /**
   * WebSocket再接続イベント登録 / Register WebSocket reconnect event
   * @param callback 再接続試行時に呼ばれるコールバック / Callback called on reconnect attempt (receives attempt count)
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
   * クライアントインスタンスを取得 / Get client instance
   */
  public get client(): WebSocket {
    return this._client;
  }

  /**
   * 接続状態を取得 / Get connection status
   */
  public get isConnected(): boolean {
    return this._client.readyState === WS_OPEN;
  }

  /**
   * WebSocketエラーイベント登録 / Register WebSocket error event
   * @param callback エラー時に呼ばれるコールバック / Callback called on error
   */
  public onError(callback: (err: WebSocket.ErrorEvent) => void): void {
    this.errorCallbacks.push(callback);
  }

  /**
   * WebSocketクローズイベント登録 / Register WebSocket close event
   * @param callback クローズ時に呼ばれるコールバック / Callback called on close
   */
  public onClose(callback: (event: WebSocket.CloseEvent) => void): void {
    this.onCloseCallback = callback;
  }

  /**
   * チャネルサブスクメソッド / Channel Subscription Method
   * @param channel チャネル名 / Channel name
   * @param callback コールバック関数 / Callback function
   */
  on(channel: SymbolChannel, callback: (message: WebSocket.MessageEvent) => void): void;
  /**
   * チャネルサブスクメソッド / Channel Subscription Method
   * @param channel チャネル名 / Channel name
   * @param address アドレス / Address
   * @param callback コールバック関数 / Callback function
   */
  on(channel: SymbolChannel, address: string, callback: (message: WebSocket.MessageEvent) => void): void;
  on(
    channel: SymbolChannel,
    addressOrCallback: string | ((message: WebSocket.MessageEvent) => void),
    callback?: (message: WebSocket.MessageEvent) => void
  ): void {
    // 引数を解析 / Parse arguments
    const address = typeof addressOrCallback === 'string' ? addressOrCallback : undefined;
    const actualCallback = typeof addressOrCallback === 'function' ? addressOrCallback : callback!;

    const channelPath = symbolChannelPaths[channel];

    // サブスクライブパスを決定 / Determine subscribe path
    const subscribePath =
      typeof channelPath.subscribe === 'function' ? channelPath.subscribe(address) : channelPath.subscribe;
    if (!subscribePath) {
      throw new Error(`Subscribe path could not be determined for channel: ${channel}`);
    }

    // コールバック登録 / Register callback
    if (!this.eventCallbacks[subscribePath]) {
      this.eventCallbacks[subscribePath] = [];
    }
    this.eventCallbacks[subscribePath].push(actualCallback);

    // サブスクライブメッセージ送信 / Send subscribe message
    if (!this._uid) {
      // uid未取得なら保留 / If UID is not obtained, hold
      this.pendingSubscribes.push({ subscribePath, callback: actualCallback });
      return;
    }

    // サブスクライブを実行 / Execute subscription
    if (this._client.readyState === WS_OPEN) {
      this._client.send(JSON.stringify({ uid: this._uid, subscribe: subscribePath }));
      this.activeSubscriptions.add(subscribePath);
    }
  }

  /**
   * チャネルアンサブスクメソッド / Channel Unsubscription Method
   * @param channel チャネル名 / Channel name
   */
  off(channel: SymbolChannel): void;
  /**
   * チャネルアンサブスクメソッド / Channel Unsubscription Method
   * @param channel チャネル名 / Channel name
   * @param address アドレス / Address
   */
  off(channel: SymbolChannel, address: string): void;
  off(channel: SymbolChannel, address?: string): void {
    const channelPath = symbolChannelPaths[channel];

    // サブスクライブパスを決定 / Determine subscribe path
    const subscribePath =
      typeof channelPath.subscribe === 'function' ? channelPath.subscribe(address) : channelPath.subscribe;
    if (!subscribePath) {
      throw new Error(`Subscribe path could not be determined for channel: ${channel}`);
    }

    // コールバックをクリーンアップ / Cleanup callbacks
    delete this.eventCallbacks[subscribePath];
    this.activeSubscriptions.delete(subscribePath);

    // アンサブスクライブを実行 / Execute unsubscription
    if (this._uid && this._client.readyState === WS_OPEN) {
      this._client.send(JSON.stringify({ uid: this._uid, unsubscribe: subscribePath }));
    }
  }

  /**
   * WebSocket接続を切断 / Disconnect WebSocket
   */
  disconnect(): void {
    // 手動切断フラグを立てる / Set manual disconnect flag
    this.isManualDisconnect = true;

    // 再接続タイマーをクリア / Clear reconnect timer
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    // すべてのコールバックをクリーンアップ / Cleanup all callbacks
    this.eventCallbacks = {};
    this.pendingSubscribes = [];
    this.errorCallbacks = [];
    this.connectCallbacks = [];
    this.reconnectCallbacks = [];
    this.activeSubscriptions.clear();

    // WebSocketを閉じる / Close WebSocket
    if (this._client.readyState === WS_OPEN || this._client.readyState === WS_CONNECTING) {
      this._client.close();
    }

    this._uid = null;
    this.isFirstMessage = true;
    this.reconnectAttempts = 0;
  }
}
