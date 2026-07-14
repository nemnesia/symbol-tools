import { describe, expect, it } from 'vitest';

import { PublicKey } from '../src/CryptoTypes.js';
import { Network, NetworkLocator } from '../src/Network.js';
import { NetworkTimestamp, NetworkTimestampDatetimeConverter } from '../src/NetworkTimestamp.js';

class TestTimestamp extends NetworkTimestamp {
  addSeconds(count: number | bigint) {
    return new TestTimestamp(this.timestamp + BigInt(count));
  }
}

class MockAddress {
  static ENCODED_SIZE = 40;

  static encodedToBytes = new Map<string, Uint8Array>();

  bytes: Uint8Array;

  constructor(addressInput: string | Uint8Array) {
    if ('string' === typeof addressInput) {
      const mapped = MockAddress.encodedToBytes.get(addressInput);
      if (!mapped) throw new Error('unknown encoded address');

      this.bytes = new Uint8Array(mapped);
      return;
    }

    this.bytes = new Uint8Array(addressInput);
  }
}

const createMockHasher = () => {
  let lastInput = new Uint8Array([0]);

  return {
    update: (bytes: Uint8Array) => {
      lastInput = bytes.length ? new Uint8Array(bytes) : new Uint8Array([0]);
    },
    digest: () => {
      const digest = new Uint8Array(32);
      for (let i = 0; i < digest.length; ++i) digest[i] = (lastInput[i % lastInput.length] + i) & 0xff;

      return digest;
    },
  };
};

const createNetwork = (name = 'mocknet', identifier = 0x68) => {
  const epoch = new Date(Date.UTC(2024, 0, 1, 0, 0, 0));
  const converter = new NetworkTimestampDatetimeConverter(epoch, 'seconds');
  const createAddress = (version: Uint8Array, checksum: Uint8Array) =>
    new MockAddress(new Uint8Array([...version, ...checksum]));

  return new Network(name, identifier, converter, createMockHasher, createAddress, MockAddress as any, TestTimestamp);
};

describe('Networkのテスト', () => {
  it('publicKeyToAddressはネットワーク識別子付きの決定的アドレスを返す', () => {
    const network = createNetwork('main', 0x98);
    const publicKey = new PublicKey('B4F12E7C9F6946091E2CB8B6D3A12B50D17CCBBF646386EA27CE2946A7423DCF');

    const address1 = network.publicKeyToAddress(publicKey);
    const address2 = network.publicKeyToAddress(publicKey);

    expect(address1.bytes[0]).toBe(0x98);
    expect(address1.bytes).toEqual(address2.bytes);
  });

  it('isValidAddressStringは文字列長が不正ならfalseを返す', () => {
    const network = createNetwork();
    expect(network.isValidAddressString('ABC')).toBe(false);
  });

  it('isValidAddressStringはbase32以外の文字を含むとfalseを返す', () => {
    const network = createNetwork();
    expect(network.isValidAddressString('A'.repeat(39) + '!')).toBe(false);
  });

  it('isValidAddressStringは既知のエンコード済みアドレスを検証できる', () => {
    const network = createNetwork();
    const publicKey = new PublicKey('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    const address = network.publicKeyToAddress(publicKey);
    const encoded = 'A'.repeat(40);

    MockAddress.encodedToBytes.set(encoded, address.bytes);

    expect(network.isValidAddressString(encoded)).toBe(true);
  });

  it('isValidAddressはネットワーク不一致でfalseを返す', () => {
    const network = createNetwork('main', 0x68);
    const publicKey = new PublicKey('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
    const address = network.publicKeyToAddress(publicKey);

    address.bytes[0] = 0x98;

    expect(network.isValidAddress(address as any)).toBe(false);
  });

  it('isValidAddressはチェックサム不一致でfalseを返す', () => {
    const network = createNetwork();
    const publicKey = new PublicKey('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
    const address = network.publicKeyToAddress(publicKey);

    address.bytes[address.bytes.length - 1] ^= 0xff;

    expect(network.isValidAddress(address as any)).toBe(false);
  });

  it('toDatetime/fromDatetimeはネットワーク変換器で相互変換できる', () => {
    const network = createNetwork();
    const datetime = network.toDatetime(new TestTimestamp(120n) as any);
    const roundTripTimestamp = network.fromDatetime(datetime);

    expect(datetime.toISOString()).toBe('2024-01-01T00:02:00.000Z');
    expect(roundTripTimestamp.timestamp).toBe(120n);
  });

  it('toStringはネットワーク名を返す', () => {
    const network = createNetwork('alpha');
    expect(network.toString()).toBe('alpha');
  });
});

describe('NetworkLocatorのテスト', () => {
  const n1 = createNetwork('mainnet', 0x68);
  const n2 = createNetwork('testnet', 0x98);
  const networks = [n1, n2];

  it('findByNameは単一名と配列名の両方を扱える', () => {
    expect(NetworkLocator.findByName(networks, 'mainnet')).toBe(n1);
    expect(NetworkLocator.findByName(networks, ['unknown', 'testnet'])).toBe(n2);
  });

  it('findByNameは該当ネットワークがないと例外を投げる', () => {
    expect(() => NetworkLocator.findByName(networks, ['foo', 'bar'])).toThrowError(
      "no network found with name 'foo, bar'"
    );
  });

  it('findByIdentifierは単一値と配列値の両方を扱える', () => {
    expect(NetworkLocator.findByIdentifier(networks, 0x68)).toBe(n1);
    expect(NetworkLocator.findByIdentifier(networks, [0x99, 0x98])).toBe(n2);
  });

  it('findByIdentifierは該当ネットワークがないと例外を投げる', () => {
    expect(() => NetworkLocator.findByIdentifier(networks, [1, 2])).toThrowError(
      "no network found with identifier '1, 2'"
    );
  });
});
