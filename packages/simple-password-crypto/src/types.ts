/**
 * KDF (鍵導出関数) の種類
 */
export type KdfType = 'argon2id';

/**
 * 暗号アルゴリズムの種類
 */
export type CipherType = 'aes-256-gcm';

/**
 * Argon2id KDF パラメータ
 */
export interface Argon2idParams {
  memoryCost: number;
  timeCost: number;
  parallelism: number;
}

/**
 * シンプルな暗号化データフォーマット
 * nonce(12byte) + tag(16byte) + ciphertext を base64連結し ciphertext に格納
 * salt はKDF用。ciphertextとsaltのみで復号可能。
 */
export interface EncryptedData {
  salt: string; // base64 (KDF用)
  ciphertext: string; // base64 (nonce+tag+ciphertext 連結)
}
