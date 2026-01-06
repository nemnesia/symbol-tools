/**
 * (C) Symbol Contributors 2022
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Bip32, PrivateKey, PublicKey, utils } from 'symbol-sdk';
import { descriptors, generateMosaicAliasId, models, Network, SymbolFacade } from 'symbol-sdk/symbol';
import { beforeAll, describe, expect, it } from 'vitest';
import { AccountQR } from '../src/AccountQR';
import { ContactQR } from '../src/ContactQR';
import { CosignatureSignedTransactionQR } from '../src/CosignatureSignedTransactionQR';
import { MnemonicQR } from '../src/MnemonicQR';
import { ObjectQR } from '../src/ObjectQR';
import { QRCodeGenerator } from '../src/QRCodeGenerator';
import { QRCodeType } from '../src/QRCodeType';
import { SignedTransactionQR } from '../src/SignedTransactionQR';
import { TransactionQR } from '../src/TransactionQR';
import { SignedTransaction } from '../src/types/SignedTransaction';

const generationHash = '17FA4747F5014B50413CCF968749604D728D7065DC504291EEE556899A534CBB';
const networkType = Network.TESTNET.identifier;

describe('QRCodeGenerator -->', () => {
  let facade: SymbolFacade;

  beforeAll(() => {
    facade = new SymbolFacade('testnet');
  });

  describe('createExportObject() should', () => {
    it('network_id および chain_id にはデフォルト値を使用する / use default values for network_id and chain_id', () => {
      // Arrange:
      const object = {};

      // Act:
      const objectQR = QRCodeGenerator.createExportObject(object, networkType, generationHash);

      // Assert:
      expect(objectQR.networkType).toBe(Network.TESTNET.identifier);
      expect(objectQR.generationHash).toBeDefined();
      expect(objectQR.generationHash).toHaveLength(64);
    });

    it('object プロパティを正しく設定する / fill object property correctly with {test: test}', () => {
      // Arrange:
      const object = { test: 'test' };

      // Act:
      const objectQR = QRCodeGenerator.createExportObject(object, networkType, generationHash);

      // Assert:
      expect(objectQR.object).toEqual(object);
    });
  });

  describe('createTransactionRequest() should', () => {
    it('TransferTransaction の正しい Base64 表現を生成する / generate correct Base64 representation for TransferTransaction', async () => {
      // Arrange:
      const publicAccount = facade.createPublicAccount(
        new PublicKey('C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268')
      );
      const transferTxDescriptor = new descriptors.TransferTransactionV1Descriptor(
        publicAccount.address,
        [
          new descriptors.UnresolvedMosaicDescriptor(
            new models.UnresolvedMosaicId(generateMosaicAliasId('symbol.xym')),
            new models.Amount(10_000000n)
          ),
        ],
        new TextEncoder().encode('\0Welcome to Symbol!')
      );
      const transferTx = facade.createTransactionFromTypedDescriptor(
        transferTxDescriptor,
        publicAccount.publicKey,
        100, // 手数料係数
        60 * 60 * 2 // 有効期限(秒)
      );

      // Act:
      const requestTx = QRCodeGenerator.createTransactionRequest(transferTx, networkType, generationHash);
      const actualBase64 = await requestTx.toBase64();

      // Assert:
      expect(actualBase64).not.toBe('');
      expect(actualBase64.length).not.toBe(0);
      expect(requestTx.toJSON().length).toBeLessThan(2953);
    });
  });

  describe('createAddContact() should', () => {
    it('AddContact の正しい Base64 表現を生成する / generate correct Base64 representation for AddContact', async () => {
      // Arrange:
      const name = 'test-contact-1';
      const account = facade.createPublicAccount(
        new PublicKey('C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268')
      );

      // Act:
      const createContact = QRCodeGenerator.createAddContact(
        name,
        account.publicKey.toString(),
        networkType,
        generationHash
      );
      const actualBase64 = await createContact.toBase64();

      // Assert:
      expect(actualBase64).not.toBe('');
      expect(actualBase64.length).not.toBe(0);
      expect(createContact.toJSON().length).toBeLessThan(2953);
    });
  });

  describe('createExportAccount() should', () => {
    it('ExportAccount の正しい Base64 表現を生成する / generate correct Base64 representation for ExportAccount', async () => {
      // Arrange:
      const account = facade.createAccount(
        new PrivateKey('F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978')
      );

      // Act:
      const exportAccount = QRCodeGenerator.createExportAccount(
        account.keyPair.privateKey.toString(),
        networkType,
        generationHash,
        'password'
      );
      const actualBase64 = await exportAccount.toBase64();

      // Assert:
      expect(actualBase64).not.toBe('');
      expect(actualBase64.length).not.toBe(0);
      expect(exportAccount.toJSON().length).toBeLessThan(2953);
    });
  });

  describe('createExportMnemonic() should', () => {
    it('ExportMnemonic の正しい Base64 表現を生成する / generate correct Base64 representation for ExportMnemonic', async () => {
      // Arrange:
      const bip32 = new Bip32();
      const mnemonic = bip32.random();

      // Act:
      const exportMnemonic = QRCodeGenerator.createExportMnemonic(mnemonic, networkType, generationHash, 'password');
      const actualBase64 = await exportMnemonic.toBase64();

      // Assert:
      expect(actualBase64).not.toBe('');
      expect(actualBase64.length).not.toBe(0);
      expect(exportMnemonic.toJSON().length).toBeLessThan(2953);
    });
  });

  describe('fromJSON() should', () => {
    it('TransactionQR JSON からトランザクションデータを復元する / Populate transaction data given TransactionQR JSON', () => {
      // Arrange:
      const publicAccount = facade.createPublicAccount(
        new PublicKey('C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268')
      );
      const transferTxDescriptor = new descriptors.TransferTransactionV1Descriptor(
        publicAccount.address,
        [
          new descriptors.UnresolvedMosaicDescriptor(
            new models.UnresolvedMosaicId(generateMosaicAliasId('symbol.xym')),
            new models.Amount(10_000000n)
          ),
        ],
        new TextEncoder().encode('\0Welcome to Symbol!')
      );
      const transferTx = facade.createTransactionFromTypedDescriptor(
        transferTxDescriptor,
        publicAccount.publicKey,
        100, // 手数料係数
        60 * 60 * 2 // 有効期限(秒)
      );

      const requestTx = QRCodeGenerator.createTransactionRequest(transferTx, networkType, generationHash);
      const txJSON = requestTx.toJSON();

      // Act:
      const transactionObj: TransactionQR = QRCodeGenerator.fromJSON(txJSON) as TransactionQR;

      // Assert:
      expect(transactionObj.toJSON()).not.toBe('');
      expect(transactionObj.type).toBe(QRCodeType.RequestTransaction);
      expect(transactionObj.transaction.toJson()).toEqual(transferTx.toJson());
    });

    it('ContactQR JSON から連絡先情報を復元する / Populate contact information given ContactQR JSON', () => {
      // Arrange:
      const name = 'test-contact-1';
      const account = facade.createPublicAccount(
        new PublicKey('C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268')
      );

      const createContact = QRCodeGenerator.createAddContact(
        name,
        account.publicKey.toString(),
        networkType,
        generationHash
      );
      const contactJSON = createContact.toJSON();

      // Act:
      const contactObj: ContactQR = QRCodeGenerator.fromJSON(contactJSON) as ContactQR;

      // Assert:
      expect(contactObj.toJSON()).to.not.be.equal('');
      expect(contactObj.type).to.be.equal(QRCodeType.AddContact);
      expect(contactObj.accountPublicKey).to.deep.equal(account.publicKey.toString());
      expect(contactObj.name).to.be.equal(name);
    });

    it('AccountQR JSON からアカウント情報を復元する / Populate account information given AccountQR JSON', () => {
      // Arrange:
      const account = facade.createAccount(
        new PrivateKey('F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978')
      );

      const exportAccount = QRCodeGenerator.createExportAccount(
        account.keyPair.privateKey.toString(),
        networkType,
        generationHash,
        'password'
      );
      const actualObj = exportAccount.toJSON();

      // Act:
      const accountObj: AccountQR = QRCodeGenerator.fromJSON(actualObj, 'password') as AccountQR;

      // Assert:
      expect(accountObj.toJSON()).to.not.be.equal('');
      expect(accountObj.type).to.be.equal(QRCodeType.ExportAccount);
      expect(facade.createAccount(new PrivateKey(accountObj.accountPrivateKey))).to.deep.equal(account);
      expect(accountObj.accountPrivateKey).to.be.equal(
        'F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978'
      );
    });

    it('ObjectQR JSON からオブジェクトを復元する / Populate object given ObjectQR JSON', () => {
      // Arrange:
      const object = {
        key: 'Value1',
        key2: 'Value2',
      };

      const exportObject = QRCodeGenerator.createExportObject(object, networkType, generationHash);
      const actualObj = exportObject.toJSON();

      // Act:
      const objectObj: ObjectQR = QRCodeGenerator.fromJSON(actualObj) as ObjectQR;

      // Assert:
      expect(objectObj.toJSON()).to.not.be.equal('');
      expect(objectObj.type).to.be.equal(QRCodeType.ExportObject);
      expect(objectObj.object).to.deep.equal(object);
    });

    it('MnemonicQR JSON からニーモニックパスフレーズを復元する / Populate mnemonic pass phrase given MnemonicQR JSON', () => {
      // Arrange:
      const bip32 = new Bip32();
      const mnemonic = bip32.random();

      const exportMnemonic = QRCodeGenerator.createExportMnemonic(mnemonic, networkType, generationHash, 'password');
      const actualObj = exportMnemonic.toJSON();

      // Act:
      const mnemonicObj: MnemonicQR = QRCodeGenerator.fromJSON(actualObj, 'password') as MnemonicQR;

      // Assert:
      expect(mnemonicObj.toJSON()).to.not.be.equal('');
      expect(mnemonicObj.type).to.be.equal(QRCodeType.ExportMnemonic);
      expect(mnemonicObj.mnemonicPlainText).to.be.equal(mnemonic);
    });

    it('SignedTransactionQR JSON から署名済みトランザクションを復元する / Populate signed transaction given SignedTransactionQR JSON', () => {
      // Arrange:
      const signedTransaction: SignedTransaction = {
        payload:
          'B00000000000000025AC0C5FC22F650C655B5945DB23CED1F9411A4850AC95D057D7657722AF94B09D8E57522F23359695F98BEEDD1E9228F7DD010911EB2323BF5120B68F871C0FB863173F9E4924CA5EB63BFC13689E27F603C29AD8C82615A10531329BF7A94E00000000019854419029E30000000000BCB24E71160000009852701708153EB74C71713F0AC7C56F5DE5670E061759540000010000000000CE8BA0672E21C0720000000000000000',
        hash: '0021101E4D0449182293F8CE25A16FB05FCCA08D67320923DA5E11BADE9C6F67',
        signerPublicKey: 'B863173F9E4924CA5EB63BFC13689E27F603C29AD8C82615A10531329BF7A94E',
        type: 16724,
        networkType: 152,
      };
      const qr = new SignedTransactionQR(
        signedTransaction,
        Network.TESTNET.identifier,
        '443931795E15914146B774AE550762046525AF94E2C8E32F8DDFA9194D89A567'
      );
      const actualObj = qr.toJSON();

      // Act:
      const signedObj: SignedTransactionQR = QRCodeGenerator.fromJSON(actualObj) as SignedTransactionQR;

      // more content validation
      if (!signedObj.signedTransaction) {
        throw new Error('Invalid signed transaction.');
      }

      // Assert:
      expect(qr.signedTransaction.payload).to.be.equal(signedTransaction.payload);
    });

    it('CosignatureSignedTransactionQR JSON からコサイン署名済みトランザクションを復元する / Populate cosignature signed transaction given CosignatureSignedTransactionQR JSON', () => {
      // Arrange:
      const cosignature = models.DetachedCosignature.deserialize(
        utils.hexToUint8(
          '000000000000000094EC711522B4B32A1B6A6ED61D86D1E3EE11AFB9B912A17F8983EED3808819FDA76C305D496FEE26E9807179B50FF5710C3AED7D13E2A04AC55DEEA2C1710C921BCEE653FB40DCE4BED474390B8918A9E675EA58221FDD95DD167AD88F5B610278E473A30572F8E54355CD1255B4B490106C3D2841A1674B17038FA752CDDA52'
        )
      );
      const qr = new CosignatureSignedTransactionQR(
        cosignature,
        Network.TESTNET.identifier,
        '443931795E15914146B774AE550762046525AF94E2C8E32F8DDFA9194D89A567'
      );
      const actualObj = qr.toJSON();

      // Act:
      const signedObj: CosignatureSignedTransactionQR = QRCodeGenerator.fromJSON(
        actualObj
      ) as CosignatureSignedTransactionQR;

      // more content validation
      if (!signedObj.cosignature) {
        throw new Error('Invalid signed transaction.');
      }

      // Assert:
      expect(qr.cosignature.signerPublicKey).to.be.equal(cosignature.signerPublicKey);
    });
  });
});
