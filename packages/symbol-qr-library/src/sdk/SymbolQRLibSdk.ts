import { PrivateKey, PublicKey, utils } from 'symbol-sdk';
import { Network, SymbolFacade, models } from 'symbol-sdk/symbol';

import {
  AddContactJson,
  CosignatureSignedTransactionJson,
  ExportAccountJson,
  ExportAddressJson,
  ExportMnemonicJson,
  ExportObjectJson,
  RequestTransactionJson,
  SignedTransactionJson,
} from '../SymbolQRJson.type.js';
import { SymbolQRLibCore } from '../core/SymbolQRLibCore.js';

/**
 * Symbolブロックチェーン用の各種QRコードデータ(JSON)を生成するユーティリティクラス。
 */
export class SymbolQRLibSdk {
  private network: Network;
  private core: SymbolQRLibCore;

  /**
   * @param {Network} network ネットワーク情報
   */
  constructor(network: Network) {
    this.network = network;
    this.core = new SymbolQRLibCore(network.identifier, network.generationHashSeed.toString());
  }

  /**
   * 連絡先追加用QRコードJSONを生成します。
   *
   * @param name 連絡先名
   * @param publicKey 公開鍵
   * @returns 連絡先追加QRコードJSON
   */
  public createContactQRJson(name: string, publicKey: PublicKey): AddContactJson {
    return this.core.createContactQRJson(name, publicKey.toString());
  }

  /**
   * アカウントエクスポート用QRコードJSONを生成します。
   *
   * @param privateKey 秘密鍵
   * @returns アカウントエクスポートQRコードJSON
   */
  public createExportAccountQRJson(privateKey: PrivateKey): ExportAccountJson;

  /**
   * 暗号化アカウントエクスポート用QRコードJSONを生成します。
   *
   * @param ciphertext 暗号化データ
   * @param salt ソルト
   * @returns アカウントエクスポートQRコードJSON
   */
  public createExportAccountQRJson(ciphertext: string, salt: string): ExportAccountJson;

  /**
   * アカウントエクスポート用QRコードJSONを生成します。
   *
   * @param privateKeyOrCiphertext 秘密鍵または暗号化データ
   * @param salt ソルト（暗号化データの場合のみ指定）
   * @returns アカウントエクスポートQRコードJSON
   */
  public createExportAccountQRJson(privateKeyOrCiphertext: PrivateKey | string, salt?: string): ExportAccountJson {
    if (salt) {
      return this.core.createExportAccountJson(privateKeyOrCiphertext as string, salt);
    } else {
      return this.core.createExportAccountJson((privateKeyOrCiphertext as PrivateKey).toString());
    }
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
    return SymbolQRLibCore.tryDecryptExportAccountJson(json, password);
  }

  /**
   * トランザクションリクエスト用QRコードJSONを生成します。
   *
   * @param transaction トランザクション
   * @returns トランザクションリクエストQRコードJSON
   */
  public createRequestTransactionQRJson(transaction: models.Transaction): RequestTransactionJson {
    return this.core.createRequestTransactionQRJson(utils.uint8ToHex(transaction.serialize()));
  }

  /**
   * 署名依頼用QRコードJSONを生成します。
   *
   * @param transaction トランザクション
   * @returns 署名依頼QRコードJSON
   */
  public createRequestCosignatureQRJson(transaction: models.Transaction): RequestTransactionJson {
    return this.core.createRequestCosignatureQRJson(utils.uint8ToHex(transaction.serialize()));
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
   * @param [salt] ソルト
   * @returns ニーモニックエクスポートQRコードJSON
   */
  public createExportMnemonicQRJson(mnemonicOrCiphertext: string, salt?: string): ExportMnemonicJson {
    if (salt) {
      return this.core.createExportMnemonicQRJson(mnemonicOrCiphertext, salt);
    } else {
      return this.core.createExportMnemonicQRJson(mnemonicOrCiphertext);
    }
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
    return SymbolQRLibCore.tryDecryptExportMnemonicJson(json, password);
  }

  /**
   * 任意オブジェクトエクスポート用QRコードJSONを生成します。
   *
   * @param exportObject エクスポートするデータ
   * @returns オブジェクトエクスポートQRコードJSON
   */
  public createExportObjectQRJson(exportObject: string): ExportObjectJson {
    return this.core.createExportObjectQRJson(exportObject);
  }

  /**
   * アドレスエクスポート用QRコードJSONを生成します。
   *
   * @param name 名称
   * @param address アドレス
   * @returns アドレスエクスポートQRコードJSON
   */
  public createExportAddressQRJson(name: string, address: string): ExportAddressJson {
    return this.core.createExportAddressQRJson(name, address);
  }

  /**
   * 署名済みトランザクションQRコードJSONを生成します。
   *
   * @param signedTransaction 署名済みトランザクション
   * @returns 署名済みトランザクションQRコードJSON
   */
  public createSignedTransactionQRJson(signedTransaction: models.Transaction): SignedTransactionJson {
    return this.core.createSignedTransactionQRJson(
      utils.uint8ToHex(signedTransaction.serialize()),
      new SymbolFacade(this.network).hashTransaction(signedTransaction).toString(),
      signedTransaction.signerPublicKey.toString(),
      signedTransaction.type.value,
      signedTransaction.network.value
    );
  }

  /**
   * 連署済みトランザクションQRコードJSONを生成します。
   *
   * @param detachedCosignature 連署情報
   * @returns CosignatureSignedTransactionJson 連署済みトランザクションQRコードJSON
   */
  public createCosignatureSignedTransactionQRJson(
    detachedCosignature: models.DetachedCosignature
  ): CosignatureSignedTransactionJson {
    return this.core.createCosignatureSignedTransactionQRJson(
      detachedCosignature.parentHash.toString(),
      detachedCosignature.signature.toString(),
      detachedCosignature.signerPublicKey.toString(),
      detachedCosignature.version.toString()
    );
  }
}
