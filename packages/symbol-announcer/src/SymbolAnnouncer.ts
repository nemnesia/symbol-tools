import { SymbolWebSocket } from '@nemnesia/symbol-websocket';
import { EventEmitter } from 'events';

/**
 * SymbolAnnouncerが発行するイベント型
 */
export type SymbolAnnouncerEvents = {
  /** WebSocket接続時 */
  connected: () => void;
  /** トランザクション承認時 */
  confirmedAdded: (message: any) => void;
  /** ステータスイベント受信時 */
  status: (message: any) => void;
  /** トランザクションアナウンス完了時 */
  announced: (data: any) => void;
  /** エラー発生時 */
  error: (error: Error) => void;
};

/**
 * Symbolブロックチェーンへのトランザクションアナウンスと監視を行うクラス
 */
export class SymbolAnnouncer extends EventEmitter {
  /** WebSocket監視インスタンス */
  private monitor: SymbolWebSocket;
  /** ノードURL */
  private nodeUrl: string;
  /** 署名者アドレス */
  private signerAddress: string;
  /** トランザクションデータ(JSON文字列) */
  private transaction: string;
  /** トランザクションハッシュ */
  private transactionHash: string;

  /**
   * コンストラクタ
   * @param nodeUrl ノードのURL
   * @param signerAddress 署名者のアドレス
   * @param transaction トランザクションデータ(JSON文字列)
   * @param transactionHash トランザクションハッシュ
   */
  constructor(nodeUrl: string, signerAddress: string, transaction: string, transactionHash: string) {
    super();
    this.nodeUrl = nodeUrl;
    this.signerAddress = signerAddress;
    this.transaction = transaction;
    this.transactionHash = transactionHash;

    const url = new URL(nodeUrl);
    this.monitor = new SymbolWebSocket({
      host: url.hostname,
      ssl: url.protocol === 'https:',
      timeout: 5000,
    });
  }

  /**
   * トランザクションをノードへアナウンスし、WebSocketで承認・ステータスを監視する
   */
  public announce(): void {
    this.monitor.onConnect(async () => {
      this.emit('connected');

      // チャネルにサブスクライブ
      this.monitor.on('confirmedAdded', this.signerAddress, (message) => {
        if ((message.data as any).meta.hash === this.transactionHash) {
          this.emit('confirmedAdded', message);
        }
      });
      this.monitor.on('status', this.signerAddress, (message) => {
        if ((message.data as any).hash === this.transactionHash) {
          this.emit('status', message);
        }
      });

      try {
        // アナウンス
        const response = await fetch(new URL('/transactions', this.nodeUrl).toString(), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: this.transaction,
        });
        const data = await response.json();
        this.emit('announced', data);
      } catch (error) {
        this.emit('error', error as Error);
      }
    });
  }

  /**
   * WebSocket接続を切断する
   */
  public disconnect(): void {
    this.monitor.disconnect();
  }

  /**
   * 型安全なイベントリスナー登録
   * @param event イベント名
   * @param listener リスナー関数
   */
  public on<K extends keyof SymbolAnnouncerEvents>(event: K, listener: SymbolAnnouncerEvents[K]): this {
    return super.on(event, listener);
  }

  /**
   * 型安全な一度限りのイベントリスナー登録
   * @param event イベント名
   * @param listener リスナー関数
   */
  public once<K extends keyof SymbolAnnouncerEvents>(event: K, listener: SymbolAnnouncerEvents[K]): this {
    return super.once(event, listener);
  }

  /**
   * 型安全なイベント発火
   * @param event イベント名
   * @param args イベント引数
   */
  public emit<K extends keyof SymbolAnnouncerEvents>(event: K, ...args: Parameters<SymbolAnnouncerEvents[K]>): boolean {
    return super.emit(event, ...args);
  }
}
