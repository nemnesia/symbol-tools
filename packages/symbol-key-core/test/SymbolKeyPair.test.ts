import { PrivateKey } from 'symbol-sdk';
import { KeyPair, SymbolFacade, SymbolTransactionFactory, descriptors, models } from 'symbol-sdk/symbol';
import { describe, expect, it } from 'vitest';

import { SymbolTransaction } from '../src/SymbolTransaction.js';
import { SymbolKeyPair, SymbolUtils } from '../src/index.js';

const TEST_PRIVATE_KEY = 'AABBCCDDEEFF00112233445566778899AABBCCDDEEFF00112233445566778899';

describe('SymbolKeyPair', () => {
  it('インスタンス生成で公開鍵が算出される', () => {
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    expect(keyPair.privateKey).toBe(TEST_PRIVATE_KEY);
    expect(keyPair.publicKey).toMatch(/^[A-F0-9]{64}$/);
  });

  it('ランダムな秘密鍵を生成できる', () => {
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    const randomKey = keyPair.generateRandomPrivateKey();
    expect(randomKey).toMatch(/^[A-F0-9]{64}$/);
  });

  it('秘密鍵から公開鍵を算出できる', () => {
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    const pubKey = keyPair.getSymbolPublicKey(TEST_PRIVATE_KEY);
    expect(pubKey).toMatch(/^[A-F0-9]{64}$/);
  });

  it('アドレスを取得できる', () => {
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    const address = keyPair.toAddress('mainnet');
    expect(typeof address).toBe('string');
    expect(address.length).toBeGreaterThan(0);
  });

  it('メッセージに署名できる', () => {
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    const message = new Uint8Array([1, 2, 3, 4, 5]);
    const signature = keyPair.sign(message);
    expect(signature).toBeInstanceOf(Uint8Array);
    expect(signature.length).toBe(64);
  });

  it('トランザクションに署名できる', () => {
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    const txPayload = new Uint8Array(128).fill(0x01);
    const signature = keyPair.signTransaction('mainnet', txPayload);
    expect(signature).toBeInstanceOf(Uint8Array);
    expect(signature.length).toBe(64);
  });

  it('TestNetアドレスを取得できる', () => {
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    const address = keyPair.toAddress('testnet');
    expect(typeof address).toBe('string');
    expect(address.length).toBeGreaterThan(0);
  });

  it('秘密鍵長が不正なら例外', () => {
    expect(() => {
      new SymbolKeyPair('AABBCC');
    }).toThrow('Private key must be a 32-byte hex string.');
  });

  it('Aggregateトランザクション分岐で署名できる', () => {
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    const txPayload = new Uint8Array(140).fill(0x01);
    // typeフィールド(110,111)をAggregateComplete(0x4141)に
    txPayload[110] = 0x41;
    txPayload[111] = 0x41;
    const signature = keyPair.signTransaction('mainnet', txPayload);
    expect(signature).toBeInstanceOf(Uint8Array);
    expect(signature.length).toBe(64);
  });

  it('アクセサで値取得できる', () => {
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    expect(keyPair.privateKey).toBe(TEST_PRIVATE_KEY);
    expect(keyPair.publicKey).toMatch(/^[A-F0-9]{64}$/);
  });

  it('SDKと同じ公開鍵が生成される', () => {
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    const sdkKeyPair = new KeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    expect(keyPair.publicKey).toBe(sdkKeyPair.publicKey.toString());
  });

  it('SDKと同じ署名が生成される', () => {
    const message = new Uint8Array([1, 2, 3, 4, 5]);
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    const signature = keyPair.sign(message);
    // SDKで署名
    const sdkKeyPair = new KeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const sdkSignature = sdkKeyPair.sign(message);
    expect(Array.from(signature)).toEqual(Array.from(sdkSignature.bytes));
  });

  it('SDKと同じ署名が生成される(トランザクション)', () => {
    // トランザクション作成
    const facade = new SymbolFacade('mainnet');
    const account = facade.createAccount(new PrivateKey(TEST_PRIVATE_KEY));
    const transferDescriptor = new descriptors.TransferTransactionV1Descriptor(account.address, [], '\0Hello, Symbol!');
    const transferTx = facade.createTransactionFromTypedDescriptor(transferDescriptor, account.publicKey, 0, 0);
    // 署名
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    const signature = keyPair.signTransaction('mainnet', transferTx.serialize());
    const signedTx = SymbolUtils.attachSignature(transferTx.serialize(), signature);
    // SDKで署名
    const sdkKeyPair = new KeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const sdkSignature = facade.signTransaction(sdkKeyPair, transferTx);
    const sdkSignedTx = SymbolTransactionFactory.attachSignature(transferTx, sdkSignature);
    // 比較
    expect(Array.from(signature)).toEqual(Array.from(sdkSignature.bytes));
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
    const keyPair = new SymbolKeyPair(TEST_PRIVATE_KEY);
    const signature = keyPair.signTransaction('mainnet', aggregateTx.serialize());
    const signedTx = SymbolUtils.attachSignature(aggregateTx.serialize(), signature);
    const signedTxPayload = JSON.parse(signedTx);
    const signedAggregateTx = SymbolUtils.hexToUint8(signedTxPayload.payload);
    const transactionHash = SymbolTransaction.parse(signedAggregateTx).hashTransaction('mainnet');
    const cosignature = keyPair.cosignTransaction(signedAggregateTx, 'mainnet', false);
    const detachedCosignature = keyPair.cosignTransaction(signedAggregateTx, 'mainnet', true);
    // SDKで署名
    const sdkKeyPair = new KeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const sdkSignature = facade.signTransaction(sdkKeyPair, aggregateTx);
    const sdkSignedTx = SymbolTransactionFactory.attachSignature(aggregateTx, sdkSignature);
    const sdkTransactionHash = facade.hashTransaction(aggregateTx);
    const sdkCosignature = facade.cosignTransaction(sdkKeyPair, aggregateTx, false);
    const sdkDetachedCosignature = facade.cosignTransaction(sdkKeyPair, aggregateTx, true);
    // 比較
    expect(Array.from(signature)).toEqual(Array.from(sdkSignature.bytes));
    expect(signedTx).toBe(sdkSignedTx);
    expect(Array.from(transactionHash)).toEqual(Array.from(sdkTransactionHash.bytes));
    expect(cosignature.version).toEqual(sdkCosignature.version);
    expect(cosignature.signerPublicKey).toEqual(sdkCosignature.signerPublicKey.toString());
    expect(Array.from(cosignature.signature)).toEqual(Array.from(sdkCosignature.signature.bytes));
    expect(detachedCosignature.version).toEqual(sdkDetachedCosignature.version);
    expect(detachedCosignature.signerPublicKey).toEqual(sdkDetachedCosignature.signerPublicKey.toString());
    expect(Array.from(detachedCosignature.signature)).toEqual(Array.from(sdkDetachedCosignature.signature.bytes));
    expect(Array.from(detachedCosignature.parentHash!)).toEqual(
      Array.from((sdkDetachedCosignature as models.DetachedCosignature).parentHash!.bytes)
    );
  });
});
