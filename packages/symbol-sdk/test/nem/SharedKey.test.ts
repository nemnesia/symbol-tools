import { describe, expect, it } from 'vitest';

import { PrivateKey, SharedKey256 } from '../../src/CryptoTypes.js';
import { KeyPair } from '../../src/nem/KeyPair.js';
import { deriveSharedKey, deriveSharedKeyDeprecated } from '../../src/nem/SharedKey.js';

// テスト用の固定キーペア
const TEST_PRIVATE_KEY_1 = new PrivateKey('abf4cf663c81e461db1fef2d145e6993b62e8b67801edea143335aec4cbec6cd');
const TEST_PRIVATE_KEY_2 = new PrivateKey('71bc0db348a25d163290c44ef863b031fd5251d4e3674dce37d78fe8c5dbbbb6');

describe('deriveSharedKeyのテスト', () => {
  describe('基本機能', () => {
    it('キーペアと公開鍵から共有鍵を導出できる', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);

      const sharedKey = deriveSharedKey(keyPair1, keyPair2.publicKey);

      expect(sharedKey).toBeInstanceOf(SharedKey256);
      expect(sharedKey.bytes).toBeInstanceOf(Uint8Array);
      expect(sharedKey.bytes.length).toBe(32);
    });

    it('異なるキーペアで異なる共有鍵を生成する', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);
      const keyPair3 = new KeyPair(new PrivateKey('41fb51558293885bb8d147046091d3239fe0b631d094ed8c80bcc4cd31804629'));

      const sharedKey1 = deriveSharedKey(keyPair1, keyPair2.publicKey);
      const sharedKey2 = deriveSharedKey(keyPair1, keyPair3.publicKey);

      expect(sharedKey1.bytes).not.toEqual(sharedKey2.bytes);
    });
  });

  describe('対称性', () => {
    it('共有鍵は対称的である（AとBで同じ結果）', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);

      const sharedKey1 = deriveSharedKey(keyPair1, keyPair2.publicKey);
      const sharedKey2 = deriveSharedKey(keyPair2, keyPair1.publicKey);

      expect(sharedKey1.bytes).toEqual(sharedKey2.bytes);
    });
  });

  describe('決定性', () => {
    it('同じ入力から同じ共有鍵を生成する', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);

      const sharedKey1 = deriveSharedKey(keyPair1, keyPair2.publicKey);
      const sharedKey2 = deriveSharedKey(keyPair1, keyPair2.publicKey);

      expect(sharedKey1.bytes).toEqual(sharedKey2.bytes);
    });

    it('複数回の導出で一貫性を保つ', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);

      const sharedKeys: SharedKey256[] = [];
      for (let i = 0; i < 10; i++) {
        sharedKeys.push(deriveSharedKey(keyPair1, keyPair2.publicKey));
      }

      // すべて同じ共有鍵
      for (let i = 1; i < sharedKeys.length; i++) {
        expect(sharedKeys[i].bytes).toEqual(sharedKeys[0].bytes);
      }
    });
  });

  describe('秘密鍵の不変性', () => {
    it('元の秘密鍵を変更しない', () => {
      const originalPrivateKeyBytes = new Uint8Array(TEST_PRIVATE_KEY_1.bytes);
      const keyPair = new KeyPair(TEST_PRIVATE_KEY_1);
      const otherKeyPair = new KeyPair(TEST_PRIVATE_KEY_2);

      deriveSharedKey(keyPair, otherKeyPair.publicKey);

      expect(keyPair.privateKey.bytes).toEqual(originalPrivateKeyBytes);
    });
  });
});

describe('deriveSharedKeyDeprecatedのテスト', () => {
  const createTestSalt = (): Uint8Array => {
    return new Uint8Array(32).fill(0x42);
  };

  describe('基本機能', () => {
    it('キーペア、公開鍵、ソルトから共有鍵を導出できる', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);
      const salt = createTestSalt();

      const sharedKey = deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, salt);

      expect(sharedKey).toBeInstanceOf(SharedKey256);
      expect(sharedKey.bytes).toBeInstanceOf(Uint8Array);
      expect(sharedKey.bytes.length).toBe(32);
    });

    it('異なるソルトで異なる共有鍵を生成する', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);
      const salt1 = new Uint8Array(32).fill(0x42);
      const salt2 = new Uint8Array(32).fill(0x43);

      const sharedKey1 = deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, salt1);
      const sharedKey2 = deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, salt2);

      expect(sharedKey1.bytes).not.toEqual(sharedKey2.bytes);
    });

    it('通常のderiveSharedKeyと異なる結果を生成する', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);
      const salt = createTestSalt();

      const sharedKey1 = deriveSharedKey(keyPair1, keyPair2.publicKey);
      const sharedKey2 = deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, salt);

      expect(sharedKey1.bytes).not.toEqual(sharedKey2.bytes);
    });
  });

  describe('ソルトの検証', () => {
    it('無効なサイズのソルトでエラーをスローする', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);
      const invalidSalt = new Uint8Array(16); // 32バイトではなく16バイト

      expect(() => {
        deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, invalidSalt);
      }).toThrow('invalid salt');
    });

    it('空のソルトでエラーをスローする', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);
      const emptySalt = new Uint8Array(0);

      expect(() => {
        deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, emptySalt);
      }).toThrow('invalid salt');
    });

    it('大きすぎるソルトでエラーをスローする', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);
      const largeSalt = new Uint8Array(64); // 32バイトより大きい

      expect(() => {
        deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, largeSalt);
      }).toThrow('invalid salt');
    });
  });

  describe('対称性', () => {
    it('同じソルトを使用すると対称的である', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);
      const salt = createTestSalt();

      const sharedKey1 = deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, salt);
      const sharedKey2 = deriveSharedKeyDeprecated(keyPair2, keyPair1.publicKey, salt);

      expect(sharedKey1.bytes).toEqual(sharedKey2.bytes);
    });

    it('異なるソルトでは対称性が成り立たない', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);
      const salt1 = new Uint8Array(32).fill(0x42);
      const salt2 = new Uint8Array(32).fill(0x43);

      const sharedKey1 = deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, salt1);
      const sharedKey2 = deriveSharedKeyDeprecated(keyPair2, keyPair1.publicKey, salt2);

      expect(sharedKey1.bytes).not.toEqual(sharedKey2.bytes);
    });
  });

  describe('決定性', () => {
    it('同じ入力から同じ共有鍵を生成する', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);
      const salt = createTestSalt();

      const sharedKey1 = deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, salt);
      const sharedKey2 = deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, salt);

      expect(sharedKey1.bytes).toEqual(sharedKey2.bytes);
    });
  });

  describe('ソルトの効果', () => {
    it('ソルトがsharedSecretとXORされる', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);

      // すべてゼロのソルトを使用
      const zeroSalt = new Uint8Array(32).fill(0);
      const sharedKeyWithZeroSalt = deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, zeroSalt);

      // 異なるソルトを使用
      const nonZeroSalt = new Uint8Array(32).fill(0xff);
      const sharedKeyWithNonZeroSalt = deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, nonZeroSalt);

      // 結果は異なるはず
      expect(sharedKeyWithZeroSalt.bytes).not.toEqual(sharedKeyWithNonZeroSalt.bytes);
    });

    it('ランダムなソルトで毎回異なる結果を生成する', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);

      const sharedKeys: SharedKey256[] = [];
      for (let i = 0; i < 5; i++) {
        // 異なるソルトを生成
        const salt = new Uint8Array(32);
        for (let j = 0; j < salt.length; j++) {
          salt[j] = i;
        }
        sharedKeys.push(deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, salt));
      }

      // すべて異なる共有鍵
      for (let i = 0; i < sharedKeys.length; i++) {
        for (let j = i + 1; j < sharedKeys.length; j++) {
          expect(sharedKeys[i].bytes).not.toEqual(sharedKeys[j].bytes);
        }
      }
    });
  });

  describe('秘密鍵の不変性', () => {
    it('元の秘密鍵を変更しない', () => {
      const originalPrivateKeyBytes = new Uint8Array(TEST_PRIVATE_KEY_1.bytes);
      const keyPair = new KeyPair(TEST_PRIVATE_KEY_1);
      const otherKeyPair = new KeyPair(TEST_PRIVATE_KEY_2);
      const salt = createTestSalt();

      deriveSharedKeyDeprecated(keyPair, otherKeyPair.publicKey, salt);

      expect(keyPair.privateKey.bytes).toEqual(originalPrivateKeyBytes);
    });
  });
});

describe('内部実装のテスト', () => {
  describe('秘密鍵の逆順処理', () => {
    it('deriveSharedKeyで秘密鍵が逆順に処理される', () => {
      // 特定のバイトパターンを持つ秘密鍵を作成
      const privateKeyBytes = new Uint8Array(32);
      for (let i = 0; i < 32; i++) {
        privateKeyBytes[i] = i;
      }
      const keyPair = new KeyPair(new PrivateKey(privateKeyBytes));
      const otherKeyPair = new KeyPair(TEST_PRIVATE_KEY_2);

      // 共有鍵を導出（内部で秘密鍵が逆順になる）
      const sharedKey1 = deriveSharedKey(keyPair, otherKeyPair.publicKey);

      // 元の秘密鍵は変更されていないことを確認
      expect(keyPair.privateKey.bytes).toEqual(privateKeyBytes);

      // 共有鍵が生成されることを確認
      expect(sharedKey1).toBeInstanceOf(SharedKey256);
    });

    it('deriveSharedKeyDeprecatedで秘密鍵が逆順に処理される', () => {
      // 特定のバイトパターンを持つ秘密鍵を作成
      const privateKeyBytes = new Uint8Array(32);
      for (let i = 0; i < 32; i++) {
        privateKeyBytes[i] = i;
      }
      const keyPair = new KeyPair(new PrivateKey(privateKeyBytes));
      const otherKeyPair = new KeyPair(TEST_PRIVATE_KEY_2);
      const salt = new Uint8Array(32).fill(0x42);

      // 共有鍵を導出（内部で秘密鍵が逆順になる）
      const sharedKey = deriveSharedKeyDeprecated(keyPair, otherKeyPair.publicKey, salt);

      // 元の秘密鍵は変更されていないことを確認
      expect(keyPair.privateKey.bytes).toEqual(privateKeyBytes);

      // 共有鍵が生成されることを確認
      expect(sharedKey).toBeInstanceOf(SharedKey256);
    });
  });

  describe('keccak_256ハッシュの使用', () => {
    it('最終的な共有鍵の長さが32バイトである', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);

      const sharedKey = deriveSharedKey(keyPair1, keyPair2.publicKey);

      // keccak_256は32バイトのハッシュを生成
      expect(sharedKey.bytes.length).toBe(32);
    });

    it('deriveSharedKeyDeprecatedで最終的な共有鍵の長さが32バイトである', () => {
      const keyPair1 = new KeyPair(TEST_PRIVATE_KEY_1);
      const keyPair2 = new KeyPair(TEST_PRIVATE_KEY_2);
      const salt = new Uint8Array(32).fill(0x42);

      const sharedKey = deriveSharedKeyDeprecated(keyPair1, keyPair2.publicKey, salt);

      // keccak_256は32バイトのハッシュを生成
      expect(sharedKey.bytes.length).toBe(32);
    });
  });
});
