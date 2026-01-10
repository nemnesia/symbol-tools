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
 * @interface EmbeddedAccountOperationRestrictionTransactionDTO
 */
export interface EmbeddedAccountOperationRestrictionTransactionDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedAccountOperationRestrictionTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof EmbeddedAccountOperationRestrictionTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof EmbeddedAccountOperationRestrictionTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof EmbeddedAccountOperationRestrictionTransactionDTO
   */
  type: number;
  /**
   *
   * @type {AccountRestrictionFlagsEnum}
   * @memberof EmbeddedAccountOperationRestrictionTransactionDTO
   */
  restrictionFlags: AccountRestrictionFlagsEnum;
  /**
   * Account restriction additions.
   * @type {Array<TransactionTypeEnum>}
   * @memberof EmbeddedAccountOperationRestrictionTransactionDTO
   */
  restrictionAdditions?: Array<TransactionTypeEnum>;
  /**
   * Account restriction deletions.
   * @type {Array<TransactionTypeEnum>}
   * @memberof EmbeddedAccountOperationRestrictionTransactionDTO
   */
  restrictionDeletions?: Array<TransactionTypeEnum>;
}

/**
 * Check if a given object implements the EmbeddedAccountOperationRestrictionTransactionDTO interface.
 */
export function instanceOfEmbeddedAccountOperationRestrictionTransactionDTO(
  value: object
): value is EmbeddedAccountOperationRestrictionTransactionDTO {
  if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('network' in value) || value['network'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('restrictionFlags' in value) || value['restrictionFlags'] === undefined) return false;
  return true;
}

export function EmbeddedAccountOperationRestrictionTransactionDTOFromJSON(
  json: any
): EmbeddedAccountOperationRestrictionTransactionDTO {
  return EmbeddedAccountOperationRestrictionTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedAccountOperationRestrictionTransactionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedAccountOperationRestrictionTransactionDTO {
  if (json == null) {
    return json;
  }
  return {
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
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

export function EmbeddedAccountOperationRestrictionTransactionDTOToJSON(
  json: any
): EmbeddedAccountOperationRestrictionTransactionDTO {
  return EmbeddedAccountOperationRestrictionTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedAccountOperationRestrictionTransactionDTOToJSONTyped(
  value?: EmbeddedAccountOperationRestrictionTransactionDTO | null,
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
