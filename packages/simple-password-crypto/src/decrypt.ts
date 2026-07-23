import { gcm } from '@noble/ciphers/aes.js';
import { argon2idAsync } from '@noble/hashes/argon2.js';
import { clean, utf8ToBytes } from '@noble/hashes/utils.js';

import { fromBase64 } from './base64.js';
import {
  ARGON2ID_PARAMS,
  CIPHER,
  ENCRYPTED_DATA_VERSION,
  KDF,
  MAX_CIPHERTEXT_BASE64_LENGTH,
  MAX_COMBINED_LENGTH,
  NONCE_LENGTH,
  SALT_LENGTH,
  TAG_LENGTH,
  metadataToAad,
} from './constants.js';
import type { Argon2idParams, EncryptedData, LegacyEncryptedData } from './types.js';

function hasExpectedParameters(params: unknown): params is Argon2idParams {
  if (typeof params !== 'object' || params === null) return false;
  const candidate = params as Argon2idParams;
  return (
    candidate.memoryCost === ARGON2ID_PARAMS.memoryCost &&
    candidate.timeCost === ARGON2ID_PARAMS.timeCost &&
    candidate.parallelism === ARGON2ID_PARAMS.parallelism
  );
}

function isVersionedData(data: EncryptedData | LegacyEncryptedData): data is EncryptedData {
  return 'version' in data;
}

function validateData(data: EncryptedData | LegacyEncryptedData): void {
  if (
    typeof data !== 'object' ||
    data === null ||
    typeof data.salt !== 'string' ||
    typeof data.ciphertext !== 'string'
  ) {
    throw new Error('Invalid encrypted data');
  }
  if (data.ciphertext.length > MAX_CIPHERTEXT_BASE64_LENGTH) throw new Error('Invalid encrypted data');

  if (isVersionedData(data)) {
    if (
      data.version !== ENCRYPTED_DATA_VERSION ||
      data.kdf !== KDF ||
      data.cipher !== CIPHER ||
      !hasExpectedParameters(data.kdfParams)
    ) {
      throw new Error('Invalid encrypted data');
    }
  }
}

async function deriveKey(password: string, salt: Uint8Array): Promise<Uint8Array> {
  const passwordBytes = utf8ToBytes(password);
  try {
    return await argon2idAsync(passwordBytes, salt, {
      m: ARGON2ID_PARAMS.memoryCost,
      t: ARGON2ID_PARAMS.timeCost,
      p: ARGON2ID_PARAMS.parallelism,
      dkLen: 32,
    });
  } finally {
    clean(passwordBytes);
  }
}

/**
 * 暗号化データをパスワードで復号します。
 *
 * バージョン付き形式ではメタデータを AAD として検証します。旧 `{ salt, ciphertext }`
 * 形式も移行目的で読み取れますが、メタデータの認証は行えません。旧形式を復号した後は
 * `encrypt` で再暗号化してください。
 *
 * 失敗理由（パスワード誤り、改ざん、形式不正）は区別せず同じエラーを返します。
 *
 * @param data - `encrypt` の戻り値、または移行対象の旧形式データ
 * @param password - 鍵導出に使用したパスワード
 * @returns 復号した平文
 * @throws {Error} 復号できない、または入力が不正な場合。メッセージは常に `Decryption failed`
 */
export async function decrypt(data: EncryptedData | LegacyEncryptedData, password: string): Promise<Uint8Array> {
  try {
    if (typeof password !== 'string') throw new Error('Invalid password');
    validateData(data);

    const salt = fromBase64(data.salt);
    const combined = fromBase64(data.ciphertext);
    if (
      salt.length !== SALT_LENGTH ||
      combined.length < NONCE_LENGTH + TAG_LENGTH ||
      combined.length > MAX_COMBINED_LENGTH
    ) {
      throw new Error('Invalid encrypted data');
    }

    const nonce = combined.slice(0, NONCE_LENGTH);
    const tag = combined.slice(NONCE_LENGTH, NONCE_LENGTH + TAG_LENGTH);
    const ciphertext = combined.slice(NONCE_LENGTH + TAG_LENGTH);
    const ciphertextWithTag = new Uint8Array(ciphertext.length + tag.length);
    ciphertextWithTag.set(ciphertext);
    ciphertextWithTag.set(tag, ciphertext.length);

    const key = await deriveKey(password, salt);
    const aad = isVersionedData(data) ? metadataToAad() : undefined;
    try {
      return gcm(key, nonce, aad).decrypt(ciphertextWithTag);
    } finally {
      clean(key);
    }
  } catch {
    // Do not distinguish wrong passwords, unauthenticated data or malformed data.
    throw new Error('Decryption failed');
  }
}
