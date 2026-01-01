import { utils } from '@nemnesia/symbol-catbuffer';
import { describe, expect, it } from 'vitest';

import { SymbolUtils } from '../src/index.js';

// ダミーデータ
const HEX_ADDRESS = '6823BB7C3C1D19E1F7E2C8A4E7B2A6E5C7A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5';

describe('SymbolUtils', () => {
  it('16進文字列をUint8Arrayに変換できる', () => {
    const hex = 'AABBCC';
    const arr = utils.hexToUint8(hex);
    expect(arr).toBeInstanceOf(Uint8Array);
    expect(Array.from(arr)).toEqual([0xaa, 0xbb, 0xcc]);
  });

  it('Uint8Arrayを16進文字列に変換できる', () => {
    const arr = new Uint8Array([0xaa, 0xbb, 0xcc]);
    const hex = utils.uint8ToHex(arr);
    expect(hex).toBe('AABBCC');
  });

  it('HEXアドレスをBase32アドレスに変換できる', () => {
    const base32 = SymbolUtils.hexToBase32Address(HEX_ADDRESS);
    expect(typeof base32).toBe('string');
    expect(base32.length).toBeGreaterThan(0);
  });

  it('Base32アドレスをHEXアドレスに変換できる', () => {
    const base32 = SymbolUtils.hexToBase32Address(HEX_ADDRESS);
    const hex = SymbolUtils.base32ToHexAddress(base32);
    expect(hex.length).toBe(HEX_ADDRESS.length);
  });

  it('base32ToHexAddressで不正文字なら例外', () => {
    expect(() => {
      SymbolUtils.base32ToHexAddress('INVALID!');
    }).toThrow('Invalid Base32 character: !');
  });

  it('base32ToHexAddressの正常系（Aのみ）', () => {
    // "A"はBase32で0x00
    const base32 = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    const hex = SymbolUtils.base32ToHexAddress(base32);
    expect(typeof hex).toBe('string');
    expect(hex.length).toBeGreaterThan(0);
  });
});
