# Symbol Tools

Symbol ブロックチェーンのための TypeScript/JavaScript ツールとライブラリのコレクションです。

## パッケージ

このモノレポには以下のパッケージが含まれています:


### Packages

- **[symbol-sdk](./packages/symbol-sdk)**  
  Node.js/ブラウザ両対応のSymbol公式SDK移植版。

- **[simple-password-crypto](./packages/simple-password-crypto)**  
  Argon2id + AES-256-GCMによるパスワード暗号化ライブラリ。

- **[symbol-openapi-typescript-fetch-client](./packages/symbol-openapi-typescript-fetch-client)**  
  Symbol REST APIのTypeScriptクライアント（OpenAPI自動生成）。

- **[symbol-websocket](./packages/symbol-websocket)**  
  SymbolブロックチェーンのWebSocketリアルタイム監視ライブラリ。

- **[symbol-announcer](./packages/symbol-announcer)**  
  Symbolトランザクションのアナウンス＆WebSocket監視ツール。

- **[nem-symbol-node-picker](./packages/nem-symbol-node-picker)**  
  NodeWatch APIからNEM/Symbolノードをランダム取得するユーティリティ。

- **[nem-websocket](./packages/nem-websocket)**  
  NEMブロックチェーンのWebSocketリアルタイム監視ライブラリ。

- **[nodewatch-openapi-provider](./packages/nodewatch-openapi-provider)**  
  Symbol/NEMノードのフェイルオーバー対応NodeWatchサービスクライアント。

- **[nodewatch-openapi-typescript-fetch-client](./packages/nodewatch-openapi-typescript-fetch-client)**  
  NodeWatch REST APIのTypeScriptクライアント（OpenAPI自動生成）。

- **[symbol-finalization-proof-viewer](./apps/symbol-finalization-proof-viewer)**  
  ノードのVoting Key有効期限・投票状況を可視化するWebアプリ。

## 前提条件

- Node.js 20.19.6 以上 (Volta で管理)
- pnpm 10.26.2

## セットアップ

```bash
# 依存関係のインストール
pnpm install
```

## 開発

このプロジェクトは pnpm ワークスペースを使用したモノレポ構成になっています。

### 利用可能なコマンド

```bash
# ビルド
pnpm build              # すべてのパッケージをビルド

# テスト
pnpm test               # すべてのパッケージのテストを実行
pnpm test:ui            # テストUIで実行
pnpm test:coverage      # カバレッジ付きでテストを実行

# コード品質
pnpm lint               # ESLintでコードをチェック
pnpm lint:fix           # ESLintで自動修正
pnpm format             # Prettierでフォーマット
pnpm format:check       # フォーマットをチェックのみ
pnpm typecheck          # TypeScript型チェック

# 開発
pnpm dev                # すべてのパッケージを開発モードで起動

# クリーンアップ
pnpm clean              # ビルド成果物とnode_modulesを削除
```

### コード品質ツール

- **ESLint** - コードの静的解析
- **Prettier** - コードフォーマット
- **TypeScript** - 型チェック
- **Vitest** - テストフレームワーク

### 個別パッケージの操作

各パッケージの詳細については、それぞれのパッケージディレクトリ内の README.md を参照してください。

## ライセンス

各パッケージのライセンスについては、それぞれのパッケージディレクトリ内の LICENSE ファイルを参照してください。

## 貢献

貢献を歓迎します。プルリクエストを送信する前に、コードスタイルガイドラインに従っていることを確認してください。
