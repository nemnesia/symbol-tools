import { describe, expect, it } from 'vitest';

import { ripemdKeccak256 } from '../src/utils/transforms.js';

describe('transformsのテスト', () => {
  it('ripemdKeccak256は20バイトのハッシュを返す', () => {
    const hash = ripemdKeccak256(new Uint8Array([1, 2, 3]));
    expect(hash).toBeInstanceOf(Uint8Array);
    expect(hash.length).toBe(20);
  });

  it('ripemdKeccak256は同一入力で決定的な結果を返す', () => {
    const payload = new Uint8Array([9, 8, 7, 6]);
    const hash1 = ripemdKeccak256(payload);
    const hash2 = ripemdKeccak256(payload);
    expect(hash1).toEqual(hash2);
  });

  it('ripemdKeccak256は入力が変わると結果も変わる', () => {
    const hash1 = ripemdKeccak256(new Uint8Array([1]));
    const hash2 = ripemdKeccak256(new Uint8Array([2]));
    expect(hash1).not.toEqual(hash2);
  });
});
