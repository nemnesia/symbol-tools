import { describe, expect, it } from 'vitest';

import { Address } from '../../src/symbol/Network.js';
import {
	generateMosaicAliasId,
	generateMosaicId,
	generateNamespaceId,
	generateNamespacePath,
	isValidNamespaceName,
} from '../../src/symbol/idGenerator.js';

describe('idGeneratorのテスト', () => {
	describe('generateMosaicId', () => {
		it('アドレスとnonceからモザイクIDを生成できる', () => {
			const address = new Address(new Uint8Array(24).fill(0x12));
			const nonce = 123;

			const mosaicId = generateMosaicId(address, nonce);

			expect(typeof mosaicId).toBe('bigint');
			expect(mosaicId).toBeGreaterThan(0n);
		});

		it('異なるnonceで異なるIDを生成する', () => {
			const address = new Address(new Uint8Array(24).fill(0x12));
			const id1 = generateMosaicId(address, 1);
			const id2 = generateMosaicId(address, 2);

			expect(id1).not.toBe(id2);
		});

		it('異なるアドレスで異なるIDを生成する', () => {
			const address1 = new Address(new Uint8Array(24).fill(0x12));
			const address2 = new Address(new Uint8Array(24).fill(0x34));
			const nonce = 123;

			const id1 = generateMosaicId(address1, nonce);
			const id2 = generateMosaicId(address2, nonce);

			expect(id1).not.toBe(id2);
		});
	});

	describe('generateNamespaceId', () => {
		it('名前から名前空間IDを生成できる', () => {
			const name = 'test';

			const namespaceId = generateNamespaceId(name);

			expect(typeof namespaceId).toBe('bigint');
			expect(namespaceId).toBeGreaterThan(0n);
			// 名前空間フラグがセットされているか確認
			expect(namespaceId & (1n << 63n)).toBe(1n << 63n);
		});

		it('親名前空間IDありで子名前空間IDを生成できる', () => {
			const parentName = 'parent';
			const childName = 'child';

			const parentId = generateNamespaceId(parentName);
			const childId = generateNamespaceId(childName, parentId);

			expect(childId).not.toBe(parentId);
			expect(childId & (1n << 63n)).toBe(1n << 63n);
		});

		it('同じ名前で同じIDを生成する', () => {
			const name = 'test';

			const id1 = generateNamespaceId(name);
			const id2 = generateNamespaceId(name);

			expect(id1).toBe(id2);
		});
	});

	describe('isValidNamespaceName', () => {
		it('有効な名前空間名を受け入れる', () => {
			expect(isValidNamespaceName('test')).toBe(true);
			expect(isValidNamespaceName('test123')).toBe(true);
			expect(isValidNamespaceName('test_name')).toBe(true);
			expect(isValidNamespaceName('test-name')).toBe(true);
			expect(isValidNamespaceName('a')).toBe(true);
			expect(isValidNamespaceName('123test')).toBe(true); // 数字で始まるのも有効
		});

		it('無効な名前空間名を拒否する', () => {
			expect(isValidNamespaceName('')).toBe(false);
			expect(isValidNamespaceName('Test')).toBe(false); // 大文字
			expect(isValidNamespaceName('_test')).toBe(false); // アンダースコアで始まる
			expect(isValidNamespaceName('-test')).toBe(false); // ハイフンで始まる
			expect(isValidNamespaceName('test@name')).toBe(false); // 無効な文字
			expect(isValidNamespaceName('test.name')).toBe(false); // ドット
		});
	});

	describe('generateNamespacePath', () => {
		it('単一レベルの名前空間パスを生成できる', () => {
			const path = generateNamespacePath('test');

			expect(Array.isArray(path)).toBe(true);
			expect(path.length).toBe(1);
			expect(typeof path[0]).toBe('bigint');
		});

		it('複数レベルの名前空間パスを生成できる', () => {
			const path = generateNamespacePath('parent.child');

			expect(path.length).toBe(2);
			expect(path[0]).toBe(generateNamespaceId('parent'));
			expect(path[1]).toBe(generateNamespaceId('child', path[0]));
		});

		it('3レベルの名前空間パスを生成できる', () => {
			const path = generateNamespacePath('a.b.c');

			expect(path.length).toBe(3);
			expect(path[0]).toBe(generateNamespaceId('a'));
			expect(path[1]).toBe(generateNamespaceId('b', path[0]));
			expect(path[2]).toBe(generateNamespaceId('c', path[1]));
		});

		it('無効な名前でエラーをスローする', () => {
			expect(() => generateNamespacePath('Invalid')).toThrow('fully qualified name is invalid');
			expect(() => generateNamespacePath('test.Invalid')).toThrow('fully qualified name is invalid');
			expect(() => generateNamespacePath('test..name')).toThrow('fully qualified name is invalid');
		});
	});

	describe('generateMosaicAliasId', () => {
		it('完全修飾名からモザイクエイリアスIDを生成できる', () => {
			const aliasId = generateMosaicAliasId('test.mosaic');

			expect(typeof aliasId).toBe('bigint');
			expect(aliasId).toBeGreaterThan(0n);
		});

		it('名前空間パスの最後のIDと一致する', () => {
			const name = 'test.mosaic';
			const path = generateNamespacePath(name);
			const aliasId = generateMosaicAliasId(name);

			expect(aliasId).toBe(path[path.length - 1]);
		});

		it('単一レベルの名前でも動作する', () => {
			const aliasId = generateMosaicAliasId('mosaic');

			expect(typeof aliasId).toBe('bigint');
			expect(aliasId).toBeGreaterThan(0n);
		});
	});
});
