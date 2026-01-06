import { utils } from 'symbol-sdk';
import { Network, SymbolFacade, models } from 'symbol-sdk/symbol';

import {
  AddContactJson,
  CosignatureSignedTransactionJson,
  ExportAccountJson,
  ExportAddressJson,
  ExportMnemonicJson,
  ExportObjectJson,
  QRCodeType,
  RequestTransactionJson,
  SignedTransactionJson,
} from './SymbolQRJson.type.js';

/**
 * Symbolブロックチェーン用の各種QRコードデータ(JSON)を生成するユーティリティクラス。
 */
export class SymbolQRJson {
  /** QRコードバージョン */
  private readonly VERSION = 3;
  private network: Network;

  /**
   * @param {Network} network ネットワーク情報
   */
  constructor(network: Network) {
    this.network = network;
  }

  /**
   * 連絡先追加用QRコードJSONを生成します。
   *
   * @param {string} name 連絡先名
   * @param {string} publicKey 公開鍵
   * @returns {AddContactJson} 連絡先追加QRコードJSON
   */
  public createContactQRJson(name: string, publicKey: string): AddContactJson {
    return {
      v: this.VERSION,
      type: QRCodeType.AddContact,
      network_id: this.network.identifier,
      chain_id: this.network.generationHashSeed.toString(),
      data: {
        name,
        publicKey,
      },
    };
  }

  /**
   * アカウントエクスポート用QRコードJSONを生成します。
   *
   * @param {string} privateKey 秘密鍵
   * @returns {ExportAccountJson} アカウントエクスポートQRコードJSON
   */
  public createAccountQRJson(privateKey: string): ExportAccountJson;

  /**
   * 暗号化アカウントエクスポート用QRコードJSONを生成します。
   *
   * @param {string} ciphertext 暗号化データ
   * @param {string} salt ソルト
   * @returns {ExportAccountJson} アカウントエクスポートQRコードJSON
   */
  public createAccountQRJson(ciphertext: string, salt: string): ExportAccountJson;

  /**
   * アカウントエクスポート用QRコードJSONを生成します。
   *
   * @param {string} privateKeyOrCiphertext 秘密鍵または暗号化データ
   * @param {string} salt ソルト（暗号化データの場合のみ指定）
   * @returns {ExportAccountJson} アカウントエクスポートQRコードJSON
   */
  public createAccountQRJson(privateKeyOrCiphertext: string, salt?: string): ExportAccountJson {
    let _data: { ciphertext: string; salt: string } | { privateKey: string };
    if (salt) {
      _data = {
        ciphertext: privateKeyOrCiphertext,
        salt,
      };
    } else {
      _data = {
        privateKey: privateKeyOrCiphertext,
      };
    }
    return {
      v: this.VERSION,
      type: QRCodeType.ExportAccount,
      network_id: this.network.identifier,
      chain_id: this.network.generationHashSeed.toString(),
      data: _data,
    };
  }

  /**
   * トランザクションリクエスト用QRコードJSONを生成します。
   *
   * @param {string} payload トランザクションペイロード
   * @returns {RequestTransactionJson} トランザクションリクエストQRコードJSON
   */
  public createRequestTransactionQRJson(payload: string): RequestTransactionJson;

  /**
   * トランザクションリクエスト用QRコードJSONを生成します。
   *
   * @param {models.Transaction} transaction トランザクション
   * @returns {RequestTransactionJson} トランザクションリクエストQRコードJSON
   */
  public createRequestTransactionQRJson(transaction: models.Transaction): RequestTransactionJson;

  /**
   * トランザクションリクエスト用QRコードJSONを生成します。
   *
   * @param {string | models.Transaction} payloadOrTransaction トランザクションペイロードまたはトランザクション
   * @returns {RequestTransactionJson} トランザクションリクエストQRコードJSON
   */
  public createRequestTransactionQRJson(payloadOrTransaction: string | models.Transaction): RequestTransactionJson {
    let _payload: string;
    if (typeof payloadOrTransaction === 'string') {
      _payload = payloadOrTransaction;
    } else {
      _payload = utils.uint8ToHex(payloadOrTransaction.serialize());
    }

    return {
      v: this.VERSION,
      type: QRCodeType.RequestTransaction,
      network_id: this.network.identifier,
      chain_id: this.network.generationHashSeed.toString(),
      data: {
        payload: _payload,
      },
    };
  }

  /**
   * 署名依頼用QRコードJSONを生成します。
   *
   * @param {string} payload トランザクションペイロード
   * @returns {RequestTransactionJson} 署名依頼QRコードJSON
   */
  public createRequestCosignatureQRJson(payload: string): RequestTransactionJson;

  /**
   * 署名依頼用QRコードJSONを生成します。
   *
   * @param {models.Transaction} transaction トランザクション
   * @returns {RequestTransactionJson} 署名依頼QRコードJSON
   */
  public createRequestCosignatureQRJson(transaction: models.Transaction): RequestTransactionJson;

  /**
   * 署名依頼用QRコードJSONを生成します。
   *
   * @param {string | models.Transaction} payloadOrTransaction トランザクションペイロードまたはトランザクション
   * @returns {RequestTransactionJson} 署名依頼QRコードJSON
   */
  public createRequestCosignatureQRJson(payloadOrTransaction: string | models.Transaction): RequestTransactionJson {
    let _payload: string;
    if (typeof payloadOrTransaction === 'string') {
      _payload = payloadOrTransaction;
    } else {
      _payload = utils.uint8ToHex(payloadOrTransaction.serialize());
    }

    return {
      v: this.VERSION,
      type: QRCodeType.RequestCosignature,
      network_id: this.network.identifier,
      chain_id: this.network.generationHashSeed.toString(),
      data: {
        payload: _payload,
      },
    };
  }

  /**
   * ニーモニックエクスポート用QRコードJSONを生成します。
   *
   * @param {string} mnemonic ニーモニック
   * @returns {ExportMnemonicJson} ニーモニックエクスポートQRコードJSON
   */
  public createExportMnemonicQRJson(mnemonic: string): ExportMnemonicJson;

  /**
   * 暗号化ニーモニックエクスポート用QRコードJSONを生成します。
   *
   * @param {string} ciphertext 暗号化データ
   * @param {string} salt ソルト
   * @returns {ExportMnemonicJson} ニーモニックエクスポートQRコードJSON
   */
  public createExportMnemonicQRJson(ciphertext: string, salt: string): ExportMnemonicJson;

  /**
   * ニーモニックエクスポート用QRコードJSONを生成します。
   *
   * @param {string} mnemonicOrCiphertext ニーモニックまたは暗号化データ
   * @param {string} [salt] ソルト
   * @returns {ExportMnemonicJson} ニーモニックエクスポートQRコードJSON
   */
  public createExportMnemonicQRJson(mnemonicOrCiphertext: string, salt?: string): ExportMnemonicJson {
    let _data: { ciphertext: string; salt: string } | { plainMnemonic: string };
    if (salt) {
      _data = {
        ciphertext: mnemonicOrCiphertext,
        salt,
      };
    } else {
      _data = {
        plainMnemonic: mnemonicOrCiphertext,
      };
    }

    return {
      v: this.VERSION,
      type: QRCodeType.ExportMnemonic,
      network_id: this.network.identifier,
      chain_id: this.network.generationHashSeed.toString(),
      data: _data,
    };
  }

  /**
   * 任意オブジェクトエクスポート用QRコードJSONを生成します。
   *
   * @param {string} exportObject エクスポートするデータ
   * @returns {ExportObjectJson} オブジェクトエクスポートQRコードJSON
   */
  public createExportObjectQRJson(exportObject: string): ExportObjectJson {
    return {
      v: this.VERSION,
      type: QRCodeType.ExportObject,
      network_id: this.network.identifier,
      chain_id: this.network.generationHashSeed.toString(),
      data: {
        data: exportObject,
      },
    };
  }

  /**
   * アドレスエクスポート用QRコードJSONを生成します。
   *
   * @param {string} name 名称
   * @param {string} address アドレス
   * @returns {ExportAddressJson} アドレスエクスポートQRコードJSON
   */
  public createExportAddressQRJson(name: string, address: string): ExportAddressJson {
    return {
      v: this.VERSION,
      type: QRCodeType.ExportAddress,
      network_id: this.network.identifier,
      chain_id: this.network.generationHashSeed.toString(),
      data: {
        name,
        address,
      },
    };
  }

  /**
   * 署名済みトランザクションQRコードJSONを生成します。
   *
   * @param {string} payload トランザクションペイロード
   * @param {string} hash トランザクションハッシュ
   * @param {string} signerPublicKey 署名者公開鍵
   * @param {number} type トランザクションタイプ
   * @param {number} networkType ネットワークタイプ
   * @returns {SignedTransactionJson} 署名済みトランザクションQRコードJSON
   */
  public createSignedTransactionQRJson(
    payload: string,
    hash: string,
    signerPublicKey: string,
    type: number,
    networkType: number
  ): SignedTransactionJson;

  /**
   * 署名済みトランザクションQRコードJSONを生成します。
   *
   * @param {models.Transaction} signedTransaction 署名済みトランザクション
   * @returns {SignedTransactionJson} 署名済みトランザクションQRコードJSON
   */
  public createSignedTransactionQRJson(signedTransaction: models.Transaction): SignedTransactionJson;

  /**
   * 署名済みトランザクションQRコードJSONを生成します。
   *
   * @param {string | models.Transaction} payloadOrSignedTransaction トランザクションペイロードまたは署名済みトランザクション
   * @param {string} [hash] トランザクションハッシュ
   * @param {string} [signerPublicKey] 署名者公開鍵
   * @param {number} [type] トランザクションタイプ
   * @param {number} [networkType] ネットワークタイプ
   * @returns {SignedTransactionJson} 署名済みトランザクションQRコードJSON
   */
  public createSignedTransactionQRJson(
    payloadOrSignedTransaction: string | models.Transaction,
    hash?: string,
    signerPublicKey?: string,
    type?: number,
    networkType?: number
  ): SignedTransactionJson {
    let _payload: string;
    let _hash: string;
    let _signerPublicKey: string;
    let _type: number;
    let _networkType: number;
    if (typeof payloadOrSignedTransaction === 'string') {
      _payload = payloadOrSignedTransaction;
      _hash = hash!;
      _signerPublicKey = signerPublicKey!;
      _type = type!;
      _networkType = networkType!;
    } else {
      _payload = utils.uint8ToHex(payloadOrSignedTransaction.serialize());
      _hash = new SymbolFacade(this.network).hashTransaction(payloadOrSignedTransaction).toString();
      _signerPublicKey = payloadOrSignedTransaction.signerPublicKey.toString();
      _type = payloadOrSignedTransaction.type.value;
      _networkType = payloadOrSignedTransaction.network.value;
    }

    return {
      v: this.VERSION,
      type: QRCodeType.SignedTransaction,
      network_id: this.network.identifier,
      chain_id: this.network.generationHashSeed.toString(),
      data: {
        payload: {
          payload: _payload,
          hash: _hash,
          signerPublicKey: _signerPublicKey,
          type: _type,
          networkType: _networkType,
        },
      },
    };
  }

  /**
   * 連署済みトランザクションQRコードJSONを生成します。
   *
   * @param {string} parentHash 親トランザクションハッシュ
   * @param {string} signature 署名
   * @param {string} signerPublicKey 署名者公開鍵
   * @param {string} version バージョン
   * @returns {CosignatureSignedTransactionJson} 連署済みトランザクションQRコードJSON
   */
  public createCosignatureSignedTransactionQRJson(
    parentHash: string,
    signature: string,
    signerPublicKey: string,
    version: string
  ): CosignatureSignedTransactionJson;

  /**
   * 連署済みトランザクションQRコードJSONを生成します。
   *
   * @param {models.DetachedCosignature} detachedCosignature 連署情報
   * @returns {CosignatureSignedTransactionJson} 連署済みトランザクションQRコードJSON
   */
  public createCosignatureSignedTransactionQRJson(
    detachedCosignature: models.DetachedCosignature
  ): CosignatureSignedTransactionJson;

  /**
   * 連署済みトランザクションQRコードJSONを生成します。
   *
   * @param {string | models.DetachedCosignature} parentHashOrDetachedCosignature 親トランザクションハッシュまたは連署情報
   * @param {string} [signature] 署名
   * @param {string} [signerPublicKey] 署名者公開鍵
   * @param {string} [version] バージョン
   * @returns {CosignatureSignedTransactionJson} 連署済みトランザクションQRコードJSON
   */
  public createCosignatureSignedTransactionQRJson(
    parentHashOrDetachedCosignature: string | models.DetachedCosignature,
    signature?: string,
    signerPublicKey?: string,
    version?: string
  ): CosignatureSignedTransactionJson {
    let _parentHash: string;
    let _signature: string;
    let _signerPublicKey: string;
    let _version: string;
    if (typeof parentHashOrDetachedCosignature === 'string') {
      _parentHash = parentHashOrDetachedCosignature;
      _signature = signature!;
      _signerPublicKey = signerPublicKey!;
      _version = version!;
    } else {
      _parentHash = parentHashOrDetachedCosignature.parentHash.toString();
      _signature = parentHashOrDetachedCosignature.signature.toString();
      _signerPublicKey = parentHashOrDetachedCosignature.signerPublicKey.toString();
      _version = parentHashOrDetachedCosignature.version.toString();
    }

    return {
      v: this.VERSION,
      type: QRCodeType.CosignatureSignedTransaction,
      network_id: this.network.identifier,
      chain_id: this.network.generationHashSeed.toString(),
      data: {
        payload: {
          parentHash: _parentHash,
          signature: _signature,
          signerPublicKey: _signerPublicKey,
          version: _version,
        },
      },
    };
  }
}
