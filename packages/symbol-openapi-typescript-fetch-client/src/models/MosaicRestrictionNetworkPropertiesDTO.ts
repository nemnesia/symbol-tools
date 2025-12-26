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
 * @interface MosaicRestrictionNetworkPropertiesDTO
 */
export interface MosaicRestrictionNetworkPropertiesDTO {
  /**
   * Maximum number of mosaic restriction values.
   * @type {string}
   * @memberof MosaicRestrictionNetworkPropertiesDTO
   */
  maxMosaicRestrictionValues?: string;
}

/**
 * Check if a given object implements the MosaicRestrictionNetworkPropertiesDTO interface.
 */
export function instanceOfMosaicRestrictionNetworkPropertiesDTO(
  value: object
): value is MosaicRestrictionNetworkPropertiesDTO {
  return true;
}

export function MosaicRestrictionNetworkPropertiesDTOFromJSON(json: any): MosaicRestrictionNetworkPropertiesDTO {
  return MosaicRestrictionNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function MosaicRestrictionNetworkPropertiesDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MosaicRestrictionNetworkPropertiesDTO {
  if (json == null) {
    return json;
  }
  return {
    maxMosaicRestrictionValues:
      json['maxMosaicRestrictionValues'] == null ? undefined : json['maxMosaicRestrictionValues'],
  };
}

export function MosaicRestrictionNetworkPropertiesDTOToJSON(json: any): MosaicRestrictionNetworkPropertiesDTO {
  return MosaicRestrictionNetworkPropertiesDTOToJSONTyped(json, false);
}

export function MosaicRestrictionNetworkPropertiesDTOToJSONTyped(
  value?: MosaicRestrictionNetworkPropertiesDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    maxMosaicRestrictionValues: value['maxMosaicRestrictionValues'],
  };
}
