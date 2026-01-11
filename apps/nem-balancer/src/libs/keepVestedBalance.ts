/**
 * 目標既得権残高を維持するための最大送金可能額を計算
 *
 * 計算式:
 * 送信可能額 = 総残高 × (既得残高 - 目標既得残高) / 既得残高
 *
 * @param totalBalance - 総残高
 * @param vestedBalance - 既得権残高
 * @param targetVestedBalance - 目標既得権残高（デフォルト: 10,000 XEM）
 * @returns 最大送金可能額（小数第6位で切り捨て）
 */
import { roundToSixDecimals } from './formatUtils';

export function keepVestedBalance(totalBalance: number, vestedBalance: number, targetVestedBalance: number = 10_000): number {
  // 最大送金可能額を計算
  const result = (totalBalance * (vestedBalance - targetVestedBalance)) / vestedBalance;
  return roundToSixDecimals(result);
}
