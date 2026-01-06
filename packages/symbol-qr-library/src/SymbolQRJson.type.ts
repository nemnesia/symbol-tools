/**
 * QRコードタイプ列挙型
 * / QR Code Type Enumeration
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
 * / Symbol QR Code JSON Base Interface
 */
export interface SymbolQRJsonBase {
  v: number;
  type: number;
  network_id: number;
  chain_id: string;
}

/**
 * 連絡先QRコードJSONインターフェース
 * / Contact QR Code JSON Interface
 *
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
 * / Account Export QR Code JSON Interface
 *
 * QRCodeType: 2
 */
export interface ExportAccountJson extends SymbolQRJsonBase {
  data:
    | {
        ciphertext: string;
        salt: string;
      }
    | {
        privateKey: string;
      };
}

/**
 * リクエスト取引QRコードJSONインターフェース
 * / Request Transaction QR Code JSON Interface
 *
 * QRCodeType: 3
 */
export interface RequestTransactionJson extends SymbolQRJsonBase {
  data: {
    payload: string;
  };
}

/**
 * 共同署名用QRコードのJSONインターフェースをリクエスト
 * / Request Cosignature QR Code JSON Interface
 *
 * QRCodeType: 4
 */
export interface RequestCosignatureJson extends RequestTransactionJson {}

/**
 * エクスポートニーモニックQRコードJSONインターフェース
 * / Export Mnemonic QR Code JSON Interface
 *
 * QRCodeType: 5
 */
export interface ExportMnemonicJson extends SymbolQRJsonBase {
  data:
    | {
        ciphertext: string;
        salt: string;
      }
    | {
        plainMnemonic: string;
      };
}

/**
 * エクスポートオブジェクトQRコードJSONインターフェース
 * / Export Object QR Code JSON Interface
 *
 * QRCodeType: 6
 */
export interface ExportObjectJson extends SymbolQRJsonBase {
  data: object;
}

/**
 * エクスポートアドレスQRコードJSONインターフェース
 * / Export Address QR Code JSON Interface
 *
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
 * / Signed Transaction QR Code JSON Interface
 *
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
 * / Cosignature Signed Transaction QR Code JSON Interface
 *
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
