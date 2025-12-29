import { argon2id } from '@noble/hashes/argon2';
import { utf8ToBytes } from '@noble/hashes/utils';
import { describe, expect, it } from 'vitest';

import { decrypt, encrypt } from '../src/index.js';
import type { EncryptedData } from '../src/index.js';

/**
 * Node.js ネイティブ argon2 実装を強制使用する暗号化
 */
async function encryptWithNativeArgon2(plaintext: Uint8Array, password: string): Promise<EncryptedData> {
  const argon2Module = await import('argon2');

  // 暗号化パラメータ
  const ARGON2_PARAMS = { m: 65536, t: 3, p: 1 };
  const AES_NONCE_LENGTH = 12;

  const { randomBytes } = await import('@noble/ciphers/webcrypto');
  const { gcm } = await import('@noble/ciphers/aes');

  const salt = randomBytes(16);

  // ネイティブ argon2 で鍵導出
  const key = await argon2Module.hash(password, {
    memoryCost: ARGON2_PARAMS.m,
    timeCost: ARGON2_PARAMS.t,
    parallelism: ARGON2_PARAMS.p,
    hashLength: 32,
    type: argon2Module.argon2id,
    salt: Buffer.from(salt),
    raw: true,
  });

  const nonce = randomBytes(AES_NONCE_LENGTH);
  const aes = gcm(new Uint8Array(key as Buffer), nonce);
  const ciphertext = aes.encrypt(plaintext);

  const tagLength = 16;
  const encrypted = ciphertext.slice(0, -tagLength);
  const tag = ciphertext.slice(-tagLength);

  const toBase64 = (bytes: Uint8Array): string => {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(bytes).toString('base64');
    }
    const binary = String.fromCharCode(...bytes);
    return btoa(binary);
  };

  return {
    version: 1,
    kdf: 'argon2id',
    kdfParams: {
      memoryCost: ARGON2_PARAMS.m,
      timeCost: ARGON2_PARAMS.t,
      parallelism: ARGON2_PARAMS.p,
    },
    cipher: 'aes-256-gcm',
    salt: toBase64(salt),
    nonce: toBase64(nonce),
    ciphertext: toBase64(encrypted),
    tag: toBase64(tag),
  };
}

/**
 * @noble 実装を強制使用する暗号化
 */
async function encryptWithNoble(plaintext: Uint8Array, password: string): Promise<EncryptedData> {
  const ARGON2_PARAMS = { m: 65536, t: 3, p: 1 };
  const AES_NONCE_LENGTH = 12;

  const { randomBytes } = await import('@noble/ciphers/webcrypto');
  const { gcm } = await import('@noble/ciphers/aes');

  const salt = randomBytes(16);

  // @noble/hashes で鍵導出
  const passwordBytes = utf8ToBytes(password);
  const key = argon2id(passwordBytes, salt, {
    ...ARGON2_PARAMS,
    dkLen: 32,
  });

  const nonce = randomBytes(AES_NONCE_LENGTH);
  const aes = gcm(key, nonce);
  const ciphertext = aes.encrypt(plaintext);

  const tagLength = 16;
  const encrypted = ciphertext.slice(0, -tagLength);
  const tag = ciphertext.slice(-tagLength);

  const toBase64 = (bytes: Uint8Array): string => {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(bytes).toString('base64');
    }
    const binary = String.fromCharCode(...bytes);
    return btoa(binary);
  };

  return {
    version: 1,
    kdf: 'argon2id',
    kdfParams: {
      memoryCost: ARGON2_PARAMS.m,
      timeCost: ARGON2_PARAMS.t,
      parallelism: ARGON2_PARAMS.p,
    },
    cipher: 'aes-256-gcm',
    salt: toBase64(salt),
    nonce: toBase64(nonce),
    ciphertext: toBase64(encrypted),
    tag: toBase64(tag),
  };
}

/**
 * Node.js ネイティブ argon2 実装を強制使用する復号
 */
async function decryptWithNativeArgon2(data: EncryptedData, password: string): Promise<Uint8Array> {
  const argon2Module = await import('argon2');
  const { gcm } = await import('@noble/ciphers/aes');

  const fromBase64 = (base64: string): Uint8Array => {
    if (typeof Buffer !== 'undefined') {
      return new Uint8Array(Buffer.from(base64, 'base64'));
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };

  const salt = fromBase64(data.salt);
  const nonce = fromBase64(data.nonce);
  const ciphertext = fromBase64(data.ciphertext);
  const tag = fromBase64(data.tag);

  // ネイティブ argon2 で鍵導出
  const key = await argon2Module.hash(password, {
    memoryCost: data.kdfParams.memoryCost,
    timeCost: data.kdfParams.timeCost,
    parallelism: data.kdfParams.parallelism,
    hashLength: 32,
    type: argon2Module.argon2id,
    salt: Buffer.from(salt),
    raw: true,
  });

  const combined = new Uint8Array(ciphertext.length + tag.length);
  combined.set(ciphertext);
  combined.set(tag, ciphertext.length);

  const aes = gcm(new Uint8Array(key as Buffer), nonce);
  return aes.decrypt(combined);
}

/**
 * @noble 実装を強制使用する復号
 */
async function decryptWithNoble(data: EncryptedData, password: string): Promise<Uint8Array> {
  const { gcm } = await import('@noble/ciphers/aes');

  const fromBase64 = (base64: string): Uint8Array => {
    if (typeof Buffer !== 'undefined') {
      return new Uint8Array(Buffer.from(base64, 'base64'));
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };

  const salt = fromBase64(data.salt);
  const nonce = fromBase64(data.nonce);
  const ciphertext = fromBase64(data.ciphertext);
  const tag = fromBase64(data.tag);

  // @noble/hashes で鍵導出
  const passwordBytes = utf8ToBytes(password);
  const key = argon2id(passwordBytes, salt, {
    m: data.kdfParams.memoryCost,
    t: data.kdfParams.timeCost,
    p: data.kdfParams.parallelism,
    dkLen: 32,
  });

  const combined = new Uint8Array(ciphertext.length + tag.length);
  combined.set(ciphertext);
  combined.set(tag, ciphertext.length);

  const aes = gcm(key, nonce);
  return aes.decrypt(combined);
}

describe('Node.js argon2 と @noble 実装の相互互換性', () => {
  const testData = utf8ToBytes('テスト用秘密データ 🔐');
  const password = 'my-strong-password-123';

  it('通常のencrypt/decryptが正常に動作すること（ベースライン）', async () => {
    const encrypted = await encrypt(testData, password);
    const decrypted = await decrypt(encrypted, password);
    expect(decrypted).toEqual(testData);
  });

  it('ネイティブargon2で暗号化したデータを通常のdecryptで復号できること', async () => {
    const encrypted = await encryptWithNativeArgon2(testData, password);
    const decrypted = await decrypt(encrypted, password);
    expect(decrypted).toEqual(testData);
  });

  it('@nobleで暗号化したデータを通常のdecryptで復号できること', async () => {
    const encrypted = await encryptWithNoble(testData, password);
    const decrypted = await decrypt(encrypted, password);
    expect(decrypted).toEqual(testData);
  });

  it('通常のencryptで暗号化したデータをネイティブargon2で復号できること', async () => {
    const encrypted = await encrypt(testData, password);
    const decrypted = await decryptWithNativeArgon2(encrypted, password);
    expect(decrypted).toEqual(testData);
  });

  it('通常のencryptで暗号化したデータを@nobleで復号できること', async () => {
    const encrypted = await encrypt(testData, password);
    const decrypted = await decryptWithNoble(encrypted, password);
    expect(decrypted).toEqual(testData);
  });

  it('ネイティブargon2で暗号化したデータを@nobleで復号できること（クロス互換）', async () => {
    const encrypted = await encryptWithNativeArgon2(testData, password);
    const decrypted = await decryptWithNoble(encrypted, password);
    expect(decrypted).toEqual(testData);
  });

  it('@nobleで暗号化したデータをネイティブargon2で復号できること（クロス互換）', async () => {
    const encrypted = await encryptWithNoble(testData, password);
    const decrypted = await decryptWithNativeArgon2(encrypted, password);
    expect(decrypted).toEqual(testData);
  });

  it('空データでの相互互換性', async () => {
    const empty = new Uint8Array(0);

    const encryptedNative = await encryptWithNativeArgon2(empty, password);
    const decryptedByNoble = await decryptWithNoble(encryptedNative, password);
    expect(decryptedByNoble).toEqual(empty);

    const encryptedNoble = await encryptWithNoble(empty, password);
    const decryptedByNative = await decryptWithNativeArgon2(encryptedNoble, password);
    expect(decryptedByNative).toEqual(empty);
  }, 10000); // 10秒タイムアウト

  it('大容量データでの相互互換性', async () => {
    const large = new Uint8Array(10240); // 10KB
    large.fill(97);

    const encryptedNative = await encryptWithNativeArgon2(large, password);
    const decryptedByNoble = await decryptWithNoble(encryptedNative, password);
    expect(decryptedByNoble).toEqual(large);

    const encryptedNoble = await encryptWithNoble(large, password);
    const decryptedByNative = await decryptWithNativeArgon2(encryptedNoble, password);
    expect(decryptedByNative).toEqual(large);
  }, 15000); // 15秒タイムアウト
});
