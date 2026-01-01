import ByteArray from './ByteArray.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PublicKey, SharedKey256 } from './CryptoTypes.js';

const toBufferView = input => {
	const typedByteArray = input instanceof ByteArray ? input.bytes : input;
	return new Uint8Array(typedByteArray.buffer, typedByteArray.byteOffset, typedByteArray.length);
};

// region AesCbcCipher

/**
 * Performs AES CBC encryption and decryption with a given key.
 */
export class AesCbcCipher {
	/**
	 * Creates a cipher around an aes shared key.
	 * @param {SharedKey256} aesKey AES shared key.
	 */
	constructor(aesKey) {
		/**
		 * @private
		 */
		this._key = aesKey;
	}

	/**
	 * Encrypts clear text.
	 * @param {Uint8Array} clearText Clear text to encrypt.
	 * @param {Uint8Array} iv IV bytes.
	 * @returns {Promise<Uint8Array>} Cipher text.
	 */
	async encrypt(clearText, iv) {
		const cryptoKey = await crypto.subtle.importKey(
			'raw',
			toBufferView(this._key),
			{ name: 'AES-CBC' },
			false,
			['encrypt']
		);

		const cipherBuffer = await crypto.subtle.encrypt(
			{ name: 'AES-CBC', iv: toBufferView(iv) },
			cryptoKey,
			toBufferView(clearText)
		);

		return new Uint8Array(cipherBuffer);
	}

	/**
	 * Decrypts cipher text.
	 * @param {Uint8Array} cipherText Cipher text to decrypt.
	 * @param {Uint8Array} iv IV bytes.
	 * @returns {Promise<Uint8Array>} Clear text.
	 */
	async decrypt(cipherText, iv) {
		const cryptoKey = await crypto.subtle.importKey(
			'raw',
			toBufferView(this._key),
			{ name: 'AES-CBC' },
			false,
			['decrypt']
		);

		const clearBuffer = await crypto.subtle.decrypt(
			{ name: 'AES-CBC', iv: toBufferView(iv) },
			cryptoKey,
			toBufferView(cipherText)
		);

		return new Uint8Array(clearBuffer);
	}
}

// endregion

// region AesGcmCipher

/**
 * Performs AES GCM encryption and decryption with a given key.
 */
export class AesGcmCipher {
	/**
	 * Byte size of GCM tag.
	 * @type {number}
	 */
	static TAG_SIZE = 16;

	/**
	 * Creates a cipher around an aes shared key.
	 * @param {SharedKey256} aesKey AES shared key.
	 */
	constructor(aesKey) {
		/**
		 * @private
		 */
		this._key = aesKey;
	}

	/**
	 * Encrypts clear text and appends tag to encrypted payload.
	 * @param {Uint8Array} clearText Clear text to encrypt.
	 * @param {Uint8Array} iv IV bytes.
	 * @returns {Promise<Uint8Array>} Cipher text with appended tag.
	 */
	async encrypt(clearText, iv) {
		const cryptoKey = await crypto.subtle.importKey(
			'raw',
			toBufferView(this._key),
			{ name: 'AES-GCM' },
			false,
			['encrypt']
		);

		const cipherBuffer = await crypto.subtle.encrypt(
			{ name: 'AES-GCM', iv: toBufferView(iv), tagLength: 128 },
			cryptoKey,
			toBufferView(clearText)
		);

		return new Uint8Array(cipherBuffer);
	}

	/**
	 * Decrypts cipher text with appended tag.
	 * @param {Uint8Array} cipherText Cipher text with appended tag to decrypt.
	 * @param {Uint8Array} iv IV bytes.
	 * @returns {Promise<Uint8Array>} Clear text.
	 */
	async decrypt(cipherText, iv) {
		const cryptoKey = await crypto.subtle.importKey(
			'raw',
			toBufferView(this._key),
			{ name: 'AES-GCM' },
			false,
			['decrypt']
		);

		const clearBuffer = await crypto.subtle.decrypt(
			{ name: 'AES-GCM', iv: toBufferView(iv), tagLength: 128 },
			cryptoKey,
			toBufferView(cipherText)
		);

		return new Uint8Array(clearBuffer);
	}
}

// endregion
