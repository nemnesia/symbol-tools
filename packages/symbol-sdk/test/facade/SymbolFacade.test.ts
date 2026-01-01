import { describe, expect, it } from 'vitest';

import { Hash256, PrivateKey, PublicKey, Signature } from '../../src/CryptoTypes.js';
import { SymbolAccount, SymbolFacade, SymbolPublicAccount } from '../../src/facade/SymbolFacade.js';
import { KeyPair } from '../../src/symbol/KeyPair.js';
import { Network } from '../../src/symbol/Network.js';

// テスト用のダミーキー
const TEST_PRIVATE_KEY = new PrivateKey(new Uint8Array(32).fill(1));
const TEST_PUBLIC_KEY = new PublicKey(new Uint8Array(32).fill(2));

// テスト用ネットワーク
const network = Network.TESTNET;
const facade = new SymbolFacade(network);

describe('SymbolFacadeのテスト', () => {
  it('公開鍵からSymbolPublicAccountを生成できる', () => {
    const account = facade.createPublicAccount(TEST_PUBLIC_KEY);
    expect(account).toBeInstanceOf(SymbolPublicAccount);
    expect(account.publicKey).toEqual(TEST_PUBLIC_KEY);
    expect(account.address).toBeDefined();
  });

  it('秘密鍵からSymbolAccountを生成できる', () => {
    const account = facade.createAccount(TEST_PRIVATE_KEY);
    expect(account).toBeInstanceOf(SymbolAccount);
    expect(account.keyPair).toBeInstanceOf(KeyPair);
    expect(account.publicKey).toEqual(account.keyPair.publicKey);
    expect(account.address).toBeDefined();
  });

  it('型付きディスクリプタからトランザクションを生成できる', () => {
    // テスト用のダミーdescriptor
    const account = facade.createAccount(TEST_PRIVATE_KEY);
    const descriptor = {
      toMap: () => ({
        type: 'transfer_transaction_v1',
        recipientAddress: account.address,
        mosaics: [],
        message: new Uint8Array(),
      }),
    };
    const tx = facade.createTransactionFromTypedDescriptor(descriptor, TEST_PUBLIC_KEY, 100, 60);
    expect(tx).toBeDefined();
    expect(tx.signerPublicKey).toEqual(TEST_PUBLIC_KEY);
    expect(tx.deadline).toBeDefined();
    expect(tx.fee).toBeDefined();
  });

  it('トランザクションの署名と検証ができる', () => {
    const account = facade.createAccount(TEST_PRIVATE_KEY);
    const descriptor = {
      toMap: () => ({
        type: 'transfer_transaction_v1',
        recipientAddress: account.address,
        mosaics: [],
        message: new Uint8Array(),
      }),
    };
    const tx = facade.createTransactionFromTypedDescriptor(descriptor, account.publicKey, 100, 60);
    const signature = account.signTransaction(tx);
    expect(signature).toBeInstanceOf(Signature);
    const verified = facade.verifyTransaction(tx, signature);
    expect(verified).toBe(true);
  });

  it('トランザクションのハッシュ値を取得できる', () => {
    const account = facade.createAccount(TEST_PRIVATE_KEY);
    const descriptor = {
      toMap: () => ({
        type: 'transfer_transaction_v1',
        recipientAddress: account.address,
        mosaics: [],
        message: new Uint8Array(),
      }),
    };
    const tx = facade.createTransactionFromTypedDescriptor(descriptor, account.publicKey, 100, 60);
    const hash = facade.hashTransaction(tx);
    expect(hash).toBeInstanceOf(Hash256);
  });
});
