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
 * @interface SecretLockNetworkPropertiesDTO
 */
export interface SecretLockNetworkPropertiesDTO {
  /**
   * Maximum number of blocks for which a secret lock can exist.
   * @type {string}
   * @memberof SecretLockNetworkPropertiesDTO
   */
  maxSecretLockDuration?: string;
  /**
   * Minimum size of a proof in bytes.
   * @type {string}
   * @memberof SecretLockNetworkPropertiesDTO
   */
  minProofSize?: string;
  /**
   * Maximum size of a proof in bytes.
   * @type {string}
   * @memberof SecretLockNetworkPropertiesDTO
   */
  maxProofSize?: string;
}

/**
 * Check if a given object implements the SecretLockNetworkPropertiesDTO interface.
 */
export function instanceOfSecretLockNetworkPropertiesDTO(value: object): value is SecretLockNetworkPropertiesDTO {
  return true;
}

export function SecretLockNetworkPropertiesDTOFromJSON(json: any): SecretLockNetworkPropertiesDTO {
  return SecretLockNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function SecretLockNetworkPropertiesDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): SecretLockNetworkPropertiesDTO {
  if (json == null) {
    return json;
  }
  return {
    maxSecretLockDuration: json['maxSecretLockDuration'] == null ? undefined : json['maxSecretLockDuration'],
    minProofSize: json['minProofSize'] == null ? undefined : json['minProofSize'],
    maxProofSize: json['maxProofSize'] == null ? undefined : json['maxProofSize'],
  };
}

export function SecretLockNetworkPropertiesDTOToJSON(json: any): SecretLockNetworkPropertiesDTO {
  return SecretLockNetworkPropertiesDTOToJSONTyped(json, false);
}

export function SecretLockNetworkPropertiesDTOToJSONTyped(
  value?: SecretLockNetworkPropertiesDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    maxSecretLockDuration: value['maxSecretLockDuration'],
    minProofSize: value['minProofSize'],
    maxProofSize: value['maxProofSize'],
  };
}
