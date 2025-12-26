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
import type { SecretLockEntryDTO } from './SecretLockEntryDTO.js';
import {
  SecretLockEntryDTOFromJSON,
  SecretLockEntryDTOFromJSONTyped,
  SecretLockEntryDTOToJSON,
  SecretLockEntryDTOToJSONTyped,
} from './SecretLockEntryDTO.js';

/**
 *
 * @export
 * @interface SecretLockInfoDTO
 */
export interface SecretLockInfoDTO {
  /**
   *
   * @type {string}
   * @memberof SecretLockInfoDTO
   */
  id: string;
  /**
   *
   * @type {SecretLockEntryDTO}
   * @memberof SecretLockInfoDTO
   */
  lock: SecretLockEntryDTO;
}

/**
 * Check if a given object implements the SecretLockInfoDTO interface.
 */
export function instanceOfSecretLockInfoDTO(value: object): value is SecretLockInfoDTO {
  if (!('id' in value) || value['id'] === undefined) return false;
  if (!('lock' in value) || value['lock'] === undefined) return false;
  return true;
}

export function SecretLockInfoDTOFromJSON(json: any): SecretLockInfoDTO {
  return SecretLockInfoDTOFromJSONTyped(json, false);
}

export function SecretLockInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SecretLockInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    id: json['id'],
    lock: SecretLockEntryDTOFromJSON(json['lock']),
  };
}

export function SecretLockInfoDTOToJSON(json: any): SecretLockInfoDTO {
  return SecretLockInfoDTOToJSONTyped(json, false);
}

export function SecretLockInfoDTOToJSONTyped(
  value?: SecretLockInfoDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    id: value['id'],
    lock: SecretLockEntryDTOToJSON(value['lock']),
  };
}
