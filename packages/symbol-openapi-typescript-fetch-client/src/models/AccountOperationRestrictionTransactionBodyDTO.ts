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
import type { TransactionTypeEnum } from './TransactionTypeEnum.js';
import {
  TransactionTypeEnumFromJSON,
  TransactionTypeEnumFromJSONTyped,
  TransactionTypeEnumToJSON,
  TransactionTypeEnumToJSONTyped,
} from './TransactionTypeEnum.js';

/**
 *
 * @export
 * @interface AccountOperationRestrictionTransactionBodyDTO
 */
export interface AccountOperationRestrictionTransactionBodyDTO {
  /**
   *
   * @type {AccountRestrictionFlagsEnum}
   * @memberof AccountOperationRestrictionTransactionBodyDTO
   */
  restrictionFlags: AccountRestrictionFlagsEnum;
  /**
   * Account restriction additions.
   * @type {Array<TransactionTypeEnum>}
   * @memberof AccountOperationRestrictionTransactionBodyDTO
   */
  restrictionAdditions?: Array<TransactionTypeEnum>;
  /**
   * Account restriction deletions.
   * @type {Array<TransactionTypeEnum>}
   * @memberof AccountOperationRestrictionTransactionBodyDTO
   */
  restrictionDeletions?: Array<TransactionTypeEnum>;
}

/**
 * Check if a given object implements the AccountOperationRestrictionTransactionBodyDTO interface.
 */
export function instanceOfAccountOperationRestrictionTransactionBodyDTO(
  value: object
): value is AccountOperationRestrictionTransactionBodyDTO {
  if (!('restrictionFlags' in value) || value['restrictionFlags'] === undefined) return false;
  return true;
}

export function AccountOperationRestrictionTransactionBodyDTOFromJSON(
  json: any
): AccountOperationRestrictionTransactionBodyDTO {
  return AccountOperationRestrictionTransactionBodyDTOFromJSONTyped(json, false);
}

export function AccountOperationRestrictionTransactionBodyDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AccountOperationRestrictionTransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    restrictionFlags: AccountRestrictionFlagsEnumFromJSON(json['restrictionFlags']),
    restrictionAdditions:
      json['restrictionAdditions'] == null
        ? undefined
        : (json['restrictionAdditions'] as Array<any>).map(TransactionTypeEnumFromJSON),
    restrictionDeletions:
      json['restrictionDeletions'] == null
        ? undefined
        : (json['restrictionDeletions'] as Array<any>).map(TransactionTypeEnumFromJSON),
  };
}

export function AccountOperationRestrictionTransactionBodyDTOToJSON(
  json: any
): AccountOperationRestrictionTransactionBodyDTO {
  return AccountOperationRestrictionTransactionBodyDTOToJSONTyped(json, false);
}

export function AccountOperationRestrictionTransactionBodyDTOToJSONTyped(
  value?: AccountOperationRestrictionTransactionBodyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    restrictionFlags: AccountRestrictionFlagsEnumToJSON(value['restrictionFlags']),
    restrictionAdditions:
      value['restrictionAdditions'] == null
        ? undefined
        : (value['restrictionAdditions'] as Array<any>).map(TransactionTypeEnumToJSON),
    restrictionDeletions:
      value['restrictionDeletions'] == null
        ? undefined
        : (value['restrictionDeletions'] as Array<any>).map(TransactionTypeEnumToJSON),
  };
}
