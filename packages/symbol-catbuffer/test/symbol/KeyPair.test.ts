import { describe, expect, it } from 'vitest';

import { PrivateKey, PublicKey, Signature } from '../../src/CryptoTypes.js';
import { KeyPair, Verifier } from '../../src/symbol/KeyPair.js';

describe('KeyPairのテスト', () => {
	const TEST_PRIVATE_KEY = new PrivateKey(
		new Uint8Array([
			0x8d, 0x31, 0xb7, 0x12, 0xab, 0x28, 0xd4, 0x9f, 0xae, 0xb2, 0x9a, 0xe9, 0x7e, 0x38, 0xde, 0x9d, 0x4e, 0x8d,
			0xb9, 0x6d, 0x4e, 0x9d, 0xd7, 0x6c, 0xe0, 0x57, 0xb5, 0x8e, 0x32, 0xa9, 0x77, 0xed,
		]),
	);

	describe('KeyPairクラス', () => {
		it('秘密鍵から鍵ペアを生成できる', () => {
			const keyPair = new KeyPair(TEST_PRIVATE_KEY);

			expect(keyPair.publicKey).toBeInstanceOf(PublicKey);
			expect(keyPair.privateKey).toBeInstanceOf(PrivateKey);
			expect(keyPair.privateKey.bytes).toEqual(TEST_PRIVATE_KEY.bytes);
		});

		it('公開鍵を取得できる', () => {
			const keyPair = new KeyPair(TEST_PRIVATE_KEY);
			const publicKey = keyPair.publicKey;

			expect(publicKey).toBeInstanceOf(PublicKey);
			expect(publicKey.bytes.length).toBe(32);
		});

		it('秘密鍵を取得できる', () => {
			const keyPair = new KeyPair(TEST_PRIVATE_KEY);
			const privateKey = keyPair.privateKey;

			expect(privateKey).toBeInstanceOf(PrivateKey);
			expect(privateKey.bytes).toEqual(TEST_PRIVATE_KEY.bytes);
		});

		it('メッセージに署名できる', () => {
			const keyPair = new KeyPair(TEST_PRIVATE_KEY);
			const message = new TextEncoder().encode('test message');

			const signature = keyPair.sign(message);

			expect(signature).toBeInstanceOf(Signature);
			expect(signature.bytes.length).toBe(64);
		});

		it('同じメッセージに対して同じ署名を生成する', () => {
			const keyPair = new KeyPair(TEST_PRIVATE_KEY);
			const message = new TextEncoder().encode('test message');

			const signature1 = keyPair.sign(message);
			const signature2 = keyPair.sign(message);

			expect(signature1.bytes).toEqual(signature2.bytes);
		});
	});

	describe('Verifierクラス', () => {
		it('公開鍵から検証者を生成できる', () => {
			const keyPair = new KeyPair(TEST_PRIVATE_KEY);
			const verifier = new Verifier(keyPair.publicKey);

			expect(verifier.publicKey).toEqual(keyPair.publicKey);
		});

		it('ゼロの公開鍵でエラーをスローする', () => {
			const zeroPublicKey = new PublicKey(new Uint8Array(32));

			expect(() => new Verifier(zeroPublicKey)).toThrow('public key cannot be zero');
		});

		it('有効な署名を検証できる', () => {
			const keyPair = new KeyPair(TEST_PRIVATE_KEY);
			const message = new TextEncoder().encode('test message');
			const signature = keyPair.sign(message);

			const verifier = new Verifier(keyPair.publicKey);
			const isValid = verifier.verify(message, signature);

			expect(isValid).toBe(true);
		});

		it('無効な署名を拒否する', () => {
			const keyPair = new KeyPair(TEST_PRIVATE_KEY);
			const message = new TextEncoder().encode('test message');
			const wrongMessage = new TextEncoder().encode('wrong message');
			const signature = keyPair.sign(message);

			const verifier = new Verifier(keyPair.publicKey);
			const isValid = verifier.verify(wrongMessage, signature);

			expect(isValid).toBe(false);
		});

		it('異なる公開鍵での検証を拒否する', () => {
			const keyPair1 = new KeyPair(TEST_PRIVATE_KEY);
			const keyPair2 = new KeyPair(new PrivateKey(new Uint8Array(32).fill(1)));
			const message = new TextEncoder().encode('test message');
			const signature = keyPair1.sign(message);

			const verifier = new Verifier(keyPair2.publicKey);
			const isValid = verifier.verify(message, signature);

			expect(isValid).toBe(false);
		});
	});
});
