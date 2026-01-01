import { PrivateKey } from 'symbol-sdk';
import { KeyPair } from 'symbol-sdk/symbol';
import { describe, expect, it } from 'vitest';

import { SymbolKeyPair, SymbolVerifier } from '../src/index.js';

const TEST_PRIVATE_KEY = 'AABBCCDDEEFF00112233445566778899AABBCCDDEEFF00112233445566778899';

describe('SymbolKeyPair', () => {
  it('インスタンス生成で公開鍵が算出される', () => {
    const keyPair = new SymbolKeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    expect(keyPair.privateKey.toString()).toBe(TEST_PRIVATE_KEY);
    expect(keyPair.publicKey.toString()).toMatch(/^[A-F0-9]{64}$/);
  });

  it('メッセージに署名できる', () => {
    const keyPair = new SymbolKeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const message = new Uint8Array([1, 2, 3, 4, 5]);
    const signature = keyPair.sign(message);
    expect(signature.bytes).toBeInstanceOf(Uint8Array);
  });

  it('アクセサで値取得できる', () => {
    const keyPair = new SymbolKeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    expect(keyPair.privateKey.toString()).toBe(TEST_PRIVATE_KEY);
    expect(keyPair.publicKey.toString()).toMatch(/^[A-F0-9]{64}$/);
  });

  it('SDKと同じ公開鍵が生成される', () => {
    const keyPair = new SymbolKeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const sdkKeyPair = new KeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    expect(keyPair.publicKey.toString()).toBe(sdkKeyPair.publicKey.toString());
  });

  it('SDKと同じ署名が生成される', () => {
    const message = new Uint8Array([1, 2, 3, 4, 5]);
    const keyPair = new SymbolKeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const signature = keyPair.sign(message);
    // SDKで署名
    const sdkKeyPair = new KeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const sdkSignature = sdkKeyPair.sign(message);
    expect(Array.from(signature.bytes)).toEqual(Array.from(sdkSignature.bytes));
  });
});

describe('SymbolVerifier', () => {
  const keyPair = new SymbolKeyPair(new PrivateKey(TEST_PRIVATE_KEY));
  const message = new Uint8Array([1, 2, 3, 4, 5]);
  const signature = keyPair.sign(message);

  it('正しい署名で検証が成功する', () => {
    const verifier = new SymbolVerifier(keyPair.publicKey);
    expect(verifier.verify(message, signature)).toBe(true);
  });

  it('不正な署名で検証が失敗する', () => {
    const verifier = new SymbolVerifier(keyPair.publicKey);
    // 署名データを改ざん
    const badSignature = keyPair.sign(new Uint8Array([9, 9, 9, 9, 9]));
    expect(verifier.verify(message, badSignature)).toBe(false);
  });

  it('ゼロ公開鍵で例外が投げられる', () => {
    const zeroPrivateKey = new PrivateKey(new Uint8Array(32));
    expect(() => new SymbolVerifier(zeroPrivateKey)).toThrow('public key cannot be zero');
  });
});
