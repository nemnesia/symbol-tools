import { describe, expect, it } from 'vitest';

import {
  bytesToBigInt,
  bytesToBigIntUnaligned,
  bytesToInt,
  bytesToIntUnaligned,
  hexToUint8,
  intToBytes,
  isHexString,
  tryParseUint,
  uint8ToHex,
} from '../src/utils/converter.js';

describe('converter', () => {
  describe('hexToUint8', () => {
    it('空文字列から空配列', () => {
      expect(hexToUint8('')).toEqual(new Uint8Array([]));
    });

    it('hex文字列を正しく変換', () => {
      const result = hexToUint8('0A1B2C');
      expect(result).toEqual(new Uint8Array([0x0a, 0x1b, 0x2c]));
    });

    it('小文字hexも変換可能', () => {
      const result = hexToUint8('aabbcc');
      expect(result).toEqual(new Uint8Array([0xaa, 0xbb, 0xcc]));
    });

    it('奇数長でエラー', () => {
      expect(() => hexToUint8('ABC')).toThrow('hex string has unexpected size');
    });

    it('不正な文字でエラー', () => {
      expect(() => hexToUint8('XY')).toThrow('unrecognized hex char');
    });
  });

  describe('uint8ToHex', () => {
    it('空配列から空文字列', () => {
      expect(uint8ToHex(new Uint8Array([]))).toBe('');
    });

    it('Uint8Arrayを大文字hex文字列に変換', () => {
      const result = uint8ToHex(new Uint8Array([0x0a, 0x1b, 0x2c]));
      expect(result).toBe('0A1B2C');
    });

    it('0x00と0xFFも正しく変換', () => {
      const result = uint8ToHex(new Uint8Array([0x00, 0xff]));
      expect(result).toBe('00FF');
    });
  });

  describe('isHexString', () => {
    it('正しいhex文字列はtrue', () => {
      expect(isHexString('0A1B2C')).toBe(true);
      expect(isHexString('aabbcc')).toBe(true);
      expect(isHexString('')).toBe(true);
    });

    it('奇数長はfalse', () => {
      expect(isHexString('ABC')).toBe(false);
    });

    it('不正な文字を含むとfalse', () => {
      expect(isHexString('XY')).toBe(false);
      expect(isHexString('0G')).toBe(false);
    });
  });

  describe('tryParseUint', () => {
    it('0と通常数値をパースできる', () => {
      expect(tryParseUint('0')).toBe(0);
      expect(tryParseUint('12345')).toBe(12345);
    });

    it('先頭ゼロ・非数字・オーバーフローを拒否する', () => {
      expect(tryParseUint('0123')).toBeUndefined();
      expect(tryParseUint('12a3')).toBeUndefined();
      expect(tryParseUint('9007199254740992')).toBeUndefined();
    });
  });

  describe('bytes/int conversions', () => {
    it('aligned int and bigintを変換できる', () => {
      expect(bytesToInt(new Uint8Array([0x34, 0x12]), 2, false)).toBe(0x1234);
      expect(bytesToInt(new Uint8Array([0xff]), 1, true)).toBe(-1);

      const big = bytesToBigInt(new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0]), 8, false);
      expect(big).toBe(1n);
    });

    it('unaligned int and bigintを変換できる', () => {
      expect(bytesToIntUnaligned(new Uint8Array([0x78, 0x56, 0x34, 0x12]), 4, false)).toBe(0x12345678);
      expect(bytesToIntUnaligned(new Uint8Array([0xfe]), 1, true)).toBe(-2);

      const big = bytesToBigIntUnaligned(new Uint8Array([2, 0, 0, 0, 0, 0, 0, 0]), 8, false);
      expect(big).toBe(2n);
    });

    it('unsupported sizeを拒否する', () => {
      expect(() => bytesToInt(new Uint8Array([1, 2, 3]), 3, false)).toThrowError('unsupported int size 3');
      expect(() => bytesToBigInt(new Uint8Array([1, 2, 3, 4]), 4, false)).toThrowError('unsupported int size 4');
      expect(() => bytesToIntUnaligned(new Uint8Array([1, 2, 3]), 3, false)).toThrowError('unsupported int size 3');
      expect(() => bytesToBigIntUnaligned(new Uint8Array([1, 2, 3, 4]), 4, false)).toThrowError(
        'unsupported int size 4'
      );
    });

    it('intToBytes converts number and bigint', () => {
      expect(intToBytes(0x1234, 2, false)).toEqual(new Uint8Array([0x34, 0x12]));
      expect(intToBytes(-1, 1, true)).toEqual(new Uint8Array([0xff]));
      expect(intToBytes(3n, 8, false)).toEqual(new Uint8Array([3, 0, 0, 0, 0, 0, 0, 0]));
    });
  });
});
