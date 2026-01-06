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
import { QRCodeBase } from '../src/core/QRCodeBase';
import { QRCodeDataSchema } from '../src/core/QRCodeDataSchema';
import { QRCodeInterface } from '../src/core/QRCodeInterface';
import { QRCodeType } from '../src/QRCodeType';
import { ExportObjectDataSchema } from '../src/schemas/ExportObjectDataSchema';

/// region Mock for QRCode specialization
// テスト用に抽象クラスを拡張する / extend abstract class for tests
class FakeQR extends QRCodeBase implements QRCodeInterface {
  constructor(
    public readonly object: any,
    public readonly networkType: number,
    public readonly generationHash: string
  ) {
    super(QRCodeType.ExportObject, networkType, generationHash);
  }

  toJSON(): string {
    // このQRコード用のデータスキーマを取得する / get the QR Code Data Schema
    const schema = this.getSchema();

    // このQRコード用のJSONオブジェクトを作成する / create the JSON object for this QR Code
    const json = schema.toObject(this);

    // JSON形式に変換 / format to JSON
    return JSON.stringify(json);
  }

  public getSchema(): QRCodeDataSchema {
    return new ExportObjectDataSchema();
  }

  public getTypeNumber(): number {
    return 10;
  }
}
/// end-region Mock for QRCode specialization

describe('QRCode -->', () => {
  describe('toBase64() should', () => {
    it('同じオブジェクトから同じBase64を生成する / create same Base64 given same objects', async () => {
      // Arrange:
      const object1 = { test1: 'test1' };
      const object2 = { test1: 'test1' };

      // Act:
      const fakeQR1 = new FakeQR(object1, Network.TESTNET.identifier, 'no-chain-id');
      const fakeQR2 = new FakeQR(object2, Network.TESTNET.identifier, 'no-chain-id');

      // Assert:
      expect(await fakeQR1.toBase64()).toBe(await fakeQR2.toBase64());
    });

    it('異なるオブジェクトから異なるBase64を生成する / create different Base64 given different objects', async () => {
      // Arrange:
      const object1 = { test1: 'test1' };
      const object2 = { test2: 'test2' };

      // Act:
      const fakeQR1 = new FakeQR(object1, Network.TESTNET.identifier, 'no-chain-id');
      const fakeQR2 = new FakeQR(object2, Network.TESTNET.identifier, 'no-chain-id');

      // Assert:
      expect(await fakeQR1.toBase64()).not.toBe(await fakeQR2.toBase64());
    });
  });

  describe('toString() should', () => {
    it('同じオブジェクトから同じ文字列を生成する / create same string given same objects', async () => {
      // Arrange:
      const object1 = { test1: 'test1' };
      const object2 = { test1: 'test1' };

      // Act:
      const fakeQR1 = new FakeQR(object1, Network.TESTNET.identifier, 'no-chain-id');
      const fakeQR2 = new FakeQR(object2, Network.TESTNET.identifier, 'no-chain-id');

      // Assert:
      expect(await fakeQR1.toString()).toBe(await fakeQR2.toString());
    });

    it('異なるオブジェクトから異なる文字列を生成する / create different string given different objects', async () => {
      // Arrange:
      const object1 = { test1: 'test1' };
      const object2 = { test2: 'test2' };

      // Act:
      const fakeQR1 = new FakeQR(object1, Network.TESTNET.identifier, 'no-chain-id');
      const fakeQR2 = new FakeQR(object2, Network.TESTNET.identifier, 'no-chain-id');

      // Assert:
      expect(await fakeQR1.toString()).not.toBe(await fakeQR2.toString());
    });
  });
});
