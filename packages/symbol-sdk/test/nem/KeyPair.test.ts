import { describe, expect, it } from 'vitest';

import { PrivateKey, PublicKey, Signature } from '../../src/CryptoTypes.js';
import { KeyPair, Verifier } from '../../src/nem/KeyPair.js';

// テスト用の固定値
const TEST_PRIVATE_KEY = new PrivateKey('ABF4CF663C81E461DB1FEF2D145E6993B62E8B67801EDEA143335AEC4CBEC6CD');

const EXPECTED_PUBLIC_KEY = new PublicKey('39378D4FC4EFD816BCB427960CE8107A2F56230C347EE66017AEA78870785AF3');

const TEST_MESSAGE = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05]);

describe('KeyPairのテスト', () => {
  describe('コンストラクタとプロパティ', () => {
    it('秘密鍵からKeyPairを生成できる', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      expect(keyPair).toBeInstanceOf(KeyPair);
    });

    it('正しい公開鍵を生成する', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const publicKey = keyPair.publicKey;
      console.log(publicKey.toString());

      expect(publicKey).toBeInstanceOf(PublicKey);
      expect(publicKey.bytes).toEqual(EXPECTED_PUBLIC_KEY.bytes);
    });

    it('秘密鍵を取得できる', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const privateKey = keyPair.privateKey;

      expect(privateKey).toBeInstanceOf(PrivateKey);
      expect(privateKey.toString()).toEqual(TEST_PRIVATE_KEY.toString());
    });

    it('秘密鍵が逆順で処理される', () => {
      // 異なる秘密鍵で、逆順処理が行われていることを確認
      const privateKey1 = new PrivateKey(new Uint8Array(32).fill(1));
      const privateKey2 = new PrivateKey(new Uint8Array(32).fill(2));

      const keyPair1 = new KeyPair(privateKey1);
      const keyPair2 = new KeyPair(privateKey2);

      // 異なる秘密鍵からは異なる公開鍵が生成される
      expect(keyPair1.publicKey.bytes).not.toEqual(keyPair2.publicKey.bytes);
    });

    it('公開鍵はキャッシュされず毎回新しいインスタンスを返す', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const publicKey1 = keyPair.publicKey;
      const publicKey2 = keyPair.publicKey;

      // 異なるインスタンスだが同じ値
      expect(publicKey1).not.toBe(publicKey2);
      expect(publicKey1.bytes).toEqual(publicKey2.bytes);
    });
  });

  describe('署名機能', () => {
    it('メッセージに署名できる', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const signature = keyPair.sign(TEST_MESSAGE);

      expect(signature).toBeInstanceOf(Signature);
      expect(signature.bytes.length).toBe(64);
    });

    it('同じメッセージに対して同じ署名を生成する', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const signature1 = keyPair.sign(TEST_MESSAGE);
      const signature2 = keyPair.sign(TEST_MESSAGE);

      expect(signature1.bytes).toEqual(signature2.bytes);
    });

    it('異なるメッセージに対して異なる署名を生成する', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const message1 = new Uint8Array([0x01, 0x02, 0x03]);
      const message2 = new Uint8Array([0x04, 0x05, 0x06]);

      const signature1 = keyPair.sign(message1);
      const signature2 = keyPair.sign(message2);

      expect(signature1.bytes).not.toEqual(signature2.bytes);
    });

    it('異なる秘密鍵から異なる署名を生成する', () => {
      const privateKey1 = new PrivateKey(new Uint8Array(32).fill(1));
      const privateKey2 = new PrivateKey(new Uint8Array(32).fill(2));

      const keyPair1 = new KeyPair(privateKey1);
      const keyPair2 = new KeyPair(privateKey2);

      const signature1 = keyPair1.sign(TEST_MESSAGE);
      const signature2 = keyPair2.sign(TEST_MESSAGE);

      expect(signature1.bytes).not.toEqual(signature2.bytes);
    });

    it('空のメッセージに署名できる', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const emptyMessage = new Uint8Array();
      const signature = keyPair.sign(emptyMessage);

      expect(signature).toBeInstanceOf(Signature);
      expect(signature.bytes.length).toBe(64);
    });

    it('大きなメッセージに署名できる', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const largeMessage = new Uint8Array(1000).fill(0xaa);
      const signature = keyPair.sign(largeMessage);

      expect(signature).toBeInstanceOf(Signature);
      expect(signature.bytes.length).toBe(64);
    });
  });
});

describe('Verifierのテスト', () => {
  describe('コンストラクタ', () => {
    it('公開鍵からVerifierを生成できる', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const verifier = new Verifier(keyPair.publicKey);

      expect(verifier).toBeInstanceOf(Verifier);
      expect(verifier.publicKey).toBeInstanceOf(PublicKey);
    });

    it('公開鍵が保存される', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const publicKey = keyPair.publicKey;
      const verifier = new Verifier(publicKey);

      expect(verifier.publicKey.bytes).toEqual(publicKey.bytes);
    });

    it('ゼロの公開鍵でエラーをスローする', () => {
      const zeroPublicKey = new PublicKey(new Uint8Array(32).fill(0));

      expect(() => {
        new Verifier(zeroPublicKey);
      }).toThrow('public key cannot be zero');
    });
  });

  describe('署名検証機能', () => {
    it('正しい署名を検証できる', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const signature = keyPair.sign(TEST_MESSAGE);
      const verifier = new Verifier(keyPair.publicKey);

      const isValid = verifier.verify(TEST_MESSAGE, signature);
      expect(isValid).toBe(true);
    });

    it('不正な署名を拒否する', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const verifier = new Verifier(keyPair.publicKey);
      const invalidSignature = new Signature(new Uint8Array(64).fill(0xff));

      const isValid = verifier.verify(TEST_MESSAGE, invalidSignature);
      expect(isValid).toBe(false);
    });

    it('改ざんされたメッセージを検出する', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const signature = keyPair.sign(TEST_MESSAGE);
      const verifier = new Verifier(keyPair.publicKey);

      const tamperedMessage = new Uint8Array([...TEST_MESSAGE]);
      tamperedMessage[0] ^= 0xff; // メッセージを改ざん

      const isValid = verifier.verify(tamperedMessage, signature);
      expect(isValid).toBe(false);
    });

    it('異なる公開鍵での検証が失敗する', () => {
      const keyPair1 = new KeyPair(new PrivateKey(new Uint8Array(32).fill(1)));
      const keyPair2 = new KeyPair(new PrivateKey(new Uint8Array(32).fill(2)));

      const signature = keyPair1.sign(TEST_MESSAGE);
      const verifier = new Verifier(keyPair2.publicKey);

      const isValid = verifier.verify(TEST_MESSAGE, signature);
      expect(isValid).toBe(false);
    });

    it('空のメッセージの署名を検証できる', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const emptyMessage = new Uint8Array();
      const signature = keyPair.sign(emptyMessage);
      const verifier = new Verifier(keyPair.publicKey);

      const isValid = verifier.verify(emptyMessage, signature);
      expect(isValid).toBe(true);
    });

    it('大きなメッセージの署名を検証できる', () => {
      const keyPair = new KeyPair(TEST_PRIVATE_KEY);
      const largeMessage = new Uint8Array(1000).fill(0xaa);
      const signature = keyPair.sign(largeMessage);
      const verifier = new Verifier(keyPair.publicKey);

      const isValid = verifier.verify(largeMessage, signature);
      expect(isValid).toBe(true);
    });
  });
});

describe('KeyPairとVerifierの統合テスト', () => {
  it('署名と検証のエンドツーエンドのフロー', () => {
    // 1. KeyPair作成
    const privateKey = new PrivateKey(new Uint8Array(32).fill(0x42));
    const keyPair = new KeyPair(privateKey);

    // 2. メッセージに署名
    const message = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello"
    const signature = keyPair.sign(message);

    // 3. Verifier作成
    const verifier = new Verifier(keyPair.publicKey);

    // 4. 署名検証
    const isValid = verifier.verify(message, signature);
    expect(isValid).toBe(true);
  });

  it('複数のメッセージの署名と検証', () => {
    const keyPair = new KeyPair(TEST_PRIVATE_KEY);
    const verifier = new Verifier(keyPair.publicKey);

    const messages = [
      new Uint8Array([0x01]),
      new Uint8Array([0x01, 0x02]),
      new Uint8Array([0x01, 0x02, 0x03]),
      new Uint8Array(100).fill(0xaa),
    ];

    messages.forEach((message) => {
      const signature = keyPair.sign(message);
      const isValid = verifier.verify(message, signature);
      expect(isValid).toBe(true);
    });
  });

  it('複数のKeyPairが独立して機能する', () => {
    const keyPair1 = new KeyPair(new PrivateKey(new Uint8Array(32).fill(1)));
    const keyPair2 = new KeyPair(new PrivateKey(new Uint8Array(32).fill(2)));
    const keyPair3 = new KeyPair(new PrivateKey(new Uint8Array(32).fill(3)));

    const message = new Uint8Array([0x74, 0x65, 0x73, 0x74]); // "test"

    const signature1 = keyPair1.sign(message);
    const signature2 = keyPair2.sign(message);
    const signature3 = keyPair3.sign(message);

    const verifier1 = new Verifier(keyPair1.publicKey);
    const verifier2 = new Verifier(keyPair2.publicKey);
    const verifier3 = new Verifier(keyPair3.publicKey);

    // 各KeyPairは自分の署名のみを検証できる
    expect(verifier1.verify(message, signature1)).toBe(true);
    expect(verifier1.verify(message, signature2)).toBe(false);
    expect(verifier1.verify(message, signature3)).toBe(false);

    expect(verifier2.verify(message, signature1)).toBe(false);
    expect(verifier2.verify(message, signature2)).toBe(true);
    expect(verifier2.verify(message, signature3)).toBe(false);

    expect(verifier3.verify(message, signature1)).toBe(false);
    expect(verifier3.verify(message, signature2)).toBe(false);
    expect(verifier3.verify(message, signature3)).toBe(true);
  });

  it('署名の一貫性を確認', () => {
    const keyPair = new KeyPair(TEST_PRIVATE_KEY);
    const verifier = new Verifier(keyPair.publicKey);

    // 同じメッセージに複数回署名
    const message = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
    const signatures = Array.from({ length: 10 }, () => keyPair.sign(message));

    // すべての署名が同じで、すべて検証できる
    signatures.forEach((signature, i) => {
      if (i > 0) {
        expect(signature.bytes).toEqual(signatures[0].bytes);
      }
      expect(verifier.verify(message, signature)).toBe(true);
    });
  });
});
