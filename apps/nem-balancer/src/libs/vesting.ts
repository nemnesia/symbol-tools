/**
 * Vesting（既得権）スケジュール計算
 * NEMの既得権残高の増加スケジュールを計算
 */
import { roundToSixDecimals } from './formatUtils';

/** Vestingスケジュールの1行分のデータ */
export interface VestingScheduleRow {
  date: string; // 日付
  vested: number; // 既得権残高
  increase: number; // 増加量
}

/** 計算結果 */
export interface CalculationResult {
  daysToGoal: number; // 目標達成までの日数
  goalDate: string; // 目標達成日
  table: VestingScheduleRow[]; // スケジュールテーブル
}

/** Vesting増加率（1日あたり10%） */
const VESTING_RATE = 0.1;

/** 最大計算日数（無限ループ防止） */
const MAX_CALCULATION_DAYS = 1000;

/**
 * Vestingスケジュールを計算
 * @param amountNum - 総保有量
 * @param vestedNum - 現在の既得権残高
 * @param targetNum - 目標既得権残高
 * @param startDate - 開始日（YYYY-MM-DD形式）
 * @returns 計算結果（達成日数、達成日、スケジュールテーブル）
 */
export function calculateVestingSchedule(amountNum: number, vestedNum: number, targetNum: number, startDate: string): CalculationResult {
  let daysToGoal = 0;
  let goalDate = '';
  const table: VestingScheduleRow[] = [];
  const start = new Date(startDate);
  let vested = vestedNum;
  let i = 0;
  while (vested < targetNum && i < MAX_CALCULATION_DAYS) {
    const date = new Date(start);
    date.setDate(start.getDate() + i + 1);
    const increaseRaw = (amountNum - vested) * VESTING_RATE;
    vested += increaseRaw;
    table.push({
      date: date.toISOString().split('T')[0],
      vested: roundToSixDecimals(vested),
      increase: roundToSixDecimals(increaseRaw),
    });
    if (vested >= targetNum) break;
    if (increaseRaw <= 0.000001) break;
    i++;
  }
  daysToGoal = table.length;
  const goal = new Date(start);
  goal.setDate(start.getDate() + daysToGoal);
  goalDate = goal.toISOString().split('T')[0];
  return { daysToGoal, goalDate, table };
}
