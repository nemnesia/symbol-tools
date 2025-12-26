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
import type { MosaicInfoDTO } from './MosaicInfoDTO.js';
import {
  MosaicInfoDTOFromJSON,
  MosaicInfoDTOFromJSONTyped,
  MosaicInfoDTOToJSON,
  MosaicInfoDTOToJSONTyped,
} from './MosaicInfoDTO.js';
import type { Pagination } from './Pagination.js';
import { PaginationFromJSON, PaginationFromJSONTyped, PaginationToJSON, PaginationToJSONTyped } from './Pagination.js';

/**
 *
 * @export
 * @interface MosaicPage
 */
export interface MosaicPage {
  /**
   * Array of mosaics.
   * @type {Array<MosaicInfoDTO>}
   * @memberof MosaicPage
   */
  data: Array<MosaicInfoDTO>;
  /**
   *
   * @type {Pagination}
   * @memberof MosaicPage
   */
  pagination: Pagination;
}

/**
 * Check if a given object implements the MosaicPage interface.
 */
export function instanceOfMosaicPage(value: object): value is MosaicPage {
  if (!('data' in value) || value['data'] === undefined) return false;
  if (!('pagination' in value) || value['pagination'] === undefined) return false;
  return true;
}

export function MosaicPageFromJSON(json: any): MosaicPage {
  return MosaicPageFromJSONTyped(json, false);
}

export function MosaicPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicPage {
  if (json == null) {
    return json;
  }
  return {
    data: (json['data'] as Array<any>).map(MosaicInfoDTOFromJSON),
    pagination: PaginationFromJSON(json['pagination']),
  };
}

export function MosaicPageToJSON(json: any): MosaicPage {
  return MosaicPageToJSONTyped(json, false);
}

export function MosaicPageToJSONTyped(value?: MosaicPage | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    data: (value['data'] as Array<any>).map(MosaicInfoDTOToJSON),
    pagination: PaginationToJSON(value['pagination']),
  };
}
