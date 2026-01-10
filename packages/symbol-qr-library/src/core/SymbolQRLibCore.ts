import { decrypt, encrypt } from '@nemnesia/simple-password-crypto';

import {
  AddContactJson,
  CosignatureSignedTransactionJson,
  EncryptedData,
  ExportAccountJson,
  ExportAddressJson,
  ExportMnemonicJson,
  ExportObjectJson,
  QRCodeType,
  RequestTransactionJson,
  SignedTransactionJson,
} from '../SymbolQRJson.type.js';

/**
 * Symbolブロックチェーン用の各種QRコードデータ(JSON)を生成するユーティリティクラス。
 */
export class SymbolQRLibCore {
  /** QRコードバージョン */
  private readonly VERSION = 3;
  /** 暗号化データバージョン */
  private static readonly CRYPTO_VERSION = 2;

  /**
   * コンストラクタ
   *
   * @param networkId ネットワークID
   * @param generationHashSeed ジェネレーションハッシュシード
   */
  constructor(
    private networkId: number,
    private generationHashSeed: string
  ) {}

  /**
   * 連絡先追加用QRコードJSONを生成します。
   *
   * @param name 連絡先名
   * @param publicKey 公開鍵
   * @returns 連絡先追加QRコードJSON
   */
  public createContactQRJson(name: string, publicKey: string): AddContactJson {
    return {
      v: this.VERSION,
      type: QRCodeType.AddContact,
      network_id: this.networkId,
      chain_id: this.generationHashSeed,
      data: {
        name,
        publicKey,
      },
    };
  }

  /**
   * アカウントエクスポート用QRコードJSONを生成します。
   *
   * @param privateKey 秘密鍵
   * @returns アカウントエクスポートQRコードJSON
   */
  public createExportAccountJson(privateKey: string): ExportAccountJson;

  /**
   * 暗号化アカウントエクスポート用QRコードJSONを生成します。
   *
   * @param ciphertext 暗号化データ
   * @param salt ソルト
   * @returns アカウントエクスポートQRコードJSON
   */
  public createExportAccountJson(ciphertext: string, salt: string): ExportAccountJson;

  /**
   * アカウントエクスポート用QRコードJSONを生成します。
   *
   * @param privateKeyOrCiphertext 秘密鍵または暗号化データ
   * @param salt ソルト（暗号化データの場合のみ指定）
   * @returns アカウントエクスポートQRコードJSON
   */
  public createExportAccountJson(privateKeyOrCiphertext: string, salt?: string): ExportAccountJson {
    let _data: EncryptedData | { privateKey: string };
    if (salt) {
      _data = {
        v: SymbolQRLibCore.CRYPTO_VERSION,
        ciphertext: privateKeyOrCiphertext,
        salt,
      } as EncryptedData;
    } else {
      _data = {
        privateKey: privateKeyOrCiphertext,
      };
    }
    return {
      v: this.VERSION,
      type: QRCodeType.ExportAccount,
      network_id: this.networkId,
      chain_id: this.generationHashSeed,
      data: _data,
    };
  }

  /**
   * 暗号化アカウントエクスポート用QRコードJSONを生成します。
   *
   * @param privateKey 秘密鍵
   * @param password パスワード
   * @returns 暗号化アカウントエクスポートQRコードJSON
   */
  public async createEncryptedExportAccountJson(privateKey: string, password: string): Promise<ExportAccountJson> {
    const plainText = new TextEncoder().encode(privateKey);
    const encrypted = await encrypt(plainText, password);
    return this.createExportAccountJson(encrypted.ciphertext, encrypted.salt);
  }

  /**
   * アカウントエクスポート用QRコードJSONの暗号化データを復号化します。
   *
   * @param json アカウントエクスポートQRコードJSON
   * @param password パスワード
   * @returns 復号化されたアカウントエクスポートQRコードJSON
   */
  public static async tryDecryptExportAccountJson(
    json: ExportAccountJson,
    password: string
  ): Promise<ExportAccountJson> {
    const cryptoData = json.data as EncryptedData;
    if (!cryptoData.ciphertext || !cryptoData.salt) {
      throw new Error('The provided JSON does not contain encrypted data.');
    }
    if (cryptoData.v !== SymbolQRLibCore.CRYPTO_VERSION) {
      throw new Error(`Unsupported crypto version: ${cryptoData.v}`);
    }
    const decrypted = await decrypt(cryptoData, password);
    const plainText = new TextDecoder().decode(decrypted);
    return { ...json, data: { privateKey: plainText } };
  }

  /**
   * トランザクションリクエスト用QRコードJSONを生成します。
   *
   * @param payload トランザクションペイロード
   * @returns トランザクションリクエストQRコードJSON
   */
  public createRequestTransactionQRJson(payload: string): RequestTransactionJson {
    return {
      v: this.VERSION,
      type: QRCodeType.RequestTransaction,
      network_id: this.networkId,
      chain_id: this.generationHashSeed,
      data: {
        payload,
      },
    };
  }

  /**
   * 署名依頼用QRコードJSONを生成します。
   *
   * @param payload トランザクションペイロード
   * @returns 署名依頼QRコードJSON
   */
  public createRequestCosignatureQRJson(payload: string): RequestTransactionJson {
    return {
      v: this.VERSION,
      type: QRCodeType.RequestCosignature,
      network_id: this.networkId,
      chain_id: this.generationHashSeed,
      data: {
        payload,
      },
    };
  }

  /**
   * ニーモニックエクスポート用QRコードJSONを生成します。
   *
   * @param mnemonic ニーモニック
   * @returns ニーモニックエクスポートQRコードJSON
   */
  public createExportMnemonicQRJson(mnemonic: string): ExportMnemonicJson;

  /**
   * 暗号化ニーモニックエクスポート用QRコードJSONを生成します。
   *
   * @param ciphertext 暗号化データ
   * @param salt ソルト
   * @returns ニーモニックエクスポートQRコードJSON
   */
  public createExportMnemonicQRJson(ciphertext: string, salt: string): ExportMnemonicJson;

  /**
   * ニーモニックエクスポート用QRコードJSONを生成します。
   *
   * @param mnemonicOrCiphertext ニーモニックまたは暗号化データ
   * @param salt ソルト
   * @returns ニーモニックエクスポートQRコードJSON
   */
  public createExportMnemonicQRJson(mnemonicOrCiphertext: string, salt?: string): ExportMnemonicJson {
    let _data: EncryptedData | { plainMnemonic: string };
    if (salt) {
      _data = {
        v: SymbolQRLibCore.CRYPTO_VERSION,
        ciphertext: mnemonicOrCiphertext,
        salt,
      } as EncryptedData;
    } else {
      _data = {
        plainMnemonic: mnemonicOrCiphertext,
      };
    }

    return {
      v: this.VERSION,
      type: QRCodeType.ExportMnemonic,
      network_id: this.networkId,
      chain_id: this.generationHashSeed,
      data: _data,
    };
  }

  /**
   * 暗号化ニーモニックエクスポート用QRコードJSONを生成します。
   *
   * @param mnemonic ニーモニック
   * @param password パスワード
   * @returns 暗号化ニーモニックエクスポートQRコードJSON
   */
  public async createEncryptedExportMnemonicQRJson(mnemonic: string, password: string): Promise<ExportMnemonicJson> {
    const plainText = new TextEncoder().encode(mnemonic);
    const encrypted = await encrypt(plainText, password);
    return this.createExportMnemonicQRJson(encrypted.ciphertext, encrypted.salt);
  }

  /**
   * ニーモニックエクスポート用QRコードJSONの暗号化データを復号化します。
   *
   * @param json ニーモニックエクスポートQRコードJSON
   * @param password パスワード
   * @returns 復号化されたニーモニックエクスポートQRコードJSON
   */
  public static async tryDecryptExportMnemonicJson(
    json: ExportMnemonicJson,
    password: string
  ): Promise<ExportMnemonicJson> {
    const cryptoData = json.data as EncryptedData;
    if (!cryptoData.ciphertext || !cryptoData.salt) {
      throw new Error('The provided JSON does not contain encrypted data.');
    }
    if (cryptoData.v !== SymbolQRLibCore.CRYPTO_VERSION) {
      throw new Error(`Unsupported crypto version: ${cryptoData.v}`);
    }
    const decrypted = await decrypt(cryptoData, password);
    const plainText = new TextDecoder().decode(decrypted);
    return { ...json, data: { plainMnemonic: plainText } };
  }

  /**
   * 任意オブジェクトエクスポート用QRコードJSONを生成します。
   *
   * @param exportObject エクスポートするデータ
   * @returns オブジェクトエクスポートQRコードJSON
   */
  public createExportObjectQRJson(exportObject: string): ExportObjectJson {
    return {
      v: this.VERSION,
      type: QRCodeType.ExportObject,
      network_id: this.networkId,
      chain_id: this.generationHashSeed,
      data: {
        data: exportObject,
      },
    };
  }

  /**
   * アドレスエクスポート用QRコードJSONを生成します。
   *
   * @param name 名称
   * @param address アドレス
   * @returns アドレスエクスポートQRコードJSON
   */
  public createExportAddressQRJson(name: string, address: string): ExportAddressJson {
    return {
      v: this.VERSION,
      type: QRCodeType.ExportAddress,
      network_id: this.networkId,
      chain_id: this.generationHashSeed,
      data: {
        name,
        address,
      },
    };
  }

  /**
   * 署名済みトランザクションQRコードJSONを生成します。
   *
   * @param payload トランザクションペイロード
   * @param hash トランザクションハッシュ
   * @param signerPublicKey 署名者公開鍵
   * @param type トランザクションタイプ
   * @param networkType ネットワークタイプ
   * @returns 署名済みトランザクションQRコードJSON
   */
  public createSignedTransactionQRJson(
    payload: string,
    hash: string,
    signerPublicKey: string,
    type: number,
    networkType: number
  ): SignedTransactionJson {
    return {
      v: this.VERSION,
      type: QRCodeType.SignedTransaction,
      network_id: this.networkId,
      chain_id: this.generationHashSeed,
      data: {
        payload: {
          payload,
          hash,
          signerPublicKey,
          type,
          networkType,
        },
      },
    };
  }

  /**
   * 連署済みトランザクションQRコードJSONを生成します。
   *
   * @param parentHash 親トランザクションハッシュ
   * @param signature 署名
   * @param signerPublicKey 署名者公開鍵
   * @param version バージョン
   * @returns 連署済みトランザクションQRコードJSON
   */
  public createCosignatureSignedTransactionQRJson(
    parentHash: string,
    signature: string,
    signerPublicKey: string,
    version: string
  ): CosignatureSignedTransactionJson {
    return {
      v: this.VERSION,
      type: QRCodeType.CosignatureSignedTransaction,
      network_id: this.networkId,
      chain_id: this.generationHashSeed,
      data: {
        payload: {
          parentHash,
          signature,
          signerPublicKey,
          version,
        },
      },
    };
  }
}
