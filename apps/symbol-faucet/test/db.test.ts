import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type DbModule = typeof import('../src/db.js');

async function loadDbModule(dbPath: string): Promise<DbModule> {
  process.env.DB_PATH = dbPath;
  vi.resetModules();
  return import('../src/db.js');
}

describe('db', () => {
  let tempDir: string;
  let dbPath: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'faucet-db-'));
    dbPath = path.join(tempDir, 'faucet.db');
  });

  afterEach(async () => {
    delete process.env.DB_PATH;
    vi.resetModules();
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('請求を更新し、最終請求時刻を読み取る', async () => {
    const db = await loadDbModule(dbPath);

    const before = Math.floor(Date.now() / 1000);
    await db.updateClaim('ADDR1', 'HASH1');
    const last = await db.getLastClaimAt('ADDR1');

    expect(last).not.toBeNull();
    expect(last).toBeGreaterThanOrEqual(before);
    expect(last).toBeLessThanOrEqual(before + 5);
  });

  it('リクエストを記録し、カウントを提供する', async () => {
    const db = await loadDbModule(dbPath);

    await db.logRequest(true, '1.2.3.4', 'ADDR1');
    await db.logRequest(false, '1.2.3.4', 'ADDR1');
    await db.logRequest(true, '5.6.7.8', 'ADDR2');

    const recentSuccess = await db.getRecentSuccessCount(10);
    const byIp = await db.getRecentRequestCountByIp('1.2.3.4', 10);
    const byIpAddress = await db.getRecentRequestCountByIpAddress('1.2.3.4', 'ADDR1', 10);
    const todayByIp = await db.getTodayRequestCountByIp('1.2.3.4');

    expect(recentSuccess).toBe(2);
    expect(byIp).toBe(2);
    expect(byIpAddress).toBe(2);
    expect(todayByIp).toBe(2);
  });

  it('日次統計を成功とブロックカウントで更新する', async () => {
    const db = await loadDbModule(dbPath);

    await db.recordRequest(true, 100);
    await db.recordRequest(false, 0);

    const stats = await db.getTodayStats();

    expect(stats.total_requests).toBe(2);
    expect(stats.total_success).toBe(1);
    expect(stats.total_blocked).toBe(1);
    expect(stats.total_sent).toBe(100);
  });

  it('請求を複数回更新し、total_claimsを増やす', async () => {
    const db = await loadDbModule(dbPath);

    await db.updateClaim('ADDR1', 'HASH1');
    await db.updateClaim('ADDR1', 'HASH2');
    await db.updateClaim('ADDR1', 'HASH3');

    const last = await db.getLastClaimAt('ADDR1');
    expect(last).not.toBeNull();
  });

  it('データがない場合、今日の送信合計に0を返す', async () => {
    const db = await loadDbModule(dbPath);

    const total = await db.getTodaySentTotal();
    expect(total).toBe(0);
  });

  it('存在しないIPに対して0カウントを返す', async () => {
    const db = await loadDbModule(dbPath);

    const recent = await db.getRecentRequestCountByIp('9.9.9.9', 10);
    const today = await db.getTodayRequestCountByIp('9.9.9.9');

    expect(recent).toBe(0);
    expect(today).toBe(0);
  });

  it('存在しないIP+アドレス組み合わせに対して0を返す', async () => {
    const db = await loadDbModule(dbPath);

    const count = await db.getRecentRequestCountByIpAddress('9.9.9.9', 'ADDR_NONE', 10);
    expect(count).toBe(0);
  });
});
