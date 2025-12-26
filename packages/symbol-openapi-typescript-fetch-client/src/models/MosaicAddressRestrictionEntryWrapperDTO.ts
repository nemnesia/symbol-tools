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
import type { MosaicAddressRestrictionEntryDTO } from './MosaicAddressRestrictionEntryDTO.js';
import {
  MosaicAddressRestrictionEntryDTOFromJSON,
  MosaicAddressRestrictionEntryDTOFromJSONTyped,
  MosaicAddressRestrictionEntryDTOToJSON,
  MosaicAddressRestrictionEntryDTOToJSONTyped,
} from './MosaicAddressRestrictionEntryDTO.js';
import type { MosaicRestrictionEntryTypeEnum } from './MosaicRestrictionEntryTypeEnum.js';
import {
  MosaicRestrictionEntryTypeEnumFromJSON,
  MosaicRestrictionEntryTypeEnumFromJSONTyped,
  MosaicRestrictionEntryTypeEnumToJSON,
  MosaicRestrictionEntryTypeEnumToJSONTyped,
} from './MosaicRestrictionEntryTypeEnum.js';

/**
 *
 * @export
 * @interface MosaicAddressRestrictionEntryWrapperDTO
 */
export interface MosaicAddressRestrictionEntryWrapperDTO {
  /**
   * The version of the state
   * @type {number}
   * @memberof MosaicAddressRestrictionEntryWrapperDTO
   */
  version: number;
  /**
   *
   * @type {string}
   * @memberof MosaicAddressRestrictionEntryWrapperDTO
   */
  compositeHash: string;
  /**
   *
   * @type {MosaicRestrictionEntryTypeEnum}
   * @memberof MosaicAddressRestrictionEntryWrapperDTO
   */
  entryType: MosaicRestrictionEntryTypeEnum;
  /**
   * Mosaic identifier.
   * @type {string}
   * @memberof MosaicAddressRestrictionEntryWrapperDTO
   */
  mosaicId: string;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof MosaicAddressRestrictionEntryWrapperDTO
   */
  targetAddress: string;
  /**
   *
   * @type {Array<MosaicAddressRestrictionEntryDTO>}
   * @memberof MosaicAddressRestrictionEntryWrapperDTO
   */
  restrictions: Array<MosaicAddressRestrictionEntryDTO>;
}

/**
 * Check if a given object implements the MosaicAddressRestrictionEntryWrapperDTO interface.
 */
export function instanceOfMosaicAddressRestrictionEntryWrapperDTO(
  value: object
): value is MosaicAddressRestrictionEntryWrapperDTO {
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('compositeHash' in value) || value['compositeHash'] === undefined) return false;
  if (!('entryType' in value) || value['entryType'] === undefined) return false;
  if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
  if (!('targetAddress' in value) || value['targetAddress'] === undefined) return false;
  if (!('restrictions' in value) || value['restrictions'] === undefined) return false;
  return true;
}

export function MosaicAddressRestrictionEntryWrapperDTOFromJSON(json: any): MosaicAddressRestrictionEntryWrapperDTO {
  return MosaicAddressRestrictionEntryWrapperDTOFromJSONTyped(json, false);
}

export function MosaicAddressRestrictionEntryWrapperDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MosaicAddressRestrictionEntryWrapperDTO {
  if (json == null) {
    return json;
  }
  return {
    version: json['version'],
    compositeHash: json['compositeHash'],
    entryType: MosaicRestrictionEntryTypeEnumFromJSON(json['entryType']),
    mosaicId: json['mosaicId'],
    targetAddress: json['targetAddress'],
    restrictions: (json['restrictions'] as Array<any>).map(MosaicAddressRestrictionEntryDTOFromJSON),
  };
}

export function MosaicAddressRestrictionEntryWrapperDTOToJSON(json: any): MosaicAddressRestrictionEntryWrapperDTO {
  return MosaicAddressRestrictionEntryWrapperDTOToJSONTyped(json, false);
}

export function MosaicAddressRestrictionEntryWrapperDTOToJSONTyped(
  value?: MosaicAddressRestrictionEntryWrapperDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    version: value['version'],
    compositeHash: value['compositeHash'],
    entryType: MosaicRestrictionEntryTypeEnumToJSON(value['entryType']),
    mosaicId: value['mosaicId'],
    targetAddress: value['targetAddress'],
    restrictions: (value['restrictions'] as Array<any>).map(MosaicAddressRestrictionEntryDTOToJSON),
  };
}
