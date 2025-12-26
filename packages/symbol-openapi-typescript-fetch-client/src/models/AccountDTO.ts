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
import type { AccountTypeEnum } from './AccountTypeEnum.js';
import {
  AccountTypeEnumFromJSON,
  AccountTypeEnumFromJSONTyped,
  AccountTypeEnumToJSON,
  AccountTypeEnumToJSONTyped,
} from './AccountTypeEnum.js';
import type { ActivityBucketDTO } from './ActivityBucketDTO.js';
import {
  ActivityBucketDTOFromJSON,
  ActivityBucketDTOFromJSONTyped,
  ActivityBucketDTOToJSON,
  ActivityBucketDTOToJSONTyped,
} from './ActivityBucketDTO.js';
import type { Mosaic } from './Mosaic.js';
import { MosaicFromJSON, MosaicFromJSONTyped, MosaicToJSON, MosaicToJSONTyped } from './Mosaic.js';
import type { SupplementalPublicKeysDTO } from './SupplementalPublicKeysDTO.js';
import {
  SupplementalPublicKeysDTOFromJSON,
  SupplementalPublicKeysDTOFromJSONTyped,
  SupplementalPublicKeysDTOToJSON,
  SupplementalPublicKeysDTOToJSONTyped,
} from './SupplementalPublicKeysDTO.js';

/**
 *
 * @export
 * @interface AccountDTO
 */
export interface AccountDTO {
  /**
   * The version of the state
   * @type {number}
   * @memberof AccountDTO
   */
  version: number;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof AccountDTO
   */
  address: string;
  /**
   * Height of the blockchain.
   * @type {string}
   * @memberof AccountDTO
   */
  addressHeight: string;
  /**
   * Public key.
   * @type {string}
   * @memberof AccountDTO
   */
  publicKey: string;
  /**
   * Height of the blockchain.
   * @type {string}
   * @memberof AccountDTO
   */
  publicKeyHeight: string;
  /**
   *
   * @type {AccountTypeEnum}
   * @memberof AccountDTO
   */
  accountType: AccountTypeEnum;
  /**
   *
   * @type {SupplementalPublicKeysDTO}
   * @memberof AccountDTO
   */
  supplementalPublicKeys: SupplementalPublicKeysDTO;
  /**
   *
   * @type {Array<ActivityBucketDTO>}
   * @memberof AccountDTO
   */
  activityBuckets: Array<ActivityBucketDTO>;
  /**
   * Mosaic units owned.
   * @type {Array<Mosaic>}
   * @memberof AccountDTO
   */
  mosaics: Array<Mosaic>;
  /**
   * Probability of an account to harvest the next block.
   * @type {string}
   * @memberof AccountDTO
   */
  importance: string;
  /**
   * Height of the blockchain.
   * @type {string}
   * @memberof AccountDTO
   */
  importanceHeight: string;
}

/**
 * Check if a given object implements the AccountDTO interface.
 */
export function instanceOfAccountDTO(value: object): value is AccountDTO {
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('address' in value) || value['address'] === undefined) return false;
  if (!('addressHeight' in value) || value['addressHeight'] === undefined) return false;
  if (!('publicKey' in value) || value['publicKey'] === undefined) return false;
  if (!('publicKeyHeight' in value) || value['publicKeyHeight'] === undefined) return false;
  if (!('accountType' in value) || value['accountType'] === undefined) return false;
  if (!('supplementalPublicKeys' in value) || value['supplementalPublicKeys'] === undefined) return false;
  if (!('activityBuckets' in value) || value['activityBuckets'] === undefined) return false;
  if (!('mosaics' in value) || value['mosaics'] === undefined) return false;
  if (!('importance' in value) || value['importance'] === undefined) return false;
  if (!('importanceHeight' in value) || value['importanceHeight'] === undefined) return false;
  return true;
}

export function AccountDTOFromJSON(json: any): AccountDTO {
  return AccountDTOFromJSONTyped(json, false);
}

export function AccountDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountDTO {
  if (json == null) {
    return json;
  }
  return {
    version: json['version'],
    address: json['address'],
    addressHeight: json['addressHeight'],
    publicKey: json['publicKey'],
    publicKeyHeight: json['publicKeyHeight'],
    accountType: AccountTypeEnumFromJSON(json['accountType']),
    supplementalPublicKeys: SupplementalPublicKeysDTOFromJSON(json['supplementalPublicKeys']),
    activityBuckets: (json['activityBuckets'] as Array<any>).map(ActivityBucketDTOFromJSON),
    mosaics: (json['mosaics'] as Array<any>).map(MosaicFromJSON),
    importance: json['importance'],
    importanceHeight: json['importanceHeight'],
  };
}

export function AccountDTOToJSON(json: any): AccountDTO {
  return AccountDTOToJSONTyped(json, false);
}

export function AccountDTOToJSONTyped(value?: AccountDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    version: value['version'],
    address: value['address'],
    addressHeight: value['addressHeight'],
    publicKey: value['publicKey'],
    publicKeyHeight: value['publicKeyHeight'],
    accountType: AccountTypeEnumToJSON(value['accountType']),
    supplementalPublicKeys: SupplementalPublicKeysDTOToJSON(value['supplementalPublicKeys']),
    activityBuckets: (value['activityBuckets'] as Array<any>).map(ActivityBucketDTOToJSON),
    mosaics: (value['mosaics'] as Array<any>).map(MosaicToJSON),
    importance: value['importance'],
    importanceHeight: value['importanceHeight'],
  };
}
