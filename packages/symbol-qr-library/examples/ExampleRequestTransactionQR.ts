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
import { QRCodeSettings, QRCodeType, TransactionQR } from '../dist/node/index.js';
import { Example } from './Example';

export class ExampleRequestTransactionQR extends Example {
  /**
   * `execute()`メソッドは、基盤となる例示のビジネスフローを実行する必要があります。
   *  / The `execute()` method should run the underlying example business flow.
   *
   * この例では、以下の詳細を持つ符号なし転送トランザクションを使用します：
   *  / This example uses an unsigned transfer transaction with following details:
   *    - Recipient: namespaceId "nemtech"
   *    - Mosaics: 1 mosaic with namespaceId "symbol.xym" and absolute amount 1
   *    - Message: Empty
   *
   * @return {number}
   */
  public async execute(): Promise<number> {
    const unsignedTransferInfo = {
      v: 3,
      type: QRCodeType.RequestTransaction,
      network_id: Network.TESTNET,
      chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
      data: {
        payload:
          'B800000000000000000000000000000000000000000000000000000000000000' +
          '0000000000000000000000000000000000000000000000000000000000000000' +
          '0000000000000000EBE58AE423DC9549E8B15C5D8E5E4E94F982EA14FB35DF84' +
          '6B24C8ED77A77A8E0000000001985441E047000000000000263B067916000000' +
          '9839D6E1C14864928B58BBD4C56AFC0EE92FF6F1C13E83310800010000000000' +
          'EEAFF441BA994BE720D6130000000000006D657373616765',
      },
    };

    // JSONコンテンツを含むQRコードを作成する / Create QR Code with JSON content
    const transactionQR = TransactionQR.fromJSON(JSON.stringify(unsignedTransferInfo));

    console.log('TransactionQR JSON: ', transactionQR.toJSON());
    console.log('TransactionQR BASE64: ', await transactionQR.toBase64());
    console.log('TransactionQR OBJECT: ');
    console.log(await transactionQR.toString(new QRCodeSettings('M', 100)));
    console.log('');
    return this.resolve(0);
  }
}
