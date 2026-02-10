import express from 'express';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Save real fetch
const realFetch = globalThis.fetch;

const mockNodeFetch = vi.fn();

vi.mock('../src/access-log.js', () => ({
  logAccess: vi.fn(async () => undefined),
}));

const mockDb = {
  getLastClaimAt: vi.fn<(address: string) => Promise<number | null>>(async () => null),
  getRecentRequestCountByIp: vi.fn(async () => 0),
  getRecentRequestCountByIpAddress: vi.fn(async () => 0),
  getRecentSuccessCount: vi.fn(async () => 0),
  getTodayRequestCountByIp: vi.fn(async () => 0),
  getTodaySentTotal: vi.fn(async () => 0),
  logRequest: vi.fn(async () => undefined),
  recordRequest: vi.fn(async () => undefined),
  updateClaim: vi.fn(async () => undefined),
  getTodayStats: vi.fn(async () => ({
    total_requests: 0,
    total_success: 0,
    total_blocked: 0,
    total_sent: 0,
  })),
};

vi.mock('../src/db.js', () => mockDb);

vi.mock('symbol-sdk', () => ({
  NetworkLocator: {
    findByIdentifier: vi.fn(() => ({
      isValidAddressString: vi.fn(() => true),
    })),
  },
  PrivateKey: class PrivateKey {
    constructor(public value: string) {}
  },
}));

vi.mock('symbol-sdk/symbol', () => {
  return {
    Address: class Address {
      constructor(public raw: string) {}
      toString() {
        return this.raw;
      }
    },
    Network: { NETWORKS: [] },
    SymbolFacade: class SymbolFacade {
      network = { isValidAddressString: () => true };
      transactionFactory = {
        static: { attachSignature: () => 'PAYLOAD' },
      };
      createAccount() {
        return {
          publicKey: 'PUBLIC',
          address: { toString: () => 'TADDR' },
          signTransaction: () => 'SIG',
        };
      }
      createTransactionFromTypedDescriptor() {
        return { fee: { value: '100' } };
      }
      hashTransaction() {
        return { toString: () => 'TXHASH' };
      }
    },
    descriptors: {
      TransferTransactionV1Descriptor: class {
        constructor(_recipient: unknown, _mosaics?: unknown) {}
      },
      UnresolvedMosaicDescriptor: class {
        constructor(_id: unknown, _amount: unknown) {}
      },
    },
    models: {
      UnresolvedMosaicId: class {
        constructor(_id: bigint) {}
      },
      Amount: class {
        constructor(public value: bigint) {}
      },
    },
  };
});

// Override global fetch with a discriminating mock
beforeEach(() => {
  vi.stubGlobal('fetch', async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();
    // If it's a local test server request, use real fetch
    if (url.startsWith('http://127.0.0.1:') || url.startsWith('http://localhost:')) {
      return realFetch(input, init);
    }
    // Otherwise use mock for Symbol node calls
    return mockNodeFetch(input, init);
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

async function startServer() {
  const mod = await import('../src/faucet.js');
  const app = express();
  app.use(express.json());
  app.use('/api', mod.createFaucetRouter());

  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once('listening', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Failed to bind server');
  }
  const baseUrl = `http://127.0.0.1:${address.port}`;
  return { server, baseUrl };
}

describe('Faucet ルーター', () => {
  beforeEach(() => {
    process.env.SYMBOL_NODE_URLS = 'http://node.local';
    process.env.FAUCET_PRIVATE_KEY = '11'.repeat(32);
    process.env.FAUCET_TOKEN_SECRET = 'secret';
    vi.clearAllMocks();

    // Mock Symbol node responses
    mockNodeFetch.mockImplementation(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      const urlObj = new URL(url);

      if (urlObj.pathname === '/node/info') {
        return new Response(JSON.stringify({ networkIdentifier: 152 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (urlObj.pathname.startsWith('/accounts/')) {
        return new Response(
          JSON.stringify({
            account: {
              mosaics: [{ id: '6BED913FA20223F8', amount: '123000000' }],
            },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (urlObj.pathname === '/transactions' && init?.method === 'PUT') {
        return new Response('', { status: 200 });
      }

      return new Response(JSON.stringify({ error: 'not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    });
  });

  afterEach(() => {
    delete process.env.SYMBOL_NODE_URLS;
    delete process.env.FAUCET_PRIVATE_KEY;
    delete process.env.FAUCET_TOKEN_SECRET;
  });

  it('有効なアドレスに対してトークンを発行する', async () => {
    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);

    const resp = await fetch(`${baseUrl}/api/token?address=${address}`, {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });
    const body = (await resp.json()) as { token?: string; tokenTs?: number; code?: string; message?: string };

    if (resp.status !== 200) {
      console.error('Unexpected response:', resp.status, body);
    }

    expect(resp.status).toBe(200);
    expect(typeof body.token).toBe('string');
    expect(typeof body.tokenTs).toBe('number');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('無効なアドレスのトークンリクエストを拒否する', async () => {
    const { server, baseUrl } = await startServer();

    const resp = await fetch(`${baseUrl}/api/token?address=bad`, {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });
    const body = (await resp.json()) as { code: string };

    expect(resp.status).toBe(400);
    expect(body.code).toBe('invalid_address');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('有効なトークンでFaucetリクエストを受け付ける', async () => {
    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);

    const tokenResp = await fetch(`${baseUrl}/api/token?address=${address}`, {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });
    const tokenBody = (await tokenResp.json()) as { token: string; tokenTs: number };

    const resp = await fetch(`${baseUrl}/api/faucet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '1.2.3.4',
      },
      body: JSON.stringify({
        address,
        token: tokenBody.token,
        tokenTs: tokenBody.tokenTs,
      }),
    });
    const body = (await resp.json()) as { txHash?: string; amount?: number; code?: string; message?: string };

    if (resp.status !== 200) {
      console.error('Faucet request failed:', resp.status, body);
    }

    expect(resp.status).toBe(200);
    expect(body.txHash).toBe('TXHASH');
    expect(body.amount).toBe(55);

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('アドレスなしのFaucetリクエストを拒否する', async () => {
    const { server, baseUrl } = await startServer();

    const resp = await fetch(`${baseUrl}/api/faucet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '1.2.3.4',
      },
      body: JSON.stringify({}),
    });
    const body = (await resp.json()) as { code: string; message: string };

    expect(resp.status).toBe(400);
    expect(body.code).toBe('invalid_address');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('短いアドレスのFaucetリクエストを拒否する', async () => {
    const { server, baseUrl } = await startServer();

    const resp = await fetch(`${baseUrl}/api/faucet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '1.2.3.4',
      },
      body: JSON.stringify({ address: 'short' }),
    });
    const body = (await resp.json()) as { code: string; message: string };

    expect(resp.status).toBe(400);
    expect(body.code).toBe('invalid_address');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('無効なトークンのFaucetリクエストを拒否する', async () => {
    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);

    const resp = await fetch(`${baseUrl}/api/faucet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '1.2.3.4',
      },
      body: JSON.stringify({ address, token: 'invalid', tokenTs: Date.now() / 1000 }),
    });
    const body = (await resp.json()) as { code: string; message: string };

    expect(resp.status).toBe(400);
    expect(body.code).toBe('token_invalid');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('IPレート制限を超えた場合にFaucetリクエストを拒否する', async () => {
    mockDb.getRecentRequestCountByIp.mockResolvedValueOnce(100);

    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);

    const tokenResp = await fetch(`${baseUrl}/api/token?address=${address}`, {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });
    const tokenBody = (await tokenResp.json()) as { token: string; tokenTs: number };

    const resp = await fetch(`${baseUrl}/api/faucet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '1.2.3.4',
      },
      body: JSON.stringify({ address, token: tokenBody.token, tokenTs: tokenBody.tokenTs }),
    });
    const body = (await resp.json()) as { code: string; message: string };

    expect(resp.status).toBe(429);
    expect(body.code).toBe('rate_ip');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('IP+アドレスレート制限を超えた場合にFaucetリクエストを拒否する', async () => {
    mockDb.getRecentRequestCountByIpAddress.mockResolvedValueOnce(10);

    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);

    const tokenResp = await fetch(`${baseUrl}/api/token?address=${address}`, {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });
    const tokenBody = (await tokenResp.json()) as { token: string; tokenTs: number };

    const resp = await fetch(`${baseUrl}/api/faucet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '1.2.3.4',
      },
      body: JSON.stringify({ address, token: tokenBody.token, tokenTs: tokenBody.tokenTs }),
    });
    const body = (await resp.json()) as { code: string; message: string };

    expect(resp.status).toBe(429);
    expect(body.code).toBe('rate_ip_address');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('IPの日次制限を超えた場合にFaucetリクエストを拒否する', async () => {
    mockDb.getTodayRequestCountByIp.mockResolvedValueOnce(300);

    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);

    const tokenResp = await fetch(`${baseUrl}/api/token?address=${address}`, {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });
    const tokenBody = (await tokenResp.json()) as { token: string; tokenTs: number };

    const resp = await fetch(`${baseUrl}/api/faucet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '1.2.3.4',
      },
      body: JSON.stringify({ address, token: tokenBody.token, tokenTs: tokenBody.tokenTs }),
    });
    const body = (await resp.json()) as { code: string; message: string };

    expect(resp.status).toBe(429);
    expect(body.code).toBe('rate_ip_daily');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('クールダウン中にFaucetリクエストを拒否する', async () => {
    const now = Math.floor(Date.now() / 1000);
    mockDb.getLastClaimAt.mockResolvedValueOnce(now);

    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);

    const tokenResp = await fetch(`${baseUrl}/api/token?address=${address}`, {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });
    const tokenBody = (await tokenResp.json()) as { token: string; tokenTs: number };

    const resp = await fetch(`${baseUrl}/api/faucet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '1.2.3.4',
      },
      body: JSON.stringify({ address, token: tokenBody.token, tokenTs: tokenBody.tokenTs }),
    });
    const body = (await resp.json()) as { code: string; message: string; nextAvailableAt?: string };

    expect(resp.status).toBe(429);
    expect(body.code).toBe('cooldown_active');
    expect(body.nextAvailableAt).toBeDefined();

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('日次制限を超えた場合にFaucetリクエストを拒否する', async () => {
    mockDb.getTodaySentTotal.mockResolvedValueOnce(20000000000);

    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);

    const tokenResp = await fetch(`${baseUrl}/api/token?address=${address}`, {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });
    const tokenBody = (await tokenResp.json()) as { token: string; tokenTs: number };

    const resp = await fetch(`${baseUrl}/api/faucet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '1.2.3.4',
      },
      body: JSON.stringify({ address, token: tokenBody.token, tokenTs: tokenBody.tokenTs }),
    });
    const body = (await resp.json()) as { code: string; message: string };

    expect(resp.status).toBe(429);
    expect(body.code).toBe('faucet_empty');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('直近の成功回数が多すぎる場合にFaucetリクエストを拒否する', async () => {
    mockDb.getRecentSuccessCount.mockResolvedValueOnce(150);

    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);

    const tokenResp = await fetch(`${baseUrl}/api/token?address=${address}`, {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });
    const tokenBody = (await tokenResp.json()) as { token: string; tokenTs: number };

    const resp = await fetch(`${baseUrl}/api/faucet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '1.2.3.4',
      },
      body: JSON.stringify({ address, token: tokenBody.token, tokenTs: tokenBody.tokenTs }),
    });
    const body = (await resp.json()) as { code: string; message: string };

    expect(resp.status).toBe(429);
    expect(body.code).toBe('tx_failed');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('残高を返す', async () => {
    const { server, baseUrl } = await startServer();

    const resp = await fetch(`${baseUrl}/api/balance`);
    const body = (await resp.json()) as { address: string; balance: number; balanceMicro: number };

    expect(resp.status).toBe(200);
    expect(body.address).toBeDefined();
    expect(body.balance).toBe(123);
    expect(body.balanceMicro).toBe(123000000);

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('文字列でないトークンのFaucetリクエストを拒否する', async () => {
    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);

    const resp = await fetch(`${baseUrl}/api/faucet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '1.2.3.4',
      },
      body: JSON.stringify({ address, token: 123, tokenTs: Date.now() / 1000 }),
    });
    const body = (await resp.json()) as { code: string; message: string };

    expect(resp.status).toBe(400);
    expect(body.code).toBe('token_invalid');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('ハイフン付きアドレスのトークンリクエストを処理する', async () => {
    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);
    const addressWithHyphens = address.slice(0, 8) + '-' + address.slice(8);

    const resp = await fetch(`${baseUrl}/api/token?address=${addressWithHyphens}`, {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });
    const body = (await resp.json()) as { token: string; tokenTs: number };

    expect(resp.status).toBe(200);
    expect(typeof body.token).toBe('string');
    expect(typeof body.tokenTs).toBe('number');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('X-Forwarded-Forヘッダーがない場合を処理する', async () => {
    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);

    const resp = await fetch(`${baseUrl}/api/token?address=${address}`);
    const body = (await resp.json()) as { token: string; tokenTs: number };

    expect(resp.status).toBe(200);
    expect(typeof body.token).toBe('string');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('残高取得エラーを適切に処理する', async () => {
    mockNodeFetch.mockImplementation(async () => {
      throw new Error('Network error');
    });

    const { server, baseUrl } = await startServer();

    const resp = await fetch(`${baseUrl}/api/balance`);
    const body = (await resp.json()) as { code: string; message: string };

    expect(resp.status).toBe(500);
    expect(body.code).toBe('balance_failed');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it.skip('トークン生成エラーを適切に処理する', async () => {
    mockNodeFetch.mockImplementation(async () => {
      throw new Error('Network error');
    });

    const { server, baseUrl } = await startServer();
    const address = 'A'.repeat(39);

    const resp = await fetch(`${baseUrl}/api/token?address=${address}`, {
      headers: { 'x-forwarded-for': '1.2.3.4' },
    });
    const body = (await resp.json()) as { code: string; message: string };

    expect(resp.status).toBe(500);
    expect(body.code).toBe('token_failed');

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('mosaics配列を直接含む残高レスポンスを処理する', async () => {
    mockNodeFetch.mockImplementation(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      const urlObj = new URL(url);

      if (urlObj.pathname === '/node/info') {
        return new Response(JSON.stringify({ networkIdentifier: 152 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (urlObj.pathname.startsWith('/accounts/')) {
        return new Response(
          JSON.stringify({
            mosaics: [{ id: '6BED913FA20223F8', amount: '456000000' }],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(JSON.stringify({ error: 'not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    });

    const { server, baseUrl } = await startServer();

    const resp = await fetch(`${baseUrl}/api/balance`);
    const body = (await resp.json()) as { address: string; balance: number; balanceMicro: number };

    expect(resp.status).toBe(200);
    expect(body.balance).toBe(456);

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('一致するモザイクがない残高を処理する', async () => {
    mockNodeFetch.mockImplementation(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      const urlObj = new URL(url);

      if (urlObj.pathname === '/node/info') {
        return new Response(JSON.stringify({ networkIdentifier: 152 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (urlObj.pathname.startsWith('/accounts/')) {
        return new Response(
          JSON.stringify({
            account: {
              mosaics: [{ id: 'AAAAAAAAAAAAAAAA', amount: '999000000' }],
            },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(JSON.stringify({ error: 'not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    });

    const { server, baseUrl } = await startServer();

    const resp = await fetch(`${baseUrl}/api/balance`);
    const body = (await resp.json()) as { address: string; balance: number; balanceMicro: number };

    expect(resp.status).toBe(200);
    expect(body.balance).toBe(0);
    expect(body.balanceMicro).toBe(0);

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('空のモザイク配列を持つ残高を処理する', async () => {
    mockNodeFetch.mockImplementation(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      const urlObj = new URL(url);

      if (urlObj.pathname === '/node/info') {
        return new Response(JSON.stringify({ networkIdentifier: 152 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (urlObj.pathname.startsWith('/accounts/')) {
        return new Response(
          JSON.stringify({
            account: { mosaics: [] },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(JSON.stringify({ error: 'not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    });

    const { server, baseUrl } = await startServer();

    const resp = await fetch(`${baseUrl}/api/balance`);
    const body = (await resp.json()) as { address: string; balance: number; balanceMicro: number };

    expect(resp.status).toBe(200);
    expect(body.balance).toBe(0);

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });

  it('0xプレフィックスなしのモザイクIDを処理する', async () => {
    mockNodeFetch.mockImplementation(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      const urlObj = new URL(url);

      if (urlObj.pathname === '/node/info') {
        return new Response(JSON.stringify({ networkIdentifier: 152 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (urlObj.pathname.startsWith('/accounts/')) {
        return new Response(
          JSON.stringify({
            account: {
              mosaics: [{ id: '6BED913FA20223F8', amount: '789000000' }],
            },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(JSON.stringify({ error: 'not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    });

    const { server, baseUrl } = await startServer();

    const resp = await fetch(`${baseUrl}/api/balance`);
    const body = (await resp.json()) as { address: string; balance: number; balanceMicro: number };

    expect(resp.status).toBe(200);
    expect(body.balance).toBe(789);

    await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  });
});
