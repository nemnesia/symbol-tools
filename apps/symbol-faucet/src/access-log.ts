import fs from 'fs/promises';
import path from 'path';

// ログ出力先のディレクトリ
const LOG_DIR = process.env.LOG_DIR ?? 'logs';
// 何日分保持するか（0以下なら無期限）
const RETENTION_DAYS = Number(process.env.LOG_RETENTION_DAYS ?? '90');

// 日次の削除処理を重複実行しないためのフラグ
let lastCleanupDay: string | null = null;

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
 * 1行JSON形式のログを作る。
 */
function toLogLine(entry: Record<string, unknown>): string {
  return `${JSON.stringify(entry)}\n`;
}

/**
 * ログ出力先のディレクトリを作成する。
 */
async function ensureLogDir(): Promise<void> {
  await fs.mkdir(LOG_DIR, { recursive: true });
}

/**
 * 保持日数を超えたログを削除する。
 */
async function cleanupOldLogs(dayKey: string): Promise<void> {
  if (!RETENTION_DAYS || RETENTION_DAYS <= 0) return;
  if (lastCleanupDay === dayKey) return;
  lastCleanupDay = dayKey;

  const files = await fs.readdir(LOG_DIR);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - RETENTION_DAYS);

  await Promise.all(
    files.map(async (file) => {
      const match = file.match(/^access-(\d{4}-\d{2}-\d{2})\.log$/);
      if (!match) return;
      const fileDate = new Date(match[1]);
      if (Number.isNaN(fileDate.getTime())) return;
      if (fileDate < cutoff) {
        await fs.unlink(path.join(LOG_DIR, file));
      }
    })
  );
}

/**
 * アクセスログを追記する（1行JSON）。
 */
export async function logAccess(entry: {
  ip: string;
  address?: string;
  status: 'ok' | 'error' | 'blocked';
  code: string;
  detail?: string;
}): Promise<void> {
  const dayKey = todayKey();
  const logPath = path.join(LOG_DIR, `access-${dayKey}.log`);

  await ensureLogDir();
  await cleanupOldLogs(dayKey);

  const line = toLogLine({
    time: new Date().toISOString(),
    ...entry,
  });

  await fs.appendFile(logPath, line, 'utf8');
}
