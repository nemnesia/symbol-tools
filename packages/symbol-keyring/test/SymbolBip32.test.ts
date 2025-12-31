import { Bip32 } from 'symbol-sdk';
import { KeyPair, SymbolFacade } from 'symbol-sdk/symbol';
import { describe, expect, it } from 'vitest';

import { SymbolBip32, SymbolBip32Node, SymbolKeyPair } from '../src/index.js';

const TEST_MNEMONIC =
  'impulse inform sing crush phone aim owner panda pattern very drama require since ' +
  'verify baby rather cook there frame hotel neck notice loyal actor';
const TEST_PASSWORD = 'testpassword';

describe('SymbolBip32', () => {
  it('ニーモニックを生成できる', () => {
    const bip32 = new SymbolBip32('ed25519', 'english');
    const mnemonic = bip32.random();
    expect(typeof mnemonic).toBe('string');
    expect(mnemonic.split(' ').length).toEqual(24);
  });

  it('ニーモニックからノードを生成できる', () => {
    const bip32 = new SymbolBip32('ed25519', 'english');
    const node = bip32.fromMnemonic(TEST_MNEMONIC, TEST_PASSWORD);
    expect(node).toBeInstanceOf(SymbolBip32Node);
  });

  it('パスを派生してキーペアを取得できる', () => {
    const bip32 = new SymbolBip32('ed25519', 'english');
    const node = bip32.fromMnemonic(TEST_MNEMONIC, TEST_PASSWORD);
    const path = node.bip32Path('mainnet', 0);
    const derived = node.derivePath(path);
    const keyPair = derived.toKeyPair();
    expect(keyPair).toBeInstanceOf(SymbolKeyPair);
    expect(keyPair.privateKey).toMatch(/^[A-F0-9]{64}$/);
  });

  it('deriveOneで子ノードを派生できる', () => {
    const bip32 = new SymbolBip32('ed25519', 'english');
    const node = bip32.fromMnemonic(TEST_MNEMONIC, TEST_PASSWORD);
    const child = node.deriveOne(1);
    expect(child).toBeInstanceOf(SymbolBip32Node);
  });

  it('curveName/mnemonicLanguageの分岐で生成できる', () => {
    const bip32 = new SymbolBip32('ed25519', 'japanese');
    const mnemonic = bip32.random();
    expect(typeof mnemonic).toBe('string');
    expect(mnemonic.split('　').length).toEqual(24);
  });

  it('fromSeedで直接ノード生成できる', () => {
    const bip32 = new SymbolBip32('ed25519', 'english');
    const seed = new Uint8Array(32).fill(1);
    const node = bip32.fromSeed(seed);
    expect(node).toBeInstanceOf(SymbolBip32Node);
  });

  it('SDKと同じ秘密鍵/公開鍵が生成される(メインネット)', () => {
    const symbolBip32 = new SymbolBip32();
    const node = symbolBip32.fromMnemonic(TEST_MNEMONIC);
    const maxIndex = 5;
    const keyPairs: SymbolKeyPair[] = [];
    for (let i = 0; i < maxIndex; i++) {
      const path = node.bip32Path('mainnet', i);
      const derived = node.derivePath(path);
      const keyPair = derived.toKeyPair();
      keyPairs.push(keyPair);
    }
    // SDK
    const facade = new SymbolFacade('mainnet');
    const bip32 = new Bip32();
    const bip32Node = bip32.fromMnemonic(TEST_MNEMONIC, '');
    const sdkKeyPairs: KeyPair[] = [];
    for (let i = 0; i < maxIndex; i++) {
      const bip32Path = facade.bip32Path(i);
      const childBip32Node = bip32Node.derivePath(bip32Path);
      const keypair = SymbolFacade.bip32NodeToKeyPair(childBip32Node);
      sdkKeyPairs.push(keypair);
    }
    // 比較
    for (let i = 0; i < maxIndex; i++) {
      expect(keyPairs[i].privateKey).toBe(sdkKeyPairs[i].privateKey.toString());
      expect(keyPairs[i].publicKey).toBe(sdkKeyPairs[i].publicKey.toString());
    }
  });

  it('SDKと同じ秘密鍵/公開鍵が生成される(テストネット)', () => {
    const symbolBip32 = new SymbolBip32();
    const node = symbolBip32.fromMnemonic(TEST_MNEMONIC);
    const maxIndex = 5;
    const keyPairs: SymbolKeyPair[] = [];
    for (let i = 0; i < maxIndex; i++) {
      const path = node.bip32Path('testnet', i);
      const derived = node.derivePath(path);
      const keyPair = derived.toKeyPair();
      keyPairs.push(keyPair);
    }
    // SDK
    const facade = new SymbolFacade('testnet');
    const bip32 = new Bip32();
    const bip32Node = bip32.fromMnemonic(TEST_MNEMONIC, '');
    const sdkKeyPairs: KeyPair[] = [];
    for (let i = 0; i < maxIndex; i++) {
      const bip32Path = facade.bip32Path(i);
      const childBip32Node = bip32Node.derivePath(bip32Path);
      const keypair = SymbolFacade.bip32NodeToKeyPair(childBip32Node);
      sdkKeyPairs.push(keypair);
    }
    // 比較
    for (let i = 0; i < maxIndex; i++) {
      expect(keyPairs[i].privateKey).toBe(sdkKeyPairs[i].privateKey.toString());
      expect(keyPairs[i].publicKey).toBe(sdkKeyPairs[i].publicKey.toString());
    }
  });
});
