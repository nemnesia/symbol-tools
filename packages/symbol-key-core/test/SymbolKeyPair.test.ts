import { PrivateKey } from 'symbol-sdk';
import { KeyPair } from 'symbol-sdk/symbol';
import { describe, expect, it } from 'vitest';

import { SymbolKeyPair } from '../src/index.js';

const TEST_PRIVATE_KEY = 'AABBCCDDEEFF00112233445566778899AABBCCDDEEFF00112233445566778899';

describe('SymbolKeyPair', () => {
  it('インスタンス生成で公開鍵が算出される', () => {
    const keyPair = new SymbolKeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    expect(keyPair.privateKey.toString()).toBe(TEST_PRIVATE_KEY);
    expect(keyPair.publicKey.toString()).toMatch(/^[A-F0-9]{64}$/);
  });

  it('秘密鍵から公開鍵を算出できる', () => {
    const keyPair = new SymbolKeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const pubKey = keyPair.getSymbolPublicKey(new PrivateKey(TEST_PRIVATE_KEY));
    expect(pubKey.toString()).toMatch(/^[A-F0-9]{64}$/);
  });

  it('メッセージに署名できる', () => {
    const keyPair = new SymbolKeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const message = new Uint8Array([1, 2, 3, 4, 5]);
    const signature = keyPair.sign(message);
    expect(signature.bytes).toBeInstanceOf(Uint8Array);
    // expect(signature.length).toBe(64);
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
