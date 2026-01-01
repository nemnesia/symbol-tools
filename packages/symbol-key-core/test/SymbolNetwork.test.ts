import { Hash256, PrivateKey, PublicKey, Signature } from '@nemnesia/symbol-catbuffer';
import { descriptors, models } from '@nemnesia/symbol-catbuffer/symbol';
import { KeyPair, SymbolFacade, SymbolTransactionFactory } from 'symbol-sdk/symbol';
import { describe, expect, it } from 'vitest';

import { SymbolKeyPair, SymbolNetwork, SymbolUtils } from '../src/index.js';

// TRANSACTION_HEADER_SIZE 定数をテスト用に再定義
const TRANSACTION_HEADER_SIZE = 108;

const TEST_PRIVATE_KEY = 'AABBCCDDEEFF00112233445566778899AABBCCDDEEFF00112233445566778899';

// ダミーSymbolKeyPair
class DummyKeyPair {
  publicKey: PublicKey;
  constructor() {
    this.publicKey = new PublicKey(new Uint8Array(32));
  }
  sign(data: Uint8Array) {
    return new Signature(new Uint8Array(64));
  }
}

describe('SymbolNetwork', () => {
  it('mainnetインスタンス生成できる', () => {
    const network = new SymbolNetwork('mainnet');
    expect(network).toBeInstanceOf(SymbolNetwork);
  });

  it('存在しないネットワーク名でエラー', () => {
    expect(() => new SymbolNetwork('unknown')).toThrow();
  });

  it('トランザクションハッシュ計算できる', () => {
    const network = new SymbolNetwork('mainnet');
    // ダミートランザクション
    const tx = {
      signature: new Signature(new Uint8Array(64)),
      signerPublicKey: new PublicKey(new Uint8Array(32)),
      serialize: () => new Uint8Array(100),
    } as unknown as models.Transaction;
    const hash = network.hashTransaction(tx);
    expect(hash).toBeInstanceOf(Hash256);
  });

  it('Aggregateトランザクションを判定できる', () => {
    const network = new SymbolNetwork('mainnet');
    // AggregateComplete type (0x4141) を埋め込む
    const buf = new Uint8Array(120);
    // SymbolNetwork 実装に合わせて type 埋め込み
    const typeOffset = TRANSACTION_HEADER_SIZE + 2;
    buf[typeOffset] = 0x41;
    buf[typeOffset + 1] = 0x41;
    expect(network.isAggregateTransaction(buf)).toBe(true);
  });

  it('トランザクション署名できる', () => {
    const network = new SymbolNetwork('mainnet');
    const keyPair = new DummyKeyPair();
    const tx = {
      signature: new Signature(new Uint8Array(64)),
      signerPublicKey: new PublicKey(new Uint8Array(32)),
      serialize: () => new Uint8Array(100),
    } as unknown as models.Transaction;
    const sig = network.signTransaction(keyPair as any, tx);
    expect(sig).toBeInstanceOf(Signature);
  });

  it('トランザクションハッシュに連署名できる', () => {
    const network = new SymbolNetwork('mainnet');
    const keyPair = new DummyKeyPair();
    const hash = new Hash256(new Uint8Array(32));
    const cosig = network.cosignTransactionHash(keyPair as any, hash);
    expect(cosig).toBeInstanceOf(models.Cosignature);
  });

  it('トランザクションに連署名できる', () => {
    const network = new SymbolNetwork('mainnet');
    const keyPair = new DummyKeyPair();
    const tx = {
      signature: new Signature(new Uint8Array(64)),
      signerPublicKey: new PublicKey(new Uint8Array(32)),
      serialize: () => new Uint8Array(100),
    } as unknown as models.Transaction;
    const cosig = network.cosignTransaction(keyPair as any, tx);
    expect(cosig).toBeInstanceOf(models.Cosignature);
  });

  it('SDKと同じ署名が生成される(トランザクション)', () => {
    // トランザクション作成
    const facade = new SymbolFacade('mainnet');
    const account = facade.createAccount(new PrivateKey(TEST_PRIVATE_KEY));
    const transferDescriptor = new descriptors.TransferTransactionV1Descriptor(account.address, [], '\0Hello, Symbol!');
    const transferTx = facade.createTransactionFromTypedDescriptor(transferDescriptor, account.publicKey, 0, 0);
    // 署名
    const network = new SymbolNetwork('mainnet');
    const keyPair = new SymbolKeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const signature = network.signTransaction(keyPair, transferTx);
    const signedTx = SymbolUtils.attachSignature(transferTx, signature);
    // SDKで署名
    const sdkKeyPair = new KeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const sdkSignature = facade.signTransaction(sdkKeyPair, transferTx);
    const sdkSignedTx = SymbolTransactionFactory.attachSignature(transferTx, sdkSignature);
    // 比較
    expect(Array.from(signature.bytes)).toEqual(Array.from(sdkSignature.bytes));
    expect(signedTx).toBe(sdkSignedTx);
  });

  it('SDKと同じ署名が生成される(アグリゲートトランザクション)', async () => {
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
    // 署名
    const network = new SymbolNetwork('mainnet');
    const keyPair = new SymbolKeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const signature = network.signTransaction(keyPair, aggregateTx);
    const signedTx = SymbolUtils.attachSignature(aggregateTx, signature);
    const transactionHash = network.hashTransaction(aggregateTx);
    const cosignature = network.cosignTransaction(keyPair, aggregateTx, false);
    const detachedCosignature = network.cosignTransaction(keyPair, aggregateTx, true) as models.DetachedCosignature;
    // SDKで署名
    const sdkKeyPair = new KeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const sdkSignature = facade.signTransaction(sdkKeyPair, aggregateTx);
    const sdkSignedTx = SymbolTransactionFactory.attachSignature(aggregateTx, sdkSignature);
    const sdkTransactionHash = facade.hashTransaction(aggregateTx);
    const sdkCosignature = facade.cosignTransaction(sdkKeyPair, aggregateTx, false);
    const sdkDetachedCosignature = facade.cosignTransaction(sdkKeyPair, aggregateTx, true);
    // 比較
    expect(Array.from(signature.bytes)).toEqual(Array.from(sdkSignature.bytes));
    expect(signedTx).toBe(sdkSignedTx);
    expect(Array.from(transactionHash.bytes)).toEqual(Array.from(sdkTransactionHash.bytes));
    expect(cosignature.version).toEqual(sdkCosignature.version);
    expect(cosignature.signerPublicKey.toString()).toEqual(sdkCosignature.signerPublicKey.toString());
    expect(Array.from(cosignature.signature.bytes)).toEqual(Array.from(sdkCosignature.signature.bytes));
    expect(detachedCosignature.version).toEqual(sdkDetachedCosignature.version);
    expect(detachedCosignature.signerPublicKey.toString()).toEqual(sdkDetachedCosignature.signerPublicKey.toString());
    expect(Array.from(detachedCosignature.signature.bytes)).toEqual(Array.from(sdkDetachedCosignature.signature.bytes));
    expect(Array.from(detachedCosignature.parentHash!.bytes)).toEqual(
      Array.from((sdkDetachedCosignature as models.DetachedCosignature).parentHash!.bytes)
    );
  });
});
