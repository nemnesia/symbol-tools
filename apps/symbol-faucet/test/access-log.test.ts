import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

describe('access-log', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'faucet-log-'));
  });

  afterEach(async () => {
    delete process.env.LOG_DIR;
    delete process.env.LOG_RETENTION_DAYS;
    vi.resetModules();
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('日次ログファイルにJSON行を書き込む', async () => {
    process.env.LOG_DIR = tempDir;
    process.env.LOG_RETENTION_DAYS = '7';
    vi.resetModules();

    const { logAccess } = await import('../src/access-log.js');
    await logAccess({ ip: '127.0.0.1', status: 'ok', code: 'sent', detail: 'txhash' });

    const logPath = path.join(tempDir, `access-${todayKey()}.log`);
    const content = await fs.readFile(logPath, 'utf8');
    const line = content.trim();
    const parsed = JSON.parse(line) as {
      time: string;
      ip: string;
      status: string;
      code: string;
      detail?: string;
    };

    expect(parsed.ip).toBe('127.0.0.1');
    expect(parsed.status).toBe('ok');
    expect(parsed.code).toBe('sent');
    expect(parsed.detail).toBe('txhash');
    expect(typeof parsed.time).toBe('string');
  });

  it('保存期限を超えた古いログファイルを削除する', async () => {
    process.env.LOG_DIR = tempDir;
    process.env.LOG_RETENTION_DAYS = '1';
    vi.resetModules();

    const oldFile = path.join(tempDir, 'access-2000-01-01.log');
    const keepFile = path.join(tempDir, `access-${todayKey()}.log`);
    await fs.writeFile(oldFile, 'old', 'utf8');
    await fs.writeFile(keepFile, 'new', 'utf8');

    const { logAccess } = await import('../src/access-log.js');
    await logAccess({ ip: '127.0.0.1', status: 'ok', code: 'sent' });

    const files = await fs.readdir(tempDir);
    expect(files).toContain(path.basename(keepFile));
    expect(files).not.toContain(path.basename(oldFile));
  });

  it('保存期限が0の場合は削除をスキップする', async () => {
    process.env.LOG_DIR = tempDir;
    process.env.LOG_RETENTION_DAYS = '0';
    vi.resetModules();

    const oldFile = path.join(tempDir, 'access-2000-01-01.log');
    await fs.writeFile(oldFile, 'old', 'utf8');

    const { logAccess } = await import('../src/access-log.js');
    await logAccess({ ip: '127.0.0.1', status: 'ok', code: 'sent' });

    const files = await fs.readdir(tempDir);
    expect(files).toContain(path.basename(oldFile));
  });

  it('skips cleanup when already run today', async () => {
    process.env.LOG_DIR = tempDir;
    process.env.LOG_RETENTION_DAYS = '1';
    vi.resetModules();

    const oldFile = path.join(tempDir, 'access-2000-01-01.log');
    await fs.writeFile(oldFile, 'old', 'utf8');

    const { logAccess } = await import('../src/access-log.js');
    await logAccess({ ip: '127.0.0.1', status: 'ok', code: 'sent' });

    // Second call should skip cleanup
    await fs.writeFile(oldFile, 'old2', 'utf8');
    await logAccess({ ip: '127.0.0.2', status: 'ok', code: 'sent' });

    const files = await fs.readdir(tempDir);
    expect(files).toContain(path.basename(oldFile));
  });

  it('ignores non-log files during cleanup', async () => {
    process.env.LOG_DIR = tempDir;
    process.env.LOG_RETENTION_DAYS = '1';
    vi.resetModules();

    const otherFile = path.join(tempDir, 'other.txt');
    await fs.writeFile(otherFile, 'other', 'utf8');

    const { logAccess } = await import('../src/access-log.js');
    await logAccess({ ip: '127.0.0.1', status: 'ok', code: 'sent' });

    const files = await fs.readdir(tempDir);
    expect(files).toContain(path.basename(otherFile));
  });

  it('ignores invalid date in filename', async () => {
    process.env.LOG_DIR = tempDir;
    process.env.LOG_RETENTION_DAYS = '1';
    vi.resetModules();

    const invalidFile = path.join(tempDir, 'access-invalid-date.log');
    await fs.writeFile(invalidFile, 'invalid', 'utf8');

    const { logAccess } = await import('../src/access-log.js');
    await logAccess({ ip: '127.0.0.1', status: 'ok', code: 'sent' });

    const files = await fs.readdir(tempDir);
    expect(files).toContain(path.basename(invalidFile));
  });
});
