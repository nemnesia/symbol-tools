import { PrivateKey, PublicKey, Signature, deepCompare } from '@nemnesia/symbol-catbuffer';
import { getPublicKey, hashes, sign, verify } from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha2.js';

/**
 * @noble/ed25519用にSHA-512ハッシュ関数を設定
 */
hashes.sha512 = sha512;

/**
 * Symbolキーペアクラス
 */
export class SymbolKeyPair {
  /** 秘密鍵 */
  private _privateKey: PrivateKey;
  /** 公開鍵 */
  private _publicKey: PublicKey;

  /**
   * コンストラクタ
   *
   * @param {PrivateKey} privateKey 16進文字列形式の32バイトの秘密鍵
   */
  constructor(privateKey: PrivateKey) {
    this._privateKey = privateKey;
    this._publicKey = new PublicKey(getPublicKey(this._privateKey.bytes));
  }

  /**
   * 秘密鍵取得
   */
  get privateKey(): PrivateKey {
    return this._privateKey;
  }

  /**
   * 公開鍵取得
   */
  get publicKey(): PublicKey {
    return this._publicKey;
  }

  /**
   * メッセージに署名
   *
   * @param {Uint8Array} message 署名対象メッセージ
   * @returns {Signature} 署名データ
   */
  sign(message: Uint8Array): Signature {
    return new Signature(sign(message, this._privateKey.bytes));
  }
}

/**
 * SymbolVerifierクラス
 */
export class SymbolVerifier {
  /** 公開鍵 */
  private _publicKey: PublicKey;

  /**
   * コンストラクタ
   *
   * @param publicKey 公開鍵
   */
  constructor(publicKey: PublicKey) {
    if (0 === deepCompare(new Uint8Array(PublicKey.SIZE), publicKey.bytes))
      throw new Error('public key cannot be zero');
    this._publicKey = publicKey;
  }

  /**
   * 検証
   *
   * @param {Uint8Array} message 署名対象メッセージ
   * @param {Signature} signature 署名データ
   * @returns {boolean} 検証結果
   */
  verify(message: Uint8Array, signature: Signature): boolean {
    return verify(signature.bytes, message, this._publicKey.bytes);
  }
}
