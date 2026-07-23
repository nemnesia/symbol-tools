import { gcm } from '@noble/ciphers/aes.js';
import { argon2idAsync } from '@noble/hashes/argon2.js';
import { clean, randomBytes, utf8ToBytes } from '@noble/hashes/utils.js';

import { toBase64 } from './base64.js';
import {
  ARGON2ID_PARAMS,
  CIPHER,
  ENCRYPTED_DATA_VERSION,
  KDF,
  MAX_PLAINTEXT_LENGTH,
  NONCE_LENGTH,
  SALT_LENGTH,
  TAG_LENGTH,
  metadataToAad,
} from './constants.js';
import type { EncryptedData } from './types.js';

async function deriveKey(password: string, salt: Uint8Array): Promise<Uint8Array> {
  const passwordBytes = utf8ToBytes(password);
  try {
    return await argon2idAsync(passwordBytes, salt, {
      m: ARGON2ID_PARAMS.memoryCost,
      t: ARGON2ID_PARAMS.timeCost,
      p: ARGON2ID_PARAMS.parallelism,
      dkLen: 32,
    });
  } finally {
    clean(passwordBytes);
  }
}

export async function encrypt(plaintext: Uint8Array, password: string): Promise<EncryptedData> {
  if (!(plaintext instanceof Uint8Array)) throw new TypeError('plaintext must be a Uint8Array');
  if (plaintext.length > MAX_PLAINTEXT_LENGTH) throw new RangeError('plaintext is too large');
  if (typeof password !== 'string') throw new TypeError('password must be a string');

  const salt = randomBytes(SALT_LENGTH);
  const key = await deriveKey(password, salt);
  const nonce = randomBytes(NONCE_LENGTH);
  let ciphertextWithTag: Uint8Array;
  try {
    ciphertextWithTag = gcm(key, nonce, metadataToAad()).encrypt(plaintext);
  } finally {
    clean(key);
  }

  const combined = new Uint8Array(nonce.length + ciphertextWithTag.length);
  combined.set(nonce);
  // Store tag before ciphertext to retain the historical binary layout.
  combined.set(ciphertextWithTag.slice(-TAG_LENGTH), nonce.length);
  combined.set(ciphertextWithTag.slice(0, -TAG_LENGTH), nonce.length + TAG_LENGTH);

  return {
    version: ENCRYPTED_DATA_VERSION,
    kdf: KDF,
    kdfParams: { ...ARGON2ID_PARAMS },
    cipher: CIPHER,
    salt: toBase64(salt),
    ciphertext: toBase64(combined),
  };
}
