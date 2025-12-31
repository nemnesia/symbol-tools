import { PrivateKey } from 'symbol-sdk';
import { SymbolFacade, descriptors } from 'symbol-sdk/symbol';
import { describe, expect, it } from 'vitest';

import { SymbolTransaction } from '../src/SymbolTransaction.js';

const TEST_PRIVATE_KEY = 'AABBCCDDEEFF00112233445566778899AABBCCDDEEFF00112233445566778899';

// モックユーティリティ
const dummyUint8 = (length: number, value = 0) => new Uint8Array(Array(length).fill(value));

// テスト用のダミーpayload生成
function createDummyPayload({
  type = 0x4141,
  payloadSize = 0,
  cosigLen = 0,
}: { type?: number; payloadSize?: number; cosigLen?: number } = {}) {
  const base = new Uint8Array(168 + payloadSize + cosigLen);
  // size (4)
  base[0] = base.length;
  // signature (64)
  base.set(dummyUint8(64, 1), 8);
  // signer (32)
  base.set(dummyUint8(32, 2), 72);
  // version (1)
  base[108] = 3;
  // network (1)
  base[109] = 0x68;
  // type (2)
  base[110] = type & 0xff;
  base[111] = (type >> 8) & 0xff;
  // maxFee (8)
  base.set(dummyUint8(8, 3), 112);
  // deadline (8)
  base.set(dummyUint8(8, 4), 120);
  if (type === 0x4141 || type === 0x4241) {
    // transactionsHash (32)
    base.set(dummyUint8(32, 5), 128);
    // payloadSize (4)
    base[160] = payloadSize & 0xff;
    base[161] = (payloadSize >> 8) & 0xff;
    base[162] = (payloadSize >> 16) & 0xff;
    base[163] = (payloadSize >> 24) & 0xff;
    // innerTransactions (payloadSize)
    base.set(dummyUint8(payloadSize, 6), 168);
    // cosignatures (cosigLen)
    base.set(dummyUint8(cosigLen, 7), 168 + payloadSize);
  }
  return base;
}

describe('SymbolTransaction', () => {
  it('非アグリゲートトランザクションをパースできる', () => {
    const payload = createDummyPayload({ type: 0x4154 });
    const tx = SymbolTransaction.parse(payload);
    expect(tx.type).toBe(0x4154);
    expect(tx.signature.length).toBe(64);
    expect(tx.signerPublicKey.length).toBe(32);
    expect(tx.maxFee).toBeTypeOf('bigint');
    expect(tx.deadline).toBeTypeOf('bigint');
    expect(tx.transactionsHash).toBeUndefined();
  });

  it('アグリゲートコンプリートトランザクションをパースできる', () => {
    const payloadSize = 10;
    const cosigLen = 5;
    const payload = createDummyPayload({ type: 0x4141, payloadSize, cosigLen });
    const tx = SymbolTransaction.parse(payload);
    expect(tx.type).toBe(0x4141);
    expect(tx.transactionsHash).toBeInstanceOf(Uint8Array);
    expect(tx.payloadSize).toBe(payloadSize);
    expect(tx.innerTransactions).toBeInstanceOf(Uint8Array);
    expect(tx.innerTransactions?.length).toBe(payloadSize);
    expect(tx.cosignatures).toBeInstanceOf(Uint8Array);
    expect(tx.cosignatures?.length).toBe(cosigLen);
  });

  it('アグリゲートトランザクションを正しく判定できる', () => {
    const payload = createDummyPayload({ type: 0x4141, payloadSize: 1 });
    const tx = SymbolTransaction.parse(payload);
    expect(tx.isAggregateTransaction()).toBe(true);
  });

  it('アグリゲートのtransactionDataBufferが正しい長さで取得できる', () => {
    const payload = createDummyPayload({ type: 0x4141, payloadSize: 2 });
    const tx = SymbolTransaction.parse(payload);
    const buf = tx.transactionDataBuffer();
    expect(buf).toBeInstanceOf(Uint8Array);
    // AGGREGATE_HASHED_SIZE = 4+8+8+32+4 = 56
    expect(buf.length).toBeGreaterThanOrEqual(56);
  });

  it('非アグリゲートのtransactionDataBufferが正しい長さで取得できる', () => {
    const payload = createDummyPayload({ type: 0x4154 });
    const tx = SymbolTransaction.parse(payload);
    const buf = tx.transactionDataBuffer();
    expect(buf).toBeInstanceOf(Uint8Array);
    // SymbolTransaction.tsのTRANSACTION_HEADER_SIZEと同じ値（172-112=60）
    expect(buf.length).toBe(60);
  });

  it('短すぎるpayloadはエラーになる', () => {
    expect(() => SymbolTransaction.parse(new Uint8Array(10))).toThrow();
  });

  it('hashTransactionがエラーなく呼び出せる', () => {
    const payload = createDummyPayload({ type: 0x4154 });
    const tx = SymbolTransaction.parse(payload);
    // SymbolUtils.getGenerationHashSeedが必要なので、モック化が必要
    SymbolTransaction.prototype['hashTransaction'].call(tx, 'testnet');
  });

  it('トランザクションハッシュがSDKと一致する', () => {
    // トランザクション作成
    const facade = new SymbolFacade('mainnet');
    const account = facade.createAccount(new PrivateKey(TEST_PRIVATE_KEY));
    const transferDescriptor = new descriptors.TransferTransactionV1Descriptor(account.address, [], '\0Hello, Symbol!');
    const transferTx = facade.createTransactionFromTypedDescriptor(transferDescriptor, account.publicKey, 0, 0);
    // ハッシュ計算
    const transactionHash = SymbolTransaction.parse(transferTx.serialize()).hashTransaction('mainnet');
    // SDKでハッシュ計算
    const sdkTransactionHash = facade.hashTransaction(transferTx);
    // 比較
    expect(Array.from(transactionHash)).toEqual(Array.from(sdkTransactionHash.bytes));
  });

  it('アグリゲートトランザクションハッシュがSDKと一致する', () => {
    // アグリゲートトランザクション作成
    const facade = new SymbolFacade('mainnet');
    const account = facade.createAccount(new PrivateKey(TEST_PRIVATE_KEY));
    const innerDescriptor1 = new descriptors.TransferTransactionV1Descriptor(account.address, [], '\0Hello, Symbol!');
    const innerTx1 = facade.createEmbeddedTransactionFromTypedDescriptor(innerDescriptor1, account.publicKey);
    const descriptor = new descriptors.AggregateBondedTransactionV3Descriptor(
      facade.static.hashEmbeddedTransactions([innerTx1]),
      [innerTx1]
    );
    const aggregateTx = facade.createTransactionFromTypedDescriptor(descriptor, account.publicKey, 100, 60 * 60 * 2, 1);
    // ハッシュ計算
    const transactionHash = SymbolTransaction.parse(aggregateTx.serialize()).hashTransaction('mainnet');
    // SDKでハッシュ計算
    const sdkTransactionHash = facade.hashTransaction(aggregateTx);
    // 比較
    expect(Array.from(transactionHash)).toEqual(Array.from(sdkTransactionHash.bytes));
  });
});
