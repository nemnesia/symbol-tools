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

import { PrivateKey } from 'symbol-sdk';
import { Network, SymbolFacade } from 'symbol-sdk/symbol';
import { beforeAll, describe, expect, it } from 'vitest';
import { AccountQR } from '../src/AccountQR';
import { QRCodeType } from '../src/QRCodeType';

describe('AccountQR -->', () => {
  let facade: SymbolFacade;

  beforeAll(() => {
    facade = new SymbolFacade('testnet');
  });

  describe('with password -->', () => {
    describe('toJSON() should', () => {
      it('必須のNIP-7 QRコード基本フィールドを含める / include mandatory NIP-7 QR Code base fields', () => {
        // Arrange:
        const account = facade.createAccount(
          new PrivateKey('F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978')
        );
        // Act:
        const exportAccount = new AccountQR(
          account.keyPair.privateKey.toString(),
          facade.network.identifier,
          'no-chain-id',
          'password'
        );
        const actualJSON = exportAccount.toJSON();
        const actualObject = JSON.parse(actualJSON);

        // Assert:
        expect(actualObject).toHaveProperty('v');
        expect(actualObject).toHaveProperty('type');
        expect(actualObject).toHaveProperty('network_id');
        expect(actualObject).toHaveProperty('chain_id');
        expect(actualObject).toHaveProperty('data');
      });

      it('専門的なスキーマフィールドを含める / include specialized schema fields', () => {
        // Arrange:
        const account = facade.createAccount(
          new PrivateKey('F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978')
        );

        // Act:
        const exportAccount = new AccountQR(
          account.keyPair.privateKey.toString(),
          facade.network.identifier,
          'no-chain-id',
          'password'
        );
        const actualJSON = exportAccount.toJSON();
        const actualObject = JSON.parse(actualJSON);

        // Assert:
        expect(actualObject.data).toHaveProperty('ciphertext');
        expect(actualObject.data).toHaveProperty('salt');
      });
    });

    describe('fromJSON() should', () => {
      const networkType = Network.TESTNET;
      it('パスワードが間違っているためエラーが発生しました / throw error given wrong password', () => {
        // Arrange:
        const account = facade.createAccount(
          new PrivateKey('F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978')
        );

        // Act:
        const exportAccount = new AccountQR(
          account.keyPair.privateKey.toString(),
          facade.network.identifier,
          'no-chain-id',
          'password'
        );

        // Act + Assert
        expect(() => {
          AccountQR.fromJSON(exportAccount.toJSON(), 'wrong-password');
        }).toThrow('Could not parse account information.');
      });

      it('暗号化されたペイロードが無効であるためエラーが発生しました / throw error given encrypted payload is invalid', () => {
        // Arrange:
        const accountInfo: any = {
          v: 3,
          type: QRCodeType.ExportAccount,
          network_id: networkType,
          chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
          data: {
            // 'ciphertext' field for encrypted payload missing
            salt: '42c8615bc6b2bc88cd239f08a5a17cc62bb0ebaece53f3e458a1cd67cd0888bc',
          },
        };

        // Act + Assert
        expect(() => {
          AccountQR.fromJSON(JSON.stringify(accountInfo), 'password');
        }).toThrow('Could not parse account information.');
      });

      it('正しいパスワードを入力してアカウントを再構築する / reconstruct account given correct password', () => {
        // Arrange:
        const account = facade.createAccount(
          new PrivateKey('F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978')
        );

        // Act:
        const exportAccount = new AccountQR(
          account.keyPair.privateKey.toString(),
          facade.network.identifier,
          'no-chain-id',
          'password'
        );
        const importAccount = AccountQR.fromJSON(exportAccount.toJSON(), 'password');

        // Assert
        expect(importAccount.accountPrivateKey).toBe(exportAccount.accountPrivateKey);
      });
    });
  });

  describe('with no password -->', () => {
    describe('toJSON() should', () => {
      it('必須のNIP-7 QRコード基本フィールドを含める / include mandatory NIP-7 QR Code base fields', () => {
        // Arrange:
        const account = facade.createAccount(
          new PrivateKey('F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978')
        );

        // Act:
        const exportAccount = new AccountQR(
          account.keyPair.privateKey.toString(),
          facade.network.identifier,
          'no-chain-id'
        );
        const actualJSON = exportAccount.toJSON();
        const actualObject = JSON.parse(actualJSON);

        // Assert:
        expect(actualObject).toHaveProperty('v');
        expect(actualObject).toHaveProperty('type');
        expect(actualObject).toHaveProperty('network_id');
        expect(actualObject).toHaveProperty('chain_id');
        expect(actualObject).toHaveProperty('data');
      });

      it('専門的なスキーマフィールドを含める / include specialized schema fields', () => {
        // Arrange:
        const account = facade.createAccount(
          new PrivateKey('F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978')
        );

        // Act:
        const exportAccount = new AccountQR(
          account.keyPair.privateKey.toString(),
          facade.network.identifier,
          'no-chain-id'
        );
        const actualJSON = exportAccount.toJSON();
        const actualObject = JSON.parse(actualJSON);

        // Assert:
        expect(actualObject.data).toHaveProperty('privateKey');
      });
    });

    describe('fromJSON() should', () => {
      const networkType = Network.TESTNET;

      it('秘密鍵を入力してアカウントを再構築する / reconstruct account given a private key', () => {
        // Arrange:
        const account = facade.createAccount(
          new PrivateKey('F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978')
        );

        // Act:
        const exportAccount = new AccountQR(
          account.keyPair.privateKey.toString(),
          facade.network.identifier,
          'no-chain-id'
        );
        const importAccount = AccountQR.fromJSON(exportAccount.toJSON());

        // Assert
        expect(importAccount.accountPrivateKey).toBe(exportAccount.accountPrivateKey);
      });

      it('不正なオブジェクトが与えられた場合は再構築しない / not reconstruct given an incorrect object', () => {
        // Arrange:
        const accountInfo = {
          v: 3,
          type: QRCodeType.ExportAccount,
          network_id: networkType,
          chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
          encrypted: false,
          data: {},
        };

        expect(() => {
          AccountQR.fromJSON(JSON.stringify(accountInfo));
        }).toThrow('Could not parse account information.');
      });
    });
  });
});
