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
 * @interface Addresses
 */
export interface Addresses {
  /**
   * Array of addresses.
   * @type {Array<string>}
   * @memberof Addresses
   */
  addresses?: Array<string>;
}

/**
 * Check if a given object implements the Addresses interface.
 */
export function instanceOfAddresses(value: object): value is Addresses {
  return true;
}

export function AddressesFromJSON(json: any): Addresses {
  return AddressesFromJSONTyped(json, false);
}

export function AddressesFromJSONTyped(json: any, ignoreDiscriminator: boolean): Addresses {
  if (json == null) {
    return json;
  }
  return {
    addresses: json['addresses'] == null ? undefined : json['addresses'],
  };
}

export function AddressesToJSON(json: any): Addresses {
  return AddressesToJSONTyped(json, false);
}

export function AddressesToJSONTyped(value?: Addresses | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    addresses: value['addresses'],
  };
}
