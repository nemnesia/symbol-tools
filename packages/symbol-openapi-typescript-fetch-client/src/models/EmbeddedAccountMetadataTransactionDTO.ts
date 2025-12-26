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

/**
 *
 * @export
 * @interface EmbeddedAccountMetadataTransactionDTO
 */
export interface EmbeddedAccountMetadataTransactionDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedAccountMetadataTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof EmbeddedAccountMetadataTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof EmbeddedAccountMetadataTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof EmbeddedAccountMetadataTransactionDTO
   */
  type: number;
  /**
   * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
   * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA.
   * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
   *
   * @type {string}
   * @memberof EmbeddedAccountMetadataTransactionDTO
   */
  targetAddress: string;
  /**
   * Metadata key scoped to source, target and type expressed.
   * @type {string}
   * @memberof EmbeddedAccountMetadataTransactionDTO
   */
  scopedMetadataKey: string;
  /**
   * Change in value size in bytes.
   * @type {number}
   * @memberof EmbeddedAccountMetadataTransactionDTO
   */
  valueSizeDelta: number;
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof EmbeddedAccountMetadataTransactionDTO
   */
  valueSize: number;
  /**
   * Metadata value. If embedded in a transaction, this is calculated as xor(previous-value, value).
   * @type {string}
   * @memberof EmbeddedAccountMetadataTransactionDTO
   */
  value: string;
}

/**
 * Check if a given object implements the EmbeddedAccountMetadataTransactionDTO interface.
 */
export function instanceOfEmbeddedAccountMetadataTransactionDTO(
  value: object
): value is EmbeddedAccountMetadataTransactionDTO {
  if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('network' in value) || value['network'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('targetAddress' in value) || value['targetAddress'] === undefined) return false;
  if (!('scopedMetadataKey' in value) || value['scopedMetadataKey'] === undefined) return false;
  if (!('valueSizeDelta' in value) || value['valueSizeDelta'] === undefined) return false;
  if (!('valueSize' in value) || value['valueSize'] === undefined) return false;
  if (!('value' in value) || value['value'] === undefined) return false;
  return true;
}

export function EmbeddedAccountMetadataTransactionDTOFromJSON(json: any): EmbeddedAccountMetadataTransactionDTO {
  return EmbeddedAccountMetadataTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedAccountMetadataTransactionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedAccountMetadataTransactionDTO {
  if (json == null) {
    return json;
  }
  return {
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
    targetAddress: json['targetAddress'],
    scopedMetadataKey: json['scopedMetadataKey'],
    valueSizeDelta: json['valueSizeDelta'],
    valueSize: json['valueSize'],
    value: json['value'],
  };
}

export function EmbeddedAccountMetadataTransactionDTOToJSON(json: any): EmbeddedAccountMetadataTransactionDTO {
  return EmbeddedAccountMetadataTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedAccountMetadataTransactionDTOToJSONTyped(
  value?: EmbeddedAccountMetadataTransactionDTO | null,
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
    targetAddress: value['targetAddress'],
    scopedMetadataKey: value['scopedMetadataKey'],
    valueSizeDelta: value['valueSizeDelta'],
    valueSize: value['valueSize'],
    value: value['value'],
  };
}
