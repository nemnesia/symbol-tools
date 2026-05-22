import { describe, expect, it } from 'vitest';

import TransactionDescriptorProcessor from '../src/TransactionDescriptorProcessor.js';

describe('TransactionDescriptorProcessorのテスト', () => {
  it('lookupValueは型ヒントルールと型変換を適用する', () => {
    const descriptor = { amount: 7 };
    const rules = new Map<string, (value: unknown) => unknown>([['double', (value) => Number(value) * 2]]);
    const processor = new TransactionDescriptorProcessor(descriptor, rules, (value: unknown) => Number(value) + 1);

    processor.setTypeHints({ amount: 'double' });

    expect(processor.lookupValue('amount')).toBe(15);
  });

  it('lookupValueは配列要素を変換する', () => {
    const descriptor = { values: [1, 2, 3] };
    const rules = new Map<string, (value: unknown) => unknown>([['dup', (value) => [...(value as number[]), 4]]]);
    const processor = new TransactionDescriptorProcessor(descriptor, rules, (value: unknown) => Number(value) * 10);

    processor.setTypeHints({ values: 'dup' });

    expect(processor.lookupValue('values')).toEqual([10, 20, 30, 40]);
  });

  it('lookupValueはキー欠落時に例外を投げる', () => {
    const processor = new TransactionDescriptorProcessor({}, new Map());
    expect(() => processor.lookupValue('missing')).toThrowError(
      'transaction descriptor does not have attribute missing'
    );
  });

  it('copyToは変換済み値をコピーしignoreKeysを尊重する', () => {
    const descriptor = { fee: 5, type: 'transfer' };
    const rules = new Map<string, (value: unknown) => unknown>([['feeRule', (value) => Number(value) + 100]]);
    const processor = new TransactionDescriptorProcessor(descriptor, rules);
    const transaction = { fee: 0, type: '' };

    processor.setTypeHints({ fee: 'feeRule' });
    processor.copyTo(transaction, ['type']);

    expect(transaction).toEqual({ fee: 105, type: '' });
  });

  it('copyToはcomputed field指定時に例外を投げる', () => {
    const descriptor = { amountComputed: 999 };
    const processor = new TransactionDescriptorProcessor(descriptor, new Map());

    expect(() => processor.copyTo({ amountComputed: 0 })).toThrowError(
      'cannot explicitly set computed field amountComputed'
    );
  });

  it('copyToはtransaction側にフィールドがないと例外を投げる', () => {
    const descriptor = { amount: 1 };
    const processor = new TransactionDescriptorProcessor(descriptor, new Map());

    expect(() => processor.copyTo({})).toThrowError('transaction does not have attribute amount');
  });

  it('setTypeHints(undefined)で型ヒントをリセットできる', () => {
    const descriptor = { fee: 5 };
    const rules = new Map<string, (value: unknown) => unknown>([['feeRule', (value) => Number(value) + 100]]);
    const processor = new TransactionDescriptorProcessor(descriptor, rules);

    processor.setTypeHints({ fee: 'feeRule' });
    expect(processor.lookupValue('fee')).toBe(105);

    processor.setTypeHints(undefined);
    expect(processor.lookupValue('fee')).toBe(5);
  });
});
