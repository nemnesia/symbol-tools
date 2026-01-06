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

import { PublicKey, utils } from 'symbol-sdk';
import { descriptors, models, Network, SymbolFacade } from 'symbol-sdk/symbol';
import { beforeAll, describe, expect, it } from 'vitest';
import { CosignatureQR } from '../src/CosignatureQR';
import { QRCodeType } from '../src/QRCodeType';

describe('CosignatureQR -->', () => {
  let facade: SymbolFacade;
  let aggregateTx: models.Transaction;

  beforeAll(() => {
    facade = new SymbolFacade('testnet');

    const publicAccount = facade.createPublicAccount(
      new PublicKey('C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268')
    );
    const innerDescriptor = new descriptors.TransferTransactionV1Descriptor(
      publicAccount.address,
      [], // 送信モザイク
      'tx1' // 平文メッセージ
    );
    const innerTx = facade.createEmbeddedTransactionFromTypedDescriptor(innerDescriptor, publicAccount.publicKey);

    const embeddedTransactions = [innerTx];
    const aggregateDescriptor = new descriptors.AggregateCompleteTransactionV3Descriptor(
      facade.static.hashEmbeddedTransactions(embeddedTransactions),
      embeddedTransactions
    );
    aggregateTx = facade.createTransactionFromTypedDescriptor(
      aggregateDescriptor,
      publicAccount.publicKey,
      100,
      60 * 60 * 2,
      0
    );
  });

  describe('toJSON() should', () => {
    it('必須のNIP-7 QRコード基本フィールドを含める / include mandatory NIP-7 QR Code base fields', () => {
      // Arrange:

      // Act:
      const requestTx = new CosignatureQR(aggregateTx, Network.TESTNET.identifier, 'no-chain-id');
      const actualJSON = requestTx.toJSON();
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

      // Act:
      const requestTx = new CosignatureQR(aggregateTx, Network.TESTNET.identifier, 'no-chain-id');
      const actualJSON = requestTx.toJSON();
      const actualObject = JSON.parse(actualJSON);

      // Assert:
      expect(actualObject.data).toHaveProperty('payload');
    });
  });

  describe('fromJSON() should', () => {
    it('署名済みトランザクションを再構築する / reconstruct aggregate bonded given CosignatureQR JSON', () => {
      // Arrange:

      // Act:
      const exportCosig = new CosignatureQR(aggregateTx, Network.TESTNET.identifier, 'no-chain-id');
      const importCosig = CosignatureQR.fromJSON(exportCosig.toJSON());

      // Assert
      expect(importCosig.transaction.toString()).toBe(exportCosig.transaction.toString());
    });

    it('正しいJSON構造が与えられた場合に集約ボンデッドを再構築する / reconstruct aggregate bonded given correct JSON structure', () => {
      // Arrange:
      const cosigInfo = {
        v: 3,
        type: QRCodeType.RequestCosignature,
        network_id: Network.TESTNET.identifier,
        chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
        data: {
          payload:
            'F8000000000000004DD933EBA4A6D891027AFB3924F0C61CD07B5C2FE2A38932' +
            '606C267E158817F96C984368CDCCDD79AB3C0C8D1324A7B371AB34C17ED0820B' +
            'C38E8D7579FAE70BCA623B00FBA6BCB2CF9795101358BA1B78D0C7C6FDAA663D' +
            '47A293D98E64208D000000000198414240420F000000000082A4BFF204000000' +
            'BD0AC0B63BC81EB6E16F83440E0D1FB01B24EFEF0225ED1856D7AEC17317EEFA' +
            '50000000000000005000000000000000CA623B00FBA6BCB2CF9795101358BA1B' +
            '78D0C7C6FDAA663D47A293D98E64208D00000000019855410101010000000000' +
            '982C9D33E132AC60BDD430FAD1A8F818E1F7407AF1D2C642',
        },
      };

      // Act:
      const importCosig = CosignatureQR.fromJSON(JSON.stringify(cosigInfo));

      // Assert:
      expect(utils.uint8ToHex(importCosig.transaction.serialize())).toBe(cosigInfo.data.payload);
    });
  });
});
