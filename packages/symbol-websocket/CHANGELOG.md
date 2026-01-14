# 変更履歴

このプロジェクトにおけるすべての重要な変更は、このファイルに記録されます。

変更履歴のフォーマットは[変更履歴の管理](https://keepachangelog.com/en/1.0.0/)に基づいています。

## [0.2.0] - 2026/01/14

### 追加

- `SymbolWebSocketError`型による構造化エラー処理
  - エラータイプの識別（`timeout`, `network`, `parse`, `connection`, `unknown`）
  - エラー重大度の分類（`fatal`, `recoverable`）
  - 接続先ホスト、再接続状態、再接続試行回数の情報
- エラーコールバック未登録時に`console.warn`で警告出力

### 変更

- `onError`コールバックの型を`WebSocket.ErrorEvent`から`SymbolWebSocketError`に変更
- fatalエラー（タイムアウトなど）発生時は自動再接続を停止
- 再接続時に古いWebSocket接続を明示的にクローズ

## [0.1.0] - 2025/12/29

### 追加

- Symbol ブロックチェーンのWebSocket接続サポート
- リアルタイムデータ取得（ブロック、トランザクション、アカウント情報など）
- サブスクリプション管理
- 自動再接続とサブスクリプション復元
- エラー・クローズイベントのハンドリング
