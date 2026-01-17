import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { NemWebSocket } from '../src/NemWebSocket.js';
import type { NemWebSocketOptions } from '../src/nem.types.js';

// モック用
vi.mock('@stomp/stompjs', () => ({
  Client: function ClientMock() {
    return {
      activate: vi.fn(),
      subscribe: vi.fn(() => ({ unsubscribe: vi.fn() })),
      unsubscribe: vi.fn(),
      deactivate: vi.fn(),
      onWebSocketError: undefined,
      onWebSocketClose: undefined,
      onConnect: undefined,
    };
  },
}));
vi.mock('isomorphic-ws', () => ({
  default: function WebSocketMock() {
    return {};
  },
}));

const defaultOptions: NemWebSocketOptions = {
  host: 'localhost',
  timeout: 1000,
  ssl: false,
};

describe('NemWebSocket', () => {
  let monitor: NemWebSocket;
  let clientMock: any;

  beforeEach(() => {
    monitor = new NemWebSocket(defaultOptions);
    clientMock = monitor.client;
  });

  it('エラーなくインスタンス化されるべきである', () => {
    expect(monitor).toBeInstanceOf(NemWebSocket);
  });

  it('エラーコールバックが登録され、エラー時に呼び出されるべきである', () => {
    const cb = vi.fn();
    monitor.onError(cb);
    // @ts-ignore
    monitor.errorCallbacks[0]({
      type: 'network',
      severity: 'recoverable',
      host: 'localhost',
      reconnecting: false,
      reconnectAttempts: 0,
      originalError: new Error('error'),
      timestamp: Date.now(),
      message: 'error',
    });
    expect(cb).toHaveBeenCalled();
  });

  it('クローズコールバックが登録され、クローズ時に呼び出されるべきである', () => {
    const cb = vi.fn();
    monitor.onClose(cb);
    // @ts-ignore
    monitor.onCloseCallback({ type: 'close' });
    expect(cb).toHaveBeenCalled();
  });

  it('addressが必要だが提供されていない場合、例外がスローされるべきである', () => {
    // nemChannelPathsのaccountはfunction型
    expect(() => {
      monitor.on('account', vi.fn());
    }).toThrow();
  });

  it('接続されていない場合、pendingSubscribesにプッシュされるべきである', () => {
    // @ts-ignore
    monitor._isConnected = false;
    monitor.on('blocks', vi.fn());
    // @ts-ignore
    expect(monitor.pendingSubscribes.length).toBe(1);
  });

  it('接続されている場合、subscribeが呼び出されるべきである', () => {
    // @ts-ignore
    monitor._isConnected = true;
    const spy = vi.spyOn(clientMock, 'subscribe');
    monitor.on('blocks', vi.fn());
    expect(spy).toHaveBeenCalled();
  });

  it('unsubscribeが呼び出されるべきである', () => {
    const spy = vi.spyOn(clientMock, 'unsubscribe');
    monitor.off('blocks');
    expect(spy).toHaveBeenCalled();
  });

  it('接続時にすべてのpendingSubscribesが実行されるべきである', () => {
    // @ts-ignore
    monitor._isConnected = false;
    const cb = vi.fn();
    monitor.on('blocks', cb);
    // @ts-ignore
    expect(monitor.pendingSubscribes.length).toBe(1);
    // onConnectを呼ぶ
    // @ts-ignore
    monitor.client.onConnect();
    // pendingSubscribesが空になっていること
    // @ts-ignore
    expect(monitor.pendingSubscribes.length).toBe(0);
  });

  it('サブスクライブされたメッセージを受信したときにコールバックが呼び出されるべきである', () => {
    // @ts-ignore
    monitor._isConnected = true;
    const cb = vi.fn();
    monitor.on('blocks', cb);
    // subscribe時のコールバックを取得
    const subscribeCall = clientMock.subscribe.mock.calls[0];
    const handler = subscribeCall[1];
    handler({ body: 'test-message' });
    expect(cb).toHaveBeenCalledWith('test-message');
  });

  it('クライアントからのエラーおよびクローズイベントが伝播されるべきである', () => {
    const errorCb = vi.fn();
    const closeCb = vi.fn();
    monitor.onError(errorCb);
    monitor.onClose(closeCb);
    monitor.client.onWebSocketError({ type: 'error' });
    monitor.client.onWebSocketClose({ type: 'close' });
    expect(errorCb).toHaveBeenCalled();
    expect(closeCb).toHaveBeenCalled();
  });

  it('エラーコールバックが未登録の場合は警告が出力されるべきである', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    monitor.client.onWebSocketError({ type: 'error' } as any);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('接続時にuidが設定され、取得できるべきである', () => {
    // @ts-ignore
    monitor.client.onConnect({ headers: { session: 'session-1' } });
    expect(monitor.uid).toBe('session-1');
  });

  it('フレームにuidがない場合、フォールバックが設定されるべきである', () => {
    // @ts-ignore
    monitor.client.onConnect({ headers: {} });
    expect(monitor.uid).toBe('localhost:7778');
  });

  it('isConnectedは接続状態を返すべきである', () => {
    // @ts-ignore
    monitor._isConnected = false;
    expect(monitor.isConnected).toBe(false);
    // @ts-ignore
    monitor._isConnected = true;
    expect(monitor.isConnected).toBe(true);
  });

  it('clientが取得できるべきである', () => {
    expect(monitor.client).toBeDefined();
  });

  describe('追加の挙動', () => {
    let monitor: NemWebSocket;
    let clientMock: any;

    beforeEach(() => {
      monitor = new NemWebSocket(defaultOptions);
      clientMock = monitor.client;
    });

    it('SSL=true でインスタンス化でき、例外をスローしない', () => {
      const options: NemWebSocketOptions = { host: 'example', timeout: 1234, ssl: true };
      expect(() => new NemWebSocket(options)).not.toThrow();
    });

    it('切断すると、すべてのサブスクリプションが解除され、クライアントが無効化されます', () => {
      // @ts-ignore
      monitor._isConnected = true;
      const unsubSpy = vi.fn();
      // @ts-ignore
      monitor.subscriptions.set('/test', { unsubscribe: unsubSpy });
      // ensure client has deactivate
      clientMock.deactivate = vi.fn();

      monitor.disconnect();

      expect(unsubSpy).toHaveBeenCalled();
      expect(clientMock.deactivate).toHaveBeenCalled();
      // @ts-ignore
      expect(monitor.subscriptions.size).toBe(0);
    });

    it('closeはdisconnectのエイリアスとして動作するべきである', () => {
      // @ts-ignore
      monitor._isConnected = true;
      // @ts-ignore
      monitor._uid = 'uid-1';
      clientMock.deactivate = vi.fn();

      monitor.close();

      expect(clientMock.deactivate).toHaveBeenCalled();
      expect(monitor.uid).toBeNull();
    });
  });

  describe('再接続機能', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('自動再接続が有効な場合、切断時に再接続を試みるべきである', () => {
      const options: NemWebSocketOptions = {
        host: 'localhost',
        timeout: 1000,
        ssl: false,
        autoReconnect: true,
        reconnectInterval: 1000,
      };
      const reconnectMonitor = new NemWebSocket(options);

      const reconnectCallback = vi.fn();
      reconnectMonitor.onReconnect(reconnectCallback);

      // @ts-ignore
      reconnectMonitor.isManualDisconnect = false;
      // @ts-ignore
      reconnectMonitor.client.onWebSocketClose({ type: 'close' });

      vi.advanceTimersByTime(1000);

      expect(reconnectCallback).toHaveBeenCalledWith(1);
    });

    it('maxReconnectAttemptsに達したら再接続を停止するべきである', () => {
      const options: NemWebSocketOptions = {
        host: 'localhost',
        timeout: 1000,
        ssl: false,
        autoReconnect: true,
        maxReconnectAttempts: 2,
        reconnectInterval: 500,
      };
      const reconnectMonitor = new NemWebSocket(options);

      // @ts-ignore
      reconnectMonitor.isManualDisconnect = false;

      // 1回目
      // @ts-ignore
      reconnectMonitor.client.onWebSocketClose({ type: 'close' });
      vi.advanceTimersByTime(500);

      // 2回目
      // @ts-ignore
      reconnectMonitor.client.onWebSocketClose({ type: 'close' });
      vi.advanceTimersByTime(500);

      // 3回目は試みない
      // @ts-ignore
      reconnectMonitor.client.onWebSocketClose({ type: 'close' });
      vi.advanceTimersByTime(500);

      // @ts-ignore
      expect(reconnectMonitor.reconnectAttempts).toBe(2);
    });

    it('手動切断時は再接続しないべきである', () => {
      const options: NemWebSocketOptions = {
        host: 'localhost',
        timeout: 1000,
        ssl: false,
        autoReconnect: true,
      };
      const reconnectMonitor = new NemWebSocket(options);

      const reconnectCallback = vi.fn();
      reconnectMonitor.onReconnect(reconnectCallback);

      reconnectMonitor.disconnect();
      // @ts-ignore
      reconnectMonitor.client.onWebSocketClose({ type: 'close' });

      vi.advanceTimersByTime(5000);

      expect(reconnectCallback).not.toHaveBeenCalled();
    });

    it('再接続成功時にactiveSubscriptionsを復元するべきである', () => {
      // @ts-ignore
      monitor._isConnected = true;

      const cb1 = vi.fn();
      const cb2 = vi.fn();

      // 既にサブスクライブ済み
      monitor.on('blocks', cb1);
      // @ts-ignore
      const subscribePath = 'blocks';
      // @ts-ignore
      monitor.activeSubscriptions.set(subscribePath, cb2);

      const subscribeSpy = vi.spyOn(monitor.client, 'subscribe');

      // 再接続をシミュレート
      // @ts-ignore
      monitor._isConnected = false;
      // @ts-ignore
      monitor.client.onConnect();

      // activeSubscriptionsの復元を確認
      expect(subscribeSpy).toHaveBeenCalled();
    });

    it('手動切断フラグが立っている場合は再接続を開始しないべきである', () => {
      const options: NemWebSocketOptions = {
        host: 'localhost',
        timeout: 1000,
        ssl: false,
        autoReconnect: true,
        reconnectInterval: 1000,
      };
      const reconnectMonitor = new NemWebSocket(options);
      const reconnectCallback = vi.fn();
      reconnectMonitor.onReconnect(reconnectCallback);

      // @ts-ignore
      reconnectMonitor.isManualDisconnect = true;
      // @ts-ignore
      reconnectMonitor.client.onWebSocketClose({ type: 'close' });

      vi.advanceTimersByTime(1000);

      expect(reconnectCallback).not.toHaveBeenCalled();
    });
  });

  describe('接続コールバック', () => {
    it('onConnectコールバックが接続時に呼び出されるべきである', () => {
      const connectCallback = vi.fn();
      monitor.onConnect(connectCallback);

      // @ts-ignore
      monitor.client.onConnect();

      expect(connectCallback).toHaveBeenCalledWith('localhost:7778');
    });

    it('既に接続済みの場合、onConnectは即座に呼び出されるべきである', () => {
      // @ts-ignore
      monitor._isConnected = true;
      // @ts-ignore
      monitor._uid = 'uid-1';

      const connectCallback = vi.fn();
      monitor.onConnect(connectCallback);

      expect(connectCallback).toHaveBeenCalledWith('uid-1');
    });
  });
});
