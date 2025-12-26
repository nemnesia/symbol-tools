/**
 * NEMウェブソケットモニターオプション / NEM WebSocket Monitor Options
 */
export interface NemWebSocketOptions {
  host: string;
  timeout?: number;
  ssl?: boolean;
  autoReconnect?: boolean;
  maxReconnectAttempts?: number;
  reconnectInterval?: number;
}
