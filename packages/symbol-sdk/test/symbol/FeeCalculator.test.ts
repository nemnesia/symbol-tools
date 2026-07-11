import { describe, expect, it } from 'vitest';

import { calculateTransactionFee } from '../../src/symbol/FeeCalculator.js';
import * as sc from '../../src/symbol/models.js';

describe('symbol/FeeCalculator', () => {
  it('cosignatureなしの手数料を計算できる', () => {
    const transaction = { size: 200 } as any;

    expect(calculateTransactionFee(transaction, 100)).toBe(20_000n);
  });

  it('cosignature数に応じて手数料を加算できる', () => {
    const transaction = { size: 500 } as any;
    const cosignatureSize = BigInt(new sc.Cosignature().size);

    expect(calculateTransactionFee(transaction, 50, 3)).toBe(25_000n + 3n * cosignatureSize);
  });
});
