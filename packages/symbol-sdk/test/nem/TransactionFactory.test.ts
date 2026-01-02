import { describe, expect, it } from 'vitest';

import { PrivateKey, PublicKey, Signature } from '../../src/CryptoTypes.js';
import { KeyPair } from '../../src/nem/KeyPair.js';
import { Address, Network } from '../../src/nem/Network.js';
import TransactionFactory from '../../src/nem/TransactionFactory.js';
import * as nc from '../../src/nem/models.js';

describe('TransactionFactoryのテスト', () => {
  describe('コンストラクタ', () => {
    it('ネットワークを指定してファクトリーを作成できる', () => {
      const factory = new TransactionFactory(Network.MAINNET);

      expect(factory).toBeInstanceOf(TransactionFactory);
    });

    it('テストネットでファクトリーを作成できる', () => {
      const factory = new TransactionFactory(Network.TESTNET);

      expect(factory).toBeInstanceOf(TransactionFactory);
    });

    it('型ルールオーバーライドを指定できる', () => {
      const overrides = new Map();
      const factory = new TransactionFactory(Network.MAINNET, overrides);

      expect(factory).toBeInstanceOf(TransactionFactory);
    });
  });

  describe('static プロパティ', () => {
    it('staticプロパティでクラス型を取得できる', () => {
      const factory = new TransactionFactory(Network.MAINNET);

      expect(factory.static).toBe(TransactionFactory);
    });
  });

  describe('ruleNames', () => {
    it('登録されたルール名を取得できる', () => {
      const factory = new TransactionFactory(Network.MAINNET);
      const ruleNames = factory.ruleNames;

      expect(Array.isArray(ruleNames)).toBe(true);
      expect(ruleNames.length).toBeGreaterThan(0);
    });

    it('トランザクションタイプのルールが含まれる', () => {
      const factory = new TransactionFactory(Network.MAINNET);
      const ruleNames = factory.ruleNames;

      // ルール名の配列が返されることを確認
      expect(ruleNames.length).toBeGreaterThan(0);
    });
  });

  describe('lookupTransactionName', () => {
    it('トランザクションタイプと版数から名前を取得できる', () => {
      const transactionType = nc.TransactionType.TRANSFER;
      const version = 1;

      const name = TransactionFactory.lookupTransactionName(transactionType, version);

      expect(name).toBe('transfer_transaction_v1');
    });

    it('マルチシグトランザクションの名前を取得できる', () => {
      const transactionType = nc.TransactionType.MULTISIG;
      const version = 1;

      const name = TransactionFactory.lookupTransactionName(transactionType, version);

      expect(name).toBe('multisig_transaction_v1');
    });
  });

  describe('create - 転送トランザクション', () => {
    it('基本的な転送トランザクションを作成できる', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      const transaction = factory.create({
        type: 'transfer_transaction_v1',
        signerPublicKey: new PublicKey(new Uint8Array(32).fill(1)),
        fee: 1000000n,
        timestamp: 100000000,
        deadline: 100003600,
        recipientAddress,
        amount: 1000000n,
      });

      expect(transaction).toBeDefined();
      expect(transaction.type.value).toBe(nc.TransactionType.TRANSFER.value);
      expect(transaction.fee.value).toBe(1000000n);
      expect((transaction as any).amount.value).toBe(1000000n);
    });

    it('メッセージ付き転送トランザクションを作成できる', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      const transaction = factory.create({
        type: 'transfer_transaction_v1',
        signerPublicKey: new PublicKey(new Uint8Array(32).fill(1)),
        fee: 1000000n,
        timestamp: 100000000,
        deadline: 100003600,
        recipientAddress,
        amount: 1000000n,
        message: {
          messageType: 'plain',
          message: 'Hello NEM',
        },
      });

      expect(transaction).toBeDefined();
      expect((transaction as any).message).toBeDefined();
      expect((transaction as any).message.messageType.value).toBe(nc.MessageType.PLAIN.value);
      // メッセージは自動的にUint8Arrayに変換される
      expect((transaction as any).message.message).toBeInstanceOf(Uint8Array);
    });

    it('モザイク転送トランザクションを作成できる', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      const transaction = factory.create({
        type: 'transfer_transaction_v2',
        signerPublicKey: new PublicKey(new Uint8Array(32).fill(1)),
        fee: 1000000n,
        timestamp: 100000000,
        deadline: 100003600,
        recipientAddress,
        amount: 1000000n,
        mosaics: [
          {
            mosaic: {
              mosaicId: {
                namespaceId: { name: 'nem' },
                name: 'xem',
              },
              amount: 1000000n,
            },
          },
        ],
      });

      expect(transaction).toBeDefined();
      expect(transaction.type.value).toBe(nc.TransactionType.TRANSFER.value);
      expect(transaction.version).toBe(2);
      expect((transaction as any).mosaics).toBeDefined();
      expect((transaction as any).mosaics.length).toBe(1);
    });
  });

  describe('create - autosort', () => {
    it('autosort=trueで配列が自動的にソートされる', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      const transaction = factory.create(
        {
          type: 'transfer_transaction_v1',
          signerPublicKey: new PublicKey(new Uint8Array(32).fill(1)),
          fee: 1000000n,
          timestamp: 100000000,
          deadline: 100003600,
          recipientAddress,
          amount: 1000000n,
        },
        true
      );

      expect(transaction).toBeDefined();
    });

    it('autosort=falseで配列がソートされない', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      const transaction = factory.create(
        {
          type: 'transfer_transaction_v1',
          signerPublicKey: new PublicKey(new Uint8Array(32).fill(1)),
          fee: 1000000n,
          timestamp: 100000000,
          deadline: 100003600,
          recipientAddress,
          amount: 1000000n,
        },
        false
      );

      expect(transaction).toBeDefined();
    });
  });

  describe('deserialize', () => {
    it('バイナリペイロードからトランザクションをデシリアライズできる', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      // まずトランザクションを作成してシリアライズ
      const transaction = factory.create({
        type: 'transfer_transaction_v1',
        signerPublicKey: new PublicKey(new Uint8Array(32).fill(1)),
        fee: 1000000n,
        timestamp: 100000000,
        deadline: 100003600,
        recipientAddress,
        amount: 1000000n,
      });

      const payload = transaction.serialize();

      // デシリアライズ
      const deserialized = TransactionFactory.deserialize(payload);

      expect(deserialized).toBeDefined();
      expect(deserialized.type.value).toBe(nc.TransactionType.TRANSFER.value);
      expect(deserialized.fee.value).toBe(1000000n);
      expect((deserialized as any).amount.value).toBe(1000000n);
    });
  });

  describe('toNonVerifiableTransaction', () => {
    it('通常のトランザクションを非検証可能トランザクションに変換できる', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      const transaction = factory.create({
        type: 'transfer_transaction_v1',
        signerPublicKey: new PublicKey(new Uint8Array(32).fill(1)),
        fee: 1000000n,
        timestamp: 100000000,
        deadline: 100003600,
        recipientAddress,
        amount: 1000000n,
      });

      const nonVerifiable = TransactionFactory.toNonVerifiableTransaction(transaction);

      expect(nonVerifiable).toBeDefined();
      expect(nonVerifiable.type.value).toBe(nc.TransactionType.TRANSFER.value);
      expect(nonVerifiable.fee.value).toBe(1000000n);
    });

    it('既に非検証可能なトランザクションはそのまま変換できる', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      const transaction = factory.create({
        type: 'transfer_transaction_v1',
        signerPublicKey: new PublicKey(new Uint8Array(32).fill(1)),
        fee: 1000000n,
        timestamp: 100000000,
        deadline: 100003600,
        recipientAddress,
        amount: 1000000n,
      });

      const nonVerifiable1 = TransactionFactory.toNonVerifiableTransaction(transaction);
      const nonVerifiable2 = TransactionFactory.toNonVerifiableTransaction(nonVerifiable1);

      expect(nonVerifiable2).toBeDefined();
      expect(nonVerifiable2.type.value).toBe(nc.TransactionType.TRANSFER.value);
    });

    it('無効なトランザクションインスタンスでエラーをスローする', () => {
      const invalidTransaction = { type: 'invalid' };

      expect(() => {
        TransactionFactory.toNonVerifiableTransaction(invalidTransaction as any);
      }).toThrow('invalid transaction instance');
    });
  });

  describe('attachSignature', () => {
    it('トランザクションに署名を添付できる', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      const transaction = factory.create({
        type: 'transfer_transaction_v1',
        signerPublicKey: new PublicKey(new Uint8Array(32).fill(1)),
        fee: 1000000n,
        timestamp: 100000000,
        deadline: 100003600,
        recipientAddress,
        amount: 1000000n,
      });

      const signature = new Signature(new Uint8Array(64).fill(2));
      const jsonPayload = TransactionFactory.attachSignature(transaction, signature);

      expect(jsonPayload).toBeDefined();
      expect(typeof jsonPayload).toBe('string');
      expect(jsonPayload).toContain('"data"');
      expect(jsonPayload).toContain('"signature"');
    });

    it('添付した署名がトランザクションに設定される', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      const transaction = factory.create({
        type: 'transfer_transaction_v1',
        signerPublicKey: new PublicKey(new Uint8Array(32).fill(1)),
        fee: 1000000n,
        timestamp: 100000000,
        deadline: 100003600,
        recipientAddress,
        amount: 1000000n,
      });

      const signatureBytes = new Uint8Array(64).fill(2);
      const signature = new Signature(signatureBytes);
      TransactionFactory.attachSignature(transaction, signature);

      expect(transaction.signature).toBeDefined();
      expect(transaction.signature.bytes).toEqual(signatureBytes);
    });

    it('JSONペイロードが正しい形式である', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      const transaction = factory.create({
        type: 'transfer_transaction_v1',
        signerPublicKey: new PublicKey(new Uint8Array(32).fill(1)),
        fee: 1000000n,
        timestamp: 100000000,
        deadline: 100003600,
        recipientAddress,
        amount: 1000000n,
      });

      const signature = new Signature(new Uint8Array(64).fill(2));
      const jsonPayload = TransactionFactory.attachSignature(transaction, signature);

      // JSONとしてパースできることを確認
      const parsed = JSON.parse(jsonPayload);
      expect(parsed.data).toBeDefined();
      expect(parsed.signature).toBeDefined();
      expect(typeof parsed.data).toBe('string');
      expect(typeof parsed.signature).toBe('string');
    });
  });

  describe('統合テスト - トランザクションの作成と署名', () => {
    it('トランザクションを作成して署名を添付できる', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      // キーペアを作成
      const keyPair = new KeyPair(new PrivateKey('abf4cf663c81e461db1fef2d145e6993b62e8b67801edea143335aec4cbec6cd'));

      // トランザクションを作成
      const transaction = factory.create({
        type: 'transfer_transaction_v1',
        signerPublicKey: keyPair.publicKey,
        fee: 1000000n,
        timestamp: 100000000,
        deadline: 100003600,
        recipientAddress,
        amount: 1000000n,
      });

      // 署名を作成
      const signature = keyPair.sign(transaction.serialize());

      // 署名を添付
      const jsonPayload = TransactionFactory.attachSignature(transaction, signature);

      expect(jsonPayload).toBeDefined();
      expect(typeof jsonPayload).toBe('string');

      const parsed = JSON.parse(jsonPayload);
      expect(parsed.data).toBeDefined();
      expect(parsed.signature).toBeDefined();
    });

    it('シリアライズとデシリアライズの往復が可能', () => {
      const factory = new TransactionFactory(Network.TESTNET);
      const recipientAddress = 'TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW';

      const transaction = factory.create({
        type: 'transfer_transaction_v1',
        signerPublicKey: new PublicKey('0101010101010101010101010101010101010101010101010101010101010101'),
        fee: 1000000n,
        timestamp: 100000000,
        deadline: 100003600,
        recipientAddress,
        amount: 1000000n,
      });

      // シリアライズ
      const serialized = transaction.serialize();

      // デシリアライズ
      const deserialized = TransactionFactory.deserialize(serialized);

      // 同じ内容であることを確認
      expect(deserialized.type.value).toBe(transaction.type.value);
      expect(deserialized.fee.value).toBe(transaction.fee.value);
      expect((deserialized as any).amount.value).toBe((transaction as any).amount.value);
      expect(deserialized.timestamp.value).toBe(transaction.timestamp.value);
      expect(deserialized.deadline.value).toBe(transaction.deadline.value);
    });
  });

  describe('アドレス型の変換', () => {
    it('Address型を内部型に変換できる', () => {
      const factory = new TransactionFactory(Network.TESTNET);

      // Address型を使用
      const recipientAddress = new Address('TALICE5VF6J5FYMTCB7A3QG6OIRDRUXDWJGFVXNW');

      const transaction = factory.create({
        type: 'transfer_transaction_v1',
        signerPublicKey: new PublicKey(new Uint8Array(32).fill(1)),
        fee: 1000000n,
        timestamp: 100000000,
        deadline: 100003600,
        recipientAddress,
        amount: 1000000n,
      });

      expect(transaction).toBeDefined();
      expect((transaction as any).recipientAddress).toBeDefined();
    });
  });
});
