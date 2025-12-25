# Symbol WebSocket

Symbol WebSocket は、Symbol ブロックチェーンのリアルタイムデータを監視するための TypeScript ライブラリです。このライブラリは、WebSocket を使用してブロックチェーンデータを効率的に取得し、サブスクリプションベースのイベントリスニングを提供します。

## 特徴

- **リアルタイムデータ取得**: ブロック、トランザクション、アカウント情報などをリアルタイムで取得可能。
- **柔軟なサブスクリプション管理**: 必要なチャネルに簡単にサブスクライブおよびアンサブスクライブ可能。
- **エラーおよびクローズイベントのハンドリング**: WebSocket のエラーや接続終了を簡単に処理可能。
- **自動再接続**: 接続が切断された場合、自動的に再接続し、サブスクリプションを復元。

## インストール

```bash
npm install nem-symbol-websocket-monitor
```

## 使用方法

```typescript
import { SymbolWebSocketMonitor } from 'nem-symbol-websocket-monitor';

const monitor = new SymbolWebSocketMonitor({
  host: 'localhost',
  ssl: true,
  timeout: 5000,
});

// チャネルにサブスクライブ
monitor.on('transactions', (message) => {
  console.log('New transaction:', message);
});

// エラーイベントの登録
monitor.onError((err) => {
  console.error('WebSocket error:', err);
});

// クローズイベントの登録
monitor.onClose((event) => {
  console.log('WebSocket closed:', event);
});

// 切断
monitor.disconnect();
```

## API

#### コンストラクタ

```typescript
new SymbolWebSocketMonitor(options: SymbolWebSocketOptions);
```

- `options`: 接続設定。
  - `host`: 接続先ホスト。
  - `ssl`: SSL を使用するかどうか。
  - `timeout`: 接続タイムアウト（ミリ秒）。
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

[MIT](./LICENSE)
