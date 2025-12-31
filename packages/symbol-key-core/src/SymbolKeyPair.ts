import { getPublicKey, hashes, sign } from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha2.js';
import { randomBytes } from '@noble/hashes/utils.js';

import { SymbolTransaction } from './SymbolTransaction.js';
import { SymbolUtils } from './SymbolUtils.js';

/**
 * @noble/ed25519用にSHA-512ハッシュ関数を設定
 */
hashes.sha512 = sha512;

/**
 * Symbolキーペアクラス
 */
export class SymbolKeyPair {
  /** 秘密鍵 */
  private _privateKey: string;
  /** 公開鍵 */
  private _publicKey: string;

  /**
   * コンストラクタ
   *
   * @param {string} privateKey 16進文字列形式の32バイトの秘密鍵
   */
  constructor(privateKey: string) {
    this._privateKey = privateKey.toUpperCase();
    this._publicKey = this.getSymbolPublicKey(this._privateKey);
  }

  /**
   * 秘密鍵取得
   */
  get privateKey(): string {
    return this._privateKey;
  }

  /**
   * 公開鍵取得
   */
  get publicKey(): string {
    return this._publicKey;
  }

  /**
   * Symbol秘密鍵をランダム生成
   *
   * @returns {string} 16進文字列形式の32バイトの秘密鍵
   */
  generateRandomPrivateKey(): string {
    const randomKey = randomBytes(32);
    return Array.from(randomKey)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
  }

  /**
   * ed25519秘密鍵から公開鍵を算出
   *
   * @param {string} privateKey 32バイト秘密鍵
   * @returns {string} 32バイト公開鍵
   */
  getSymbolPublicKey(privateKey: string): string {
    if (privateKey.length !== 64) throw new Error('Private key must be a 32-byte hex string.');

    const privKeyBytes = new Uint8Array(privateKey.match(/.{2}/g)!.map((byte) => parseInt(byte, 16)));
    const pubKeyBytes = getPublicKey(privKeyBytes);
    return Array.from(pubKeyBytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
  }

  /**
   * アドレスを取得
   *
   * @param {number | string} network ネットワークIDまたはネットワーク名
   * @returns {string} アドレス (Base32形式)
   */
  toAddress(network: number | string): string {
    return SymbolUtils.publicKeyToAddress(this._publicKey, network);
  }

  /**
   * メッセージに署名
   *
   * @param {Uint8Array} message 署名対象メッセージ
   * @returns {Uint8Array} 署名データ
   */
  sign(message: Uint8Array): Uint8Array {
    return sign(message, SymbolUtils.hexToUint8(this._privateKey));
  }

  /**
   * Symbolトランザクション署名
   *
   * @param {string} networkName ネットワーク名
   * @param {Uint8Array} txPayload トランザクションバイト列
   * @returns {Uint8Array} 署名
   */
  signTransaction(networkName: string, txPayload: Uint8Array): Uint8Array {
    // 署名対象データを抽出
    const transaction = SymbolTransaction.parse(txPayload);
    const signingData = transaction.transactionDataBuffer();

    // generationHashSeed + 署名対象データ
    const generationHashSeed = SymbolUtils.getGenerationHashSeed(networkName);
    const data = new Uint8Array(generationHashSeed.length + signingData.length);
    data.set(generationHashSeed, 0);
    data.set(signingData, generationHashSeed.length);

    return this.sign(data);
  }

  /**
   * トランザクションハッシュに対する連署名を生成
   *
   * @param {Uint8Array} transactionHash トランザクションハッシュ
   * @param {boolean} detached デタッチフラグ
   * @returns {{version: bigint, signerPublicKey: string, signature: Uint8Array, parentHash?: Uint8Array}} 連署名オブジェクト
   */
  cosignTransactionHash(
    transactionHash: Uint8Array,
    detached = false
  ): { version: bigint; signerPublicKey: string; signature: Uint8Array; parentHash?: Uint8Array } {
    const cosignature: {
      version: bigint;
      signerPublicKey: string;
      signature: Uint8Array;
      parentHash?: Uint8Array;
    } = {
      version: 0n,
      signerPublicKey: this._publicKey,
      signature: this.sign(transactionHash),
      parentHash: undefined,
    };

    if (detached) {
      cosignature.parentHash = transactionHash;
      return cosignature;
    }

    return cosignature;
  }

  /**
   * トランザクションペイロードに対する連署名を生成
   * @param {Uint8Array} txPayload トランザクションペイロード
   * @param {string} networkName ネットワーク名
   * @param {boolean} detached デタッチフラグ
   * @returns {{version: bigint, signerPublicKey: string, signature: Uint8Array, parentHash?: Uint8Array}} 連署名オブジェクト
   */
  cosignTransaction(
    txPayload: Uint8Array,
    networkName: string,
    detached: boolean = false
  ): { version: bigint; signerPublicKey: string; signature: Uint8Array; parentHash?: Uint8Array } {
    const transactionHash = SymbolTransaction.parse(txPayload).hashTransaction(networkName);
    return this.cosignTransactionHash(transactionHash, detached);
  }
}
