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
import type { CosignatureDTO } from './CosignatureDTO.js';
import {
  CosignatureDTOFromJSON,
  CosignatureDTOFromJSONTyped,
  CosignatureDTOToJSON,
  CosignatureDTOToJSONTyped,
} from './CosignatureDTO.js';

/**
 *
 * @export
 * @interface AggregateTransactionBodyDTO
 */
export interface AggregateTransactionBodyDTO {
  /**
   *
   * @type {string}
   * @memberof AggregateTransactionBodyDTO
   */
  transactionsHash: string;
  /**
   * Array of transaction cosignatures.
   * @type {Array<CosignatureDTO>}
   * @memberof AggregateTransactionBodyDTO
   */
  cosignatures?: Array<CosignatureDTO>;
}

/**
 * Check if a given object implements the AggregateTransactionBodyDTO interface.
 */
export function instanceOfAggregateTransactionBodyDTO(value: object): value is AggregateTransactionBodyDTO {
  if (!('transactionsHash' in value) || value['transactionsHash'] === undefined) return false;
  return true;
}

export function AggregateTransactionBodyDTOFromJSON(json: any): AggregateTransactionBodyDTO {
  return AggregateTransactionBodyDTOFromJSONTyped(json, false);
}

export function AggregateTransactionBodyDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AggregateTransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    transactionsHash: json['transactionsHash'],
    cosignatures:
      json['cosignatures'] == null ? undefined : (json['cosignatures'] as Array<any>).map(CosignatureDTOFromJSON),
  };
}

export function AggregateTransactionBodyDTOToJSON(json: any): AggregateTransactionBodyDTO {
  return AggregateTransactionBodyDTOToJSONTyped(json, false);
}

export function AggregateTransactionBodyDTOToJSONTyped(
  value?: AggregateTransactionBodyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    transactionsHash: value['transactionsHash'],
    cosignatures:
      value['cosignatures'] == null ? undefined : (value['cosignatures'] as Array<any>).map(CosignatureDTOToJSON),
  };
}
