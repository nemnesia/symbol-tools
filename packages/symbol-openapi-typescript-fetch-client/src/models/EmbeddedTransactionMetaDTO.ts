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
 * @interface EmbeddedTransactionMetaDTO
 */
export interface EmbeddedTransactionMetaDTO {
  /**
   * Height of the blockchain.
   * @type {string}
   * @memberof EmbeddedTransactionMetaDTO
   */
  height: string;
  /**
   *
   * @type {string}
   * @memberof EmbeddedTransactionMetaDTO
   */
  aggregateHash: string;
  /**
   * Identifier of the aggregate transaction.
   * @type {string}
   * @memberof EmbeddedTransactionMetaDTO
   */
  aggregateId: string;
  /**
   * Transaction index within the aggregate.
   * @type {number}
   * @memberof EmbeddedTransactionMetaDTO
   */
  index: number;
  /**
   * Number of milliseconds elapsed since the creation of the nemesis block. This value can be converted to epoch time by adding the network's 'epochAdjustment'.
   * @type {string}
   * @memberof EmbeddedTransactionMetaDTO
   */
  timestamp?: string;
  /**
   * Fee multiplier applied to transactions contained in block.
   * @type {number}
   * @memberof EmbeddedTransactionMetaDTO
   */
  feeMultiplier?: number;
}

/**
 * Check if a given object implements the EmbeddedTransactionMetaDTO interface.
 */
export function instanceOfEmbeddedTransactionMetaDTO(value: object): value is EmbeddedTransactionMetaDTO {
  if (!('height' in value) || value['height'] === undefined) return false;
  if (!('aggregateHash' in value) || value['aggregateHash'] === undefined) return false;
  if (!('aggregateId' in value) || value['aggregateId'] === undefined) return false;
  if (!('index' in value) || value['index'] === undefined) return false;
  return true;
}

export function EmbeddedTransactionMetaDTOFromJSON(json: any): EmbeddedTransactionMetaDTO {
  return EmbeddedTransactionMetaDTOFromJSONTyped(json, false);
}

export function EmbeddedTransactionMetaDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedTransactionMetaDTO {
  if (json == null) {
    return json;
  }
  return {
    height: json['height'],
    aggregateHash: json['aggregateHash'],
    aggregateId: json['aggregateId'],
    index: json['index'],
    timestamp: json['timestamp'] == null ? undefined : json['timestamp'],
    feeMultiplier: json['feeMultiplier'] == null ? undefined : json['feeMultiplier'],
  };
}

export function EmbeddedTransactionMetaDTOToJSON(json: any): EmbeddedTransactionMetaDTO {
  return EmbeddedTransactionMetaDTOToJSONTyped(json, false);
}

export function EmbeddedTransactionMetaDTOToJSONTyped(
  value?: EmbeddedTransactionMetaDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    height: value['height'],
    aggregateHash: value['aggregateHash'],
    aggregateId: value['aggregateId'],
    index: value['index'],
    timestamp: value['timestamp'],
    feeMultiplier: value['feeMultiplier'],
  };
}
