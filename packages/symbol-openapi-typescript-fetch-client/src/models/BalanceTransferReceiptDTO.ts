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
 * Receipt stored when a state change that triggered a mosaic transfer.
 * @export
 * @interface BalanceTransferReceiptDTO
 */
export interface BalanceTransferReceiptDTO {
  /**
   * Version of the receipt.
   * @type {number}
   * @memberof BalanceTransferReceiptDTO
   */
  version: number;
  /**
   *
   * @type {ReceiptTypeEnum}
   * @memberof BalanceTransferReceiptDTO
   */
  type: ReceiptTypeEnum;
  /**
   * Mosaic identifier.
   * @type {string}
   * @memberof BalanceTransferReceiptDTO
   */
  mosaicId: string;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof BalanceTransferReceiptDTO
   */
  amount: string;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof BalanceTransferReceiptDTO
   */
  senderAddress: string;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof BalanceTransferReceiptDTO
   */
  recipientAddress: string;
}

/**
 * Check if a given object implements the BalanceTransferReceiptDTO interface.
 */
export function instanceOfBalanceTransferReceiptDTO(value: object): value is BalanceTransferReceiptDTO {
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
  if (!('amount' in value) || value['amount'] === undefined) return false;
  if (!('senderAddress' in value) || value['senderAddress'] === undefined) return false;
  if (!('recipientAddress' in value) || value['recipientAddress'] === undefined) return false;
  return true;
}

export function BalanceTransferReceiptDTOFromJSON(json: any): BalanceTransferReceiptDTO {
  return BalanceTransferReceiptDTOFromJSONTyped(json, false);
}

export function BalanceTransferReceiptDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): BalanceTransferReceiptDTO {
  if (json == null) {
    return json;
  }
  return {
    version: json['version'],
    type: ReceiptTypeEnumFromJSON(json['type']),
    mosaicId: json['mosaicId'],
    amount: json['amount'],
    senderAddress: json['senderAddress'],
    recipientAddress: json['recipientAddress'],
  };
}

export function BalanceTransferReceiptDTOToJSON(json: any): BalanceTransferReceiptDTO {
  return BalanceTransferReceiptDTOToJSONTyped(json, false);
}

export function BalanceTransferReceiptDTOToJSONTyped(
  value?: BalanceTransferReceiptDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    version: value['version'],
    type: ReceiptTypeEnumToJSON(value['type']),
    mosaicId: value['mosaicId'],
    amount: value['amount'],
    senderAddress: value['senderAddress'],
    recipientAddress: value['recipientAddress'],
  };
}
