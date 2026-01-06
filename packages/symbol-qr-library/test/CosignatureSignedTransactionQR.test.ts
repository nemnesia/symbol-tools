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

import { utils } from 'symbol-sdk';
import { models, Network } from 'symbol-sdk/symbol';
import { describe, expect, it } from 'vitest';
import { CosignatureSignedTransactionQR } from '../src/CosignatureSignedTransactionQR';

describe('CosignatureSignedTransactionQR -->', () => {
  describe('toJSON() should', () => {
    it('必須のNIP-7 QRコード基本フィールドを含める / include mandatory NIP-7 QR Code base fields', () => {
      // Arrange:
      const cosignature = models.DetachedCosignature.deserialize(
        utils.hexToUint8(
          '000000000000000094EC711522B4B32A1B6A6ED61D86D1E3EE11AFB9B912A17F8983EED3808819FDA76C305D496FEE26E9807179B50FF5710C3AED7D13E2A04AC55DEEA2C1710C921BCEE653FB40DCE4BED474390B8918A9E675EA58221FDD95DD167AD88F5B610278E473A30572F8E54355CD1255B4B490106C3D2841A1674B17038FA752CDDA52'
        )
      );

      // Act:
      const signedTx = new CosignatureSignedTransactionQR(cosignature, Network.TESTNET.identifier, '');
      const actualJSON = signedTx.toJSON();
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
      const cosignature = models.DetachedCosignature.deserialize(
        utils.hexToUint8(
          '000000000000000094EC711522B4B32A1B6A6ED61D86D1E3EE11AFB9B912A17F8983EED3808819FDA76C305D496FEE26E9807179B50FF5710C3AED7D13E2A04AC55DEEA2C1710C921BCEE653FB40DCE4BED474390B8918A9E675EA58221FDD95DD167AD88F5B610278E473A30572F8E54355CD1255B4B490106C3D2841A1674B17038FA752CDDA52'
        )
      );

      // Act:
      const qr = new CosignatureSignedTransactionQR(
        cosignature,
        Network.TESTNET.identifier,
        '443931795E15914146B774AE550762046525AF94E2C8E32F8DDFA9194D89A567'
      );
      const actualJSON = qr.toJSON();
      const actualObject = JSON.parse(actualJSON);

      // Assert:
      expect(actualObject.data.payload).toHaveProperty('signature');
    });
  });

  describe('fromJSON() should', () => {
    it('署名済みトランザクションを再構築する / reconstruct signed transaction', () => {
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

      // Act:
      const reconstructedQR = CosignatureSignedTransactionQR.fromJSON(qr.toJSON());

      // Assert
      expect(utils.uint8ToHex(qr.cosignature.signature.serialize())).toBe(
        utils.uint8ToHex(reconstructedQR.cosignature.signature.serialize())
      );
    });

    it('署名済みトランザクションを再構築する(version:higher,lower) / reconstruct signed transaction (version:higher,lower)', () => {
      // Arrange:
      const json = {
        v: 3,
        type: 9,
        network_id: 152,
        chain_id: '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4',
        data: {
          payload: {
            parentHash: '0B0C78D55BBBADD59AA6614DEA07E4A06B81709F934C279820A013D11017E57E',
            signature:
              '48ED11188F65E68AF8A80AF16E5881D06B2951073CB3C4A7B4DC9ED9BAE1EE6D5472EFCE0E18124EF04D4214E6055E46D4BE9C553595AF915DCAED0921326105',
            signerPublicKey: 'B863173F9E4924CA5EB63BFC13689E27F603C29AD8C82615A10531329BF7A94E',
            version: {
              lower: 0,
              higher: 0,
            },
          },
        },
      };

      // Act:
      const reconstructedQR = CosignatureSignedTransactionQR.fromJSON(JSON.stringify(json));

      // Assert
      const expectJson = {
        v: 3,
        type: 9,
        network_id: 152,
        chain_id: '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4',
        data: {
          payload: {
            parentHash: '0B0C78D55BBBADD59AA6614DEA07E4A06B81709F934C279820A013D11017E57E',
            signature:
              '48ED11188F65E68AF8A80AF16E5881D06B2951073CB3C4A7B4DC9ED9BAE1EE6D5472EFCE0E18124EF04D4214E6055E46D4BE9C553595AF915DCAED0921326105',
            signerPublicKey: 'B863173F9E4924CA5EB63BFC13689E27F603C29AD8C82615A10531329BF7A94E',
            version: '0',
          },
        },
      };
      expect(JSON.parse(JSON.stringify(expectJson))).toEqual(JSON.parse(reconstructedQR.toJSON()));
    });
  });
});
