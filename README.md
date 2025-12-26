# Symbol Tools

Symbol ブロックチェーンのための TypeScript/JavaScript ツールとライブラリのコレクションです。

## パッケージ

このモノレポには以下のパッケージが含まれています:

### Packages

- **[symbol-openapi-typescript-fetch-client](./packages/symbol-openapi-typescript-fetch-client)**  
  Symbol REST API の TypeScript クライアント。OpenAPI仕様から自動生成。  
  npm: `@nemnesia/symbol-openapi-fetch-client`

- **[nodewatch-openapi-typescript-fetch-client](./packages/nodewatch-openapi-typescript-fetch-client)**  
  NodeWatch REST API の TypeScript クライアント。OpenAPI仕様から自動生成。  
  npm: `nodewatch-openapi-fetch-client`

- **[symbol-catbuffer](./packages/symbol-catbuffer)**  
  Symbolプロトコルのバイナリシリアライゼーションライブラリ。  
  npm: `symbol-catbuffer`

- **[symbol-websocket](./packages/symbol-websocket)**  
  Symbol WebSocket接続のモニタリングライブラリ。  
  npm: `@nemnesia/symbol-websocket`

- **[symbol-announcer](./packages/symbol-announcer)**  
  Symbolトランザクションのアナウンスツール。WebSocket監視機能もあり。  
  npm: `symbol-announcer`

- **[nem-symbol-node-picker](./packages/nem-symbol-node-picker)**  
  NEM/Symbolノード選択ユーティリティ。NodeWatch APIからランダムノード取得。  
  npm: `nem-symbol-node-picker`

- **[nem-websocket](./packages/nem-websocket)**  
  NEM WebSocketモニタリングツール。  
  npm: `@nemnesia/nem-websocket`

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
