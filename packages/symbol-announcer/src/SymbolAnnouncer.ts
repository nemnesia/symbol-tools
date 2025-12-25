import { SymbolWebSocketMonitor } from '@nemnesia/symbol-websocket';
import { EventEmitter } from 'events';

export type SymbolAnnouncerEvents = {
  connected: () => void;
  confirmedAdded: (message: any) => void;
  status: (message: any) => void;
  announced: (data: any) => void;
  error: (error: Error) => void;
};

export class SymbolAnnouncer extends EventEmitter {
  private monitor: SymbolWebSocketMonitor;
  private nodeUrl: string;
  private signerAddress: string;
  private transaction: string;
  private transactionHash: string;

  constructor(nodeUrl: string, signerAddress: string, transaction: string, transactionHash: string) {
    super();
    this.nodeUrl = nodeUrl;
    this.signerAddress = signerAddress;
    this.transaction = transaction;
    this.transactionHash = transactionHash;

    const url = new URL(nodeUrl);
    this.monitor = new SymbolWebSocketMonitor({
      host: url.hostname,
      ssl: url.protocol === 'https:',
      timeout: 5000,
    });
  }

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

  public disconnect(): void {
    this.monitor.disconnect();
  }

  // TypeScriptの型安全性のためのヘルパーメソッド
  public on<K extends keyof SymbolAnnouncerEvents>(event: K, listener: SymbolAnnouncerEvents[K]): this {
    return super.on(event, listener);
  }

  public once<K extends keyof SymbolAnnouncerEvents>(event: K, listener: SymbolAnnouncerEvents[K]): this {
    return super.once(event, listener);
  }

  public emit<K extends keyof SymbolAnnouncerEvents>(event: K, ...args: Parameters<SymbolAnnouncerEvents[K]>): boolean {
    return super.emit(event, ...args);
  }
}
