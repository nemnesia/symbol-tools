import { describe, expect, it } from 'vitest';

import { mosaicRestrictionGenerateKey } from '../../src/symbol/restriction.js';

describe('restriction', () => {
  describe('mosaicRestrictionGenerateKey', () => {
    const assertKeyGeneration = (seed: string, expectedKey: bigint) => {
      // Act:
      const key = mosaicRestrictionGenerateKey(seed);

      // Assert:
      expect(key).to.equal(expectedKey);
    };

    it('can generate expected keys from seeds', () => {
      assertKeyGeneration('a', 0x7524a0fbf24b0880n); // unlike metadataGenerateKey, high bit can be unset
      assertKeyGeneration('abc', 0xb225e24fa75d983an);
      assertKeyGeneration('def', 0xb0ac5222678f0d8en);
    });
  });
});
