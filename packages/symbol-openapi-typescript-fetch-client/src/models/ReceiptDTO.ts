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
import type { ReceiptTypeEnum } from './ReceiptTypeEnum.js';
import {
  ReceiptTypeEnumFromJSON,
  ReceiptTypeEnumFromJSONTyped,
  ReceiptTypeEnumToJSON,
  ReceiptTypeEnumToJSONTyped,
} from './ReceiptTypeEnum.js';

/**
 *
 * @export
 * @interface ReceiptDTO
 */
export interface ReceiptDTO {
  /**
   * Version of the receipt.
   * @type {number}
   * @memberof ReceiptDTO
   */
  version: number;
  /**
   *
   * @type {ReceiptTypeEnum}
   * @memberof ReceiptDTO
   */
  type: ReceiptTypeEnum;
}

/**
 * Check if a given object implements the ReceiptDTO interface.
 */
export function instanceOfReceiptDTO(value: object): value is ReceiptDTO {
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  return true;
}

export function ReceiptDTOFromJSON(json: any): ReceiptDTO {
  return ReceiptDTOFromJSONTyped(json, false);
}

export function ReceiptDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReceiptDTO {
  if (json == null) {
    return json;
  }
  return {
    version: json['version'],
    type: ReceiptTypeEnumFromJSON(json['type']),
  };
}

export function ReceiptDTOToJSON(json: any): ReceiptDTO {
  return ReceiptDTOToJSONTyped(json, false);
}

export function ReceiptDTOToJSONTyped(value?: ReceiptDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    version: value['version'],
    type: ReceiptTypeEnumToJSON(value['type']),
  };
}
