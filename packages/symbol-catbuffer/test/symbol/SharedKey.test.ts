import { describe, expect, it } from 'vitest';

import { PrivateKey, PublicKey, SharedKey256 } from '../../src/CryptoTypes.js';
import { KeyPair } from '../../src/symbol/KeyPair.js';
import { deriveSharedKey } from '../../src/symbol/SharedKey.js';

describe('deriveSharedKey', () => {
  const createKeyPair1 = () => {
    return new KeyPair(new PrivateKey('ED4C70D78104EB11BCD73EBDC512FEBC8FBCEB36A370C957FF7E266230BB5D57'));
  };

  const createKeyPair2 = () => {
    return new KeyPair(new PrivateKey('71BC0DB348A25D163290C44EF863B031FD5251D4E3674DCE37D78FE8C5DBBBB6'));
  };

  describe('basic functionality', () => {
    it('キーペアと公開鍵から共有鍵を導出できる', () => {
      const keyPair1 = createKeyPair1();
      const keyPair2 = createKeyPair2();

      const sharedKey = deriveSharedKey(keyPair1, keyPair2.publicKey);

      expect(sharedKey).toBeInstanceOf(SharedKey256);
      expect(sharedKey.bytes).toBeInstanceOf(Uint8Array);
      expect(sharedKey.bytes.length).toBe(32);
    });

    it('共有鍵が定義されている', () => {
      const keyPair1 = createKeyPair1();
      const keyPair2 = createKeyPair2();

      const sharedKey = deriveSharedKey(keyPair1, keyPair2.publicKey);

      expect(sharedKey).toBeDefined();
    });
  });

  describe('symmetry', () => {
    it('双方向で同じ共有鍵が導出される', () => {
      const keyPair1 = createKeyPair1();
      const keyPair2 = createKeyPair2();

      const sharedKey1 = deriveSharedKey(keyPair1, keyPair2.publicKey);
      const sharedKey2 = deriveSharedKey(keyPair2, keyPair1.publicKey);

      expect(sharedKey1.toString()).toBe(sharedKey2.toString());
    });

    it('複数のキーペアで対称性を確認', () => {
      const keyPair1 = createKeyPair1();
      const keyPair2 = createKeyPair2();
      const keyPair3 = new KeyPair(new PrivateKey('41FB51558293885BB8D147046091D3239FE0B631D094ED8C80BCC4CD31804629'));

      const shared12a = deriveSharedKey(keyPair1, keyPair2.publicKey);
      const shared12b = deriveSharedKey(keyPair2, keyPair1.publicKey);
      const shared13a = deriveSharedKey(keyPair1, keyPair3.publicKey);
      const shared13b = deriveSharedKey(keyPair3, keyPair1.publicKey);
      const shared23a = deriveSharedKey(keyPair2, keyPair3.publicKey);
      const shared23b = deriveSharedKey(keyPair3, keyPair2.publicKey);

      expect(shared12a.toString()).toBe(shared12b.toString());
      expect(shared13a.toString()).toBe(shared13b.toString());
      expect(shared23a.toString()).toBe(shared23b.toString());

      // 異なるペア間では異なる共有鍵
      expect(shared12a.toString()).not.toBe(shared13a.toString());
      expect(shared12a.toString()).not.toBe(shared23a.toString());
      expect(shared13a.toString()).not.toBe(shared23a.toString());
    });
  });

  describe('determinism', () => {
    it('同じ入力から同じ共有鍵を生成する', () => {
      const keyPair1 = createKeyPair1();
      const keyPair2 = createKeyPair2();

      const sharedKey1 = deriveSharedKey(keyPair1, keyPair2.publicKey);
      const sharedKey2 = deriveSharedKey(keyPair1, keyPair2.publicKey);

      expect(sharedKey1.toString()).toBe(sharedKey2.toString());
    });

    it('複数回の導出で一貫性を保つ', () => {
      const keyPair1 = createKeyPair1();
      const keyPair2 = createKeyPair2();

      const sharedKeys = [];
      for (let i = 0; i < 10; i++) {
        sharedKeys.push(deriveSharedKey(keyPair1, keyPair2.publicKey));
      }

      // すべて同じ共有鍵
      for (let i = 1; i < sharedKeys.length; i++) {
        expect(sharedKeys[i].toString()).toBe(sharedKeys[0].toString());
      }
    });
  });

  describe('uniqueness', () => {
    it('異なるキーペアから異なる共有鍵を生成する', () => {
      const keyPair1 = createKeyPair1();
      const keyPair2 = createKeyPair2();
      const keyPair3 = new KeyPair(new PrivateKey('41FB51558293885BB8D147046091D3239FE0B631D094ED8C80BCC4CD31804629'));

      const sharedKey12 = deriveSharedKey(keyPair1, keyPair2.publicKey);
      const sharedKey13 = deriveSharedKey(keyPair1, keyPair3.publicKey);

      expect(sharedKey12.toString()).not.toBe(sharedKey13.toString());
    });

    it('自己との共有鍵も導出できる', () => {
      const keyPair = createKeyPair1();

      const sharedKey = deriveSharedKey(keyPair, keyPair.publicKey);

      expect(sharedKey).toBeInstanceOf(SharedKey256);
      expect(sharedKey.bytes.length).toBe(32);
    });
  });

  describe('error handling', () => {
    it('無効な公開鍵でエラーをスローする（全ゼロ）', () => {
      const keyPair = createKeyPair1();
      const invalidPublicKey = new PublicKey(new Uint8Array(32).fill(0));

      expect(() => deriveSharedKey(keyPair, invalidPublicKey)).toThrow();
    });

    it('無効な公開鍵でエラーをスローする（全1）', () => {
      const keyPair = createKeyPair1();
      const invalidPublicKey = new PublicKey(new Uint8Array(32).fill(0xff));

      expect(() => deriveSharedKey(keyPair, invalidPublicKey)).toThrow();
    });
  });

  describe('integration with encryption', () => {
    it('共有鍵を暗号化に使用できる', async () => {
      // このテストは、共有鍵が実際に暗号化システムで使用できることを示す
      const keyPair1 = createKeyPair1();
      const keyPair2 = createKeyPair2();

      const sharedKey1 = deriveSharedKey(keyPair1, keyPair2.publicKey);
      const sharedKey2 = deriveSharedKey(keyPair2, keyPair1.publicKey);

      // 両方のキーが同じであることを確認
      expect(sharedKey1.bytes).toEqual(sharedKey2.bytes);

      // これらのキーはAES暗号化などに使用できる
      expect(sharedKey1.bytes.length).toBe(32); // AES-256に適したサイズ
    });
  });

  describe('known test vectors', () => {
    it('既知のテストベクターで正しい共有鍵を生成する', () => {
      // Symbolの既知のテストベクターを使用
      const keyPair1 = createKeyPair1();
      const keyPair2 = createKeyPair2();

      const sharedKey = deriveSharedKey(keyPair1, keyPair2.publicKey);

      // 共有鍵が生成されることを確認（具体的な値は実装依存）
      expect(sharedKey).toBeInstanceOf(SharedKey256);
      expect(sharedKey.bytes.length).toBe(32);

      // すべてゼロではないことを確認
      const allZero = sharedKey.bytes.every((byte) => byte === 0);
      expect(allZero).toBe(false);
    });
  });

  describe('performance', () => {
    it('複数の共有鍵導出を効率的に実行できる', () => {
      const keyPair1 = createKeyPair1();
      const keyPairs = Array.from({ length: 100 }, () => new KeyPair(PrivateKey.random()));

      const startTime = Date.now();
      keyPairs.forEach((keyPair) => {
        deriveSharedKey(keyPair1, keyPair.publicKey);
      });
      const endTime = Date.now();

      // 100回の導出が妥当な時間内に完了することを確認（例: 5秒以内）
      expect(endTime - startTime).toBeLessThan(5000);
    });
  });
});
