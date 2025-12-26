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
 * @interface StorageInfoDTO
 */
export interface StorageInfoDTO {
  /**
   * Number of blocks stored.
   * @type {number}
   * @memberof StorageInfoDTO
   */
  numBlocks: number;
  /**
   * Number of transactions stored.
   * @type {number}
   * @memberof StorageInfoDTO
   */
  numTransactions: number;
  /**
   * Number of accounts created.
   * @type {number}
   * @memberof StorageInfoDTO
   */
  numAccounts: number;
}

/**
 * Check if a given object implements the StorageInfoDTO interface.
 */
export function instanceOfStorageInfoDTO(value: object): value is StorageInfoDTO {
  if (!('numBlocks' in value) || value['numBlocks'] === undefined) return false;
  if (!('numTransactions' in value) || value['numTransactions'] === undefined) return false;
  if (!('numAccounts' in value) || value['numAccounts'] === undefined) return false;
  return true;
}

export function StorageInfoDTOFromJSON(json: any): StorageInfoDTO {
  return StorageInfoDTOFromJSONTyped(json, false);
}

export function StorageInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): StorageInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    numBlocks: json['numBlocks'],
    numTransactions: json['numTransactions'],
    numAccounts: json['numAccounts'],
  };
}

export function StorageInfoDTOToJSON(json: any): StorageInfoDTO {
  return StorageInfoDTOToJSONTyped(json, false);
}

export function StorageInfoDTOToJSONTyped(value?: StorageInfoDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    numBlocks: value['numBlocks'],
    numTransactions: value['numTransactions'],
    numAccounts: value['numAccounts'],
  };
}
