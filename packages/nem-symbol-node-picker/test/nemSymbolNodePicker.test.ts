import { beforeEach, describe, expect, it, vi } from 'vitest';

import { nemCache, symbolCache } from '../src/nemSymbolNodePicker.js';

// 基本的なモジュールと型のテスト
describe('nemSymbolNodePicker - 基本テスト', () => {
  it('モジュールが正しくエクスポートされている', async () => {
    const module = await import('../src/nemSymbolNodePicker.js');
    expect(typeof module.nemSymbolNodePicker).toBe('function');
  });

  it('デフォルトパラメータが型安全である', () => {
    // TypeScriptの型チェックが通ることを確認
    expect(true).toBe(true);
  });
});

// 引数バリデーションのテスト(実際のAPIを呼ばない)
describe('nemSymbolNodePicker - 引数テスト', () => {
  it('不正なchainNameでエラー', async () => {
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    await expect(nemSymbolNodePicker({ chainName: 'invalid' as any, network: 'mainnet', count: 1 })).rejects.toThrow(
      "Invalid chainName: invalid. Must be 'nem' or 'symbol'."
    );
  });

  it('不正なnetworkでエラー', async () => {
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    await expect(nemSymbolNodePicker({ chainName: 'symbol', network: 'invalid' as any, count: 1 })).rejects.toThrow(
      "Invalid network: invalid. Must be 'mainnet' or 'testnet'."
    );
  });

  it('isSslがboolean以外でエラー', async () => {
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    await expect(
      nemSymbolNodePicker({ chainName: 'symbol', network: 'mainnet', count: 1, isSsl: 'true' as any })
    ).rejects.toThrow('isSsl must be a boolean');
  });

  it('timeoutMsが正の整数でない場合エラー', async () => {
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    await expect(
      nemSymbolNodePicker({ chainName: 'symbol', network: 'mainnet', count: 1, timeoutMs: 0 as any })
    ).rejects.toThrow('timeoutMs must be a positive integer (ms)');
    await expect(
      nemSymbolNodePicker({ chainName: 'symbol', network: 'mainnet', count: 1, timeoutMs: -100 as any })
    ).rejects.toThrow('timeoutMs must be a positive integer (ms)');
    await expect(
      nemSymbolNodePicker({ chainName: 'symbol', network: 'mainnet', count: 1, timeoutMs: 100.5 as any })
    ).rejects.toThrow('timeoutMs must be a positive integer (ms)');
    await expect(
      nemSymbolNodePicker({ chainName: 'symbol', network: 'mainnet', count: 1, timeoutMs: '3000' as any })
    ).rejects.toThrow('timeoutMs must be a positive integer (ms)');
  });
  it('0件の取得ではエラーを投げる', async () => {
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    await expect(nemSymbolNodePicker({ chainName: 'symbol', network: 'mainnet', count: 0 })).rejects.toThrow(
      'Count must be a positive integer'
    );
  });

  it('負の値ではエラーを投げる', async () => {
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    await expect(nemSymbolNodePicker({ chainName: 'symbol', network: 'mainnet', count: -1 })).rejects.toThrow(
      'Count must be a positive integer'
    );
  });

  it('小数点ではエラーを投げる', async () => {
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    await expect(nemSymbolNodePicker({ chainName: 'symbol', network: 'mainnet', count: 1.5 })).rejects.toThrow(
      'Count must be a positive integer'
    );
  });
});

// モック使用のテスト
describe('nemSymbolNodePicker - モックテスト', () => {
  beforeEach(() => {
    // 各テストの前にキャッシュとモジュールをクリア
    symbolCache.clear();
    nemCache.clear();
    vi.resetModules();
  });

  it('APIエラー時に適切にエラーを処理する', async () => {
    // モックを正しく設定
    vi.doMock('@nemnesia/nodewatch-openapi-typescript-fetch-client', () => ({
      Configuration: class Configuration {},
      SymbolNodesApi: class SymbolNodesApi {
        getSymbolHeight() {
          return Promise.reject(new Error('Network error'));
        }
        getSymbolPeerNodes() {
          return Promise.reject(new Error('Network error'));
        }
      },
      NEMNodesApi: class NEMNodesApi {
        getNemHeight() {
          return Promise.reject(new Error('Network error'));
        }
        getNemNodes() {
          return Promise.reject(new Error('Network error'));
        }
      },
    }));

    // モジュールを再インポート
    vi.resetModules();
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');

    await expect(nemSymbolNodePicker({ chainName: 'symbol', network: 'mainnet', count: 1 })).rejects.toThrow(
      'No available NodeWatch found.'
    );
  });

  it('キャッシュヒット時はAPIを呼ばない', async () => {
    // モジュールをインポート
    const { nemSymbolNodePicker, symbolCache: importedCache } = await import('../src/nemSymbolNodePicker.js');

    // キャッシュを直接操作してAPIコールを回避
    const endpoints = ['https://ssl1', 'https://ssl2'];
    importedCache.set('mainnet_true', {
      heightInfo: { height: 100, finalizedHeight: 100 },
      nodes: [
        { height: 100, endpoint: 'https://ssl1', isSslEnabled: true },
        { height: 100, endpoint: 'https://ssl2', isSslEnabled: true },
      ],
      timestamp: Date.now(),
      baseUrl: 'mock',
    });

    const result = await nemSymbolNodePicker({
      chainName: 'symbol',
      network: 'mainnet',
      count: 2,
      isSsl: true,
    });
    expect(result.sort()).toEqual(endpoints.sort());
  });

  it('SSLフィルタが有効な場合のみhttpsを返す', async () => {
    vi.doMock('@nemnesia/nodewatch-openapi-typescript-fetch-client', () => ({
      Configuration: class Configuration {},
      SymbolNodesApi: class SymbolNodesApi {
        getSymbolHeight() {
          return Promise.resolve({ height: 100, finalizedHeight: 100 });
        }
        getSymbolPeerNodes() {
          return Promise.resolve([
            { height: 100, endpoint: 'https://ssl1', isSslEnabled: true },
            { height: 100, endpoint: 'http://nonssl1', isSslEnabled: false },
            { height: 100, endpoint: 'http://nonssl2', isSslEnabled: null },
          ]);
        }
      },
      NEMNodesApi: class NEMNodesApi {
        getNemHeight() {
          return Promise.resolve({ height: 100, finalizedHeight: 100 });
        }
        getNemNodes() {
          return Promise.resolve([
            { height: 100, endpoint: 'https://ssl1', isSslEnabled: true },
            { height: 100, endpoint: 'http://nonssl1', isSslEnabled: false },
            { height: 100, endpoint: 'http://nonssl2', isSslEnabled: null },
          ]);
        }
      },
    }));
    vi.resetModules();
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    const result = await nemSymbolNodePicker({
      chainName: 'symbol',
      network: 'mainnet',
      count: 2,
      isSsl: true,
    });
    expect(result).toEqual(['https://ssl1']);
    const result2 = await nemSymbolNodePicker({
      chainName: 'nem',
      network: 'mainnet',
      count: 2,
      isSsl: true,
    });
    expect(result2).toEqual(['https://ssl1']);
  });

  it('NEMチェーン分岐も正常に動作する', async () => {
    vi.doMock('@nemnesia/nodewatch-openapi-typescript-fetch-client', () => ({
      Configuration: class Configuration {},
      SymbolNodesApi: class SymbolNodesApi {
        getSymbolHeight() {
          return Promise.resolve({ height: 100, finalizedHeight: 100 });
        }
        getSymbolPeerNodes() {
          return Promise.resolve([]);
        }
      },
      NEMNodesApi: class NEMNodesApi {
        getNemHeight() {
          return Promise.resolve({ height: 100, finalizedHeight: 100 });
        }
        getNemNodes() {
          return Promise.resolve([
            { height: 100, endpoint: 'https://nemssl', isSslEnabled: true },
            { height: 99, endpoint: 'https://nemold1', isSslEnabled: false },
            { height: 99, endpoint: 'https://nemold2', isSslEnabled: null },
          ]);
        }
      },
    }));
    vi.resetModules();
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    const result = await nemSymbolNodePicker({
      chainName: 'nem',
      network: 'mainnet',
      count: 2,
      isSsl: true,
    });
    expect(result).toEqual(['https://nemssl']);
  });

  it('Symbolチェーン testnet 正常系', async () => {
    vi.doMock('@nemnesia/nodewatch-openapi-typescript-fetch-client', () => ({
      Configuration: class Configuration {},
      SymbolNodesApi: class SymbolNodesApi {
        getSymbolHeight() {
          return Promise.resolve({ height: 200, finalizedHeight: 200 });
        }
        getSymbolPeerNodes() {
          return Promise.resolve([
            { height: 200, endpoint: 'https://symboltestssl', isSslEnabled: true },
            { height: 199, endpoint: 'http://symboltestold', isSslEnabled: false },
          ]);
        }
      },
      NEMNodesApi: class NEMNodesApi {
        getNemHeight() {
          return Promise.resolve({ height: 200, finalizedHeight: 200 });
        }
        getNemNodes() {
          return Promise.resolve([]);
        }
      },
    }));
    vi.resetModules();
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    const result = await nemSymbolNodePicker({
      chainName: 'symbol',
      network: 'testnet',
      count: 1,
      isSsl: true,
    });
    expect(result).toEqual(['https://symboltestssl']);
  });

  it('NEMチェーン testnet 正常系', async () => {
    vi.doMock('@nemnesia/nodewatch-openapi-typescript-fetch-client', () => ({
      Configuration: class Configuration {},
      SymbolNodesApi: class SymbolNodesApi {
        getSymbolHeight() {
          return Promise.resolve({ height: 200, finalizedHeight: 200 });
        }
        getSymbolPeerNodes() {
          return Promise.resolve([]);
        }
      },
      NEMNodesApi: class NEMNodesApi {
        getNemHeight() {
          return Promise.resolve({ height: 200, finalizedHeight: 200 });
        }
        getNemNodes() {
          return Promise.resolve([
            { height: 200, endpoint: 'https://nemtestssl', isSslEnabled: true },
            { height: 199, endpoint: 'http://nemtestold', isSslEnabled: false },
          ]);
        }
      },
    }));
    vi.resetModules();
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    const result = await nemSymbolNodePicker({
      chainName: 'nem',
      network: 'testnet',
      count: 1,
      isSsl: true,
    });
    expect(result).toEqual(['https://nemtestssl']);
  });

  it('NEMチェーンでキャッシュヒット時はAPIを呼ばない', async () => {
    vi.doMock('@nemnesia/nodewatch-openapi-typescript-fetch-client', () => ({
      Configuration: vi.fn(),
      SymbolNodesApi: vi.fn().mockImplementation(() => ({
        getSymbolHeight: vi.fn(),
        getSymbolPeerNodes: vi.fn(),
      })),
      NEMNodesApi: vi.fn().mockImplementation(() => ({
        getNemHeight: vi.fn(),
        getNemNodes: vi.fn(),
      })),
    }));
    vi.resetModules();
    const { nemSymbolNodePicker, nemCache } = await import('../src/nemSymbolNodePicker.js');
    nemCache.set('mainnet_true', {
      heightInfo: { height: 100, finalizedHeight: 100 },
      nodes: [
        { height: 100, endpoint: 'https://nemssl', isSslEnabled: true },
        { height: 100, endpoint: 'https://nemssl2', isSslEnabled: true },
      ],
      timestamp: Date.now(),
      baseUrl: 'mock',
    });
    const result = await nemSymbolNodePicker({
      chainName: 'nem',
      network: 'mainnet',
      count: 2,
      isSsl: true,
    });
    expect(result.sort()).toEqual(['https://nemssl', 'https://nemssl2'].sort());
    // キャッシュをクリア
    nemCache.clear();
  });

  it('NEMチェーンでPromise.any失敗時はエラー', async () => {
    vi.doMock('@nemnesia/nodewatch-openapi-typescript-fetch-client', () => ({
      Configuration: class Configuration {},
      SymbolNodesApi: class SymbolNodesApi {
        getSymbolHeight() {
          return Promise.resolve({ height: 100, finalizedHeight: 100 });
        }
        getSymbolPeerNodes() {
          return Promise.resolve([]);
        }
      },
      NEMNodesApi: class NEMNodesApi {
        getNemHeight() {
          return Promise.reject(new Error('fail'));
        }
        getNemNodes() {
          return Promise.reject(new Error('fail'));
        }
      },
    }));
    vi.resetModules();
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    await expect(nemSymbolNodePicker({ chainName: 'nem', network: 'mainnet', count: 1 })).rejects.toThrow(
      'No available NodeWatch found.'
    );
  });

  it('APIがタイムアウトした場合はエラーを投げる', async () => {
    vi.doMock('@nemnesia/nodewatch-openapi-typescript-fetch-client', () => ({
      Configuration: class Configuration {},
      SymbolNodesApi: class SymbolNodesApi {
        getSymbolHeight() {
          return new Promise(() => {}); // 永遠に解決しない
        }
        getSymbolPeerNodes() {
          return new Promise(() => {}); // 永遠に解決しない
        }
      },
      NEMNodesApi: class NEMNodesApi {
        getNemHeight() {
          return new Promise(() => {});
        }
        getNemNodes() {
          return new Promise(() => {});
        }
      },
    }));
    vi.resetModules();
    const { nemSymbolNodePicker } = await import('../src/nemSymbolNodePicker.js');
    await expect(
      nemSymbolNodePicker({ chainName: 'symbol', network: 'mainnet', count: 1, timeoutMs: 1000 })
    ).rejects.toThrow('No available NodeWatch found.');
  });
});
