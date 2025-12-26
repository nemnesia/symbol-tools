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
import type { Pagination } from './Pagination.js';
import { PaginationFromJSON, PaginationFromJSONTyped, PaginationToJSON, PaginationToJSONTyped } from './Pagination.js';
import type { TransactionInfoDTO } from './TransactionInfoDTO.js';
import {
  TransactionInfoDTOFromJSON,
  TransactionInfoDTOFromJSONTyped,
  TransactionInfoDTOToJSON,
  TransactionInfoDTOToJSONTyped,
} from './TransactionInfoDTO.js';

/**
 *
 * @export
 * @interface TransactionPage
 */
export interface TransactionPage {
  /**
   * Array of transactions.
   * @type {Array<TransactionInfoDTO>}
   * @memberof TransactionPage
   */
  data: Array<TransactionInfoDTO>;
  /**
   *
   * @type {Pagination}
   * @memberof TransactionPage
   */
  pagination: Pagination;
}

/**
 * Check if a given object implements the TransactionPage interface.
 */
export function instanceOfTransactionPage(value: object): value is TransactionPage {
  if (!('data' in value) || value['data'] === undefined) return false;
  if (!('pagination' in value) || value['pagination'] === undefined) return false;
  return true;
}

export function TransactionPageFromJSON(json: any): TransactionPage {
  return TransactionPageFromJSONTyped(json, false);
}

export function TransactionPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionPage {
  if (json == null) {
    return json;
  }
  return {
    data: (json['data'] as Array<any>).map(TransactionInfoDTOFromJSON),
    pagination: PaginationFromJSON(json['pagination']),
  };
}

export function TransactionPageToJSON(json: any): TransactionPage {
  return TransactionPageToJSONTyped(json, false);
}

export function TransactionPageToJSONTyped(value?: TransactionPage | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    data: (value['data'] as Array<any>).map(TransactionInfoDTOToJSON),
    pagination: PaginationToJSON(value['pagination']),
  };
}
