# @nemnesia/symbol-sdk

[![npm version](https://img.shields.io/npm/v/@nemnesia/symbol-sdk?style=flat-square)](https://www.npmjs.com/package/@nemnesia/symbol-sdk)
[![license](https://img.shields.io/npm/l/@nemnesia/symbol-sdk?style=flat-square)](./LICENSE)

> Node.js・ブラウザ両対応 Symbol SDK（[symbol-sdk公式](https://github.com/symbol/symbol/tree/main/sdk) ベース、ES2020+対応）

---

## 概要

このパッケージは [symbol-sdk](https://github.com/symbol/symbol/tree/main/sdk) 公式リポジトリをベースに、Node.js だけでなくモダンブラウザ環境（ES2020以降）でも動作するよう再構成した TypeScript/JavaScript SDK です。

## インストール

```sh
# npm
npm install @nemnesia/symbol-sdk
# または pnpm
pnpm add @nemnesia/symbol-sdk
# または yarn
yarn add @nemnesia/symbol-sdk
```

## 使い方

```js
import { PrivateKey } from '@nemnesia/symbol-sdk';
import { SymbolFacade } from '@nemnesia/symbol-sdk/symbol';

// ランダムな秘密鍵生成
const privateKey = PrivateKey.random();

// 秘密鍵からアカウント生成
const facade = new SymbolFacade('testnet');
const account = facade.createAccount(privateKey);

console.log('privateKey:', account.keyPair.privateKey.toString());
console.log('publicKey :', account.publicKey.toString());
console.log('address   :', account.address.toString());
```

TypeScript でもそのまま利用できます。

## ライセンス

MIT License

## 参考リンク

- [symbol-sdk公式リポジトリ](https://github.com/symbol/symbol/tree/main/sdk)
- [symbol/catbuffer-parser](https://github.com/symbol/symbol/tree/main/catbuffer)
