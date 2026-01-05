# @nemnesia/symbol-sdk

[![npm version](https://img.shields.io/npm/v/@nemnesia/symbol-sdk?style=flat-square)](https://www.npmjs.com/package/@nemnesia/symbol-sdk)
[![license](https://img.shields.io/npm/l/@nemnesia/symbol-sdk?style=flat-square)](./LICENSE)

> Node.js・ブラウザ・React Native対応のSymbol公式SDK移植版（[symbol-sdk公式](https://github.com/symbol/symbol/tree/main/sdk) ベース、ES2020+対応）

---

## 概要

このパッケージは [symbol-sdk](https://github.com/symbol/symbol/tree/main/sdk) 公式リポジトリをベースに、Node.js だけでなくモダンブラウザ（ES2020以降）、さらに React Native でも動作するよう再構成した TypeScript/JavaScript SDK です。

### 主な変更点

- **暗号処理の依存先をNode.js組込から@noble系へ移行**
  - `crypto.randomBytes` → `@noble/hashes/utils.js` の `randomBytes`
  - `crypto.createHmac` → `@noble/hashes/hmac.js` の `hmac`
  - `ripemd160` → `@noble/hashes/legacy.js` の `ripemd160`
- **BIP32/BIP39**
  - `bitcore-mnemonic` → `@scure/bip39`
- **MessageEncoder**
  - `encode`/`tryDecode` など暗号化部分を非同期メソッド化
- **`Buffer`完全排除**

## インストール

Node.js、ブラウザ、React Native いずれの環境でも利用可能です。

```sh
# npm
npm install @nemnesia/symbol-sdk
# pnpm
pnpm add @nemnesia/symbol-sdk
# yarn
yarn add @nemnesia/symbol-sdk
```

## クイックスタート

```js
import { PrivateKey } from '@nemnesia/symbol-sdk';
import { SymbolFacade } from '@nemnesia/symbol-sdk/symbol';

// ランダムな秘密鍵生成
const privateKey = PrivateKey.random();

// アカウント生成
const facade = new SymbolFacade('testnet');
const account = facade.createAccount(privateKey);

console.log('privateKey:', account.keyPair.privateKey.toString());
console.log('publicKey :', account.publicKey.toString());
console.log('address   :', account.address.toString());
```

TypeScriptでもそのまま利用できます。

## 注意事項

- 公式symbol-sdkと一部APIや挙動が異なる場合があります。
- 暗号処理や依存パッケージの違いにより、完全な互換性は保証されません。

## ライセンス

MIT License

## 参考リンク

- [symbol-sdk公式リポジトリ](https://github.com/symbol/symbol/tree/main/sdk)
- [symbol/catbuffer-parser](https://github.com/symbol/symbol/tree/main/catbuffer)
