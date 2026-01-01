import { describe, expect, it } from 'vitest';

import { metadataGenerateKey, metadataUpdateValue } from '../../src/symbol/metadata.js';

describe('metadata', () => {
  describe('metadataGenerateKey', () => {
    it('シード文字列からメタデータキーを生成できる', () => {
      const seed = 'test-metadata-key';
      const key = metadataGenerateKey(seed);

      expect(typeof key).toBe('bigint');
      expect(key).toBeGreaterThan(0n);
    });

    it('同じシードから同じキーを生成する', () => {
      const seed = 'consistent-key';
      const key1 = metadataGenerateKey(seed);
      const key2 = metadataGenerateKey(seed);

      expect(key1).toBe(key2);
    });

    it('異なるシードから異なるキーを生成する', () => {
      const key1 = metadataGenerateKey('seed1');
      const key2 = metadataGenerateKey('seed2');

      expect(key1).not.toBe(key2);
    });

    it('空文字列からキーを生成できる', () => {
      const key = metadataGenerateKey('');

      expect(typeof key).toBe('bigint');
      expect(key).toBeGreaterThan(0n);
    });

    it('生成されたキーの最上位ビットが設定されている', () => {
      const seed = 'check-high-bit';
      const key = metadataGenerateKey(seed);

      // 最上位ビットが設定されているか確認
      const keyBytes = new BigUint64Array([key]);
      const bytes = new Uint8Array(keyBytes.buffer);
      expect(bytes[7] & 0x80).toBe(0x80);
    });

    it('日本語のシードからキーを生成できる', () => {
      const key1 = metadataGenerateKey('メタデータ');
      const key2 = metadataGenerateKey('メタデータ');

      expect(key1).toBe(key2);
      expect(key1).toBeGreaterThan(0n);
    });
  });

  describe('metadataUpdateValue', () => {
    it('oldValueがundefinedの場合、newValueをそのまま返す', () => {
      const newValue = new Uint8Array([1, 2, 3, 4]);
      const result = metadataUpdateValue(undefined, newValue);

      expect(result).toEqual(newValue);
    });

    it('同じ長さの値を更新できる', () => {
      const oldValue = new Uint8Array([1, 2, 3, 4]);
      const newValue = new Uint8Array([5, 6, 7, 8]);
      const result = metadataUpdateValue(oldValue, newValue);

      // XOR操作: 1^5=4, 2^6=4, 3^7=4, 4^8=12
      expect(result).toEqual(new Uint8Array([4, 4, 4, 12]));
    });

    it('newValueがoldValueより短い場合', () => {
      const oldValue = new Uint8Array([1, 2, 3, 4, 5]);
      const newValue = new Uint8Array([10, 20, 30]);
      const result = metadataUpdateValue(oldValue, newValue);

      // 最初の3バイトはXOR、残りはoldValue
      expect(result).toEqual(new Uint8Array([11, 22, 29, 4, 5]));
      expect(result.length).toBe(5);
    });

    it('newValueがoldValueより長い場合', () => {
      const oldValue = new Uint8Array([1, 2, 3]);
      const newValue = new Uint8Array([10, 20, 30, 40, 50]);
      const result = metadataUpdateValue(oldValue, newValue);

      // 最初の3バイトはXOR、残りはnewValue
      expect(result).toEqual(new Uint8Array([11, 22, 29, 40, 50]));
      expect(result.length).toBe(5);
    });

    it('空のoldValueから空でないnewValueへ更新', () => {
      const oldValue = new Uint8Array([]);
      const newValue = new Uint8Array([1, 2, 3]);
      const result = metadataUpdateValue(oldValue, newValue);

      expect(result).toEqual(newValue);
    });

    it('空でないoldValueから空のnewValueへ更新', () => {
      const oldValue = new Uint8Array([1, 2, 3]);
      const newValue = new Uint8Array([]);
      const result = metadataUpdateValue(oldValue, newValue);

      expect(result).toEqual(oldValue);
    });

    it('両方が空の場合', () => {
      const oldValue = new Uint8Array([]);
      const newValue = new Uint8Array([]);
      const result = metadataUpdateValue(oldValue, newValue);

      expect(result).toEqual(new Uint8Array([]));
    });

    it('同じ値を更新すると全て0になる', () => {
      const oldValue = new Uint8Array([1, 2, 3, 4]);
      const newValue = new Uint8Array([1, 2, 3, 4]);
      const result = metadataUpdateValue(oldValue, newValue);

      // 同じ値のXORは0
      expect(result).toEqual(new Uint8Array([0, 0, 0, 0]));
    });

    it('更新操作は可逆的である', () => {
      const oldValue = new Uint8Array([10, 20, 30, 40]);
      const newValue = new Uint8Array([15, 25, 35, 45]);

      // oldValue -> newValueへの差分を計算
      const delta = metadataUpdateValue(oldValue, newValue);

      // 差分を使ってnewValueを復元
      const result = new Uint8Array(oldValue.length);
      for (let i = 0; i < oldValue.length; i++) {
        result[i] = oldValue[i] ^ delta[i];
      }

      expect(result).toEqual(newValue);
    });
  });
});
