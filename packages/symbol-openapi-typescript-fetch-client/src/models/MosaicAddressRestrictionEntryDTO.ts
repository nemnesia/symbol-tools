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
 * @interface MosaicAddressRestrictionEntryDTO
 */
export interface MosaicAddressRestrictionEntryDTO {
  /**
   * Restriction key.
   * @type {string}
   * @memberof MosaicAddressRestrictionEntryDTO
   */
  key: string;
  /**
   * Restriction value.
   * @type {string}
   * @memberof MosaicAddressRestrictionEntryDTO
   */
  value: string;
}

/**
 * Check if a given object implements the MosaicAddressRestrictionEntryDTO interface.
 */
export function instanceOfMosaicAddressRestrictionEntryDTO(value: object): value is MosaicAddressRestrictionEntryDTO {
  if (!('key' in value) || value['key'] === undefined) return false;
  if (!('value' in value) || value['value'] === undefined) return false;
  return true;
}

export function MosaicAddressRestrictionEntryDTOFromJSON(json: any): MosaicAddressRestrictionEntryDTO {
  return MosaicAddressRestrictionEntryDTOFromJSONTyped(json, false);
}

export function MosaicAddressRestrictionEntryDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MosaicAddressRestrictionEntryDTO {
  if (json == null) {
    return json;
  }
  return {
    key: json['key'],
    value: json['value'],
  };
}

export function MosaicAddressRestrictionEntryDTOToJSON(json: any): MosaicAddressRestrictionEntryDTO {
  return MosaicAddressRestrictionEntryDTOToJSONTyped(json, false);
}

export function MosaicAddressRestrictionEntryDTOToJSONTyped(
  value?: MosaicAddressRestrictionEntryDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    key: value['key'],
    value: value['value'],
  };
}
