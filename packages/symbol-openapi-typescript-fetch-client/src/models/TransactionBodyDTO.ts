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
 * @interface TransactionBodyDTO
 */
export interface TransactionBodyDTO {
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof TransactionBodyDTO
   */
  maxFee: string;
  /**
   * Duration expressed in number of blocks.
   * @type {string}
   * @memberof TransactionBodyDTO
   */
  deadline: string;
}

/**
 * Check if a given object implements the TransactionBodyDTO interface.
 */
export function instanceOfTransactionBodyDTO(value: object): value is TransactionBodyDTO {
  if (!('maxFee' in value) || value['maxFee'] === undefined) return false;
  if (!('deadline' in value) || value['deadline'] === undefined) return false;
  return true;
}

export function TransactionBodyDTOFromJSON(json: any): TransactionBodyDTO {
  return TransactionBodyDTOFromJSONTyped(json, false);
}

export function TransactionBodyDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    maxFee: json['maxFee'],
    deadline: json['deadline'],
  };
}

export function TransactionBodyDTOToJSON(json: any): TransactionBodyDTO {
  return TransactionBodyDTOToJSONTyped(json, false);
}

export function TransactionBodyDTOToJSONTyped(
  value?: TransactionBodyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    maxFee: value['maxFee'],
    deadline: value['deadline'],
  };
}
