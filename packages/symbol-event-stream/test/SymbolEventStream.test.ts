import type { SymbolWebSocketError } from '@nemnesia/symbol-websocket';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SymbolEventStream } from '../src/SymbolEventStream.js';

// WebSocketのモッククラス
class MockSymbolWebSocket {
  public on = vi.fn();
  public off = vi.fn();
  public close = vi.fn();
  public onError = vi.fn();
  public uid = 'test-uid';
  public isConnected = true;

  constructor(public options: any) {}
}

// グローバルなモックインスタンスの追跡
let mockInstances: MockSymbolWebSocket[] = [];

vi.mock('@nemnesia/symbol-websocket', () => {
  return {
    SymbolWebSocket: class {
      public on: any;
      public off: any;
      public close: any;
      public onError: any;
      public uid: string;
      public isConnected: boolean;
      public options: any;

      constructor(options: any) {
        const instance = new MockSymbolWebSocket(options);
        mockInstances.push(instance);
        this.on = instance.on;
        this.off = instance.off;
        this.close = instance.close;
        this.onError = instance.onError;
        this.uid = instance.uid;
        this.isConnected = instance.isConnected;
        this.options = instance.options;
        return instance;
      }
    },
  };
});

describe('SymbolEventStream', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockInstances = [];
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('コンストラクタ', () => {
    it('正常にインスタンス化されるべきである', () => {
      const stream = new SymbolEventStream({
        nodeUrls: ['node1.example.com', 'node2.example.com'],
        connections: 2,
      });

      expect(stream).toBeInstanceOf(SymbolEventStream);
      expect(stream.getActiveConnectionCount()).toBe(2);
    });

    it('nodeUrlsが空の場合、エラーをスローするべきである', () => {
      expect(() => {
        new SymbolEventStream({
          nodeUrls: [],
          connections: 1,
        });
      }).toThrow('nodeUrls must not be empty');
    });

    it('SSLがデフォルトでtrueであるべきである', () => {
      new SymbolEventStream({
        nodeUrls: ['node1.example.com'],
        connections: 1,
      });

      expect(mockInstances[0].options).toMatchObject({
        ssl: true,
      });
    });

    it('SSL設定を上書きできるべきである', () => {
      new SymbolEventStream({
        nodeUrls: ['node1.example.com'],
        connections: 1,
        ssl: false,
      });

      expect(mockInstances[0].options).toMatchObject({
        ssl: false,
      });
    });

    it('autoReconnectがtrueで設定されるべきである', () => {
      new SymbolEventStream({
        nodeUrls: ['node1.example.com'],
        connections: 1,
      });

      expect(mockInstances[0].options).toMatchObject({
        autoReconnect: true,
      });
    });

    it('指定された数の接続を作成するべきである', () => {
      new SymbolEventStream({
        nodeUrls: ['node1.example.com', 'node2.example.com', 'node3.example.com'],
        connections: 3,
      });

      expect(mockInstances).toHaveLength(3);
    });

    it('nodeUrlsより多い接続数を指定しても、nodeUrlsの数までしか作成しないべきである', () => {
      const stream = new SymbolEventStream({
        nodeUrls: ['node1.example.com', 'node2.example.com'],
        connections: 5,
      });

      expect(stream.getActiveConnectionCount()).toBe(2);
    });
  });

  describe('on/off メソッド', () => {
    let stream: SymbolEventStream;

    beforeEach(() => {
      stream = new SymbolEventStream({
        nodeUrls: ['node1.example.com'],
        connections: 1,
      });
    });

    afterEach(() => {
      stream.close();
    });

    it('チャネル購読時、全てのWebSocketに対してonが呼ばれるべきである', () => {
      const callback = vi.fn();

      stream.on('block', callback);

      expect(mockInstances[0].on).toHaveBeenCalledWith('block', expect.any(Function));
    });

    it('アドレス指定のチャネル購読が正しく動作するべきである', () => {
      const callback = vi.fn();
      const address = 'TCHBDENCLKEBILBPWP3JPB2XNY64OE7PYHHE32I';

      stream.on('confirmedAdded', address, callback);

      expect(mockInstances[0].on).toHaveBeenCalledWith('confirmedAdded', address, expect.any(Function));
    });

    it('同じチャネルに複数のコールバックを登録できるべきである', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      stream.on('block', callback1);
      stream.on('block', callback2);

      // 初回のみWebSocketのonが呼ばれる
      expect(mockInstances[0].on).toHaveBeenCalledTimes(1);
    });

    it('off メソッドで特定のコールバックを削除できるべきである', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      stream.on('block', callback1);
      stream.on('block', callback2);
      stream.off('block', callback1);

      // WebSocketのoffは呼ばれない（まだcallback2が残っているため）
      expect(mockInstances[0].off).not.toHaveBeenCalled();
    });

    it('off メソッドで全てのコールバックを削除するとWebSocketもoffされるべきである', () => {
      const callback = vi.fn();

      stream.on('block', callback);
      stream.off('block', callback);

      expect(mockInstances[0].off).toHaveBeenCalledWith('block');
    });

    it('off メソッドでコールバック指定なしで全て削除できるべきである', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      stream.on('block', callback1);
      stream.on('block', callback2);
      stream.off('block');

      expect(mockInstances[0].off).toHaveBeenCalledWith('block');
    });

    it('アドレス指定のoffが正しく動作するべきである', () => {
      const callback = vi.fn();
      const address = 'TCHBDENCLKEBILBPWP3JPB2XNY64OE7PYHHE32I';

      stream.on('confirmedAdded', address, callback);
      stream.off('confirmedAdded', address);

      expect(mockInstances[0].off).toHaveBeenCalledWith('confirmedAdded', address);
    });
  });

  describe('エラーハンドリング', () => {
    let stream: SymbolEventStream;

    beforeEach(() => {
      stream = new SymbolEventStream({
        nodeUrls: ['node1.example.com'],
        connections: 1,
      });
    });

    afterEach(() => {
      stream.close();
    });

    it('onErrorでエラーコールバックを登録できるべきである', () => {
      const errorCallback = vi.fn();

      stream.onError(errorCallback);

      // WebSocketのonErrorが呼ばれていることを確認
      expect(mockInstances[0].onError).toHaveBeenCalled();

      // コールバックをシミュレート
      const wsErrorCallback = mockInstances[0].onError.mock.calls[0][0];
      const error: SymbolWebSocketError = {
        type: 'network',
        severity: 'recoverable',
        host: 'node1.example.com',
        reconnecting: false,
        reconnectAttempts: 0,
        timestamp: Date.now(),
        message: 'Test error',
        originalError: new Error('Test'),
      };

      wsErrorCallback(error);

      expect(errorCallback).toHaveBeenCalledWith(error);
    });
  });

  describe('重複排除機能', () => {
    let stream: SymbolEventStream;

    beforeEach(() => {
      vi.useFakeTimers();
      stream = new SymbolEventStream({
        nodeUrls: ['node1.example.com', 'node2.example.com'],
        connections: 2,
        maxCacheSize: 5,
        cacheTtl: 10000,
      });
    });

    afterEach(() => {
      stream.close();
      vi.useRealTimers();
    });

    it('同じhashを持つメッセージは1度だけ配信されるべきである', () => {
      const callback = vi.fn();
      stream.on('block', callback);

      // WebSocketのonコールバックを取得
      const wsCallback = mockInstances[0].on.mock.calls[0][1];

      // 同じhashのメッセージを2回送信
      const message = { meta: { hash: 'test-hash-123' }, data: 'test' };
      wsCallback(message);
      wsCallback(message);

      // コールバックは1度だけ呼ばれる
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('異なるhashを持つメッセージは両方配信されるべきである', () => {
      const callback = vi.fn();
      stream.on('block', callback);

      const wsCallback = mockInstances[0].on.mock.calls[0][1];

      wsCallback({ meta: { hash: 'hash-1' }, data: 'test1' });
      wsCallback({ meta: { hash: 'hash-2' }, data: 'test2' });

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('TTL経過後は同じhashでも再配信されるべきである', () => {
      const callback = vi.fn();
      stream.on('block', callback);

      const wsCallback = mockInstances[0].on.mock.calls[0][1];

      const message = { meta: { hash: 'test-hash-123' }, data: 'test' };

      wsCallback(message);
      expect(callback).toHaveBeenCalledTimes(1);

      // TTL経過
      vi.advanceTimersByTime(11000);

      wsCallback(message);
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('maxCacheSizeを超えると古いキャッシュが削除されるべきである', () => {
      const callback = vi.fn();
      stream.on('block', callback);

      const wsCallback = mockInstances[0].on.mock.calls[0][1];

      // maxCacheSize + 1 個のメッセージを送信
      for (let i = 0; i < 6; i++) {
        wsCallback({ meta: { hash: `hash-${i}` }, data: `test${i}` });
      }

      expect(callback).toHaveBeenCalledTimes(6);

      // 最初のhashは削除されているはずなので、再送信されるべき
      wsCallback({ meta: { hash: 'hash-0' }, data: 'test0' });
      expect(callback).toHaveBeenCalledTimes(7);
    });

    it('hashがないメッセージは重複排除されないべきである', () => {
      const callback = vi.fn();
      stream.on('block', callback);

      const wsCallback = mockInstances[0].on.mock.calls[0][1];

      const message = { data: 'test-without-hash' };
      wsCallback(message);
      wsCallback(message);

      // hashがないので両方配信される
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('meta.hashの他にhashやuidもサポートするべきである', () => {
      const callback = vi.fn();
      stream.on('block', callback);

      const wsCallback = mockInstances[0].on.mock.calls[0][1];

      // meta.hashがない場合、hashを使用
      wsCallback({ hash: 'direct-hash', data: 'test1' });
      wsCallback({ hash: 'direct-hash', data: 'test1' });

      expect(callback).toHaveBeenCalledTimes(1);

      // hashもない場合、uidを使用
      wsCallback({ uid: 'unique-id', data: 'test2' });
      wsCallback({ uid: 'unique-id', data: 'test2' });

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('期限切れキャッシュが定期的にクリーンアップされるべきである', () => {
      const callback = vi.fn();
      stream.on('block', callback);

      const wsCallback = mockInstances[0].on.mock.calls[0][1];

      // いくつかのメッセージを送信
      wsCallback({ meta: { hash: 'hash-1' }, data: 'test1' });
      wsCallback({ meta: { hash: 'hash-2' }, data: 'test2' });

      // TTLの半分経過（クリーンアップ実行）
      vi.advanceTimersByTime(5000);

      // まだTTL内なので再送信されない
      wsCallback({ meta: { hash: 'hash-1' }, data: 'test1' });
      expect(callback).toHaveBeenCalledTimes(2);

      // TTL経過後、さらにクリーンアップ実行
      vi.advanceTimersByTime(6000);

      // 期限切れなので再送信される
      wsCallback({ meta: { hash: 'hash-1' }, data: 'test1' });
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });

  describe('close メソッド', () => {
    it('全てのWebSocketを閉じるべきである', () => {
      const stream = new SymbolEventStream({
        nodeUrls: ['node1.example.com', 'node2.example.com'],
        connections: 2,
      });

      stream.close();

      expect(mockInstances[0].close).toHaveBeenCalled();
      expect(mockInstances[1].close).toHaveBeenCalled();
    });

    it('closeフラグがtrueになるべきである', () => {
      const stream = new SymbolEventStream({
        nodeUrls: ['node1.example.com'],
        connections: 1,
      });

      expect(stream.getIsClosed()).toBe(false);

      stream.close();

      expect(stream.getIsClosed()).toBe(true);
    });

    it('2回呼んでも問題ないべきである', () => {
      const stream = new SymbolEventStream({
        nodeUrls: ['node1.example.com'],
        connections: 1,
      });

      stream.close();
      stream.close();

      expect(stream.getIsClosed()).toBe(true);
    });

    it('クリーンアップタイマーが停止されるべきである', () => {
      vi.useFakeTimers();

      const stream = new SymbolEventStream({
        nodeUrls: ['node1.example.com'],
        connections: 1,
      });

      stream.close();

      // タイマーが進んでもクリーンアップが実行されないことを確認
      vi.advanceTimersByTime(100000);

      // エラーが発生しないことを確認
      expect(stream.getIsClosed()).toBe(true);

      vi.useRealTimers();
    });
  });

  describe('ヘルパーメソッド', () => {
    it('getActiveConnectionCount が正しい接続数を返すべきである', () => {
      const stream = new SymbolEventStream({
        nodeUrls: ['node1.example.com', 'node2.example.com', 'node3.example.com'],
        connections: 2,
      });

      expect(stream.getActiveConnectionCount()).toBe(2);

      stream.close();
    });

    it('getIsClosed がクローズ状態を正しく返すべきである', () => {
      const stream = new SymbolEventStream({
        nodeUrls: ['node1.example.com'],
        connections: 1,
      });

      expect(stream.getIsClosed()).toBe(false);

      stream.close();

      expect(stream.getIsClosed()).toBe(true);
    });
  });

  describe('ノード選択', () => {
    it('ランダムにノードが選択されるべきである', () => {
      // 複数回実行してランダム性を確認
      const hosts = new Set<string>();

      for (let i = 0; i < 10; i++) {
        vi.clearAllMocks();
        mockInstances = [];

        new SymbolEventStream({
          nodeUrls: ['node1.example.com', 'node2.example.com', 'node3.example.com', 'node4.example.com'],
          connections: 2,
        });

        const firstCall = mockInstances[0].options;
        hosts.add(firstCall.host);
      }

      // 複数のホストが選択されていることを確認（完全にランダムなので必ず全て選ばれるわけではない）
      expect(hosts.size).toBeGreaterThan(1);
    });
  });
});
