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
import type { BlockInfoDTO } from './BlockInfoDTO.js';
import {
  BlockInfoDTOFromJSON,
  BlockInfoDTOFromJSONTyped,
  BlockInfoDTOToJSON,
  BlockInfoDTOToJSONTyped,
} from './BlockInfoDTO.js';
import type { Pagination } from './Pagination.js';
import { PaginationFromJSON, PaginationFromJSONTyped, PaginationToJSON, PaginationToJSONTyped } from './Pagination.js';

/**
 *
 * @export
 * @interface BlockPage
 */
export interface BlockPage {
  /**
   * Array of blocks.
   * @type {Array<BlockInfoDTO>}
   * @memberof BlockPage
   */
  data: Array<BlockInfoDTO>;
  /**
   *
   * @type {Pagination}
   * @memberof BlockPage
   */
  pagination: Pagination;
}

/**
 * Check if a given object implements the BlockPage interface.
 */
export function instanceOfBlockPage(value: object): value is BlockPage {
  if (!('data' in value) || value['data'] === undefined) return false;
  if (!('pagination' in value) || value['pagination'] === undefined) return false;
  return true;
}

export function BlockPageFromJSON(json: any): BlockPage {
  return BlockPageFromJSONTyped(json, false);
}

export function BlockPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlockPage {
  if (json == null) {
    return json;
  }
  return {
    data: (json['data'] as Array<any>).map(BlockInfoDTOFromJSON),
    pagination: PaginationFromJSON(json['pagination']),
  };
}

export function BlockPageToJSON(json: any): BlockPage {
  return BlockPageToJSONTyped(json, false);
}

export function BlockPageToJSONTyped(value?: BlockPage | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    data: (value['data'] as Array<any>).map(BlockInfoDTOToJSON),
    pagination: PaginationToJSON(value['pagination']),
  };
}
