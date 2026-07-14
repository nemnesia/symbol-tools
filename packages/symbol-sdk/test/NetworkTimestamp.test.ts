import { describe, expect, it } from 'vitest';

import { NetworkTimestamp, NetworkTimestampDatetimeConverter } from '../src/NetworkTimestamp.js';

class TestTimestamp extends NetworkTimestamp {
  addSeconds(count: number | bigint) {
    return new TestTimestamp(this.timestamp + BigInt(count));
  }
}

describe('NetworkTimestampのテスト', () => {
  describe('基本動作', () => {
    it('タイムスタンプをbigintとして保持する', () => {
      const timestamp = new TestTimestamp(1234);
      expect(timestamp.timestamp).toBe(1234n);
    });

    it('isEpochalは0のときのみtrueになる', () => {
      expect(new TestTimestamp(0n).isEpochal).toBe(true);
      expect(new TestTimestamp(1n).isEpochal).toBe(false);
    });

    it('基底クラスのaddSecondsは抽象メソッド例外を投げる', () => {
      const timestamp = new NetworkTimestamp(10n);
      expect(() => timestamp.addSeconds(1)).toThrowError('`addSeconds` must be implemented by concrete class');
    });

    it('addMinutesはaddSecondsへ委譲する', () => {
      const timestamp = new TestTimestamp(10n);
      expect(timestamp.addMinutes(2).timestamp).toBe(130n);
    });

    it('addHoursはaddMinutesへ委譲する', () => {
      const timestamp = new TestTimestamp(10n);
      expect(timestamp.addHours(2).timestamp).toBe(7210n);
    });

    it('toStringは10進文字列を返す', () => {
      const timestamp = new TestTimestamp(999n);
      expect(timestamp.toString()).toBe('999');
    });
  });
});

describe('NetworkTimestampDatetimeConverterのテスト', () => {
  const epoch = new Date(Date.UTC(2022, 0, 1, 0, 0, 0));

  it('秒単位のネットワーク時刻をDateへ変換できる', () => {
    const converter = new NetworkTimestampDatetimeConverter(epoch, 'seconds');
    expect(converter.toDatetime(90).toISOString()).toBe('2022-01-01T00:01:30.000Z');
  });

  it('Dateとの差分を秒へ変換できる', () => {
    const converter = new NetworkTimestampDatetimeConverter(epoch, 'seconds');
    const reference = new Date(Date.UTC(2022, 0, 1, 1, 0, 0));
    expect(converter.toDifference(reference)).toBe(3600);
  });

  it('ミリ秒単位のtime unitを扱える', () => {
    const converter = new NetworkTimestampDatetimeConverter(epoch, 'milliseconds');
    expect(converter.toDifference(new Date(epoch.getTime() + 1500))).toBe(1500);
  });

  it('参照日時がepochより前なら例外を投げる', () => {
    const converter = new NetworkTimestampDatetimeConverter(epoch, 'minutes');
    expect(() => converter.toDifference(new Date(epoch.getTime() - 1))).toThrowError(
      'timestamp cannot be before epoch'
    );
  });
});
