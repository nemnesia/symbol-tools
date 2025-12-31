import { sha3_256 } from '@noble/hashes/sha3.js';

import { SymbolUtils } from './SymbolUtils';

const TRANSACTION_HEADER_SIZE = [
  4, // size
  4, // reserved1
  64, // signature
  32, // signer
  4, // reserved2
].reduce((x, y) => x + y);

const PRE_V3_AGGREGATE_HASHED_SIZE = [
  4, // version, network, type
  8, // maxFee
  8, // deadline
  32, // transactionsHash
].reduce((x, y) => x + y);

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
 * Symbolトランザクションの共通部分インターフェース
 */
export interface SymbolTransactionBase {
  size: number;
  signature: Uint8Array;
  signerPublicKey: Uint8Array;
  version: number;
  network: number;
  type: number;
  maxFee: bigint;
  deadline: bigint;
}

/**
 * AggregateトランザクションV3インターフェース
 */
export interface AggregateTransactionV3 extends SymbolTransactionBase {
  transactionsHash: Uint8Array;
  payloadSize: number;
  innerTransactions: Uint8Array;
  cosignatures: Uint8Array;
}

/**
 * パース後のSymbolトランザクション型
 */
export type ParsedSymbolTransaction = SymbolTransactionBase | (SymbolTransactionBase & Partial<AggregateTransactionV3>);

/**
 * Symbolトランザクションクラス
 */
export class SymbolTransaction {
  private payload: Uint8Array;
  size: number;
  signature: Uint8Array;
  signerPublicKey: Uint8Array;
  version: number;
  network: number;
  type: number;
  maxFee: bigint;
  deadline: bigint;
  // Aggregate用
  transactionsHash?: Uint8Array;
  payloadSize?: number;
  innerTransactions?: Uint8Array;
  cosignatures?: Uint8Array;

  /**
   * コンストラクタ（private）
   * @param {SymbolTransactionBase & Partial<AggregateTransactionV3>} fields トランザクションフィールド
   */
  private constructor(payload: Uint8Array, fields: SymbolTransactionBase & Partial<AggregateTransactionV3>) {
    this.payload = payload;
    this.size = fields.size;
    this.signature = fields.signature;
    this.signerPublicKey = fields.signerPublicKey;
    this.version = fields.version;
    this.network = fields.network;
    this.type = fields.type;
    this.maxFee = fields.maxFee;
    this.deadline = fields.deadline;
    this.transactionsHash = fields.transactionsHash;
    this.payloadSize = fields.payloadSize;
    this.innerTransactions = fields.innerTransactions;
    this.cosignatures = fields.cosignatures;
  }

  /**
   * バイト列からSymbolトランザクションをパース
   * @param {Uint8Array} payload トランザクションバイト列
   * @returns {SymbolTransaction} パース結果のSymbolトランザクション
   */
  static parse(payload: Uint8Array): SymbolTransaction {
    if (payload.length < 112) throw new Error('Transaction byte array is too short.');
    // 共通ヘッダー
    const size = payload[0] | (payload[1] << 8) | (payload[2] << 16) | (payload[3] << 24);
    const signature = payload.slice(8, 72);
    const signerPublicKey = payload.slice(72, 104);
    const version = payload[108];
    const network = payload[109];
    const type = payload[110] | (payload[111] << 8);
    const maxFee = SymbolUtils.bytesToBigInt(payload.slice(112, 120));
    const deadline = SymbolUtils.bytesToBigInt(payload.slice(120, 128));
    if (type === 0x4141 || type === 0x4241) {
      const transactionsHash = payload.slice(128, 160);
      const payloadSize = payload[160] | (payload[161] << 8) | (payload[162] << 16) | (payload[163] << 24);
      const innerTransactions = payload.slice(168, 168 + payloadSize);
      const cosignatures = payload.slice(168 + payloadSize);
      return new SymbolTransaction(payload, {
        size,
        signature,
        signerPublicKey,
        version,
        network,
        type,
        maxFee,
        deadline,
        transactionsHash,
        payloadSize,
        innerTransactions,
        cosignatures,
      });
    }

    return new SymbolTransaction(payload, {
      size,
      signature,
      signerPublicKey,
      version,
      network,
      type,
      maxFee,
      deadline,
    });
  }

  /**
   * Aggregateトランザクションか判定
   *
   * @returns {boolean} Aggregateトランザクションならtrue
   */
  isAggregateTransaction(): boolean {
    const transactionTypeOffset = TRANSACTION_HEADER_SIZE + 2;
    const transactionType = (this.payload[transactionTypeOffset + 1] << 8) + this.payload[transactionTypeOffset];
    const aggregateTypes = [AGGREGATE_BONDED_TYPE, AGGREGATE_COMPLETE_TYPE];
    return aggregateTypes.some((aggregateType) => aggregateType === transactionType);
  }

  /**
   * 署名対象データバッファを取得
   *
   * @returns {Uint8Array} 署名対象データバッファ
   */
  transactionDataBuffer(): Uint8Array {
    const dataBufferStart = TRANSACTION_HEADER_SIZE;
    const dataBufferEnd = this.isAggregateTransaction()
      ? TRANSACTION_HEADER_SIZE + AGGREGATE_HASHED_SIZE
      : this.payload.length;

    return this.payload.subarray(dataBufferStart, dataBufferEnd);
  }

  /**
   * トランザクションハッシュを計算
   *
   * @param networkName ネットワーク名
   * @returns {Uint8Array} トランザクションハッシュ
   */
  hashTransaction(networkName: string): Uint8Array {
    const generationHashSeed = SymbolUtils.getGenerationHashSeed(networkName);

    const hasher = sha3_256.create();
    hasher.update(this.signature);
    hasher.update(this.signerPublicKey);
    hasher.update(generationHashSeed);
    hasher.update(this.transactionDataBuffer());
    return hasher.digest();
  }
}
