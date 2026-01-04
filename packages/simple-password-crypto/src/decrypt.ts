import { gcm } from '@noble/ciphers/aes';
import { argon2id } from '@noble/hashes/argon2';
import { utf8ToBytes } from '@noble/hashes/utils';

import type { EncryptedData } from './types.js';
import { CURRENT_VERSION } from './version.js';

/**
 * Argon2id KDFでパスワードから鍵を導出する
 *
 * @param {string} password - パスワード
 * @param {Uint8Array} salt - ソルト
 * @param {{ memoryCost: number; timeCost: number; parallelism: number }} params - Argon2idパラメータ
 * @returns {Promise<Uint8Array>} 32バイトの鍵
 */
async function deriveKey(
  password: string,
  salt: Uint8Array,
  params: { memoryCost: number; timeCost: number; parallelism: number }
): Promise<Uint8Array> {
  const passwordBytes = utf8ToBytes(password);
  return argon2id(passwordBytes, salt, {
    m: params.memoryCost,
    t: params.timeCost,
    p: params.parallelism,
    dkLen: 32,
  });
}

/**
 * パスワードで暗号化データを復号する
 *
 * @param {EncryptedData} data - メタデータを含む暗号化データ
 * @param {string} password - 復号用パスワード
 * @returns {Promise<Uint8Array>} 復号された平文
 * @throws {Error} 復号に失敗した場合（パスワード誤り、データ破損、非対応フォーマット）
 * @note エラーメッセージは情報漏洩を防ぐため意図的に一般的な内容にしています
 */
export async function decrypt(data: EncryptedData, password: string): Promise<Uint8Array> {
  // バージョンの検証
  if (data.version !== CURRENT_VERSION) {
    throw new Error('Decryption failed: unsupported format version');
  }

  // アルゴリズムの検証
  if (data.kdf !== 'argon2id') {
    throw new Error('Decryption failed: unsupported KDF');
  }
  if (data.cipher !== 'aes-256-gcm') {
    throw new Error('Decryption failed: unsupported cipher');
  }

  try {
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

    // base64データをデコード
    const salt = fromBase64(data.salt);
    const nonce = fromBase64(data.nonce);
    const ciphertext = fromBase64(data.ciphertext);
    const tag = fromBase64(data.tag);

    const key = await deriveKey(password, salt, data.kdfParams);

    // タグと暗号文を結合
    const combined = new Uint8Array(ciphertext.length + tag.length);
    combined.set(ciphertext);
    combined.set(tag, ciphertext.length);

    const aes = gcm(key, nonce);
    const decrypted = aes.decrypt(combined);

    return decrypted;
  } catch {
    // 情報漏洩を防ぐため一般的なエラーメッセージを返す
    throw new Error('Decryption failed');
  }
}
