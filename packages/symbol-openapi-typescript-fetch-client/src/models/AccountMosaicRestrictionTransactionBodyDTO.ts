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
 * @interface AccountMosaicRestrictionTransactionBodyDTO
 */
export interface AccountMosaicRestrictionTransactionBodyDTO {
  /**
   *
   * @type {AccountRestrictionFlagsEnum}
   * @memberof AccountMosaicRestrictionTransactionBodyDTO
   */
  restrictionFlags: AccountRestrictionFlagsEnum;
  /**
   * Account restriction additions.
   * @type {Array<string>}
   * @memberof AccountMosaicRestrictionTransactionBodyDTO
   */
  restrictionAdditions: Array<string>;
  /**
   * Account restriction deletions.
   * @type {Array<string>}
   * @memberof AccountMosaicRestrictionTransactionBodyDTO
   */
  restrictionDeletions: Array<string>;
}

/**
 * Check if a given object implements the AccountMosaicRestrictionTransactionBodyDTO interface.
 */
export function instanceOfAccountMosaicRestrictionTransactionBodyDTO(
  value: object
): value is AccountMosaicRestrictionTransactionBodyDTO {
  if (!('restrictionFlags' in value) || value['restrictionFlags'] === undefined) return false;
  if (!('restrictionAdditions' in value) || value['restrictionAdditions'] === undefined) return false;
  if (!('restrictionDeletions' in value) || value['restrictionDeletions'] === undefined) return false;
  return true;
}

export function AccountMosaicRestrictionTransactionBodyDTOFromJSON(
  json: any
): AccountMosaicRestrictionTransactionBodyDTO {
  return AccountMosaicRestrictionTransactionBodyDTOFromJSONTyped(json, false);
}

export function AccountMosaicRestrictionTransactionBodyDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AccountMosaicRestrictionTransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    restrictionFlags: AccountRestrictionFlagsEnumFromJSON(json['restrictionFlags']),
    restrictionAdditions: json['restrictionAdditions'],
    restrictionDeletions: json['restrictionDeletions'],
  };
}

export function AccountMosaicRestrictionTransactionBodyDTOToJSON(
  json: any
): AccountMosaicRestrictionTransactionBodyDTO {
  return AccountMosaicRestrictionTransactionBodyDTOToJSONTyped(json, false);
}

export function AccountMosaicRestrictionTransactionBodyDTOToJSONTyped(
  value?: AccountMosaicRestrictionTransactionBodyDTO | null,
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
