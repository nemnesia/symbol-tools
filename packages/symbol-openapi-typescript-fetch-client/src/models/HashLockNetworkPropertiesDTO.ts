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
 * @interface HashLockNetworkPropertiesDTO
 */
export interface HashLockNetworkPropertiesDTO {
  /**
   * Amount that has to be locked per aggregate in partial cache.
   * @type {string}
   * @memberof HashLockNetworkPropertiesDTO
   */
  lockedFundsPerAggregate?: string;
  /**
   * Maximum number of blocks for which a hash lock can exist.
   * @type {string}
   * @memberof HashLockNetworkPropertiesDTO
   */
  maxHashLockDuration?: string;
}

/**
 * Check if a given object implements the HashLockNetworkPropertiesDTO interface.
 */
export function instanceOfHashLockNetworkPropertiesDTO(value: object): value is HashLockNetworkPropertiesDTO {
  return true;
}

export function HashLockNetworkPropertiesDTOFromJSON(json: any): HashLockNetworkPropertiesDTO {
  return HashLockNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function HashLockNetworkPropertiesDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): HashLockNetworkPropertiesDTO {
  if (json == null) {
    return json;
  }
  return {
    lockedFundsPerAggregate: json['lockedFundsPerAggregate'] == null ? undefined : json['lockedFundsPerAggregate'],
    maxHashLockDuration: json['maxHashLockDuration'] == null ? undefined : json['maxHashLockDuration'],
  };
}

export function HashLockNetworkPropertiesDTOToJSON(json: any): HashLockNetworkPropertiesDTO {
  return HashLockNetworkPropertiesDTOToJSONTyped(json, false);
}

export function HashLockNetworkPropertiesDTOToJSONTyped(
  value?: HashLockNetworkPropertiesDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    lockedFundsPerAggregate: value['lockedFundsPerAggregate'],
    maxHashLockDuration: value['maxHashLockDuration'],
  };
}
