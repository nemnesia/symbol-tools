import { describe, it, expect } from 'vitest';
import { QRCodeType } from '../src/SymbolQRJson.type.js';

describe('SymbolQRJson.type', () => {
  describe('QRCodeType', () => {
    it('QRCodeTypeの値が正しく定義されていること', () => {
      expect(QRCodeType.AddContact).toBe(1);
      expect(QRCodeType.ExportAccount).toBe(2);
      expect(QRCodeType.RequestTransaction).toBe(3);
      expect(QRCodeType.RequestCosignature).toBe(4);
      expect(QRCodeType.ExportMnemonic).toBe(5);
      expect(QRCodeType.ExportObject).toBe(6);
      expect(QRCodeType.ExportAddress).toBe(7);
      expect(QRCodeType.SignedTransaction).toBe(8);
      expect(QRCodeType.CosignatureSignedTransaction).toBe(9);
    });

    it('QRCodeTypeの列挙型が重複していないこと', () => {
      const values = Object.values(QRCodeType).filter(v => typeof v === 'number');
      const uniqueValues = new Set(values);
      expect(values.length).toBe(uniqueValues.size);
    });
  });

  describe('Interface Type Guards', () => {
    it('SymbolQRJsonBaseの必須プロパティが正しいこと', () => {
      const base = {
        v: 3,
        type: 1,
        network_id: 152,
        chain_id: '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
      };

      expect(base).toHaveProperty('v');
      expect(base).toHaveProperty('type');
      expect(base).toHaveProperty('network_id');
      expect(base).toHaveProperty('chain_id');
    });

    it('AddContactJsonの構造が正しいこと', () => {
      const contact = {
        v: 3,
        type: QRCodeType.AddContact,
        network_id: 152,
        chain_id: '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
        data: {
          name: 'Alice',
          publicKey: 'A'.repeat(64),
        },
      };

      expect(contact.data).toHaveProperty('name');
      expect(contact.data).toHaveProperty('publicKey');
    });

    it('ExportAccountJsonの構造が正しいこと（平文）', () => {
      const account = {
        v: 3,
        type: QRCodeType.ExportAccount,
        network_id: 152,
        chain_id: '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
        data: {
          privateKey: 'B'.repeat(64),
        },
      };

      expect(account.data).toHaveProperty('privateKey');
    });

    it('ExportAccountJsonの構造が正しいこと（暗号化）', () => {
      const account = {
        v: 3,
        type: QRCodeType.ExportAccount,
        network_id: 152,
        chain_id: '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
        data: {
          v: 2,
          ciphertext: 'encrypted',
          salt: 'salt',
        },
      };

      expect(account.data).toHaveProperty('v');
      expect(account.data).toHaveProperty('ciphertext');
      expect(account.data).toHaveProperty('salt');
    });

    it('RequestTransactionJsonの構造が正しいこと', () => {
      const request = {
        v: 3,
        type: QRCodeType.RequestTransaction,
        network_id: 152,
        chain_id: '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
        data: {
          payload: 'AABBCCDD',
        },
      };

      expect(request.data).toHaveProperty('payload');
    });

    it('ExportMnemonicJsonの構造が正しいこと（平文）', () => {
      const mnemonic = {
        v: 3,
        type: QRCodeType.ExportMnemonic,
        network_id: 152,
        chain_id: '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
        data: {
          plainMnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
        },
      };

      expect(mnemonic.data).toHaveProperty('plainMnemonic');
    });

    it('ExportMnemonicJsonの構造が正しいこと（暗号化）', () => {
      const mnemonic = {
        v: 3,
        type: QRCodeType.ExportMnemonic,
        network_id: 152,
        chain_id: '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
        data: {
          v: 2,
          ciphertext: 'encrypted',
          salt: 'salt',
        },
      };

      expect(mnemonic.data).toHaveProperty('v');
      expect(mnemonic.data).toHaveProperty('ciphertext');
      expect(mnemonic.data).toHaveProperty('salt');
    });

    it('ExportObjectJsonの構造が正しいこと', () => {
      const exportObj = {
        v: 3,
        type: QRCodeType.ExportObject,
        network_id: 152,
        chain_id: '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
        data: {
          data: '{"key":"value"}',
        },
      };

      expect(exportObj.data).toHaveProperty('data');
    });

    it('ExportAddressJsonの構造が正しいこと', () => {
      const address = {
        v: 3,
        type: QRCodeType.ExportAddress,
        network_id: 152,
        chain_id: '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
        data: {
          name: 'Bob',
          address: 'TAXZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
        },
      };

      expect(address.data).toHaveProperty('name');
      expect(address.data).toHaveProperty('address');
    });

    it('SignedTransactionJsonの構造が正しいこと', () => {
      const signed = {
        v: 3,
        type: QRCodeType.SignedTransaction,
        network_id: 152,
        chain_id: '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
        data: {
          payload: {
            payload: 'AABBCCDD',
            hash: 'F'.repeat(64),
            signerPublicKey: 'G'.repeat(64),
            type: 16724,
            networkType: 152,
          },
        },
      };

      expect(signed.data.payload).toHaveProperty('payload');
      expect(signed.data.payload).toHaveProperty('hash');
      expect(signed.data.payload).toHaveProperty('signerPublicKey');
      expect(signed.data.payload).toHaveProperty('type');
      expect(signed.data.payload).toHaveProperty('networkType');
    });

    it('CosignatureSignedTransactionJsonの構造が正しいこと', () => {
      const cosigned = {
        v: 3,
        type: QRCodeType.CosignatureSignedTransaction,
        network_id: 152,
        chain_id: '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6',
        data: {
          payload: {
            parentHash: 'H'.repeat(64),
            signature: 'I'.repeat(128),
            signerPublicKey: 'J'.repeat(64),
            version: '0',
          },
        },
      };

      expect(cosigned.data.payload).toHaveProperty('parentHash');
      expect(cosigned.data.payload).toHaveProperty('signature');
      expect(cosigned.data.payload).toHaveProperty('signerPublicKey');
      expect(cosigned.data.payload).toHaveProperty('version');
    });
  });
});
