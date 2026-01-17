# NEM WebSocket

NEM WebSocket は、NEM ブロックチェーンのリアルタイムデータを監視するための TypeScript ライブラリです。このライブラリは、WebSocket を使用してブロックチェーンデータを効率的に取得し、サブスクリプションベースのイベントリスニングを提供します。

## 特徴

- **リアルタイムデータ取得**: ブロック、トランザクション、アカウント情報などをリアルタイムで取得可能。
- **柔軟なサブスクリプション管理**: 必要なチャネルに簡単にサブスクライブおよびアンサブスクライブ可能。
- **エラーおよびクローズイベントのハンドリング**: WebSocket のエラーや接続終了を簡単に処理可能。
- **自動再接続**: 接続が切断された場合、自動的に再接続し、サブスクリプションを復元。

## インストール

```bash
yarn add @nemnesia/nem-websocket
```

または:

```bash
npm install @nemnesia/nem-websocket
```

## 使用方法

```typescript
import { NemWebSocket } from '@nemnesia/nem-websocket';

const ws = new NemWebSocket({
  host: 'localhost',
  ssl: false,
  timeout: 5000,
});

// チャネルにサブスクライブ
ws.on('blocks', (message) => {
  console.log('New block:', message);
});

// エラーイベントの登録
ws.onError((err) => {
  console.error('WebSocket error:', err.message);
  console.error('Error type:', err.type);
  console.error('Severity:', err.severity);

  if (err.severity === 'fatal') {
    console.error('致命的エラー - 再接続しません');
  } else if (err.reconnecting) {
    console.log(`再接続試行中: ${err.reconnectAttempts}回目`);
  }
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
new NemWebSocket(options: NemWebSocketOptions);
```

- `options`: 接続設定。
  - `host`: 接続先ホスト。
  - `ssl`: SSL を使用するかどうか。
  - `timeout`: 接続タイムアウト（ミリ秒）。
  - `autoReconnect`: 自動再接続を有効にするか（デフォルト: `true`）。
  - `maxReconnectAttempts`: 最大再接続試行回数（デフォルト: `Infinity`）。
  - `reconnectInterval`: 再接続の間隔（ミリ秒、デフォルト: `3000`）。

### プロパティ

- `uid: string | null`
  - 現在のWebSocket接続のUID（STOMPセッションIDまたはフォールバック）。未接続時は`null`。
- `isConnected: boolean`
  - WebSocket接続が確立されているかどうか。
- `client: Client`
  - 内部のSTOMPクライアントインスタンス。

### メソッド

- `on(channel: NemChannel, callback: (message: string) => void): void`
  - 指定したチャネルにサブスクライブします。
- `on(channel: NemChannel, address: string, callback: (message: string) => void): void`
  - アドレスを指定してチャネルにサブスクライブします。
- `off(channel: NemChannel): void`
  - 指定したチャネルのサブスクリプションを解除します。
- `off(channel: NemChannel, address: string): void`
  - アドレスを指定してチャネルのサブスクリプションを解除します。
- `onConnect(callback: (uid: string) => void): void`
  - WebSocket 接続完了時のコールバックを登録します。
- `onReconnect(callback: (attemptCount: number) => void): void`
  - 再接続試行時のコールバックを登録します。
- `onError(callback: (err: NemWebSocketError) => void): void`
  - エラーイベントのコールバックを登録します（構造化エラー情報を提供）。
- `onClose(callback: (event: WebSocket.CloseEvent) => void): void`
  - クローズイベントのコールバックを登録します。
- `disconnect(): void`
  - WebSocket 接続を切断します。
- `close(): void`
  - WebSocket 接続を切断します（`disconnect()`のエイリアス）。

## エラー処理

### 構造化エラー情報

`onError`コールバックは、以下のプロパティを持つ構造化エラーオブジェクトを提供します：

```typescript
interface NemWebSocketError {
  type: 'connection' | 'timeout' | 'parse' | 'network' | 'unknown';
  severity: 'fatal' | 'recoverable';
  host: string;
  reconnecting: boolean;
  reconnectAttempts: number;
  originalError: WebSocket.ErrorEvent | Error;
  timestamp: number;
  message: string;
}
```

- **type**: エラーの種類を示します
  - `timeout`: 接続タイムアウト
  - `network`: ネットワークエラー
  - `parse`: メッセージパースエラー
  - `connection`: 接続エラー
  - `unknown`: その他のエラー

- **severity**: エラーの重大度
  - `fatal`: 致命的エラー（自動再接続しません）
  - `recoverable`: 回復可能エラー（自動再接続します）

- **reconnecting**: 現在再接続中かどうか
- **reconnectAttempts**: 現在の再接続試行回数

**注意**: エラーコールバックが登録されていない場合、エラーは`console.warn`に出力されます。

## 注意点

- 再接続は自動的に行われます（デフォルト有効）。
- 再接続時は既存のサブスクリプションが自動的に復元されます。
- `autoReconnect: false`を設定することで自動再接続を無効化できます。

## ライセンス

[MIT](./LICENSE)
