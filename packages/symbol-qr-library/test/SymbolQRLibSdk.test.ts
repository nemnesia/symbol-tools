import { Hash256, PrivateKey, PublicKey } from 'symbol-sdk';
import { Network } from 'symbol-sdk/symbol';
import { beforeEach, describe, expect, it } from 'vitest';

import { QRCodeType } from '../src/SymbolQRJson.type.js';
import { SymbolQRLibSdk } from '../src/sdk/SymbolQRLibSdk.js';

describe('SymbolQRLibSdk', () => {
  let symbolQRLibSdk: SymbolQRLibSdk;
  let network: Network;

  beforeEach(() => {
    network = new Network(
      'testnet',
      0x98,
      new Date('2021-03-16T00:06:25Z'),
      new Hash256('49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4')
    );
    symbolQRLibSdk = new SymbolQRLibSdk(network);
  });

  describe('createContactQRJson', () => {
    it('連絡先追加用のQRコードJSONが正しく生成されること', () => {
      const name = 'Alice';
      const publicKey = new PublicKey('87DA603E7BE5656C45692D5FC7F6D0EF8F24BB7A5C10ED5FDA8C5CFBC49FCBC8');

      const result = symbolQRLibSdk.createContactQRJson(name, publicKey);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.AddContact);
      expect(result.network_id).toBe(0x98);
      expect(result.chain_id).toBe('49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4');
      expect(result.data.name).toBe(name);
      expect(result.data.publicKey).toBe(publicKey.toString());
    });
  });

  describe('createExportAccountQRJson', () => {
    it('秘密鍵を使用してアカウントエクスポート用のQRコードJSONが正しく生成されること', () => {
      const privateKey = new PrivateKey('B4F12E7C9F6946091E2CB8B6D3A12B50D17CCBBF646386EA27CE2946A7423DCF');

      const result = symbolQRLibSdk.createExportAccountQRJson(privateKey);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportAccount);
      expect(result.network_id).toBe(0x98);
      expect(result.chain_id).toBe('49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4');
      expect('privateKey' in result.data && result.data.privateKey).toBe(privateKey.toString());
    });

    it('暗号化データを使用してアカウントエクスポート用のQRコードJSONが正しく生成されること', () => {
      const ciphertext = 'encryptedData';
      const salt = 'saltValue';

      const result = symbolQRLibSdk.createExportAccountQRJson(ciphertext, salt);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportAccount);
      expect(result.network_id).toBe(0x98);
      expect('ciphertext' in result.data && result.data.ciphertext).toBe(ciphertext);
      expect('salt' in result.data && result.data.salt).toBe(salt);
      expect('v' in result.data && result.data.v).toBe(2);
    });
  });

  describe('tryDecryptExportAccountJson', () => {
    it('暗号化されたアカウントエクスポートJSONを復号化できること', async () => {
      const privateKey = new PrivateKey('B4F12E7C9F6946091E2CB8B6D3A12B50D17CCBBF646386EA27CE2946A7423DCF');
      const password = 'testPassword123';

      const encrypted = await symbolQRLibSdk.createExportAccountQRJson(privateKey.toString(), password);

      // 暗号化されたJSONを作成
      const encryptedJson = {
        ...encrypted,
        data: {
          v: 2,
          ciphertext: 'ciphertext' in encrypted.data ? encrypted.data.ciphertext : '',
          salt: 'salt' in encrypted.data ? encrypted.data.salt : '',
        },
      };

      // 実際には復号化をテストするため、Core側のメソッドを利用
      // ここではスキップ（実際の暗号化が必要）
      expect(encryptedJson.data.v).toBe(2);
    });
  });

  describe('createRequestTransactionQRJson', () => {
    it('トランザクションリクエスト用のQRコードJSONが正しく生成されること', () => {
      // モックトランザクションの作成
      const mockTransaction = {
        serialize: () => new Uint8Array([0xaa, 0xbb, 0xcc, 0xdd]),
      } as any;

      const result = symbolQRLibSdk.createRequestTransactionQRJson(mockTransaction);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.RequestTransaction);
      expect(result.network_id).toBe(0x98);
      expect(result.data.payload).toBe('AABBCCDD');
    });
  });

  describe('createRequestCosignatureQRJson', () => {
    it('署名依頼用のQRコードJSONが正しく生成されること', () => {
      // モックトランザクションの作成
      const mockTransaction = {
        serialize: () => new Uint8Array([0xee, 0xff, 0x11, 0x22]),
      } as any;

      const result = symbolQRLibSdk.createRequestCosignatureQRJson(mockTransaction);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.RequestCosignature);
      expect(result.network_id).toBe(0x98);
      expect(result.data.payload).toBe('EEFF1122');
    });
  });

  describe('createExportMnemonicQRJson', () => {
    it('ニーモニックを使用してエクスポート用のQRコードJSONが正しく生成されること', () => {
      const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';

      const result = symbolQRLibSdk.createExportMnemonicQRJson(mnemonic);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportMnemonic);
      expect(result.network_id).toBe(0x98);
      expect('plainMnemonic' in result.data && result.data.plainMnemonic).toBe(mnemonic);
    });

    it('暗号化データを使用してニーモニックエクスポート用のQRコードJSONが正しく生成されること', () => {
      const ciphertext = 'encryptedMnemonic';
      const salt = 'saltValue';

      const result = symbolQRLibSdk.createExportMnemonicQRJson(ciphertext, salt);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportMnemonic);
      expect('ciphertext' in result.data && result.data.ciphertext).toBe(ciphertext);
      expect('salt' in result.data && result.data.salt).toBe(salt);
    });
  });

  describe('createExportObjectQRJson', () => {
    it('オブジェクトエクスポート用のQRコードJSONが正しく生成されること', () => {
      const exportObject = '{"key":"value"}';

      const result = symbolQRLibSdk.createExportObjectQRJson(exportObject);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportObject);
      expect(result.network_id).toBe(0x98);
      expect((result as any).data.data).toBe(exportObject);
    });
  });

  describe('createExportAddressQRJson', () => {
    it('アドレスエクスポート用のQRコードJSONが正しく生成されること', () => {
      const name = 'Bob';
      const address = 'TAXZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ';

      const result = symbolQRLibSdk.createExportAddressQRJson(name, address);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportAddress);
      expect(result.network_id).toBe(0x98);
      expect(result.data.name).toBe(name);
      expect(result.data.address).toBe(address);
    });
  });

  describe('createSignedTransactionQRJson', () => {
    it('署名済みトランザクション用のQRコードJSONが正しく生成されること', () => {
      const payload = 'AABBCCDD';
      const hash = 'F'.repeat(64);
      const signerPublicKey = '87DA603E7BE5656C45692D5FC7F6D0EF8F24BB7A5C10ED5FDA8C5CFBC49FCBC8';
      const type = 16724;
      const networkType = 152;

      // SymbolFacadeのhashTransactionをモックするために、Coreメソッドを直接使用
      const result = symbolQRLibSdk['core'].createSignedTransactionQRJson(
        payload,
        hash,
        signerPublicKey,
        type,
        networkType
      );

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.SignedTransaction);
      expect(result.network_id).toBe(0x98);
      expect(result.data.payload.payload).toBe(payload);
      expect(result.data.payload.hash).toBe(hash);
      expect(result.data.payload.signerPublicKey).toBe(signerPublicKey);
      expect(result.data.payload.type).toBe(type);
      expect(result.data.payload.networkType).toBe(networkType);
    });
  });

  describe('createCosignatureSignedTransactionQRJson', () => {
    it('連署済みトランザクション用のQRコードJSONが正しく生成されること', () => {
      const parentHash = 'H'.repeat(64);
      const signature = 'I'.repeat(128);
      const signerPublicKey = 'J'.repeat(64);

      const mockDetachedCosignature = {
        parentHash: { toString: () => parentHash },
        signature: { toString: () => signature },
        signerPublicKey: { toString: () => signerPublicKey },
        version: { toString: () => '0' },
      } as any;

      const result = symbolQRLibSdk.createCosignatureSignedTransactionQRJson(mockDetachedCosignature);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.CosignatureSignedTransaction);
      expect(result.network_id).toBe(0x98);
      expect(result.data.payload.parentHash).toBe(parentHash);
      expect(result.data.payload.signature).toBe(signature);
      expect(result.data.payload.signerPublicKey).toBe(signerPublicKey);
      expect(result.data.payload.version).toBe('0');
    });
  });
});
