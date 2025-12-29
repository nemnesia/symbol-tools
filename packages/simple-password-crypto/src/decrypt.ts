import { gcm } from '@noble/ciphers/aes';
import { argon2id } from '@noble/hashes/argon2';
import { utf8ToBytes } from '@noble/hashes/utils';

import type { EncryptedData } from './types.js';
import { CURRENT_VERSION } from './version.js';

/**
 * 環境に応じたArgon2id KDF実装を選択
 * Node.js環境: ネイティブargon2ライブラリ（高速）
 * ブラウザ環境: @noble/hashes（ピュアJS、移植性高い）
 */
async function deriveKey(
  password: string,
  salt: Uint8Array,
  params: { memoryCost: number; timeCost: number; parallelism: number }
): Promise<Uint8Array> {
  // Node.js環境でargon2が利用可能か試行
  try {
    // dynamic import でoptionalDependencyを読み込み
    const argon2Module = await import('argon2');
    const key = await argon2Module.hash(password, {
      memoryCost: params.memoryCost,
      timeCost: params.timeCost,
      parallelism: params.parallelism,
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
      m: params.memoryCost,
      t: params.timeCost,
      p: params.parallelism,
      dkLen: 32,
    });
  }
}

/**
 * パスワードで暗号化データを復号
 *
 * @param data - メタデータを含む暗号化データ
 * @param password - 復号用パスワード
 * @returns 復号された平文
 *
 * @throws 復号に失敗した場合はエラー（パスワード誤り、データ破損、非対応フォーマット）
 *
 * 注意: エラーメッセージは情報漏洩を防ぐため意図的に一般的な内容にしています
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
    // base64デコード用のヘルパー関数
    const fromBase64 = (base64: string): Uint8Array => {
      if (typeof Buffer !== 'undefined') {
        return new Uint8Array(Buffer.from(base64, 'base64'));
      }
      // ブラウザ環境
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

    // 環境に応じた実装でArgon2idを使用してパスワードから鍵を導出
    const key = await deriveKey(password, salt, data.kdfParams);

    // タグと暗号文を結合（@noble/ciphers の gcm は結合されたデータを期待）
    const combined = new Uint8Array(ciphertext.length + tag.length);
    combined.set(ciphertext);
    combined.set(tag, ciphertext.length);

    // データを復号
    const aes = gcm(key, nonce);
    const decrypted = aes.decrypt(combined); // 認証に失敗するとここでエラーがスローされる

    return decrypted;
  } catch {
    // 情報漏洩を防ぐための一般的なエラーメッセージ
    // （パスワードが間違っているのかデータが破損しているのか明かさない）
    throw new Error('Decryption failed');
  }
}
