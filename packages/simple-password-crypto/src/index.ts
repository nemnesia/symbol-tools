/**
 * simple-password-crypto
 *
 * ウォレット、プロファイル、秘密鍵のための安全なパスワードベース暗号化・復号
 *
 * 特徴:
 * - KDF: Argon2id（モダンで安全な鍵導出）
 * - Cipher: AES-256-GCM（認証付き暗号）
 * - TPM不要
 * - Node/Electron互換
 */

export { encrypt } from './encrypt.js';
export { decrypt } from './decrypt.js';
export type { EncryptedData, KdfType, CipherType, Argon2idParams } from './types.js';
export { CURRENT_VERSION } from './version.js';
