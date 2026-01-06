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

import { PublicKey } from 'symbol-sdk';
import { Network, SymbolFacade } from 'symbol-sdk/symbol';
import { beforeAll, describe, expect, it } from 'vitest';
import { ContactQR } from '../src/ContactQR';
import { QRCodeType } from '../src/QRCodeType';

describe('ContactQR -->', () => {
  let facade: SymbolFacade;

  beforeAll(() => {
    facade = new SymbolFacade('testnet');
  });

  describe('toJSON() should', () => {
    it('必須のNIP-7 QRコード基本フィールドを含める / include mandatory NIP-7 QR Code base fields', () => {
      // Arrange:
      const name = 'test-contact-1';
      const account = facade.createPublicAccount(
        new PublicKey('C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268')
      );

      // Act:
      const addContact = new ContactQR(name, account.publicKey.toString(), Network.TESTNET.identifier, '');
      const actualJSON = addContact.toJSON();
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
      const name = 'test-contact-1';
      const account = facade.createPublicAccount(
        new PublicKey('C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268')
      );

      // Act:
      const addContact = new ContactQR(name, account.publicKey.toString(), Network.TESTNET.identifier, '');
      const actualJSON = addContact.toJSON();
      const actualObject = JSON.parse(actualJSON);

      // Assert:
      expect(actualObject.data).toHaveProperty('name');
      expect(actualObject.data).toHaveProperty('publicKey');
    });
  });

  describe('fromJSON() should', () => {
    it('ContactQR JSON による接触履歴の再構築 / reconstruct contact given ContactQR JSON', () => {
      // Arrange:
      const account = facade.createPublicAccount(
        new PublicKey('C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268')
      );

      // Act:
      const exportContact = new ContactQR(
        'nemtech',
        account.publicKey.toString(),
        Network.TESTNET.identifier,
        'no-chain-id'
      );
      const importContact = ContactQR.fromJSON(exportContact.toJSON());

      // Assert
      expect(importContact.name).toBe('nemtech');
      expect(importContact.accountPublicKey).toBe(exportContact.accountPublicKey);
    });

    it('正しいJSON構造が与えられた場合の接触の再構築 / reconstruct contact given correct JSON structure', () => {
      // Arrange:
      const contactInfo = {
        v: 3,
        type: QRCodeType.AddContact,
        network_id: Network.TESTNET.identifier,
        chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
        data: {
          name: 'nemtech',
          publicKey: 'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
        },
      };

      // Act:
      const importContact = ContactQR.fromJSON(JSON.stringify(contactInfo));

      // Assert
      expect(importContact.name).toBe('nemtech');
      expect(importContact.accountPublicKey).toBe('C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268');
    });
  });
});
