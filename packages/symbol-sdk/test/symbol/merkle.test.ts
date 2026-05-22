import { sha3_256 } from '@noble/hashes/sha3.js';
import { describe, expect, it } from 'vitest';

import { Hash256 } from '../../src/CryptoTypes.js';
import {
  BranchNode,
  LeafNode,
  MerkleHashBuilder,
  PatriciaMerkleProofResult,
  TreeNode,
  deserializePatriciaTreeNodes,
  proveMerkle,
  provePatriciaMerkle,
} from '../../src/symbol/merkle.js';

const createHash = (fill: number) => new Hash256(new Uint8Array(32).fill(fill));

const createStateHash = (roots: Hash256[]) => {
  const hasher = sha3_256.create();
  roots.forEach((root) => hasher.update(root.bytes));
  return new Hash256(hasher.digest());
};

describe('merkleのテスト', () => {
  describe('MerkleHashBuilder', () => {
    it('空のビルダーはゼロハッシュを返す', () => {
      const builder = new MerkleHashBuilder();
      const hash = builder.final();

      expect(hash).toEqual(Hash256.zero());
    });

    it('単一のハッシュを処理できる', () => {
      const builder = new MerkleHashBuilder();
      const testHash = new Hash256(new Uint8Array(32).fill(1));

      builder.update(testHash);
      const result = builder.final();

      expect(result).toBeInstanceOf(Hash256);
      expect(result.bytes.length).toBe(32);
    });

    it('2つのハッシュからマークルハッシュを生成できる', () => {
      const builder = new MerkleHashBuilder();
      const hash1 = new Hash256(new Uint8Array(32).fill(1));
      const hash2 = new Hash256(new Uint8Array(32).fill(2));

      builder.update(hash1);
      builder.update(hash2);
      const result = builder.final();

      expect(result).toBeInstanceOf(Hash256);
      expect(result.bytes.length).toBe(32);
      // 結果は入力とは異なる
      expect(result).not.toEqual(hash1);
      expect(result).not.toEqual(hash2);
    });

    it('複数のハッシュを処理できる', () => {
      const builder = new MerkleHashBuilder();
      const hashes = [
        new Hash256(new Uint8Array(32).fill(1)),
        new Hash256(new Uint8Array(32).fill(2)),
        new Hash256(new Uint8Array(32).fill(3)),
        new Hash256(new Uint8Array(32).fill(4)),
      ];

      hashes.forEach((hash) => builder.update(hash));
      const result = builder.final();

      expect(result).toBeInstanceOf(Hash256);
      expect(result.bytes.length).toBe(32);
    });

    it('奇数個のハッシュを処理できる', () => {
      const builder = new MerkleHashBuilder();
      const hashes = [
        new Hash256(new Uint8Array(32).fill(1)),
        new Hash256(new Uint8Array(32).fill(2)),
        new Hash256(new Uint8Array(32).fill(3)),
      ];

      hashes.forEach((hash) => builder.update(hash));
      const result = builder.final();

      expect(result).toBeInstanceOf(Hash256);
      expect(result.bytes.length).toBe(32);
    });

    it('同じ入力に対して同じ結果を返す', () => {
      const builder1 = new MerkleHashBuilder();
      const builder2 = new MerkleHashBuilder();
      const hash1 = new Hash256(new Uint8Array(32).fill(1));
      const hash2 = new Hash256(new Uint8Array(32).fill(2));

      builder1.update(hash1);
      builder1.update(hash2);
      const result1 = builder1.final();

      builder2.update(hash1);
      builder2.update(hash2);
      const result2 = builder2.final();

      expect(result1.bytes).toEqual(result2.bytes);
    });

    it('順序が異なると異なる結果を返す', () => {
      const builder1 = new MerkleHashBuilder();
      const builder2 = new MerkleHashBuilder();
      const hash1 = new Hash256(new Uint8Array(32).fill(1));
      const hash2 = new Hash256(new Uint8Array(32).fill(2));

      builder1.update(hash1);
      builder1.update(hash2);
      const result1 = builder1.final();

      builder2.update(hash2);
      builder2.update(hash1);
      const result2 = builder2.final();

      expect(result1.bytes).not.toEqual(result2.bytes);
    });

    it('多数のハッシュを処理できる', () => {
      const builder = new MerkleHashBuilder();
      const count = 100;

      for (let i = 0; i < count; i++) {
        const hash = new Hash256(new Uint8Array(32).fill(i % 256));
        builder.update(hash);
      }

      const result = builder.final();

      expect(result).toBeInstanceOf(Hash256);
      expect(result.bytes.length).toBe(32);
    });
  });

  describe('proveMerkle', () => {
    it('merkle pathが空の場合はleafとrootの一致を確認する', () => {
      const leaf = createHash(7);
      expect(proveMerkle(leaf, [], leaf)).toBe(true);
      expect(proveMerkle(leaf, [], createHash(8))).toBe(false);
    });

    it('左右ノードを含むmerkle pathを検証できる', () => {
      const leaf = createHash(1);
      const left = createHash(2);
      const right = createHash(3);

      const leftHasher = sha3_256.create();
      leftHasher.update(left.bytes);
      leftHasher.update(leaf.bytes);
      const level1 = new Hash256(leftHasher.digest());

      const rootHasher = sha3_256.create();
      rootHasher.update(level1.bytes);
      rootHasher.update(right.bytes);
      const root = new Hash256(rootHasher.digest());

      const path = [
        { hash: left, isLeft: true },
        { hash: right, isLeft: false },
      ];

      expect(proveMerkle(leaf, path, root)).toBe(true);
      expect(proveMerkle(leaf, path, createHash(9))).toBe(false);
    });
  });

  describe('tree nodes', () => {
    it('TreeNode.calculateHashのデフォルトはゼロハッシュ', () => {
      const node = new TreeNode({ path: new Uint8Array([0xab]), size: 2 });
      expect(node.calculateHash()).toEqual(Hash256.zero());
      expect(node.hexPath).toBe('AB');
    });

    it('LeafNodeとBranchNodeのhashを計算できる', () => {
      const leaf = new LeafNode({ path: new Uint8Array([0xab]), size: 2 }, createHash(1));
      const branch = new BranchNode({ path: new Uint8Array([0x0a]), size: 1 }, new Array(16).fill(undefined));

      expect(leaf.calculateHash()).toBeInstanceOf(Hash256);
      expect(branch.calculateHash()).toBeInstanceOf(Hash256);
    });
  });

  describe('deserializePatriciaTreeNodes', () => {
    it('leafとbranchノードをデシリアライズできる', () => {
      const leafHash = new Uint8Array(32).fill(0x11);
      const branchLink = new Uint8Array(32).fill(0x22);

      const serializedLeaf = new Uint8Array([0xff, 0x01, 0x0a, ...leafHash]);

      const serializedBranch = new Uint8Array([0x00, 0x02, 0xbc, 0x08, 0x00, ...branchLink]);

      const nodes = deserializePatriciaTreeNodes(new Uint8Array([...serializedLeaf, ...serializedBranch]));

      expect(nodes).toHaveLength(2);
      expect(nodes[0]).toBeInstanceOf(LeafNode);
      expect(nodes[1]).toBeInstanceOf(BranchNode);
    });

    it('不正マーカーで例外を投げる', () => {
      expect(() => deserializePatriciaTreeNodes(new Uint8Array([0x7f]))).toThrowError(
        'invalid marker of a serialized node (127)'
      );
    });
  });

  describe('provePatriciaMerkle', () => {
    it('正の証明が成功する', () => {
      const encodedKey = createHash(0x44);
      const value = createHash(0x55);
      const leaf = new LeafNode({ path: encodedKey.bytes, size: 64 }, value);
      const roots = [leaf.calculateHash()];
      const stateHash = createStateHash(roots);

      const result = provePatriciaMerkle(encodedKey, value, [leaf], stateHash, roots);
      expect(result).toBe(PatriciaMerkleProofResult.VALID_POSITIVE);
    });

    it('state hash不一致を検出する', () => {
      const encodedKey = createHash(1);
      const value = createHash(2);
      const leaf = new LeafNode({ path: encodedKey.bytes, size: 64 }, value);
      const roots = [leaf.calculateHash()];

      const result = provePatriciaMerkle(encodedKey, value, [leaf], Hash256.zero(), roots);
      expect(result).toBe(PatriciaMerkleProofResult.STATE_HASH_DOES_NOT_MATCH_ROOTS);
    });

    it('unanchored path treeを検出する', () => {
      const encodedKey = createHash(3);
      const value = createHash(4);
      const leaf = new LeafNode({ path: encodedKey.bytes, size: 64 }, value);
      const roots = [createHash(5)];
      const stateHash = createStateHash(roots);

      const result = provePatriciaMerkle(encodedKey, value, [leaf], stateHash, roots);
      expect(result).toBe(PatriciaMerkleProofResult.UNANCHORED_PATH_TREE);
    });

    it('leaf value mismatchを検出する', () => {
      const encodedKey = createHash(6);
      const leaf = new LeafNode({ path: encodedKey.bytes, size: 64 }, createHash(7));
      const roots = [leaf.calculateHash()];
      const stateHash = createStateHash(roots);

      const result = provePatriciaMerkle(encodedKey, createHash(8), [leaf], stateHash, roots);
      expect(result).toBe(PatriciaMerkleProofResult.LEAF_VALUE_MISMATCH);
    });

    it('positive proof path mismatchを検出する', () => {
      const encodedKey = createHash(9);
      const leaf = new LeafNode({ path: new Uint8Array(32).fill(0xaa), size: 64 }, createHash(10));
      const roots = [leaf.calculateHash()];
      const stateHash = createStateHash(roots);

      const result = provePatriciaMerkle(encodedKey, createHash(10), [leaf], stateHash, roots);
      expect(result).toBe(PatriciaMerkleProofResult.PATH_MISMATCH);
    });

    it('unlinked nodeを検出する', () => {
      const leaf = new LeafNode({ path: new Uint8Array([0x12]), size: 2 }, createHash(11));
      const branch = new BranchNode({ path: new Uint8Array(), size: 0 }, new Array(16).fill(undefined));
      const roots = [branch.calculateHash()];
      const stateHash = createStateHash(roots);

      const result = provePatriciaMerkle(createHash(12), createHash(11), [branch, leaf], stateHash, roots);
      expect(result).toBe(PatriciaMerkleProofResult.UNLINKED_NODE);
    });

    it('negative proofのvalid/inconclusive/path mismatchを検証する', () => {
      const branch = new BranchNode({ path: new Uint8Array(), size: 0 }, new Array(16).fill(undefined));
      const roots = [branch.calculateHash()];
      const stateHash = createStateHash(roots);
      const key = createHash(13);

      const validNegative = provePatriciaMerkle(key, createHash(14), [branch], stateHash, roots);
      expect(validNegative).toBe(PatriciaMerkleProofResult.VALID_NEGATIVE);

      const firstNibble = parseInt(key.toString()[0], 16);
      const inconclusiveBranchLinks = new Array(16).fill(undefined);
      inconclusiveBranchLinks[firstNibble] = createHash(15);
      const inconclusiveBranch = new BranchNode({ path: new Uint8Array(), size: 0 }, inconclusiveBranchLinks);
      const inconclusiveRoots = [inconclusiveBranch.calculateHash()];
      const inconclusiveStateHash = createStateHash(inconclusiveRoots);
      const inconclusive = provePatriciaMerkle(
        key,
        createHash(14),
        [inconclusiveBranch],
        inconclusiveStateHash,
        inconclusiveRoots
      );
      expect(inconclusive).toBe(PatriciaMerkleProofResult.INCONCLUSIVE);

      const mismatchBranch = new BranchNode({ path: new Uint8Array([0xf0]), size: 1 }, new Array(16).fill(undefined));
      const mismatchRoots = [mismatchBranch.calculateHash()];
      const mismatchStateHash = createStateHash(mismatchRoots);
      const pathMismatch = provePatriciaMerkle(key, createHash(14), [mismatchBranch], mismatchStateHash, mismatchRoots);
      expect(pathMismatch).toBe(PatriciaMerkleProofResult.PATH_MISMATCH);
    });
  });
});
