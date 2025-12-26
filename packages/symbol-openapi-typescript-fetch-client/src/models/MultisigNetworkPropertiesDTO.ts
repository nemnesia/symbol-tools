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
 * @interface MultisigNetworkPropertiesDTO
 */
export interface MultisigNetworkPropertiesDTO {
  /**
   * Maximum number of multisig levels.
   * @type {string}
   * @memberof MultisigNetworkPropertiesDTO
   */
  maxMultisigDepth?: string;
  /**
   * Maximum number of cosignatories per account.
   * @type {string}
   * @memberof MultisigNetworkPropertiesDTO
   */
  maxCosignatoriesPerAccount?: string;
  /**
   * Maximum number of accounts a single account can cosign.
   * @type {string}
   * @memberof MultisigNetworkPropertiesDTO
   */
  maxCosignedAccountsPerAccount?: string;
}

/**
 * Check if a given object implements the MultisigNetworkPropertiesDTO interface.
 */
export function instanceOfMultisigNetworkPropertiesDTO(value: object): value is MultisigNetworkPropertiesDTO {
  return true;
}

export function MultisigNetworkPropertiesDTOFromJSON(json: any): MultisigNetworkPropertiesDTO {
  return MultisigNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function MultisigNetworkPropertiesDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MultisigNetworkPropertiesDTO {
  if (json == null) {
    return json;
  }
  return {
    maxMultisigDepth: json['maxMultisigDepth'] == null ? undefined : json['maxMultisigDepth'],
    maxCosignatoriesPerAccount:
      json['maxCosignatoriesPerAccount'] == null ? undefined : json['maxCosignatoriesPerAccount'],
    maxCosignedAccountsPerAccount:
      json['maxCosignedAccountsPerAccount'] == null ? undefined : json['maxCosignedAccountsPerAccount'],
  };
}

export function MultisigNetworkPropertiesDTOToJSON(json: any): MultisigNetworkPropertiesDTO {
  return MultisigNetworkPropertiesDTOToJSONTyped(json, false);
}

export function MultisigNetworkPropertiesDTOToJSONTyped(
  value?: MultisigNetworkPropertiesDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    maxMultisigDepth: value['maxMultisigDepth'],
    maxCosignatoriesPerAccount: value['maxCosignatoriesPerAccount'],
    maxCosignedAccountsPerAccount: value['maxCosignedAccountsPerAccount'],
  };
}
