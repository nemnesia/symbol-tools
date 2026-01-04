import { describe, expect, it } from 'vitest';

import { decrypt } from '../src/index.js';
import type { EncryptedData } from '../src/index.js';

describe('エラーハンドリング', () => {
  // テスト用: nonce(12) + tag(16) + ciphertext(4)
  const validEncryptedData: EncryptedData = {
    salt: 'dGVzdHNhbHQ=',
    ciphertext: Buffer.from(
      new Uint8Array([
        // nonce (12 bytes)
        ...Array(12).fill(1),
        // tag (16 bytes)
        ...Array(16).fill(2),
        // ciphertext (4 bytes)
        ...Array(4).fill(3),
      ])
    ).toString('base64'),
  };

  // 新形式ではバージョン・KDF・cipherの検証は不要

  it('破損したbase64データでエラーを返す', async () => {
    const invalidData = {
      ...validEncryptedData,
      salt: 'invalid!!!base64',
    };
    await expect(decrypt(invalidData, 'password')).rejects.toThrow('Decryption failed');
  });

  it('改ざんされた暗号文でエラーを返す', async () => {
    // ciphertextを壊す
    const invalidData = {
      ...validEncryptedData,
      ciphertext: Buffer.from(new Uint8Array(32).fill(9)).toString('base64'),
    };
    await expect(decrypt(invalidData, 'password')).rejects.toThrow('Decryption failed');
  });

  it('改ざんされた認証タグでエラーを返す', async () => {
    // tag部分だけ壊す
    const broken = Buffer.from(
      new Uint8Array([
        ...Array(12).fill(1), // nonce
        ...Array(16).fill(99), // tag (壊す)
        ...Array(4).fill(3), // ciphertext
      ])
    ).toString('base64');
    const invalidData = {
      ...validEncryptedData,
      ciphertext: broken,
    };
    await expect(decrypt(invalidData, 'password')).rejects.toThrow('Decryption failed');
  });
  it('改ざんされたnonceでエラーを返す', async () => {
    // nonce部分だけ壊す
    const broken = Buffer.from(
      new Uint8Array([
        ...Array(12).fill(88), // nonce (壊す)
        ...Array(16).fill(2), // tag
        ...Array(4).fill(3), // ciphertext
      ])
    ).toString('base64');
    const invalidData = {
      ...validEncryptedData,
      ciphertext: broken,
    };
    await expect(decrypt(invalidData, 'password')).rejects.toThrow('Decryption failed');
  });
});
