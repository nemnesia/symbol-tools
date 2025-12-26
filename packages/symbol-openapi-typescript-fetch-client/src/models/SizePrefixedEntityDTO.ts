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
 * @interface SizePrefixedEntityDTO
 */
export interface SizePrefixedEntityDTO {
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof SizePrefixedEntityDTO
   */
  size: number;
}

/**
 * Check if a given object implements the SizePrefixedEntityDTO interface.
 */
export function instanceOfSizePrefixedEntityDTO(value: object): value is SizePrefixedEntityDTO {
  if (!('size' in value) || value['size'] === undefined) return false;
  return true;
}

export function SizePrefixedEntityDTOFromJSON(json: any): SizePrefixedEntityDTO {
  return SizePrefixedEntityDTOFromJSONTyped(json, false);
}

export function SizePrefixedEntityDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SizePrefixedEntityDTO {
  if (json == null) {
    return json;
  }
  return {
    size: json['size'],
  };
}

export function SizePrefixedEntityDTOToJSON(json: any): SizePrefixedEntityDTO {
  return SizePrefixedEntityDTOToJSONTyped(json, false);
}

export function SizePrefixedEntityDTOToJSONTyped(
  value?: SizePrefixedEntityDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    size: value['size'],
  };
}
