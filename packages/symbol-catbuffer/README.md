# symbol-catbuffer

このモジュールは [symbol-sdk](https://github.com/symbol/symbol-sdk) 公式リポジトリから一部を抜粋し、MITライセンスで再構成したものです。

## 概要

- Symbolブロックチェーンのcatbuffer関連ユーティリティ・型定義・モデルを提供します。
- JavaScript/TypeScript対応。

## ライセンス

MIT License

## ディレクトリ構成

- `src/` ... コア実装
- `types/` ... 型定義ファイル
- `scripts/` ... ビルド・生成用スクリプト

## インストール

```sh
pnpm install
```

## ビルド

```sh
pnpm run copy:models
```

## テスト

（テストディレクトリ・手順は必要に応じて追加してください）

## 参考

- [symbol-sdk公式リポジトリ](https://github.com/symbol/symbol/tree/main/sdk)
- [symbol/catbuffer-parser](https://github.com/symbol/symbol/tree/main/catbuffer)
