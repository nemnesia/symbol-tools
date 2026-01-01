import { Hash256, Signature, utils } from '@nemnesia/symbol-catbuffer';
import { Network, models } from '@nemnesia/symbol-catbuffer/symbol';
import { ripemd160 } from '@noble/hashes/legacy.js';
import { sha3_256 } from '@noble/hashes/sha3.js';

import { SymbolKeyPair, SymbolVerifier } from './SymbolKeyPair';
import { SymbolUtils } from './SymbolUtils';

/**
 * トランザクションヘッダーサイズとAggregateトランザクションサイズ定数
 */
const TRANSACTION_HEADER_SIZE = [
  4, // size
  4, // reserved1
  64, // signature
  32, // signer
  4, // reserved2
].reduce((x, y) => x + y);

/**
 * Pre-V3 Aggregateトランザクションハッシュ対象サイズ
 */
const PRE_V3_AGGREGATE_HASHED_SIZE = [
  4, // version, network, type
  8, // maxFee
  8, // deadline
  32, // transactionsHash
].reduce((x, y) => x + y);

/**
 * V3以降 Aggregateトランザクションハッシュ対象サイズ
 */
const AGGREGATE_HASHED_SIZE =
  PRE_V3_AGGREGATE_HASHED_SIZE +
  [
    4, // payloadSize
  ].reduce((x, y) => x + y);

/**
 * AggregateComplete(0x4141)
 */
const AGGREGATE_COMPLETE_TYPE = 0x4141;

/**
 * AggregateBonded(0x4241)
 */
const AGGREGATE_BONDED_TYPE = 0x4241;

/**
 * Symbolネットワーククラス
 */
export class SymbolNetwork {
  private network!: Network;

  /**
   * コンストラクタ
   *
   * @param {string} networkName ネットワーク名 ('mainnet' または 'testnet')
   */
  constructor(networkName: string) {
    Network.NETWORKS.forEach((net) => {
      if (net.name === networkName) {
        this.network = net;
      }
    });
    if (!this.network) {
      throw new Error(`Network with name ${networkName} not found.`);
    }
  }

  /**
   * 公開鍵からアドレスを生成
   *
   * @param {string} publicKey 公開鍵 (16進文字列)
   * @returns {string} アドレス (Base32形式)
   */
  publicKeyToAddress(publicKey: string): string {
    const ripemdHash = ripemd160(sha3_256(utils.hexToUint8(publicKey)));
    const versionPrefixed = new Uint8Array([this.network.identifier, ...ripemdHash]);
    const checksum = sha3_256(versionPrefixed).slice(0, 3);
    return SymbolUtils.hexToBase32Address(utils.uint8ToHex(new Uint8Array([...versionPrefixed, ...checksum])));
  }

  /**
   * トランザクションハッシュを計算
   *
   * @param {models.Transaction} payload トランザクションペイロード
   * @returns {Hash256} トランザクションハッシュ
   */
  hashTransaction(payload: models.Transaction): Hash256 {
    const hasher = sha3_256.create();
    hasher.update(payload.signature.bytes);
    hasher.update(payload.signerPublicKey.bytes);
    hasher.update(this.network.generationHashSeed.bytes);
    hasher.update(this.transactionDataBuffer(payload.serialize()));
    return new Hash256(hasher.digest());
  }

  /**
   * Aggregateトランザクションか判定
   *
   * @param {Uint8Array} txBuffer トランザクションバイト列
   * @returns {boolean} Aggregateトランザクションならtrue
   */
  isAggregateTransaction(txBuffer: Uint8Array): boolean {
    const transactionTypeOffset = TRANSACTION_HEADER_SIZE + 2;
    const transactionType = (txBuffer[transactionTypeOffset + 1] << 8) + txBuffer[transactionTypeOffset];
    const aggregateTypes = [AGGREGATE_BONDED_TYPE, AGGREGATE_COMPLETE_TYPE];
    return aggregateTypes.some((aggregateType) => aggregateType === transactionType);
  }

  /**
   * トランザクションハッシュに対する連署名を生成
   *
   * @param {SymbolKeyPair} keyPair 連署名者のキーペア
   * @param {Hash256} transactionHash トランザクションハッシュ
   * @param {boolean} detached デタッチフラグ
   * @returns {models.Cosignature | models.DetachedCosignature} 連署名オブジェクト
   */
  cosignTransactionHash(
    keyPair: SymbolKeyPair,
    transactionHash: Hash256,
    detached: boolean = false
  ): models.Cosignature | models.DetachedCosignature {
    const initializeCosignature = (cosignature: models.Cosignature | models.DetachedCosignature) => {
      cosignature.version = 0n;
      cosignature.signerPublicKey = new models.PublicKey(keyPair.publicKey.bytes);
      cosignature.signature = new models.Signature(keyPair.sign(transactionHash.bytes).bytes);
    };

    if (detached) {
      const cosignature = new models.DetachedCosignature();
      cosignature.parentHash = new models.Hash256(transactionHash.bytes);
      initializeCosignature(cosignature);
      return cosignature;
    }

    const cosignature = new models.Cosignature();
    initializeCosignature(cosignature);
    return cosignature;
  }

  /**
   * トランザクションペイロードに対する連署名を生成
   *
   * @param {SymbolKeyPair} keyPair 連署名者のキーペア
   * @param {models.Transaction} transaction トランザクションペイロード
   * @param {boolean} detached デタッチフラグ
   * @returns {models.Cosignature | models.DetachedCosignature} 連署名オブジェクト
   */
  cosignTransaction(
    keyPair: SymbolKeyPair,
    transaction: models.Transaction,
    detached: boolean = false
  ): models.Cosignature | models.DetachedCosignature {
    const transactionHash = this.hashTransaction(transaction);
    return this.cosignTransactionHash(keyPair, transactionHash, detached);
  }

  /**
   * Symbolトランザクション署名
   *
   * @param {SymbolKeyPair} keyPair 連署名者のキーペア
   * @param {models.Transaction} transaction トランザクション
   * @returns {Signature} 署名
   */
  signTransaction(keyPair: SymbolKeyPair, transaction: models.Transaction): Signature {
    return keyPair.sign(this.extractSigningPayload(transaction));
  }

  /**
   * トランザクション検証
   *
   * @param {models.Transaction} transaction トランザクション
   * @param {Signature} signature 署名データ
   * @returns 検証結果
   */
  verifyTransaction(transaction: models.Transaction, signature: Signature): boolean {
    const verifyBuffer = new Uint8Array(this.extractSigningPayload(transaction));
    return new SymbolVerifier(transaction.signerPublicKey).verify(verifyBuffer, signature);
  }

  /**
   * 署名対象データバッファを取得
   *
   * @param {Uint8Array} txBuffer トランザクションバイト列
   * @returns {Uint8Array} 署名対象データバッファ
   */
  private transactionDataBuffer(txBuffer: Uint8Array): Uint8Array {
    const dataBufferStart = TRANSACTION_HEADER_SIZE;
    let dataBufferEnd = txBuffer.length;
    if (this.isAggregateTransaction(txBuffer)) {
      const version = txBuffer[TRANSACTION_HEADER_SIZE];
      dataBufferEnd = TRANSACTION_HEADER_SIZE + (3 <= version ? AGGREGATE_HASHED_SIZE : PRE_V3_AGGREGATE_HASHED_SIZE);
    }
    return txBuffer.subarray(dataBufferStart, dataBufferEnd);
  }

  /**
   * 署名ペイロードの抽出
   *
   * @param {models.Transaction} transaction トランザクション
   * @returns {Uint8Array}
   */
  private extractSigningPayload(transaction: models.Transaction): Uint8Array {
    return new Uint8Array([
      ...this.network.generationHashSeed.bytes,
      ...this.transactionDataBuffer(transaction.serialize()),
    ]);
  }
}
