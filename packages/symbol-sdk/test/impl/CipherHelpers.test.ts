import { describe, expect, it } from 'vitest';

import { SharedKey256 } from '../../src/CryptoTypes.js';
import {
	concatArrays,
	decodeAesCbc,
	decodeAesGcm,
	encodeAesCbc,
	encodeAesGcm,
} from '../../src/impl/CipherHelpers.js';

// テスト用のダミー鍵ペアと共有鍵導出関数
const createMockKeyPair = () => ({
	publicKey: new Uint8Array(32).fill(1),
	privateKey: new Uint8Array(32).fill(2),
});

const mockDeriveSharedKey = () => new SharedKey256(new Uint8Array(32).fill(3));

const mockDeriveSharedKeyWithSalt = () => new SharedKey256(new Uint8Array(32).fill(4));

describe('CipherHelpersのテスト', () => {
	describe('concatArrays', () => {
		it('複数の配列を連結できる', () => {
			const arr1 = new Uint8Array([1, 2, 3]);
			const arr2 = new Uint8Array([4, 5]);
			const arr3 = new Uint8Array([6, 7, 8, 9]);

			const result = concatArrays(arr1, arr2, arr3);

			expect(result).toEqual(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]));
		});

		it('空の配列を処理できる', () => {
			const result = concatArrays(new Uint8Array([]), new Uint8Array([1, 2]));

			expect(result).toEqual(new Uint8Array([1, 2]));
		});

		it('単一の配列を処理できる', () => {
			const arr = new Uint8Array([1, 2, 3]);
			const result = concatArrays(arr);

			expect(result).toEqual(arr);
		});
	});

	describe('AES-GCM暗号化と復号化', () => {
		it('メッセージを暗号化して復号化できる', async () => {
			const keyPair = createMockKeyPair();
			const recipientPublicKey = new Uint8Array(32).fill(5);
			const message = new TextEncoder().encode('Hello, Symbol!');

			// 暗号化
			const { tag, initializationVector, cipherText } = await encodeAesGcm(
				mockDeriveSharedKey,
				keyPair,
				recipientPublicKey,
				message,
			);

			expect(tag).toBeInstanceOf(Uint8Array);
			expect(tag.length).toBe(16); // GCM tag size
			expect(initializationVector).toBeInstanceOf(Uint8Array);
			expect(initializationVector.length).toBe(12); // GCM IV size
			expect(cipherText).toBeInstanceOf(Uint8Array);

			// エンコードされたメッセージを作成
			const encodedMessage = concatArrays(tag, initializationVector, cipherText);

			// 復号化
			const decrypted = await decodeAesGcm(mockDeriveSharedKey, keyPair, recipientPublicKey, encodedMessage);

			expect(decrypted).toEqual(message);
			expect(new TextDecoder().decode(decrypted)).toBe('Hello, Symbol!');
		});

		it('空のメッセージを暗号化して復号化できる', async () => {
			const keyPair = createMockKeyPair();
			const recipientPublicKey = new Uint8Array(32).fill(5);
			const message = new Uint8Array([]);

			const { tag, initializationVector, cipherText } = await encodeAesGcm(
				mockDeriveSharedKey,
				keyPair,
				recipientPublicKey,
				message,
			);

			const encodedMessage = concatArrays(tag, initializationVector, cipherText);
			const decrypted = await decodeAesGcm(mockDeriveSharedKey, keyPair, recipientPublicKey, encodedMessage);

			expect(decrypted).toEqual(message);
		});
	});

	describe('AES-CBC暗号化と復号化', () => {
		it('メッセージを暗号化して復号化できる', async () => {
			const keyPair = createMockKeyPair();
			const recipientPublicKey = new Uint8Array(32).fill(5);
			const message = new TextEncoder().encode('Hello, Symbol!');

			// 暗号化
			const { salt, initializationVector, cipherText } = await encodeAesCbc(
				mockDeriveSharedKeyWithSalt,
				keyPair,
				recipientPublicKey,
				message,
			);

			expect(salt).toBeInstanceOf(Uint8Array);
			expect(salt.length).toBe(32); // SALT_SIZE
			expect(initializationVector).toBeInstanceOf(Uint8Array);
			expect(initializationVector.length).toBe(16); // CBC IV size
			expect(cipherText).toBeInstanceOf(Uint8Array);

			// エンコードされたメッセージを作成
			const encodedMessage = concatArrays(salt, initializationVector, cipherText);

			// 復号化
			const decrypted = await decodeAesCbc(
				mockDeriveSharedKeyWithSalt,
				keyPair,
				recipientPublicKey,
				encodedMessage,
			);

			expect(decrypted).toEqual(message);
			expect(new TextDecoder().decode(decrypted)).toBe('Hello, Symbol!');
		});

		it('空のメッセージを暗号化して復号化できる', async () => {
			const keyPair = createMockKeyPair();
			const recipientPublicKey = new Uint8Array(32).fill(5);
			const message = new Uint8Array([]);

			const { salt, initializationVector, cipherText } = await encodeAesCbc(
				mockDeriveSharedKeyWithSalt,
				keyPair,
				recipientPublicKey,
				message,
			);

			const encodedMessage = concatArrays(salt, initializationVector, cipherText);
			const decrypted = await decodeAesCbc(
				mockDeriveSharedKeyWithSalt,
				keyPair,
				recipientPublicKey,
				encodedMessage,
			);

			expect(decrypted).toEqual(message);
		});
	});
});
