import { describe, expect, it } from 'vitest';

import { calculateVestingSchedule } from '../src/libs/vesting';

describe('calculateVestingSchedule', () => {
  it('目標達成までのVestingスケジュールを計算', () => {
    const result = calculateVestingSchedule(10000, 5000, 8000, '2025-01-01');

    expect(result.daysToGoal).toBeGreaterThan(0);
    expect(result.goalDate).toBeTruthy();
    expect(result.table.length).toBe(result.daysToGoal);
    expect(result.table[result.table.length - 1].vested).toBeGreaterThanOrEqual(8000);
  });

  it('既得権残高が目標を超えている場合はすぐに終了', () => {
    const result = calculateVestingSchedule(10000, 9000, 8000, '2025-01-01');

    expect(result.daysToGoal).toBe(0);
    expect(result.table.length).toBe(0);
  });

  it('増加率が極小になった場合は早期終了', () => {
    const result = calculateVestingSchedule(10000, 9999.999999, 10000, '2025-01-01');

    expect(result.daysToGoal).toBeLessThan(1000);
  });

  it('日付が正しく進行', () => {
    const result = calculateVestingSchedule(10000, 5000, 6000, '2025-01-01');

    expect(result.table[0].date).toBe('2025-01-02');
    if (result.table.length > 1) {
      expect(result.table[1].date).toBe('2025-01-03');
    }
  });

  it('毎日10%の増加率が適用される', () => {
    const result = calculateVestingSchedule(10000, 5000, 5500, '2025-01-01');

    expect(result.table[0].increase).toBeCloseTo((10000 - 5000) * 0.1, 5);
  });

  it('目標達成日が正しく計算される', () => {
    const result = calculateVestingSchedule(10000, 5000, 8000, '2025-01-01');
    const startDate = new Date('2025-01-01');
    const expectedGoalDate = new Date(startDate);
    expectedGoalDate.setDate(startDate.getDate() + result.daysToGoal);

    expect(result.goalDate).toBe(expectedGoalDate.toISOString().split('T')[0]);
  });
});
