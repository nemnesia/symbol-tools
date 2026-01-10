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
import type { UnresolvedMosaic } from './UnresolvedMosaic.js';
import {
  UnresolvedMosaicFromJSON,
  UnresolvedMosaicFromJSONTyped,
  UnresolvedMosaicToJSON,
  UnresolvedMosaicToJSONTyped,
} from './UnresolvedMosaic.js';

/**
 *
 * @export
 * @interface TransferTransactionBodyDTO
 */
export interface TransferTransactionBodyDTO {
  /**
   * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
   * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA.
   * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
   *
   * @type {string}
   * @memberof TransferTransactionBodyDTO
   */
  recipientAddress: string;
  /**
   * Array of mosaics sent to the recipient.
   *
   * @type {Array<UnresolvedMosaic>}
   * @memberof TransferTransactionBodyDTO
   */
  mosaics?: Array<UnresolvedMosaic>;
  /**
   * Transfer transaction message
   * @type {string}
   * @memberof TransferTransactionBodyDTO
   */
  message?: string;
}

/**
 * Check if a given object implements the TransferTransactionBodyDTO interface.
 */
export function instanceOfTransferTransactionBodyDTO(value: object): value is TransferTransactionBodyDTO {
  if (!('recipientAddress' in value) || value['recipientAddress'] === undefined) return false;
  return true;
}

export function TransferTransactionBodyDTOFromJSON(json: any): TransferTransactionBodyDTO {
  return TransferTransactionBodyDTOFromJSONTyped(json, false);
}

export function TransferTransactionBodyDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): TransferTransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    recipientAddress: json['recipientAddress'],
    mosaics: json['mosaics'] == null ? undefined : (json['mosaics'] as Array<any>).map(UnresolvedMosaicFromJSON),
    message: json['message'] == null ? undefined : json['message'],
  };
}

export function TransferTransactionBodyDTOToJSON(json: any): TransferTransactionBodyDTO {
  return TransferTransactionBodyDTOToJSONTyped(json, false);
}

export function TransferTransactionBodyDTOToJSONTyped(
  value?: TransferTransactionBodyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    recipientAddress: value['recipientAddress'],
    mosaics: value['mosaics'] == null ? undefined : (value['mosaics'] as Array<any>).map(UnresolvedMosaicToJSON),
    message: value['message'],
  };
}
