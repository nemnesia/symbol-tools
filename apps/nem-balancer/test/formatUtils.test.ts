import { describe, expect, it } from 'vitest';

import { formatNumber, roundToSixDecimals, unformatNumber } from '../src/libs/formatUtils';

describe('formatUtils', () => {
  describe('formatNumber', () => {
    it('3桁ごとにカンマ区切り', () => {
      expect(formatNumber('1000')).toBe('1,000');
      expect(formatNumber('1234567')).toBe('1,234,567');
    });

    it('小数点も正しく処理', () => {
      expect(formatNumber('1234.56')).toBe('1,234.56');
    });

    it('空文字列はそのまま返す', () => {
      expect(formatNumber('')).toBe('');
    });

    it('数値以外の文字列はそのまま返す', () => {
      expect(formatNumber('abc')).toBe('abc');
    });

    it('6桁以下の小数点を正しく処理', () => {
      expect(formatNumber('123.123456')).toBe('123.123456');
    });

    it('小数点のみの場合も処理', () => {
      expect(formatNumber('123.')).toBe('123');
    });
  });

  describe('unformatNumber', () => {
    it('カンマを除去して数値文字列に戻す', () => {
      expect(unformatNumber('1,000')).toBe('1000');
      expect(unformatNumber('1,234,567')).toBe('1234567');
    });

    it('小数点も正しく処理', () => {
      expect(unformatNumber('1,234.56')).toBe('1234.56');
    });

    it('カンマがない場合はそのまま返す', () => {
      expect(unformatNumber('1234')).toBe('1234');
    });
  });

  describe('roundToSixDecimals', () => {
    it('小数点以下6桁で切り捨て', () => {
      expect(roundToSixDecimals(1.123456789)).toBe(1.123456);
      expect(roundToSixDecimals(1.1)).toBe(1.1);
    });

    it('0を正しく処理', () => {
      expect(roundToSixDecimals(0)).toBe(0);
    });

    it('負の数も正しく処理', () => {
      expect(roundToSixDecimals(-1.123456789)).toBe(-1.123457);
    });
  });
});
