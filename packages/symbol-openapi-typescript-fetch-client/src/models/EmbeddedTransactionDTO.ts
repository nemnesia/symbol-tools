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
import type { NetworkTypeEnum } from './NetworkTypeEnum.js';
import {
  NetworkTypeEnumFromJSON,
  NetworkTypeEnumFromJSONTyped,
  NetworkTypeEnumToJSON,
  NetworkTypeEnumToJSONTyped,
} from './NetworkTypeEnum.js';

/**
 *
 * @export
 * @interface EmbeddedTransactionDTO
 */
export interface EmbeddedTransactionDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof EmbeddedTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof EmbeddedTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof EmbeddedTransactionDTO
   */
  type: number;
}

/**
 * Check if a given object implements the EmbeddedTransactionDTO interface.
 */
export function instanceOfEmbeddedTransactionDTO(value: object): value is EmbeddedTransactionDTO {
  if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('network' in value) || value['network'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  return true;
}

export function EmbeddedTransactionDTOFromJSON(json: any): EmbeddedTransactionDTO {
  return EmbeddedTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedTransactionDTO {
  if (json == null) {
    return json;
  }
  return {
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
  };
}

export function EmbeddedTransactionDTOToJSON(json: any): EmbeddedTransactionDTO {
  return EmbeddedTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedTransactionDTOToJSONTyped(
  value?: EmbeddedTransactionDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    signerPublicKey: value['signerPublicKey'],
    version: value['version'],
    network: NetworkTypeEnumToJSON(value['network']),
    type: value['type'],
  };
}
