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
 * @interface EmbeddedMultisigAccountModificationTransactionDTO
 */
export interface EmbeddedMultisigAccountModificationTransactionDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedMultisigAccountModificationTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof EmbeddedMultisigAccountModificationTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof EmbeddedMultisigAccountModificationTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof EmbeddedMultisigAccountModificationTransactionDTO
   */
  type: number;
  /**
   * Number of signatures needed to remove a cosignatory.
   * If we are modifying an existing multisig account, this indicates the relative change of the minimum cosignatories.
   *
   * @type {number}
   * @memberof EmbeddedMultisigAccountModificationTransactionDTO
   */
  minRemovalDelta: number;
  /**
   * Number of signatures needed to approve a transaction.
   * If we are modifying an existing multisig account, this indicates the relative change of the minimum cosignatories.
   *
   * @type {number}
   * @memberof EmbeddedMultisigAccountModificationTransactionDTO
   */
  minApprovalDelta: number;
  /**
   * Array of cosignatory accounts to add.
   * @type {Array<string>}
   * @memberof EmbeddedMultisigAccountModificationTransactionDTO
   */
  addressAdditions: Array<string>;
  /**
   * Array of cosignatory accounts to delete.
   * @type {Array<string>}
   * @memberof EmbeddedMultisigAccountModificationTransactionDTO
   */
  addressDeletions: Array<string>;
}

/**
 * Check if a given object implements the EmbeddedMultisigAccountModificationTransactionDTO interface.
 */
export function instanceOfEmbeddedMultisigAccountModificationTransactionDTO(
  value: object
): value is EmbeddedMultisigAccountModificationTransactionDTO {
  if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('network' in value) || value['network'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('minRemovalDelta' in value) || value['minRemovalDelta'] === undefined) return false;
  if (!('minApprovalDelta' in value) || value['minApprovalDelta'] === undefined) return false;
  if (!('addressAdditions' in value) || value['addressAdditions'] === undefined) return false;
  if (!('addressDeletions' in value) || value['addressDeletions'] === undefined) return false;
  return true;
}

export function EmbeddedMultisigAccountModificationTransactionDTOFromJSON(
  json: any
): EmbeddedMultisigAccountModificationTransactionDTO {
  return EmbeddedMultisigAccountModificationTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedMultisigAccountModificationTransactionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedMultisigAccountModificationTransactionDTO {
  if (json == null) {
    return json;
  }
  return {
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
    minRemovalDelta: json['minRemovalDelta'],
    minApprovalDelta: json['minApprovalDelta'],
    addressAdditions: json['addressAdditions'],
    addressDeletions: json['addressDeletions'],
  };
}

export function EmbeddedMultisigAccountModificationTransactionDTOToJSON(
  json: any
): EmbeddedMultisigAccountModificationTransactionDTO {
  return EmbeddedMultisigAccountModificationTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedMultisigAccountModificationTransactionDTOToJSONTyped(
  value?: EmbeddedMultisigAccountModificationTransactionDTO | null,
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
    minRemovalDelta: value['minRemovalDelta'],
    minApprovalDelta: value['minApprovalDelta'],
    addressAdditions: value['addressAdditions'],
    addressDeletions: value['addressDeletions'],
  };
}
