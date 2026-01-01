import { describe, expect, it } from 'vitest';

import ByteArray from '../src/ByteArray.js';

// モック用のユーティリティ関数
function hexToUint8(hex: string): Uint8Array {
  if (!hex) return new Uint8Array();
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return new Uint8Array(bytes);
}

describe('ByteArray', () => {
  it('hex stringから生成できる', () => {
    const arr = new ByteArray(4, '01020304');
    expect(arr.bytes).toEqual(hexToUint8('01020304'));
  });

  it('Uint8Arrayから生成できる', () => {
    const arr = new ByteArray(2, new Uint8Array([0x12, 0x34]));
    expect(arr.bytes).toEqual(new Uint8Array([0x12, 0x34]));
  });

  it('サイズ不一致で例外', () => {
    expect(() => new ByteArray(3, '0102')).toThrow(RangeError);
  });

  it('toString()は16進文字列', () => {
    const arr = new ByteArray(2, '0a0b');
    expect(arr.toString()).toBe('0A0B');
  });
});
