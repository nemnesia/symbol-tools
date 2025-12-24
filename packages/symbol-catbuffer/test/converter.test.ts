import { describe, it, expect } from 'vitest';
import { hexToUint8, uint8ToHex, isHexString } from '../src/converter.js';

describe('converter', () => {
  describe('hexToUint8', () => {
    it('空文字列から空配列', () => {
      expect(hexToUint8('')).toEqual(new Uint8Array([]));
    });

    it('hex文字列を正しく変換', () => {
      const result = hexToUint8('0A1B2C');
      expect(result).toEqual(new Uint8Array([0x0A, 0x1B, 0x2C]));
    });

    it('小文字hexも変換可能', () => {
      const result = hexToUint8('aabbcc');
      expect(result).toEqual(new Uint8Array([0xAA, 0xBB, 0xCC]));
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
      const result = uint8ToHex(new Uint8Array([0x0A, 0x1B, 0x2C]));
      expect(result).toBe('0A1B2C');
    });

    it('0x00と0xFFも正しく変換', () => {
      const result = uint8ToHex(new Uint8Array([0x00, 0xFF]));
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
});
