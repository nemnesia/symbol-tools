import { utils } from '@nemnesia/symbol-catbuffer';

/**
 * Base32エンコード/デコード用の文字セット
 */
const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

/**
 * Symbolユーティリティクラス
 */
export class SymbolUtils {
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
    for (const byte of utils.hexToUint8(hexAddress.toUpperCase())) {
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
}
