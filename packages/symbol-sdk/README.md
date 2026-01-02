# Symbol-SDK

![npm version](https://img.shields.io/npm/v/@nemnesia/symbol-sdk?style=flat-square)
![license](https://img.shields.io/npm/l/@nemnesia/symbol-sdk?style=flat-square)

このパッケージは [symbol-sdk](https://github.com/symbol/symbol/tree/main/sdk) 公式リポジトリをベースに、Node.js以外の環境（例: ブラウザ）でも動作するように再構成されています。

## 特徴

- SymbolおよびNEMブロックチェーンのcatbuffer仕様に基づくユーティリティ、型定義、モデルを提供
- NEM機能にも対応
- Node.js・ブラウザなど多様なJavaScript/TypeScript環境で動作

## インストール

```sh
npm install @nemnesia/symbol-sdk
# または
pnpm add @nemnesia/symbol-sdk
```

## サポート環境

- Node.js >= 16
- モダンブラウザ (ES2020以降)

## ディレクトリ構成

- `src/` … コア実装
- `types/` … 型定義ファイル
- `scripts/` … ビルド・生成用スクリプト

## ライセンス

MIT License

## 参考リンク

- [symbol-sdk公式リポジトリ](https://github.com/symbol/symbol/tree/main/sdk)
- [symbol/catbuffer-parser](https://github.com/symbol/symbol/tree/main/catbuffer)
