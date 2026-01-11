/**
 * NEM関連の共通ユーティリティ
 * ノード取得やアカウント情報取得などの共通処理を提供
 */
import { nemSymbolNodePicker } from 'nem-symbol-node-picker';

import { NemRest } from '../repositories/NemRest';

/** NEMの精度（小数点以下6桁） */
export const DECIMAL_PRECISION = 1_000_000;

/**
 * NEMノードのURLを取得
 * @returns NEMノードのURL
 * @throws ノード取得に失敗した場合
 */
export async function fetchNemNode(): Promise<string> {
  const nemNodes = await nemSymbolNodePicker({ chainName: 'nem', network: 'mainnet', count: 1, isSsl: true });
  if (!nemNodes || nemNodes.length === 0) {
    throw new Error('Failed to fetch NEM node');
  }
  return nemNodes[0];
}

/**
 * NEMアカウント情報を取得
 * @param nodeUrl - NEMノードのURL
 * @param address - NEMアドレス
 * @returns アカウント情報（balance、vestedBalanceを含む）
 * @throws アカウント情報の取得に失敗した場合
 */
export async function fetchAccountInfo(nodeUrl: string, address: string) {
  const nemRest = new NemRest(nodeUrl);
  const accountInfo = await nemRest.getAccountInfo(address);
  return {
    balance: Number(accountInfo.account.balance) / DECIMAL_PRECISION,
    vestedBalance: Number(accountInfo.account.vestedBalance) / DECIMAL_PRECISION,
  };
}
