import { SymbolWebSocket } from './SymbolWebSocket.js';

/**
 * SymbolWebSocket の型ラッパ（unknown方針では実質的に同型）。
 * 互換性のため残している。
 */
export type TypedSymbolWebSocket = SymbolWebSocket;

/**
 * 既存の SymbolWebSocket インスタンスに型ラッパを付与する（実質的に同一）。
 */
export const asTypedSymbolWebSocket = (ws: SymbolWebSocket): TypedSymbolWebSocket => ws;
