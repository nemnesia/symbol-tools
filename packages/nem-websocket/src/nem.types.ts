import type WebSocket from 'isomorphic-ws';

/**
 * エラータイプ
 */
export type NemWebSocketErrorType = 'connection' | 'timeout' | 'parse' | 'network' | 'unknown';

/**
 * エラー重大度
 */
export type NemWebSocketErrorSeverity = 'fatal' | 'recoverable';

/**
 * コンテキスト付きエラー情報
 */
export interface NemWebSocketError {
  /**
   * エラータイプ
   */
  type: NemWebSocketErrorType;
  /**
   * エラー重大度
   */
  severity: NemWebSocketErrorSeverity;
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
 * NEMウェブソケットモニターオプション
 */
export interface NemWebSocketOptions {
  /**
   * 接続先ホスト
   */
  host: string;
  /**
   * 接続タイムアウト（ミリ秒）
   * @default 10000
   */
  timeout?: number;
  /**
   * SSLを使用する
   * @default true
   */
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
