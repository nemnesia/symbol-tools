/**
 * QRコードタイプ列挙型
 */
export enum QRCodeType {
  AddContact = 1,
  ExportAccount = 2,
  RequestTransaction = 3,
  RequestCosignature = 4,
  ExportMnemonic = 5,
  ExportObject = 6,
  ExportAddress = 7,
  SignedTransaction = 8,
  CosignatureSignedTransaction = 9,
}

/**
 * QRコードのSymbolJSONベースインターフェース
 */
export interface SymbolQRJsonBase {
  v: number;
  type: number;
  network_id: number;
  chain_id: string;
}

/**
 * 暗号化データインターフェース
 */
export interface EncryptedData {
  v: number;
  ciphertext: string;
  salt: string;
}

/**
 * 連絡先QRコードJSONインターフェース
 * QRCodeType: 1
 */
export interface AddContactJson extends SymbolQRJsonBase {
  data: {
    name: string;
    publicKey: string;
  };
}

/**
 * アカウントエクスポートQRコードJSONインターフェース
 * QRCodeType: 2
 */
export interface ExportAccountJson extends SymbolQRJsonBase {
  data:
    | EncryptedData
    | {
        privateKey: string;
      };
}

/**
 * 署名要求QRコードJSONインターフェース
 * QRCodeType: 3
 */
export interface RequestTransactionJson extends SymbolQRJsonBase {
  data: {
    payload: string;
  };
}

/**
 * 署名要求QRコードのJSONインターフェース
 * QRCodeType: 4
 */
export interface RequestCosignatureJson extends RequestTransactionJson {}

/**
 * エクスポートニーモニックQRコードJSONインターフェース
 * QRCodeType: 5
 */
export interface ExportMnemonicJson extends SymbolQRJsonBase {
  data:
    | EncryptedData
    | {
        plainMnemonic: string;
      };
}

/**
 * エクスポートオブジェクトQRコードJSONインターフェース
 * QRCodeType: 6
 */
export interface ExportObjectJson extends SymbolQRJsonBase {
  data: object;
}

/**
 * エクスポートアドレスQRコードJSONインターフェース
 * QRCodeType: 7
 */
export interface ExportAddressJson extends SymbolQRJsonBase {
  data: {
    name: string;
    address: string;
  };
}

/**
 * 署名済みトランザクションQRコードJSONインターフェース
 * QRCodeType: 8
 */
export interface SignedTransactionJson extends SymbolQRJsonBase {
  data: {
    payload: {
      payload: string;
      hash: string;
      signerPublicKey: string;
      type: number;
      networkType: number;
    };
  };
}

/**
 * 共同署名付き署名済みトランザクション QRコード JSONインターフェース
 * QRCodeType: 9
 */
export interface CosignatureSignedTransactionJson extends SymbolQRJsonBase {
  data: {
    payload: {
      parentHash: string;
      signature: string;
      signerPublicKey: string;
      version: string;
    };
  };
}
