import Database from 'better-sqlite3';

// 環境変数が未設定ならローカルファイルを使う
const DB_PATH = process.env.DB_PATH ?? 'faucet.db';

// 初期スキーマと必要なインデックス
const SCHEMA = `
CREATE TABLE IF NOT EXISTS claims (
  address TEXT PRIMARY KEY,
  last_claim_at INTEGER NOT NULL,
  total_claims INTEGER NOT NULL DEFAULT 0,
  last_tx_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_claims_last_claim_at ON claims(last_claim_at);

CREATE TABLE IF NOT EXISTS stats_daily (
  day TEXT PRIMARY KEY,
  total_requests INTEGER NOT NULL DEFAULT 0,
  total_success INTEGER NOT NULL DEFAULT 0,
  total_blocked INTEGER NOT NULL DEFAULT 0,
  total_sent INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS request_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at INTEGER NOT NULL,
  success INTEGER NOT NULL,
  address TEXT,
  ip TEXT
);

CREATE INDEX IF NOT EXISTS idx_request_log_created_at ON request_log(created_at);
CREATE INDEX IF NOT EXISTS idx_request_log_success ON request_log(success);
CREATE INDEX IF NOT EXISTS idx_request_log_ip ON request_log(ip);
CREATE INDEX IF NOT EXISTS idx_request_log_ip_address ON request_log(ip, address);
`;

// Singleton のDBインスタンス
let dbInstance: Database.Database | null = null;

/**
 * DB接続を初期化して、スキーマとマイグレーションを適用する。
 * 以降は同一インスタンスを再利用する。
 */
function getDb(): Database.Database {
  if (!dbInstance) {
    const db = new Database(DB_PATH);
    db.exec(SCHEMA);
    ensureSchemaMigrations(db);
    dbInstance = db;
  }

  return dbInstance;
}

/**
 * 既存DBに後方互換のマイグレーションを当てる。
 * 失敗しても安全な操作のみを実行する。
 */
function ensureSchemaMigrations(db: Database.Database): void {
  try {
    db.exec('ALTER TABLE request_log ADD COLUMN ip TEXT');
  } catch {
    // ignore if column already exists
  }
  db.exec('CREATE INDEX IF NOT EXISTS idx_request_log_ip ON request_log(ip)');
  db.exec('CREATE INDEX IF NOT EXISTS idx_request_log_ip_address ON request_log(ip, address)');
}

/**
 * 日付キー（YYYY-MM-DD）を生成する。
 */
function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * 指定アドレスの最終請求時刻を取得する。
 * @returns Unix時間（秒）。未登録ならnull。
 */
export async function getLastClaimAt(address: string): Promise<number | null> {
  const db = getDb();
  const row = db.prepare('SELECT last_claim_at FROM claims WHERE address = ?').get(address) as
    | { last_claim_at: number }
    | undefined;

  return row ? row.last_claim_at : null;
}

/**
 * 請求情報を更新する（insert or update）。
 * @param address 請求対象アドレス
 * @param txHash 送金トランザクションのハッシュ
 */
export async function updateClaim(address: string, txHash: string): Promise<void> {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);

  db.prepare(
    `
    INSERT INTO claims(address, last_claim_at, total_claims, last_tx_hash)
    VALUES (?, ?, 1, ?)
    ON CONFLICT(address) DO UPDATE SET
      last_claim_at = excluded.last_claim_at,
      total_claims = claims.total_claims + 1,
      last_tx_hash = excluded.last_tx_hash
  `
  ).run(address, now, txHash);
}

/**
 * 日次統計を更新する。
 * @param success 成功フラグ
 * @param sentAmountMicro 成功時の送金量（マイクロ単位）
 */
export async function recordRequest(success: boolean, sentAmountMicro: number): Promise<void> {
  const db = getDb();
  const day = todayKey();

  db.prepare(
    `
    INSERT INTO stats_daily(day, total_requests, total_success, total_blocked, total_sent)
    VALUES (?, 1, ?, ?, ?)
    ON CONFLICT(day) DO UPDATE SET
      total_requests = stats_daily.total_requests + 1,
      total_success = stats_daily.total_success + excluded.total_success,
      total_blocked = stats_daily.total_blocked + excluded.total_blocked,
      total_sent = stats_daily.total_sent + excluded.total_sent
  `
  ).run(day, success ? 1 : 0, success ? 0 : 1, success ? sentAmountMicro : 0);
}

/**
 * リクエストログを記録する。
 * @param success 成功フラグ
 * @param ip リクエスト元IP
 * @param address リクエストに含まれるアドレス（任意）
 */
export async function logRequest(success: boolean, ip: string, address?: string): Promise<void> {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  db.prepare('INSERT INTO request_log(created_at, success, address, ip) VALUES (?, ?, ?, ?)').run(
    now,
    success ? 1 : 0,
    address ?? null,
    ip
  );
}

/**
 * 直近の成功リクエスト数を取得する。
 * @param minutes 集計対象の分数
 */
export async function getRecentSuccessCount(minutes: number): Promise<number> {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  const from = now - minutes * 60;

  const row = db.prepare('SELECT COUNT(*) AS cnt FROM request_log WHERE success = 1 AND created_at >= ?').get(from) as
    | { cnt: number }
    | undefined;

  return row?.cnt ?? 0;
}

/**
 * 直近のIP単位リクエスト数を取得する。
 * @param ip 対象IP
 * @param minutes 集計対象の分数
 */
export async function getRecentRequestCountByIp(ip: string, minutes: number): Promise<number> {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  const from = now - minutes * 60;

  const row = db.prepare('SELECT COUNT(*) AS cnt FROM request_log WHERE ip = ? AND created_at >= ?').get(ip, from) as
    | { cnt: number }
    | undefined;

  return row?.cnt ?? 0;
}

/**
 * 直近のIP+アドレス単位リクエスト数を取得する。
 * @param ip 対象IP
 * @param address 対象アドレス
 * @param minutes 集計対象の分数
 */
export async function getRecentRequestCountByIpAddress(ip: string, address: string, minutes: number): Promise<number> {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  const from = now - minutes * 60;

  const row = db
    .prepare('SELECT COUNT(*) AS cnt FROM request_log WHERE ip = ? AND address = ? AND created_at >= ?')
    .get(ip, address, from) as { cnt: number } | undefined;

  return row?.cnt ?? 0;
}

/**
 * 今日のIP単位リクエスト数を取得する。
 * @param ip 対象IP
 */
export async function getTodayRequestCountByIp(ip: string): Promise<number> {
  const db = getDb();
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const from = Math.floor(start.getTime() / 1000);

  const row = db.prepare('SELECT COUNT(*) AS cnt FROM request_log WHERE ip = ? AND created_at >= ?').get(ip, from) as
    | { cnt: number }
    | undefined;

  return row?.cnt ?? 0;
}

/**
 * 今日の送金総量（成功分のみ）を取得する。
 */
export async function getTodaySentTotal(): Promise<number> {
  const db = getDb();
  const day = todayKey();
  const row = db.prepare('SELECT total_sent FROM stats_daily WHERE day = ?').get(day) as
    | { total_sent: number }
    | undefined;
  return row ? row.total_sent : 0;
}

/**
 * 今日の集計値を取得する。未登録なら0で埋めて返す。
 */
export async function getTodayStats(): Promise<{
  total_requests: number;
  total_success: number;
  total_blocked: number;
  total_sent: number;
}> {
  const db = getDb();
  const day = todayKey();
  const row = db
    .prepare(
      `
    SELECT total_requests, total_success, total_blocked, total_sent
    FROM stats_daily
    WHERE day = ?
  `
    )
    .get(day) as
    | {
        total_requests: number;
        total_success: number;
        total_blocked: number;
        total_sent: number;
      }
    | undefined;

  return (
    row ?? {
      total_requests: 0,
      total_success: 0,
      total_blocked: 0,
      total_sent: 0,
    }
  );
}
