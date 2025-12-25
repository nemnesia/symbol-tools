/**
 * Symbolチャネルタイプ / Symbol Channel types:
 * - block: 生成されたブロックの通知 / Generated Block Notification
 * - finalizedBlock: ファイナライズ通知 / Finalized Block Notification
 * - confirmedAdded: 承認トランザクション通知 / Confirmed Transaction Notification
 * - unconfirmedAdded: 未承認トランザクション通知 / Unconfirmed Transaction Notification
 * - unconfirmedRemoved: 未承認トランザクション削除通知 / Unconfirmed Transaction Removal Notification
 * - partialAdded: パーシャル追加通知 / Partial Transaction Addition Notification
 * - partialRemoved: パーシャル削除通知 / Partial Transaction Removal Notification
 * - cosignature: 連署要求通知 / Cosignature Request Notification
 * - status: ステータス通知 / Status Notification
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
 * Symbolチャネルパス定義 / Symbol Channel Path Definitions
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
