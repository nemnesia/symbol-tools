import { PrivateKey, PublicKey } from 'symbol-sdk';
import { SymbolFacade, SymbolTransactionFactory, descriptors, generateMosaicAliasId, models } from 'symbol-sdk/symbol';

import { SymbolAnnouncer } from '../src/SymbolAnnouncer';

const facade = new SymbolFacade('testnet');

// 署名アカウント(送信者)
const aliceAccount = facade.createAccount(
  new PrivateKey('F10B02B6E6989445C8219EC0D5AFCD732830E79E2C029084ADC600DD1B594C69')
);
// 受信アカウント
const bobPublicAccount = facade.createPublicAccount(
  new PublicKey('94EC711522B4B32A1B6A6ED61D86D1E3EE11AFB9B912A17F8983EED3808819FD')
);

// 転送モザイク設定
const mosaicId = generateMosaicAliasId('symbol.xym');
const mosaics = [
  new descriptors.UnresolvedMosaicDescriptor(new models.UnresolvedMosaicId(mosaicId), new models.Amount(10_000000n)),
];

// 平文メッセージ
const message = new TextEncoder().encode('\0Hello, Symbol!!');

// 転送トランザクションディスクリプタ生成
const transferTxDescriptor = new descriptors.TransferTransactionV1Descriptor(
  bobPublicAccount.address,
  mosaics,
  message
);

// 転送トランザクション生成
const transferTx = facade.createTransactionFromTypedDescriptor(
  transferTxDescriptor,
  aliceAccount.publicKey,
  100, // 手数料係数
  60 * 60 * 2 // 有効期限(秒)
);

// アリス署名
const sig = aliceAccount.signTransaction(transferTx);
const payloadJsonString = SymbolTransactionFactory.attachSignature(transferTx, sig);

console.log('txHash:', facade.hashTransaction(transferTx).toString());
// console.log('payload:', payloadJsonString);
// console.log(transferTx.toJson());

const announcer = new SymbolAnnouncer(
  'https://t.sakia.harvestasya.com:3001',
  aliceAccount.address.toString(),
  payloadJsonString,
  facade.hashTransaction(transferTx).toString()
);

// イベントリスナーを設定
announcer.on('connected', () => {
  console.log('✅ WebSocket connected');
});

announcer.on('announced', (data) => {
  console.log('✅ Transaction announced:', data);
});

announcer.on('confirmedAdded', (message) => {
  console.log('✅ Transaction confirmed!', message);
  announcer.disconnect();
});

announcer.on('status', (message) => {
  console.log('⚠️ Transaction status:', message);
  announcer.disconnect();
});

announcer.on('error', (error) => {
  console.error('❌ Error:', error);
  announcer.disconnect();
});

// アナウンス開始
announcer.announce();
