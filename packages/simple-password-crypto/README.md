# simple-password-crypto

[![npm version](https://img.shields.io/npm/v/@nemnesia/simple-password-crypto.svg)](https://www.npmjs.com/package/@nemnesia/simple-password-crypto)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

パスワードベースで安全にデータを暗号化・復号するライブラリ（Node.js/ブラウザ/React Native対応）

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

または

```bash
yarn add @nemnesia/simple-password-crypto
```

## 🚀 使い方

### TypeScript/JavaScript での例

```typescript
import { decrypt, encrypt } from '@nemnesia/simple-password-crypto';

const plaintext = Buffer.from('秘密のデータ');
const password = '強力なパスワード';

const encrypted = await encrypt(plaintext, password);
// encrypted: { salt: string, ciphertext: string }

const decrypted = await decrypt(encrypted, password);
console.log(new TextDecoder().decode(decrypted)); // '秘密のデータ'
```

### JSON ストレージの例

```typescript
const json = JSON.stringify(encrypted);
const restored = JSON.parse(json);
const decrypted2 = await decrypt(restored, password);
```

### ブラウザでの例

```js
import { decrypt, encrypt } from '@nemnesia/simple-password-crypto';

// ...同様に利用可能
```

---

## 🛠️ API リファレンス

### `async encrypt(plaintext: Uint8Array, password: string): Promise<EncryptedData>`

- `plaintext`: 暗号化するデータ（Uint8Array、Buffer、文字列は TextEncoder で変換）
- `password`: パスワード文字列
- 戻り値: `{ salt: string, ciphertext: string }`（Base64 エンコード）

### `async decrypt(data: EncryptedData, password: string): Promise<Uint8Array>`

- `data`: 暗号化データオブジェクト
- `password`: パスワード文字列
- 戻り値: 復号された Uint8Array
- パスワードやデータが不正な場合はエラーを throw

#### `EncryptedData` 型

```typescript
interface EncryptedData {
  salt: string; // Base64（16 バイト）
  ciphertext: string; // Base64（ノンス[12] + タグ[16] + 暗号文）
}
```

## 🔐 暗号方式

### 鍵導出関数（KDF）

- **Argon2id**: メモリハード関数、サイドチャネル攻撃に強い
  - メモリ: 64MB（65536 KB）
  - 繰り返し回数: 3回
  - 並列度: 1
  - 実装: `@noble/hashes/argon2`（全環境で純粋 JS 実装を使用）

### 暗号アルゴリズム

- **AES-256-GCM**: 認証付き暗号、改ざん検出機能付き
  - 鍵長: 256 ビット
  - ノンス: 96 ビット（毎回ランダム生成）
  - タグ: 128 ビット
  - 実装: `@noble/ciphers`（全環境共通）

## 🗂️ データフォーマット詳細

- `salt`: Argon2id 用ソルト（毎回ランダム生成、16 バイト、Base64）
- `ciphertext`: AES-GCM のノンス（12 バイト）+ タグ（16 バイト）+ 暗号文の連結（Base64）

## 🎯 用途

- ウォレット秘密鍵の保護
- ユーザープロファイルの暗号化
- パスワード管理
- セキュアなローカルストレージ

## 🚨 セキュリティ保証

✅ ノンス再利用の防止（毎回ランダム生成）  
✅ 認証付き暗号（改ざん検出）  
✅ タイミング攻撃対策（エラーメッセージの統一）  
✅ 適切なパラメータ設定（メモリ: 64MB、繰り返し: 3回、並列度: 1）

## ❌ セキュリティ保証の対象外

- 物理的攻撃（メモリダンプ、コールドブート攻撃）
- TPM/HSM レベルのハードウェアセキュリティ
- 弱いパスワードに対する保護

## 📊 パフォーマンス

### 全環境（@noble/hashes）

| 操作   | 処理時間（目安） |
| ------ | ---------------- |
| 暗号化 | 約 2〜3 秒       |
| 復号   | 約 2〜3 秒       |

⚠️ **パフォーマンスに関する注意**:  
このライブラリは純粋 JavaScript で実装された `@noble/hashes` を使用します。Argon2id のメモリハード特性により、処理に数秒かかります。これはブルートフォース攻撃対策として意図的な設計です。

💡 **推奨事項**:

- UI ブロックを避けるため、暗号化・復号処理中はローディング表示を実装してください
- ブラウザ: Web Worker での実行を検討してください
- React Native: バックグラウンドスレッドでの実行を検討してください

## 🧪 テスト

```bash
pnpm test              # テスト実行
pnpm test:coverage     # カバレッジ
pnpm test:watch        # ウォッチモード
```

## 📝 ライセンス

MIT

## 🔗 関連リンク

- [Argon2](https://github.com/P-H-C/phc-winner-argon2)
- [AES-GCM](https://tools.ietf.org/html/rfc5288)
