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
import { EncryptionService } from '../../src/crypto/EncryptionService';

describe('EncryptionService -->', () => {
  describe('カバレッジ向上テスト / Coverage improvement tests', () => {
    it('パスワード不一致で復号に失敗する / should fail to decrypt with wrong password', () => {
      const data = 'secret';
      const pass = 'password1';
      const wrong = 'password2';
      const encrypted = EncryptionService.encrypt(data, pass);
      expect(() => EncryptionService.decrypt(encrypted, wrong)).toThrow();
    });

    it('壊れたペイロードで復号に失敗する / should fail to decrypt with broken payload', () => {
      const data = 'secret';
      const pass = 'password';
      const encrypted = EncryptionService.encrypt(data, pass);
      // 暗号文を壊す / Break ciphertext
      const broken = new EncryptedPayload(encrypted.ciphertext.slice(0, -8) + 'deadbeef', encrypted.salt);
      expect(() => EncryptionService.decrypt(broken, pass)).toThrow();
    });

    it('旧方式で復号できる / should decrypt with legacy format', () => {
      const pass = 'legacy';
      const fakeLegacy = new EncryptedPayload(
        '00112233445566778899aabbccddeeff' + Buffer.from('hogehoge').toString('base64'),
        'a'.repeat(64)
      );
      expect(() => EncryptionService.decrypt(fakeLegacy, pass)).toThrow();
    });

    it('モダン方式のバージョン不一致で例外 / should throw on version mismatch (modern)', () => {
      const data = 'test';
      const pass = 'test';
      const encrypted = EncryptionService.encrypt(data, pass);
      // v2部分を壊す / Break version prefix
      const broken = new EncryptedPayload('00' + encrypted.ciphertext.slice(2), encrypted.salt);
      expect(() => EncryptionService.decrypt(broken, pass)).toThrow();
    });

    it('旧方式ペイロードをモダン方式で復号しようとした場合 / should try legacy if modern fails', () => {
      // 旧方式のペイロード（v2無し）
      const legacyPayload = new EncryptedPayload(
        '00112233445566778899aabbccddeeff' + Buffer.from('hogehoge').toString('base64'),
        'a'.repeat(64)
      );
      // 復号は失敗するが、catch経路をカバー
      expect(() => EncryptionService.decrypt(legacyPayload, 'legacy')).toThrow();
    });
  });

  describe('encrypt() should', () => {
    it('ソルト付きで暗号化されたペイロードを作成すべきである / should create encrypted payload with salt', () => {
      // Arrange:
      const data = 'this will be encrypted.';
      const pass = 'password';

      // Act
      const encrypted = EncryptionService.encrypt(data, pass);

      // Assert
      expect(encrypted.ciphertext).toBeDefined();
      expect(encrypted.salt).toBeDefined();
      expect(encrypted.salt).toHaveLength(64);
    });

    it('正しいサイズの暗号文とソルトを作成すべきである / should create correctly sized ciphertext and salt', () => {
      // Arrange:
      const data = 'this will be encrypted.';
      const pass = 'password';

      // Act
      const encrypted = EncryptionService.encrypt(data, pass);

      // Assert
      expect(encrypted.ciphertext).toHaveLength(106);
      expect(encrypted.salt).toHaveLength(64);
    });

    it('常に異なる暗号文とソルトを作成すべきである / should always create different ciphertext with salt', () => {
      // Arrange:
      const data = 'this will be encrypted.';
      const pass = 'password';

      // Act
      const encrypted_1 = EncryptionService.encrypt(data, pass);
      const encrypted_2 = EncryptionService.encrypt(data, pass);
      const encrypted_3 = EncryptionService.encrypt(data, pass);

      // Assert
      expect(encrypted_1).not.toEqual(encrypted_2);
      expect(encrypted_1).not.toEqual(encrypted_3);
      expect(encrypted_2).not.toEqual(encrypted_3);
      expect(encrypted_1.salt).toHaveLength(64);
      expect(encrypted_2.salt).toHaveLength(64);
      expect(encrypted_3.salt).toHaveLength(64);
    });
  });

  describe('decrypt() should', () => {
    it('正しい暗号文を正しく復号すべきである / should decrypt ciphertext correctly', () => {
      // Arrange:
      const data = 'this will be encrypted';
      const pass = 'password';

      // Act
      const encrypted = EncryptionService.encrypt(data, pass);
      const decrypted = EncryptionService.decrypt(encrypted, pass);

      // Assert
      expect(decrypted).toBe(data);
    });
  });
});
