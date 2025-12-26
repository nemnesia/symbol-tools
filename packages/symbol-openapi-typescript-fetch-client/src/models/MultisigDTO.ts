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
 * @interface MultisigDTO
 */
export interface MultisigDTO {
  /**
   * The version of the state
   * @type {number}
   * @memberof MultisigDTO
   */
  version: number;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof MultisigDTO
   */
  accountAddress: string;
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof MultisigDTO
   */
  minApproval: number;
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof MultisigDTO
   */
  minRemoval: number;
  /**
   * Addresses of the cosignatory accounts.
   * @type {Array<string>}
   * @memberof MultisigDTO
   */
  cosignatoryAddresses: Array<string>;
  /**
   * Multisig accounts where the account is cosignatory.
   * @type {Array<string>}
   * @memberof MultisigDTO
   */
  multisigAddresses: Array<string>;
}

/**
 * Check if a given object implements the MultisigDTO interface.
 */
export function instanceOfMultisigDTO(value: object): value is MultisigDTO {
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('accountAddress' in value) || value['accountAddress'] === undefined) return false;
  if (!('minApproval' in value) || value['minApproval'] === undefined) return false;
  if (!('minRemoval' in value) || value['minRemoval'] === undefined) return false;
  if (!('cosignatoryAddresses' in value) || value['cosignatoryAddresses'] === undefined) return false;
  if (!('multisigAddresses' in value) || value['multisigAddresses'] === undefined) return false;
  return true;
}

export function MultisigDTOFromJSON(json: any): MultisigDTO {
  return MultisigDTOFromJSONTyped(json, false);
}

export function MultisigDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MultisigDTO {
  if (json == null) {
    return json;
  }
  return {
    version: json['version'],
    accountAddress: json['accountAddress'],
    minApproval: json['minApproval'],
    minRemoval: json['minRemoval'],
    cosignatoryAddresses: json['cosignatoryAddresses'],
    multisigAddresses: json['multisigAddresses'],
  };
}

export function MultisigDTOToJSON(json: any): MultisigDTO {
  return MultisigDTOToJSONTyped(json, false);
}

export function MultisigDTOToJSONTyped(value?: MultisigDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    version: value['version'],
    accountAddress: value['accountAddress'],
    minApproval: value['minApproval'],
    minRemoval: value['minRemoval'],
    cosignatoryAddresses: value['cosignatoryAddresses'],
    multisigAddresses: value['multisigAddresses'],
  };
}
