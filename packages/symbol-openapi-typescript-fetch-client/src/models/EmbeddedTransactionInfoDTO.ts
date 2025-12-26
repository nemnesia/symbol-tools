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
import type { EmbeddedTransactionInfoDTOTransaction } from './EmbeddedTransactionInfoDTOTransaction.js';
import {
  EmbeddedTransactionInfoDTOTransactionFromJSON,
  EmbeddedTransactionInfoDTOTransactionFromJSONTyped,
  EmbeddedTransactionInfoDTOTransactionToJSON,
  EmbeddedTransactionInfoDTOTransactionToJSONTyped,
} from './EmbeddedTransactionInfoDTOTransaction.js';
import type { EmbeddedTransactionMetaDTO } from './EmbeddedTransactionMetaDTO.js';
import {
  EmbeddedTransactionMetaDTOFromJSON,
  EmbeddedTransactionMetaDTOFromJSONTyped,
  EmbeddedTransactionMetaDTOToJSON,
  EmbeddedTransactionMetaDTOToJSONTyped,
} from './EmbeddedTransactionMetaDTO.js';

/**
 *
 * @export
 * @interface EmbeddedTransactionInfoDTO
 */
export interface EmbeddedTransactionInfoDTO {
  /**
   * Internal resource identifier.
   * @type {string}
   * @memberof EmbeddedTransactionInfoDTO
   */
  id: string;
  /**
   *
   * @type {EmbeddedTransactionMetaDTO}
   * @memberof EmbeddedTransactionInfoDTO
   */
  meta: EmbeddedTransactionMetaDTO;
  /**
   *
   * @type {EmbeddedTransactionInfoDTOTransaction}
   * @memberof EmbeddedTransactionInfoDTO
   */
  transaction: EmbeddedTransactionInfoDTOTransaction;
}

/**
 * Check if a given object implements the EmbeddedTransactionInfoDTO interface.
 */
export function instanceOfEmbeddedTransactionInfoDTO(value: object): value is EmbeddedTransactionInfoDTO {
  if (!('id' in value) || value['id'] === undefined) return false;
  if (!('meta' in value) || value['meta'] === undefined) return false;
  if (!('transaction' in value) || value['transaction'] === undefined) return false;
  return true;
}

export function EmbeddedTransactionInfoDTOFromJSON(json: any): EmbeddedTransactionInfoDTO {
  return EmbeddedTransactionInfoDTOFromJSONTyped(json, false);
}

export function EmbeddedTransactionInfoDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedTransactionInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    id: json['id'],
    meta: EmbeddedTransactionMetaDTOFromJSON(json['meta']),
    transaction: EmbeddedTransactionInfoDTOTransactionFromJSON(json['transaction']),
  };
}

export function EmbeddedTransactionInfoDTOToJSON(json: any): EmbeddedTransactionInfoDTO {
  return EmbeddedTransactionInfoDTOToJSONTyped(json, false);
}

export function EmbeddedTransactionInfoDTOToJSONTyped(
  value?: EmbeddedTransactionInfoDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    id: value['id'],
    meta: EmbeddedTransactionMetaDTOToJSON(value['meta']),
    transaction: EmbeddedTransactionInfoDTOTransactionToJSON(value['transaction']),
  };
}
