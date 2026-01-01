import { PrivateKey, PublicKey, Signature } from '@nemnesia/symbol-catbuffer';
import { getPublicKey, hashes, sign } from '@noble/ed25519';
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
    this._publicKey = this.getSymbolPublicKey(this._privateKey);
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
   * ed25519秘密鍵から公開鍵を算出
   *
   * @param {PrivateKey} privateKey 32バイト秘密鍵
   * @returns {PublicKey} 32バイト公開鍵
   */
  getSymbolPublicKey(privateKey: PrivateKey): PublicKey {
    const pubKeyBytes = getPublicKey(privateKey.bytes);
    return new PublicKey(pubKeyBytes);
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
