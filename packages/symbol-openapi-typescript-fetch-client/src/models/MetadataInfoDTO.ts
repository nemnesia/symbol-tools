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
import type { MetadataEntryDTO } from './MetadataEntryDTO.js';
import {
  MetadataEntryDTOFromJSON,
  MetadataEntryDTOFromJSONTyped,
  MetadataEntryDTOToJSON,
  MetadataEntryDTOToJSONTyped,
} from './MetadataEntryDTO.js';

/**
 *
 * @export
 * @interface MetadataInfoDTO
 */
export interface MetadataInfoDTO {
  /**
   *
   * @type {string}
   * @memberof MetadataInfoDTO
   */
  id: string;
  /**
   *
   * @type {MetadataEntryDTO}
   * @memberof MetadataInfoDTO
   */
  metadataEntry: MetadataEntryDTO;
}

/**
 * Check if a given object implements the MetadataInfoDTO interface.
 */
export function instanceOfMetadataInfoDTO(value: object): value is MetadataInfoDTO {
  if (!('id' in value) || value['id'] === undefined) return false;
  if (!('metadataEntry' in value) || value['metadataEntry'] === undefined) return false;
  return true;
}

export function MetadataInfoDTOFromJSON(json: any): MetadataInfoDTO {
  return MetadataInfoDTOFromJSONTyped(json, false);
}

export function MetadataInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetadataInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    id: json['id'],
    metadataEntry: MetadataEntryDTOFromJSON(json['metadataEntry']),
  };
}

export function MetadataInfoDTOToJSON(json: any): MetadataInfoDTO {
  return MetadataInfoDTOToJSONTyped(json, false);
}

export function MetadataInfoDTOToJSONTyped(value?: MetadataInfoDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    id: value['id'],
    metadataEntry: MetadataEntryDTOToJSON(value['metadataEntry']),
  };
}
