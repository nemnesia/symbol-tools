import { utf8ToBytes } from '@noble/hashes/utils';
import { describe, expect, it } from 'vitest';

import { decrypt, encrypt } from '../src/index.js';

describe('simple-password-crypto', () => {
  const testData = utf8ToBytes('テスト用秘密データ 🔐');
  const password = 'my-strong-password-123';

  it('暗号化と復号が正常に動作すること', async () => {
    const encrypted = await encrypt(testData, password);
    const decrypted = await decrypt(encrypted, password);

    expect(decrypted).toEqual(testData);
  });

  it('パスワードが間違っている場合は失敗すること', async () => {
    const encrypted = await encrypt(testData, password);

    await expect(decrypt(encrypted, 'wrong-password')).rejects.toThrow('Decryption failed');
  });

  it('暗号文が破損している場合は失敗すること', async () => {
    const encrypted = await encrypt(testData, password);

    // 暗号文を破損させる
    // base64デコード用ヘルパー
    const fromBase64 = (base64: string): Uint8Array => {
      if (typeof Buffer !== 'undefined') {
        return new Uint8Array(Buffer.from(base64, 'base64'));
      }
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    };

    const toBase64 = (bytes: Uint8Array): string => {
      if (typeof Buffer !== 'undefined') {
        return Buffer.from(bytes).toString('base64');
      }
      const binary = String.fromCharCode(...bytes);
      return btoa(binary);
    };

    const ciphertextBytes = fromBase64(encrypted.ciphertext);
    ciphertextBytes[0] ^= 0xff; // 最初のバイトを反転
    const corrupted = {
      ...encrypted,
      ciphertext: toBase64(ciphertextBytes),
    };

    await expect(decrypt(corrupted, password)).rejects.toThrow('Decryption failed');
  });

  it('同じ入力でも毎回異なる出力が生成されること（nonce ランダム性）', async () => {
    const encrypted1 = await encrypt(testData, password);
    const encrypted2 = await encrypt(testData, password);

    // 異なる nonce
    expect(encrypted1.nonce).not.toBe(encrypted2.nonce);
    // 異なる暗号文
    expect(encrypted1.ciphertext).not.toBe(encrypted2.ciphertext);
    // しかし両方とも同じデータに復号される
    expect(await decrypt(encrypted1, password)).toEqual(testData);
    expect(await decrypt(encrypted2, password)).toEqual(testData);
  });

  it('正しいフォーマットバージョンを持つこと', async () => {
    const encrypted = await encrypt(testData, password);

    expect(encrypted.version).toBe(1);
    expect(encrypted.kdf).toBe('argon2id');
    expect(encrypted.cipher).toBe('aes-256-gcm');
  });

  it('正しい Argon2id パラメータを持つこと', async () => {
    const encrypted = await encrypt(testData, password);

    expect(encrypted.kdfParams.memoryCost).toBe(65536);
    expect(encrypted.kdfParams.timeCost).toBe(3);
    expect(encrypted.kdfParams.parallelism).toBe(1);
  });

  it('空のデータを処理できること', async () => {
    const empty = new Uint8Array(0);
    const encrypted = await encrypt(empty, password);
    const decrypted = await decrypt(encrypted, password);

    expect(decrypted).toEqual(empty);
  });

  it('大容量データを処理できること', async () => {
    const large = new Uint8Array(1024 * 1024); // 1MB
    large.fill(97); // 'a'の文字コード

    const encrypted = await encrypt(large, password);
    const decrypted = await decrypt(encrypted, password);

    expect(decrypted).toEqual(large);
  });

  it('非対応バージョンを拒否すること', async () => {
    const encrypted = await encrypt(testData, password);
    const unsupported = { ...encrypted, version: 99 as any };

    await expect(decrypt(unsupported, password)).rejects.toThrow('unsupported format version');
  });

  it('非対応 KDF を拒否すること', async () => {
    const encrypted = await encrypt(testData, password);
    const unsupported = { ...encrypted, kdf: 'pbkdf2' as any };

    await expect(decrypt(unsupported, password)).rejects.toThrow('unsupported KDF');
  });

  it('非対応 cipher を拒否すること', async () => {
    const encrypted = await encrypt(testData, password);
    const unsupported = { ...encrypted, cipher: 'aes-128-cbc' as any };

    await expect(decrypt(unsupported, password)).rejects.toThrow('unsupported cipher');
  });
});
