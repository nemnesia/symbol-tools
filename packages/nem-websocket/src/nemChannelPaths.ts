/**
 * NEMチャネルタイプ
 * - newBlock: 生成されたブロックの通知
 * - blocks: 生成されたブロックの全情報
 * - account: アカウントの状態更新通知
 * - accountMosaic: アカウントのモザイク保有量更新通知
 * - accountMosaicDef: アカウントのモザイク情報量更新通知
 * - accountNamespace: アカウントのネームスペース情報量更新通知
 * - unconfirmed: 未承認トランザクション通知
 * - transactions: 承認トランザクション通知
 * - recenttransactions: 直近トランザクション通知
 */
export type NemChannel =
  | 'newBlock'
  | 'blocks'
  | 'account'
  | 'accountMosaic'
  | 'accountMosaicDef'
  | 'accountNamespace'
  | 'unconfirmed'
  | 'transactions'
  | 'recenttransactions';

/**
 * NEMチャネルパス定義
 */
export const nemChannelPaths: Record<
  NemChannel,
  { subscribe: string | ((address?: string) => string); publish?: string }
> = {
  newBlock: { subscribe: '/blocks/new' },
  blocks: { subscribe: '/blocks' },
  account: { subscribe: (address?: string) => `/account/${address}`, publish: '/w/api/account/get' },
  accountMosaic: {
    subscribe: (address?: string) => `/account/mosaic/owned/${address}`,
    publish: '/w/api/account/mosaic/owned',
  },
  accountMosaicDef: {
    subscribe: (address?: string) => `/account/mosaic/owned/definition/${address}`,
    publish: '/w/api/account/mosaic/owned/definition',
  },
  accountNamespace: {
    subscribe: (address?: string) => `/account/namespace/owned/${address}`,
    publish: '/w/api/account/namespace/owned',
  },
  unconfirmed: { subscribe: (address?: string) => `/unconfirmed/${address}` },
  transactions: { subscribe: (address?: string) => `/transactions/${address}` },
  recenttransactions: {
    subscribe: (address?: string) => `/recenttransactions/${address}`,
    publish: '/w/api/account/transfers/all',
  },
};
