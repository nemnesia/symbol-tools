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
 * バージョン付き暗号化データフォーマット。
 *
 * `version`、KDF とそのパラメータ、暗号方式は AES-GCM の AAD として認証される。
 * `ciphertext` は nonce(12 byte) + tag(16 byte) + ciphertext の base64 連結値。
 */
export interface EncryptedData {
  version: 1;
  kdf: KdfType;
  kdfParams: Argon2idParams;
  cipher: CipherType;
  salt: string; // base64 (KDF用)
  ciphertext: string; // base64 (nonce+tag+ciphertext 連結)
}

/** v1 より前に出力された、メタデータを持たないデータの読み取り専用形式。 */
export interface LegacyEncryptedData {
  salt: string;
  ciphertext: string;
}
