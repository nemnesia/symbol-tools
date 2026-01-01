import { sha256 } from '@noble/hashes/sha2.js';
import { sha512 } from '@noble/hashes/sha2.js';
import { describe, expect, it } from 'vitest';

import { PrivateKey, PublicKey, SharedKey256 } from '../src/CryptoTypes.js';
import { deriveSharedKeyFactory, deriveSharedSecretFactory } from '../src/SharedKey.js';
import { KeyPair } from '../src/symbol/KeyPair.js';

describe('deriveSharedSecretFactory', () => {
  // 有効なキーペアを使用してテスト用の鍵を生成
  const createTestKeyPair1 = (): KeyPair => {
    return new KeyPair(new PrivateKey('ED4C70D78104EB11BCD73EBDC512FEBC8FBCEB36A370C957FF7E266230BB5D57'));
  };

  const createTestKeyPair2 = (): KeyPair => {
    return new KeyPair(new PrivateKey('71BC0DB348A25D163290C44EF863B031FD5251D4E3674DCE37D78FE8C5DBBBB6'));
  };

  const createTestPrivateKey = (): Uint8Array => {
    return createTestKeyPair1().privateKey.bytes;
  };

  const createTestPublicKey = (): PublicKey => {
    return createTestKeyPair2().publicKey;
  };

  const createAnotherPublicKey = (): PublicKey => {
    return new KeyPair(new PrivateKey('41FB51558293885BB8D147046091D3239FE0B631D094ED8C80BCC4CD31804629')).publicKey;
  };

  describe('basic functionality', () => {
    it('SHA-512を使用して共有シークレットファクトリーを作成できる', () => {
      const deriveSharedSecret = deriveSharedSecretFactory(sha512);

      expect(deriveSharedSecret).toBeDefined();
      expect(typeof deriveSharedSecret).toBe('function');
    });

    it('SHA-256を使用して共有シークレットファクトリーを作成できる', () => {
      const deriveSharedSecret = deriveSharedSecretFactory(sha256);

      expect(deriveSharedSecret).toBeDefined();
      expect(typeof deriveSharedSecret).toBe('function');
    });

    it('秘密鍵と公開鍵から共有シークレットを導出できる', () => {
      const deriveSharedSecret = deriveSharedSecretFactory(sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedSecret = deriveSharedSecret(privateKey, publicKey);

      expect(sharedSecret).toBeInstanceOf(Uint8Array);
      expect(sharedSecret.length).toBe(32);
    });
  });

  describe('determinism', () => {
    it('同じ入力から同じ共有シークレットを生成する', () => {
      const deriveSharedSecret = deriveSharedSecretFactory(sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const secret1 = deriveSharedSecret(privateKey, publicKey);
      const secret2 = deriveSharedSecret(privateKey, publicKey);

      expect(secret1).toEqual(secret2);
    });

    it('複数回の導出で一貫性を保つ', () => {
      const deriveSharedSecret = deriveSharedSecretFactory(sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const secrets = [];
      for (let i = 0; i < 10; i++) {
        secrets.push(deriveSharedSecret(privateKey, publicKey));
      }

      // すべて同じシークレット
      for (let i = 1; i < secrets.length; i++) {
        expect(secrets[i]).toEqual(secrets[0]);
      }
    });
  });

  describe('uniqueness', () => {
    it('異なる公開鍵から異なる共有シークレットを生成する', () => {
      const deriveSharedSecret = deriveSharedSecretFactory(sha512);
      const privateKey = createTestPrivateKey();
      const publicKey1 = createTestPublicKey();
      const publicKey2 = createAnotherPublicKey();

      const secret1 = deriveSharedSecret(privateKey, publicKey1);
      const secret2 = deriveSharedSecret(privateKey, publicKey2);

      expect(secret1).not.toEqual(secret2);
    });

    it('異なるハッシュ関数で異なる結果を生成する', () => {
      const deriveWithSha512 = deriveSharedSecretFactory(sha512);
      const deriveWithSha256 = deriveSharedSecretFactory(sha256);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const secret512 = deriveWithSha512(privateKey, publicKey);
      const secret256 = deriveWithSha256(privateKey, publicKey);

      expect(secret512).not.toEqual(secret256);
    });
  });

  describe('validation', () => {
    it('共有シークレットが全ゼロではない', () => {
      const deriveSharedSecret = deriveSharedSecretFactory(sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedSecret = deriveSharedSecret(privateKey, publicKey);

      const allZero = sharedSecret.every((byte) => byte === 0);
      expect(allZero).toBe(false);
    });

    it('共有シークレットが全1ではない', () => {
      const deriveSharedSecret = deriveSharedSecretFactory(sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedSecret = deriveSharedSecret(privateKey, publicKey);

      const allOnes = sharedSecret.every((byte) => byte === 0xff);
      expect(allOnes).toBe(false);
    });
  });

  describe('error handling', () => {
    it('無効な公開鍵でエラーをスローする（全ゼロ）', () => {
      const deriveSharedSecret = deriveSharedSecretFactory(sha512);
      const privateKey = createTestPrivateKey();
      const invalidPublicKey = new PublicKey(new Uint8Array(32).fill(0));

      expect(() => deriveSharedSecret(privateKey, invalidPublicKey)).toThrow('invalid point');
    });

    it('無効な公開鍵でエラーをスローする（全1）', () => {
      const deriveSharedSecret = deriveSharedSecretFactory(sha512);
      const privateKey = createTestPrivateKey();
      const invalidPublicKey = new PublicKey(new Uint8Array(32).fill(0xff));

      expect(() => deriveSharedSecret(privateKey, invalidPublicKey)).toThrow('invalid point');
    });

    it('非正規形式の公開鍵でエラーをスローする', () => {
      const deriveSharedSecret = deriveSharedSecretFactory(sha512);
      const privateKey = createTestPrivateKey();
      // y座標が大きすぎる非正規公開鍵
      const nonCanonicalKey = new Uint8Array(32);
      nonCanonicalKey[31] = 0xff; // y座標が 2^255 - 19 より大きい
      const invalidPublicKey = new PublicKey(nonCanonicalKey);

      expect(() => deriveSharedSecret(privateKey, invalidPublicKey)).toThrow('invalid point');
    });
  });

  describe('cryptographic properties', () => {
    it('共有シークレットのエントロピーが十分である', () => {
      const deriveSharedSecret = deriveSharedSecretFactory(sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedSecret = deriveSharedSecret(privateKey, publicKey);

      // 簡易的なエントロピーチェック：異なるバイト値の数
      const uniqueBytes = new Set(sharedSecret).size;
      expect(uniqueBytes).toBeGreaterThan(5); // 最低限のバリエーション
    });
  });
});

describe('deriveSharedKeyFactory', () => {
  const createTestKeyPair1 = (): KeyPair => {
    return new KeyPair(new PrivateKey('ED4C70D78104EB11BCD73EBDC512FEBC8FBCEB36A370C957FF7E266230BB5D57'));
  };

  const createTestKeyPair2 = (): KeyPair => {
    return new KeyPair(new PrivateKey('71BC0DB348A25D163290C44EF863B031FD5251D4E3674DCE37D78FE8C5DBBBB6'));
  };

  const createTestPrivateKey = (): Uint8Array => {
    return createTestKeyPair1().privateKey.bytes;
  };

  const createTestPublicKey = (): PublicKey => {
    return createTestKeyPair2().publicKey;
  };

  const createAnotherPublicKey = (): PublicKey => {
    return new KeyPair(new PrivateKey('41FB51558293885BB8D147046091D3239FE0B631D094ED8C80BCC4CD31804629')).publicKey;
  };

  describe('basic functionality', () => {
    it('情報文字列とハッシュ関数で共有鍵ファクトリーを作成できる', () => {
      const deriveSharedKey = deriveSharedKeyFactory('test-info', sha512);

      expect(deriveSharedKey).toBeDefined();
      expect(typeof deriveSharedKey).toBe('function');
    });

    it('秘密鍵と公開鍵から共有鍵を導出できる', () => {
      const deriveSharedKey = deriveSharedKeyFactory('test-info', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedKey = deriveSharedKey(privateKey, publicKey);

      expect(sharedKey).toBeInstanceOf(SharedKey256);
      expect(sharedKey.bytes).toBeInstanceOf(Uint8Array);
      expect(sharedKey.bytes.length).toBe(32);
    });

    it('catapult情報文字列で共有鍵を導出できる', () => {
      const deriveSharedKey = deriveSharedKeyFactory('catapult', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedKey = deriveSharedKey(privateKey, publicKey);

      expect(sharedKey).toBeInstanceOf(SharedKey256);
    });
  });

  describe('HKDF integration', () => {
    it('HKDFを使用して鍵導出を行う', () => {
      const deriveSharedKey = deriveSharedKeyFactory('test', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedKey = deriveSharedKey(privateKey, publicKey);

      // HKDFは常に32バイトの鍵を生成する（指定されたサイズ）
      expect(sharedKey.bytes.length).toBe(32);
    });

    it('異なる情報文字列で異なる鍵を生成する', () => {
      const deriveKey1 = deriveSharedKeyFactory('info1', sha512);
      const deriveKey2 = deriveSharedKeyFactory('info2', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const key1 = deriveKey1(privateKey, publicKey);
      const key2 = deriveKey2(privateKey, publicKey);

      expect(key1.toString()).not.toBe(key2.toString());
    });
  });

  describe('determinism', () => {
    it('同じ入力から同じ共有鍵を生成する', () => {
      const deriveSharedKey = deriveSharedKeyFactory('test', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const key1 = deriveSharedKey(privateKey, publicKey);
      const key2 = deriveSharedKey(privateKey, publicKey);

      expect(key1.toString()).toBe(key2.toString());
    });

    it('複数回の導出で一貫性を保つ', () => {
      const deriveSharedKey = deriveSharedKeyFactory('test', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const keys = [];
      for (let i = 0; i < 5; i++) {
        keys.push(deriveSharedKey(privateKey, publicKey));
      }

      for (let i = 1; i < keys.length; i++) {
        expect(keys[i].toString()).toBe(keys[0].toString());
      }
    });
  });

  describe('uniqueness', () => {
    it('異なる公開鍵から異なる共有鍵を生成する', () => {
      const deriveSharedKey = deriveSharedKeyFactory('test', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey1 = createTestPublicKey();
      const publicKey2 = createAnotherPublicKey();

      const key1 = deriveSharedKey(privateKey, publicKey1);
      const key2 = deriveSharedKey(privateKey, publicKey2);

      expect(key1.toString()).not.toBe(key2.toString());
    });

    it('異なるハッシュ関数で異なる鍵を生成する', () => {
      const deriveWithSha512 = deriveSharedKeyFactory('test', sha512);
      const deriveWithSha256 = deriveSharedKeyFactory('test', sha256);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const key512 = deriveWithSha512(privateKey, publicKey);
      const key256 = deriveWithSha256(privateKey, publicKey);

      expect(key512.toString()).not.toBe(key256.toString());
    });
  });

  describe('validation', () => {
    it('共有鍵が全ゼロではない', () => {
      const deriveSharedKey = deriveSharedKeyFactory('test', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedKey = deriveSharedKey(privateKey, publicKey);

      const allZero = sharedKey.bytes.every((byte) => byte === 0);
      expect(allZero).toBe(false);
    });

    it('共有鍵が全1ではない', () => {
      const deriveSharedKey = deriveSharedKeyFactory('test', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedKey = deriveSharedKey(privateKey, publicKey);

      const allOnes = sharedKey.bytes.every((byte) => byte === 0xff);
      expect(allOnes).toBe(false);
    });
  });

  describe('error handling', () => {
    it('無効な公開鍵でエラーをスローする', () => {
      const deriveSharedKey = deriveSharedKeyFactory('test', sha512);
      const privateKey = createTestPrivateKey();
      const invalidPublicKey = new PublicKey(new Uint8Array(32).fill(0));

      expect(() => deriveSharedKey(privateKey, invalidPublicKey)).toThrow('invalid point');
    });
  });

  describe('cryptographic properties', () => {
    it('導出された鍵が十分なエントロピーを持つ', () => {
      const deriveSharedKey = deriveSharedKeyFactory('test', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedKey = deriveSharedKey(privateKey, publicKey);

      // 簡易的なエントロピーチェック
      const uniqueBytes = new Set(sharedKey.bytes).size;
      expect(uniqueBytes).toBeGreaterThan(10);
    });

    it('AES暗号化に適したサイズである', () => {
      const deriveSharedKey = deriveSharedKeyFactory('aes', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedKey = deriveSharedKey(privateKey, publicKey);

      // AES-256に必要な32バイト
      expect(sharedKey.bytes.length).toBe(32);
    });
  });

  describe('comparison with shared secret', () => {
    it('共有シークレットから共有鍵が導出される', () => {
      const deriveSecret = deriveSharedSecretFactory(sha512);
      const deriveKey = deriveSharedKeyFactory('test', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const secret = deriveSecret(privateKey, publicKey);
      const key = deriveKey(privateKey, publicKey);

      // シークレットと鍵は異なる（HKDFによって変換される）
      expect(secret).not.toEqual(key.bytes);

      // 両方とも32バイト
      expect(secret.length).toBe(32);
      expect(key.bytes.length).toBe(32);
    });
  });

  describe('real-world scenarios', () => {
    it('Symbol catapult情報文字列で正しく動作する', () => {
      const deriveSharedKey = deriveSharedKeyFactory('catapult', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedKey = deriveSharedKey(privateKey, publicKey);

      expect(sharedKey).toBeInstanceOf(SharedKey256);
      expect(sharedKey.bytes.length).toBe(32);
    });

    it('空の情報文字列でも動作する', () => {
      const deriveSharedKey = deriveSharedKeyFactory('', sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedKey = deriveSharedKey(privateKey, publicKey);

      expect(sharedKey).toBeInstanceOf(SharedKey256);
    });

    it('長い情報文字列でも動作する', () => {
      const longInfo = 'a'.repeat(1000);
      const deriveSharedKey = deriveSharedKeyFactory(longInfo, sha512);
      const privateKey = createTestPrivateKey();
      const publicKey = createTestPublicKey();

      const sharedKey = deriveSharedKey(privateKey, publicKey);

      expect(sharedKey).toBeInstanceOf(SharedKey256);
    });
  });
});

describe('integration tests', () => {
  it('sharedSecretとsharedKeyファクトリーの連携', () => {
    const deriveSecret = deriveSharedSecretFactory(sha512);
    const deriveKey = deriveSharedKeyFactory('integration-test', sha512);

    const keyPair1 = new KeyPair(new PrivateKey('ED4C70D78104EB11BCD73EBDC512FEBC8FBCEB36A370C957FF7E266230BB5D57'));
    const keyPair2 = new KeyPair(new PrivateKey('71BC0DB348A25D163290C44EF863B031FD5251D4E3674DCE37D78FE8C5DBBBB6'));

    const privateKey: Uint8Array = keyPair1.privateKey.bytes;
    const publicKey: PublicKey = keyPair2.publicKey;

    const secret = deriveSecret(privateKey, publicKey);
    const key = deriveKey(privateKey, publicKey);

    expect(secret).toBeInstanceOf(Uint8Array);
    expect(key).toBeInstanceOf(SharedKey256);
    expect(secret.length).toBe(32);
    expect(key.bytes.length).toBe(32);
  });
});
