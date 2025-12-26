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
import type { MosaicRestrictionTypeEnum } from './MosaicRestrictionTypeEnum.js';
import {
  MosaicRestrictionTypeEnumFromJSON,
  MosaicRestrictionTypeEnumFromJSONTyped,
  MosaicRestrictionTypeEnumToJSON,
  MosaicRestrictionTypeEnumToJSONTyped,
} from './MosaicRestrictionTypeEnum.js';
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
 * @interface EmbeddedMosaicGlobalRestrictionTransactionDTO
 */
export interface EmbeddedMosaicGlobalRestrictionTransactionDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedMosaicGlobalRestrictionTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof EmbeddedMosaicGlobalRestrictionTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof EmbeddedMosaicGlobalRestrictionTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof EmbeddedMosaicGlobalRestrictionTransactionDTO
   */
  type: number;
  /**
   * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
   * is used instead of the real mosaic identifier.
   *
   * @type {string}
   * @memberof EmbeddedMosaicGlobalRestrictionTransactionDTO
   */
  mosaicId: string;
  /**
   * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
   * is used instead of the real mosaic identifier.
   *
   * @type {string}
   * @memberof EmbeddedMosaicGlobalRestrictionTransactionDTO
   */
  referenceMosaicId: string;
  /**
   * Restriction key.
   * @type {string}
   * @memberof EmbeddedMosaicGlobalRestrictionTransactionDTO
   */
  restrictionKey: string;
  /**
   * Restriction value.
   * @type {string}
   * @memberof EmbeddedMosaicGlobalRestrictionTransactionDTO
   */
  previousRestrictionValue: string;
  /**
   * Restriction value.
   * @type {string}
   * @memberof EmbeddedMosaicGlobalRestrictionTransactionDTO
   */
  newRestrictionValue: string;
  /**
   *
   * @type {MosaicRestrictionTypeEnum}
   * @memberof EmbeddedMosaicGlobalRestrictionTransactionDTO
   */
  previousRestrictionType: MosaicRestrictionTypeEnum;
  /**
   *
   * @type {MosaicRestrictionTypeEnum}
   * @memberof EmbeddedMosaicGlobalRestrictionTransactionDTO
   */
  newRestrictionType: MosaicRestrictionTypeEnum;
}

/**
 * Check if a given object implements the EmbeddedMosaicGlobalRestrictionTransactionDTO interface.
 */
export function instanceOfEmbeddedMosaicGlobalRestrictionTransactionDTO(
  value: object
): value is EmbeddedMosaicGlobalRestrictionTransactionDTO {
  if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('network' in value) || value['network'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
  if (!('referenceMosaicId' in value) || value['referenceMosaicId'] === undefined) return false;
  if (!('restrictionKey' in value) || value['restrictionKey'] === undefined) return false;
  if (!('previousRestrictionValue' in value) || value['previousRestrictionValue'] === undefined) return false;
  if (!('newRestrictionValue' in value) || value['newRestrictionValue'] === undefined) return false;
  if (!('previousRestrictionType' in value) || value['previousRestrictionType'] === undefined) return false;
  if (!('newRestrictionType' in value) || value['newRestrictionType'] === undefined) return false;
  return true;
}

export function EmbeddedMosaicGlobalRestrictionTransactionDTOFromJSON(
  json: any
): EmbeddedMosaicGlobalRestrictionTransactionDTO {
  return EmbeddedMosaicGlobalRestrictionTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedMosaicGlobalRestrictionTransactionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedMosaicGlobalRestrictionTransactionDTO {
  if (json == null) {
    return json;
  }
  return {
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
    mosaicId: json['mosaicId'],
    referenceMosaicId: json['referenceMosaicId'],
    restrictionKey: json['restrictionKey'],
    previousRestrictionValue: json['previousRestrictionValue'],
    newRestrictionValue: json['newRestrictionValue'],
    previousRestrictionType: MosaicRestrictionTypeEnumFromJSON(json['previousRestrictionType']),
    newRestrictionType: MosaicRestrictionTypeEnumFromJSON(json['newRestrictionType']),
  };
}

export function EmbeddedMosaicGlobalRestrictionTransactionDTOToJSON(
  json: any
): EmbeddedMosaicGlobalRestrictionTransactionDTO {
  return EmbeddedMosaicGlobalRestrictionTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedMosaicGlobalRestrictionTransactionDTOToJSONTyped(
  value?: EmbeddedMosaicGlobalRestrictionTransactionDTO | null,
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
    referenceMosaicId: value['referenceMosaicId'],
    restrictionKey: value['restrictionKey'],
    previousRestrictionValue: value['previousRestrictionValue'],
    newRestrictionValue: value['newRestrictionValue'],
    previousRestrictionType: MosaicRestrictionTypeEnumToJSON(value['previousRestrictionType']),
    newRestrictionType: MosaicRestrictionTypeEnumToJSON(value['newRestrictionType']),
  };
}
