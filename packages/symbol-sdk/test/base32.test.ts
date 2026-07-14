import { describe, expect, it } from 'vitest';

import base32 from '../src/utils/base32.js';

describe('base32のテスト', () => {
  it('5バイトブロックをencode/decodeで往復できる', () => {
    const input = new Uint8Array([1, 2, 3, 4, 5]);
    const encoded = base32.encode(input);
    const decoded = base32.decode(encoded);

    expect(encoded).toHaveLength(8);
    expect(decoded).toEqual(input);
  });

  it('不正なデコード前サイズでencodeが失敗する', () => {
    expect(() => base32.encode(new Uint8Array([1, 2, 3]))).toThrowError('decoded size must be multiple of 5');
  });

  it('不正なエンコード済みサイズでdecodeが失敗する', () => {
    expect(() => base32.decode('ABC')).toThrowError('encoded size must be multiple of 8');
  });

  it('不正文字を含むエンコード文字列をdecodeすると失敗する', () => {
    expect(() => base32.decode('AAAAAAA!')).toThrowError('illegal base32 character !');
  });
});
