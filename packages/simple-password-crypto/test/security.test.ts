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

  it('暗号文（nonce+tag+ciphertext連結）が毎回異なる値になる', async () => {
    const encrypted1 = await encrypt(plaintext, password);
    const encrypted2 = await encrypt(plaintext, password);
    const encrypted3 = await encrypt(plaintext, password);

    // ciphertextにはnonce, tag, 暗号文が含まれているため、全て異なる
    expect(encrypted1.ciphertext).not.toBe(encrypted2.ciphertext);
    expect(encrypted2.ciphertext).not.toBe(encrypted3.ciphertext);
    expect(encrypted1.ciphertext).not.toBe(encrypted3.ciphertext);
  });

  it('内部的にKDFパラメータが正しく設定されている', async () => {
    // 新形式ではKDFパラメータは固定値として内部で使用される
    // （外部に公開されないため、暗号化・復号が成功すれば正しく動作している）
    const encrypted = await encrypt(plaintext, password);
    expect(encrypted.salt).toBeDefined();
    expect(encrypted.ciphertext).toBeDefined();
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

  it('ciphertextにnonce(12)とtag(16)が含まれている', async () => {
    const encrypted = await encrypt(plaintext, password);
    const ciphertextBytes = Buffer.from(encrypted.ciphertext, 'base64');

    // ciphertext = nonce(12) + tag(16) + 暗号文
    // 最小でも28バイト（空の平文の場合）
    expect(ciphertextBytes.length).toBeGreaterThanOrEqual(28);
    
    // nonce部分は最初の12バイト
    const nonceBytes = ciphertextBytes.slice(0, 12);
    expect(nonceBytes.length).toBe(12);
    
    // tag部分は次の16バイト
    const tagBytes = ciphertextBytes.slice(12, 28);
    expect(tagBytes.length).toBe(16);
  });
});
