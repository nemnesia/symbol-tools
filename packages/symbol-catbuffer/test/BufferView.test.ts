import { describe, expect, it } from 'vitest';

import BufferView from '../src/BufferView.js';

describe('BufferView', () => {
  it('バッファを保持', () => {
    const buf = new Uint8Array([1, 2, 3, 4, 5]);
    const view = new BufferView(buf);

    expect(view.buffer).toEqual(buf);
  });

  describe('shiftRight', () => {
    it('指定バイト数だけビューを右にシフト', () => {
      const buf = new Uint8Array([1, 2, 3, 4, 5]);
      const view = new BufferView(buf);

      view.shiftRight(2);

      expect(view.buffer.length).toBe(3);
      expect(view.buffer[0]).toBe(3);
      expect(view.buffer[1]).toBe(4);
      expect(view.buffer[2]).toBe(5);
    });

    it('全体をシフトすると空になる', () => {
      const buf = new Uint8Array([1, 2, 3]);
      const view = new BufferView(buf);

      view.shiftRight(3);

      expect(view.buffer.length).toBe(0);
    });
  });

  describe('window', () => {
    it('指定サイズの新しいビューを返す', () => {
      const buf = new Uint8Array([1, 2, 3, 4, 5]);
      const view = new BufferView(buf);

      const windowView = view.window(3);

      expect(windowView.length).toBe(3);
      expect(windowView[0]).toBe(1);
      expect(windowView[1]).toBe(2);
      expect(windowView[2]).toBe(3);
      expect(view.buffer.length).toBe(5); // 元のビューは変わらない
    });

    it('サイズ超過でエラー', () => {
      const buf = new Uint8Array([1, 2, 3]);
      const view = new BufferView(buf);

      expect(() => view.window(5)).toThrow(RangeError);
      expect(() => view.window(5)).toThrow('invalid shrink value');
    });
  });

  describe('shrink', () => {
    it('ビューを指定サイズに縮小', () => {
      const buf = new Uint8Array([1, 2, 3, 4, 5]);
      const view = new BufferView(buf);

      view.shrink(3);

      expect(view.buffer.length).toBe(3);
      expect(view.buffer[0]).toBe(1);
      expect(view.buffer[1]).toBe(2);
      expect(view.buffer[2]).toBe(3);
    });

    it('サイズ超過でエラー', () => {
      const buf = new Uint8Array([1, 2, 3]);
      const view = new BufferView(buf);

      expect(() => view.shrink(5)).toThrow(RangeError);
    });
  });
});
