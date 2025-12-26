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
import type { AccountDTO } from './AccountDTO.js';
import { AccountDTOFromJSON, AccountDTOFromJSONTyped, AccountDTOToJSON, AccountDTOToJSONTyped } from './AccountDTO.js';

/**
 *
 * @export
 * @interface AccountInfoDTO
 */
export interface AccountInfoDTO {
  /**
   * Internal resource identifier.
   * @type {string}
   * @memberof AccountInfoDTO
   */
  id: string;
  /**
   *
   * @type {AccountDTO}
   * @memberof AccountInfoDTO
   */
  account: AccountDTO;
}

/**
 * Check if a given object implements the AccountInfoDTO interface.
 */
export function instanceOfAccountInfoDTO(value: object): value is AccountInfoDTO {
  if (!('id' in value) || value['id'] === undefined) return false;
  if (!('account' in value) || value['account'] === undefined) return false;
  return true;
}

export function AccountInfoDTOFromJSON(json: any): AccountInfoDTO {
  return AccountInfoDTOFromJSONTyped(json, false);
}

export function AccountInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    id: json['id'],
    account: AccountDTOFromJSON(json['account']),
  };
}

export function AccountInfoDTOToJSON(json: any): AccountInfoDTO {
  return AccountInfoDTOToJSONTyped(json, false);
}

export function AccountInfoDTOToJSONTyped(value?: AccountInfoDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    id: value['id'],
    account: AccountDTOToJSON(value['account']),
  };
}
