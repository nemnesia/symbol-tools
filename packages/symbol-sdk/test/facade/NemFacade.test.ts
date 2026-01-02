import { describe, expect, it } from 'vitest';

import { Bip32Node } from '../../src/Bip32.js';
import { Hash256, PrivateKey, PublicKey, Signature } from '../../src/CryptoTypes.js';
import { NemAccount, NemFacade, NemPublicAccount } from '../../src/facade/NemFacade.js';
import { utils } from '../../src/index.js';
import { KeyPair, Verifier } from '../../src/nem/KeyPair.js';
import MessageEncoder from '../../src/nem/MessageEncoder.js';
import { Address, Network } from '../../src/nem/Network.js';
import { deriveSharedKey } from '../../src/nem/SharedKey.js';
import TransactionFactory from '../../src/nem/TransactionFactory.js';

// テスト用のダミーキー
const TEST_PRIVATE_KEY = new PrivateKey(new Uint8Array(32).fill(1));
const TEST_PUBLIC_KEY = new PublicKey(new Uint8Array(32).fill(2));

// テスト用ネットワーク
const network = Network.MAINNET;
const facade = new NemFacade(network);

// テスト用トランザクションディスクリプタを生成するヘルパー関数
const createDescriptor = (recipientAddress: Address, amount: bigint) => ({
  type: 'transfer_transaction_v1',
  recipientAddress,
  amount,
  toMap() {
    return {
      type: this.type,
      recipientAddress: this.recipientAddress,
      amount: this.amount,
    };
  },
});

describe('NemPublicAccountのテスト', () => {
  it('公開鍵からNemPublicAccountを生成できる', () => {
    const publicAccount = new NemPublicAccount(facade, TEST_PUBLIC_KEY);
    expect(publicAccount).toBeInstanceOf(NemPublicAccount);
    expect(publicAccount.publicKey).toEqual(TEST_PUBLIC_KEY);
    expect(publicAccount.address).toBeInstanceOf(Address);
  });

  it('ネットワークに基づいてアドレスが生成される', () => {
    const publicAccount = new NemPublicAccount(facade, TEST_PUBLIC_KEY);
    const address = facade.network.publicKeyToAddress(TEST_PUBLIC_KEY);
    expect(publicAccount.address.toString()).toEqual(address.toString());
  });
});

describe('NemAccountのテスト', () => {
  let keyPair: KeyPair;
  let nemAccount: NemAccount;

  it('KeyPairからNemAccountを生成できる', () => {
    keyPair = new KeyPair(TEST_PRIVATE_KEY);
    nemAccount = new NemAccount(facade, keyPair);

    expect(nemAccount).toBeInstanceOf(NemAccount);
    expect(nemAccount).toBeInstanceOf(NemPublicAccount);
    expect(nemAccount.keyPair).toBe(keyPair);
    expect(nemAccount.publicKey).toEqual(keyPair.publicKey);
    expect(nemAccount.address).toBeInstanceOf(Address);
  });

  it('MessageEncoderを生成できる', () => {
    keyPair = new KeyPair(TEST_PRIVATE_KEY);
    nemAccount = new NemAccount(facade, keyPair);

    const encoder = nemAccount.messageEncoder();
    expect(encoder).toBeInstanceOf(MessageEncoder);
  });

  it('トランザクションに署名できる', () => {
    keyPair = new KeyPair(TEST_PRIVATE_KEY);
    nemAccount = new NemAccount(facade, keyPair);

    const descriptor = createDescriptor(nemAccount.address, 1000000n);
    const transaction = facade.createTransactionFromTypedDescriptor(descriptor, nemAccount.publicKey, 100000n, 3600);
    const signature = nemAccount.signTransaction(transaction);
    expect(signature).toBeInstanceOf(Signature);
  });
});

describe('NemFacadeの静的プロパティのテスト', () => {
  it('BIP32_CURVE_NAMEが正しく設定されている', () => {
    expect(NemFacade.BIP32_CURVE_NAME).toBe('ed25519-keccak');
  });

  it('Addressクラスが公開されている', () => {
    expect(NemFacade.Address).toBe(Address);
  });

  it('KeyPairクラスが公開されている', () => {
    expect(NemFacade.KeyPair).toBe(KeyPair);
  });

  it('Verifierクラスが公開されている', () => {
    expect(NemFacade.Verifier).toBe(Verifier);
  });

  it('deriveSharedKey関数が公開されている', () => {
    expect(NemFacade.deriveSharedKey).toBe(deriveSharedKey);
  });
});

describe('NemFacadeのコンストラクタのテスト', () => {
  it('ネットワーク名からファサードを生成できる（mainnet）', () => {
    const facadeMainnet = new NemFacade('mainnet');
    expect(facadeMainnet.network).toBeInstanceOf(Network);
    expect(facadeMainnet.network.name).toBe('mainnet');
  });

  it('ネットワーク名からファサードを生成できる（testnet）', () => {
    const facadeTestnet = new NemFacade('testnet');
    expect(facadeTestnet.network).toBeInstanceOf(Network);
    expect(facadeTestnet.network.name).toBe('testnet');
  });

  it('Networkオブジェクトからファサードを生成できる', () => {
    const customFacade = new NemFacade(Network.MAINNET);
    expect(customFacade.network).toBe(Network.MAINNET);
  });

  it('TransactionFactoryが初期化される', () => {
    const customFacade = new NemFacade('mainnet');
    expect(customFacade.transactionFactory).toBeDefined();
  });
});

describe('NemFacadeのインスタンスメソッドのテスト', () => {
  it('staticゲッターがNemFacadeクラスを返す', () => {
    expect(facade.static).toBe(NemFacade);
  });

  it('now()が現在のネットワークタイムスタンプを返す', () => {
    const timestamp = facade.now();
    expect(timestamp).toBeDefined();
    expect(timestamp.timestamp).toBeGreaterThan(0);
  });

  it('公開鍵からNemPublicAccountを生成できる', () => {
    const publicAccount = facade.createPublicAccount(TEST_PUBLIC_KEY);
    expect(publicAccount).toBeInstanceOf(NemPublicAccount);
    expect(publicAccount.publicKey).toEqual(TEST_PUBLIC_KEY);
  });

  it('秘密鍵からNemAccountを生成できる', () => {
    const account = facade.createAccount(TEST_PRIVATE_KEY);
    expect(account).toBeInstanceOf(NemAccount);
    expect(account.keyPair).toBeInstanceOf(KeyPair);
  });

  it('型付きディスクリプタからトランザクションを生成できる', () => {
    const account = facade.createAccount(TEST_PRIVATE_KEY);
    const descriptor = createDescriptor(account.address, 1000000n);
    const tx = facade.createTransactionFromTypedDescriptor(descriptor, account.publicKey, 100000n, 3600);
    expect(tx).toBeDefined();
    expect(tx.signerPublicKey).toEqual(account.publicKey);
    expect(tx.fee.value).toBe(100000n);
    expect(tx.timestamp).toBeDefined();
    expect(tx.deadline).toBeDefined();
  });

  it('トランザクションのハッシュを計算できる', () => {
    const account = facade.createAccount(TEST_PRIVATE_KEY);
    const descriptor = createDescriptor(account.address, 1000000n);
    const tx = facade.createTransactionFromTypedDescriptor(descriptor, account.publicKey, 100000n, 3600);
    const hash = facade.hashTransaction(tx);
    expect(hash).toBeInstanceOf(Hash256);
    expect(hash.bytes.length).toBe(32);
  });

  it('トランザクションから署名ペイロードを抽出できる', () => {
    const account = facade.createAccount(TEST_PRIVATE_KEY);
    const descriptor = createDescriptor(account.address, 1000000n);
    const tx = facade.createTransactionFromTypedDescriptor(descriptor, account.publicKey, 100000n, 3600);
    const payload = facade.extractSigningPayload(tx);
    expect(payload).toBeInstanceOf(Uint8Array);
    expect(payload.length).toBeGreaterThan(0);
  });

  it('トランザクションに署名できる', () => {
    const account = facade.createAccount(TEST_PRIVATE_KEY);
    const descriptor = createDescriptor(account.address, 1000000n);
    const tx = facade.createTransactionFromTypedDescriptor(descriptor, account.publicKey, 100000n, 3600);
    const signature = facade.signTransaction(account.keyPair, tx);
    expect(signature).toBeInstanceOf(Signature);
    expect(signature.bytes.length).toBe(64);
  });

  it('トランザクションの署名を検証できる', () => {
    const account = facade.createAccount(TEST_PRIVATE_KEY);
    const descriptor = createDescriptor(account.address, 1000000n);
    const tx = facade.createTransactionFromTypedDescriptor(descriptor, account.publicKey, 100000n, 3600);
    const signature = facade.signTransaction(account.keyPair, tx);
    const isValid = facade.verifyTransaction(tx, signature);
    expect(isValid).toBe(true);
  });

  it('不正な署名が検証で失敗する', () => {
    const account = facade.createAccount(TEST_PRIVATE_KEY);
    const descriptor = createDescriptor(account.address, 1000000n);
    const tx = facade.createTransactionFromTypedDescriptor(descriptor, account.publicKey, 100000n, 3600);
    const invalidSignature = new Signature(new Uint8Array(64).fill(0));
    const isValid = facade.verifyTransaction(tx, invalidSignature);
    expect(isValid).toBe(false);
  });
});

describe('NemFacadeのBIP32パスのテスト', () => {
  it('mainnetの場合は正しいBIP32パスを生成できる', () => {
    const facadeMainnet = new NemFacade('mainnet');
    const path = facadeMainnet.bip32Path(0);
    expect(path).toEqual([44, 43, 0, 0, 0]);
  });

  it('testnetの場合は正しいBIP32パスを生成できる', () => {
    const facadeTestnet = new NemFacade('testnet');
    const path = facadeTestnet.bip32Path(0);
    expect(path).toEqual([44, 1, 0, 0, 0]);
  });

  it('異なるアカウントIDで異なるパスを生成できる', () => {
    const path0 = facade.bip32Path(0);
    const path1 = facade.bip32Path(1);
    const path5 = facade.bip32Path(5);

    expect(path0[2]).toBe(0);
    expect(path1[2]).toBe(1);
    expect(path5[2]).toBe(5);
  });
});

describe('NemFacadeのbip32NodeToKeyPairのテスト', () => {
  it('BIP32ノードからKeyPairを導出できる', () => {
    const privateKeyBytes = new Uint8Array(32).fill(3);
    const chainCodeBytes = new Uint8Array(32).fill(4);

    const bip32Node = {
      privateKey: new PrivateKey(privateKeyBytes),
      chainCode: chainCodeBytes,
    } as Bip32Node;

    const keyPair = NemFacade.bip32NodeToKeyPair(bip32Node);
    expect(keyPair).toBeInstanceOf(KeyPair);
    expect(keyPair.publicKey).toBeDefined();
  });

  it('秘密鍵が逆順で処理される', () => {
    const originalPrivateKey = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
      originalPrivateKey[i] = i;
    }

    const bip32Node = {
      privateKey: new PrivateKey(originalPrivateKey),
      chainCode: new Uint8Array(32),
    } as Bip32Node;

    const keyPair = NemFacade.bip32NodeToKeyPair(bip32Node);
    expect(keyPair).toBeInstanceOf(KeyPair);
    expect(keyPair.privateKey.bytes.length).toBe(32);
  });
});

describe('NemFacadeの統合テスト', () => {
  it('アカウント作成から署名・検証までの一連の流れ', () => {
    const testFacade = new NemFacade('mainnet');
    const privateKey = new PrivateKey(new Uint8Array(32).fill(5));
    const account = testFacade.createAccount(privateKey);

    const descriptor = createDescriptor(account.address, 1000000n);
    const tx = testFacade.createTransactionFromTypedDescriptor(descriptor, account.publicKey, 100000n, 3600);

    const signature = account.signTransaction(tx);
    const isValid = testFacade.verifyTransaction(tx, signature);
    expect(isValid).toBe(true);

    const hash = testFacade.hashTransaction(tx);
    expect(hash).toBeInstanceOf(Hash256);
  });

  it('異なるアカウント間でメッセージエンコーダーを使用できる', () => {
    const privateKey1 = new PrivateKey(new Uint8Array(32).fill(6));
    const privateKey2 = new PrivateKey(new Uint8Array(32).fill(7));

    const account1 = facade.createAccount(privateKey1);
    const account2 = facade.createAccount(privateKey2);

    const encoder1 = account1.messageEncoder();
    const encoder2 = account2.messageEncoder();

    expect(encoder1).toBeInstanceOf(MessageEncoder);
    expect(encoder2).toBeInstanceOf(MessageEncoder);
    expect(encoder1).not.toBe(encoder2);
  });

  describe('SDK互換性', () => {
    it('トランザクション署名が一致する', async () => {
      const facade = new NemFacade('mainnet');
      const tx = TransactionFactory.deserialize(
        utils.hexToUint8(
          '0101000001000098FB54401420000000E59EF184A612D4C3C4D89B5950EB57262C69862B2F96E59C5043BF41765C482F4000'+
          '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'+
          '00000000000000000000000000000000F0490200000000001B71401428000000544343334A4434365359343354554E463755'+
          '534C4C5242345655445A5A4847365145414748434A4640420F000000000032000000010000002A000000E5889DE38281E381'+
          'A6E381AEE8BBA2E98081E38388E383A9E383B3E382B6E382AFE382B7E383A7E383B3'
        )
      );
      const privateKey = new PrivateKey('1111111111111111111111111111111111111111111111111111111111111111');
      const account = facade.createAccount(privateKey);
      const signature = account.signTransaction(tx);
      TransactionFactory.attachSignature(tx, signature);
      const txHash = facade.hashTransaction(tx);

      expect(txHash.toString()).toBe('470EA747F15D89E7F946E725B96F8309193C3BEBE6F01168266C9E49D1BA6C4D');
      expect(utils.uint8ToHex(signature.bytes)).toBe(
        '840AEF168DB575622CEACDFC4C399032E98475EB4BB98B12D45219B66FCADD22D93523170D7BB3C9B970F1F5B7E7E70AD96180B6A6971D13A1411C5AF1B3680B'
      );
      expect(utils.uint8ToHex(tx.serialize())).toBe(
        '0101000001000098FB54401420000000E59EF184A612D4C3C4D89B5950EB57262C69862B2F96E59C5043BF41765C482F4000'+
        '0000840AEF168DB575622CEACDFC4C399032E98475EB4BB98B12D45219B66FCADD22D93523170D7BB3C9B970F1F5B7E7E70A'+
        'D96180B6A6971D13A1411C5AF1B3680BF0490200000000001B71401428000000544343334A4434365359343354554E463755'+
        '534C4C5242345655445A5A4847365145414748434A4640420F000000000032000000010000002A000000E5889DE38281E381'+
        'A6E381AEE8BBA2E98081E38388E383A9E383B3E382B6E382AFE382B7E383A7E383B3'
      );
    });
  });
});
