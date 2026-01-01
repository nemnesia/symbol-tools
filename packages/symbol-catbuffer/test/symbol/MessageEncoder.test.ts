import { describe, expect, it } from 'vitest';

import { PrivateKey, PublicKey } from '../../src/CryptoTypes.js';
import { utils } from '../../src/index.js';
import { KeyPair } from '../../src/symbol/KeyPair.js';
import MessageEncoder from '../../src/symbol/MessageEncoder.js';

describe('MessageEncoder', () => {
  const createEncoder = () => {
    const privateKey = new PrivateKey('ED4C70D78104EB11BCD73EBDC512FEBC8FBCEB36A370C957FF7E266230BB5D57');
    const keyPair = new KeyPair(privateKey);
    return new MessageEncoder(keyPair);
  };

  describe('encode/tryDecode', () => {
    it('メッセージをエンコード/デコードできる', async () => {
      const encoder = createEncoder();
      const recipientKeyPair = new KeyPair(
        new PrivateKey('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
      );
      const message = new TextEncoder().encode('Hello Symbol!');

      const encoded = await encoder.encode(recipientKeyPair.publicKey, message);

      // デコード側で受信者の秘密鍵を使用
      const recipientEncoder = new MessageEncoder(recipientKeyPair);
      const result = await recipientEncoder.tryDecode(encoder.publicKey, encoded);

      expect(result.isDecoded).toBe(true);
      expect(result.message).toEqual(message);
    });

    it('空のメッセージをエンコード/デコードできる', async () => {
      const encoder = createEncoder();
      const recipientKeyPair = new KeyPair(
        new PrivateKey('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB')
      );
      const message = new Uint8Array(0);

      const encoded = await encoder.encode(recipientKeyPair.publicKey, message);

      const recipientEncoder = new MessageEncoder(recipientKeyPair);
      const result = await recipientEncoder.tryDecode(encoder.publicKey, encoded);

      expect(result.isDecoded).toBe(true);
      expect(result.message).toEqual(message);
    });

    it('長いメッセージをエンコード/デコードできる', async () => {
      const encoder = createEncoder();
      const recipientKeyPair = new KeyPair(
        new PrivateKey('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC')
      );
      const message = new TextEncoder().encode('A'.repeat(1000));

      const encoded = await encoder.encode(recipientKeyPair.publicKey, message);

      const recipientEncoder = new MessageEncoder(recipientKeyPair);
      const result = await recipientEncoder.tryDecode(encoder.publicKey, encoded);

      expect(result.isDecoded).toBe(true);
      expect(result.message).toEqual(message);
    });

    it('不正なエンコードされたメッセージをデコードできない', async () => {
      const encoder = createEncoder();
      const recipientKeyPair = new KeyPair(
        new PrivateKey('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')
      );

      // 不正なフォーマット
      const invalidEncoded = new Uint8Array([1, 2, 3, 4, 5]);

      const recipientEncoder = new MessageEncoder(recipientKeyPair);
      const result = await recipientEncoder.tryDecode(encoder.publicKey, invalidEncoded);

      expect(result.isDecoded).toBe(false);
    });

    it('間違った受信者でデコードできない', async () => {
      const encoder = createEncoder();
      const recipientKeyPair = new KeyPair(
        new PrivateKey('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
      );
      const wrongRecipientKeyPair = new KeyPair(
        new PrivateKey('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      );
      const message = new TextEncoder().encode('Secret message');

      const encoded = await encoder.encode(recipientKeyPair.publicKey, message);

      // 間違った秘密鍵でデコード試行
      const wrongEncoder = new MessageEncoder(wrongRecipientKeyPair);
      const result = await wrongEncoder.tryDecode(encoder.publicKey, encoded);

      expect(result.isDecoded).toBe(false);
    });

    it('エンコードされたメッセージは0x01で始まる', async () => {
      const encoder = createEncoder();
      const recipientKeyPair = new KeyPair(
        new PrivateKey('1111111111111111111111111111111111111111111111111111111111111111')
      );
      const message = new TextEncoder().encode('Test');

      const encoded = await encoder.encode(recipientKeyPair.publicKey, message);

      expect(encoded[0]).toBe(1);
      expect(encoded.length).toBeGreaterThan(1);
    });
  });

  describe('encodePersistentHarvestingDelegation', () => {
    it('ハーベスティングデリゲーションリクエストをエンコードできる', async () => {
      const encoder = createEncoder();
      const nodePublicKey = new KeyPair(
        new PrivateKey('2222222222222222222222222222222222222222222222222222222222222222')
      ).publicKey;
      const remoteKeyPair = new KeyPair(
        new PrivateKey('3333333333333333333333333333333333333333333333333333333333333333')
      );
      const vrfKeyPair = new KeyPair(
        new PrivateKey('4444444444444444444444444444444444444444444444444444444444444444')
      );

      const encoded = await encoder.encodePersistentHarvestingDelegation(nodePublicKey, remoteKeyPair, vrfKeyPair);

      // デリゲーションマーカー (0xFE2A8061577301E2) で始まる
      const marker = new Uint8Array([0xfe, 0x2a, 0x80, 0x61, 0x57, 0x73, 0x01, 0xe2]);
      expect(encoded.subarray(0, 8)).toEqual(marker);
      expect(encoded.length).toBeGreaterThan(8 + 32); // marker + ephemeral public key + data
    });

    it('デリゲーションメッセージをデコードできる', async () => {
      const encoder = createEncoder();
      const nodeKeyPair = new KeyPair(
        new PrivateKey('5555555555555555555555555555555555555555555555555555555555555555')
      );
      const remoteKeyPair = new KeyPair(
        new PrivateKey('6666666666666666666666666666666666666666666666666666666666666666')
      );
      const vrfKeyPair = new KeyPair(
        new PrivateKey('7777777777777777777777777777777777777777777777777777777777777777')
      );

      const encoded = await encoder.encodePersistentHarvestingDelegation(
        nodeKeyPair.publicKey,
        remoteKeyPair,
        vrfKeyPair
      );

      // ノード側でデコード
      const nodeEncoder = new MessageEncoder(nodeKeyPair);
      const result = await nodeEncoder.tryDecode(null as any, encoded);

      expect(result.isDecoded).toBe(true);
      // メッセージはremote private key + vrf private keyの連結
      const expectedMessage = new Uint8Array([...remoteKeyPair.privateKey.bytes, ...vrfKeyPair.privateKey.bytes]);
      expect(result.message).toEqual(expectedMessage);
    });
  });

  describe('deprecated methods', () => {
    it('encodeDeprecatedでエンコードできる', async () => {
      const encoder = createEncoder();
      const recipientKeyPair = new KeyPair(
        new PrivateKey('8888888888888888888888888888888888888888888888888888888888888888')
      );
      const message = new TextEncoder().encode('Legacy message');

      const encoded = await encoder.encodeDeprecated(recipientKeyPair.publicKey, message);

      expect(encoded[0]).toBe(1);
      // hex encodedなので長さが増える
      expect(encoded.length).toBeGreaterThan(message.length * 2);
    });

    it('tryDecodeDeprecatedでデコードできる', async () => {
      const encoder = createEncoder();
      const recipientKeyPair = new KeyPair(
        new PrivateKey('9999999999999999999999999999999999999999999999999999999999999999')
      );
      const message = new TextEncoder().encode('Legacy test');

      const encoded = await encoder.encodeDeprecated(recipientKeyPair.publicKey, message);

      const recipientEncoder = new MessageEncoder(recipientKeyPair);
      const result = await recipientEncoder.tryDecodeDeprecated(encoder.publicKey, encoded);

      expect(result.isDecoded).toBe(true);
      expect(result.message).toEqual(message);
    });
  });

  describe('publicKey getter', () => {
    it('エンコーダーの公開鍵を取得できる', () => {
      const privateKey = new PrivateKey('ED4C70D78104EB11BCD73EBDC512FEBC8FBCEB36A370C957FF7E266230BB5D57');
      const keyPair = new KeyPair(privateKey);
      const encoder = new MessageEncoder(keyPair);

      expect(encoder.publicKey).toEqual(keyPair.publicKey);
    });
  });

  describe('SDK互換性', () => {
    it('暗号化メッセージをでコードできる', async () => {
      const privateKey = new PrivateKey('2222222222222222222222222222222222222222222222222222222222222222');
      const keyPair = new KeyPair(privateKey);
      const encoder = new MessageEncoder(keyPair);
      const decodedMessage = await encoder.tryDecode(
        new PublicKey('D04AB232742BB4AB3A1368BD4615E4E6D0224AB71A016BAF8520A332C9778737'),
        utils.hexToUint8('01B8FA02BBC0F67160AF8110574C00EC6680BF8091C41A06FA3B5A4A980C343C2263BB93D66C3D9F43B989')
      );
      const message = new TextDecoder().decode(decodedMessage.message);

      expect(message).toEqual('Hello, Symbol!');
    });
  });
});
