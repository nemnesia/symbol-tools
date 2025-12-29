/**
 * Symbolチャネルタイプ
 * - block: 生成されたブロックの通知
 * - finalizedBlock: ファイナライズ通知
 * - confirmedAdded: 承認トランザクション通知
 * - unconfirmedAdded: 未承認トランザクション通知
 * - unconfirmedRemoved: 未承認トランザクション削除通知
 * - partialAdded: パーシャル追加通知
 * - partialRemoved: パーシャル削除通知
 * - cosignature: 連署要求通知
 * - status: ステータス通知
 */
export type SymbolChannel =
  | 'block'
  | 'finalizedBlock'
  | 'confirmedAdded'
  | 'unconfirmedAdded'
  | 'unconfirmedRemoved'
  | 'partialAdded'
  | 'partialRemoved'
  | 'cosignature'
  | 'status';

/**
 * Symbolチャネルパス定義
 */
export const symbolChannelPaths: Record<SymbolChannel, { subscribe: (address?: string) => string }> = {
  block: { subscribe: () => 'block' },
  finalizedBlock: { subscribe: () => 'finalizedBlock' },
  confirmedAdded: { subscribe: (address?: string) => (address ? `confirmedAdded/${address}` : 'confirmedAdded') },
  unconfirmedAdded: { subscribe: (address?: string) => (address ? `unconfirmedAdded/${address}` : 'unconfirmedAdded') },
  unconfirmedRemoved: {
    subscribe: (address?: string) => (address ? `unconfirmedRemoved/${address}` : 'unconfirmedRemoved'),
  },
  partialAdded: { subscribe: (address?: string) => (address ? `partialAdded/${address}` : 'partialAdded') },
  partialRemoved: { subscribe: (address?: string) => (address ? `partialRemoved/${address}` : 'partialRemoved') },
  cosignature: { subscribe: (address?: string) => (address ? `cosignature/${address}` : 'cosignature') },
  status: { subscribe: (address?: string) => (address ? `status/${address}` : 'status') },
};
