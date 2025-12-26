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
 * @interface MosaicNamesDTO
 */
export interface MosaicNamesDTO {
  /**
   * Mosaic identifier.
   * @type {string}
   * @memberof MosaicNamesDTO
   */
  mosaicId: string;
  /**
   * Mosaic linked namespace names.
   * @type {Array<string>}
   * @memberof MosaicNamesDTO
   */
  names: Array<string>;
}

/**
 * Check if a given object implements the MosaicNamesDTO interface.
 */
export function instanceOfMosaicNamesDTO(value: object): value is MosaicNamesDTO {
  if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
  if (!('names' in value) || value['names'] === undefined) return false;
  return true;
}

export function MosaicNamesDTOFromJSON(json: any): MosaicNamesDTO {
  return MosaicNamesDTOFromJSONTyped(json, false);
}

export function MosaicNamesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicNamesDTO {
  if (json == null) {
    return json;
  }
  return {
    mosaicId: json['mosaicId'],
    names: json['names'],
  };
}

export function MosaicNamesDTOToJSON(json: any): MosaicNamesDTO {
  return MosaicNamesDTOToJSONTyped(json, false);
}

export function MosaicNamesDTOToJSONTyped(value?: MosaicNamesDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    mosaicId: value['mosaicId'],
    names: value['names'],
  };
}
