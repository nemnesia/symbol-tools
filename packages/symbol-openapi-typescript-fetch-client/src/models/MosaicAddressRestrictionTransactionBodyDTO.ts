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

/**
 *
 * @export
 * @interface MosaicAddressRestrictionTransactionBodyDTO
 */
export interface MosaicAddressRestrictionTransactionBodyDTO {
  /**
   * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
   * is used instead of the real mosaic identifier.
   *
   * @type {string}
   * @memberof MosaicAddressRestrictionTransactionBodyDTO
   */
  mosaicId: string;
  /**
   * Restriction key.
   * @type {string}
   * @memberof MosaicAddressRestrictionTransactionBodyDTO
   */
  restrictionKey: string;
  /**
   * Restriction value.
   * @type {string}
   * @memberof MosaicAddressRestrictionTransactionBodyDTO
   */
  previousRestrictionValue: string;
  /**
   * Restriction value.
   * @type {string}
   * @memberof MosaicAddressRestrictionTransactionBodyDTO
   */
  newRestrictionValue: string;
  /**
   * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
   * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA.
   * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
   *
   * @type {string}
   * @memberof MosaicAddressRestrictionTransactionBodyDTO
   */
  targetAddress: string;
}

/**
 * Check if a given object implements the MosaicAddressRestrictionTransactionBodyDTO interface.
 */
export function instanceOfMosaicAddressRestrictionTransactionBodyDTO(
  value: object
): value is MosaicAddressRestrictionTransactionBodyDTO {
  if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
  if (!('restrictionKey' in value) || value['restrictionKey'] === undefined) return false;
  if (!('previousRestrictionValue' in value) || value['previousRestrictionValue'] === undefined) return false;
  if (!('newRestrictionValue' in value) || value['newRestrictionValue'] === undefined) return false;
  if (!('targetAddress' in value) || value['targetAddress'] === undefined) return false;
  return true;
}

export function MosaicAddressRestrictionTransactionBodyDTOFromJSON(
  json: any
): MosaicAddressRestrictionTransactionBodyDTO {
  return MosaicAddressRestrictionTransactionBodyDTOFromJSONTyped(json, false);
}

export function MosaicAddressRestrictionTransactionBodyDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MosaicAddressRestrictionTransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    mosaicId: json['mosaicId'],
    restrictionKey: json['restrictionKey'],
    previousRestrictionValue: json['previousRestrictionValue'],
    newRestrictionValue: json['newRestrictionValue'],
    targetAddress: json['targetAddress'],
  };
}

export function MosaicAddressRestrictionTransactionBodyDTOToJSON(
  json: any
): MosaicAddressRestrictionTransactionBodyDTO {
  return MosaicAddressRestrictionTransactionBodyDTOToJSONTyped(json, false);
}

export function MosaicAddressRestrictionTransactionBodyDTOToJSONTyped(
  value?: MosaicAddressRestrictionTransactionBodyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    mosaicId: value['mosaicId'],
    restrictionKey: value['restrictionKey'],
    previousRestrictionValue: value['previousRestrictionValue'],
    newRestrictionValue: value['newRestrictionValue'],
    targetAddress: value['targetAddress'],
  };
}
