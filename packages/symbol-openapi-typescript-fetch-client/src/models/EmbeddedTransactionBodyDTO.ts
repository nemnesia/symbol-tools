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
import type { EmbeddedTransactionInfoDTO } from './EmbeddedTransactionInfoDTO.js';
import {
  EmbeddedTransactionInfoDTOFromJSON,
  EmbeddedTransactionInfoDTOFromJSONTyped,
  EmbeddedTransactionInfoDTOToJSON,
  EmbeddedTransactionInfoDTOToJSONTyped,
} from './EmbeddedTransactionInfoDTO.js';

/**
 *
 * @export
 * @interface EmbeddedTransactionBodyDTO
 */
export interface EmbeddedTransactionBodyDTO {
  /**
   * Array of transactions initiated by different accounts.
   * @type {Array<EmbeddedTransactionInfoDTO>}
   * @memberof EmbeddedTransactionBodyDTO
   */
  transactions: Array<EmbeddedTransactionInfoDTO>;
}

/**
 * Check if a given object implements the EmbeddedTransactionBodyDTO interface.
 */
export function instanceOfEmbeddedTransactionBodyDTO(value: object): value is EmbeddedTransactionBodyDTO {
  if (!('transactions' in value) || value['transactions'] === undefined) return false;
  return true;
}

export function EmbeddedTransactionBodyDTOFromJSON(json: any): EmbeddedTransactionBodyDTO {
  return EmbeddedTransactionBodyDTOFromJSONTyped(json, false);
}

export function EmbeddedTransactionBodyDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedTransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    transactions: (json['transactions'] as Array<any>).map(EmbeddedTransactionInfoDTOFromJSON),
  };
}

export function EmbeddedTransactionBodyDTOToJSON(json: any): EmbeddedTransactionBodyDTO {
  return EmbeddedTransactionBodyDTOToJSONTyped(json, false);
}

export function EmbeddedTransactionBodyDTOToJSONTyped(
  value?: EmbeddedTransactionBodyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    transactions: (value['transactions'] as Array<any>).map(EmbeddedTransactionInfoDTOToJSON),
  };
}
