import { describe, expect, it } from 'vitest';

import { SymbolUtils } from '../src/index.js';

const PUBLIC_KEY = 'B4F12E7C9F6946091E2CB8B6D3A12B50D17CCBBF846A566FCF6DE0B6A6A2C82A';
const HEX_ADDRESS = '6823BB7C3C1D19E1F7E2C8A4E7B2A6E5C7A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5'; // ダミー

describe('SymbolUtils', () => {
  it('16進文字列をUint8Arrayに変換できる', () => {
    const hex = 'AABBCC';
    const arr = SymbolUtils.hexToUint8(hex);
    expect(arr).toBeInstanceOf(Uint8Array);
    expect(Array.from(arr)).toEqual([0xaa, 0xbb, 0xcc]);
  });

  it('Uint8Arrayを16進文字列に変換できる', () => {
    const arr = new Uint8Array([0xaa, 0xbb, 0xcc]);
    const hex = SymbolUtils.uint8ToHex(arr);
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

  it('公開鍵からアドレスを生成できる', () => {
    const address = SymbolUtils.publicKeyToAddress(PUBLIC_KEY, 'mainnet');
    expect(typeof address).toBe('string');
    expect(address.length).toBeGreaterThan(0);
  });

  it('署名と公開鍵をトランザクションバイト列にアタッチできる', () => {
    const txPayload = new Uint8Array(128);
    const signature = new Uint8Array(64).fill(0xaa);
    const result = SymbolUtils.attachSignature(txPayload, signature);
    expect(result).toMatch(/payload/);
  });

    it('base32ToHexAddressで不正文字なら例外', () => {
      expect(() => {
        SymbolUtils.base32ToHexAddress('INVALID!');
      }).toThrow('Invalid Base32 character: !');
    });

    it('publicKeyToAddressでnetwork: number分岐', () => {
      const address = SymbolUtils.publicKeyToAddress(PUBLIC_KEY, 0x68);
      expect(typeof address).toBe('string');
      expect(address.length).toBeGreaterThan(0);
    });

    it('attachSignatureでstring型signature分岐', () => {
      const txPayload = new Uint8Array(128);
      const signature = 'A'.repeat(64 * 2); // 64バイト分の16進
      const result = SymbolUtils.attachSignature(txPayload, signature);
      expect(result).toMatch(/payload/);
    });
});
