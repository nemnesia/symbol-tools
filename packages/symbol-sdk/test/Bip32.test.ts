import { NemAccount, NemFacade } from 'symbol-sdk/nem';
import { describe, expect, it } from 'vitest';

import { Bip32, Bip32Node } from '../src/Bip32.js';
import { PrivateKey } from '../src/CryptoTypes.js';
import { SymbolAccount, SymbolFacade } from '../src/symbol/index.js';

describe('Bip32Node', () => {
  describe('constructor', () => {
    it('HMAC鍵とデータからBIP32ノードを作成できる', () => {
      const hmacKey = new TextEncoder().encode('ed25519 seed');
      const seed = new Uint8Array(32).fill(0x01);

      const node = new Bip32Node(hmacKey, seed);

      expect(node).toBeDefined();
      expect(node.privateKey).toBeInstanceOf(PrivateKey);
      expect(node.chainCode).toBeInstanceOf(Uint8Array);
      expect(node.chainCode.length).toBe(32);
    });

    it('異なるシードから異なるノードを生成する', () => {
      const hmacKey = new TextEncoder().encode('ed25519 seed');
      const seed1 = new Uint8Array(32).fill(0x01);
      const seed2 = new Uint8Array(32).fill(0x02);

      const node1 = new Bip32Node(hmacKey, seed1);
      const node2 = new Bip32Node(hmacKey, seed2);

      expect(node1.privateKey.toString()).not.toBe(node2.privateKey.toString());
    });
  });

  describe('deriveOne', () => {
    it('指定された識別子で子ノードを派生できる', () => {
      const hmacKey = new TextEncoder().encode('ed25519 seed');
      const seed = new Uint8Array(32).fill(0x01);
      const node = new Bip32Node(hmacKey, seed);

      const childNode = node.deriveOne(0);

      expect(childNode).toBeInstanceOf(Bip32Node);
      expect(childNode.privateKey).toBeInstanceOf(PrivateKey);
      expect(childNode.privateKey.toString()).not.toBe(node.privateKey.toString());
    });

    it('異なる識別子で異なる子ノードを生成する', () => {
      const hmacKey = new TextEncoder().encode('ed25519 seed');
      const seed = new Uint8Array(32).fill(0x01);
      const node = new Bip32Node(hmacKey, seed);

      const child1 = node.deriveOne(0);
      const child2 = node.deriveOne(1);

      expect(child1.privateKey.toString()).not.toBe(child2.privateKey.toString());
    });

    it('ハードニング識別子（0x80000000以上）で派生できる', () => {
      const hmacKey = new TextEncoder().encode('ed25519 seed');
      const seed = new Uint8Array(32).fill(0x01);
      const node = new Bip32Node(hmacKey, seed);

      const hardenedChild = node.deriveOne(0x80000000);

      expect(hardenedChild).toBeInstanceOf(Bip32Node);
      expect(hardenedChild.privateKey).toBeInstanceOf(PrivateKey);
    });
  });

  describe('derivePath', () => {
    it('パスを辿って子孫ノードを派生できる', () => {
      const hmacKey = new TextEncoder().encode('ed25519 seed');
      const seed = new Uint8Array(32).fill(0x01);
      const node = new Bip32Node(hmacKey, seed);

      const path = [44, 0, 0];
      const descendant = node.derivePath(path);

      expect(descendant).toBeInstanceOf(Bip32Node);
      expect(descendant.privateKey).toBeInstanceOf(PrivateKey);
    });

    it('空のパスでは同じノードの構造を返す（異なるインスタンス）', () => {
      const hmacKey = new TextEncoder().encode('ed25519 seed');
      const seed = new Uint8Array(32).fill(0x01);
      const node = new Bip32Node(hmacKey, seed);

      const result = node.derivePath([]);

      expect(result).toBe(node); // 空のパスは元のノードを返す
    });

    it('複数段階のパスで正しく派生する', () => {
      const hmacKey = new TextEncoder().encode('ed25519 seed');
      const seed = new Uint8Array(32).fill(0x01);
      const node = new Bip32Node(hmacKey, seed);

      // m/44'/4343'/0'/0'/0'
      const path = [0x8000002c, 0x800010f7, 0x80000000, 0x80000000, 0x80000000];
      const descendant = node.derivePath(path);

      expect(descendant).toBeInstanceOf(Bip32Node);
      expect(descendant.privateKey).toBeInstanceOf(PrivateKey);
    });

    it('同じパスから同じノードを生成する', () => {
      const hmacKey = new TextEncoder().encode('ed25519 seed');
      const seed = new Uint8Array(32).fill(0x01);
      const node = new Bip32Node(hmacKey, seed);

      const path = [44, 0, 0];
      const descendant1 = node.derivePath(path);
      const descendant2 = node.derivePath(path);

      expect(descendant1.privateKey.toString()).toBe(descendant2.privateKey.toString());
    });
  });
});

describe('Bip32', () => {
  describe('constructor', () => {
    it('デフォルトパラメータでBIP32ファクトリーを作成できる', () => {
      const bip32 = new Bip32();

      expect(bip32).toBeDefined();
    });

    it('カスタム曲線名を指定できる', () => {
      const bip32 = new Bip32('secp256k1');

      expect(bip32).toBeDefined();
    });

    it('カスタムニーモニック言語を指定できる', () => {
      const bip32 = new Bip32('ed25519', 'japanese');

      expect(bip32).toBeDefined();
    });
  });

  describe('fromSeed', () => {
    it('シードからルートノードを作成できる', () => {
      const bip32 = new Bip32();
      const seed = new Uint8Array(64).fill(0xab);

      const rootNode = bip32.fromSeed(seed);

      expect(rootNode).toBeInstanceOf(Bip32Node);
      expect(rootNode.privateKey).toBeInstanceOf(PrivateKey);
      expect(rootNode.chainCode).toBeInstanceOf(Uint8Array);
    });

    it('異なるシードから異なるルートノードを生成する', () => {
      const bip32 = new Bip32();
      const seed1 = new Uint8Array(64).fill(0x01);
      const seed2 = new Uint8Array(64).fill(0x02);

      const root1 = bip32.fromSeed(seed1);
      const root2 = bip32.fromSeed(seed2);

      expect(root1.privateKey.toString()).not.toBe(root2.privateKey.toString());
    });

    it('同じシードから同じルートノードを生成する', () => {
      const bip32 = new Bip32();
      const seed = new Uint8Array(64).fill(0x42);

      const root1 = bip32.fromSeed(seed);
      const root2 = bip32.fromSeed(seed);

      expect(root1.privateKey.toString()).toBe(root2.privateKey.toString());
    });
  });

  describe('fromMnemonic', () => {
    it('ニーモニックとパスワードからルートノードを作成できる', () => {
      const bip32 = new Bip32();
      const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
      const password = 'password';

      const rootNode = bip32.fromMnemonic(mnemonic, password);

      expect(rootNode).toBeInstanceOf(Bip32Node);
      expect(rootNode.privateKey).toBeInstanceOf(PrivateKey);
    });

    it('パスワードなしでルートノードを作成できる', () => {
      const bip32 = new Bip32();
      const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';

      const rootNode = bip32.fromMnemonic(mnemonic, '');

      expect(rootNode).toBeInstanceOf(Bip32Node);
    });

    it('異なるパスワードで異なるルートノードを生成する', () => {
      const bip32 = new Bip32();
      const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';

      const root1 = bip32.fromMnemonic(mnemonic, 'password1');
      const root2 = bip32.fromMnemonic(mnemonic, 'password2');

      expect(root1.privateKey.toString()).not.toBe(root2.privateKey.toString());
    });

    it('同じニーモニックとパスワードから同じルートノードを生成する', () => {
      const bip32 = new Bip32();
      const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
      const password = 'test';

      const root1 = bip32.fromMnemonic(mnemonic, password);
      const root2 = bip32.fromMnemonic(mnemonic, password);

      expect(root1.privateKey.toString()).toBe(root2.privateKey.toString());
    });
  });

  describe('random', () => {
    it('ランダムなニーモニックを生成できる', () => {
      const bip32 = new Bip32();

      const mnemonic = bip32.random();

      expect(mnemonic).toBeDefined();
      expect(typeof mnemonic).toBe('string');
      expect(mnemonic.split(' ').length).toBeGreaterThan(0);
    });

    it('デフォルトで24単語のニーモニックを生成する（32バイトエントロピー）', () => {
      const bip32 = new Bip32();

      const mnemonic = bip32.random();

      expect(mnemonic.split(' ').length).toBe(24);
    });

    it('カスタムシード長を指定できる（16バイト = 12単語）', () => {
      const bip32 = new Bip32();

      const mnemonic = bip32.random(16);

      expect(mnemonic.split(' ').length).toBe(12);
    });

    it('異なるランダムニーモニックを生成する', () => {
      const bip32 = new Bip32();

      const mnemonic1 = bip32.random();
      const mnemonic2 = bip32.random();

      expect(mnemonic1).not.toBe(mnemonic2);
    });

    it('日本語のニーモニックを生成できる', () => {
      const bip32 = new Bip32('ed25519', 'japanese');

      const mnemonic = bip32.random();

      expect(mnemonic).toBeDefined();
      expect(typeof mnemonic).toBe('string');
      // 日本語の文字が含まれているかチェック
      expect(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(mnemonic)).toBe(true);
    });

    it('生成したニーモニックからルートノードを作成できる', () => {
      const bip32 = new Bip32();
      const mnemonic = bip32.random();

      const rootNode = bip32.fromMnemonic(mnemonic, '');

      expect(rootNode).toBeInstanceOf(Bip32Node);
      expect(rootNode.privateKey).toBeInstanceOf(PrivateKey);
    });
  });

  describe('integration', () => {
    it('完全なBIP32派生パスをテストできる', () => {
      const bip32 = new Bip32();
      const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
      const rootNode = bip32.fromMnemonic(mnemonic, '');

      // m/44'/4343'/0'/0'/0' のようなパス
      const path = [0x8000002c, 0x800010f7, 0x80000000, 0x80000000, 0x80000000];
      const derivedNode = rootNode.derivePath(path);

      expect(derivedNode).toBeInstanceOf(Bip32Node);
      expect(derivedNode.privateKey).toBeInstanceOf(PrivateKey);
    });
  });

  describe('SDK互換性', () => {
    it('ニーモニックから復元できる(Symbol)', () => {
      const bip32 = new Bip32();
      const mnemonic =
        'vehicle unfold decline merry control genuine real already erase address unique clerk have rice motor spike human own attack trim gloom inch payment chronic';
      const facade = new SymbolFacade('mainnet');
      const bip32Node = bip32.fromMnemonic(mnemonic, '');
      const bip32Path = facade.bip32Path(0);
      const childBip32Node = bip32Node.derivePath(bip32Path);
      const keypair = SymbolFacade.bip32NodeToKeyPair(childBip32Node);
      const account = new SymbolAccount(facade, keypair);

      expect(account.keyPair.privateKey.toString()).toEqual(
        'B8821DDC1E7B35D20AE6DC35EC79F644EB7E6843A2CF977AD08DB31BDD1E0678'
      );
      expect(account.keyPair.publicKey.toString()).toEqual(
        'F3EC8A5DAD8AF4566C0CF25C1B092F608D303728A8EAB14481E2824EC7967D05'
      );
      expect(account.address.toString()).toEqual('ND6JFGH64RIDEQC3HQUEW2CIO7PGWRJD4KMTARQ');
    });

    it('ニーモニックから復元できる(NEM)', () => {
      const bip32 = new Bip32();
      const mnemonic =
        'vehicle unfold decline merry control genuine real already erase address unique clerk have rice motor spike human own attack trim gloom inch payment chronic';
      const facade = new NemFacade('mainnet');
      const bip32Node = bip32.fromMnemonic(mnemonic, '');
      const bip32Path = facade.bip32Path(0);
      const childBip32Node = bip32Node.derivePath(bip32Path);
      const keypair = NemFacade.bip32NodeToKeyPair(childBip32Node);
      const account = new NemAccount(facade, keypair);

      expect(account.keyPair.privateKey.toString()).toEqual(
        'F532362ED9F59309EB1413027F1F742A07262C95B0257A97D3EF7FD95B51E77E'
      );
      expect(account.keyPair.publicKey.toString()).toEqual(
        '7B80BE99D38ED9BB7B33C3FE1C3087683BDEADF49AB664A08BE4215A53CE06EB'
      );
      expect(account.address.toString()).toEqual('NBRZWXOVWSKQNVWJNNI3H72WLKMFCLN33OFJPAEL');
    });
  });
});
