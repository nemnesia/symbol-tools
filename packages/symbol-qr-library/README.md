# Symbol QR Library

Symbolブロックチェーン用のQRコードデータ(JSON)を生成・管理するためのTypeScriptライブラリです。

## 特徴

- 🔐 **セキュア**: パスワードベースの暗号化をサポート（Argon2id + AES-256-GCM）
- 📦 **モジュラー**: Core/SDK層に分離された柔軟なアーキテクチャ
- 🎯 **型安全**: TypeScriptによる完全な型定義
- ✅ **テスト済み**: 95%以上のコードカバレッジ
- 🔄 **互換性**: 公式symbol-sdk、nemnesia版symbol-sdkの両方に対応

## インストール

```bash
npm install @nemnesia/symbol-qr-library
```

### symbol-sdkのインストール

本ライブラリは `symbol-sdk` に依存していますが、公式版・nemnesia版のどちらでも利用可能です。

#### 公式 symbol-sdk

```bash
npm install symbol-sdk
```

#### nemnesia 版 symbol-sdk

```bash
npm install symbol-sdk@npm:@nemnesia/symbol-sdk
```

## 使い方

### Core層の使用（symbol-sdkなし）

```typescript
import { QRCodeType, SymbolQRLibCore } from '@nemnesia/symbol-qr-library/core';

const core = new SymbolQRLibCore(152, '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6');

// 連絡先QRコードの生成
const contactQR = core.createContactQRJson('Alice', 'A'.repeat(64));

// アカウントエクスポートQRコードの生成
const accountQR = core.createExportAccountJson('B'.repeat(64));

// 暗号化されたアカウントエクスポート
const encryptedQR = await core.createEncryptedExportAccountJson('B'.repeat(64), 'password123');

// 復号化
const decryptedQR = await SymbolQRLibCore.tryDecryptExportAccountJson(encryptedQR, 'password123');
```

### SDK層の使用（symbol-sdkと連携）

```typescript
import { SymbolQRLibSdk } from '@nemnesia/symbol-qr-library/sdk';
import { PrivateKey, PublicKey } from 'symbol-sdk';
import { Network } from 'symbol-sdk/symbol';

const network = new Network(
  'testnet',
  0x98,
  new Date('2021-03-16T00:06:25Z'),
  '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4'
);
const sdk = new SymbolQRLibSdk(network);

// 連絡先QRコード
const publicKey = new PublicKey('87DA603E7BE5656C45692D5FC7F6D0EF8F24BB7A5C10ED5FDA8C5CFBC49FCBC8');
const contactQR = sdk.createContactQRJson('Bob', publicKey);

// アカウントエクスポートQRコード
const privateKey = new PrivateKey('B4F12E7C9F6946091E2CB8B6D3A12B50D17CCBBF646386EA27CE2946A7423DCF');
const accountQR = sdk.createExportAccountQRJson(privateKey);

// トランザクションリクエストQRコード
const requestQR = sdk.createRequestTransactionQRJson(transaction);

// 署名済みトランザクションQRコード
const signedQR = sdk.createSignedTransactionQRJson(signedTransaction);
```

## サポートされるQRコードタイプ

| タイプ                           | 説明                         | 暗号化対応 |
| -------------------------------- | ---------------------------- | ---------- |
| AddContact (1)                   | 連絡先追加                   | ❌         |
| ExportAccount (2)                | アカウントエクスポート       | ✅         |
| RequestTransaction (3)           | トランザクション署名要求     | ❌         |
| RequestCosignature (4)           | 連署要求                     | ❌         |
| ExportMnemonic (5)               | ニーモニックエクスポート     | ✅         |
| ExportObject (6)                 | 任意オブジェクトエクスポート | ❌         |
| ExportAddress (7)                | アドレスエクスポート         | ❌         |
| SignedTransaction (8)            | 署名済みトランザクション     | ❌         |
| CosignatureSignedTransaction (9) | 連署済みトランザクション     | ❌         |

## API リファレンス

### SymbolQRLibCore

- `createContactQRJson(name, publicKey)` - 連絡先QRコード生成
- `createExportAccountJson(privateKey)` - アカウントエクスポートQRコード生成
- `createEncryptedExportAccountJson(privateKey, password)` - 暗号化アカウントエクスポート
- `tryDecryptExportAccountJson(json, password)` - アカウントエクスポート復号化
- `createRequestTransactionQRJson(payload)` - トランザクションリクエスト生成
- `createRequestCosignatureQRJson(payload)` - 連署要求生成
- `createExportMnemonicQRJson(mnemonic)` - ニーモニックエクスポート生成
- `createEncryptedExportMnemonicQRJson(mnemonic, password)` - 暗号化ニーモニックエクスポート
- `tryDecryptExportMnemonicJson(json, password)` - ニーモニックエクスポート復号化
- `createExportObjectQRJson(object)` - オブジェクトエクスポート生成
- `createExportAddressQRJson(name, address)` - アドレスエクスポート生成
- `createSignedTransactionQRJson(...)` - 署名済みトランザクション生成
- `createCosignatureSignedTransactionQRJson(...)` - 連署済みトランザクション生成

### SymbolQRLibSdk

Core層のメソッドに加え、symbol-sdk型（Transaction、PrivateKey、PublicKeyなど）を直接受け取るラッパーメソッドを提供します。

## 開発

```bash
# 依存関係のインストール
pnpm install

# ビルド
pnpm build

# テスト
pnpm test

# カバレッジ付きテスト
pnpm test:coverage

# リント
pnpm lint

# フォーマット
pnpm format
```

## ライセンス

MIT

## 作者

ccHarvestasya

## リポジトリ

https://github.com/nemnesia/symbol-tools/tree/main/packages/symbol-qr-library
