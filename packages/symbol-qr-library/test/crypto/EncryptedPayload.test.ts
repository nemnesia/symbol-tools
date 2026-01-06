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

import { describe, expect, it } from 'vitest';
import { EncryptedPayload } from '../../src/crypto/EncryptedPayload';

describe('EncryptedPayload -->', () => {
  describe('fromJSON() should', () => {
    it('空のJSONを投げる / throw on empty JSON', () => {
      // Arrange:
      const json = '';

      // Act + Assert
      expect(() => {
        EncryptedPayload.fromJSON(json);
      }).toThrow('JSON argument cannot be empty.');
    });

    it('無効なJSON例外をスローする / throw on invalid JSON', () => {
      // Arrange:
      const json = '{invalidJson}';

      // Act + Assert
      expect(() => {
        EncryptedPayload.fromJSON(json);
      }).toThrow('Invalid json body in payload!');
    });

    it('暗号文プロパティが欠けている例外をスローする / throw on missing ciphertext property', () => {
      // Arrange:
      const json = '{"salt": "00"}';

      // Act + Assert
      expect(() => {
        EncryptedPayload.fromJSON(json);
      }).toThrow("Missing mandatory field 'ciphertext'.");
    });

    it('ソルトプロパティが欠けている例外をスローする / throw on missing salt property', () => {
      // Arrange:
      const json = '{"ciphertext": "00"}';

      // Act + Assert
      expect(() => {
        EncryptedPayload.fromJSON(json);
      }).toThrow("Missing mandatory field 'salt'.");
    });

    it('完全なオブジェクトを作成する / create complete object', () => {
      // Arrange:
      const json = {
        ciphertext:
          'zyFIAqnq8fihaJFqgH9gVKGT1Aa8dbxXqrcWb//Ckv7R/DJDgdXOY8ejc6KNURPGujULpv0fQnN87AQFldmCgkGYq0CBSHwhOhyCvEBK18g=',
        salt: '12345678901234567890123456789012',
      };

      // Act
      const payload = EncryptedPayload.fromJSON(JSON.stringify(json));

      // Assert
      expect(payload.ciphertext).toBeDefined();
      expect(payload.ciphertext).toBe(json.ciphertext);
      expect(payload.salt).toBeDefined();
      expect(payload.salt).toBe(json.salt);
    });

    it('データオブジェクトが暗号化されているかどうかを確認する / check if data object is encrypted', () => {
      // Arrange:
      const encryptedJson = {
        ciphertext:
          'zyFIAqnq8fihaJFqgH9gVKGT1Aa8dbxXqrcWb//Ckv7R/DJDgdXOY8ejc6KNURPGujULpv0fQnN87AQFldmCgkGYq0CBSHwhOhyCvEBK18g=',
        salt: '12345678901234567890123456789012',
      };

      const plainJson = {
        plainMnemonic: 'some mnemonic phrase here',
      };

      // Act + Assert
      expect(EncryptedPayload.isDataEncrypted(encryptedJson)).toBe(true);
      expect(EncryptedPayload.isDataEncrypted(plainJson)).toBe(false);
    });
  });
});
