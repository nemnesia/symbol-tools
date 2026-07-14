import { describe, expect, it } from 'vitest';

import { Hash256 } from '../../src/CryptoTypes.js';
import { Address, Network, NetworkTimestamp } from '../../src/symbol/Network.js';
import { NamespaceId } from '../../src/symbol/models.js';

describe('symbol/NetworkTimestampのテスト', () => {
  it('millisecondsとsecondsを加算できる', () => {
    const timestamp = new NetworkTimestamp(1000n);
    expect(timestamp.addMilliseconds(500).timestamp).toBe(1500n);
    expect(timestamp.addSeconds(2).timestamp).toBe(3000n);
  });
});

describe('symbol/Addressのテスト', () => {
  it('文字列/バイト列/Addressから生成できる', () => {
    const raw = new Uint8Array(24).fill(1);
    raw[0] = 0x98;

    const fromBytes = new Address(raw);
    const fromString = new Address(fromBytes.toString());
    const fromAddress = new Address(fromBytes);

    expect(fromString.bytes).toEqual(fromBytes.bytes);
    expect(fromAddress.bytes).toEqual(fromBytes.bytes);
  });

  it('alias判定とnamespaceId変換ができる', () => {
    const namespaceId = new NamespaceId(0x1234n);
    const aliasAddress = Address.fromNamespaceId(namespaceId, 0x98);

    expect(aliasAddress.isAlias()).toBe(true);
    expect(aliasAddress.toNamespaceId()?.value).toBe(0x1234n);
  });

  it('通常アドレスはnamespaceIdを持たない', () => {
    const raw = new Uint8Array(24).fill(0);
    raw[0] = 0x98;
    const address = new Address(raw);

    expect(address.isAlias()).toBe(false);
    expect(address.toNamespaceId()).toBeUndefined();
  });

  it('デコード済みアドレスhexから生成できる', () => {
    const raw = new Uint8Array(24).fill(2);
    const hex = Array.from(raw)
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('');

    const address = Address.fromDecodedAddressHexString(hex);
    expect(address.bytes).toEqual(raw);
  });
});

describe('symbol/Networkのテスト', () => {
  it('既知ネットワークが定義される', () => {
    expect(Network.MAINNET.name).toBe('mainnet');
    expect(Network.TESTNET.name).toBe('testnet');
    expect(Network.NETWORKS).toEqual([Network.MAINNET, Network.TESTNET]);
  });

  it('カスタムネットワークはgenerationHashSeedを保持する', () => {
    const seed = Hash256.zero();
    const network = new Network('custom', 0x90, new Date(Date.UTC(2024, 0, 1, 0, 0, 0)), seed);

    expect(network.generationHashSeed).toEqual(seed);
    expect(network.toString()).toBe('custom');
  });

  it('publicKeyからaddressへ変換し検証できる', () => {
    const address = Network.TESTNET.publicKeyToAddress(Hash256.zero() as any);

    expect(address).toBeInstanceOf(Address);
    expect(address.bytes.length).toBe(Address.SIZE);
    expect(Network.TESTNET.isValidAddress(address)).toBe(true);
  });

  it('datetime相互変換はmilliseconds単位で動作する', () => {
    const epoch = new Date(Date.UTC(2024, 0, 1, 0, 0, 0));
    const network = new Network('custom2', 0x91, epoch, Hash256.zero());

    const dt = network.toDatetime(new NetworkTimestamp(1500n));
    expect(dt.toISOString()).toBe('2024-01-01T00:00:01.500Z');

    const ts = network.fromDatetime(new Date(Date.UTC(2024, 0, 1, 0, 0, 2, 250)));
    expect(ts.timestamp).toBe(2250n);
  });
});
