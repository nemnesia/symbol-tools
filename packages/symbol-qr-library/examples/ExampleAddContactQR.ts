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
import { ContactJson, ContactQR, QRCodeSettings, QRCodeType } from '../dist/node/index.js';
import { Example } from './Example';

export class ExampleAddContactQR extends Example {
  /**
   * `execute()`メソッドは、基盤となる例示のビジネスフローを実行する必要があります。
   *  / The `execute()` method should run the underlying example business flow.
   *
   * @return {number}
   */
  public async execute(): Promise<number> {
    // Arrange
    const contactInfo: ContactJson = {
      v: 3,
      type: QRCodeType.AddContact,
      network_id: Network.TESTNET.identifier,
      chain_id: 'no-chain-id',
      data: {
        name: 'nemtech',
        publicKey: 'D90ABF5BADC4E709E79E8F168F1629CD90D7F5B41010B7C0616C2121D516C11C',
      },
    };

    // JSONコンテンツを含むQRコードを作成する / Create QR Code with JSON content
    const contactQR = ContactQR.fromJSON(JSON.stringify(contactInfo));
    console.log('ContactQR JSON: ', contactQR.toJSON());
    console.log('ContactQR BASE64: ', await contactQR.toBase64());
    console.log('ContactQR OBJECT: ');
    console.log(await contactQR.toString(new QRCodeSettings('M', 100)));
    console.log('');
    return this.resolve(0);
  }
}
