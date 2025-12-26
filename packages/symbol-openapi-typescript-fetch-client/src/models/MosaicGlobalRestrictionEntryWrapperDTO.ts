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
import type { MosaicGlobalRestrictionEntryDTO } from './MosaicGlobalRestrictionEntryDTO.js';
import {
  MosaicGlobalRestrictionEntryDTOFromJSON,
  MosaicGlobalRestrictionEntryDTOFromJSONTyped,
  MosaicGlobalRestrictionEntryDTOToJSON,
  MosaicGlobalRestrictionEntryDTOToJSONTyped,
} from './MosaicGlobalRestrictionEntryDTO.js';
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
 * @interface MosaicGlobalRestrictionEntryWrapperDTO
 */
export interface MosaicGlobalRestrictionEntryWrapperDTO {
  /**
   * The version of the state
   * @type {number}
   * @memberof MosaicGlobalRestrictionEntryWrapperDTO
   */
  version: number;
  /**
   *
   * @type {string}
   * @memberof MosaicGlobalRestrictionEntryWrapperDTO
   */
  compositeHash: string;
  /**
   *
   * @type {MosaicRestrictionEntryTypeEnum}
   * @memberof MosaicGlobalRestrictionEntryWrapperDTO
   */
  entryType: MosaicRestrictionEntryTypeEnum;
  /**
   * Mosaic identifier.
   * @type {string}
   * @memberof MosaicGlobalRestrictionEntryWrapperDTO
   */
  mosaicId: string;
  /**
   *
   * @type {Array<MosaicGlobalRestrictionEntryDTO>}
   * @memberof MosaicGlobalRestrictionEntryWrapperDTO
   */
  restrictions: Array<MosaicGlobalRestrictionEntryDTO>;
}

/**
 * Check if a given object implements the MosaicGlobalRestrictionEntryWrapperDTO interface.
 */
export function instanceOfMosaicGlobalRestrictionEntryWrapperDTO(
  value: object
): value is MosaicGlobalRestrictionEntryWrapperDTO {
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('compositeHash' in value) || value['compositeHash'] === undefined) return false;
  if (!('entryType' in value) || value['entryType'] === undefined) return false;
  if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
  if (!('restrictions' in value) || value['restrictions'] === undefined) return false;
  return true;
}

export function MosaicGlobalRestrictionEntryWrapperDTOFromJSON(json: any): MosaicGlobalRestrictionEntryWrapperDTO {
  return MosaicGlobalRestrictionEntryWrapperDTOFromJSONTyped(json, false);
}

export function MosaicGlobalRestrictionEntryWrapperDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MosaicGlobalRestrictionEntryWrapperDTO {
  if (json == null) {
    return json;
  }
  return {
    version: json['version'],
    compositeHash: json['compositeHash'],
    entryType: MosaicRestrictionEntryTypeEnumFromJSON(json['entryType']),
    mosaicId: json['mosaicId'],
    restrictions: (json['restrictions'] as Array<any>).map(MosaicGlobalRestrictionEntryDTOFromJSON),
  };
}

export function MosaicGlobalRestrictionEntryWrapperDTOToJSON(json: any): MosaicGlobalRestrictionEntryWrapperDTO {
  return MosaicGlobalRestrictionEntryWrapperDTOToJSONTyped(json, false);
}

export function MosaicGlobalRestrictionEntryWrapperDTOToJSONTyped(
  value?: MosaicGlobalRestrictionEntryWrapperDTO | null,
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
    restrictions: (value['restrictions'] as Array<any>).map(MosaicGlobalRestrictionEntryDTOToJSON),
  };
}
