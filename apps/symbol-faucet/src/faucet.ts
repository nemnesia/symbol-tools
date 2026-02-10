import { createHmac, timingSafeEqual } from 'crypto';
import express from 'express';
import { NetworkLocator, PrivateKey } from 'symbol-sdk';
import { Address, Network, SymbolFacade, descriptors, models } from 'symbol-sdk/symbol';

import { logAccess } from './access-log.js';
import {
  getLastClaimAt,
  getRecentRequestCountByIp,
  getRecentRequestCountByIpAddress,
  getRecentSuccessCount,
  getTodayRequestCountByIp,
  getTodaySentTotal,
  logRequest,
  recordRequest,
  updateClaim,
} from './db.js';

// 環境変数から挙動を制御する設定群
const NODE_URLS = parseNodeUrls(process.env.SYMBOL_NODE_URLS ?? '');
const FAUCET_PRIVATE_KEY = process.env.FAUCET_PRIVATE_KEY ?? '';
const CLAIM_AMOUNT = Number(process.env.CLAIM_AMOUNT ?? '55000000');
const COOLDOWN_SECONDS = Number(process.env.COOLDOWN_SECONDS ?? String(24 * 60 * 60));
const MAX_FEE = Number(process.env.MAX_FEE ?? '200000');
const FEE_MULTIPLIER = Number(process.env.FEE_MULTIPLIER ?? '100');
const DEADLINE_SECONDS = Number(process.env.DEADLINE_SECONDS ?? '7200');
const MAX_DAILY_TOTAL = Number(process.env.MAX_DAILY_TOTAL ?? '10000000000');
const RECENT_MINUTES = Number(process.env.RECENT_MINUTES ?? '10');
const RECENT_MAX = Number(process.env.RECENT_MAX ?? '100');
const TOKEN_TTL_SECONDS = Number(process.env.TOKEN_TTL_SECONDS ?? '120');
const TOKEN_SECRET = process.env.FAUCET_TOKEN_SECRET ?? '';
const IP_RATE_LIMIT_MINUTES = Number(process.env.IP_RATE_LIMIT_MINUTES ?? '10');
const IP_RATE_LIMIT_MAX = Number(process.env.IP_RATE_LIMIT_MAX ?? '30');
const IP_ADDRESS_RATE_LIMIT_MINUTES = Number(process.env.IP_ADDRESS_RATE_LIMIT_MINUTES ?? '10');
const IP_ADDRESS_RATE_LIMIT_MAX = Number(process.env.IP_ADDRESS_RATE_LIMIT_MAX ?? '5');
const IP_DAILY_LIMIT = Number(process.env.IP_DAILY_LIMIT ?? '200');

// テストネット専用: XYM mosaic ID
const TESTNET_XYM_MOSAIC_ID = 0x72c0212e67a08bcen;

// ネットワーク情報のキャッシュ
let cachedFacade: SymbolFacade | null = null;
let cachedAt: number | null = null;
let nodeCursor = 0;

function parseNodeUrls(raw: string): string[] {
  return raw
    .split(/[\s,]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

/**
 * 住所文字列を正規化する（区切り除去 + 大文字化）。
 */
function normalizeAddress(input: string): string {
  return input.replace(/-/g, '').toUpperCase();
}

/**
 * Base32形式かどうかを簡易判定する。
 */
function isBase32(str: string): boolean {
  return /^[A-Z2-7]+$/.test(str);
}

/**
 * ノードのREST APIからJSONを取得する。
 * @throws NODE_URL未設定、またはHTTPエラー時
 */
async function fetchJson<T>(path: string): Promise<T> {
  return withNodeFallback(path, async (url) => {
    const resp = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!resp.ok) {
      throw new Error(`Request failed: ${resp.status} ${resp.statusText}`);
    }
    return (await resp.json()) as T;
  });
}

/**
 * ノードのREST APIへJSONボディをPUTする。
 * @throws NODE_URL未設定、またはHTTPエラー時
 */
async function putJson(path: string, body: string): Promise<void> {
  await withNodeFallback(path, async (url) => {
    const resp = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Request failed: ${resp.status} ${resp.statusText} ${text}`);
    }
  });
}

async function withNodeFallback<T>(path: string, action: (url: URL) => Promise<T>): Promise<T> {
  if (!NODE_URLS.length) throw new Error('SYMBOL_NODE_URL(S) is required');

  const startIndex = nodeCursor++ % NODE_URLS.length;
  let lastError: unknown = null;

  for (let offset = 0; offset < NODE_URLS.length; offset += 1) {
    const nodeUrl = NODE_URLS[(startIndex + offset) % NODE_URLS.length];
    try {
      const url = new URL(path, nodeUrl);
      return await action(url);
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError instanceof Error) throw lastError;
  throw new Error('All node requests failed');
}

/**
 * ネットワーク識別子を数値に正規化する。
 * 16進・10進の文字列も受け付ける。
 */
function parseNetworkIdentifier(value: unknown): number | null {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return null;
  if (value.startsWith('0x') || value.startsWith('0X')) {
    return Number.parseInt(value, 16);
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

/**
 * ノード情報からネットワーク情報を読み込んでキャッシュする。
 */
async function loadNetworkInfo(): Promise<void> {
  const nodeInfo = await fetchJson<{ networkIdentifier?: number | string }>('/node/info');
  const identifier = parseNetworkIdentifier(nodeInfo.networkIdentifier);
  if (identifier == null) {
    throw new Error('Failed to resolve network identifier');
  }

  const network = NetworkLocator.findByIdentifier(Network.NETWORKS, identifier);
  cachedFacade = new SymbolFacade(network);
  cachedAt = Date.now();
}

/**
 * キャッシュを1日単位で更新して利用する。
 * @returns キャッシュ済みの`SymbolFacade`
 */
async function ensureNetworkInfo(): Promise<SymbolFacade> {
  const oneDayMs = 24 * 60 * 60 * 1000;
  if (!cachedAt || Date.now() - cachedAt > oneDayMs || !cachedFacade) {
    await loadNetworkInfo();
  }
  if (!cachedFacade) throw new Error('Network cache not ready');
  return cachedFacade;
}

/**
 * X-Forwarded-Forを優先してクライアントIPを取得する。
 */
function getClientIp(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || '';
}

/**
 * 署名トークンを生成する（HMAC-SHA256）。
 * @param input `ip|address|timestamp` の結合文字列
 */
function signToken(input: string): string {
  return createHmac('sha256', TOKEN_SECRET).update(input).digest('base64url');
}

/**
 * 署名トークンの検証を行う（TTL + タイミングセーフ比較）。
 */
function verifyToken(ip: string, address: string, token: string, tokenTs: number): boolean {
  if (!TOKEN_SECRET) return false;
  if (!Number.isFinite(tokenTs)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - tokenTs) > TOKEN_TTL_SECONDS) return false;

  const expected = signToken(`${ip}|${address}|${tokenTs}`);
  const tokenBuf = new Uint8Array(Buffer.from(token));
  const expectedBuf = new Uint8Array(Buffer.from(expected));
  if (tokenBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(tokenBuf, expectedBuf);
}

/**
 * Faucet API ルーターを構築する。
 */
export function createFaucetRouter(): express.Router {
  const router = express.Router();

  // 配布リクエストの受付
  router.post('/faucet', async (req, res) => {
    try {
      const ip = getClientIp(req);
      const { address, token, tokenTs } = req.body ?? {};

      // 形式チェック
      if (!address || typeof address !== 'string') {
        await recordRequest(false, 0);
        await logRequest(false, ip, address);
        await logAccess({
          ip,
          address,
          status: 'blocked',
          code: 'invalid_address',
        });
        return res.status(400).json({
          code: 'invalid_address',
          message: 'アドレスの形式が無効です。',
        });
      }

      const normalized = normalizeAddress(address);
      if (normalized.length !== 39 || !isBase32(normalized)) {
        await recordRequest(false, 0);
        await logRequest(false, ip, address);
        await logAccess({
          ip,
          address,
          status: 'blocked',
          code: 'invalid_address',
        });
        return res.status(400).json({
          code: 'invalid_address',
          message: 'アドレスの形式が無効です。',
        });
      }

      const facade = await ensureNetworkInfo();

      // TESTNETアドレスのみ許可
      if (!facade.network.isValidAddressString(normalized)) {
        await recordRequest(false, 0);
        await logRequest(false, ip, normalized);
        await logAccess({
          ip,
          address: normalized,
          status: 'blocked',
          code: 'wrong_network',
        });
        return res.status(400).json({
          code: 'wrong_network',
          message: 'テストネットアドレスのみ対応しています。',
        });
      }

      const recipient = new Address(normalized);

      // 署名トークンの検証
      if (!token || typeof token !== 'string' || !verifyToken(ip, normalized, token, Number(tokenTs))) {
        await recordRequest(false, 0);
        await logRequest(false, ip, normalized);
        await logAccess({
          ip,
          address: normalized,
          status: 'blocked',
          code: 'token_invalid',
        });
        return res.status(400).json({
          code: 'token_invalid',
          message: 'リクエストの検証に失敗しました。',
        });
      }

      const ipRecentCount = await getRecentRequestCountByIp(ip, IP_RATE_LIMIT_MINUTES);
      if (ipRecentCount >= IP_RATE_LIMIT_MAX) {
        await recordRequest(false, 0);
        await logRequest(false, ip, normalized);
        await logAccess({
          ip,
          address: normalized,
          status: 'blocked',
          code: 'rate_ip',
        });
        return res.status(429).json({
          code: 'rate_ip',
          message: 'リクエストが多すぎます。しばらくしてからもう一度お試しください。',
        });
      }

      const ipAddressRecentCount = await getRecentRequestCountByIpAddress(
        ip,
        normalized,
        IP_ADDRESS_RATE_LIMIT_MINUTES
      );
      // IP+アドレスの短期レート制限
      if (ipAddressRecentCount >= IP_ADDRESS_RATE_LIMIT_MAX) {
        await recordRequest(false, 0);
        await logRequest(false, ip, normalized);
        await logAccess({
          ip,
          address: normalized,
          status: 'blocked',
          code: 'rate_ip_address',
        });
        return res.status(429).json({
          code: 'rate_ip_address',
          message: 'リクエストが多すぎます。しばらくしてからもう一度お試しください。',
        });
      }

      const ipTodayCount = await getTodayRequestCountByIp(ip);
      // IP単位の日次制限
      if (ipTodayCount >= IP_DAILY_LIMIT) {
        await recordRequest(false, 0);
        await logRequest(false, ip, normalized);
        await logAccess({
          ip,
          address: normalized,
          status: 'blocked',
          code: 'rate_ip_daily',
        });
        return res.status(429).json({
          code: 'rate_ip_daily',
          message: '1日の上限に達しました。明日またお試しください。',
        });
      }

      const lastClaimAt = await getLastClaimAt(normalized);
      const now = Math.floor(Date.now() / 1000);
      // クールダウン制限
      if (lastClaimAt && lastClaimAt + COOLDOWN_SECONDS > now) {
        await recordRequest(false, 0);
        await logRequest(false, ip, normalized);
        await logAccess({
          ip,
          address: normalized,
          status: 'blocked',
          code: 'cooldown_active',
        });
        const nextAvailableAt = new Date((lastClaimAt + COOLDOWN_SECONDS) * 1000).toISOString();
        return res.status(429).json({
          code: 'cooldown_active',
          message: '待機時間中です。しばらくしてからもう一度お試しください。',
          nextAvailableAt,
        });
      }

      const sentToday = await getTodaySentTotal();
      // Faucet全体の送金上限
      if (sentToday + CLAIM_AMOUNT > MAX_DAILY_TOTAL) {
        await recordRequest(false, 0);
        await logRequest(false, ip, normalized);
        await logAccess({
          ip,
          address: normalized,
          status: 'blocked',
          code: 'faucet_empty',
        });
        return res.status(429).json({
          code: 'faucet_empty',
          message: 'Faucetの1日の配布上限に達しました。明日またお試しください。',
        });
      }

      const recentCount = await getRecentSuccessCount(RECENT_MINUTES);
      // 処理混雑時の抑制
      if (recentCount > RECENT_MAX) {
        await recordRequest(false, 0);
        await logRequest(false, ip, normalized);
        await logAccess({
          ip,
          address: normalized,
          status: 'blocked',
          code: 'busy',
        });
        return res.status(429).json({
          code: 'tx_failed',
          message: 'Faucetが混雑しています。しばらくしてからもう一度お試しください。',
        });
      }

      if (!FAUCET_PRIVATE_KEY) throw new Error('FAUCET_PRIVATE_KEY is required');

      // トランザクション作成と送信
      const account = facade.createAccount(new PrivateKey(FAUCET_PRIVATE_KEY));
      const transferDescriptor = new descriptors.TransferTransactionV1Descriptor(
        recipient,
        [
          new descriptors.UnresolvedMosaicDescriptor(
            new models.UnresolvedMosaicId(TESTNET_XYM_MOSAIC_ID),
            new models.Amount(BigInt(CLAIM_AMOUNT))
          ),
        ],
        '\0GO! GO!! SYMBOL!!!'
      );
      const transaction = facade.createTransactionFromTypedDescriptor(
        transferDescriptor,
        account.publicKey,
        FEE_MULTIPLIER,
        DEADLINE_SECONDS
      );

      const maxFee = BigInt(MAX_FEE);
      if (maxFee > 0n && BigInt(transaction.fee.value) > maxFee) {
        transaction.fee = new models.Amount(maxFee);
      }

      const signature = account.signTransaction(transaction);
      const payload = facade.transactionFactory.static.attachSignature(transaction, signature);
      const txHash = facade.hashTransaction(transaction).toString();

      await putJson('/transactions', payload);

      await updateClaim(normalized, txHash);
      await recordRequest(true, CLAIM_AMOUNT);
      await logRequest(true, ip, normalized);
      await logAccess({
        ip,
        address: normalized,
        status: 'ok',
        code: 'sent',
        detail: txHash,
      });

      return res.status(200).json({
        txHash,
        amount: CLAIM_AMOUNT / 1_000_000,
        nextAvailableAt: new Date((now + COOLDOWN_SECONDS) * 1000).toISOString(),
      });
    } catch {
      const ip = getClientIp(req);
      await recordRequest(false, 0);
      await logRequest(false, ip);
      await logAccess({ ip, status: 'error', code: 'tx_failed' });
      return res.status(500).json({
        code: 'tx_failed',
        message: '送信に失敗しました。しばらくしてからもう一度お試しください。',
      });
    }
  });

  // 配布アカウントの残高を返す
  router.get('/balance', async (req, res) => {
    try {
      const facade = await ensureNetworkInfo();
      if (!FAUCET_PRIVATE_KEY) throw new Error('FAUCET_PRIVATE_KEY is required');

      const account = facade.createAccount(new PrivateKey(FAUCET_PRIVATE_KEY));
      const address = account.address.toString();
      const info = await fetchJson<{
        account?: { mosaics?: Array<{ id: string; amount: string }> };
        mosaics?: Array<{ id: string; amount: string }>;
      }>(`/accounts/${address}`);
      const mosaics = info.account?.mosaics ?? info.mosaics ?? [];

      const mosaic = mosaics.find((m) => {
        const rawId = m.id.startsWith('0x') ? m.id : `0x${m.id}`;
        return BigInt(rawId) === TESTNET_XYM_MOSAIC_ID;
      });
      const balanceMicro = mosaic ? Number(BigInt(mosaic.amount)) : 0;

      await logAccess({
        ip: getClientIp(req),
        status: 'ok',
        code: 'balance',
        detail: address,
      });

      return res.status(200).json({
        address,
        balance: balanceMicro / 1_000_000,
        balanceMicro,
      });
    } catch (error) {
      const ip = getClientIp(req);
      console.error('Balance fetch error:', error);
      await logAccess({ ip, status: 'error', code: 'balance_failed' });
      return res.status(500).json({
        code: 'balance_failed',
        message: '残高の取得に失敗しました。',
      });
    }
  });

  // HMACトークンを発行する
  router.get('/token', async (req, res) => {
    try {
      if (!TOKEN_SECRET) throw new Error('FAUCET_TOKEN_SECRET is required');
      const ip = getClientIp(req);
      const addressRaw = String(req.query.address ?? '').trim();
      const normalized = normalizeAddress(addressRaw);

      if (!normalized || normalized.length !== 39 || !isBase32(normalized)) {
        await logAccess({
          ip,
          address: addressRaw,
          status: 'blocked',
          code: 'token_invalid_address',
        });
        return res.status(400).json({
          code: 'invalid_address',
          message: 'アドレスの形式が無効です。',
        });
      }

      const facade = await ensureNetworkInfo();
      if (!facade.network.isValidAddressString(normalized)) {
        await logAccess({
          ip,
          address: normalized,
          status: 'blocked',
          code: 'token_wrong_network',
        });
        return res.status(400).json({
          code: 'wrong_network',
          message: 'テストネットアドレスのみ対応しています。',
        });
      }

      const tokenTs = Math.floor(Date.now() / 1000);
      const token = signToken(`${ip}|${normalized}|${tokenTs}`);

      await logAccess({
        ip,
        address: normalized,
        status: 'ok',
        code: 'token',
      });

      return res.status(200).json({ token, tokenTs });
    } catch {
      const ip = getClientIp(req);
      await logAccess({ ip, status: 'error', code: 'token_failed' });
      return res.status(500).json({
        code: 'token_failed',
        message: 'トークンの発行に失敗しました。',
      });
    }
  });

  return router;
}
