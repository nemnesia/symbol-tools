import { ripemd160 } from '@noble/hashes/legacy.js';
import { sha3_256 } from '@noble/hashes/sha3.js';

/**
 * Base32エンコード/デコード用の文字セット
 */
const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

/**
 * Symbolユーティリティクラス
 */
export class SymbolUtils {
  /**
   * MainNet生成ハッシュシード
   */
  private static readonly MAINNET_GENERATION_HASH_SEED = SymbolUtils.hexToUint8(
    '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6'
  );
  /**
   * TestNet生成ハッシュシード
   */
  private static readonly TESTNET_GENERATION_HASH_SEED = SymbolUtils.hexToUint8(
    '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4'
  );

  /**
   * ネットワーク名から生成ハッシュシードを取得
   * @param {string} networkName ネットワーク名 ('mainnet' または 'testnet')
   * @returns {Uint8Array} 生成ハッシュシード
   */
  static getGenerationHashSeed(networkName: string) {
    return networkName === 'mainnet'
      ? SymbolUtils.MAINNET_GENERATION_HASH_SEED
      : SymbolUtils.TESTNET_GENERATION_HASH_SEED;
  }

  /**
   * 16進文字列をUint8Arrayに変換
   *
   * @param {string} hex 16進文字列
   * @returns {Uint8Array} Uint8Array
   */
  static hexToUint8(hex: string): Uint8Array {
    return new Uint8Array(hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
  }

  /**
   * Uint8Arrayを16進文字列に変換
   *
   * @param {Uint8Array} bytes Uint8Array
   * @returns {string} 16進文字列
   */
  static uint8ToHex(bytes: Uint8Array): string {
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
  }

  /**
   * バイト列をBigIntに変換
   * @param {Uint8Array} bytes バイト列
   * @returns {bigint} BigInt値
   */
  static bytesToBigInt(bytes: Uint8Array): bigint {
    let result = 0n;
    for (let i = 0; i < bytes.length; ++i) {
      result |= BigInt(bytes[i]) << BigInt(8 * i);
    }
    return result;
  }

  /**
   * HEXアドレスをBase32アドレスに変換
   *
   * @param {string} hexAddress HEXアドレス (16進文字列)
   * @returns {string} Base32アドレス
   */
  static hexToBase32Address(hexAddress: string): string {
    let bits = 0;
    let value = 0;
    let base32 = '';
    for (const byte of SymbolUtils.hexToUint8(hexAddress.toUpperCase())) {
      value = (value << 8) | byte;
      bits += 8;
      while (bits >= 5) {
        base32 += BASE32_CHARS[(value >>> (bits - 5)) & 0x1f];
        bits -= 5;
      }
    }
    if (bits > 0) base32 += BASE32_CHARS[(value << (5 - bits)) & 0x1f];
    return base32;
  }

  /**
   * Base32アドレスをHEXアドレスに変換
   *
   * @param {string} base32Address Base32アドレス
   * @returns {string} HEXアドレス (16進文字列)
   */
  static base32ToHexAddress(base32Address: string): string {
    let bits = 0;
    let value = 0;
    let hex = '';
    for (const char of base32Address.toUpperCase()) {
      const idx = BASE32_CHARS.indexOf(char);
      if (idx === -1) {
        throw new Error(`Invalid Base32 character: ${char}`);
      }
      value = (value << 5) | idx;
      bits += 5;
      while (bits >= 8) {
        hex += ((value >>> (bits - 8)) & 0xff).toString(16).padStart(2, '0');
        bits -= 8;
      }
    }
    return hex.toUpperCase();
  }

  /**
   * 公開鍵からアドレスを生成
   *
   * @param {string} publicKey 公開鍵 (16進文字列)
   * @param {number | string} network ネットワークIDまたはネットワーク名
   * @returns {string} アドレス (Base32形式)
   */
  static publicKeyToAddress(publicKey: string, network: number | string): string {
    let networkId: number;
    if (typeof network === 'number') {
      networkId = network;
    } else {
      networkId = network === 'mainnet' ? 0x68 : 0x98;
    }

    const ripemdHash = ripemd160(sha3_256(SymbolUtils.hexToUint8(publicKey)));
    const versionPrefixed = new Uint8Array([networkId, ...ripemdHash]);
    const checksum = sha3_256(versionPrefixed).slice(0, 3);
    return SymbolUtils.hexToBase32Address(SymbolUtils.uint8ToHex(new Uint8Array([...versionPrefixed, ...checksum])));
  }

  /**
   * 署名と公開鍵をトランザクションバイト列にアタッチ
   *
   * @param {Uint8Array} txPayload トランザクションバイト列
   * @param {Uint8Array | string} signature 署名（Uint8Arrayまたは16進文字列）
   * @returns {string} 署名付きトランザクションペイロードのJSON文字列
   */
  static attachSignature(txPayload: Uint8Array, signature: Uint8Array | string): string {
    const tx = new Uint8Array(txPayload); // コピー
    // 署名
    const sigBytes = typeof signature === 'string' ? SymbolUtils.hexToUint8(signature) : signature;
    tx.set(sigBytes, 8); // 8バイト目から64バイト分
    const jsonPayload = `{"payload": "${SymbolUtils.uint8ToHex(tx)}"}`;
    return jsonPayload;
  }
}
