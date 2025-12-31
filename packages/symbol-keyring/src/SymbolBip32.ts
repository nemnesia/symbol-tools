import { hmac } from '@noble/hashes/hmac.js';
import { sha512 } from '@noble/hashes/sha2.js';
import { generateMnemonic, mnemonicToSeedSync } from '@scure/bip39';
import { wordlist as czech } from '@scure/bip39/wordlists/czech.js';
import { wordlist as english } from '@scure/bip39/wordlists/english.js';
import { wordlist as french } from '@scure/bip39/wordlists/french.js';
import { wordlist as italian } from '@scure/bip39/wordlists/italian.js';
import { wordlist as japanese } from '@scure/bip39/wordlists/japanese.js';
import { wordlist as korean } from '@scure/bip39/wordlists/korean.js';
import { wordlist as portuguese } from '@scure/bip39/wordlists/portuguese.js';
import { wordlist as simplifiedChinese } from '@scure/bip39/wordlists/simplified-chinese.js';
import { wordlist as spanish } from '@scure/bip39/wordlists/spanish.js';

import { SymbolKeyPair } from './SymbolKeyPair.js';
import { SymbolUtils } from './SymbolUtils.js';

/**
 * 秘密鍵サイズ（バイト数）
 */
const PRIVATE_KEY_SIZE = 32;

/**
 * 利用可能な単語リスト
 */
const WORDLISTS: Record<string, string[]> = {
  czech,
  english,
  french,
  italian,
  japanese,
  korean,
  portuguese,
  simplifiedChinese,
  spanish,
};
type MnemonicLanguage = keyof typeof WORDLISTS;

/**
 * SymbolBip32クラス
 */
export class SymbolBip32 {
  /** ルートHMACキー */
  private _rootHmacKey: Uint8Array;
  /** ニーモニック言語 */
  private _mnemonicLanguage: MnemonicLanguage;

  /**
   * コンストラクタ
   *
   * @param {string} curveName 曲線名 [デフォルト: ed25519]
   * @param {MnemonicLanguage} mnemonicLanguage ニーモニック言語 [デフォルト: english]
   */
  constructor(
    curveName: string = 'ed25519',
    mnemonicLanguage: MnemonicLanguage = 'english'
  ) {
    this._rootHmacKey = new TextEncoder().encode(`${curveName} seed`);
    this._mnemonicLanguage = mnemonicLanguage;
  }

  /**
   * 指定されたシードからSymbolBip32Nodeを生成
   *
   * @param {Uint8Array} seed シード
   * @returns {SymbolBip32Node} SymbolBip32Node
   */
  fromSeed(seed: Uint8Array): SymbolBip32Node {
    return new SymbolBip32Node(this._rootHmacKey, seed);
  }

  /**
   * 指定されたニーモニックとパスワードからSymbolBip32Nodeを生成
   *
   * @param {string} mnemonic ニーモニック
   * @param {string} password パスワード [デフォルト: '']
   * @returns {SymbolBip32Node} SymbolBip32Node
   */
  fromMnemonic(mnemonic: string, password: string = ''): SymbolBip32Node {
    const seed = mnemonicToSeedSync(mnemonic, password);
    return this.fromSeed(seed);
  }

  /**
   * ランダムなニーモニックを生成
   *
   * @param {number} seedLength シード長（バイト数） [デフォルト: 32]
   * @returns {string} ニーモニック
   */
  random(seedLength: number = 32): string {
    const wordlist = WORDLISTS[this._mnemonicLanguage] || english;
    return generateMnemonic(wordlist, seedLength * 8);
  }
}

/**
 * SymbolBip32Nodeクラス
 */
export class SymbolBip32Node {
  /** 秘密鍵 */
  private _privateKey: Uint8Array;
  /** チェーンコード */
  private _chainCode: Uint8Array;

  /**
   * コンストラクタ
   *
   * @param {Uint8Array} hmacKey HMACキー
   * @param {Uint8Array} data データ
   */
  constructor(hmacKey: Uint8Array, data: Uint8Array) {
    const I = hmac(sha512, hmacKey, data);
    this._privateKey = I.slice(0, PRIVATE_KEY_SIZE);
    this._chainCode = I.slice(PRIVATE_KEY_SIZE);
  }

  /**
   * BIP32パスを取得
   *
   * @param {string} networkName ネットワーク名
   * @param {number} index インデックス
   * @returns {number[]} BIP32パス
   */
  bip32Path(networkName: string, index: number): number[] {
    return [44, networkName === 'mainnet' ? 4343 : 1, index, 0, 0];
  }

  /**
   * 指定された識別子で子ノードを派生
   *
   * @param {number} identifier 識別子
   * @returns {SymbolBip32Node} 子ノード
   */
  deriveOne(identifier: number): SymbolBip32Node {
    const hardenedIdx = 0x80000000 | identifier;
    const data = new Uint8Array(1 + PRIVATE_KEY_SIZE + 4);
    data[0] = 0;
    data.set(this._privateKey, 1);
    data[1 + PRIVATE_KEY_SIZE] = (hardenedIdx >>> 24) & 0xff;
    data[1 + PRIVATE_KEY_SIZE + 1] = (hardenedIdx >>> 16) & 0xff;
    data[1 + PRIVATE_KEY_SIZE + 2] = (hardenedIdx >>> 8) & 0xff;
    data[1 + PRIVATE_KEY_SIZE + 3] = hardenedIdx & 0xff;
    return new SymbolBip32Node(this._chainCode, data);
  }

  /**
   * 指定されたパスで子ノードを派生
   *
   * @param {Array<number>} path BIP32パス
   * @returns {SymbolBip32Node} 子ノード
   */
  derivePath(path: Array<number>): SymbolBip32Node {
    let node: SymbolBip32Node = this;
    for (const identifier of path) {
      node = node.deriveOne(identifier);
    }
    return node;
  }

  /**
   * キーペアに変換
   *
   * @returns {SymbolKeyPair} SymbolKeyPairキーペア
   */
  toKeyPair(): SymbolKeyPair {
    return new SymbolKeyPair(
      SymbolUtils.uint8ToHex(this._privateKey).toUpperCase()
    );
  }
}
