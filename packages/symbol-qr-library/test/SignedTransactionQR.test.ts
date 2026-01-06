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

import { Network } from 'symbol-sdk/symbol';
import { describe, expect, it } from 'vitest';
import { SignedTransactionQR } from '../src/SignedTransactionQR';
import { SignedTransaction } from '../src/types/SignedTransaction';

describe('SignedTransactionQR -->', () => {
  describe('toJSON() should', () => {
    it('必須のNIP-7 QRコード基本フィールドを含める / include mandatory NIP-7 QR Code base fields', () => {
      // Arrange:
      const signedTransaction: SignedTransaction = {
        payload:
          'B00000000000000025AC0C5FC22F650C655B5945DB23CED1F9411A4850AC95D057D7657722AF94B09D8E57522F23359695F98BEEDD1E9228F7DD010911EB2323BF5120B68F871C0FB863173F9E4924CA5EB63BFC13689E27F603C29AD8C82615A10531329BF7A94E00000000019854419029E30000000000BCB24E71160000009852701708153EB74C71713F0AC7C56F5DE5670E061759540000010000000000CE8BA0672E21C0720000000000000000',
        hash: '0021101E4D0449182293F8CE25A16FB05FCCA08D67320923DA5E11BADE9C6F67',
        signerPublicKey: 'B863173F9E4924CA5EB63BFC13689E27F603C29AD8C82615A10531329BF7A94E',
        type: 16724,
        networkType: 152,
      };

      // Act:
      const signedTx = new SignedTransactionQR(signedTransaction, Network.TESTNET.identifier, 'no-chain-id');
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
      const signedTransaction: SignedTransaction = {
        payload:
          'B00000000000000025AC0C5FC22F650C655B5945DB23CED1F9411A4850AC95D057D7657722AF94B09D8E57522F23359695F98BEEDD1E9228F7DD010911EB2323BF5120B68F871C0FB863173F9E4924CA5EB63BFC13689E27F603C29AD8C82615A10531329BF7A94E00000000019854419029E30000000000BCB24E71160000009852701708153EB74C71713F0AC7C56F5DE5670E061759540000010000000000CE8BA0672E21C0720000000000000000',
        hash: '0021101E4D0449182293F8CE25A16FB05FCCA08D67320923DA5E11BADE9C6F67',
        signerPublicKey: 'B863173F9E4924CA5EB63BFC13689E27F603C29AD8C82615A10531329BF7A94E',
        type: 16724,
        networkType: 152,
      };

      // Act:
      const qr = new SignedTransactionQR(
        signedTransaction,
        Network.TESTNET.identifier,
        '443931795E15914146B774AE550762046525AF94E2C8E32F8DDFA9194D89A567'
      );
      const actualJSON = qr.toJSON();
      const actualObject = JSON.parse(actualJSON);

      // Assert:
      expect(actualObject.data).toHaveProperty('payload');
      expect(actualObject.data.payload).toHaveProperty('payload');
      expect(actualObject.data.payload).toHaveProperty('hash');
      expect(actualObject.data.payload).toHaveProperty('signerPublicKey');
      expect(actualObject.data.payload).toHaveProperty('type');
      expect(actualObject.data.payload).toHaveProperty('networkType');
    });
  });

  describe('fromJSON() should', () => {
    it('署名済みトランザクションを再構築する / reconstruct signed transaction', () => {
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

      // Act:
      const reconstructedQR = SignedTransactionQR.fromJSON(qr.toJSON());

      // Assert
      expect(JSON.stringify(qr.signedTransaction)).toBe(JSON.stringify(reconstructedQR.signedTransaction));
    });
  });
});
