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
import { descriptors, generateMosaicAliasId, models, Network, SymbolFacade } from 'symbol-sdk/symbol';
import { beforeAll, describe, expect, it } from 'vitest';
import { TransactionQR } from '../src/TransactionQR';

describe('TransactionQR -->', () => {
  let facade: SymbolFacade;

  beforeAll(() => {
    facade = new SymbolFacade('testnet');
  });

  describe('toJSON() should', () => {
    it('必須のNIP-7 QRコード基本フィールドを含める / include mandatory NIP-7 QR Code base fields', () => {
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
      const requestTx = new TransactionQR(transferTx, Network.TESTNET.identifier, '');
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
      const requestTx = new TransactionQR(transferTx, Network.TESTNET.identifier, '');
      const actualJSON = requestTx.toJSON();
      const actualObject = JSON.parse(actualJSON);

      // Assert:
      expect(actualObject.data).toHaveProperty('payload');
    });
  });

  describe('fromJSON() should', () => {
    it('トランザクションを再構築する / reconstruct transaction', () => {
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
      const qr = new TransactionQR(
        transferTx,
        Network.TESTNET.identifier,
        '443931795E15914146B774AE550762046525AF94E2C8E32F8DDFA9194D89A567'
      );

      // Act:
      const reconstructedQR = TransactionQR.fromJSON(qr.toJSON());

      // Assert
      expect(qr.transaction.toJson()).toEqual(reconstructedQR.transaction.toJson());
    });
  });
});
