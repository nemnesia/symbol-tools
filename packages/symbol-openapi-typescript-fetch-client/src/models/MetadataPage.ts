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
import type { MetadataInfoDTO } from './MetadataInfoDTO.js';
import {
  MetadataInfoDTOFromJSON,
  MetadataInfoDTOFromJSONTyped,
  MetadataInfoDTOToJSON,
  MetadataInfoDTOToJSONTyped,
} from './MetadataInfoDTO.js';
import type { Pagination } from './Pagination.js';
import { PaginationFromJSON, PaginationFromJSONTyped, PaginationToJSON, PaginationToJSONTyped } from './Pagination.js';

/**
 *
 * @export
 * @interface MetadataPage
 */
export interface MetadataPage {
  /**
   * Array of metadata entries.
   * @type {Array<MetadataInfoDTO>}
   * @memberof MetadataPage
   */
  data: Array<MetadataInfoDTO>;
  /**
   *
   * @type {Pagination}
   * @memberof MetadataPage
   */
  pagination: Pagination;
}

/**
 * Check if a given object implements the MetadataPage interface.
 */
export function instanceOfMetadataPage(value: object): value is MetadataPage {
  if (!('data' in value) || value['data'] === undefined) return false;
  if (!('pagination' in value) || value['pagination'] === undefined) return false;
  return true;
}

export function MetadataPageFromJSON(json: any): MetadataPage {
  return MetadataPageFromJSONTyped(json, false);
}

export function MetadataPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetadataPage {
  if (json == null) {
    return json;
  }
  return {
    data: (json['data'] as Array<any>).map(MetadataInfoDTOFromJSON),
    pagination: PaginationFromJSON(json['pagination']),
  };
}

export function MetadataPageToJSON(json: any): MetadataPage {
  return MetadataPageToJSONTyped(json, false);
}

export function MetadataPageToJSONTyped(value?: MetadataPage | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    data: (value['data'] as Array<any>).map(MetadataInfoDTOToJSON),
    pagination: PaginationToJSON(value['pagination']),
  };
}
