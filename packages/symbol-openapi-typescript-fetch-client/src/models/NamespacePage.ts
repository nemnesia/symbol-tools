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
import type { NamespaceInfoDTO } from './NamespaceInfoDTO.js';
import {
  NamespaceInfoDTOFromJSON,
  NamespaceInfoDTOFromJSONTyped,
  NamespaceInfoDTOToJSON,
  NamespaceInfoDTOToJSONTyped,
} from './NamespaceInfoDTO.js';
import type { Pagination } from './Pagination.js';
import { PaginationFromJSON, PaginationFromJSONTyped, PaginationToJSON, PaginationToJSONTyped } from './Pagination.js';

/**
 *
 * @export
 * @interface NamespacePage
 */
export interface NamespacePage {
  /**
   * Array of namespaces.
   * @type {Array<NamespaceInfoDTO>}
   * @memberof NamespacePage
   */
  data: Array<NamespaceInfoDTO>;
  /**
   *
   * @type {Pagination}
   * @memberof NamespacePage
   */
  pagination: Pagination;
}

/**
 * Check if a given object implements the NamespacePage interface.
 */
export function instanceOfNamespacePage(value: object): value is NamespacePage {
  if (!('data' in value) || value['data'] === undefined) return false;
  if (!('pagination' in value) || value['pagination'] === undefined) return false;
  return true;
}

export function NamespacePageFromJSON(json: any): NamespacePage {
  return NamespacePageFromJSONTyped(json, false);
}

export function NamespacePageFromJSONTyped(json: any, ignoreDiscriminator: boolean): NamespacePage {
  if (json == null) {
    return json;
  }
  return {
    data: (json['data'] as Array<any>).map(NamespaceInfoDTOFromJSON),
    pagination: PaginationFromJSON(json['pagination']),
  };
}

export function NamespacePageToJSON(json: any): NamespacePage {
  return NamespacePageToJSONTyped(json, false);
}

export function NamespacePageToJSONTyped(value?: NamespacePage | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    data: (value['data'] as Array<any>).map(NamespaceInfoDTOToJSON),
    pagination: PaginationToJSON(value['pagination']),
  };
}
