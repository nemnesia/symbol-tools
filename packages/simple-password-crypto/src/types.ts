/** 鍵導出関数の識別子。 */
export type KdfType = 'argon2id';

/** 認証付き暗号方式の識別子。 */
export type CipherType = 'aes-256-gcm';

/**
 * Argon2id の鍵導出パラメータ。値は KiB 単位のメモリコスト、反復回数、並列度です。
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

/**
 * v1 より前に出力された、メタデータを持たない読み取り専用形式。
 *
 * この形式を新たに生成しないでください。復号後に `EncryptedData` 形式へ移行します。
 */
export interface LegacyEncryptedData {
  salt: string;
  ciphertext: string;
}
