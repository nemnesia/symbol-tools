import { SymbolChannel, SymbolWebSocket, SymbolWebSocketError } from '@nemnesia/symbol-websocket';

type EventCallback = (payload: unknown) => void;
type ErrorCallback = (error: SymbolWebSocketError) => void;
type ConnectCallback = (nodeUrl: string, uid: string) => void;
type DisconnectCallback = (nodeUrl: string) => void;

interface NodeConnectionStatus {
  nodeUrl: string;
  connected: boolean;
  uid: string | null;
}

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
  /** ノード切り替え前の最大再接続試行回数（デフォルト: 5） */
  maxReconnectBeforeSwitching?: number;
  /** ブラックリストのTTL（ミリ秒、デフォルト: 300000 = 5分） */
  blacklistTtl?: number;
}

interface CachedId {
  timestamp: number;
}

interface BlacklistedNode {
  nodeUrl: string;
  timestamp: number;
}

/**
 * Symbolイベントストリームクラス
 */
export class SymbolEventStream {
  private sockets: SymbolWebSocket[] = [];
  private callbacks: Map<string, Set<EventCallback>> = new Map();
  private errorCallbacks: Set<ErrorCallback> = new Set();
  private connectCallbacks: Set<ConnectCallback> = new Set();
  private disconnectCallbacks: Set<DisconnectCallback> = new Set();

  // WebSocketとノードURLのマッピング
  private socketNodeMap: Map<SymbolWebSocket, string> = new Map();
  // WebSocketと再接続試行回数のマッピング
  private socketReconnectCount: Map<SymbolWebSocket, number> = new Map();

  // 重複通知排除用（tx hash / uid など）タイムスタンプ付き
  private seenIds: Map<string, CachedId> = new Map();
  private readonly maxCacheSize: number;
  private readonly cacheTtl: number;
  private cleanupInterval: ReturnType<typeof setInterval> | null = null;

  // ノード切り替え関連
  private readonly allNodeUrls: string[];
  private readonly maxReconnectBeforeSwitching: number;
  private blacklistedNodes: Map<string, BlacklistedNode> = new Map();
  private readonly blacklistTtl: number;

  private closed = false;

  /**
   * コンストラクタ
   *
   * @param options オプション
   */
  constructor(options: SymbolEventStreamOptions) {
    const {
      nodeUrls,
      connections,
      ssl = true,
      maxCacheSize = 10_000,
      cacheTtl = 60_000,
      maxReconnectBeforeSwitching = 5,
      blacklistTtl = 300_000,
    } = options;

    if (nodeUrls.length === 0) {
      throw new Error('nodeUrls must not be empty');
    }

    this.maxCacheSize = maxCacheSize;
    this.cacheTtl = cacheTtl;
    this.allNodeUrls = [...nodeUrls];
    this.maxReconnectBeforeSwitching = maxReconnectBeforeSwitching;
    this.blacklistTtl = blacklistTtl;

    const picked = this.pickNodes(nodeUrls, connections);

    for (const host of picked) {
      this.createWebSocketConnection(host, ssl);
    }

    // 定期的に古いキャッシュとブラックリストをクリーンアップ
    this.cleanupInterval = setInterval(
      () => {
        this.cleanupExpiredCache();
        this.cleanupBlacklist();
      },
      Math.min(this.cacheTtl / 2, this.blacklistTtl / 2)
    );
  }

  /**
   * WebSocket接続を作成
   *
   * @param host ノードURL
   * @param ssl SSL使用有無
   */
  private createWebSocketConnection(host: string, ssl: boolean): void {
    const ws = new SymbolWebSocket({
      host,
      ssl,
      autoReconnect: true,
    });

    // ノードとWebSocketのマッピングを保存
    this.socketNodeMap.set(ws, host);
    this.socketReconnectCount.set(ws, 0);

    // 接続イベント
    ws.onConnect((uid) => {
      // 接続成功したらカウントをリセット
      this.socketReconnectCount.set(ws, 0);
      this.connectCallbacks.forEach((cb) => cb(host, uid));
    });

    // 再接続イベント
    ws.onReconnect((attemptCount) => {
      this.socketReconnectCount.set(ws, attemptCount);

      // 最大再接続回数を超えたらノードを切り替え
      if (attemptCount >= this.maxReconnectBeforeSwitching) {
        this.switchNode(ws, ssl);
      }
    });

    // 切断イベント
    ws.onClose(() => {
      this.disconnectCallbacks.forEach((cb) => cb(host));
    });

    // エラーイベント
    ws.onError((err) => {
      this.errorCallbacks.forEach((cb) => cb(err));
    });

    this.sockets.push(ws);
  }

  /**
   * ノードを切り替え
   *
   * @param oldWs 古いWebSocket
   * @param ssl SSL使用有無
   */
  private switchNode(oldWs: SymbolWebSocket, ssl: boolean): void {
    const oldNode = this.socketNodeMap.get(oldWs);
    if (!oldNode) return;

    // 古いノードをブラックリストに追加
    this.blacklistedNodes.set(oldNode, {
      nodeUrl: oldNode,
      timestamp: Date.now(),
    });

    // 利用可能なノードを取得（ブラックリスト以外で未使用のノード）
    const availableNodes = this.getAvailableNodes();
    if (availableNodes.length === 0) {
      // 利用可能なノードがない場合は何もしない（既存の接続を維持）
      return;
    }

    // 新しいノードを選択
    const newNode = availableNodes[Math.floor(Math.random() * availableNodes.length)];

    // 既存のサブスクリプションを保存
    const subscriptions = Array.from(this.callbacks.keys());

    // 古いWebSocketをクリーンアップ
    oldWs.close();
    const index = this.sockets.indexOf(oldWs);
    if (index > -1) {
      this.sockets.splice(index, 1);
    }
    this.socketNodeMap.delete(oldWs);
    this.socketReconnectCount.delete(oldWs);

    // 新しいWebSocket接続を作成
    this.createWebSocketConnection(newNode, ssl);

    // サブスクリプションを再登録
    const newWs = this.sockets[this.sockets.length - 1];
    for (const key of subscriptions) {
      const [channel, address] = this.parseKey(key);
      if (address) {
        newWs.on(channel as SymbolChannel, address, (msg) => this.dispatch(key, msg));
      } else {
        newWs.on(channel as SymbolChannel, (msg) => this.dispatch(key, msg));
      }
    }
  }

  /**
   * 利用可能なノードを取得（ブラックリスト以外で未使用のノード）
   */
  private getAvailableNodes(): string[] {
    const usedNodes = new Set(this.socketNodeMap.values());
    return this.allNodeUrls.filter((nodeUrl) => !usedNodes.has(nodeUrl) && !this.blacklistedNodes.has(nodeUrl));
  }

  /**
   * ブラックリストをクリーンアップ（期限切れのエントリを削除）
   */
  private cleanupBlacklist(): void {
    const now = Date.now();
    const toDelete: string[] = [];

    for (const [nodeUrl, entry] of this.blacklistedNodes.entries()) {
      if (now - entry.timestamp > this.blacklistTtl) {
        toDelete.push(nodeUrl);
      }
    }

    for (const nodeUrl of toDelete) {
      this.blacklistedNodes.delete(nodeUrl);
    }
  }

  /**
   * キーを解析してチャネルとアドレスに分解
   *
   * @param key キー文字列
   * @returns チャネルとアドレスのタプル
   */
  private parseKey(key: string): [string, string | undefined] {
    const parts = key.split(':');
    return parts.length > 1 ? [parts[0], parts[1]] : [parts[0], undefined];
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
   * 接続イベント購読
   *
   * @param callback 接続時のコールバック（ノードURLとUIDを受け取る）
   */
  public onConnect(callback: ConnectCallback): void {
    this.connectCallbacks.add(callback);

    // すでに接続済みのノードがあれば即座にコールバックを呼び出す
    for (const ws of this.sockets) {
      if (ws.isConnected && ws.uid) {
        const nodeUrl = this.socketNodeMap.get(ws);
        if (nodeUrl) {
          callback(nodeUrl, ws.uid);
        }
      }
    }
  }

  /**
   * 切断イベント購読
   *
   * @param callback 切断時のコールバック（ノードURLを受け取る）
   */
  public onDisconnect(callback: DisconnectCallback): void {
    this.disconnectCallbacks.add(callback);
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

    // topic/data構造の場合
    if (msg.data) {
      const data = msg.data;
      return data?.meta?.hash || data?.hash || data?.uid;
    }

    // 直接的な構造の場合
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
    this.connectCallbacks.clear();
    this.disconnectCallbacks.clear();
    this.socketNodeMap.clear();
    this.socketReconnectCount.clear();
    this.blacklistedNodes.clear();
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
   * 少なくとも1つのノードに接続されているかを確認
   */
  public isConnected(): boolean {
    return this.sockets.some((ws) => ws.isConnected);
  }

  /**
   * 接続中のノードURLリストを取得
   */
  public getConnectedNodes(): string[] {
    const connectedNodes: string[] = [];
    for (const ws of this.sockets) {
      if (ws.isConnected) {
        const nodeUrl = this.socketNodeMap.get(ws);
        if (nodeUrl) {
          connectedNodes.push(nodeUrl);
        }
      }
    }
    return connectedNodes;
  }

  /**
   * 全ノードの接続状態を取得
   */
  public getConnectionStatus(): NodeConnectionStatus[] {
    return this.sockets.map((ws) => ({
      nodeUrl: this.socketNodeMap.get(ws) || 'unknown',
      connected: ws.isConnected,
      uid: ws.uid,
    }));
  }

  /**
   * ブラックリストに登録されているノード一覧を取得
   */
  public getBlacklistedNodes(): string[] {
    return Array.from(this.blacklistedNodes.keys());
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
