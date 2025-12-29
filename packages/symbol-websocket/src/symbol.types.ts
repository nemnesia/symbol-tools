/**
 * Symbolウェブソケットモニターオプション
 */
export interface SymbolWebSocketOptions {
  host: string;
  /**
   * 接続タイムアウト（ミリ秒）
   */
  timeout?: number;
  ssl?: boolean;
  /**
   * 自動再接続を有効にする
   * @default true
   */
  autoReconnect?: boolean;
  /**
   * 最大再接続試行回数
   * @default Infinity
   */
  maxReconnectAttempts?: number;
  /**
   * 再接続間隔（ミリ秒）
   * @default 3000
   */
  reconnectInterval?: number;
}
