/**
 * 送金後既得残高計算
 * 送金後の既得権残高を計算する
 *
 * 計算式:
 * - 既得割合 = 既得残高 ÷ 残高
 * - 送金後既得残高 = (残高 - (送金額 + 手数料)) × 既得割合
 * - 結果は小数第6位で切り捨て
 */
import { roundToSixDecimals } from './formatUtils';

/**
 * 送金後の既得権残高を計算
 * @param params - 計算パラメータ
 * @param params.vestedBalance - 既得権残高
 * @param params.totalBalance - 総残高
 * @param params.sendAmount - 送金額
 * @param params.fee - 手数料
 * @returns 送金後の既得権残高（小数第6位で切り捨て）
 */
export function calcVestedBalanceAfterSend({
  vestedBalance,
  totalBalance,
  sendAmount,
  fee,
}: {
  vestedBalance: number;
  totalBalance: number;
  sendAmount: number;
  fee: number;
}): number {
  if (totalBalance === 0) return 0;
  // 既得割合を計算
  const vestedRatio = vestedBalance / totalBalance;
  // 送金後の既得権残高を計算
  const after = (totalBalance - (sendAmount + fee)) * vestedRatio;
  return roundToSixDecimals(after);
}
