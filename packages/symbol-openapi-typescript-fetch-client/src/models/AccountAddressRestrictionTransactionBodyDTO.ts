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

/**
 *
 * @export
 * @interface AccountAddressRestrictionTransactionBodyDTO
 */
export interface AccountAddressRestrictionTransactionBodyDTO {
  /**
   *
   * @type {AccountRestrictionFlagsEnum}
   * @memberof AccountAddressRestrictionTransactionBodyDTO
   */
  restrictionFlags: AccountRestrictionFlagsEnum;
  /**
   * Account restriction additions.
   * @type {Array<string>}
   * @memberof AccountAddressRestrictionTransactionBodyDTO
   */
  restrictionAdditions?: Array<string>;
  /**
   * Account restriction deletions.
   * @type {Array<string>}
   * @memberof AccountAddressRestrictionTransactionBodyDTO
   */
  restrictionDeletions?: Array<string>;
}

/**
 * Check if a given object implements the AccountAddressRestrictionTransactionBodyDTO interface.
 */
export function instanceOfAccountAddressRestrictionTransactionBodyDTO(
  value: object
): value is AccountAddressRestrictionTransactionBodyDTO {
  if (!('restrictionFlags' in value) || value['restrictionFlags'] === undefined) return false;
  return true;
}

export function AccountAddressRestrictionTransactionBodyDTOFromJSON(
  json: any
): AccountAddressRestrictionTransactionBodyDTO {
  return AccountAddressRestrictionTransactionBodyDTOFromJSONTyped(json, false);
}

export function AccountAddressRestrictionTransactionBodyDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AccountAddressRestrictionTransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    restrictionFlags: AccountRestrictionFlagsEnumFromJSON(json['restrictionFlags']),
    restrictionAdditions: json['restrictionAdditions'] == null ? undefined : json['restrictionAdditions'],
    restrictionDeletions: json['restrictionDeletions'] == null ? undefined : json['restrictionDeletions'],
  };
}

export function AccountAddressRestrictionTransactionBodyDTOToJSON(
  json: any
): AccountAddressRestrictionTransactionBodyDTO {
  return AccountAddressRestrictionTransactionBodyDTOToJSONTyped(json, false);
}

export function AccountAddressRestrictionTransactionBodyDTOToJSONTyped(
  value?: AccountAddressRestrictionTransactionBodyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    restrictionFlags: AccountRestrictionFlagsEnumToJSON(value['restrictionFlags']),
    restrictionAdditions: value['restrictionAdditions'],
    restrictionDeletions: value['restrictionDeletions'],
  };
}
