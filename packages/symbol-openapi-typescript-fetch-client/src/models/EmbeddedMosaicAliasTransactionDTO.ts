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
import type { AliasActionEnum } from './AliasActionEnum.js';
import {
  AliasActionEnumFromJSON,
  AliasActionEnumFromJSONTyped,
  AliasActionEnumToJSON,
  AliasActionEnumToJSONTyped,
} from './AliasActionEnum.js';
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
 * @interface EmbeddedMosaicAliasTransactionDTO
 */
export interface EmbeddedMosaicAliasTransactionDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedMosaicAliasTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof EmbeddedMosaicAliasTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof EmbeddedMosaicAliasTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof EmbeddedMosaicAliasTransactionDTO
   */
  type: number;
  /**
   * Namespace identifier.
   * @type {string}
   * @memberof EmbeddedMosaicAliasTransactionDTO
   */
  namespaceId: string;
  /**
   * Mosaic identifier.
   * @type {string}
   * @memberof EmbeddedMosaicAliasTransactionDTO
   */
  mosaicId: string;
  /**
   *
   * @type {AliasActionEnum}
   * @memberof EmbeddedMosaicAliasTransactionDTO
   */
  aliasAction: AliasActionEnum;
}

/**
 * Check if a given object implements the EmbeddedMosaicAliasTransactionDTO interface.
 */
export function instanceOfEmbeddedMosaicAliasTransactionDTO(value: object): value is EmbeddedMosaicAliasTransactionDTO {
  if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('network' in value) || value['network'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('namespaceId' in value) || value['namespaceId'] === undefined) return false;
  if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
  if (!('aliasAction' in value) || value['aliasAction'] === undefined) return false;
  return true;
}

export function EmbeddedMosaicAliasTransactionDTOFromJSON(json: any): EmbeddedMosaicAliasTransactionDTO {
  return EmbeddedMosaicAliasTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedMosaicAliasTransactionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedMosaicAliasTransactionDTO {
  if (json == null) {
    return json;
  }
  return {
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
    namespaceId: json['namespaceId'],
    mosaicId: json['mosaicId'],
    aliasAction: AliasActionEnumFromJSON(json['aliasAction']),
  };
}

export function EmbeddedMosaicAliasTransactionDTOToJSON(json: any): EmbeddedMosaicAliasTransactionDTO {
  return EmbeddedMosaicAliasTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedMosaicAliasTransactionDTOToJSONTyped(
  value?: EmbeddedMosaicAliasTransactionDTO | null,
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
    namespaceId: value['namespaceId'],
    mosaicId: value['mosaicId'],
    aliasAction: AliasActionEnumToJSON(value['aliasAction']),
  };
}
