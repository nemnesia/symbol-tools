import { gcm } from '@noble/ciphers/aes';
import { randomBytes } from '@noble/ciphers/webcrypto';
import { argon2id } from '@noble/hashes/argon2';
import { utf8ToBytes } from '@noble/hashes/utils';

import type { EncryptedData } from './types.js';

/**
 * Argon2id パラメータ（固定値）
 */
const ARGON2_PARAMS = {
  m: 32768, // memoryCost: 32MB（高速化）
  t: 2, // timeCost（高速化）
  p: 1, // parallelism
} as const;

/**
 * AES-GCM nonce 長（96ビット、推奨値）
 */
const AES_NONCE_LENGTH = 12;

/**
 * Argon2id KDFでパスワードから鍵を導出する
 *
 * @param {string} password - パスワード
 * @param {Uint8Array} salt - ソルト
 * @returns {Promise<Uint8Array>} 32バイトの鍵
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<Uint8Array> {
  const passwordBytes = utf8ToBytes(password);
  return argon2id(passwordBytes, salt, {
    ...ARGON2_PARAMS,
    dkLen: 32,
  });
}

/**
 * Argon2id + AES-256-GCM でデータを暗号化する
 *
 * @param {Uint8Array} plaintext - 暗号化するデータ
 * @param {string} password - 暗号化用パスワード
 * @returns {Promise<EncryptedData>} 暗号化データ（メタ情報含む）
 * @throws {Error} 暗号化に失敗した場合
 */
export async function encrypt(plaintext: Uint8Array, password: string): Promise<EncryptedData> {
  const salt = randomBytes(16);
  const key = await deriveKey(password, salt);
  const nonce = randomBytes(AES_NONCE_LENGTH);

  const aes = gcm(key, nonce);
  const ciphertextWithTag = aes.encrypt(plaintext); // ciphertext + tag (GCM)
  const tagLength = 16;
  // ciphertextWithTag = ciphertext + tag
  // 連結形式: [nonce(12)][tag(16)][ciphertext]
  const combined = new Uint8Array(nonce.length + tagLength + (ciphertextWithTag.length - tagLength));
  combined.set(nonce, 0);
  combined.set(ciphertextWithTag.slice(-tagLength), nonce.length); // tag
  combined.set(ciphertextWithTag.slice(0, -tagLength), nonce.length + tagLength); // ciphertext

  const toBase64 = (bytes: Uint8Array): string => {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(bytes).toString('base64');
    }
    const binary = String.fromCharCode(...bytes);
    return btoa(binary);
  };

  return {
    salt: toBase64(salt),
    ciphertext: toBase64(combined),
  };
}
