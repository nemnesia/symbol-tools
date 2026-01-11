import { describe, expect, it } from 'vitest';

import { keepVestedBalance } from '../src/libs/keepVestedBalance';

describe('keepVestedBalance', () => {
  it('目標既得権残高を維持するための最大送金可能額を正しく計算', () => {
    const result = keepVestedBalance(15000, 12000, 10000);
    expect(result).toBe(2500);
  });

  it('既得権残高が目標に達している場合', () => {
    const result = keepVestedBalance(20000, 10000, 10000);
    expect(result).toBe(0);
  });

  it('既得権残高が目標未満の場合は負の値', () => {
    const result = keepVestedBalance(10000, 8000, 10000);
    expect(result).toBe(-2500);
  });

  it('デフォルト目標値10,000 XEMを使用', () => {
    const result = keepVestedBalance(30000, 15000);
    expect(result).toBe(10000);
  });

  it('小数第6位で切り捨て', () => {
    const result = keepVestedBalance(15000, 12000, 10000);
    expect(result).toBe(2500);
  });
});
