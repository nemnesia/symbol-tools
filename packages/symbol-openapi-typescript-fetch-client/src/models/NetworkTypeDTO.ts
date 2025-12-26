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
 * @interface NetworkTypeDTO
 */
export interface NetworkTypeDTO {
  /**
   * Network name.
   * @type {string}
   * @memberof NetworkTypeDTO
   */
  name: string;
  /**
   * A short text describing the network.
   * @type {string}
   * @memberof NetworkTypeDTO
   */
  description: string;
}

/**
 * Check if a given object implements the NetworkTypeDTO interface.
 */
export function instanceOfNetworkTypeDTO(value: object): value is NetworkTypeDTO {
  if (!('name' in value) || value['name'] === undefined) return false;
  if (!('description' in value) || value['description'] === undefined) return false;
  return true;
}

export function NetworkTypeDTOFromJSON(json: any): NetworkTypeDTO {
  return NetworkTypeDTOFromJSONTyped(json, false);
}

export function NetworkTypeDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NetworkTypeDTO {
  if (json == null) {
    return json;
  }
  return {
    name: json['name'],
    description: json['description'],
  };
}

export function NetworkTypeDTOToJSON(json: any): NetworkTypeDTO {
  return NetworkTypeDTOToJSONTyped(json, false);
}

export function NetworkTypeDTOToJSONTyped(value?: NetworkTypeDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    name: value['name'],
    description: value['description'],
  };
}
