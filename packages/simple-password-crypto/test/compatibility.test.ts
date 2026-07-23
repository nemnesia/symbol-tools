import { gcm } from '@noble/ciphers/aes.js';
import { argon2idAsync } from '@noble/hashes/argon2.js';
import { randomBytes, utf8ToBytes } from '@noble/hashes/utils.js';
import { describe, expect, it } from 'vitest';

import { decrypt, encrypt } from '../src/index.js';

describe('互換性テスト', () => {
  it('文字列データを正しく処理できる', async () => {
    const testString = 'Test String 123';
    const plaintext = new TextEncoder().encode(testString);
    const password = 'password123';

    const encrypted = await encrypt(plaintext, password);
    const decrypted = await decrypt(encrypted, password);
    const result = new TextDecoder().decode(decrypted);

    expect(result).toBe(testString);
  });

  it('JSONデータを正しく処理できる', async () => {
    const testData = { name: 'Alice', age: 30, items: [1, 2, 3] };
    const jsonString = JSON.stringify(testData);
    const plaintext = new TextEncoder().encode(jsonString);
    const password = 'json-password';

    const encrypted = await encrypt(plaintext, password);
    const decrypted = await decrypt(encrypted, password);
    const result = JSON.parse(new TextDecoder().decode(decrypted));

    expect(result).toEqual(testData);
  });

  it('複数のパスワードで異なるデータを暗号化・復号できる', { timeout: 30000 }, async () => {
    const data1 = new TextEncoder().encode('Data 1');
    const data2 = new TextEncoder().encode('Data 2');
    const password1 = 'password1';
    const password2 = 'password2';

    const encrypted1 = await encrypt(data1, password1);
    const encrypted2 = await encrypt(data2, password2);

    const decrypted1 = await decrypt(encrypted1, password1);
    const decrypted2 = await decrypt(encrypted2, password2);

    expect(decrypted1).toEqual(data1);
    expect(decrypted2).toEqual(data2);

    // 異なるパスワードでは復号できない
    await expect(decrypt(encrypted1, password2)).rejects.toThrow();
    await expect(decrypt(encrypted2, password1)).rejects.toThrow();
  });

  it('同じパスワードで複数のデータを暗号化・復号できる', { timeout: 30000 }, async () => {
    const password = 'shared-password';
    const data1 = new TextEncoder().encode('Message 1');
    const data2 = new TextEncoder().encode('Message 2');
    const data3 = new TextEncoder().encode('Message 3');

    const encrypted1 = await encrypt(data1, password);
    const encrypted2 = await encrypt(data2, password);
    const encrypted3 = await encrypt(data3, password);

    const decrypted1 = await decrypt(encrypted1, password);
    const decrypted2 = await decrypt(encrypted2, password);
    const decrypted3 = await decrypt(encrypted3, password);

    expect(decrypted1).toEqual(data1);
    expect(decrypted2).toEqual(data2);
    expect(decrypted3).toEqual(data3);
  });

  it('絵文字を含むデータを正しく処理できる', async () => {
    const emojiText = '🔐 Secure Data 🔑 パスワード 💻';
    const plaintext = new TextEncoder().encode(emojiText);
    const password = 'emoji-password';

    const encrypted = await encrypt(plaintext, password);
    const decrypted = await decrypt(encrypted, password);
    const result = new TextDecoder().decode(decrypted);

    expect(result).toBe(emojiText);
  });

  it('改行を含むデータを正しく処理できる', async () => {
    const multilineText = 'Line 1\nLine 2\r\nLine 3\rLine 4';
    const plaintext = new TextEncoder().encode(multilineText);
    const password = 'multiline-password';

    const encrypted = await encrypt(plaintext, password);
    const decrypted = await decrypt(encrypted, password);
    const result = new TextDecoder().decode(decrypted);

    expect(result).toBe(multilineText);
  });

  it('v1 より前の形式を移行目的で復号できる', async () => {
    const salt = randomBytes(16);
    const nonce = randomBytes(12);
    const legacyPlaintext = new TextEncoder().encode('legacy encrypted value');
    const legacyPassword = 'legacy-password';
    const key = await argon2idAsync(utf8ToBytes(legacyPassword), salt, {
      m: 32768,
      t: 2,
      p: 1,
      dkLen: 32,
    });
    const ciphertextWithTag = gcm(key, nonce).encrypt(legacyPlaintext);
    const combined = new Uint8Array(nonce.length + ciphertextWithTag.length);
    combined.set(nonce);
    combined.set(ciphertextWithTag.slice(-16), nonce.length);
    combined.set(ciphertextWithTag.slice(0, -16), nonce.length + 16);

    const decrypted = await decrypt(
      { salt: Buffer.from(salt).toString('base64'), ciphertext: Buffer.from(combined).toString('base64') },
      legacyPassword
    );
    expect(decrypted).toEqual(legacyPlaintext);
  });
});
