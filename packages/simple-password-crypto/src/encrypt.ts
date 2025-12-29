import { gcm } from '@noble/ciphers/aes';
import { randomBytes } from '@noble/ciphers/webcrypto';
import { argon2id } from '@noble/hashes/argon2';
import { utf8ToBytes } from '@noble/hashes/utils';

import type { EncryptedData } from './types.js';
import { CURRENT_VERSION } from './version.js';

/**
 * Argon2id パラメータ（固定値）
 */
const ARGON2_PARAMS = {
  m: 65536, // memoryCost: 64MB
  t: 3, // timeCost
  p: 1, // parallelism
} as const;

/**
 * AES-GCM nonce 長（96ビット、推奨値）
 */
const AES_NONCE_LENGTH = 12;

/**
 * 環境に応じたArgon2id KDF実装を選択
 * Node.js環境: ネイティブargon2ライブラリ（高速）
 * ブラウザ環境: @noble/hashes（ピュアJS、移植性高い）
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<Uint8Array> {
  // Node.js環境でargon2が利用可能か試行
  try {
    // dynamic import でoptionalDependencyを読み込み
    const argon2Module = await import('argon2');
    const key = await argon2Module.hash(password, {
      memoryCost: ARGON2_PARAMS.m,
      timeCost: ARGON2_PARAMS.t,
      parallelism: ARGON2_PARAMS.p,
      hashLength: 32,
      type: argon2Module.argon2id,
      salt: Buffer.from(salt),
      raw: true,
    });
    return new Uint8Array(key as Buffer);
  } catch {
    // argon2が利用不可の場合は@noble/hashesにフォールバック
    const passwordBytes = utf8ToBytes(password);
    return argon2id(passwordBytes, salt, {
      ...ARGON2_PARAMS,
      dkLen: 32,
    });
  }
}

/**
 * Argon2id + AES-256-GCM を使用してパスワードで平文を暗号化
 *
 * @param plaintext - 暗号化するデータ
 * @param password - 暗号化用パスワード
 * @returns 必要なメタデータを含む暗号化データ
 *
 * @throws 暗号化に失敗した場合はエラー
 */
export async function encrypt(plaintext: Uint8Array, password: string): Promise<EncryptedData> {
  // Argon2id用のランダムソルトを生成
  const salt = randomBytes(16); // 128ビットソルト

  // 環境に応じた実装でArgon2idを使用してパスワードから鍵を導出
  const key = await deriveKey(password, salt);

  // AES-GCM用のランダムnonceを生成（暗号化ごとに一意である必要あり）
  const nonce = randomBytes(AES_NONCE_LENGTH);

  // データを暗号化
  const aes = gcm(key, nonce);
  const ciphertext = aes.encrypt(plaintext);

  // 認証タグ (最後の16バイト) を分離
  const tagLength = 16;
  const encrypted = ciphertext.slice(0, -tagLength);
  const tag = ciphertext.slice(-tagLength);

  // base64エンコード用のヘルパー関数
  const toBase64 = (bytes: Uint8Array): string => {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(bytes).toString('base64');
    }
    // ブラウザ環境
    const binary = String.fromCharCode(...bytes);
    return btoa(binary);
  };

  // すべてのメタデータを含む暗号化データを返す
  return {
    version: CURRENT_VERSION,
    kdf: 'argon2id',
    kdfParams: {
      memoryCost: ARGON2_PARAMS.m,
      timeCost: ARGON2_PARAMS.t,
      parallelism: ARGON2_PARAMS.p,
    },
    cipher: 'aes-256-gcm',
    salt: toBase64(salt),
    nonce: toBase64(nonce),
    ciphertext: toBase64(encrypted),
    tag: toBase64(tag),
  };
}
