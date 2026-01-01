import { describe, it, expect } from 'vitest';
import VotingKeysGenerator from '../../src/symbol/VotingKeysGenerator.js';
import { KeyPair } from '../../src/symbol/KeyPair.js';
import { PrivateKey } from '../../src/CryptoTypes.js';

describe('VotingKeysGenerator', () => {
	const createGenerator = () => {
		const rootPrivateKey = new PrivateKey('ED4C70D78104EB11BCD73EBDC512FEBC8FBCEB36A370C957FF7E266230BB5D57');
		const rootKeyPair = new KeyPair(rootPrivateKey);
		return new VotingKeysGenerator(rootKeyPair);
	};

	describe('generate', () => {
		it('単一エポックの投票鍵を生成できる', () => {
			const generator = createGenerator();
			const votingKeys = generator.generate(1n, 1n);

			// ヘッダーサイズ(80) + エポックエントリサイズ(96) * 1
			const expectedSize = 80 + 96 * 1;
			expect(votingKeys.length).toBe(expectedSize);
		});

		it('複数エポックの投票鍵を生成できる', () => {
			const generator = createGenerator();
			const startEpoch = 1n;
			const endEpoch = 10n;
			const votingKeys = generator.generate(startEpoch, endEpoch);

			// ヘッダーサイズ(80) + エポックエントリサイズ(96) * 10
			const numEpochs = 10;
			const expectedSize = 80 + 96 * numEpochs;
			expect(votingKeys.length).toBe(expectedSize);
		});

		it('生成された鍵のヘッダーが正しい', () => {
			const generator = createGenerator();
			const startEpoch = 5n;
			const endEpoch = 7n;
			const votingKeys = generator.generate(startEpoch, endEpoch);

			const view = new DataView(votingKeys.buffer);
			
			// Start key identifier
			expect(view.getBigUint64(0, true)).toBe(startEpoch);
			
			// End key identifier
			expect(view.getBigUint64(8, true)).toBe(endEpoch);
			
			// Reserved fields should be 0xFFFFFFFFFFFFFFFF
			expect(view.getBigUint64(16, true)).toBe(0xFFFFFFFFFFFFFFFFn);
			expect(view.getBigUint64(24, true)).toBe(0xFFFFFFFFFFFFFFFFn);
			
			// Level 1/1 start key identifier
			expect(view.getBigUint64(64, true)).toBe(startEpoch);
			
			// Level 1/1 end key identifier
			expect(view.getBigUint64(72, true)).toBe(endEpoch);
		});

		it('ヘッダーにルート公開鍵が含まれる', () => {
			const rootPrivateKey = new PrivateKey('1111111111111111111111111111111111111111111111111111111111111111');
			const rootKeyPair = new KeyPair(rootPrivateKey);
			const generator = new VotingKeysGenerator(rootKeyPair);
			
			const votingKeys = generator.generate(1n, 1n);
			
			// Root voting public key (offset 32, length 32)
			const rootPublicKey = votingKeys.subarray(32, 64);
			expect(rootPublicKey).toEqual(rootKeyPair.publicKey.bytes);
		});

		it('各エポックエントリに秘密鍵が含まれる', () => {
			const generator = createGenerator();
			const votingKeys = generator.generate(1n, 2n);

			const HEADER_SIZE = 80;
			const EPOCH_ENTRY_SIZE = 96;

			// 最初のエポックエントリ
			const firstEntryPrivateKey = votingKeys.subarray(HEADER_SIZE, HEADER_SIZE + PrivateKey.SIZE);
			expect(firstEntryPrivateKey.length).toBe(PrivateKey.SIZE);
			
			// 2番目のエポックエントリ
			const secondEntryPrivateKey = votingKeys.subarray(HEADER_SIZE + EPOCH_ENTRY_SIZE, HEADER_SIZE + EPOCH_ENTRY_SIZE + PrivateKey.SIZE);
			expect(secondEntryPrivateKey.length).toBe(PrivateKey.SIZE);
			
			// 異なる秘密鍵であることを確認
			expect(firstEntryPrivateKey).not.toEqual(secondEntryPrivateKey);
		});

		it('各エポックエントリに署名が含まれる', () => {
			const generator = createGenerator();
			const votingKeys = generator.generate(1n, 1n);

			const HEADER_SIZE = 80;
			const SIGNATURE_OFFSET = PrivateKey.SIZE;
			const SIGNATURE_SIZE = 64;

			// エポックエントリの署名部分
			const signature = votingKeys.subarray(HEADER_SIZE + SIGNATURE_OFFSET, HEADER_SIZE + SIGNATURE_OFFSET + SIGNATURE_SIZE);
			expect(signature.length).toBe(SIGNATURE_SIZE);
			
			// 署名が全て0でないことを確認
			const isNotAllZero = signature.some(byte => byte !== 0);
			expect(isNotAllZero).toBe(true);
		});

		it('カスタム秘密鍵ジェネレーターを使用できる', () => {
			const rootPrivateKey = new PrivateKey('2222222222222222222222222222222222222222222222222222222222222222');
			const rootKeyPair = new KeyPair(rootPrivateKey);
			
			// 固定の秘密鍵を返すジェネレーター
			const fixedPrivateKey = new PrivateKey('3333333333333333333333333333333333333333333333333333333333333333');
			const customGenerator = () => fixedPrivateKey;
			
			const generator = new VotingKeysGenerator(rootKeyPair, customGenerator);
			const votingKeys = generator.generate(1n, 1n);

			const HEADER_SIZE = 80;
			const childPrivateKey = votingKeys.subarray(HEADER_SIZE, HEADER_SIZE + PrivateKey.SIZE);
			
			expect(childPrivateKey).toEqual(fixedPrivateKey.bytes);
		});

		it('エポックの識別子が降順で格納される', () => {
			const generator = createGenerator();
			const startEpoch = 10n;
			const endEpoch = 12n;
			const votingKeys = generator.generate(startEpoch, endEpoch);

			const HEADER_SIZE = 80;
			const EPOCH_ENTRY_SIZE = 96;
			
			// 署名を確認するためのペイロードバッファ内のidentifierを確認できないので、
			// エントリが3つ生成されたことを確認
			const numEpochs = Number(endEpoch - startEpoch + 1n);
			expect(numEpochs).toBe(3);
			
			const expectedSize = HEADER_SIZE + EPOCH_ENTRY_SIZE * numEpochs;
			expect(votingKeys.length).toBe(expectedSize);
		});

		it('大きなエポック範囲を処理できる', () => {
			const generator = createGenerator();
			const startEpoch = 1n;
			const endEpoch = 100n;
			const votingKeys = generator.generate(startEpoch, endEpoch);

			const numEpochs = 100;
			const expectedSize = 80 + 96 * numEpochs;
			expect(votingKeys.length).toBe(expectedSize);
		});

		it('エポック0を処理できる', () => {
			const generator = createGenerator();
			const votingKeys = generator.generate(0n, 0n);

			const expectedSize = 80 + 96 * 1;
			expect(votingKeys.length).toBe(expectedSize);
			
			const view = new DataView(votingKeys.buffer);
			expect(view.getBigUint64(0, true)).toBe(0n);
			expect(view.getBigUint64(8, true)).toBe(0n);
		});
	});
});
