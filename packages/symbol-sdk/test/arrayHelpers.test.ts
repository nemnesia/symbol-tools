import { describe, expect, it } from 'vitest';

import {
  alignUp,
  deepCompare,
  readArray,
  readArrayCount,
  readVariableSizeElements,
  size,
  writeArray,
  writeArrayCount,
  writeVariableSizeElements,
} from '../src/utils/arrayHelpers.js';

class FixedElement {
  value: number;

  size: number;

  constructor(value: number, elementSize = 1) {
    this.value = value;
    this.size = elementSize;
  }

  serialize() {
    return new Uint8Array([this.value]);
  }

  static deserialize(buffer: Uint8Array) {
    return new FixedElement(buffer[0], 1);
  }
}

class InvalidElement {
  static deserialize() {
    return { size: 0, serialize: () => new Uint8Array() };
  }
}

class VariableElement {
  payload: Uint8Array;

  size: number;

  constructor(payload: Uint8Array) {
    this.payload = payload;
    this.size = payload.length + 1;
  }

  serialize() {
    return new Uint8Array([this.size, ...this.payload]);
  }

  static deserialize(buffer: Uint8Array) {
    const totalSize = buffer[0];
    return new VariableElement(buffer.slice(1, totalSize));
  }
}

class OutputCollector {
  chunks: number[] = [];

  write(bytes: Uint8Array) {
    this.chunks.push(...bytes);
  }

  asUint8Array() {
    return new Uint8Array(this.chunks);
  }
}

describe('arrayHelpersのテスト', () => {
  it('deepCompareはプリミティブとネスト配列を比較できる', () => {
    expect(deepCompare(1 as unknown as object, 1 as unknown as object)).toBe(0);
    expect(deepCompare(1 as unknown as object, 2 as unknown as object)).toBe(-1);
    expect(deepCompare([1, [2, 3]], [1, [2, 4]])).toBe(-1);
    expect(deepCompare(new Uint8Array([1, 2]), new Uint8Array([1, 2]))).toBe(0);
  });

  it('alignUpとsizeはアライン済みサイズを計算できる', () => {
    expect(alignUp(5, 4)).toBe(8);

    const elements = [new FixedElement(1, 3), new FixedElement(2, 5)];
    expect(size(elements)).toBe(8);
    expect(size(elements, 4, false)).toBe(12);
    expect(size(elements, 4, true)).toBe(9);
  });

  it('readArrayとreadArrayCountは期待個数の要素を復元できる', () => {
    const buffer = new Uint8Array([3, 1, 2]);

    const all = readArray(buffer, FixedElement);
    const counted = readArrayCount(buffer, FixedElement, 2);

    expect(all.map((e) => (e as FixedElement).value)).toEqual([3, 1, 2]);
    expect(counted.map((e) => (e as FixedElement).value)).toEqual([3, 1]);
  });

  it('readArrayは要素サイズとソート順を検証する', () => {
    expect(() => readArray(new Uint8Array([1]), InvalidElement as any)).toThrowError('element size has invalid size');

    expect(() =>
      readArray(new Uint8Array([2, 1]), FixedElement as any, (element: unknown) => (element as FixedElement).value)
    ).toThrowError('elements in array are not sorted');
  });

  it('writeArrayとwriteArrayCountは直列化しソート順を強制する', () => {
    const output = new OutputCollector();
    const elements = [new FixedElement(1), new FixedElement(2), new FixedElement(3)];

    writeArray(output as any, elements);
    expect(output.asUint8Array()).toEqual(new Uint8Array([1, 2, 3]));

    const outputCount = new OutputCollector();
    writeArrayCount(outputCount as any, elements, 2);
    expect(outputCount.asUint8Array()).toEqual(new Uint8Array([1, 2]));

    const unsorted = [new FixedElement(2), new FixedElement(1)];
    expect(() =>
      writeArray(new OutputCollector() as any, unsorted, (element: unknown) => (element as FixedElement).value)
    ).toThrowError('array passed to write array is not sorted');
  });

  it('可変長要素のread/writeはアラインメントと境界を処理する', () => {
    const elementA = new VariableElement(new Uint8Array([9, 9]));
    const elementB = new VariableElement(new Uint8Array([8]));

    const writer = new OutputCollector();
    writeVariableSizeElements(writer as any, [elementA, elementB], 4, false);
    const serialized = writer.asUint8Array();

    const parsed = readVariableSizeElements(serialized, VariableElement as any, 4, false);
    expect(parsed).toHaveLength(2);

    expect(() => readVariableSizeElements(new Uint8Array([5, 1, 2]), VariableElement as any, 4, false)).toThrowError(
      'unexpected buffer length'
    );
  });

  it('readVariableSizeElementsはskipLastElementPadding分岐を通る', () => {
    const single = new VariableElement(new Uint8Array([7, 7, 7]));
    const serialized = single.serialize();

    const parsed = readVariableSizeElements(serialized, VariableElement as any, 8, true);
    expect(parsed).toHaveLength(1);
    expect((parsed[0] as VariableElement).payload).toEqual(new Uint8Array([7, 7, 7]));
  });

  it('skipLastElementPadding=trueで中間要素は通常アラインされる', () => {
    const elementA = new VariableElement(new Uint8Array([1]));
    const elementB = new VariableElement(new Uint8Array([2, 2]));

    const writer = new OutputCollector();
    writeVariableSizeElements(writer as any, [elementA, elementB], 4, true);
    const serialized = writer.asUint8Array();

    const parsed = readVariableSizeElements(serialized, VariableElement as any, 4, true);
    expect(parsed).toHaveLength(2);
  });
});
