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
import type { HashLockInfoDTO } from './HashLockInfoDTO.js';
import {
  HashLockInfoDTOFromJSON,
  HashLockInfoDTOFromJSONTyped,
  HashLockInfoDTOToJSON,
  HashLockInfoDTOToJSONTyped,
} from './HashLockInfoDTO.js';
import type { Pagination } from './Pagination.js';
import { PaginationFromJSON, PaginationFromJSONTyped, PaginationToJSON, PaginationToJSONTyped } from './Pagination.js';

/**
 *
 * @export
 * @interface HashLockPage
 */
export interface HashLockPage {
  /**
   * Array of hash locks.
   * @type {Array<HashLockInfoDTO>}
   * @memberof HashLockPage
   */
  data: Array<HashLockInfoDTO>;
  /**
   *
   * @type {Pagination}
   * @memberof HashLockPage
   */
  pagination: Pagination;
}

/**
 * Check if a given object implements the HashLockPage interface.
 */
export function instanceOfHashLockPage(value: object): value is HashLockPage {
  if (!('data' in value) || value['data'] === undefined) return false;
  if (!('pagination' in value) || value['pagination'] === undefined) return false;
  return true;
}

export function HashLockPageFromJSON(json: any): HashLockPage {
  return HashLockPageFromJSONTyped(json, false);
}

export function HashLockPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): HashLockPage {
  if (json == null) {
    return json;
  }
  return {
    data: (json['data'] as Array<any>).map(HashLockInfoDTOFromJSON),
    pagination: PaginationFromJSON(json['pagination']),
  };
}

export function HashLockPageToJSON(json: any): HashLockPage {
  return HashLockPageToJSONTyped(json, false);
}

export function HashLockPageToJSONTyped(value?: HashLockPage | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    data: (value['data'] as Array<any>).map(HashLockInfoDTOToJSON),
    pagination: PaginationToJSON(value['pagination']),
  };
}
