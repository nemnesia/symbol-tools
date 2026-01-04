import { describe, expect, it } from 'vitest';

import { decrypt } from '../src/index.js';
import type { EncryptedData } from '../src/index.js';

describe('エラーハンドリング', () => {
  const validEncryptedData: EncryptedData = {
    version: 1,
    kdf: 'argon2id',
    kdfParams: {
      memoryCost: 32768,
      timeCost: 2,
      parallelism: 1,
    },
    cipher: 'aes-256-gcm',
    salt: 'dGVzdHNhbHQ=',
    nonce: 'dGVzdG5vbmNl',
    ciphertext: 'dGVzdGNpcGhlcnRleHQ=',
    tag: 'dGVzdHRhZw==',
  };

  it('バージョンが不正な場合エラーを返す', async () => {
    const invalidData = {
      ...validEncryptedData,
      version: 2,
    } as unknown as EncryptedData;

    await expect(decrypt(invalidData, 'password')).rejects.toThrow('Decryption failed: unsupported format version');
  });

  it('KDFが不正な場合エラーを返す', async () => {
    const invalidData = {
      ...validEncryptedData,
      kdf: 'pbkdf2' as any,
    };

    await expect(decrypt(invalidData, 'password')).rejects.toThrow('Decryption failed: unsupported KDF');
  });

  it('暗号化アルゴリズムが不正な場合エラーを返す', async () => {
    const invalidData = {
      ...validEncryptedData,
      cipher: 'aes-128-cbc' as any,
    };

    await expect(decrypt(invalidData, 'password')).rejects.toThrow('Decryption failed: unsupported cipher');
  });

  it('破損したbase64データでエラーを返す', async () => {
    const invalidData = {
      ...validEncryptedData,
      salt: 'invalid!!!base64',
    };

    await expect(decrypt(invalidData, 'password')).rejects.toThrow('Decryption failed');
  });

  it('改ざんされた暗号文でエラーを返す', async () => {
    const invalidData = {
      ...validEncryptedData,
      ciphertext: 'YW5vdGhlcmNpcGhlcnRleHQ=',
    };

    await expect(decrypt(invalidData, 'password')).rejects.toThrow('Decryption failed');
  });

  it('改ざんされた認証タグでエラーを返す', async () => {
    const invalidData = {
      ...validEncryptedData,
      tag: 'aW52YWxpZHRhZw==',
    };

    await expect(decrypt(invalidData, 'password')).rejects.toThrow('Decryption failed');
  });

  it('改ざんされたnonceでエラーを返す', async () => {
    const invalidData = {
      ...validEncryptedData,
      nonce: 'aW52YWxpZG5vbmNl',
    };

    await expect(decrypt(invalidData, 'password')).rejects.toThrow('Decryption failed');
  });
});
