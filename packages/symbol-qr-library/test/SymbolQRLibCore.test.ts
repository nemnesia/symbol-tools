import { describe, it, expect, beforeEach } from 'vitest';
import { SymbolQRLibCore } from '../src/core/SymbolQRLibCore.js';
import { QRCodeType } from '../src/SymbolQRJson.type.js';

describe('SymbolQRLibCore', () => {
  let symbolQRLibCore: SymbolQRLibCore;
  const NETWORK_ID = 152;
  const GENERATION_HASH = '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6';

  beforeEach(() => {
    symbolQRLibCore = new SymbolQRLibCore(NETWORK_ID, GENERATION_HASH);
  });

  describe('createContactQRJson', () => {
    it('連絡先追加用のQRコードJSONが正しく生成されること', () => {
      const name = 'Alice';
      const publicKey = 'A'.repeat(64);

      const result = symbolQRLibCore.createContactQRJson(name, publicKey);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.AddContact);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
      expect(result.data.name).toBe(name);
      expect(result.data.publicKey).toBe(publicKey);
    });
  });

  describe('createExportAccountJson', () => {
    it('秘密鍵を使用してアカウントエクスポート用のQRコードJSONが正しく生成されること', () => {
      const privateKey = 'B'.repeat(64);

      const result = symbolQRLibCore.createExportAccountJson(privateKey);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportAccount);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
      expect('privateKey' in result.data && result.data.privateKey).toBe(privateKey);
    });

    it('暗号化データを使用してアカウントエクスポート用のQRコードJSONが正しく生成されること', () => {
      const ciphertext = 'encryptedData';
      const salt = 'saltValue';

      const result = symbolQRLibCore.createExportAccountJson(ciphertext, salt);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportAccount);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
      expect('ciphertext' in result.data && result.data.ciphertext).toBe(ciphertext);
      expect('salt' in result.data && result.data.salt).toBe(salt);
      expect('v' in result.data && result.data.v).toBe(2);
    });
  });

  describe('createEncryptedExportAccountJson', () => {
    it('秘密鍵をパスワードで暗号化してエクスポートJSONが生成されること', async () => {
      const privateKey = 'C'.repeat(64);
      const password = 'testPassword123';

      const result = await symbolQRLibCore.createEncryptedExportAccountJson(privateKey, password);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportAccount);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
      expect('ciphertext' in result.data).toBe(true);
      expect('salt' in result.data).toBe(true);
      expect('v' in result.data && result.data.v).toBe(2);
    });
  });

  describe('tryDecryptExportAccountJson', () => {
    it('暗号化されたアカウントエクスポートJSONを復号化できること', async () => {
      const privateKey = 'D'.repeat(64);
      const password = 'testPassword123';

      const encrypted = await symbolQRLibCore.createEncryptedExportAccountJson(privateKey, password);
      const decrypted = await SymbolQRLibCore.tryDecryptExportAccountJson(encrypted, password);

      expect('privateKey' in decrypted.data && decrypted.data.privateKey).toBe(privateKey);
    }, 10000); // タイムアウトを10秒に延長

    it('暗号化されていないデータで復号化を試みるとエラーが発生すること', async () => {
      const json = symbolQRLibCore.createExportAccountJson('E'.repeat(64));

      await expect(SymbolQRLibCore.tryDecryptExportAccountJson(json, 'password')).rejects.toThrow(
        'The provided JSON does not contain encrypted data.'
      );
    });

    it('サポートされていないバージョンで復号化を試みるとエラーが発生すること', async () => {
      const json = symbolQRLibCore.createExportAccountJson('ciphertext', 'salt');
      // バージョンを不正な値に変更
      if ('v' in json.data) {
        (json.data as any).v = 999;
      }

      await expect(SymbolQRLibCore.tryDecryptExportAccountJson(json, 'password')).rejects.toThrow(
        'Unsupported crypto version: 999'
      );
    });
  });

  describe('createRequestTransactionQRJson', () => {
    it('トランザクションリクエスト用のQRコードJSONが正しく生成されること', () => {
      const payload = 'AABBCCDD';

      const result = symbolQRLibCore.createRequestTransactionQRJson(payload);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.RequestTransaction);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
      expect(result.data.payload).toBe(payload);
    });
  });

  describe('createRequestCosignatureQRJson', () => {
    it('署名依頼用のQRコードJSONが正しく生成されること', () => {
      const payload = 'EEFFGGHH';

      const result = symbolQRLibCore.createRequestCosignatureQRJson(payload);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.RequestCosignature);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
      expect(result.data.payload).toBe(payload);
    });
  });

  describe('createExportMnemonicQRJson', () => {
    it('ニーモニックを使用してエクスポート用のQRコードJSONが正しく生成されること', () => {
      const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';

      const result = symbolQRLibCore.createExportMnemonicQRJson(mnemonic);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportMnemonic);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
      expect('plainMnemonic' in result.data && result.data.plainMnemonic).toBe(mnemonic);
    });

    it('暗号化データを使用してニーモニックエクスポート用のQRコードJSONが正しく生成されること', () => {
      const ciphertext = 'encryptedMnemonic';
      const salt = 'saltValue';

      const result = symbolQRLibCore.createExportMnemonicQRJson(ciphertext, salt);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportMnemonic);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
      expect('ciphertext' in result.data && result.data.ciphertext).toBe(ciphertext);
      expect('salt' in result.data && result.data.salt).toBe(salt);
      expect('v' in result.data && result.data.v).toBe(2);
    });
  });

  describe('createEncryptedExportMnemonicQRJson', () => {
    it('ニーモニックをパスワードで暗号化してエクスポートJSONが生成されること', async () => {
      const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
      const password = 'testPassword123';

      const result = await symbolQRLibCore.createEncryptedExportMnemonicQRJson(mnemonic, password);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportMnemonic);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
      expect('ciphertext' in result.data).toBe(true);
      expect('salt' in result.data).toBe(true);
      expect('v' in result.data && result.data.v).toBe(2);
    });
  });

  describe('tryDecryptExportMnemonicJson', () => {
    it('暗号化されたニーモニックエクスポートJSONを復号化できること', async () => {
      const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
      const password = 'testPassword123';

      const encrypted = await symbolQRLibCore.createEncryptedExportMnemonicQRJson(mnemonic, password);
      const decrypted = await SymbolQRLibCore.tryDecryptExportMnemonicJson(encrypted, password);

      expect('plainMnemonic' in decrypted.data && decrypted.data.plainMnemonic).toBe(mnemonic);
    }, 10000); // タイムアウトを10秒に延長

    it('暗号化されていないデータで復号化を試みるとエラーが発生すること', async () => {
      const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
      const json = symbolQRLibCore.createExportMnemonicQRJson(mnemonic);

      await expect(SymbolQRLibCore.tryDecryptExportMnemonicJson(json, 'password')).rejects.toThrow(
        'The provided JSON does not contain encrypted data.'
      );
    });

    it('サポートされていないバージョンで復号化を試みるとエラーが発生すること', async () => {
      const json = symbolQRLibCore.createExportMnemonicQRJson('ciphertext', 'salt');
      // バージョンを不正な値に変更
      if ('v' in json.data) {
        (json.data as any).v = 999;
      }

      await expect(SymbolQRLibCore.tryDecryptExportMnemonicJson(json, 'password')).rejects.toThrow(
        'Unsupported crypto version: 999'
      );
    });
  });

  describe('createExportObjectQRJson', () => {
    it('オブジェクトエクスポート用のQRコードJSONが正しく生成されること', () => {
      const exportObject = '{"key":"value"}';

      const result = symbolQRLibCore.createExportObjectQRJson(exportObject);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportObject);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
      expect((result as any).data.data).toBe(exportObject);
    });
  });

  describe('createExportAddressQRJson', () => {
    it('アドレスエクスポート用のQRコードJSONが正しく生成されること', () => {
      const name = 'Bob';
      const address = 'TAXZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ';

      const result = symbolQRLibCore.createExportAddressQRJson(name, address);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.ExportAddress);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
      expect(result.data.name).toBe(name);
      expect(result.data.address).toBe(address);
    });
  });

  describe('createSignedTransactionQRJson', () => {
    it('署名済みトランザクション用のQRコードJSONが正しく生成されること', () => {
      const payload = 'AABBCCDD';
      const hash = 'F'.repeat(64);
      const signerPublicKey = 'G'.repeat(64);
      const type = 16724;
      const networkType = 152;

      const result = symbolQRLibCore.createSignedTransactionQRJson(payload, hash, signerPublicKey, type, networkType);

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.SignedTransaction);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
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
      const version = '0';

      const result = symbolQRLibCore.createCosignatureSignedTransactionQRJson(
        parentHash,
        signature,
        signerPublicKey,
        version
      );

      expect(result.v).toBe(3);
      expect(result.type).toBe(QRCodeType.CosignatureSignedTransaction);
      expect(result.network_id).toBe(NETWORK_ID);
      expect(result.chain_id).toBe(GENERATION_HASH);
      expect(result.data.payload.parentHash).toBe(parentHash);
      expect(result.data.payload.signature).toBe(signature);
      expect(result.data.payload.signerPublicKey).toBe(signerPublicKey);
      expect(result.data.payload.version).toBe(version);
    });
  });
});
