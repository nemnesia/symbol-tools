import { describe, expect, it } from 'vitest';

import { Hash256, PrivateKey, PublicKey, SharedKey256, Signature } from '../src/CryptoTypes.js';

describe('CryptoTypesのテスト', () => {
  it('Hash256.zeroはゼロ埋めハッシュを返す', () => {
    const hash = Hash256.zero();
    expect(hash).toBeInstanceOf(Hash256);
    expect(hash.bytes).toEqual(new Uint8Array(Hash256.SIZE));
  });

  it('Signature.zeroはゼロ埋め署名を返す', () => {
    const signature = Signature.zero();
    expect(signature).toBeInstanceOf(Signature);
    expect(signature.bytes).toEqual(new Uint8Array(Signature.SIZE));
  });

  it('PublicKeyはPublicKey入力を受け取れる', () => {
    const key1 = new PublicKey(new Uint8Array(32).fill(3));
    const key2 = new PublicKey(key1);

    expect(key2.bytes).toEqual(key1.bytes);
  });

  it('PrivateKey.randomは32バイト鍵を返す', () => {
    const privateKey = PrivateKey.random();
    expect(privateKey).toBeInstanceOf(PrivateKey);
    expect(privateKey.bytes.length).toBe(PrivateKey.SIZE);
  });

  it('SharedKey256を生成できる', () => {
    const key = new SharedKey256(new Uint8Array(32).fill(9));
    expect(key).toBeInstanceOf(SharedKey256);
  });
});
