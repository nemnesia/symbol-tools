# Symbol Testnet Faucet

Symbol Testnetの初心者開発者向けに、テストネットトークン（XYM）を配布するFaucetアプリケーションです。

## 特徴

- 🔐 **セキュア**: HMACトークンベースの認証で不正利用を防止
- 🌐 **高可用性**: 複数ノードURL対応によるフェイルオーバー機能
- 🚦 **レート制限**: IP、アドレス、日次制限による悪用防止
- 📊 **統計機能**: リクエスト数、成功/失敗数の追跡
- 📝 **アクセスログ**: JSON形式の詳細なログ記録（自動ローテーション）
- ✅ **テスト済み**: 90%以上のコードカバレッジ

## 必要要件

- Node.js 24.13.0以上
- pnpm

## インストール

```bash
pnpm install
```

## 環境変数の設定

`.env.example`をコピーして`.env`を作成し、必要な値を設定してください。

```bash
cp .env.example .env
```

### 必須設定

```env
# サーバー設定
PORT=3000
SYMBOL_NODE_URLS=https://sym-test-01.opening-line.jp:3001,https://sym-test-02.opening-line.jp:3001,https://sym-test-03.opening-line.jp:3001

# Faucet設定
FAUCET_PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
FAUCET_TOKEN_SECRET=your_secret_key_here
```

**PORT**: Webサーバーがリッスンするポート番号。デフォルトは3000。

**SYMBOL_NODE_URLS**: Symbol ノードのREST API URLをカンマ区切りで指定。複数指定すると自動的にフェイルオーバーします。スペースや改行区切りも可。

**FAUCET_PRIVATE_KEY**: Faucetアカウントの秘密鍵（64文字の16進数文字列）。XYMを配布するアカウントの秘密鍵を指定します。

**FAUCET_TOKEN_SECRET**: HMAC署名用のシークレットキー。最低32文字以上のランダムな文字列を推奨。以下のコマンドで生成できます：

```bash
# OpenSSLで生成
openssl rand -base64 32

# Node.jsで生成
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

> ⚠️ `FAUCET_PRIVATE_KEY`と`FAUCET_TOKEN_SECRET`は機密情報です。Gitにコミットせず、環境変数で管理してください。

### オプション設定

```env
# 配布設定
CLAIM_AMOUNT=50000000              # 1回の配布量（マイクロXYM）50 XYM
COOLDOWN_SECONDS=86400             # 同一アドレスへの再配布待機時間（秒）24時間
MAX_DAILY_TOTAL=10000000000        # 1日の配布上限（マイクロXYM）10,000 XYM

# レート制限
IP_RATE_LIMIT_MINUTES=10           # IP制限の時間窓（分）
IP_RATE_LIMIT_MAX=20               # IP制限の最大リクエスト数（10分間に20回）
IP_ADDRESS_RATE_LIMIT_MINUTES=10   # IP+アドレス制限の時間窓（分）
IP_ADDRESS_RATE_LIMIT_MAX=5        # IP+アドレス制限の最大リクエスト数（10分間に5回）
IP_DAILY_LIMIT=100                 # IPごとの1日の上限

# トランザクション設定
MAX_FEE=200000                     # 最大手数料（マイクロXYM）0.2 XYM
FEE_MULTIPLIER=100                 # 手数料乗数
DEADLINE_SECONDS=7200              # トランザクション有効期限（秒）2時間

# トークン設定
TOKEN_TTL_SECONDS=120              # 認証トークンの有効期限（秒）2分

# その他
RECENT_MINUTES=10                  # 直近監視時間（分）
RECENT_MAX=50                      # 直近の最大成功数（処理混雑時の抑制）

# ストレージ
DB_PATH=faucet.db                  # SQLiteデータベースパス

# アクセスログ
LOG_DIR=logs                       # ログディレクトリ
LOG_RETENTION_DAYS=90              # ログ保持日数

# CORS設定（カンマ区切りで複数指定可能）
ALLOWED_ORIGINS=                   # 未設定: 全て拒否（最も安全）
                                   # '*': 全て許可（開発環境用のみ）
                                   # 'https://example.com,https://another.com': 指定したオリジンのみ許可（本番推奨）
```

## 使い方

### ビルド

```bash
pnpm build
```

### 起動

```bash
pnpm start
```

サーバーは`http://localhost:3000`で起動します。

### 開発

```bash
# ビルド（監視モード）
pnpm build --watch

# 別のターミナルで
pnpm start
```

### テスト

```bash
# テスト実行
pnpm test

# カバレッジ付きテスト
pnpm test:coverage

# 監視モード
pnpm test:watch
```

## APIエンドポイント

### トークン取得

```http
GET /api/token?address=TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

HMACトークンを取得します。このトークンは120秒間有効です。

**レスポンス例:**

```json
{
  "token": "base64url_encoded_token",
  "tokenTs": 1735689600
}
```

### XYM配布申請

```http
POST /api/faucet
Content-Type: application/json

{
  "address": "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "token": "base64url_encoded_token",
  "tokenTs": 1735689600
}
```

**成功レスポンス例:**

```json
{
  "txHash": "ABC123...",
  "amount": 55
}
```

**エラーレスポンス例:**

```json
{
  "code": "rate_ip",
  "message": "Too many requests from your IP."
}
```

### 残高確認

```http
GET /api/balance
```

Faucetアカウントの残高を確認します。

**レスポンス例:**

```json
{
  "address": "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "balance": 1234.56,
  "balanceMicro": 1234560000
}
```

## エラーコード

| コード            | 説明                         |
| ----------------- | ---------------------------- |
| `invalid_address` | アドレス形式が不正           |
| `wrong_network`   | Testnetアドレスではない      |
| `token_invalid`   | トークンが無効または期限切れ |
| `rate_ip`         | IPレート制限超過             |
| `rate_ip_address` | IP+アドレスレート制限超過    |
| `rate_ip_daily`   | IPの日次制限超過             |
| `cooldown_active` | クールダウン期間中           |
| `faucet_empty`    | 日次配布上限到達             |
| `tx_failed`       | トランザクション送信失敗     |
| `balance_failed`  | 残高取得失敗                 |

## アーキテクチャ

```
apps/symbol-faucet/
├── src/
│   ├── app.ts           # エントリーポイント
│   ├── faucet.ts        # メインロジック（ExpressルーターSymbol SDK連携）
│   ├── db.ts            # SQLiteデータベース操作
│   └── access-log.ts    # アクセスログ記録
├── test/
│   ├── faucet.test.ts   # Faucet APIテスト
│   ├── db.test.ts       # データベーステスト
│   └── access-log.test.ts # ログ機能テスト
├── public/
│   └── index.html       # フロントエンドUI
└── dist/                # ビルド出力
```

## データベーススキーマ

### claims テーブル

アドレスごとの最終請求時刻を記録

### requests テーブル

すべてのリクエストを記録（成功/失敗、IP、アドレス、タイムスタンプ）

### daily_stats テーブル

日次統計（総リクエスト数、成功数、ブロック数、送信総量）

## セキュリティ

### 実装済みのセキュリティ機能

- **HMAC認証**: `timingSafeEqual`を使用したタイミング攻撃耐性のあるトークン検証
- **SQLインジェクション対策**: Prepared Statementによる安全なデータベースクエリ
- **多層レート制限**: IP単位、IP+アドレス単位、日次単位の制限
- **セキュリティヘッダー**: XSS、クリックジャッキング、MIME sniffing対策
- **CORS設定**: 環境変数で許可オリジンを制御可能
- **入力検証**: アドレス形式とネットワークの厳密な検証
- **JSONボディサイズ制限**: DoS攻撃対策（10KBまで）

### デプロイ時の推奨設定

#### 1. HTTPS必須

本番環境では必ずHTTPSを使用してください。Nginx等のリバースプロキシで終端させることを推奨します。

#### 2. プライベートキー管理

- プライベートキーは環境変数で管理し、コードにハードコーディングしない
- `FAUCET_TOKEN_SECRET`は十分に長いランダムな文字列を使用（32文字以上推奨）
- 可能であればAWS Secrets ManagerやAzure Key Vault等のシークレット管理サービスを使用

#### 3. データベースファイルの保護

```bash
# デプロイ後にファイル権限を制限
chmod 600 faucet.db
chown your-app-user:your-app-group faucet.db
```

#### 4. プロキシ設定

リバースプロキシ（Nginx等）を使用する場合は、信頼できるプロキシのIPアドレスを指定してください。
アプリケーション内で`app.set('trust proxy', true)`を設定しています。

#### 5. CORS設定

`ALLOWED_ORIGINS`環境変数で許可するオリジンを制御します。

```bash
# 本番環境: 特定のオリジンのみ許可（推奨）
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# 開発環境: 全て許可（ローカル開発のみ）
ALLOWED_ORIGINS=*

# 未設定: 全て拒否（最も安全だが、APIを外部から呼ぶ場合は設定必須）
ALLOWED_ORIGINS=
```

> ⚠️ 本番環境で`ALLOWED_ORIGINS=*`を使用するのは非推奨です。必ず具体的なドメインを指定してください。

#### 6. 環境変数の保護

- `.env`ファイルをGitにコミットしない（`.gitignore`に追加済み）
- サーバー上の`.env`ファイルは適切なパーミッション設定（`chmod 600 .env`）

#### 6. 定期的なセキュリティチェック

```bash
# 依存関係の脆弱性スキャン
pnpm audit

# パッケージの更新
pnpm update
```

#### 7. ログの監視

- `logs/`ディレクトリのアクセスログを定期的に確認
- 異常なリクエストパターンを検知したら対応を検討

## ライセンス

MIT

## 作者

ccHarvestasya
