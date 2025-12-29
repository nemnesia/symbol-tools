# Symbol WebSocket

Symbol WebSocket は、Symbol ブロックチェーンのリアルタイムデータを監視するための TypeScript ライブラリです。このライブラリは、WebSocket を使用してブロックチェーンデータを効率的に取得し、サブスクリプションベースのイベントリスニングを提供します。

## 特徴

- **リアルタイムデータ取得**: ブロック、トランザクション、アカウント情報などをリアルタイムで取得可能。
- **柔軟なサブスクリプション管理**: 必要なチャネルに簡単にサブスクライブおよびアンサブスクライブ可能。
- **エラーおよびクローズイベントのハンドリング**: WebSocket のエラーや接続終了を簡単に処理可能。
- **自動再接続**: 接続が切断された場合、自動的に再接続し、サブスクリプションを復元。

## インストール

```bash
npm install @nemnesia/symbol-websocket
```

## 使い方

```typescript
import { SymbolWebSocket } from '@nemnesia/symbol-websocket';

const ws = new SymbolWebSocket({
  host: 'localhost',
  ssl: true,
  timeout: 5000,
});

// チャネルにサブスクライブ
ws.on('confirmedAdded', (message) => {
  console.log('New confirmed transaction:', message);
});

// エラーイベントの登録
ws.onError((err) => {
  console.error('WebSocket error:', err);
});

// クローズイベントの登録
ws.onClose((event) => {
  console.log('WebSocket closed:', event);
});

// 切断
ws.disconnect();
```

## API

#### コンストラクタ

```typescript
new SymbolWebSocket(options: SymbolWebSocketOptions);
```

- `options`: 接続設定。
  - `host`: 接続先ホスト。
  - `ssl`: SSL を使用するかどうか。
  - `timeout`: 接続タイムアウト（ミリ秒）。指定時間内に接続が完了しない場合はエラーになります。
  - `autoReconnect`: 自動再接続を有効にするか（デフォルト: `true`）。
  - `maxReconnectAttempts`: 最大再接続試行回数（デフォルト: `Infinity`）。
  - `reconnectInterval`: 再接続の間隔（ミリ秒、デフォルト: `3000`）。

#### メソッド

- `on(channel: SymbolChannel, callback: (message: WebSocket.MessageEvent) => void): void`
  - 指定したチャネルにサブスクライブします。
- `on(channel: SymbolChannel, address: string, callback: (message: WebSocket.MessageEvent) => void): void`
  - アドレスを指定してチャネルにサブスクライブします。
- `off(channel: SymbolChannel): void`
  - 指定したチャネルのサブスクリプションを解除します。
- `off(channel: SymbolChannel, address: string): void`
  - アドレスを指定してチャネルのサブスクリプションを解除します。
- `onConnect(callback: (uid: string) => void): void`
  - WebSocket 接続完了時のコールバックを登録します。
- `onReconnect(callback: (attemptCount: number) => void): void`
  - 再接続試行時のコールバックを登録します。
- `onError(callback: (err: WebSocket.ErrorEvent) => void): void`
  - エラーイベントのコールバックを登録します。
- `onClose(callback: (event: WebSocket.CloseEvent) => void): void`
  - クローズイベントのコールバックを登録します。
- `disconnect(): void`
  - WebSocket 接続を切断します。

## 注意点

- 再接続は自動的に行われます（デフォルト有効）。
- 再接続時は既存のサブスクリプションが自動的に復元されます。
- `autoReconnect: false`を設定することで自動再接続を無効化できます。

## ライセンス

このプロジェクトは [MITライセンス](./LICENSE) のもとで公開されています。

## 貢献方法

バグ報告・機能要望・プルリクエストは [GitHubリポジトリ](https://github.com/nemnesia/symbol-tools/tree/main/packages/symbol-websocket) で受け付けています。お気軽にご参加ください。

## バグ報告・質問

問題や質問は [GitHub Issues](https://github.com/nemnesia/symbol-tools/issues) からご連絡ください。
