import { describe, expect, it } from 'vitest';

import { decrypt, encrypt } from '../src/index.js';

describe('encrypt/decrypt', () => {
  const password = 'test-password-123';
  const plaintext = new TextEncoder().encode('Hello, World!');

  it('正常に暗号化・復号できる', async () => {
    const encrypted = await encrypt(plaintext, password);
    const decrypted = await decrypt(encrypted, password);

    expect(decrypted).toEqual(plaintext);
  });

  it('暗号化データが正しいフォーマットを持つ', async () => {
    const encrypted = await encrypt(plaintext, password);

    expect(encrypted.version).toBe(1);
    expect(encrypted.kdf).toBe('argon2id');
    expect(encrypted.cipher).toBe('aes-256-gcm');
    expect(encrypted.kdfParams).toEqual({
      memoryCost: 32768,
      timeCost: 2,
      parallelism: 1,
    });
    expect(typeof encrypted.salt).toBe('string');
    expect(typeof encrypted.nonce).toBe('string');
    expect(typeof encrypted.ciphertext).toBe('string');
    expect(typeof encrypted.tag).toBe('string');
  });

  it('異なるパスワードで復号に失敗する', async () => {
    const encrypted = await encrypt(plaintext, password);

    await expect(decrypt(encrypted, 'wrong-password')).rejects.toThrow('Decryption failed');
  });

  it('同じデータでも暗号化のたびに異なる結果を返す', async () => {
    const encrypted1 = await encrypt(plaintext, password);
    const encrypted2 = await encrypt(plaintext, password);

    expect(encrypted1.salt).not.toBe(encrypted2.salt);
    expect(encrypted1.nonce).not.toBe(encrypted2.nonce);
    expect(encrypted1.ciphertext).not.toBe(encrypted2.ciphertext);
    expect(encrypted1.tag).not.toBe(encrypted2.tag);
  });

  it('空のデータを暗号化・復号できる', async () => {
    const emptyData = new Uint8Array(0);
    const encrypted = await encrypt(emptyData, password);
    const decrypted = await decrypt(encrypted, password);

    expect(decrypted).toEqual(emptyData);
  });

  it('大きなデータを暗号化・復号できる', { timeout: 15000 }, async () => {
    const largeData = new Uint8Array(1024 * 1024); // 1MB
    for (let i = 0; i < largeData.length; i++) {
      largeData[i] = i % 256;
    }

    const encrypted = await encrypt(largeData, password);
    const decrypted = await decrypt(encrypted, password);

    expect(decrypted).toEqual(largeData);
  });

  it('日本語を含むデータを暗号化・復号できる', async () => {
    const japaneseText = new TextEncoder().encode('こんにちは、世界！');
    const encrypted = await encrypt(japaneseText, password);
    const decrypted = await decrypt(encrypted, password);

    expect(decrypted).toEqual(japaneseText);
    expect(new TextDecoder().decode(decrypted)).toBe('こんにちは、世界！');
  });

  it('バイナリデータを暗号化・復号できる', async () => {
    const binaryData = new Uint8Array([0x00, 0x01, 0x02, 0xff, 0xfe, 0xfd]);
    const encrypted = await encrypt(binaryData, password);
    const decrypted = await decrypt(encrypted, password);

    expect(decrypted).toEqual(binaryData);
  });

  it('特殊文字を含むパスワードで暗号化・復号できる', async () => {
    const specialPassword = 'P@ssw0rd!#$%^&*()_+-=[]{}|;:,.<>?';
    const encrypted = await encrypt(plaintext, specialPassword);
    const decrypted = await decrypt(encrypted, specialPassword);

    expect(decrypted).toEqual(plaintext);
  });

  it('非常に長いパスワードで暗号化・復号できる', async () => {
    const longPassword = 'a'.repeat(1000);
    const encrypted = await encrypt(plaintext, longPassword);
    const decrypted = await decrypt(encrypted, longPassword);

    expect(decrypted).toEqual(plaintext);
  });
});
