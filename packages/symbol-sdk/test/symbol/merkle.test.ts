import { describe, expect, it } from 'vitest';

import { Hash256 } from '../../src/CryptoTypes.js';
import { MerkleHashBuilder } from '../../src/symbol/merkle.js';

describe('merkleのテスト', () => {
  describe('MerkleHashBuilder', () => {
    it('空のビルダーはゼロハッシュを返す', () => {
      const builder = new MerkleHashBuilder();
      const hash = builder.final();

      expect(hash).toEqual(Hash256.zero());
    });

    it('単一のハッシュを処理できる', () => {
      const builder = new MerkleHashBuilder();
      const testHash = new Hash256(new Uint8Array(32).fill(1));

      builder.update(testHash);
      const result = builder.final();

      expect(result).toBeInstanceOf(Hash256);
      expect(result.bytes.length).toBe(32);
    });

    it('2つのハッシュからマークルハッシュを生成できる', () => {
      const builder = new MerkleHashBuilder();
      const hash1 = new Hash256(new Uint8Array(32).fill(1));
      const hash2 = new Hash256(new Uint8Array(32).fill(2));

      builder.update(hash1);
      builder.update(hash2);
      const result = builder.final();

      expect(result).toBeInstanceOf(Hash256);
      expect(result.bytes.length).toBe(32);
      // 結果は入力とは異なる
      expect(result).not.toEqual(hash1);
      expect(result).not.toEqual(hash2);
    });

    it('複数のハッシュを処理できる', () => {
      const builder = new MerkleHashBuilder();
      const hashes = [
        new Hash256(new Uint8Array(32).fill(1)),
        new Hash256(new Uint8Array(32).fill(2)),
        new Hash256(new Uint8Array(32).fill(3)),
        new Hash256(new Uint8Array(32).fill(4)),
      ];

      hashes.forEach((hash) => builder.update(hash));
      const result = builder.final();

      expect(result).toBeInstanceOf(Hash256);
      expect(result.bytes.length).toBe(32);
    });

    it('奇数個のハッシュを処理できる', () => {
      const builder = new MerkleHashBuilder();
      const hashes = [
        new Hash256(new Uint8Array(32).fill(1)),
        new Hash256(new Uint8Array(32).fill(2)),
        new Hash256(new Uint8Array(32).fill(3)),
      ];

      hashes.forEach((hash) => builder.update(hash));
      const result = builder.final();

      expect(result).toBeInstanceOf(Hash256);
      expect(result.bytes.length).toBe(32);
    });

    it('同じ入力に対して同じ結果を返す', () => {
      const builder1 = new MerkleHashBuilder();
      const builder2 = new MerkleHashBuilder();
      const hash1 = new Hash256(new Uint8Array(32).fill(1));
      const hash2 = new Hash256(new Uint8Array(32).fill(2));

      builder1.update(hash1);
      builder1.update(hash2);
      const result1 = builder1.final();

      builder2.update(hash1);
      builder2.update(hash2);
      const result2 = builder2.final();

      expect(result1.bytes).toEqual(result2.bytes);
    });

    it('順序が異なると異なる結果を返す', () => {
      const builder1 = new MerkleHashBuilder();
      const builder2 = new MerkleHashBuilder();
      const hash1 = new Hash256(new Uint8Array(32).fill(1));
      const hash2 = new Hash256(new Uint8Array(32).fill(2));

      builder1.update(hash1);
      builder1.update(hash2);
      const result1 = builder1.final();

      builder2.update(hash2);
      builder2.update(hash1);
      const result2 = builder2.final();

      expect(result1.bytes).not.toEqual(result2.bytes);
    });

    it('多数のハッシュを処理できる', () => {
      const builder = new MerkleHashBuilder();
      const count = 100;

      for (let i = 0; i < count; i++) {
        const hash = new Hash256(new Uint8Array(32).fill(i % 256));
        builder.update(hash);
      }

      const result = builder.final();

      expect(result).toBeInstanceOf(Hash256);
      expect(result.bytes.length).toBe(32);
    });
  });
});
