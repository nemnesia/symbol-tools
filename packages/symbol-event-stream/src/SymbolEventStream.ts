import { SymbolChannel, SymbolWebSocket, SymbolWebSocketError } from '@nemnesia/symbol-websocket';

type EventCallback = (payload: unknown) => void;
type ErrorCallback = (error: SymbolWebSocketError) => void;
type ConnectCallback = (nodeUrl: string, uid: string) => void;
type DisconnectCallback = (nodeUrl: string) => void;

/**
 * 管理対象ノードの現在の接続状態。
 */
export interface NodeConnectionStatus {
  /** ノードのホスト名または IP アドレス。 */
  nodeUrl: string;
  /** 内部 WebSocket が OPEN 状態かどうか。 */
  connected: boolean;
  /** Gateway から受信した接続 UID。接続完了前・切断中は `null`。 */
  uid: string | null;
}

/**
 * {@link SymbolEventStream} の接続・重複排除設定。
 */
export interface SymbolEventStreamOptions {
  /**
   * 接続候補となるノードのホスト名または IP アドレス。プロトコル・ポート・パスは含めません。
   * 少なくとも 1 つ指定します。
   */
  nodeUrls: string[];
  /**
   * 同時に維持する接続数。正の安全な整数を指定します。
   * `nodeUrls` の件数を超える場合は、すべての候補ノードへ接続します。
   */
  connections: number;
  /** SSL を使用するかどうか。 @defaultValue true */
  ssl?: boolean;
  /**
   * 重複排除キャッシュの最大エントリ数。正の安全な整数を指定します。
   * @defaultValue 10000
   */
  maxCacheSize?: number;
  /**
   * 重複排除キャッシュの有効期間（ミリ秒）。正の有限数を指定します。
   * @defaultValue 60000
   */
  cacheTtl?: number;
  /**
   * ノード切り替えを試みる再接続回数。正の安全な整数を指定します。
   * 代替ノードがない場合は、現在の接続で再接続を継続します。
   * @defaultValue 5
   */
  maxReconnectBeforeSwitching?: number;
  /**
   * 切り替え元ノードを候補から除外する期間（ミリ秒）。正の有限数を指定します。
   * @defaultValue 300000
   */
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
 * 複数の Symbol ノードからイベントを受信するストリーム。
 *
 * @remarks
 * インスタンス生成時に指定数の接続を開始します。同じチャネル・アドレス購読に同じ ID
 * （`meta.hash`、`hash`、`uid`）の通知が複数ノードから届いた場合は、`cacheTtl` の間は
 * 1 回だけ配信します。別チャネルまたは別アドレス購読の通知は重複として扱いません。
 * {@link close} 後に接続を再開することはできません。再利用する場合は新しいインスタンスを作成してください。
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
   * 接続を開始します。
   *
   * @param options 接続・重複排除の設定。
   * @throws {Error} `nodeUrls` が空、または数値設定が指定範囲外の場合。
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
    if (!Number.isSafeInteger(connections) || connections < 1) {
      throw new Error('connections must be a positive integer');
    }
    if (!Number.isSafeInteger(maxCacheSize) || maxCacheSize < 1) {
      throw new Error('maxCacheSize must be a positive integer');
    }
    if (!Number.isFinite(cacheTtl) || cacheTtl <= 0) {
      throw new Error('cacheTtl must be a positive finite number');
    }
    if (!Number.isSafeInteger(maxReconnectBeforeSwitching) || maxReconnectBeforeSwitching < 1) {
      throw new Error('maxReconnectBeforeSwitching must be a positive integer');
    }
    if (!Number.isFinite(blacklistTtl) || blacklistTtl <= 0) {
      throw new Error('blacklistTtl must be a positive finite number');
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

    // 利用可能なノードを取得（ブラックリスト以外で未使用のノード）
    const availableNodes = this.getAvailableNodes();
    if (availableNodes.length === 0) {
      // 利用可能なノードがない場合は何もしない（既存の接続を維持）
      return;
    }

    // 実際に切り替えるノードだけをブラックリストに追加
    this.blacklistedNodes.set(oldNode, {
      nodeUrl: oldNode,
      timestamp: Date.now(),
    });

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
   * アドレスを指定せずにイベントを購読します。
   *
   * @param channel 購読する Symbol 通知チャネル。
   * @param callback 通知ごとに呼び出すコールバック。
   */
  public on(channel: SymbolChannel, callback: EventCallback): void;

  /**
   * アドレスを指定してイベントを購読します。
   *
   * @param channel 購読する Symbol 通知チャネル。
   * @param address チャネルを絞り込む Symbol アドレス。
   * @param callback 通知ごとに呼び出すコールバック。
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
   * アドレスを指定しない購読を解除します。
   *
   * @remarks
   * `callback` を省略すると、そのチャネルに登録されたすべてのコールバックを解除します。
   * 最後のコールバックを解除した時点で、すべての内部接続からも購読を解除します。
   *
   * @param channel 購読を解除する Symbol 通知チャネル。
   * @param callback 解除するコールバック。省略時はすべて解除します。
   */
  public off(channel: SymbolChannel, callback?: EventCallback): void;

  /**
   * アドレスを指定した購読を解除します。
   *
   * @param channel 購読を解除する Symbol 通知チャネル。
   * @param address 購読時に指定した Symbol アドレス。
   * @param callback 解除するコールバック。省略時はそのアドレスのすべてを解除します。
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
   * WebSocket エラーのコールバックを登録します。
   *
   * @param callback 構造化された WebSocket エラーを受け取るコールバック。
   */
  public onError(callback: ErrorCallback): void {
    this.errorCallbacks.add(callback);
  }

  /**
   * ノード接続完了時のコールバックを登録します。
   *
   * @remarks
   * 初回接続と自動再接続の両方で呼び出されます。登録時点ですでに Gateway UID を受信済みの
   * ノードについても、直ちに 1 回呼び出されます。
   *
   * @param callback ノードのホスト名と Gateway UID を受け取るコールバック。
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
   * ノード切断時のコールバックを登録します。
   *
   * @remarks
   * 予期しない切断と、ノード切り替えのための切断で呼び出されます。{@link close} による
   * 明示的な終了時は、登録済みコールバックを破棄します。
   *
   * @param callback 切断したノードのホスト名を受け取るコールバック。
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
      // 同一イベントを複数ノードから受ける場合だけを重複として扱う。
      // 別チャネル・別アドレス購読で同じトランザクション hash を受ける場合は配信する。
      const cacheKey = `${key}\u0000${id}`;
      const now = Date.now();
      const cached = this.seenIds.get(cacheKey);

      // TTL内に同じIDが存在する場合はスキップ
      if (cached && now - cached.timestamp < this.cacheTtl) {
        return;
      }

      // 新規または期限切れのIDを記録
      this.seenIds.set(cacheKey, { timestamp: now });

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
   * すべての接続と登録済みコールバックを破棄します。
   *
   * @remarks
   * このメソッドは冪等です。終了後に接続・購読を再開することはできません。
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
   * 管理中の WebSocket 接続数を取得します。
   *
   * @remarks
   * 接続完了済みの数ではありません。実際に OPEN 状態の接続数は {@link getConnectedNodes} の
   * 長さで確認してください。
   *
   * @returns 管理中の WebSocket 接続数。
   */
  public getActiveConnectionCount(): number {
    return this.sockets.length;
  }

  /**
   * このストリームが終了済みかどうかを確認します。
   *
   * @returns {@link close} が呼ばれた後は `true`。
   */
  public getIsClosed(): boolean {
    return this.closed;
  }

  /**
   * 少なくとも 1 つの内部 WebSocket が OPEN 状態かどうかを確認します。
   *
   * @returns 1 つ以上の WebSocket が OPEN 状態なら `true`。
   */
  public isConnected(): boolean {
    return this.sockets.some((ws) => ws.isConnected);
  }

  /**
   * OPEN 状態のノード一覧を取得します。
   *
   * @returns 接続中のノードのホスト名または IP アドレス。
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
   * 管理中の全ノードの接続状態を取得します。
   *
   * @returns ノードごとの接続状態と Gateway UID。
   */
  public getConnectionStatus(): NodeConnectionStatus[] {
    return this.sockets.map((ws) => ({
      nodeUrl: this.socketNodeMap.get(ws) || 'unknown',
      connected: ws.isConnected,
      uid: ws.uid,
    }));
  }

  /**
   * 一時的に切り替え候補から除外されているノード一覧を取得します。
   *
   * @returns ブラックリストの有効期限内にあるノードのホスト名または IP アドレス。
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
