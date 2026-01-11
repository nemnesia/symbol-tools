# NEM Balancer

NEMブロックチェーンのアカウント残高を自動で均等化するツールです。

## 概要

このツールは、複数のNEMアカウント間でXEM残高を自動的に均等化します。ハーベスティングノードの効率的な運用や、複数アカウントの残高管理を簡素化するために設計されています。

## 特徴

- 🔄 **自動残高均等化**: 複数アカウントの残高を自動的に均等化
- 📊 **残高監視**: リアルタイムでアカウント残高を監視
- ⚡ **効率的な転送**: 必要最小限のトランザクションで残高を調整
- 🔐 **セキュア**: ローカル環境での秘密鍵管理
- 📝 **詳細なログ**: 処理状況を詳細に記録

## インストール

```bash
# 依存関係のインストール
pnpm install
```

## 使い方

### 設定ファイルの準備

1. `config.example.json` をコピーして `config.json` を作成します：

```bash
cp config.example.json config.json
```

2. `config.json` を編集して、管理したいアカウントの秘密鍵を設定します：

```json
{
  "network": "mainnet",
  "accounts": [
    {
      "privateKey": "YOUR_PRIVATE_KEY_1"
    },
    {
      "privateKey": "YOUR_PRIVATE_KEY_2"
    }
  ],
  "balanceThreshold": 1000000,
  "checkInterval": 300000
}
```

### 実行

```bash
# 開発モードで起動
pnpm dev

# ビルドして実行
pnpm build
pnpm start
```

## 設定項目

| 項目               | 説明                                           | デフォルト値      |
| ------------------ | ---------------------------------------------- | ----------------- |
| `network`          | ネットワーク種別（`mainnet` または `testnet`） | `mainnet`         |
| `accounts`         | 管理対象のアカウント一覧（秘密鍵）             | -                 |
| `balanceThreshold` | 残高差の閾値（μXEM単位）                       | `1000000` (1 XEM) |
| `checkInterval`    | 残高チェック間隔（ミリ秒）                     | `300000` (5分)    |

## 動作仕様

1. **残高チェック**: 設定された間隔で全アカウントの残高を確認
2. **均等化判定**: 最大残高と最小残高の差が閾値を超えた場合に均等化を実行
3. **トランザクション生成**: 残高が多いアカウントから少ないアカウントへ転送
4. **アナウンス**: 生成したトランザクションをネットワークにアナウンス
5. **確認待機**: トランザクションの承認を待機

## 注意事項

⚠️ **セキュリティ上の注意**

- `config.json` には秘密鍵が含まれるため、**絶対にGitリポジトリにコミットしないでください**
- 本番環境では環境変数やシークレット管理サービスの利用を推奨します
- 秘密鍵は必ず安全に管理してください

⚠️ **運用上の注意**

- 転送には手数料（fee）が発生します
- ネットワークの混雑状況によってトランザクション承認に時間がかかる場合があります
- 残高が手数料を下回る場合、転送は実行されません

## 開発

```bash
# 型チェック
pnpm type-check

# リント
pnpm lint

# フォーマット
pnpm format

# テスト
pnpm test
```

## 依存パッケージ

- [`@nemnesia/symbol-sdk`](../../packages/symbol-sdk) - NEM/Symbol SDK
- [`@nemnesia/nem-symbol-node-picker`](../../packages/nem-symbol-node-picker) - ノード選択ライブラリ
- [`@nemnesia/symbol-announcer`](../../packages/symbol-announcer) - トランザクションアナウンス

## ライセンス

このパッケージのライセンスについては、[LICENSE](../../LICENSE)ファイルを参照してください。

## 関連リンク

- [NEM Documentation](https://docs.nem.io/)
- [Symbol Tools Repository](https://github.com/nemnesia/symbol-tools)
