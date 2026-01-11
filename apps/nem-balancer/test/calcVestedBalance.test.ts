import { describe, expect, it } from 'vitest';

import { calcVestedBalanceAfterSend } from '../src/libs/calcVestedBalance';

describe('calcVestedBalanceAfterSend', () => {
  it('送信後の既得残高を正しく計算', () => {
    const result = calcVestedBalanceAfterSend({
      vestedBalance: 10000,
      totalBalance: 15000,
      sendAmount: 5000,
      fee: 0,
    });
    expect(result).toBe(6666.666666);
  });

  it('手数料を含めて計算', () => {
    const result = calcVestedBalanceAfterSend({
      vestedBalance: 10000,
      totalBalance: 15000,
      sendAmount: 5000,
      fee: 500,
    });
    expect(result).toBe(6333.333333);
  });

  it('送信額が0の場合は既得残高が変わらない', () => {
    const result = calcVestedBalanceAfterSend({
      vestedBalance: 10000,
      totalBalance: 15000,
      sendAmount: 0,
      fee: 0,
    });
    expect(result).toBe(10000);
  });

  it('総残高が0の場合は0を返す', () => {
    const result = calcVestedBalanceAfterSend({
      vestedBalance: 0,
      totalBalance: 0,
      sendAmount: 0,
      fee: 0,
    });
    expect(result).toBe(0);
  });

  it('既得割合50%の場合の計算', () => {
    const result = calcVestedBalanceAfterSend({
      vestedBalance: 5000,
      totalBalance: 10000,
      sendAmount: 2000,
      fee: 0,
    });
    expect(result).toBe(4000);
  });
});
