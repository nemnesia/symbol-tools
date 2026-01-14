import type WebSocket from 'isomorphic-ws';

/**
 * エラータイプ
 */
export type SymbolWebSocketErrorType = 'connection' | 'timeout' | 'parse' | 'network' | 'unknown';

/**
 * エラー重大度
 */
export type SymbolWebSocketErrorSeverity = 'fatal' | 'recoverable';

/**
 * コンテキスト付きエラー情報
 */
export interface SymbolWebSocketError {
  /**
   * エラータイプ
   */
  type: SymbolWebSocketErrorType;
  /**
   * エラー重大度
   */
  severity: SymbolWebSocketErrorSeverity;
  /**
   * 接続先ホスト
   */
  host: string;
  /**
   * 再接続中かどうか
   */
  reconnecting: boolean;
  /**
   * 現在の再接続試行回数
   */
  reconnectAttempts: number;
  /**
   * 元のエラー
   */
  originalError: WebSocket.ErrorEvent | Error;
  /**
   * エラー発生時刻
   */
  timestamp: number;
  /**
   * エラーメッセージ
   */
  message: string;
}

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
