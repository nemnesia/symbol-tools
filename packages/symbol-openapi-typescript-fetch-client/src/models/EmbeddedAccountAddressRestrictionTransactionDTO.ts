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
import type { AccountRestrictionFlagsEnum } from './AccountRestrictionFlagsEnum.js';
import {
  AccountRestrictionFlagsEnumFromJSON,
  AccountRestrictionFlagsEnumFromJSONTyped,
  AccountRestrictionFlagsEnumToJSON,
  AccountRestrictionFlagsEnumToJSONTyped,
} from './AccountRestrictionFlagsEnum.js';
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
 * @interface EmbeddedAccountAddressRestrictionTransactionDTO
 */
export interface EmbeddedAccountAddressRestrictionTransactionDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedAccountAddressRestrictionTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof EmbeddedAccountAddressRestrictionTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof EmbeddedAccountAddressRestrictionTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof EmbeddedAccountAddressRestrictionTransactionDTO
   */
  type: number;
  /**
   *
   * @type {AccountRestrictionFlagsEnum}
   * @memberof EmbeddedAccountAddressRestrictionTransactionDTO
   */
  restrictionFlags: AccountRestrictionFlagsEnum;
  /**
   * Account restriction additions.
   * @type {Array<string>}
   * @memberof EmbeddedAccountAddressRestrictionTransactionDTO
   */
  restrictionAdditions?: Array<string>;
  /**
   * Account restriction deletions.
   * @type {Array<string>}
   * @memberof EmbeddedAccountAddressRestrictionTransactionDTO
   */
  restrictionDeletions?: Array<string>;
}

/**
 * Check if a given object implements the EmbeddedAccountAddressRestrictionTransactionDTO interface.
 */
export function instanceOfEmbeddedAccountAddressRestrictionTransactionDTO(
  value: object
): value is EmbeddedAccountAddressRestrictionTransactionDTO {
  if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('network' in value) || value['network'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('restrictionFlags' in value) || value['restrictionFlags'] === undefined) return false;
  return true;
}

export function EmbeddedAccountAddressRestrictionTransactionDTOFromJSON(
  json: any
): EmbeddedAccountAddressRestrictionTransactionDTO {
  return EmbeddedAccountAddressRestrictionTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedAccountAddressRestrictionTransactionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedAccountAddressRestrictionTransactionDTO {
  if (json == null) {
    return json;
  }
  return {
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
    restrictionFlags: AccountRestrictionFlagsEnumFromJSON(json['restrictionFlags']),
    restrictionAdditions: json['restrictionAdditions'] == null ? undefined : json['restrictionAdditions'],
    restrictionDeletions: json['restrictionDeletions'] == null ? undefined : json['restrictionDeletions'],
  };
}

export function EmbeddedAccountAddressRestrictionTransactionDTOToJSON(
  json: any
): EmbeddedAccountAddressRestrictionTransactionDTO {
  return EmbeddedAccountAddressRestrictionTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedAccountAddressRestrictionTransactionDTOToJSONTyped(
  value?: EmbeddedAccountAddressRestrictionTransactionDTO | null,
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
    restrictionFlags: AccountRestrictionFlagsEnumToJSON(value['restrictionFlags']),
    restrictionAdditions: value['restrictionAdditions'],
    restrictionDeletions: value['restrictionDeletions'],
  };
}
