# @nemnesia/symbol-keyring

Symbolブロックチェーン用のed25519鍵生成・署名ライブラリ

## 特長

- Ed25519鍵ペア生成
- BIP39ニーモニック対応
- メッセージ署名
- シンプルなAPI設計

## インストール

```sh
npm install @nemnesia/symbol-keyring
```

または

```sh
pnpm add @nemnesia/symbol-keyring
```

## 使い方

```ts
import { Keyring, generateMnemonic } from '@nemnesia/symbol-keyring';

const mnemonic = generateMnemonic();
const keyring = Keyring.fromMnemonic(mnemonic);
const signature = keyring.sign(new Uint8Array([1, 2, 3]));
console.log(keyring.publicKey);
```

## ライセンス

MIT
