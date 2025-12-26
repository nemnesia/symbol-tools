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
import type { TransactionInfoDTOMeta } from './TransactionInfoDTOMeta.js';
import {
  TransactionInfoDTOMetaFromJSON,
  TransactionInfoDTOMetaFromJSONTyped,
  TransactionInfoDTOMetaToJSON,
  TransactionInfoDTOMetaToJSONTyped,
} from './TransactionInfoDTOMeta.js';
import type { TransactionInfoDTOTransaction } from './TransactionInfoDTOTransaction.js';
import {
  TransactionInfoDTOTransactionFromJSON,
  TransactionInfoDTOTransactionFromJSONTyped,
  TransactionInfoDTOTransactionToJSON,
  TransactionInfoDTOTransactionToJSONTyped,
} from './TransactionInfoDTOTransaction.js';

/**
 *
 * @export
 * @interface TransactionInfoDTO
 */
export interface TransactionInfoDTO {
  /**
   * Internal resource identifier.
   * @type {string}
   * @memberof TransactionInfoDTO
   */
  id: string;
  /**
   *
   * @type {TransactionInfoDTOMeta}
   * @memberof TransactionInfoDTO
   */
  meta: TransactionInfoDTOMeta;
  /**
   *
   * @type {TransactionInfoDTOTransaction}
   * @memberof TransactionInfoDTO
   */
  transaction: TransactionInfoDTOTransaction;
}

/**
 * Check if a given object implements the TransactionInfoDTO interface.
 */
export function instanceOfTransactionInfoDTO(value: object): value is TransactionInfoDTO {
  if (!('id' in value) || value['id'] === undefined) return false;
  if (!('meta' in value) || value['meta'] === undefined) return false;
  if (!('transaction' in value) || value['transaction'] === undefined) return false;
  return true;
}

export function TransactionInfoDTOFromJSON(json: any): TransactionInfoDTO {
  return TransactionInfoDTOFromJSONTyped(json, false);
}

export function TransactionInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    id: json['id'],
    meta: TransactionInfoDTOMetaFromJSON(json['meta']),
    transaction: TransactionInfoDTOTransactionFromJSON(json['transaction']),
  };
}

export function TransactionInfoDTOToJSON(json: any): TransactionInfoDTO {
  return TransactionInfoDTOToJSONTyped(json, false);
}

export function TransactionInfoDTOToJSONTyped(
  value?: TransactionInfoDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    id: value['id'],
    meta: TransactionInfoDTOMetaToJSON(value['meta']),
    transaction: TransactionInfoDTOTransactionToJSON(value['transaction']),
  };
}
