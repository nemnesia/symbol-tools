import { describe, expect, it } from 'vitest';

import Writer from '../src/utils/Writer.js';

describe('Writer', () => {
  it('指定サイズでバッファが作成される', () => {
    const writer = new Writer(10);
    expect(writer.storage.length).toBe(10);
    expect(writer.offset).toBe(0);
  });

  it('データを書き込み、offsetが進む', () => {
    const writer = new Writer(10);
    writer.write(new Uint8Array([0x01, 0x02, 0x03]));

    expect(writer.offset).toBe(3);
    expect(writer.storage[0]).toBe(0x01);
    expect(writer.storage[1]).toBe(0x02);
    expect(writer.storage[2]).toBe(0x03);
  });

  it('複数回の書き込みが連続する', () => {
    const writer = new Writer(10);
    writer.write(new Uint8Array([0x01, 0x02]));
    writer.write(new Uint8Array([0x03, 0x04]));

    expect(writer.offset).toBe(4);
    expect(writer.storage[0]).toBe(0x01);
    expect(writer.storage[1]).toBe(0x02);
    expect(writer.storage[2]).toBe(0x03);
    expect(writer.storage[3]).toBe(0x04);
  });

  it('配列からの書き込みも可能', () => {
    const writer = new Writer(5);
    writer.write([0xaa, 0xbb]);

    expect(writer.offset).toBe(2);
    expect(writer.storage[0]).toBe(0xaa);
    expect(writer.storage[1]).toBe(0xbb);
  });
});
