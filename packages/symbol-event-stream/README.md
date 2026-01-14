# @nemnesia/symbol-event-stream

複数のSymbolノードに接続して、重複したイベントを自動で排除するライブラリです。

[![npm version](https://img.shields.io/npm/v/@nemnesia/symbol-event-stream.svg)](https://www.npmjs.com/package/@nemnesia/symbol-event-stream)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## できること

- 複数のノードに同時接続できる
- 同じイベントが複数のノードから来ても1回だけ処理される
- 接続が切れたら自動で再接続する
- 再接続に失敗し続けたら自動で別のノードに切り替わる
- 問題のあるノードを一時的にブラックリストに入れる
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
  nodeUrls: [
    '001-sai-dual.symboltest.net',
    '201-sai-dual.symboltest.net',
    '401-sai-dual.symboltest.net',
    'vmi831828.contaboserver.net',
    '2.dusanjp.com',
    'testnet1.symbol-mikun.net',
  ],
  connections: 3, // この中からランダムに3つ選んで接続
});

stream.onConnect(() => {
  const nodes = stream.getConnectedNodes();
  nodes.forEach((node) => {
    const count = stream.getActiveConnectionCount();
    if (count === nodes.length) {
      console.log('接続中のノード:', node);
    }
  });
});

stream.onDisconnect((nodeUrl) => {
  console.log('ノードから切断:', nodeUrl);
});

// ブロックが生成されたら通知
stream.on('block', (message) => {
  console.log('新しいブロック:', message);
});

// 特定のアドレスの承認済みトランザクションを監視
const address = 'TBQLP7SU7WMUK3XYMIJZPWIT2HJ3PTVJPWFJNJQ';
stream.on('confirmedAdded', address, (message) => {
  console.log('トランザクション承認:', message);
});

stream.onError((error) => {
  console.error('エラーが発生しました:', error);
});

// 40秒後に終了
setTimeout(() => {
  stream.close();
  console.log('接続を終了しました');
}, 40000);
```

オプション設定:

```typescript
const stream = new SymbolEventStream({
  nodeUrls: ['node1.example.com', 'node2.example.com'],
  connections: 2,
  ssl: true, // デフォルトはtrue
  maxCacheSize: 10000, // 重複チェック用のキャッシュサイズ（デフォルト: 10000）
  cacheTtl: 60000, // キャッシュ有効期限（ミリ秒、デフォルト: 60000 = 1分）
  maxReconnectBeforeSwitching: 5, // ノード切り替え前の最大再接続試行回数（デフォルト: 5）
  blacklistTtl: 300000, // ブラックリストのTTL（ミリ秒、デフォルト: 300000 = 5分）
});
```

## 自動ノード切り替え

接続が切れて再接続に失敗し続けると、自動で別のノードに切り替わります。

- 最大5回（デフォルト）再接続を試行
- 失敗したノードは5分間（デフォルト）ブラックリストに入る
- ブラックリスト期間が過ぎると再び利用可能になる

この機能により、問題のあるノードから自動的に離脱して、より信頼性の高い接続を維持できます。

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

// 接続中のノード一覧
const nodes = stream.getConnectedNodes();
console.log('接続中のノード:', nodes);

// 終了したか確認
if (stream.getIsClosed()) {
  // ...
}
```

## コールバック一覧

- `onConnect(callback)` - ノードに接続したときに呼ばれる
- `onDisconnect(callback)` - ノードから切断したときに呼ばれる
- `onError(callback)` - エラーが発生したときに呼ばれる

## なぜ複数接続？

- ノードが落ちても他のノードから受信できる
- 負荷を分散できる
- より早く応答したノードから受け取れる

## 動作環境

- Node.js 20以上
- TypeScript 5以上（TypeScript使う場合）

## 関連パッケージ

- [@nemnesia/symbol-websocket](https://www.npmjs.com/package/@nemnesia/symbol-websocket) - 単一ノード接続用のSymbol WebSocketライブラリ

## コントリビューション

バグ報告や機能提案は [GitHub Issues](https://github.com/nemnesia/symbol-tools/issues) へお願いします。

プルリクエストも歓迎します！

## ライセンス

MIT

## リポジトリ

https://github.com/nemnesia/symbol-tools
