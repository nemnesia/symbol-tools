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
 * @interface UnlockedAccountDTO
 */
export interface UnlockedAccountDTO {
  /**
   *
   * @type {Array<string>}
   * @memberof UnlockedAccountDTO
   */
  unlockedAccount: Array<string>;
}

/**
 * Check if a given object implements the UnlockedAccountDTO interface.
 */
export function instanceOfUnlockedAccountDTO(value: object): value is UnlockedAccountDTO {
  if (!('unlockedAccount' in value) || value['unlockedAccount'] === undefined) return false;
  return true;
}

export function UnlockedAccountDTOFromJSON(json: any): UnlockedAccountDTO {
  return UnlockedAccountDTOFromJSONTyped(json, false);
}

export function UnlockedAccountDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): UnlockedAccountDTO {
  if (json == null) {
    return json;
  }
  return {
    unlockedAccount: json['unlockedAccount'],
  };
}

export function UnlockedAccountDTOToJSON(json: any): UnlockedAccountDTO {
  return UnlockedAccountDTOToJSONTyped(json, false);
}

export function UnlockedAccountDTOToJSONTyped(
  value?: UnlockedAccountDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    unlockedAccount: value['unlockedAccount'],
  };
}
