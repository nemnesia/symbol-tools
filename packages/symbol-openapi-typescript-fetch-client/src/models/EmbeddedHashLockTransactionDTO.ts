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
 * @interface EmbeddedHashLockTransactionDTO
 */
export interface EmbeddedHashLockTransactionDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedHashLockTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof EmbeddedHashLockTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof EmbeddedHashLockTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof EmbeddedHashLockTransactionDTO
   */
  type: number;
  /**
   * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
   * is used instead of the real mosaic identifier.
   *
   * @type {string}
   * @memberof EmbeddedHashLockTransactionDTO
   */
  mosaicId: string;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof EmbeddedHashLockTransactionDTO
   */
  amount: string;
  /**
   * Duration expressed in number of blocks.
   * @type {string}
   * @memberof EmbeddedHashLockTransactionDTO
   */
  duration: string;
  /**
   *
   * @type {string}
   * @memberof EmbeddedHashLockTransactionDTO
   */
  hash: string;
}

/**
 * Check if a given object implements the EmbeddedHashLockTransactionDTO interface.
 */
export function instanceOfEmbeddedHashLockTransactionDTO(value: object): value is EmbeddedHashLockTransactionDTO {
  if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('network' in value) || value['network'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
  if (!('amount' in value) || value['amount'] === undefined) return false;
  if (!('duration' in value) || value['duration'] === undefined) return false;
  if (!('hash' in value) || value['hash'] === undefined) return false;
  return true;
}

export function EmbeddedHashLockTransactionDTOFromJSON(json: any): EmbeddedHashLockTransactionDTO {
  return EmbeddedHashLockTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedHashLockTransactionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedHashLockTransactionDTO {
  if (json == null) {
    return json;
  }
  return {
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
    mosaicId: json['mosaicId'],
    amount: json['amount'],
    duration: json['duration'],
    hash: json['hash'],
  };
}

export function EmbeddedHashLockTransactionDTOToJSON(json: any): EmbeddedHashLockTransactionDTO {
  return EmbeddedHashLockTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedHashLockTransactionDTOToJSONTyped(
  value?: EmbeddedHashLockTransactionDTO | null,
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
    mosaicId: value['mosaicId'],
    amount: value['amount'],
    duration: value['duration'],
    hash: value['hash'],
  };
}
