# simple-password-crypto

[![npm version](https://badge.fury.io/js/@nemnesia%2Fsimple-password-crypto.svg)](https://www.npmjs.com/package/@nemnesia/simple-password-crypto)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

パスワードベースで安全にデータを暗号化・復号するライブラリ

## ✨ 特徴

- 🔐 **現代的な暗号化**: Argon2id + AES-256-GCM
- 🎯 **シンプルなAPI**: encrypt/decrypt の2つの関数のみ
- 🛡️ **セキュリティ重視**: ベストプラクティスに従った実装
- 🌐 **マルチプラットフォーム対応**: Node.js、ブラウザ、React Nativeで動作
- 💻 **TPM不要**: ソフトウェアベースの暗号化
- ⚡ **依存関係が少ない**: @noble/ciphers と @noble/hashes のみ

## 📥 インストール

```bash
npm install @nemnesia/simple-password-crypto
```

または

```bash
pnpm add @nemnesia/simple-password-crypto
```

```bash
yarn add @nemnesia/simple-password-crypto
```

## 🚀 使い方

```typescript
import { decrypt, encrypt } from '@nemnesia/simple-password-crypto';

// データを暗号化
const plaintext = new Uint8Array([
  /* ... */
]); // またはBuffer.from('秘密のデータ')
const password = 'my-strong-password';

const encrypted = await encrypt(plaintext, password);
console.log(encrypted);
// {
//   version: 1,
//   kdf: 'argon2id',
//   kdfParams: { memoryCost: 65536, timeCost: 3, parallelism: 1 },
//   cipher: 'aes-256-gcm',
//   salt: '...',
//   nonce: '...',
//   ciphertext: '...',
//   tag: '...'
// }

// データを復号
const decrypted = await decrypt(encrypted, password);
console.log(new TextDecoder().decode(decrypted)); // '秘密のデータ'

// JSONで保存可能
const json = JSON.stringify(encrypted);
const restored = JSON.parse(json);
const decrypted2 = await decrypt(restored, password);
```

## 🔐 暗号方式

### KDF (Key Derivation Function)

- **Argon2id**: メモリハード関数、サイドチャネル攻撃に強い
  - Memory: 64MB (65536 KB)
  - Time: 3回
  - Parallelism: 1
  - 実装: `@noble/hashes/argon2`（全環境で純粋JS実装を使用）

### Cipher

- **AES-256-GCM**: 認証付き暗号、改ざん検出機能付き
  - Key: 256-bit
  - Nonce: 96-bit (毎回ランダム生成)
  - Tag: 128-bit
  - 実装: `@noble/ciphers`（全環境共通）

## 🗂️ データフォーマット

```typescript
interface EncryptedData {
  version: 1; // フォーマットバージョン
  kdf: 'argon2id'; // KDF種類
  kdfParams: {
    // KDFパラメータ
    memoryCost: number;
    timeCost: number;
    parallelism: number;
  };
  cipher: 'aes-256-gcm'; // 暗号アルゴリズム
  salt: string; // Base64エンコード
  nonce: string; // Base64エンコード
  ciphertext: string; // Base64エンコード
  tag: string; // Base64エンコード
}
```

## 🎯 用途

- ウォレット秘密鍵の保護
- ユーザープロファイルの暗号化
- パスワード管理
- セキュアなローカルストレージ

## 🚨 セキュリティ保証

✅ Nonce再利用の防止（毎回ランダム生成）  
✅ 認証付き暗号（改ざん検出）  
✅ タイミング攻撃対策（エラーメッセージの統一）  
✅ 適切なパラメータ設定（Memory: 64MB、Time: 3回、Parallelism: 1）

## ❌ セキュリティ保証外

- 物理的攻撃（メモリダンプ、コールドブート攻撃）
- TPM/HSMレベルのハードウェアセキュリティ
- 弱いパスワードの保護

## 📊 パフォーマンス

### 全環境（@noble/hashes）

| 操作   | 時間 (目安) |
| ------ | ----------- |
| 暗号化 | ~2-3秒      |
| 復号   | ~2-3秒      |

⚠️ **パフォーマンスに関する注意**:  
このライブラリは純粋JavaScriptで実装された`@noble/hashes`を使用します。Argon2idのメモリハード特性により、処理に数秒かかります。これはブルートフォース攻撃対策として意図的な設計です。

💡 **推奨**:

- UIブロックを避けるため、暗号化/復号処理中はローディング表示を実装
- ブラウザ: Web Workerでの実行を検討
- React Native: バックグラウンドスレッドでの実行を検討

## 🧪 テスト

```bash
pnpm test              # テスト実行
pnpm test:coverage     # カバレッジ
pnpm test:watch        # ウォッチモード
```

## 📝 ライセンス

MIT

## 🔗 関連

- [Symbol Desktop Wallet](https://symbolplatform.com/wallets)
- [Argon2](https://github.com/P-H-C/phc-winner-argon2)
- [AES-GCM](https://tools.ietf.org/html/rfc5288)
