/* tslint:disable */
/* eslint-disable */
/**
 * Copyright © 2025 The Symbol Syndicate
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { mapValues } from '../runtime.js';
import type { NetworkTypeEnum } from './NetworkTypeEnum.js';
import {
  NetworkTypeEnumFromJSON,
  NetworkTypeEnumFromJSONTyped,
  NetworkTypeEnumToJSON,
  NetworkTypeEnumToJSONTyped,
} from './NetworkTypeEnum.js';
import type { UnresolvedMosaic } from './UnresolvedMosaic.js';
import {
  UnresolvedMosaicFromJSON,
  UnresolvedMosaicFromJSONTyped,
  UnresolvedMosaicToJSON,
  UnresolvedMosaicToJSONTyped,
} from './UnresolvedMosaic.js';

/**
 *
 * @export
 * @interface EmbeddedTransferTransactionDTO
 */
export interface EmbeddedTransferTransactionDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedTransferTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof EmbeddedTransferTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof EmbeddedTransferTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof EmbeddedTransferTransactionDTO
   */
  type: number;
  /**
   * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
   * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA.
   * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
   *
   * @type {string}
   * @memberof EmbeddedTransferTransactionDTO
   */
  recipientAddress: string;
  /**
   * Array of mosaics sent to the recipient.
   *
   * @type {Array<UnresolvedMosaic>}
   * @memberof EmbeddedTransferTransactionDTO
   */
  mosaics: Array<UnresolvedMosaic>;
  /**
   * Transfer transaction message
   * @type {string}
   * @memberof EmbeddedTransferTransactionDTO
   */
  message?: string;
}

/**
 * Check if a given object implements the EmbeddedTransferTransactionDTO interface.
 */
export function instanceOfEmbeddedTransferTransactionDTO(value: object): value is EmbeddedTransferTransactionDTO {
  if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('network' in value) || value['network'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('recipientAddress' in value) || value['recipientAddress'] === undefined) return false;
  if (!('mosaics' in value) || value['mosaics'] === undefined) return false;
  return true;
}

export function EmbeddedTransferTransactionDTOFromJSON(json: any): EmbeddedTransferTransactionDTO {
  return EmbeddedTransferTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedTransferTransactionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedTransferTransactionDTO {
  if (json == null) {
    return json;
  }
  return {
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
    recipientAddress: json['recipientAddress'],
    mosaics: (json['mosaics'] as Array<any>).map(UnresolvedMosaicFromJSON),
    message: json['message'] == null ? undefined : json['message'],
  };
}

export function EmbeddedTransferTransactionDTOToJSON(json: any): EmbeddedTransferTransactionDTO {
  return EmbeddedTransferTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedTransferTransactionDTOToJSONTyped(
  value?: EmbeddedTransferTransactionDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    signerPublicKey: value['signerPublicKey'],
    version: value['version'],
    network: NetworkTypeEnumToJSON(value['network']),
    type: value['type'],
    recipientAddress: value['recipientAddress'],
    mosaics: (value['mosaics'] as Array<any>).map(UnresolvedMosaicToJSON),
    message: value['message'],
  };
}
