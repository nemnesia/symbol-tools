import express from 'express';
import path from 'path';

import { createFaucetRouter } from './faucet.js';

// HTTPサーバーの待ち受けポート
const PORT = Number(process.env.PORT ?? '3000');

// CORS許可オリジンの設定（カンマ区切りで複数指定可能）
// 未設定の場合は全て拒否、'*'で全て許可（開発環境用）
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ?? '';

/**
 * 必須環境変数の有無を検証し、値を返す。
 * @throws 未設定の場合
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

// 起動時に必須設定を検証する。
requireEnv('FAUCET_PRIVATE_KEY');
requireEnv('FAUCET_TOKEN_SECRET');

const app = express();

// リバースプロキシ背後での動作を想定（X-Forwarded-For等を信頼）
// 必要に応じて信頼するプロキシのIPを指定してください
app.set('trust proxy', true);

// CORS設定
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (ALLOWED_ORIGINS === '*') {
    // 開発環境: 全てのオリジンを許可
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (ALLOWED_ORIGINS && origin) {
    // 本番環境: 許可リストに含まれるオリジンのみ許可
    const allowedList = ALLOWED_ORIGINS.split(',').map((o) => o.trim());
    if (allowedList.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
    }
  }
  // ALLOWED_ORIGINS未設定の場合はAccess-Control-Allow-Originヘッダーを付けない（全て拒否）

  // プリフライトリクエストへの対応
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(204).end();
  }

  next();
});

// セキュリティヘッダーの設定
app.use((req, res, next) => {
  // コンテンツタイプのスニッフィング防止
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // クリックジャッキング対策
  res.setHeader('X-Frame-Options', 'DENY');
  // XSS対策（レガシーブラウザ向け）
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'unsafe-inline' 'self'; style-src 'unsafe-inline' 'self'"
  );
  // MIME type強制
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// JSON APIのリクエストボディをパースする（サイズ制限付き）
app.use(express.json({ limit: '10kb' }));

const publicDir = path.join(process.cwd(), 'public');
// 静的ファイルを配信する。
app.use(express.static(publicDir));

app.use('/api', createFaucetRouter());

app.listen(PORT, () => {
  console.log(`Faucet running on http://localhost:${PORT}`);
});
