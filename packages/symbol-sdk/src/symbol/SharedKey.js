// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { KeyPair } from './KeyPair.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PublicKey, SharedKey256 } from '../CryptoTypes.js';
 
import { deriveSharedKeyFactory } from '../SharedKey.js';
import { sha512 } from '@noble/hashes/sha2.js';

const deriveSharedKeyImpl = deriveSharedKeyFactory('catapult', sha512);

/**
 * Derives shared key from key pair and other party's public key.
 * @param {KeyPair} keyPair Key pair.
 * @param {PublicKey} otherPublicKey Other party's public key.
 * @returns {SharedKey256} Shared encryption key.
 */
const deriveSharedKey = (keyPair, otherPublicKey) => deriveSharedKeyImpl(keyPair.privateKey.bytes, otherPublicKey);

export { deriveSharedKey };
