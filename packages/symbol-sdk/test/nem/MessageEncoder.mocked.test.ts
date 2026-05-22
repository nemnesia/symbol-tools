import { beforeEach, describe, expect, it, vi } from 'vitest';

import MessageEncoder from '../../src/nem/MessageEncoder.js';
import { Message, MessageType } from '../../src/nem/models.js';

const cipherHelpersMocks = vi.hoisted(() => ({
  decodeAesGcm: vi.fn(),
  decodeAesCbc: vi.fn(),
  encodeAesGcm: vi.fn(),
  encodeAesCbc: vi.fn(),
}));

vi.mock('../../src/impl/CipherHelpers.js', () => ({
  concatArrays: (...parts: Uint8Array[]) => {
    const size = parts.reduce((sum, part) => sum + part.length, 0);
    const out = new Uint8Array(size);
    let offset = 0;
    parts.forEach((part) => {
      out.set(part, offset);
      offset += part.length;
    });
    return out;
  },
  decodeAesGcm: cipherHelpersMocks.decodeAesGcm,
  decodeAesCbc: cipherHelpersMocks.decodeAesCbc,
  encodeAesGcm: cipherHelpersMocks.encodeAesGcm,
  encodeAesCbc: cipherHelpersMocks.encodeAesCbc,
}));

describe('nem/MessageEncoderの分岐テスト', () => {
  const keyPair = { publicKey: { bytes: new Uint8Array(32) } } as any;
  const recipientPublicKey = { bytes: new Uint8Array(32).fill(1) } as any;
  const encoder = new MessageEncoder(keyPair);

  const createEncryptedMessage = () => {
    const message = new Message();
    message.messageType = MessageType.ENCRYPTED;
    message.message = new Uint8Array([1, 2, 3]);
    return message;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('messageTypeが不正な場合は例外を投げる', async () => {
    const message = new Message();
    message.messageType = MessageType.PLAIN;
    message.message = new Uint8Array([1]);

    await expect(encoder.tryDecode(recipientPublicKey, message)).rejects.toThrow('invalid message format');
  });

  it('GCM復号成功時はdecodedを返す', async () => {
    cipherHelpersMocks.decodeAesGcm.mockResolvedValueOnce(new Uint8Array([9, 9]));
    const result = await encoder.tryDecode(recipientPublicKey, createEncryptedMessage());

    expect(result.isDecoded).toBe(true);
    expect(result.message).toEqual(new Uint8Array([9, 9]));
  });

  it('GCM失敗後にCBC復号が成功すればdecodedを返す', async () => {
    cipherHelpersMocks.decodeAesGcm.mockRejectedValueOnce(
      new Error('Unsupported state or unable to authenticate data')
    );
    cipherHelpersMocks.decodeAesCbc.mockResolvedValueOnce(new Uint8Array([7, 7]));

    const result = await encoder.tryDecode(recipientPublicKey, createEncryptedMessage());
    expect(result.isDecoded).toBe(true);
    expect(result.message).toEqual(new Uint8Array([7, 7]));
  });

  it('GCM/CBCともに許容失敗ならfalseを返す', async () => {
    cipherHelpersMocks.decodeAesGcm.mockRejectedValueOnce(
      new Error('Unsupported state or unable to authenticate data')
    );
    cipherHelpersMocks.decodeAesCbc.mockRejectedValueOnce(new Error('bad decrypt'));

    const message = createEncryptedMessage();
    const result = await encoder.tryDecode(recipientPublicKey, message);
    expect(result.isDecoded).toBe(false);
    expect(result.message).toBe(message);
  });

  it('GCMで未知エラーが発生した場合は再throwする', async () => {
    cipherHelpersMocks.decodeAesGcm.mockRejectedValueOnce(new Error('unexpected failure'));

    await expect(encoder.tryDecode(recipientPublicKey, createEncryptedMessage())).rejects.toThrow('unexpected failure');
  });

  it('encode/encodeDeprecatedはMessageType.ENCRYPTEDを設定する', async () => {
    cipherHelpersMocks.encodeAesGcm.mockResolvedValueOnce({
      tag: new Uint8Array([1]),
      initializationVector: new Uint8Array([2]),
      cipherText: new Uint8Array([3]),
    });
    cipherHelpersMocks.encodeAesCbc.mockResolvedValueOnce({
      salt: new Uint8Array([4]),
      initializationVector: new Uint8Array([5]),
      cipherText: new Uint8Array([6]),
    });

    const gcm = await encoder.encode(recipientPublicKey, new Uint8Array([1]));
    const cbc = await encoder.encodeDeprecated(recipientPublicKey, new Uint8Array([1]));

    expect(gcm.messageType).toBe(MessageType.ENCRYPTED);
    expect(cbc.messageType).toBe(MessageType.ENCRYPTED);
  });
});
