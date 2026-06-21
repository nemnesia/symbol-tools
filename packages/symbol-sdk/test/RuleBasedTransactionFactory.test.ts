import { describe, expect, it } from 'vitest';

import BaseValue from '../src/BaseValue.js';
import ByteArray from '../src/ByteArray.js';
import RuleBasedTransactionFactory from '../src/RuleBasedTransactionFactory.js';

class TestPod extends BaseValue {
  static SIZE = 1;

  static NAME = 'TestPod';

  constructor(value = 0) {
    super(TestPod.SIZE, value);
  }
}

class TestEnum {
  static RED = new TestEnum(1);

  static BLUE = new TestEnum(2);

  value: number;

  constructor(value: number) {
    this.value = value;
  }
}

class TestFlags {
  static ALPHA = { value: 1 };

  static BETA = { value: 2 };

  value: number;

  constructor(value: number) {
    this.value = value;
  }
}

class EmbeddedBytes extends ByteArray {
  static NAME = 'EmbeddedBytes';

  constructor(bytes = new Uint8Array([1, 2])) {
    super(2, bytes);
  }
}

class TestEntity {
  static TYPE_HINTS = {
    amount: 'pod:TestPod',
    mode: 'enum:TestEnum',
    flags: 'enum:TestFlags',
    list: 'array[TestPod]',
  };

  amount = new TestPod();

  mode = TestEnum.RED;

  flags = new TestFlags(0);

  list = [new TestPod()];

  message = '';

  data = new EmbeddedBytes();

  metadata = {
    title: '',
    nested: {
      note: '',
    },
    entries: [{ label: '' }],
    optional: null,
  };
}

const createFactory = (overrides?: Map<Function, Function>) => {
  const module = {
    TestPod,
    TestEnum,
    TestFlags,
    EmbeddedBytes,
    TestEntity,
  };

  return new RuleBasedTransactionFactory(module, undefined, overrides as unknown as Map<string, Function> | undefined);
};

describe('RuleBasedTransactionFactoryのテスト', () => {
  it('addArrayParserは要素ルールがないと例外を投げる', () => {
    const factory = createFactory();
    expect(() => factory.addArrayParser('missing')).toThrowError(
      'cannot create array type parser because element rule "missing" is unknown'
    );
  });

  it('addPodParserはoverride指定時にそれを使用する', () => {
    const overrides = new Map<Function, Function>([[TestPod, () => new TestPod(99)]]);
    const factory = createFactory(overrides);

    factory.addPodParser('TestPod', TestPod);

    const parser = factory.rules.get('TestPod');
    const parsed = parser?.(1) as TestPod;
    expect(parsed.value).toBe(99);
  });

  it('addEnumParserとaddFlagsParserは文字列と整数をパースできる', () => {
    const factory = createFactory();
    factory.addEnumParser('TestEnum');
    factory.addFlagsParser('TestFlags');

    const enumParser = factory.rules.get('TestEnum');
    const flagsParser = factory.rules.get('TestFlags');

    expect(enumParser?.('red')).toBe(TestEnum.RED);
    expect((enumParser?.(3) as TestEnum).value).toBe(3);
    expect(enumParser?.(TestEnum.BLUE)).toBe(TestEnum.BLUE);

    expect((flagsParser?.('alpha beta') as TestFlags).value).toBe(3);
    expect((flagsParser?.(5) as TestFlags).value).toBe(5);

    expect(() => enumParser?.('unknown')).toThrowError('unknown value unknown for type TestEnum');
    expect(() => flagsParser?.('gamma')).toThrowError('unknown value gamma for type TestFlags');
  });

  it('autodetectはBaseValue継承PODルールを登録する', () => {
    const factory = createFactory();
    factory.autodetect();

    const parser = factory.rules.get('TestPod');
    expect(parser).toBeDefined();
    expect((parser?.(7) as TestPod).value).toBe(7);
  });

  it('createFromFactoryはルール適用・型変換・文字列自動エンコードを行う', () => {
    const factory = createFactory();
    factory.addPodParser('TestPod', TestPod);
    factory.addEnumParser('TestEnum');
    factory.addFlagsParser('TestFlags');
    factory.addArrayParser('TestPod');

    const descriptor = {
      type: 'entity_v1',
      amount: 9,
      mode: 'blue',
      flags: 'alpha beta',
      list: [1, 2],
      message: 'hello',
      data: new EmbeddedBytes(new Uint8Array([7, 8])),
    };

    const entity = factory.createFromFactory(() => new TestEntity(), descriptor) as TestEntity;

    expect(entity.amount).toBeInstanceOf(TestPod);
    expect(entity.amount.value).toBe(9);
    expect(entity.mode).toBe(TestEnum.BLUE);
    expect(entity.flags.value).toBe(3);
    expect(entity.list.map((item) => item.value)).toEqual([1, 2]);
    expect(entity.message).toEqual(new TextEncoder().encode('hello'));
    expect(entity.data).toBeInstanceOf(EmbeddedBytes);
    expect(entity.data.bytes).toEqual(new Uint8Array([7, 8]));
  });

  it('createFromFactoryはネストした文字列も再帰的に自動エンコードできる', () => {
    const factory = createFactory();
    factory.addPodParser('TestPod', TestPod);
    factory.addEnumParser('TestEnum');
    factory.addFlagsParser('TestFlags');
    factory.addArrayParser('TestPod');

    const descriptor = {
      type: 'entity_v1',
      amount: 1,
      mode: 'red',
      flags: 'alpha',
      list: [1],
      message: 'root',
      data: new EmbeddedBytes(new Uint8Array([1, 2])),
      metadata: {
        title: 'top',
        nested: {
          note: 'deep',
        },
        entries: [{ label: 'a' }, { label: 'b' }],
        optional: null,
      },
    };

    const entity = factory.createFromFactory(() => new TestEntity(), descriptor) as TestEntity;

    expect(entity.message).toEqual(new TextEncoder().encode('root'));
    expect(entity.metadata.title).toEqual(new TextEncoder().encode('top'));
    expect(entity.metadata.nested.note).toEqual(new TextEncoder().encode('deep'));
    expect(entity.metadata.entries[0].label).toEqual(new TextEncoder().encode('a'));
    expect(entity.metadata.entries[1].label).toEqual(new TextEncoder().encode('b'));
    expect(entity.metadata.optional).toBeNull();
  });
});
