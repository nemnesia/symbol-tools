import { describe, expect, it, vi } from 'vitest';

import { PrivateKey, PublicKey } from '../../src/CryptoTypes.js';
import { KeyPair } from '../../src/symbol/KeyPair.js';
import MessageEncoder from '../../src/symbol/MessageEncoder.js';

const cipherHelpersMocks = vi.hoisted(() => ({
  decodeAesGcm: vi.fn(),
}));

vi.mock('../../src/impl/CipherHelpers.js', async () => {
  const actual = await vi.importActual<typeof import('../../src/impl/CipherHelpers.js')>(
    '../../src/impl/CipherHelpers.js'
  );
  return {
    ...actual,
    decodeAesGcm: cipherHelpersMocks.decodeAesGcm,
  };
});

describe('symbol/MessageEncoderの例外分岐テスト', () => {
  it('tryDecodeで許容外エラーは再throwする', async () => {
    const sender = new KeyPair(new PrivateKey('1111111111111111111111111111111111111111111111111111111111111111'));
    const recipientPublicKey = new PublicKey('2222222222222222222222222222222222222222222222222222222222222222');
    const encoder = new MessageEncoder(sender);

    cipherHelpersMocks.decodeAesGcm.mockRejectedValueOnce(new Error('unexpected failure'));

    await expect(encoder.tryDecode(recipientPublicKey, new Uint8Array([1, 0]))).rejects.toThrow('unexpected failure');
  });
});
