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
 * Metadata related to the statment, including block information.
 * @export
 * @interface StatementMetaDTO
 */
export interface StatementMetaDTO {
  /**
   * Number of milliseconds elapsed since the creation of the nemesis block. This value can be converted to epoch time by adding the network's 'epochAdjustment'.
   * @type {string}
   * @memberof StatementMetaDTO
   */
  timestamp: string;
}

/**
 * Check if a given object implements the StatementMetaDTO interface.
 */
export function instanceOfStatementMetaDTO(value: object): value is StatementMetaDTO {
  if (!('timestamp' in value) || value['timestamp'] === undefined) return false;
  return true;
}

export function StatementMetaDTOFromJSON(json: any): StatementMetaDTO {
  return StatementMetaDTOFromJSONTyped(json, false);
}

export function StatementMetaDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): StatementMetaDTO {
  if (json == null) {
    return json;
  }
  return {
    timestamp: json['timestamp'],
  };
}

export function StatementMetaDTOToJSON(json: any): StatementMetaDTO {
  return StatementMetaDTOToJSONTyped(json, false);
}

export function StatementMetaDTOToJSONTyped(
  value?: StatementMetaDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    timestamp: value['timestamp'],
  };
}
