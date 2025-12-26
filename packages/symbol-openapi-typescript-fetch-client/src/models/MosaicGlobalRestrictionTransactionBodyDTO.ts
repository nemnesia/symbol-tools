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

/**
 *
 * @export
 * @interface MosaicGlobalRestrictionTransactionBodyDTO
 */
export interface MosaicGlobalRestrictionTransactionBodyDTO {
  /**
   * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
   * is used instead of the real mosaic identifier.
   *
   * @type {string}
   * @memberof MosaicGlobalRestrictionTransactionBodyDTO
   */
  mosaicId: string;
  /**
   * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
   * is used instead of the real mosaic identifier.
   *
   * @type {string}
   * @memberof MosaicGlobalRestrictionTransactionBodyDTO
   */
  referenceMosaicId: string;
  /**
   * Restriction key.
   * @type {string}
   * @memberof MosaicGlobalRestrictionTransactionBodyDTO
   */
  restrictionKey: string;
  /**
   * Restriction value.
   * @type {string}
   * @memberof MosaicGlobalRestrictionTransactionBodyDTO
   */
  previousRestrictionValue: string;
  /**
   * Restriction value.
   * @type {string}
   * @memberof MosaicGlobalRestrictionTransactionBodyDTO
   */
  newRestrictionValue: string;
  /**
   *
   * @type {MosaicRestrictionTypeEnum}
   * @memberof MosaicGlobalRestrictionTransactionBodyDTO
   */
  previousRestrictionType: MosaicRestrictionTypeEnum;
  /**
   *
   * @type {MosaicRestrictionTypeEnum}
   * @memberof MosaicGlobalRestrictionTransactionBodyDTO
   */
  newRestrictionType: MosaicRestrictionTypeEnum;
}

/**
 * Check if a given object implements the MosaicGlobalRestrictionTransactionBodyDTO interface.
 */
export function instanceOfMosaicGlobalRestrictionTransactionBodyDTO(
  value: object
): value is MosaicGlobalRestrictionTransactionBodyDTO {
  if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
  if (!('referenceMosaicId' in value) || value['referenceMosaicId'] === undefined) return false;
  if (!('restrictionKey' in value) || value['restrictionKey'] === undefined) return false;
  if (!('previousRestrictionValue' in value) || value['previousRestrictionValue'] === undefined) return false;
  if (!('newRestrictionValue' in value) || value['newRestrictionValue'] === undefined) return false;
  if (!('previousRestrictionType' in value) || value['previousRestrictionType'] === undefined) return false;
  if (!('newRestrictionType' in value) || value['newRestrictionType'] === undefined) return false;
  return true;
}

export function MosaicGlobalRestrictionTransactionBodyDTOFromJSON(
  json: any
): MosaicGlobalRestrictionTransactionBodyDTO {
  return MosaicGlobalRestrictionTransactionBodyDTOFromJSONTyped(json, false);
}

export function MosaicGlobalRestrictionTransactionBodyDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MosaicGlobalRestrictionTransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    mosaicId: json['mosaicId'],
    referenceMosaicId: json['referenceMosaicId'],
    restrictionKey: json['restrictionKey'],
    previousRestrictionValue: json['previousRestrictionValue'],
    newRestrictionValue: json['newRestrictionValue'],
    previousRestrictionType: MosaicRestrictionTypeEnumFromJSON(json['previousRestrictionType']),
    newRestrictionType: MosaicRestrictionTypeEnumFromJSON(json['newRestrictionType']),
  };
}

export function MosaicGlobalRestrictionTransactionBodyDTOToJSON(json: any): MosaicGlobalRestrictionTransactionBodyDTO {
  return MosaicGlobalRestrictionTransactionBodyDTOToJSONTyped(json, false);
}

export function MosaicGlobalRestrictionTransactionBodyDTOToJSONTyped(
  value?: MosaicGlobalRestrictionTransactionBodyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    mosaicId: value['mosaicId'],
    referenceMosaicId: value['referenceMosaicId'],
    restrictionKey: value['restrictionKey'],
    previousRestrictionValue: value['previousRestrictionValue'],
    newRestrictionValue: value['newRestrictionValue'],
    previousRestrictionType: MosaicRestrictionTypeEnumToJSON(value['previousRestrictionType']),
    newRestrictionType: MosaicRestrictionTypeEnumToJSON(value['newRestrictionType']),
  };
}
