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
import type { MosaicSupplyChangeActionEnum } from './MosaicSupplyChangeActionEnum.js';
import {
  MosaicSupplyChangeActionEnumFromJSON,
  MosaicSupplyChangeActionEnumFromJSONTyped,
  MosaicSupplyChangeActionEnumToJSON,
  MosaicSupplyChangeActionEnumToJSONTyped,
} from './MosaicSupplyChangeActionEnum.js';

/**
 *
 * @export
 * @interface MosaicSupplyChangeTransactionBodyDTO
 */
export interface MosaicSupplyChangeTransactionBodyDTO {
  /**
   * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
   * is used instead of the real mosaic identifier.
   *
   * @type {string}
   * @memberof MosaicSupplyChangeTransactionBodyDTO
   */
  mosaicId: string;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof MosaicSupplyChangeTransactionBodyDTO
   */
  delta: string;
  /**
   *
   * @type {MosaicSupplyChangeActionEnum}
   * @memberof MosaicSupplyChangeTransactionBodyDTO
   */
  action: MosaicSupplyChangeActionEnum;
}

/**
 * Check if a given object implements the MosaicSupplyChangeTransactionBodyDTO interface.
 */
export function instanceOfMosaicSupplyChangeTransactionBodyDTO(
  value: object
): value is MosaicSupplyChangeTransactionBodyDTO {
  if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
  if (!('delta' in value) || value['delta'] === undefined) return false;
  if (!('action' in value) || value['action'] === undefined) return false;
  return true;
}

export function MosaicSupplyChangeTransactionBodyDTOFromJSON(json: any): MosaicSupplyChangeTransactionBodyDTO {
  return MosaicSupplyChangeTransactionBodyDTOFromJSONTyped(json, false);
}

export function MosaicSupplyChangeTransactionBodyDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MosaicSupplyChangeTransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    mosaicId: json['mosaicId'],
    delta: json['delta'],
    action: MosaicSupplyChangeActionEnumFromJSON(json['action']),
  };
}

export function MosaicSupplyChangeTransactionBodyDTOToJSON(json: any): MosaicSupplyChangeTransactionBodyDTO {
  return MosaicSupplyChangeTransactionBodyDTOToJSONTyped(json, false);
}

export function MosaicSupplyChangeTransactionBodyDTOToJSONTyped(
  value?: MosaicSupplyChangeTransactionBodyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    mosaicId: value['mosaicId'],
    delta: value['delta'],
    action: MosaicSupplyChangeActionEnumToJSON(value['action']),
  };
}
