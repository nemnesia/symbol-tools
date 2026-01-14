import { SymbolChannel, SymbolWebSocket, SymbolWebSocketError } from '@nemnesia/symbol-websocket';

type EventCallback = (payload: unknown) => void;
type ErrorCallback = (error: SymbolWebSocketError) => void;

interface SymbolEventStreamOptions {
  /** ノードのURLリスト */
  nodeUrls: string[];
  /** 接続数 */
  connections: number;
  /** SSL使用有無 */
  ssl?: boolean;
  /** 重複排除キャッシュの最大サイズ（デフォルト: 10000） */
  maxCacheSize?: number;
  /** 重複排除キャッシュのTTL（ミリ秒、デフォルト: 60000 = 1分） */
  cacheTtl?: number;
}

interface CachedId {
  timestamp: number;
}

/**
 * Symbolイベントストリームクラス
 */
export class SymbolEventStream {
  private sockets: SymbolWebSocket[] = [];
  private callbacks: Map<string, Set<EventCallback>> = new Map();
  private errorCallbacks: Set<ErrorCallback> = new Set();

  // 重複通知排除用（tx hash / uid など）タイムスタンプ付き
  private seenIds: Map<string, CachedId> = new Map();
  private readonly maxCacheSize: number;
  private readonly cacheTtl: number;
  private cleanupInterval: ReturnType<typeof setInterval> | null = null;
  private closed = false;

  /**
   * コンストラクタ
   *
   * @param options オプション
   */
  constructor(options: SymbolEventStreamOptions) {
    const { nodeUrls, connections, ssl = true, maxCacheSize = 10_000, cacheTtl = 60_000 } = options;

    if (nodeUrls.length === 0) {
      throw new Error('nodeUrls must not be empty');
    }

    this.maxCacheSize = maxCacheSize;
    this.cacheTtl = cacheTtl;

    const picked = this.pickNodes(nodeUrls, connections);

    for (const host of picked) {
      const ws = new SymbolWebSocket({
        host,
        ssl,
        autoReconnect: true,
      });

      ws.onError((err) => {
        this.errorCallbacks.forEach((cb) => cb(err));
      });

      this.sockets.push(ws);
    }

    // 定期的に古いキャッシュをクリーンアップ（TTLの半分の間隔で実行）
    this.cleanupInterval = setInterval(() => {
      this.cleanupExpiredCache();
    }, this.cacheTtl / 2);
  }

  /**
   * イベント購読（全アドレス）
   *
   * @param channel チャネル
   * @param callback コールバック
   */
  public on(channel: SymbolChannel, callback: EventCallback): void;

  /**
   * イベント購読（特定のアドレス）
   * @param channel チャネル
   * @param address アドレス
   * @param callback コールバック
   */
  public on(channel: SymbolChannel, address: string, callback: EventCallback): void;

  /**
   * イベント購読（実装）
   * @param channel チャネル
   * @param addressOrCallback アドレスまたはコールバック
   * @param maybeCallback コールバック（address指定時）
   */
  public on(channel: SymbolChannel, addressOrCallback: string | EventCallback, maybeCallback?: EventCallback): void {
    const address = typeof addressOrCallback === 'string' ? addressOrCallback : undefined;

    const callback = typeof addressOrCallback === 'function' ? addressOrCallback : maybeCallback!;

    const key = this.makeKey(channel, address);

    if (!this.callbacks.has(key)) {
      this.callbacks.set(key, new Set());

      // 初回登録時のみ下位 WS に subscribe
      for (const ws of this.sockets) {
        address
          ? ws.on(channel, address, (msg) => this.dispatch(key, msg))
          : ws.on(channel, (msg) => this.dispatch(key, msg));
      }
    }

    this.callbacks.get(key)!.add(callback);
  }

  /**
   * イベント解除（特定のコールバックまたは全て）
   *
   * @param channel チャネル
   * @param callback コールバック
   */
  public off(channel: SymbolChannel, callback?: EventCallback): void;

  /**
   * イベント解除（特定のアドレスとコールバックまたは全て）
   * @param channel チャネル
   * @param address アドレス
   * @param callback コールバック
   */
  public off(channel: SymbolChannel, address: string, callback?: EventCallback): void;

  /**
   * イベント解除（実装）
   * @param channel チャネル
   * @param addressOrCallback アドレスまたはコールバック
   * @param maybeCallback コールバック（address指定時）
   */
  public off(channel: SymbolChannel, addressOrCallback?: string | EventCallback, maybeCallback?: EventCallback): void {
    const address = typeof addressOrCallback === 'string' ? addressOrCallback : undefined;
    const callback = typeof addressOrCallback === 'function' ? addressOrCallback : maybeCallback;

    const key = this.makeKey(channel, address);

    if (!this.callbacks.has(key)) return;

    const callbacks = this.callbacks.get(key)!;

    if (callback) {
      // 特定のコールバックのみ削除
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.callbacks.delete(key);
        // 全てのコールバックが削除されたらWebSocketの購読も解除
        for (const ws of this.sockets) {
          address ? ws.off(channel, address) : ws.off(channel);
        }
      }
    } else {
      // 全てのコールバックを削除
      this.callbacks.delete(key);
      for (const ws of this.sockets) {
        address ? ws.off(channel, address) : ws.off(channel);
      }
    }
  }

  /**
   * エラー購読
   *
   * @param callback エラーコールバック
   */
  public onError(callback: ErrorCallback): void {
    this.errorCallbacks.add(callback);
  }

  /**
   * 内部ディスパッチ（重複排除付き）
   *
   * @param key コールバックキー
   * @param message 受信メッセージ
   */
  private dispatch(key: string, message: unknown): void {
    const id = this.extractId(message);

    if (id) {
      const now = Date.now();
      const cached = this.seenIds.get(id);

      // TTL内に同じIDが存在する場合はスキップ
      if (cached && now - cached.timestamp < this.cacheTtl) {
        return;
      }

      // 新規または期限切れのIDを記録
      this.seenIds.set(id, { timestamp: now });

      // サイズ制限チェック（最大サイズを超えたら古いものから削除）
      if (this.seenIds.size > this.maxCacheSize) {
        this.trimCache();
      }
    }

    const callbacks = this.callbacks.get(key);
    if (!callbacks) return;

    callbacks.forEach((cb) => cb(message));
  }

  /**
   * メッセージからIDを抽出
   *
   * @param message メッセージオブジェクト
   * @returns 抽出されたIDまたはundefined
   */
  private extractId(message: unknown): string | undefined {
    if (typeof message !== 'object' || message === null) return undefined;
    const msg = message as Record<string, any>;
    return msg?.meta?.hash || msg?.hash || msg?.uid;
  }

  /**
   * 期限切れのキャッシュをクリーンアップ
   */
  private cleanupExpiredCache(): void {
    const now = Date.now();
    const toDelete: string[] = [];

    for (const [id, cached] of this.seenIds.entries()) {
      if (now - cached.timestamp > this.cacheTtl) {
        toDelete.push(id);
      }
    }

    for (const id of toDelete) {
      this.seenIds.delete(id);
    }
  }

  /**
   * キャッシュサイズを制限内に収める（最も古いものから削除）
   */
  private trimCache(): void {
    const entries = Array.from(this.seenIds.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

    const toRemove = entries.slice(0, entries.length - this.maxCacheSize);
    for (const [id] of toRemove) {
      this.seenIds.delete(id);
    }
  }

  /**
   * ノード選出（ランダム）
   *
   * @param urls ノードURLリスト
   * @param count 選出数
   * @returns 選出されたノードURLリスト
   */
  private pickNodes(urls: string[], count: number): string[] {
    const shuffled = [...urls].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, urls.length));
  }

  /**
   * 全てのWebSocket接続とリソースをクリーンアップ
   */
  public close(): void {
    if (this.closed) return;

    this.closed = true;

    // クリーンアップタイマーを停止
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }

    // 全てのWebSocket接続を閉じる
    for (const ws of this.sockets) {
      ws.close();
    }

    // リソースをクリア
    this.sockets = [];
    this.callbacks.clear();
    this.errorCallbacks.clear();
    this.seenIds.clear();
  }

  /**
   * アクティブな接続数を取得
   */
  public getActiveConnectionCount(): number {
    return this.sockets.length;
  }

  /**
   * クローズ状態を確認
   */
  public getIsClosed(): boolean {
    return this.closed;
  }

  /**
   * キー生成ユーティリティ
   *
   * @param channel チャネル
   * @param address アドレス（オプション）
   * @returns キー文字列
   */
  private makeKey(channel: SymbolChannel, address?: string): string {
    return address ? `${channel}:${address}` : channel;
  }
}
