import { describe, expect, it } from 'vitest';

import { PublicKey } from '../../src/CryptoTypes.js';
import { Address, Network, NetworkTimestamp } from '../../src/nem/Network.js';

describe('NetworkTimestampのテスト', () => {
  describe('コンストラクタとプロパティ', () => {
    it('タイムスタンプを作成できる', () => {
      const timestamp = new NetworkTimestamp(100n);
      expect(timestamp).toBeInstanceOf(NetworkTimestamp);
      expect(timestamp.timestamp).toBe(100n);
    });

    it('ゼロのタイムスタンプを作成できる', () => {
      const timestamp = new NetworkTimestamp(0n);
      expect(timestamp.timestamp).toBe(0n);
    });

    it('大きなタイムスタンプを作成できる', () => {
      const bigValue = 1000000000n;
      const timestamp = new NetworkTimestamp(bigValue);
      expect(timestamp.timestamp).toBe(bigValue);
    });
  });

  describe('addSeconds', () => {
    it('秒数を追加できる', () => {
      const timestamp = new NetworkTimestamp(100n);
      const newTimestamp = timestamp.addSeconds(50);

      expect(newTimestamp).toBeInstanceOf(NetworkTimestamp);
      expect(newTimestamp.timestamp).toBe(150n);
    });

    it('ゼロ秒を追加できる', () => {
      const timestamp = new NetworkTimestamp(100n);
      const newTimestamp = timestamp.addSeconds(0);

      expect(newTimestamp.timestamp).toBe(100n);
    });

    it('負の秒数を追加できる', () => {
      const timestamp = new NetworkTimestamp(100n);
      const newTimestamp = timestamp.addSeconds(-50);

      expect(newTimestamp.timestamp).toBe(50n);
    });

    it('元のタイムスタンプは変更されない', () => {
      const timestamp = new NetworkTimestamp(100n);
      const newTimestamp = timestamp.addSeconds(50);

      expect(timestamp.timestamp).toBe(100n);
      expect(newTimestamp.timestamp).toBe(150n);
    });

    it('大きな秒数を追加できる', () => {
      const timestamp = new NetworkTimestamp(1000n);
      const newTimestamp = timestamp.addSeconds(1000000);

      expect(newTimestamp.timestamp).toBe(1001000n);
    });
  });
});

describe('Addressのテスト', () => {
  describe('定数', () => {
    it('SIZEが25バイトである', () => {
      expect(Address.SIZE).toBe(25);
    });

    it('ENCODED_SIZEが40文字である', () => {
      expect(Address.ENCODED_SIZE).toBe(40);
    });

    it('NAMEが"Address"である', () => {
      expect(Address.NAME).toBe('Address');
    });
  });

  describe('コンストラクタ', () => {
    it('Uint8Arrayからアドレスを作成できる', () => {
      const bytes = new Uint8Array(25);
      bytes[0] = 0x68; // mainnet識別子
      const address = new Address(bytes);

      expect(address).toBeInstanceOf(Address);
      expect(address.bytes.length).toBe(25);
    });

    it('文字列からアドレスを作成できる', () => {
      const addressString = 'NALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLYEZDJJ';
      const address = new Address(addressString);

      expect(address).toBeInstanceOf(Address);
      expect(address.bytes.length).toBe(25);
    });

    it('別のAddressオブジェクトからアドレスを作成できる', () => {
      const bytes = new Uint8Array(25);
      bytes[0] = 0x68;
      const address1 = new Address(bytes);
      const address2 = new Address(address1);

      expect(address2).toBeInstanceOf(Address);
      expect(address2.bytes).toEqual(address1.bytes);
    });

    it('mainnetアドレスの正しいフォーマット', () => {
      const addressString = 'NALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLYEZDJJ';
      const address = new Address(addressString);

      expect(address.bytes[0]).toBe(0x68); // mainnet識別子
    });

    it('testnetアドレスの正しいフォーマット', () => {
      const addressString = 'TALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLY4RMJJ';
      const address = new Address(addressString);

      expect(address.bytes[0]).toBe(0x98); // testnet識別子
    });
  });

  describe('toString', () => {
    it('アドレスを文字列に変換できる', () => {
      const addressString = 'NALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLYEZDJJ';
      const address = new Address(addressString);

      expect(address.toString()).toBe(addressString);
    });

    it('バイト配列から作成したアドレスを文字列に変換できる', () => {
      const addressString = 'NALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLYEZDJJ';
      const address1 = new Address(addressString);
      const address2 = new Address(address1.bytes);

      expect(address2.toString()).toBe(addressString);
    });

    it('toString()が40文字を返す', () => {
      const addressString = 'NALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLYEZDJJ';
      const address = new Address(addressString);

      expect(address.toString().length).toBe(40);
    });
  });

  describe('等価性', () => {
    it('同じ文字列から作成したアドレスは等しい', () => {
      const addressString = 'NALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLYEZDJJ';
      const address1 = new Address(addressString);
      const address2 = new Address(addressString);

      expect(address1.bytes).toEqual(address2.bytes);
      expect(address1.toString()).toBe(address2.toString());
    });

    it('異なるアドレスは等しくない', () => {
      const address1 = new Address('NALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLYEZDJJ');
      const address2 = new Address('NBOBDILGU3IVY4DPJKHYLSSVYFFWYS5QPLY22SOJ');

      expect(address1.bytes).not.toEqual(address2.bytes);
      expect(address1.toString()).not.toBe(address2.toString());
    });
  });
});

describe('Networkのテスト', () => {
  describe('定数とプロパティ', () => {
    it('MAINNETが定義されている', () => {
      expect(Network.MAINNET).toBeDefined();
      expect(Network.MAINNET).toBeInstanceOf(Network);
    });

    it('TESTNETが定義されている', () => {
      expect(Network.TESTNET).toBeDefined();
      expect(Network.TESTNET).toBeInstanceOf(Network);
    });

    it('NETWORKSが定義されている', () => {
      expect(Network.NETWORKS).toBeDefined();
      expect(Array.isArray(Network.NETWORKS)).toBe(true);
      expect(Network.NETWORKS.length).toBe(2);
    });

    it('NETWORKSにMAINNETとTESTNETが含まれる', () => {
      expect(Network.NETWORKS).toContain(Network.MAINNET);
      expect(Network.NETWORKS).toContain(Network.TESTNET);
    });
  });

  describe('MAINNETのプロパティ', () => {
    it('nameが"mainnet"である', () => {
      expect(Network.MAINNET.name).toBe('mainnet');
    });

    it('識別子が0x68である', () => {
      expect(Network.MAINNET.identifier).toBe(0x68);
    });

    it('エポック時刻が正しい', () => {
      const expectedEpoch = new Date(Date.UTC(2015, 2, 29, 0, 6, 25));
      expect(Network.MAINNET.datetimeConverter.epoch.getTime()).toBe(expectedEpoch.getTime());
    });
  });

  describe('TESTNETのプロパティ', () => {
    it('nameが"testnet"である', () => {
      expect(Network.TESTNET.name).toBe('testnet');
    });

    it('識別子が0x98である', () => {
      expect(Network.TESTNET.identifier).toBe(0x98);
    });

    it('エポック時刻が正しい', () => {
      const expectedEpoch = new Date(Date.UTC(2015, 2, 29, 0, 6, 25));
      expect(Network.TESTNET.datetimeConverter.epoch.getTime()).toBe(expectedEpoch.getTime());
    });
  });

  describe('publicKeyToAddress', () => {
    it('mainnetで公開鍵からアドレスを生成できる', () => {
      const publicKey = new PublicKey('c5f54ba980fcbb6570e8b8b03895eabb14e51748a648393f07f0f8e35c5cd737');

      const address = Network.MAINNET.publicKeyToAddress(publicKey);

      expect(address).toBeInstanceOf(Address);
      expect(address.bytes[0]).toBe(0x68); // mainnet識別子
      expect(address.bytes.length).toBe(25);
    });

    it('testnetで公開鍵からアドレスを生成できる', () => {
      const publicKey = new PublicKey('c5f54ba980fcbb6570e8b8b03895eabb14e51748a648393f07f0f8e35c5cd737');

      const address = Network.TESTNET.publicKeyToAddress(publicKey);

      expect(address).toBeInstanceOf(Address);
      expect(address.bytes[0]).toBe(0x98); // testnet識別子
      expect(address.bytes.length).toBe(25);
    });

    it('同じ公開鍵からは同じアドレスを生成する', () => {
      const publicKey = new PublicKey('4242424242424242424242424242424242424242424242424242424242424242');

      const address1 = Network.MAINNET.publicKeyToAddress(publicKey);
      const address2 = Network.MAINNET.publicKeyToAddress(publicKey);

      expect(address1.bytes).toEqual(address2.bytes);
    });

    it('異なる公開鍵からは異なるアドレスを生成する', () => {
      const publicKey1 = new PublicKey('0101010101010101010101010101010101010101010101010101010101010101');
      const publicKey2 = new PublicKey('0202020202020202020202020202020202020202020202020202020202020202');

      const address1 = Network.MAINNET.publicKeyToAddress(publicKey1);
      const address2 = Network.MAINNET.publicKeyToAddress(publicKey2);

      expect(address1.bytes).not.toEqual(address2.bytes);
    });

    it('mainnetとtestnetで異なるアドレスを生成する', () => {
      const publicKey = new PublicKey('4242424242424242424242424242424242424242424242424242424242424242');

      const mainnetAddress = Network.MAINNET.publicKeyToAddress(publicKey);
      const testnetAddress = Network.TESTNET.publicKeyToAddress(publicKey);

      expect(mainnetAddress.bytes).not.toEqual(testnetAddress.bytes);
      expect(mainnetAddress.bytes[0]).toBe(0x68);
      expect(testnetAddress.bytes[0]).toBe(0x98);
    });
  });

  describe('isValidAddress', () => {
    it('有効なmainnetアドレスを検証できる', () => {
      const validAddress = new Address('NALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLYEZDJJ');
      const isValid = Network.MAINNET.isValidAddress(validAddress);

      expect(isValid).toBe(true);
    });

    it('mainnetアドレスをtestnetで検証すると失敗する', () => {
      const mainnetAddress = new Address('NALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLYEZDJJ');
      const isValid = Network.TESTNET.isValidAddress(mainnetAddress);

      expect(isValid).toBe(false);
    });

    it('testnetアドレスをmainnetで検証すると失敗する', () => {
      const testnetAddress = new Address('TALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLY4RMJJ');
      const isValid = Network.MAINNET.isValidAddress(testnetAddress);

      expect(isValid).toBe(false);
    });
  });

  describe('タイムスタンプ変換', () => {
    it('日時からネットワークタイムスタンプに変換できる', () => {
      const date = new Date(Date.UTC(2015, 2, 29, 1, 6, 25)); // エポックの1時間後
      const diffSeconds = Network.MAINNET.datetimeConverter.toDifference(date);

      const timestamp = new NetworkTimestamp(BigInt(diffSeconds));
      expect(timestamp).toBeInstanceOf(NetworkTimestamp);
      expect(timestamp.timestamp).toBe(3600n); // 3600秒
    });

    it('ネットワークタイムスタンプから日時に変換できる', () => {
      const timestamp = new NetworkTimestamp(3600n); // 3600秒
      const date = Network.MAINNET.datetimeConverter.toDatetime(Number(timestamp.timestamp));

      const expectedDate = new Date(Date.UTC(2015, 2, 29, 1, 6, 25)); // エポックの1時間後
      expect(date.getTime()).toBe(expectedDate.getTime());
    });

    it('エポック時刻がゼロタイムスタンプに対応する', () => {
      const zeroTimestamp = new NetworkTimestamp(0n);
      const date = Network.MAINNET.datetimeConverter.toDatetime(Number(zeroTimestamp.timestamp));

      const expectedEpoch = new Date(Date.UTC(2015, 2, 29, 0, 6, 25));
      expect(date.getTime()).toBe(expectedEpoch.getTime());
    });

    it('mainnetとtestnetが同じエポック時刻を持つ', () => {
      const mainnetEpoch = Network.MAINNET.datetimeConverter.epoch.getTime();
      const testnetEpoch = Network.TESTNET.datetimeConverter.epoch.getTime();

      expect(mainnetEpoch).toBe(testnetEpoch);
    });
  });

  describe('カスタムNetwork', () => {
    it('カスタムネットワークを作成できる', () => {
      const customNetwork = new Network('custom', 0x42, new Date(Date.UTC(2020, 0, 1, 0, 0, 0)));

      expect(customNetwork).toBeInstanceOf(Network);
      expect(customNetwork.name).toBe('custom');
      expect(customNetwork.identifier).toBe(0x42);
    });

    it('カスタムネットワークで公開鍵からアドレスを生成できる', () => {
      const customNetwork = new Network('custom', 0x42, new Date(Date.UTC(2020, 0, 1, 0, 0, 0)));
      const publicKey = new PublicKey(new Uint8Array(32).fill(0x42));

      const address = customNetwork.publicKeyToAddress(publicKey);

      expect(address).toBeInstanceOf(Address);
      expect(address.bytes[0]).toBe(0x42);
      expect(address.bytes.length).toBe(25);
    });
  });
});

describe('Network統合テスト', () => {
  it('公開鍵からアドレス生成と検証の一連のフロー', () => {
    const publicKey = new PublicKey(
      new Uint8Array([
        0xc5, 0xf5, 0x4b, 0xa9, 0x80, 0xfc, 0xbb, 0x65, 0x70, 0xe8, 0xb8, 0xb0, 0x38, 0x95, 0xea, 0xbb, 0x14, 0xe5,
        0x17, 0x48, 0xa6, 0x48, 0x39, 0x3f, 0x07, 0xf0, 0xf8, 0xe3, 0x5c, 0x5c, 0xd7, 0x37,
      ])
    );

    // アドレス生成
    const address = Network.MAINNET.publicKeyToAddress(publicKey);

    // 文字列変換
    const addressString = address.toString();

    // 文字列からアドレス再構築
    const reconstructedAddress = new Address(addressString);

    // 検証
    expect(Network.MAINNET.isValidAddress(reconstructedAddress)).toBe(true);
    expect(reconstructedAddress.bytes).toEqual(address.bytes);
  });

  it('タイムスタンプ操作の一連のフロー', () => {
    // 現在時刻を取得
    const now = new Date();

    // ネットワークタイムスタンプに変換
    const diffSeconds = Network.MAINNET.datetimeConverter.toDifference(now);
    const timestamp = new NetworkTimestamp(BigInt(diffSeconds));

    // 3600秒追加
    const futureTimestamp = timestamp.addSeconds(3600);

    // 日時に変換
    const futureDate = Network.MAINNET.datetimeConverter.toDatetime(Number(futureTimestamp.timestamp));

    // 検証
    expect(futureDate.getTime()).toBeGreaterThan(now.getTime());
    const timeDiff = futureDate.getTime() - now.getTime();
    expect(timeDiff).toBeGreaterThan(3599000); // 少なくとも3599秒
    expect(timeDiff).toBeLessThan(3601000); // 最大3601秒
  });

  it('複数のネットワークで同じ公開鍵が異なるアドレスを生成', () => {
    const publicKey = new PublicKey(new Uint8Array(32).fill(0x42));

    const mainnetAddress = Network.MAINNET.publicKeyToAddress(publicKey);
    const testnetAddress = Network.TESTNET.publicKeyToAddress(publicKey);

    // 両方とも有効なアドレス
    expect(mainnetAddress).toBeInstanceOf(Address);
    expect(testnetAddress).toBeInstanceOf(Address);

    // 異なるアドレス
    expect(mainnetAddress.bytes).not.toEqual(testnetAddress.bytes);

    // それぞれのネットワークで有効
    expect(Network.MAINNET.isValidAddress(mainnetAddress)).toBe(true);
    expect(Network.TESTNET.isValidAddress(testnetAddress)).toBe(true);

    // 他のネットワークでは無効
    expect(Network.MAINNET.isValidAddress(testnetAddress)).toBe(false);
    expect(Network.TESTNET.isValidAddress(mainnetAddress)).toBe(false);
  });
});
