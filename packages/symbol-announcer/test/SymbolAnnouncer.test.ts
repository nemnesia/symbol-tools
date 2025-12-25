import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SymbolAnnouncer } from '../src/SymbolAnnouncer.js';

// グローバルfetchのモック
global.fetch = vi.fn();

// WebSocketモニターインスタンスのモック
const mockMonitorInstance = {
  onConnect: vi.fn(),
  on: vi.fn(),
  disconnect: vi.fn(),
};

// SymbolWebSocketMonitorのモック
vi.mock('@nemnesia/symbol-websocket', () => {
  return {
    SymbolWebSocketMonitor: vi.fn(function (this: any) {
      Object.assign(this, mockMonitorInstance);
    }),
  };
});

describe('SymbolAnnouncer', () => {
  const mockNodeUrl = 'https://example.com:3000';
  const mockSignerAddress = 'TABC1234567890ABCDEF';
  const mockTransaction = '{"payload": "test"}';
  const mockTransactionHash = 'ABC123DEF456';

  let announcer: SymbolAnnouncer;

  beforeEach(() => {
    vi.clearAllMocks();
    // デフォルトのfetchモックを設定
    (global.fetch as any).mockResolvedValue({
      json: async () => ({}),
    });
    // モックインスタンスをリセット
    mockMonitorInstance.onConnect = vi.fn();
    mockMonitorInstance.on = vi.fn();
    mockMonitorInstance.disconnect = vi.fn();
    announcer = new SymbolAnnouncer(mockNodeUrl, mockSignerAddress, mockTransaction, mockTransactionHash);
  });

  afterEach(() => {
    if (announcer) {
      announcer.disconnect();
    }
  });

  describe('constructor', () => {
    it('インスタンスが正しく作成されるべきである / should create instance correctly', () => {
      expect(announcer).toBeInstanceOf(SymbolAnnouncer);
    });

    it('プロパティが正しく設定されるべきである / should set properties correctly', () => {
      // @ts-ignore - プライベートプロパティへのアクセス
      expect(announcer.nodeUrl).toBe(mockNodeUrl);
      // @ts-ignore - プライベートプロパティへのアクセス
      expect(announcer.signerAddress).toBe(mockSignerAddress);
      // @ts-ignore - プライベートプロパティへのアクセス
      expect(announcer.transaction).toBe(mockTransaction);
      // @ts-ignore - プライベートプロパティへのアクセス
      expect(announcer.transactionHash).toBe(mockTransactionHash);
    });
  });

  describe('announce', () => {
    it('connectedイベントが発火されるべきである / should emit connected event', async () => {
      const connectedSpy = vi.fn();
      announcer.on('connected', connectedSpy);

      // onConnectのコールバックを取得して実行
      mockMonitorInstance.onConnect.mockImplementation((callback) => {
        callback();
      });

      announcer.announce();

      expect(mockMonitorInstance.onConnect).toHaveBeenCalled();
      expect(connectedSpy).toHaveBeenCalled();
    });

    it('トランザクションがアナウンスされ、announcedイベントが発火されるべきである / should announce transaction and emit announced event', async () => {
      const mockResponse = { message: 'success' };
      (global.fetch as any).mockResolvedValueOnce({
        json: async () => mockResponse,
      });

      const announcedSpy = vi.fn();
      announcer.on('announced', announcedSpy);

      // onConnectのコールバックを取得して実行
      mockMonitorInstance.onConnect.mockImplementation((callback) => {
        callback();
      });

      announcer.announce();

      // 非同期処理を待つ
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(global.fetch).toHaveBeenCalledWith(
        'https://example.com:3000/transactions',
        expect.objectContaining({
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: mockTransaction,
        })
      );
      expect(announcedSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('fetchエラー時にerrorイベントが発火されるべきである / should emit error event on fetch error', async () => {
      const mockError = new Error('Network error');
      (global.fetch as any).mockRejectedValueOnce(mockError);

      const errorSpy = vi.fn();
      announcer.on('error', errorSpy);

      // onConnectのコールバックを取得して実行
      mockMonitorInstance.onConnect.mockImplementation((callback) => {
        callback();
      });

      announcer.announce();

      // 非同期処理を待つ
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(errorSpy).toHaveBeenCalledWith(mockError);
    });
  });

  describe('confirmedAdded event', () => {
    it('トランザクションハッシュが一致する場合、confirmedAddedイベントが発火されるべきである / should emit confirmedAdded event when hash matches', () => {
      const mockMessage = {
        data: {
          meta: {
            hash: mockTransactionHash,
          },
        },
      };

      const confirmedAddedSpy = vi.fn();
      announcer.on('confirmedAdded', confirmedAddedSpy);

      // onConnectのコールバックを取得して実行
      mockMonitorInstance.onConnect.mockImplementation((callback) => {
        callback();
      });

      announcer.announce();

      // monitor.onの呼び出しからコールバックを取得
      const confirmedAddedCall = mockMonitorInstance.on.mock.calls.find(
        (call: any[]) => call[0] === 'confirmedAdded'
      );
      const confirmedAddedCallback = confirmedAddedCall?.[2];

      if (confirmedAddedCallback) {
        confirmedAddedCallback(mockMessage);
      }

      expect(confirmedAddedSpy).toHaveBeenCalledWith(mockMessage);
    });

    it('トランザクションハッシュが一致しない場合、confirmedAddedイベントが発火されないべきである / should not emit confirmedAdded event when hash does not match', () => {
      const mockMessage = {
        data: {
          meta: {
            hash: 'DIFFERENT_HASH',
          },
        },
      };

      const confirmedAddedSpy = vi.fn();
      const disconnectSpy = vi.spyOn(announcer, 'disconnect');
      announcer.on('confirmedAdded', confirmedAddedSpy);

      // onConnectのコールバックを取得して実行
      mockMonitorInstance.onConnect.mockImplementation((callback) => {
        callback();
      });

      announcer.announce();

      // monitor.onの呼び出しからコールバックを取得
      const confirmedAddedCall = mockMonitorInstance.on.mock.calls.find(
        (call: any[]) => call[0] === 'confirmedAdded'
      );
      const confirmedAddedCallback = confirmedAddedCall?.[2];

      if (confirmedAddedCallback) {
        confirmedAddedCallback(mockMessage);
      }

      expect(confirmedAddedSpy).not.toHaveBeenCalled();
      expect(disconnectSpy).not.toHaveBeenCalled();
    });
  });

  describe('status event', () => {
    it('トランザクションハッシュが一致する場合、statusイベントが発火されるべきである / should emit status event when hash matches', () => {
      const mockMessage = {
        data: {
          hash: mockTransactionHash,
        },
      };

      const statusSpy = vi.fn();
      announcer.on('status', statusSpy);

      // onConnectのコールバックを取得して実行
      mockMonitorInstance.onConnect.mockImplementation((callback) => {
        callback();
      });

      announcer.announce();

      // monitor.onの呼び出しからコールバックを取得
      const statusCall = mockMonitorInstance.on.mock.calls.find((call: any[]) => call[0] === 'status');
      const statusCallback = statusCall?.[2];

      if (statusCallback) {
        statusCallback(mockMessage);
      }

      expect(statusSpy).toHaveBeenCalledWith(mockMessage);
    });

    it('トランザクションハッシュが一致しない場合、statusイベントが発火されないべきである / should not emit status event when hash does not match', () => {
      const mockMessage = {
        data: {
          hash: 'DIFFERENT_HASH',
        },
      };

      const statusSpy = vi.fn();
      const disconnectSpy = vi.spyOn(announcer, 'disconnect');
      announcer.on('status', statusSpy);

      // onConnectのコールバックを取得して実行
      mockMonitorInstance.onConnect.mockImplementation((callback) => {
        callback();
      });

      announcer.announce();

      // monitor.onの呼び出しからコールバックを取得
      const statusCall = mockMonitorInstance.on.mock.calls.find((call: any[]) => call[0] === 'status');
      const statusCallback = statusCall?.[2];

      if (statusCallback) {
        statusCallback(mockMessage);
      }

      expect(statusSpy).not.toHaveBeenCalled();
      expect(disconnectSpy).not.toHaveBeenCalled();
    });
  });

  describe('disconnect', () => {
    it('モニターのdisconnectメソッドが呼ばれるべきである / should call monitor disconnect method', () => {
      announcer.disconnect();

      expect(mockMonitorInstance.disconnect).toHaveBeenCalled();
    });
  });

  describe('型安全なイベントメソッド / Type-safe event methods', () => {
    it('onメソッドでイベントリスナーを登録できるべきである / should register event listener with on method', () => {
      const listener = vi.fn();
      const result = announcer.on('connected', listener);

      expect(result).toBe(announcer);
    });

    it('onceメソッドでイベントリスナーを登録できるべきである / should register event listener with once method', () => {
      const listener = vi.fn();
      const result = announcer.once('connected', listener);

      expect(result).toBe(announcer);
    });

    it('emitメソッドでイベントを発火できるべきである / should emit event with emit method', () => {
      const listener = vi.fn();
      announcer.on('connected', listener);

      const result = announcer.emit('connected');

      expect(result).toBe(true);
      expect(listener).toHaveBeenCalled();
    });

    it('announcedイベントでデータを渡せるべきである / should pass data with announced event', () => {
      const listener = vi.fn();
      const data = { test: 'data' };
      announcer.on('announced', listener);

      announcer.emit('announced', data);

      expect(listener).toHaveBeenCalledWith(data);
    });

    it('errorイベントでエラーオブジェクトを渡せるべきである / should pass error object with error event', () => {
      const listener = vi.fn();
      const error = new Error('test error');
      announcer.on('error', listener);

      announcer.emit('error', error);

      expect(listener).toHaveBeenCalledWith(error);
    });
  });
});
