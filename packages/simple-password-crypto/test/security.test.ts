import { describe, expect, it } from 'vitest';

import { encrypt } from '../src/index.js';

describe('セキュリティ特性', () => {
  const plaintext = new TextEncoder().encode('Sensitive Data');
  const password = 'secure-password';

  it('ソルトが毎回異なる値になる', async () => {
    const encrypted1 = await encrypt(plaintext, password);
    const encrypted2 = await encrypt(plaintext, password);
    const encrypted3 = await encrypt(plaintext, password);

    expect(encrypted1.salt).not.toBe(encrypted2.salt);
    expect(encrypted2.salt).not.toBe(encrypted3.salt);
    expect(encrypted1.salt).not.toBe(encrypted3.salt);
  });

  it('nonceが毎回異なる値になる', async () => {
    const encrypted1 = await encrypt(plaintext, password);
    const encrypted2 = await encrypt(plaintext, password);
    const encrypted3 = await encrypt(plaintext, password);

    expect(encrypted1.nonce).not.toBe(encrypted2.nonce);
    expect(encrypted2.nonce).not.toBe(encrypted3.nonce);
    expect(encrypted1.nonce).not.toBe(encrypted3.nonce);
  });

  it('暗号文が毎回異なる値になる', async () => {
    const encrypted1 = await encrypt(plaintext, password);
    const encrypted2 = await encrypt(plaintext, password);
    const encrypted3 = await encrypt(plaintext, password);

    expect(encrypted1.ciphertext).not.toBe(encrypted2.ciphertext);
    expect(encrypted2.ciphertext).not.toBe(encrypted3.ciphertext);
    expect(encrypted1.ciphertext).not.toBe(encrypted3.ciphertext);
  });

  it('認証タグが毎回異なる値になる', async () => {
    const encrypted1 = await encrypt(plaintext, password);
    const encrypted2 = await encrypt(plaintext, password);
    const encrypted3 = await encrypt(plaintext, password);

    expect(encrypted1.tag).not.toBe(encrypted2.tag);
    expect(encrypted2.tag).not.toBe(encrypted3.tag);
    expect(encrypted1.tag).not.toBe(encrypted3.tag);
  });

  it('KDFパラメータが正しく設定されている', async () => {
    const encrypted = await encrypt(plaintext, password);

    // セキュリティとパフォーマンスのバランスを取ったパラメータ
    expect(encrypted.kdfParams.memoryCost).toBe(32768); // 32MB
    expect(encrypted.kdfParams.timeCost).toBe(2);
    expect(encrypted.kdfParams.parallelism).toBe(1);
  });

  it('暗号化データに平文が含まれていない', async () => {
    const secretText = 'very-secret-text-12345';
    const secretData = new TextEncoder().encode(secretText);
    const encrypted = await encrypt(secretData, password);

    const encryptedString = JSON.stringify(encrypted);
    expect(encryptedString).not.toContain('very-secret-text-12345');
    expect(encryptedString.toLowerCase()).not.toContain('secret');
  });

  it('暗号化データにパスワードが含まれていない', async () => {
    const testPassword = 'my-super-secret-password-xyz';
    const encrypted = await encrypt(plaintext, testPassword);

    const encryptedString = JSON.stringify(encrypted);
    expect(encryptedString).not.toContain('my-super-secret-password-xyz');
    expect(encryptedString.toLowerCase()).not.toContain('password');
  });

  it('saltが適切な長さである', async () => {
    const encrypted = await encrypt(plaintext, password);
    const saltBytes = Buffer.from(encrypted.salt, 'base64');

    expect(saltBytes.length).toBe(16); // 128ビット
  });

  it('nonceが適切な長さである', async () => {
    const encrypted = await encrypt(plaintext, password);
    const nonceBytes = Buffer.from(encrypted.nonce, 'base64');

    expect(nonceBytes.length).toBe(12); // 96ビット（AES-GCM推奨値）
  });

  it('認証タグが適切な長さである', async () => {
    const encrypted = await encrypt(plaintext, password);
    const tagBytes = Buffer.from(encrypted.tag, 'base64');

    expect(tagBytes.length).toBe(16); // 128ビット
  });
});
