import { describe, expect, it } from 'vitest';

import {
  calculateMosaicRentalFee,
  calculateNamespaceRentalFee,
  calculateTransactionFee,
} from '../../src/nem/FeeCalculator.js';
import * as nc from '../../src/nem/models.js';

const encoder = new TextEncoder();

const createTransferTransaction = ({ amount = 1_000_000n, mosaics = [], messageLength = 0 } = {}) => {
  const transaction: any = {
    type: nc.TransactionType.TRANSFER,
    amount: { value: amount },
    mosaics,
  };

  if (0 < messageLength) transaction.message = { message: new Uint8Array(messageLength) };
  return transaction;
};

const createMosaic = (namespaceName: string, mosaicName: string, amount: bigint) => ({
  mosaic: {
    mosaicId: {
      namespaceId: { name: encoder.encode(namespaceName) },
      name: encoder.encode(mosaicName),
    },
    amount: { value: amount },
  },
});

describe('nem/FeeCalculator', () => {
  it('モザイクレンタル手数料を計算できる', () => {
    expect(calculateMosaicRentalFee()).toBe(10_000_000n);
  });

  it('ネームスペースレンタル手数料を計算できる', () => {
    expect(calculateNamespaceRentalFee(true)).toBe(100_000_000n);
    expect(calculateNamespaceRentalFee(false)).toBe(10_000_000n);
  });

  it('通常トランザクションとマルチシグ変更で重みが変わる', () => {
    expect(calculateTransactionFee({ type: nc.TransactionType.ACCOUNT_KEY_LINK } as any)).toBe(150_000n);
    expect(calculateTransactionFee({ type: nc.TransactionType.MULTISIG_ACCOUNT_MODIFICATION } as any)).toBe(500_000n);
  });

  it('XEM送金は最小手数料を適用する', () => {
    const transaction = createTransferTransaction({ amount: 1_000_000n });
    expect(calculateTransactionFee(transaction)).toBe(50_000n);
  });

  it('XEM送金は上限手数料を適用する', () => {
    const transaction = createTransferTransaction({ amount: 300_000_000_000n });
    expect(calculateTransactionFee(transaction)).toBe(1_250_000n);
  });

  it('XEM送金はメッセージ課金を加算する', () => {
    const transaction = createTransferTransaction({ amount: 1_000_000n, messageLength: 32 });
    // unweighted: transfer 1 + message 2 = 3
    expect(calculateTransactionFee(transaction)).toBe(150_000n);
  });

  it('モザイク情報を関数lookupで解決できる', () => {
    const transaction = createTransferTransaction({
      amount: 1_000_000n,
      mosaics: [createMosaic('nem', 'small', 1n), createMosaic('nem', 'small', 2n)],
    });

    const lookup = () => ({ supply: 10_000n, divisibility: 0 });
    expect(calculateTransactionFee(transaction, lookup)).toBe(100_000n);
  });

  it('モザイク情報をマップlookupで解決できる', () => {
    const transaction = createTransferTransaction({
      amount: 1_000_000n,
      mosaics: [createMosaic('foo', 'bar', 10n)],
    });

    const lookup = {
      'foo:bar': { supply: 10_000n, divisibility: 0 },
    };

    expect(calculateTransactionFee(transaction, lookup)).toBe(50_000n);
  });

  it('モザイク情報が見つからない場合は例外を投げる', () => {
    const transaction = createTransferTransaction({
      amount: 1_000_000n,
      mosaics: [createMosaic('foo', 'missing', 1n)],
    });

    expect(() => calculateTransactionFee(transaction, () => undefined)).toThrowError(
      'unable to find fee information for foo:missing'
    );
  });
});
