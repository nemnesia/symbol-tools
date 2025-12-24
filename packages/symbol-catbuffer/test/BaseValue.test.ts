import { describe, expect, it } from 'vitest';

import BaseValue from '../src/BaseValue.js';

describe('BaseValue', () => {
  describe('constructor', () => {
    it('符号なし整数を作成', () => {
      const value = new BaseValue(4, 100);
      expect(value.size).toBe(4);
      expect(value.value).toBe(100);
      expect(value.isSigned).toBe(false);
    });

    it('符号付き整数を作成', () => {
      const value = new BaseValue(4, -50, true);
      expect(value.size).toBe(4);
      expect(value.value).toBe(-50);
      expect(value.isSigned).toBe(true);
    });

    it('BigInt値を作成', () => {
      const value = new BaseValue(8, 9007199254740991n);
      expect(value.size).toBe(8);
      expect(value.value).toBe(9007199254740991n);
    });

    it('範囲外の値でエラー', () => {
      expect(() => new BaseValue(1, 256)).toThrow(RangeError);
      expect(() => new BaseValue(1, -1)).toThrow(RangeError);
    });

    it('符号付きで範囲外の値でエラー', () => {
      expect(() => new BaseValue(1, 128, true)).toThrow(RangeError);
      expect(() => new BaseValue(1, -129, true)).toThrow(RangeError);
    });

    it('整数以外でエラー', () => {
      expect(() => new BaseValue(4, 3.14)).toThrow(RangeError);
    });
  });

  describe('toString', () => {
    it('符号なし整数を16進文字列に変換', () => {
      const value = new BaseValue(4, 255);
      expect(value.toString()).toBe('0x000000FF');
    });

    it('符号付き正の整数を変換', () => {
      const value = new BaseValue(2, 100, true);
      expect(value.toString()).toBe('0x0064');
    });

    it('符号付き負の整数を変換', () => {
      const value = new BaseValue(1, -1, true);
      expect(value.toString()).toBe('0xFF');
    });

    it('BigInt値を変換', () => {
      const value = new BaseValue(8, 0xabcdef1234567890n);
      expect(value.toString()).toBe('0xABCDEF1234567890');
    });

    it('0を変換', () => {
      const value = new BaseValue(2, 0);
      expect(value.toString()).toBe('0x0000');
    });
  });

  describe('toJson', () => {
    it('数値は数値のまま返す', () => {
      const value = new BaseValue(4, 123);
      expect(value.toJson()).toBe(123);
    });

    it('BigIntは文字列に変換', () => {
      const value = new BaseValue(8, 9007199254740991n);
      expect(value.toJson()).toBe('9007199254740991');
    });

    it('負の値も正しく返す', () => {
      const value = new BaseValue(4, -50, true);
      expect(value.toJson()).toBe(-50);
    });
  });
});
