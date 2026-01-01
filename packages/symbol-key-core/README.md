# @nemnesia/symbol-key-core

Symbolブロックチェーン用の鍵管理・署名ライブラリ

## 特長

- **SymbolKeyPair**: Ed25519鍵ペア生成と署名・検証
- **SymbolBip32**: BIP32/BIP39準拠の階層的決定性ウォレット
- **SymbolNetwork**: Symbolトランザクションのハッシュ化と署名
- **SymbolUtils**: アドレス生成などのユーティリティ機能
- 9言語のBIP39ニーモニック対応（英語、日本語、中国語など）
- @noble/ed25519ベースの高速・安全な実装

## インストール

```sh
npm install @nemnesia/symbol-key-core
```

または

```sh
pnpm add @nemnesia/symbol-key-core
```

## 使い方

### 基本的な鍵ペアの生成と署名

```ts
import { PrivateKey } from '@nemnesia/symbol-catbuffer';
import { SymbolKeyPair } from '@nemnesia/symbol-key-core';

// 秘密鍵から鍵ペアを生成
const privateKey = PrivateKey.random();
const keyPair = new SymbolKeyPair(privateKey);

// メッセージに署名
const message = new Uint8Array([1, 2, 3, 4, 5]);
const signature = keyPair.sign(message);

console.log('公開鍵:', keyPair.publicKey.toString());
console.log('署名:', signature.toString());
```

### 署名の検証

```ts
import { SymbolVerifier } from '@nemnesia/symbol-key-core';

// 公開鍵から検証器を作成
const verifier = new SymbolVerifier(keyPair.publicKey);

// 署名を検証
const isValid = verifier.verify(message, signature);
console.log('署名は有効:', isValid);
```

### BIP39ニーモニックからの鍵導出

```ts
import { SymbolBip32 } from '@nemnesia/symbol-key-core';

// BIP32インスタンスを作成（日本語のニーモニックを使用）
const bip32 = new SymbolBip32('ed25519', 'japanese');

// ランダムなニーモニックを生成
const mnemonic = bip32.random();
console.log('ニーモニック:', mnemonic);

// ニーモニックからルートノードを生成
const rootNode = bip32.fromMnemonic(mnemonic, 'パスワード');

// BIP32パスで子鍵を導出
const childNode = rootNode.deriveChildNode("m/44'/4343'/0'/0'/0'");
const childKeyPair = childNode.keyPair();

console.log('子秘密鍵:', childKeyPair.privateKey.toString());
console.log('子公開鍵:', childKeyPair.publicKey.toString());
```

### Symbolトランザクションの署名

```ts
import { Network } from '@nemnesia/symbol-catbuffer/symbol';
import { SymbolNetwork } from '@nemnesia/symbol-key-core';

// Symbolネットワークを初期化（メインネット）
const network = new SymbolNetwork(Network.MAINNET);

// トランザクションペイロードに署名
const transaction = new Uint8Array([
  /* トランザクションデータ */
]);
const signedTx = network.signTransaction(keyPair, transaction);

console.log('署名済みトランザクション:', signedTx.toString());
```

### アドレス生成

```ts
import { Network } from '@nemnesia/symbol-catbuffer/symbol';
import { SymbolNetwork, SymbolUtils } from '@nemnesia/symbol-key-core';

const network = new SymbolNetwork(Network.MAINNET);
const address = network.publicKeyToAddress(keyPair.publicKey);

console.log('アドレス:', SymbolUtils.uint8ToAddress(address.bytes));
// 例: NALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLYEZDI
```

## サポートされるBIP39言語

- english (デフォルト)
- japanese
- korean
- simplifiedChinese
- french
- italian
- spanish
- czech
- portuguese

## API リファレンス

### SymbolKeyPair

```ts
class SymbolKeyPair {
  constructor(privateKey: PrivateKey);
  get privateKey(): PrivateKey;
  get publicKey(): PublicKey;
  sign(message: Uint8Array): Signature;
}
```

### SymbolVerifier

```ts
class SymbolVerifier {
  constructor(publicKey: PublicKey);
  verify(message: Uint8Array, signature: Signature): boolean;
}
```

### SymbolBip32

```ts
class SymbolBip32 {
  constructor(curveName?: string, mnemonicLanguage?: MnemonicLanguage);
  fromSeed(seed: Uint8Array): SymbolBip32Node;
  fromMnemonic(mnemonic: string, password?: string): SymbolBip32Node;
  random(seedLength?: number): string;
}
```

### SymbolBip32Node

```ts
class SymbolBip32Node {
  deriveChildNode(path: string): SymbolBip32Node;
  keyPair(): SymbolKeyPair;
}
```

### SymbolNetwork

```ts
class SymbolNetwork {
  constructor(networkType: Network);
  hashTransaction(transaction: Uint8Array): Hash256;
  signTransaction(keyPair: SymbolKeyPair, transaction: Uint8Array): Signature;
  publicKeyToAddress(publicKey: PublicKey): UnresolvedAddress;
}
```

## 依存関係

- [@nemnesia/symbol-catbuffer](https://www.npmjs.com/package/@nemnesia/symbol-catbuffer) - Symbolトランザクション型定義
- [@noble/ed25519](https://www.npmjs.com/package/@noble/ed25519) - Ed25519署名実装
- [@scure/bip39](https://www.npmjs.com/package/@scure/bip39) - BIP39ニーモニック実装
- [@noble/hashes](https://www.npmjs.com/package/@noble/hashes) - 暗号学的ハッシュ関数

## ライセンス

MIT
