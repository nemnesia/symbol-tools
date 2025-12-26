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
 * @interface AccountIds
 */
export interface AccountIds {
  /**
   * Array of public keys.
   * @type {Array<string>}
   * @memberof AccountIds
   */
  publicKeys?: Array<string>;
  /**
   * Array of addresses.
   * @type {Array<string>}
   * @memberof AccountIds
   */
  addresses?: Array<string>;
}

/**
 * Check if a given object implements the AccountIds interface.
 */
export function instanceOfAccountIds(value: object): value is AccountIds {
  return true;
}

export function AccountIdsFromJSON(json: any): AccountIds {
  return AccountIdsFromJSONTyped(json, false);
}

export function AccountIdsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountIds {
  if (json == null) {
    return json;
  }
  return {
    publicKeys: json['publicKeys'] == null ? undefined : json['publicKeys'],
    addresses: json['addresses'] == null ? undefined : json['addresses'],
  };
}

export function AccountIdsToJSON(json: any): AccountIds {
  return AccountIdsToJSONTyped(json, false);
}

export function AccountIdsToJSONTyped(value?: AccountIds | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    publicKeys: value['publicKeys'],
    addresses: value['addresses'],
  };
}
