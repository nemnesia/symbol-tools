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
import type { LockHashAlgorithmEnum } from './LockHashAlgorithmEnum.js';
import {
  LockHashAlgorithmEnumFromJSON,
  LockHashAlgorithmEnumFromJSONTyped,
  LockHashAlgorithmEnumToJSON,
  LockHashAlgorithmEnumToJSONTyped,
} from './LockHashAlgorithmEnum.js';
import type { LockStatus } from './LockStatus.js';
import { LockStatusFromJSON, LockStatusFromJSONTyped, LockStatusToJSON, LockStatusToJSONTyped } from './LockStatus.js';

/**
 *
 * @export
 * @interface SecretLockEntryDTO
 */
export interface SecretLockEntryDTO {
  /**
   * The version of the state
   * @type {number}
   * @memberof SecretLockEntryDTO
   */
  version: number;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof SecretLockEntryDTO
   */
  ownerAddress: string;
  /**
   * Mosaic identifier.
   * @type {string}
   * @memberof SecretLockEntryDTO
   */
  mosaicId: string;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof SecretLockEntryDTO
   */
  amount: string;
  /**
   * Height of the blockchain.
   * @type {string}
   * @memberof SecretLockEntryDTO
   */
  endHeight: string;
  /**
   *
   * @type {LockStatus}
   * @memberof SecretLockEntryDTO
   */
  status: LockStatus;
  /**
   *
   * @type {LockHashAlgorithmEnum}
   * @memberof SecretLockEntryDTO
   */
  hashAlgorithm: LockHashAlgorithmEnum;
  /**
   * Secret.
   * @type {string}
   * @memberof SecretLockEntryDTO
   */
  secret: string;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof SecretLockEntryDTO
   */
  recipientAddress: string;
  /**
   *
   * @type {string}
   * @memberof SecretLockEntryDTO
   */
  compositeHash: string;
}

/**
 * Check if a given object implements the SecretLockEntryDTO interface.
 */
export function instanceOfSecretLockEntryDTO(value: object): value is SecretLockEntryDTO {
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('ownerAddress' in value) || value['ownerAddress'] === undefined) return false;
  if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
  if (!('amount' in value) || value['amount'] === undefined) return false;
  if (!('endHeight' in value) || value['endHeight'] === undefined) return false;
  if (!('status' in value) || value['status'] === undefined) return false;
  if (!('hashAlgorithm' in value) || value['hashAlgorithm'] === undefined) return false;
  if (!('secret' in value) || value['secret'] === undefined) return false;
  if (!('recipientAddress' in value) || value['recipientAddress'] === undefined) return false;
  if (!('compositeHash' in value) || value['compositeHash'] === undefined) return false;
  return true;
}

export function SecretLockEntryDTOFromJSON(json: any): SecretLockEntryDTO {
  return SecretLockEntryDTOFromJSONTyped(json, false);
}

export function SecretLockEntryDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SecretLockEntryDTO {
  if (json == null) {
    return json;
  }
  return {
    version: json['version'],
    ownerAddress: json['ownerAddress'],
    mosaicId: json['mosaicId'],
    amount: json['amount'],
    endHeight: json['endHeight'],
    status: LockStatusFromJSON(json['status']),
    hashAlgorithm: LockHashAlgorithmEnumFromJSON(json['hashAlgorithm']),
    secret: json['secret'],
    recipientAddress: json['recipientAddress'],
    compositeHash: json['compositeHash'],
  };
}

export function SecretLockEntryDTOToJSON(json: any): SecretLockEntryDTO {
  return SecretLockEntryDTOToJSONTyped(json, false);
}

export function SecretLockEntryDTOToJSONTyped(
  value?: SecretLockEntryDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    version: value['version'],
    ownerAddress: value['ownerAddress'],
    mosaicId: value['mosaicId'],
    amount: value['amount'],
    endHeight: value['endHeight'],
    status: LockStatusToJSON(value['status']),
    hashAlgorithm: LockHashAlgorithmEnumToJSON(value['hashAlgorithm']),
    secret: value['secret'],
    recipientAddress: value['recipientAddress'],
    compositeHash: value['compositeHash'],
  };
}
