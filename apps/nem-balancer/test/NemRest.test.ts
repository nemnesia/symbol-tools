import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NemRest } from '../src/repositories/NemRest';

// fetchのモック
global.fetch = vi.fn();

describe('NemRest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('アカウント情報を正しく取得', async () => {
    const mockAccountInfo = {
      meta: {
        cosignatories: [],
        cosignatoryOf: [],
        status: 'LOCKED',
        remoteStatus: 'ACTIVE',
      },
      account: {
        address: 'NABC123',
        harvestedBlocks: BigInt(0),
        balance: 10000000000,
        importance: 0,
        vestedBalance: 5000000000,
        publicKey: 'abc123',
        label: null,
        multisigInfo: {},
      },
    };

    vi.mocked(fetch).mockResolvedValue({
      json: async () => mockAccountInfo,
    } as Response);

    const nemRest = new NemRest('https://node.example.com');
    const result = await nemRest.getAccountInfo('NABC123');

    expect(fetch).toHaveBeenCalledWith('https://node.example.com/account/get?address=NABC123');
    expect(result).toEqual(mockAccountInfo);
  });

  it('異なるアドレスでも正しく動作', async () => {
    const mockAccountInfo = {
      meta: {
        cosignatories: [],
        cosignatoryOf: [],
        status: 'LOCKED',
        remoteStatus: 'ACTIVE',
      },
      account: {
        address: 'NXYZ789',
        harvestedBlocks: BigInt(0),
        balance: 0,
        importance: 0,
        vestedBalance: 0,
        publicKey: 'xyz789',
        label: null,
        multisigInfo: {},
      },
    };

    vi.mocked(fetch).mockResolvedValue({
      json: async () => mockAccountInfo,
    } as Response);

    const nemRest = new NemRest('https://another-node.example.com');
    const result = await nemRest.getAccountInfo('NXYZ789');

    expect(fetch).toHaveBeenCalledWith('https://another-node.example.com/account/get?address=NXYZ789');
    expect(result).toEqual(mockAccountInfo);
  });
});
