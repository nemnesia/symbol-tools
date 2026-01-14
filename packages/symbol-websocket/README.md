# Symbol WebSocket

Symbol ブロックチェーンのリアルタイムデータを監視する TypeScript ライブラリ。

## 特徴

- リアルタイムデータ取得（ブロック、トランザクション、アカウント情報など）
- サブスクリプション管理
- エラー・クローズイベントのハンドリング
- 自動再接続とサブスクリプション復元

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

// エラーイベントの登録（構造化エラー情報を受け取る）
ws.onError((err) => {
  console.error('WebSocket error:', err.message);
  console.error('Error type:', err.type); // 'timeout' | 'network' | 'parse' | 'connection' | 'unknown'
  console.error('Severity:', err.severity); // 'fatal' | 'recoverable'

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

#### プロパティ

- `uid: string | null`
  - 現在のWebSocket接続のUID。未接続時は`null`。
- `isConnected: boolean`
  - WebSocket接続が確立されているかどうか。
- `client: WebSocket`
  - 内部のWebSocketクライアントインスタンス。

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
- `onError(callback: (err: SymbolWebSocketError) => void): void`
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
interface SymbolWebSocketError {
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

### エラーハンドリング例

```typescript
ws.onError((err) => {
  switch (err.type) {
    case 'timeout':
      console.error(`${err.host}への接続がタイムアウト`);
      break;
    case 'network':
      console.warn('ネットワークエラー');
      break;
    case 'parse':
      console.error('メッセージのパースに失敗');
      break;
  }

  if (err.severity === 'fatal') {
    // 再接続は自動停止
    // 必要に応じてユーザーに通知
  }
});
```

**注意**: エラーコールバックが登録されていない場合、エラーは`console.warn`に出力されます。

## 注意点

- 再接続は自動で行われる（デフォルト有効）
- 再接続時は既存のサブスクリプションを自動復元
- `autoReconnect: false`で自動再接続を無効化可能
- `severity: 'fatal'`のエラーが発生した場合は自動再接続停止
- `off()`は指定チャネルのすべてのコールバックを解除（subscribePath単位）

## ライセンス

このプロジェクトは [MITライセンス](./LICENSE) のもとで公開されています。

## 貢献方法

バグ報告・機能要望・プルリクエストは [GitHubリポジトリ](https://github.com/nemnesia/symbol-tools/tree/main/packages/symbol-websocket) で受け付けています。

## バグ報告・質問

問題や質問は [GitHub Issues](https://github.com/nemnesia/symbol-tools/issues) まで。
