import { describe, it, expect } from 'vitest';
import { AesCbcCipher, AesGcmCipher } from '../src/Cipher.js';
import { SharedKey256 } from '../src/CryptoTypes.js';

describe('AesCbcCipher', () => {
	const createTestKey = () => {
		return new SharedKey256(new Uint8Array(32).fill(0x42));
	};

	const createTestIv = () => {
		return new Uint8Array(16).fill(0x12);
	};

	describe('constructor', () => {
		it('AES共有鍵で暗号化オブジェクトを作成できる', () => {
			const key = createTestKey();
			const cipher = new AesCbcCipher(key);
			
			expect(cipher).toBeDefined();
		});
	});

	describe('encrypt', () => {
		it('平文を暗号化できる', async () => {
			const key = createTestKey();
			const cipher = new AesCbcCipher(key);
			const clearText = new TextEncoder().encode('Hello, World!');
			const iv = createTestIv();
			
			const cipherText = await cipher.encrypt(clearText, iv);
			
			expect(cipherText).toBeInstanceOf(Uint8Array);
			expect(cipherText.length).toBeGreaterThan(0);
			expect(cipherText).not.toEqual(clearText);
		});

		it('同じ平文とIVで同じ暗号文を生成する', async () => {
			const key = createTestKey();
			const cipher = new AesCbcCipher(key);
			const clearText = new TextEncoder().encode('Test message');
			const iv = createTestIv();
			
			const cipherText1 = await cipher.encrypt(clearText, iv);
			const cipherText2 = await cipher.encrypt(clearText, iv);
			
			expect(cipherText1).toEqual(cipherText2);
		});

		it('異なるIVで異なる暗号文を生成する', async () => {
			const key = createTestKey();
			const cipher = new AesCbcCipher(key);
			const clearText = new TextEncoder().encode('Test message');
			const iv1 = new Uint8Array(16).fill(0x01);
			const iv2 = new Uint8Array(16).fill(0x02);
			
			const cipherText1 = await cipher.encrypt(clearText, iv1);
			const cipherText2 = await cipher.encrypt(clearText, iv2);
			
			expect(cipherText1).not.toEqual(cipherText2);
		});

		it('空の平文を暗号化できる', async () => {
			const key = createTestKey();
			const cipher = new AesCbcCipher(key);
			const clearText = new Uint8Array(0);
			const iv = createTestIv();
			
			const cipherText = await cipher.encrypt(clearText, iv);
			
			expect(cipherText).toBeInstanceOf(Uint8Array);
		});

		it('大きなデータを暗号化できる', async () => {
			const key = createTestKey();
			const cipher = new AesCbcCipher(key);
			const clearText = new Uint8Array(1024).fill(0xFF);
			const iv = createTestIv();
			
			const cipherText = await cipher.encrypt(clearText, iv);
			
			expect(cipherText).toBeInstanceOf(Uint8Array);
			expect(cipherText.length).toBeGreaterThan(0);
		});
	});

	describe('decrypt', () => {
		it('暗号文を復号化できる', async () => {
			const key = createTestKey();
			const cipher = new AesCbcCipher(key);
			const originalText = new TextEncoder().encode('Hello, World!');
			const iv = createTestIv();
			
			const cipherText = await cipher.encrypt(originalText, iv);
			const decryptedText = await cipher.decrypt(cipherText, iv);
			
			expect(decryptedText).toEqual(originalText);
		});

		it('複数回の暗号化と復号化で元のデータを保持する', async () => {
			const key = createTestKey();
			const cipher = new AesCbcCipher(key);
			const originalText = new TextEncoder().encode('Test message for encryption');
			const iv = createTestIv();
			
			const encrypted1 = await cipher.encrypt(originalText, iv);
			const decrypted1 = await cipher.decrypt(encrypted1, iv);
			const encrypted2 = await cipher.encrypt(decrypted1, iv);
			const decrypted2 = await cipher.decrypt(encrypted2, iv);
			
			expect(decrypted2).toEqual(originalText);
		});

		it('空の暗号文を復号化できる', async () => {
			const key = createTestKey();
			const cipher = new AesCbcCipher(key);
			const clearText = new Uint8Array(0);
			const iv = createTestIv();
			
			const cipherText = await cipher.encrypt(clearText, iv);
			const decryptedText = await cipher.decrypt(cipherText, iv);
			
			expect(decryptedText).toEqual(clearText);
		});

		it('異なるIVでは正しく復号化できない', async () => {
			const key = createTestKey();
			const cipher = new AesCbcCipher(key);
			const originalText = new TextEncoder().encode('Secret message');
			const iv1 = new Uint8Array(16).fill(0x01);
			const iv2 = new Uint8Array(16).fill(0x02);
			
			const cipherText = await cipher.encrypt(originalText, iv1);
			const decryptedText = await cipher.decrypt(cipherText, iv2);
			
			expect(decryptedText).not.toEqual(originalText);
		});
	});
});

describe('AesGcmCipher', () => {
	const createTestKey = () => {
		return new SharedKey256(new Uint8Array(32).fill(0x42));
	};

	const createTestIv = () => {
		return new Uint8Array(12).fill(0x12); // GCMは通常12バイトのIVを使用
	};

	describe('TAG_SIZE', () => {
		it('タグサイズが16バイトである', () => {
			expect(AesGcmCipher.TAG_SIZE).toBe(16);
		});
	});

	describe('constructor', () => {
		it('AES共有鍵で暗号化オブジェクトを作成できる', () => {
			const key = createTestKey();
			const cipher = new AesGcmCipher(key);
			
			expect(cipher).toBeDefined();
		});
	});

	describe('encrypt', () => {
		it('平文を暗号化し、タグを付加できる', async () => {
			const key = createTestKey();
			const cipher = new AesGcmCipher(key);
			const clearText = new TextEncoder().encode('Hello, World!');
			const iv = createTestIv();
			
			const cipherTextWithTag = await cipher.encrypt(clearText, iv);
			
			expect(cipherTextWithTag).toBeInstanceOf(Uint8Array);
			expect(cipherTextWithTag.length).toBeGreaterThan(clearText.length);
			// 暗号文 + 16バイトタグ
			expect(cipherTextWithTag.length).toBeGreaterThanOrEqual(clearText.length + AesGcmCipher.TAG_SIZE);
		});

		it('同じ平文とIVで同じ暗号文を生成する', async () => {
			const key = createTestKey();
			const cipher = new AesGcmCipher(key);
			const clearText = new TextEncoder().encode('Test message');
			const iv = createTestIv();
			
			const cipherText1 = await cipher.encrypt(clearText, iv);
			const cipherText2 = await cipher.encrypt(clearText, iv);
			
			expect(cipherText1).toEqual(cipherText2);
		});

		it('異なるIVで異なる暗号文を生成する', async () => {
			const key = createTestKey();
			const cipher = new AesGcmCipher(key);
			const clearText = new TextEncoder().encode('Test message');
			const iv1 = new Uint8Array(12).fill(0x01);
			const iv2 = new Uint8Array(12).fill(0x02);
			
			const cipherText1 = await cipher.encrypt(clearText, iv1);
			const cipherText2 = await cipher.encrypt(clearText, iv2);
			
			expect(cipherText1).not.toEqual(cipherText2);
		});

		it('空の平文を暗号化できる', async () => {
			const key = createTestKey();
			const cipher = new AesGcmCipher(key);
			const clearText = new Uint8Array(0);
			const iv = createTestIv();
			
			const cipherTextWithTag = await cipher.encrypt(clearText, iv);
			
			expect(cipherTextWithTag).toBeInstanceOf(Uint8Array);
			// タグのみが含まれる
			expect(cipherTextWithTag.length).toBe(AesGcmCipher.TAG_SIZE);
		});

		it('大きなデータを暗号化できる', async () => {
			const key = createTestKey();
			const cipher = new AesGcmCipher(key);
			const clearText = new Uint8Array(1024).fill(0xFF);
			const iv = createTestIv();
			
			const cipherTextWithTag = await cipher.encrypt(clearText, iv);
			
			expect(cipherTextWithTag).toBeInstanceOf(Uint8Array);
			expect(cipherTextWithTag.length).toBeGreaterThanOrEqual(clearText.length + AesGcmCipher.TAG_SIZE);
		});
	});

	describe('decrypt', () => {
		it('タグ付き暗号文を復号化できる', async () => {
			const key = createTestKey();
			const cipher = new AesGcmCipher(key);
			const originalText = new TextEncoder().encode('Hello, World!');
			const iv = createTestIv();
			
			const cipherTextWithTag = await cipher.encrypt(originalText, iv);
			const decryptedText = await cipher.decrypt(cipherTextWithTag, iv);
			
			expect(decryptedText).toEqual(originalText);
		});

		it('複数回の暗号化と復号化で元のデータを保持する', async () => {
			const key = createTestKey();
			const cipher = new AesGcmCipher(key);
			const originalText = new TextEncoder().encode('Test message for GCM encryption');
			const iv = createTestIv();
			
			const encrypted1 = await cipher.encrypt(originalText, iv);
			const decrypted1 = await cipher.decrypt(encrypted1, iv);
			const encrypted2 = await cipher.encrypt(decrypted1, iv);
			const decrypted2 = await cipher.decrypt(encrypted2, iv);
			
			expect(decrypted2).toEqual(originalText);
		});

		it('空の平文の暗号化と復号化ができる', async () => {
			const key = createTestKey();
			const cipher = new AesGcmCipher(key);
			const clearText = new Uint8Array(0);
			const iv = createTestIv();
			
			const cipherTextWithTag = await cipher.encrypt(clearText, iv);
			const decryptedText = await cipher.decrypt(cipherTextWithTag, iv);
			
			expect(decryptedText).toEqual(clearText);
		});

		it('異なるIVでは復号化に失敗する', async () => {
			const key = createTestKey();
			const cipher = new AesGcmCipher(key);
			const originalText = new TextEncoder().encode('Secret message');
			const iv1 = new Uint8Array(12).fill(0x01);
			const iv2 = new Uint8Array(12).fill(0x02);
			
			const cipherTextWithTag = await cipher.encrypt(originalText, iv1);
			
			// 異なるIVでの復号化は失敗するはず
			await expect(cipher.decrypt(cipherTextWithTag, iv2)).rejects.toThrow();
		});

		it('改ざんされた暗号文の復号化に失敗する', async () => {
			const key = createTestKey();
			const cipher = new AesGcmCipher(key);
			const originalText = new TextEncoder().encode('Authenticated message');
			const iv = createTestIv();
			
			const cipherTextWithTag = await cipher.encrypt(originalText, iv);
			// 暗号文を改ざん
			cipherTextWithTag[0] ^= 0xFF;
			
			// 改ざんされた暗号文の復号化は失敗するはず
			await expect(cipher.decrypt(cipherTextWithTag, iv)).rejects.toThrow();
		});

		it('大きなデータの暗号化と復号化ができる', async () => {
			const key = createTestKey();
			const cipher = new AesGcmCipher(key);
			const originalText = new Uint8Array(2048);
			for (let i = 0; i < originalText.length; i++) {
				originalText[i] = i % 256;
			}
			const iv = createTestIv();
			
			const cipherTextWithTag = await cipher.encrypt(originalText, iv);
			const decryptedText = await cipher.decrypt(cipherTextWithTag, iv);
			
			expect(decryptedText).toEqual(originalText);
		});
	});

	describe('comparison with CBC', () => {
		it('GCMはCBCよりも認証機能を提供する', async () => {
			const key = createTestKey();
			const gcmCipher = new AesGcmCipher(key);
			const cbcCipher = new AesCbcCipher(key);
			const clearText = new TextEncoder().encode('Compare encryption modes');
			const gcmIv = new Uint8Array(12).fill(0x12);
			const cbcIv = new Uint8Array(16).fill(0x12);
			
			const gcmCipherText = await gcmCipher.encrypt(clearText, gcmIv);
			const cbcCipherText = await cbcCipher.encrypt(clearText, cbcIv);
			
			// GCMにはタグが含まれるため、暗号文が長い
			expect(gcmCipherText.length).toBeGreaterThanOrEqual(clearText.length + AesGcmCipher.TAG_SIZE);
			
			// CBCは平文の長さに依存（パディング考慮）
			expect(cbcCipherText.length).toBeGreaterThanOrEqual(clearText.length);
		});
	});
});
