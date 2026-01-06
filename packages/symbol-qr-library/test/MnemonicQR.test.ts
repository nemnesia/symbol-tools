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

import { Bip32 } from 'symbol-sdk';
import { Network } from 'symbol-sdk/symbol';
import { describe, expect, it } from 'vitest';
import { MnemonicQR } from '../src/MnemonicQR';
import { QRCodeType } from '../src/QRCodeType';

describe('MnemonicQR -->', () => {
  describe('with password -->', () => {
    describe('toJSON() should', () => {
      it('必須のNIP-7 QRコード基本フィールドを含める / include mandatory NIP-7 QR Code base fields', () => {
        // Arrange:
        const bip32 = new Bip32();
        const mnemonic = bip32.random();

        // Act:
        const exportMnemonic = new MnemonicQR(mnemonic, Network.TESTNET.identifier, 'no-chain-id', 'password');
        const actualJSON = exportMnemonic.toJSON();
        const actualObject = JSON.parse(actualJSON);

        // Assert:
        expect(actualObject).to.have.property('v');
        expect(actualObject).to.have.property('type');
        expect(actualObject).to.have.property('network_id');
        expect(actualObject).to.have.property('chain_id');
        expect(actualObject).to.have.property('data');
      });

      it('専門的なスキーマフィールドを含める / include specialized schema fields', () => {
        // Arrange:
        const bip32 = new Bip32();
        const mnemonic = bip32.random();

        // Act:
        const exportMnemonic = new MnemonicQR(mnemonic, Network.TESTNET.identifier, 'no-chain-id', 'password');
        const actualJSON = exportMnemonic.toJSON();
        const actualObject = JSON.parse(actualJSON);

        // Assert:
        expect(actualObject.data).toHaveProperty('ciphertext');
        expect(actualObject.data).toHaveProperty('salt');
      });
    });

    describe('fromJSON() should', () => {
      it('不正なパスワード例外をスローする / throw error given wrong password', () => {
        // Arrange:
        const bip32 = new Bip32();
        const mnemonic = bip32.random();

        // Act:
        const exportMnemonic = new MnemonicQR(mnemonic, Network.TESTNET.identifier, 'no-chain-id', 'password');

        // Act + Assert
        expect(() => {
          MnemonicQR.fromJSON(exportMnemonic.toJSON(), 'wrong-password');
        }).toThrow('Could not parse mnemonic pass phrase.');
      });

      it('無効な暗号化ペイロード例外をスローする / throw error given encrypted payload is invalid', () => {
        // Arrange:
        const accountInfo: any = {
          v: 3,
          type: QRCodeType.ExportMnemonic,
          network_id: Network.TESTNET.identifier,
          chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
          data: {
            // 'ciphertext' field for encrypted payload missing
            salt: 'b248953e9ebfa269cd7b940f9c03d2d4b192f90db61638375b5e78296bbe675a',
          },
        };

        // Act + Assert
        expect(() => {
          MnemonicQR.fromJSON(JSON.stringify(accountInfo), 'password');
        }).toThrow('Could not parse mnemonic pass phrase.');
      });

      it('正しいパスワードが与えられた場合にニーモニックパスフレーズを再構築する / reconstruct mnemonic pass phrase given correct password', () => {
        // Arrange:
        const bip32 = new Bip32();
        const mnemonic = bip32.random();

        // Act:
        const exportMnemonic = new MnemonicQR(mnemonic, Network.TESTNET.identifier, 'no-chain-id', 'password');
        const importMnemonic = MnemonicQR.fromJSON(exportMnemonic.toJSON(), 'password');

        // Assert
        expect(importMnemonic.mnemonicPlainText).toBe(mnemonic);
      });

      it('正しい暗号文とパスワードが与えられた場合にニーモニックパスフレーズを再構築する / reconstruct mnemonic pass phrase given correct ciphertext and password', () => {
        // Arrange:
        const mnemonicInfo = {
          v: 3,
          type: QRCodeType.ExportMnemonic,
          network_id: Network.TESTNET,
          chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
          data: {
            ciphertext:
              '964322228f401a2ec576ac256cbbdce29YfW+CykqESzGSzDYuKJxJUSpQ4woqMdD8Up7mjbow09I/UYV4e8HEgbhjlLjf30YLlQ+JKLBTf9kUGMnp3tZqYSq3lLZRDp8TVE6GzHiX4V59RTP7BOixwpDWDmfOP0B0i+Q1s0+OPfmyck4p7YZkVNi/HYvQF4kDV27sjRTZKs+uETKA0Ae0rl17d9EMV3eLUVcWEGE/ChgEfmnMlN1g==',
            salt: 'b248953e9ebfa269cd7b940f9c03d2d4b192f90db61638375b5e78296bbe675a',
          },
        };

        // Act:
        const importMnemonic = MnemonicQR.fromJSON(JSON.stringify(mnemonicInfo), 'password');

        // Assert
        expect(importMnemonic.mnemonicPlainText).toBe(
          'stumble shoot spawn bitter ' +
            'forest waste attitude chest ' +
            'square kite dawn photo ' +
            'twice message bargain trap ' +
            'spin vote lamp wire ' +
            'also either else pupil'
        );
      });
    });
  });

  describe('with no password -->', () => {
    describe('toJSON() should', () => {
      it('必須のNIP-7 QRコード基本フィールドを含める / include mandatory NIP-7 QR Code base fields', () => {
        // Arrange:
        const bip32 = new Bip32();
        const mnemonic = bip32.random();

        // Act:
        const exportMnemonic = new MnemonicQR(mnemonic, Network.TESTNET.identifier, 'no-chain-id');
        const actualJSON = exportMnemonic.toJSON();
        const actualObject = JSON.parse(actualJSON);

        // Assert:
        expect(actualObject).to.have.property('v');
        expect(actualObject).to.have.property('type');
        expect(actualObject).to.have.property('network_id');
        expect(actualObject).to.have.property('chain_id');
        expect(actualObject).to.have.property('data');
      });

      it('専門的なスキーマフィールドを含める / include specialized schema fields', () => {
        // Arrange:
        const bip32 = new Bip32();
        const mnemonic = bip32.random();

        // Act:
        const exportMnemonic = new MnemonicQR(mnemonic, Network.TESTNET.identifier, 'no-chain-id');
        const actualJSON = exportMnemonic.toJSON();
        const actualObject = JSON.parse(actualJSON);

        // Assert:
        expect(actualObject.data).toHaveProperty('plainMnemonic');
      });
    });

    describe('fromJSON() should', () => {
      it('パスワードが与えられた場合に、QRコードが暗号化されていなくてもエラーをスローしない / not throw error given a password when the qr is not encrypted', () => {
        // Arrange:
        const bip32 = new Bip32();
        const mnemonic = bip32.random();

        // Act:
        const exportMnemonic = new MnemonicQR(mnemonic, Network.TESTNET.identifier, 'no-chain-id');

        // Act + Assert
        expect(() => {
          MnemonicQR.fromJSON(exportMnemonic.toJSON(), 'password');
        }).not.toThrow('Could not parse mnemonic pass phrase.');
      });

      it('正しいplainMnemonicデータが与えられた場合にニーモニックパスフレーズを再構築する / reconstruct mnemonic pass phrase given a correct plainMnemonic data', () => {
        // Arrange:
        const bip32 = new Bip32();
        const mnemonic = bip32.random();

        // Act:
        const exportMnemonic = new MnemonicQR(mnemonic, Network.TESTNET.identifier, 'no-chain-id');
        const importMnemonic = MnemonicQR.fromJSON(exportMnemonic.toJSON());

        // Assert
        expect(importMnemonic.mnemonicPlainText).toBe(mnemonic);
      });
    });
  });
});
