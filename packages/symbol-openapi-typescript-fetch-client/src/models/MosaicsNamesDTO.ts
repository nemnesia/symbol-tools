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
import type { MosaicNamesDTO } from './MosaicNamesDTO.js';
import {
  MosaicNamesDTOFromJSON,
  MosaicNamesDTOFromJSONTyped,
  MosaicNamesDTOToJSON,
  MosaicNamesDTOToJSONTyped,
} from './MosaicNamesDTO.js';

/**
 *
 * @export
 * @interface MosaicsNamesDTO
 */
export interface MosaicsNamesDTO {
  /**
   * Array of mosaic names.
   * @type {Array<MosaicNamesDTO>}
   * @memberof MosaicsNamesDTO
   */
  mosaicNames: Array<MosaicNamesDTO>;
}

/**
 * Check if a given object implements the MosaicsNamesDTO interface.
 */
export function instanceOfMosaicsNamesDTO(value: object): value is MosaicsNamesDTO {
  if (!('mosaicNames' in value) || value['mosaicNames'] === undefined) return false;
  return true;
}

export function MosaicsNamesDTOFromJSON(json: any): MosaicsNamesDTO {
  return MosaicsNamesDTOFromJSONTyped(json, false);
}

export function MosaicsNamesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicsNamesDTO {
  if (json == null) {
    return json;
  }
  return {
    mosaicNames: (json['mosaicNames'] as Array<any>).map(MosaicNamesDTOFromJSON),
  };
}

export function MosaicsNamesDTOToJSON(json: any): MosaicsNamesDTO {
  return MosaicsNamesDTOToJSONTyped(json, false);
}

export function MosaicsNamesDTOToJSONTyped(value?: MosaicsNamesDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    mosaicNames: (value['mosaicNames'] as Array<any>).map(MosaicNamesDTOToJSON),
  };
}
