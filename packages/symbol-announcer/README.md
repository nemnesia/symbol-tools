# symbol-announcer

SymbolブロックチェーンへトランザクションをアナウンスするためのTypeScriptライブラリです。WebSocket監視機能を組み込み、トランザクションの承認やステータス変更を自動的に検知します。

## 特徴

- ✅ トランザクションをSymbolネットワークにアナウンス
- 🔌 WebSocketで自動的にトランザクション結果を監視
- 📡 承認完了やエラーステータスをイベントで通知
- 🎯 型安全なイベントリスナー
- ⚡ シンプルで直感的なAPI

## インストール

```bash
npm install symbol-announcer
```

## 使い方

### 基本的な使い方

```typescript
import { SymbolAnnouncer } from 'symbol-announcer';

// アナウンサーを初期化
const announcer = new SymbolAnnouncer(
  'https://t.sakia.harvestasya.com:3001', // ノードURL
  aliceAccount.address.toString(), // 署名者アドレス
  payloadJsonString, // トランザクションペイロード(JSON文字列)
  transactionHash // トランザクションハッシュ
);

// イベントリスナーを設定
announcer.on('connected', () => {
  console.log('✅ WebSocket接続完了');
});

announcer.on('announced', (data) => {
  console.log('✅ トランザクションがアナウンスされました:', data);
});

announcer.on('confirmedAdded', (message) => {
  console.log('✅ トランザクションが承認されました!', message);
  announcer.disconnect();
});

announcer.on('status', (message) => {
  console.log('⚠️ トランザクションステータス:', message);
  announcer.disconnect();
});

announcer.on('error', (error) => {
  console.error('❌ エラー:', error);
  announcer.disconnect();
});

// アナウンスを開始
announcer.announce();
```

## API

### `SymbolAnnouncer`

#### コンストラクタ

```typescript
new SymbolAnnouncer(
  nodeUrl: string,        // ノードURL (例: 'https://node.example.com:3001')
  signerAddress: string,  // 署名者アドレス
  transaction: string,    // トランザクションペイロード (JSON文字列)
  transactionHash: string // トランザクションハッシュ
)
```

#### メソッド

- `announce(): void` - トランザクションをアナウンスし、WebSocket監視を開始します
- `disconnect(): void` - WebSocket接続を切断します

#### イベント

- `connected` - WebSocket接続が確立されたときに発火
- `announced` - トランザクションがアナウンスされたときに発火
- `confirmedAdded` - トランザクションがブロックチェーンに承認されたときに発火
- `status` - トランザクションのステータス変更（通常はエラー）時に発火
- `error` - エラーが発生したときに発火

## 依存関係

- `@nemnesia/symbol-websocket` - WebSocket監視機能を提供

## 動作環境

- Node.js >= 20.0.0

## ライセンス

このパッケージのライセンスについては、LICENSEファイルを参照してください。

## 関連リンク

- [Symbol Documentation](https://docs.symbol.dev/)
- [Symbol SDK](https://www.npmjs.com/package/symbol-sdk)

## 開発

```bash
# 依存関係のインストール
pnpm install

# ビルド
pnpm build

# テスト実行
pnpm test

# テスト(watch モード)
pnpm test:watch

# カバレッジ付きテスト
pnpm test:coverage
```
