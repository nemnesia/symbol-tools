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
 * 暗号化データフォーマット
 * 復号に必要なすべての情報を含む
 */
export interface EncryptedData {
  version: 1;
  kdf: KdfType;
  kdfParams: Argon2idParams;
  cipher: CipherType;
  salt: string; // base64
  nonce: string; // base64
  ciphertext: string; // base64
  tag: string; // base64
}
