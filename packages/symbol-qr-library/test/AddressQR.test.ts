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

import { Network, SymbolFacade } from 'symbol-sdk/symbol';
import { describe, expect, it } from 'vitest';
import { AddressQR } from '../src/AddressQR';
import { QRCodeType } from '../src/QRCodeType';

describe('AccountQR -->', () => {
  describe('toJSON() should', () => {
    it('必須のNIP-7 QRコード基本フィールドを含める / include mandatory NIP-7 QR Code base fields', () => {
      // Arrange:
      const name = 'test-contact-1';
      const address = new SymbolFacade.Address('TA6QZTYPOIYQYR5NRY4WQ2WRQUX2FN5UK2DO6DI');

      // Act:
      const addressQR = new AddressQR(name, address.toString(), Network.TESTNET.identifier, '');
      const actualJSON = addressQR.toJSON();
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
      const name = 'test-address-1';
      const address = new SymbolFacade.Address('TA6QZTYPOIYQYR5NRY4WQ2WRQUX2FN5UK2DO6DI');

      // Act:
      const addressQR = new AddressQR(name, address.toString(), Network.TESTNET.identifier, '');
      const actualJSON = addressQR.toJSON();
      const actualObject = JSON.parse(actualJSON);

      // Assert:
      expect(actualObject.data).toHaveProperty('name');
      expect(actualObject.data).toHaveProperty('address');
    });
  });

  describe('fromJSON() should', () => {
    it('指定されたAddressQR JSONの連絡先を再構築する / reconstruct contact given AddressQR JSON', () => {
      // Arrange:
      const address = new SymbolFacade.Address('TA6QZTYPOIYQYR5NRY4WQ2WRQUX2FN5UK2DO6DI');

      // Act:
      const exportContact = new AddressQR('nemtech', address.toString(), Network.TESTNET.identifier, 'no-chain-id');
      const importContact = AddressQR.fromJSON(exportContact.toJSON());

      // Assert
      expect(importContact.name).toBe('nemtech');
      expect(importContact.accountAddress).toBe(exportContact.accountAddress);
    });

    it('正しいJSON構造が与えられた場合の接触の再構築 / reconstruct contact given correct JSON structure', () => {
      // Arrange:
      const addressInfo = {
        v: 3,
        type: QRCodeType.ExportAddress,
        network_id: Network.TESTNET.identifier,
        chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
        data: {
          name: 'nemtech',
          address: 'TA6QZTYPOIYQYR5NRY4WQ2WRQUX2FN5UK2DO6DI',
        },
      };

      // Act:
      const addressQR = AddressQR.fromJSON(JSON.stringify(addressInfo));

      // Assert
      expect(addressQR.name).toBe('nemtech');
      expect(addressQR.accountAddress).toBe('TA6QZTYPOIYQYR5NRY4WQ2WRQUX2FN5UK2DO6DI');
    });
  });
});
