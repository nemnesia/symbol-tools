import { PrivateKey } from '@nemnesia/symbol-catbuffer';
import { SymbolFacade, descriptors } from 'symbol-sdk/symbol';
import { describe, expect, it } from 'vitest';

import { SymbolKeyPair, SymbolNetwork, SymbolUtils } from '../src/index.js';

// ダミーデータ
const PUBLIC_KEY = 'B4F12E7C9F6946091E2CB8B6D3A12B50D17CCBBF846A566FCF6DE0B6A6A2C82A';
const HEX_ADDRESS = '6823BB7C3C1D19E1F7E2C8A4E7B2A6E5C7A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5';
const TEST_PRIVATE_KEY = 'AABBCCDDEEFF00112233445566778899AABBCCDDEEFF00112233445566778899';

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
    // トランザクション作成
    const facade = new SymbolFacade('mainnet');
    const account = facade.createAccount(new PrivateKey(TEST_PRIVATE_KEY));
    const transferDescriptor = new descriptors.TransferTransactionV1Descriptor(account.address, [], '\0Hello, Symbol!');
    const transferTx = facade.createTransactionFromTypedDescriptor(transferDescriptor, account.publicKey, 0, 0);
    // 署名
    const network = new SymbolNetwork('mainnet');
    const keyPair = new SymbolKeyPair(new PrivateKey(TEST_PRIVATE_KEY));
    const signature = network.signTransaction(keyPair, transferTx);

    const result = SymbolUtils.attachSignature(transferTx, signature);
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

  it('Uint8ArrayをBigIntに変換できる', () => {
    const arr = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
    const result = SymbolUtils.bytesToBigInt(arr);
    expect(result).toBeTypeOf('bigint');
    expect(result).toBe(0x04030201n);
  });

  it('base32ToHexAddressの正常系（Aのみ）', () => {
    // "A"はBase32で0x00
    const base32 = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    const hex = SymbolUtils.base32ToHexAddress(base32);
    expect(typeof hex).toBe('string');
    expect(hex.length).toBeGreaterThan(0);
  });

  it('publicKeyToAddressでnetwork: testnet分岐', () => {
    const address = SymbolUtils.publicKeyToAddress(PUBLIC_KEY, 'testnet');
    expect(typeof address).toBe('string');
    expect(address.length).toBeGreaterThan(0);
    // testnetは先頭がTになる
    expect(address[0]).toBe('T');
  });
});
