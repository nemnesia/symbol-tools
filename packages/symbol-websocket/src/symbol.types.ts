/**
 * Symbolウェブソケットモニターオプション / Symbol WebSocket Monitor Options
 */
export interface SymbolWebSocketOptions {
  host: string;
  timeout?: number;
  ssl?: boolean;
  /**
   * 自動再接続を有効にする / Enable auto reconnect
   * @default true
   */
  autoReconnect?: boolean;
  /**
   * 最大再接続試行回数 / Maximum reconnection attempts
   * @default Infinity
   */
  maxReconnectAttempts?: number;
  /**
   * 再接続間隔（ミリ秒） / Reconnection interval (milliseconds)
   * @default 3000
   */
  reconnectInterval?: number;
}
