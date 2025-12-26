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

/**
 *
 * @export
 * @interface MultisigAccountModificationTransactionBodyDTO
 */
export interface MultisigAccountModificationTransactionBodyDTO {
  /**
   * Number of signatures needed to remove a cosignatory.
   * If we are modifying an existing multisig account, this indicates the relative change of the minimum cosignatories.
   *
   * @type {number}
   * @memberof MultisigAccountModificationTransactionBodyDTO
   */
  minRemovalDelta: number;
  /**
   * Number of signatures needed to approve a transaction.
   * If we are modifying an existing multisig account, this indicates the relative change of the minimum cosignatories.
   *
   * @type {number}
   * @memberof MultisigAccountModificationTransactionBodyDTO
   */
  minApprovalDelta: number;
  /**
   * Array of cosignatory accounts to add.
   * @type {Array<string>}
   * @memberof MultisigAccountModificationTransactionBodyDTO
   */
  addressAdditions: Array<string>;
  /**
   * Array of cosignatory accounts to delete.
   * @type {Array<string>}
   * @memberof MultisigAccountModificationTransactionBodyDTO
   */
  addressDeletions: Array<string>;
}

/**
 * Check if a given object implements the MultisigAccountModificationTransactionBodyDTO interface.
 */
export function instanceOfMultisigAccountModificationTransactionBodyDTO(
  value: object
): value is MultisigAccountModificationTransactionBodyDTO {
  if (!('minRemovalDelta' in value) || value['minRemovalDelta'] === undefined) return false;
  if (!('minApprovalDelta' in value) || value['minApprovalDelta'] === undefined) return false;
  if (!('addressAdditions' in value) || value['addressAdditions'] === undefined) return false;
  if (!('addressDeletions' in value) || value['addressDeletions'] === undefined) return false;
  return true;
}

export function MultisigAccountModificationTransactionBodyDTOFromJSON(
  json: any
): MultisigAccountModificationTransactionBodyDTO {
  return MultisigAccountModificationTransactionBodyDTOFromJSONTyped(json, false);
}

export function MultisigAccountModificationTransactionBodyDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MultisigAccountModificationTransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    minRemovalDelta: json['minRemovalDelta'],
    minApprovalDelta: json['minApprovalDelta'],
    addressAdditions: json['addressAdditions'],
    addressDeletions: json['addressDeletions'],
  };
}

export function MultisigAccountModificationTransactionBodyDTOToJSON(
  json: any
): MultisigAccountModificationTransactionBodyDTO {
  return MultisigAccountModificationTransactionBodyDTOToJSONTyped(json, false);
}

export function MultisigAccountModificationTransactionBodyDTOToJSONTyped(
  value?: MultisigAccountModificationTransactionBodyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    minRemovalDelta: value['minRemovalDelta'],
    minApprovalDelta: value['minApprovalDelta'],
    addressAdditions: value['addressAdditions'],
    addressDeletions: value['addressDeletions'],
  };
}
