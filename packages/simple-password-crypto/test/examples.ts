import * as fs from 'node:fs/promises';

import { decrypt, encrypt } from '../src/index.js';

/**
 * Example 1: Basic encryption/decryption
 */
async function basicExample() {
  console.log('=== Basic Example ===');

  const plaintext = Buffer.from('My secret wallet data 🔐');
  const password = 'my-strong-password-123';

  // Encrypt
  const encrypted = await encrypt(plaintext, password);
  console.log('Encrypted:', JSON.stringify(encrypted, null, 2));

  // Decrypt
  const decrypted = await decrypt(encrypted, password);
  console.log('Decrypted:', decrypted.toString());

  console.log();
}

/**
 * Example 2: Save to file and restore
 */
async function fileStorageExample() {
  console.log('=== File Storage Example ===');

  const secretData = Buffer.from('Private key: 0x1234567890abcdef');
  const password = 'wallet-password';

  // Encrypt and save to file
  const encrypted = await encrypt(secretData, password);
  await fs.writeFile('/tmp/encrypted-wallet.json', JSON.stringify(encrypted, null, 2));
  console.log('Saved to /tmp/encrypted-wallet.json');

  // Load from file and decrypt
  const loaded = JSON.parse(await fs.readFile('/tmp/encrypted-wallet.json', 'utf-8'));
  const decrypted = await decrypt(loaded, password);
  console.log('Restored:', decrypted.toString());

  console.log();
}

/**
 * Example 3: Error handling
 */
async function errorHandlingExample() {
  console.log('=== Error Handling Example ===');

  const plaintext = Buffer.from('Secret');
  const password = 'correct-password';

  const encrypted = await encrypt(plaintext, password);

  // Wrong password
  try {
    await decrypt(encrypted, 'wrong-password');
  } catch (error) {
    console.log('Wrong password error:', (error as Error).message);
  }

  // Corrupted data
  try {
    const corrupted = { ...encrypted, ciphertext: 'invalid' };
    await decrypt(corrupted, password);
  } catch (error) {
    console.log('Corrupted data error:', (error as Error).message);
  }

  console.log();
}

/**
 * Example 4: Wallet use case
 */
async function walletExample() {
  console.log('=== Wallet Use Case ===');

  interface Wallet {
    address: string;
    privateKey: string;
    name: string;
  }

  const wallet: Wallet = {
    address: 'NAIBV5-BKEVGJ-IZQ4RP-224TYE-J3ZLDN-TJGOPA-TOLA',
    privateKey: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    name: 'My Main Wallet',
  };

  const password = 'my-wallet-password-2024';

  // Encrypt wallet
  const walletJson = JSON.stringify(wallet);
  const encrypted = await encrypt(Buffer.from(walletJson), password);

  console.log('Encrypted wallet format:');
  console.log('- Version:', encrypted.version);
  console.log('- KDF:', encrypted.kdf);
  console.log('- Cipher:', encrypted.cipher);
  console.log('- Ciphertext size:', encrypted.ciphertext.length, 'bytes (base64)');

  // Decrypt wallet
  const decrypted = await decrypt(encrypted, password);
  const restoredWallet: Wallet = JSON.parse(decrypted.toString());

  console.log('Restored wallet:');
  console.log('- Name:', restoredWallet.name);
  console.log('- Address:', restoredWallet.address);
  console.log('- Private key:', restoredWallet.privateKey.substring(0, 10) + '...');

  console.log();
}

/**
 * Example 5: Performance test
 */
async function performanceExample() {
  console.log('=== Performance Example ===');

  const data = Buffer.from('x'.repeat(1000)); // 1KB
  const password = 'test-password';

  // Encryption
  const encStart = Date.now();
  const encrypted = await encrypt(data, password);
  const encTime = Date.now() - encStart;
  console.log('Encryption time:', encTime, 'ms');

  // Decryption
  const decStart = Date.now();
  await decrypt(encrypted, password);
  const decTime = Date.now() - decStart;
  console.log('Decryption time:', decTime, 'ms');

  console.log();
}

// Run all examples
async function main() {
  await basicExample();
  await fileStorageExample();
  await errorHandlingExample();
  await walletExample();
  await performanceExample();
}

main().catch(console.error);
