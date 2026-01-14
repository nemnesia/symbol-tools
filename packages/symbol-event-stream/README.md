# @nemnesia/symbol-event-stream

複数のSymbolノードに接続して、重複したイベントを自動で排除するライブラリです。

[![npm version](https://img.shields.io/npm/v/@nemnesia/symbol-event-stream.svg)](https://www.npmjs.com/package/@nemnesia/symbol-event-stream)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## できること

- 複数のノードに同時接続できる
- 同じイベントが複数のノードから来ても1回だけ処理される
- 接続が切れたら自動で再接続する
- デフォルトでSSL接続
- TypeScript対応

## インストール

```bash
npm install @nemnesia/symbol-event-stream
```

pnpmの場合:

```bash
pnpm add @nemnesia/symbol-event-stream
```

## 使い方

基本的な使い方:

```typescript
import { SymbolEventStream } from '@nemnesia/symbol-event-stream';

const stream = new SymbolEventStream({
  nodeUrls: ['node1.example.com', 'node2.example.com', 'node3.example.com'],
  connections: 2, // この中からランダムに2つ選んで接続
});

// ブロックが生成されたら通知
stream.on('block', (message) => {
  console.log('新しいブロック:', message);
});

// 特定のアドレスの承認済みトランザクションを監視
const address = 'TCHBDENCLKEBILBPWP3JPB2XNY64OE7PYHHE32I';
stream.on('confirmedAdded', address, (message) => {
  console.log('トランザクション承認:', message);
});

stream.onError((error) => {
  console.error('エラー:', error);
});

// 終了
stream.close();
```

オプション設定:

```typescript
const stream = new SymbolEventStream({
  nodeUrls: ['node1.example.com', 'node2.example.com'],
  connections: 2,
  ssl: true, // デフォルトはtrue
  maxCacheSize: 10000, // 重複チェック用のキャッシュサイズ
  cacheTtl: 60000, // キャッシュ有効期限（ミリ秒）
});
```

## チャネル一覧

- `block` - 新しいブロック
- `confirmedAdded` - 承認済みトランザクション
- `unconfirmedAdded` - 未承認トランザクション
- `unconfirmedRemoved` - 削除された未承認トランザクション
- `partialAdded` - アグリゲートボンデッドトランザクション
- `partialRemoved` - 削除された部分トランザクション
- `cosignature` - 連署
- `status` - トランザクションステータス
- `finalizedBlock` - ファイナライズされたブロック

## 購読解除

```typescript
// コールバックを指定して解除
const callback = (message) => console.log(message);
stream.on('block', callback);
stream.off('block', callback);

// チャネル全体を解除
stream.off('block');

// アドレス指定のチャネルを解除
stream.off('confirmedAdded', address);
```

## 重複排除の仕組み

複数のノードから同じトランザクションやブロックの通知が来ても、ハッシュ値で判定して1回だけ処理されます。判定に使うのは:

- `meta.hash`
- `hash`
- `uid`

デフォルトで1分間キャッシュするので、その間は同じイベントが来ても無視されます。

```typescript
const stream = new SymbolEventStream({
  nodeUrls: ['node1.example.com', 'node2.example.com'],
  connections: 2,
  maxCacheSize: 5000,
  cacheTtl: 30000, // 30秒
});
```

## その他のメソッド

```typescript
// 接続中のノード数
const count = stream.getActiveConnectionCount();

// 終了したか確認
if (stream.getIsClosed()) {
  // ...
}
```

## なぜ複数接続？

- ノードが落ちても他のノードから受信できる
- 負荷を分散できる
- より早く応答したノードから受け取れる

## 動作環境

- Node.js 20以上
- TypeScript 5以上（TypeScript使う場合）

## 関連パッケージ

- [@nemnesia/symbol-websocket](https://www.npmjs.com/package/@nemnesia/symbol-websocket)

## ライセンス

MIT

## リポジトリ

https://github.com/nemnesia/symbol-tools
