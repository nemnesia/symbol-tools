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
 * Transaction that triggered the receipt.
 * @export
 * @interface SourceDTO
 */
export interface SourceDTO {
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof SourceDTO
   */
  primaryId: number;
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof SourceDTO
   */
  secondaryId: number;
}

/**
 * Check if a given object implements the SourceDTO interface.
 */
export function instanceOfSourceDTO(value: object): value is SourceDTO {
  if (!('primaryId' in value) || value['primaryId'] === undefined) return false;
  if (!('secondaryId' in value) || value['secondaryId'] === undefined) return false;
  return true;
}

export function SourceDTOFromJSON(json: any): SourceDTO {
  return SourceDTOFromJSONTyped(json, false);
}

export function SourceDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SourceDTO {
  if (json == null) {
    return json;
  }
  return {
    primaryId: json['primaryId'],
    secondaryId: json['secondaryId'],
  };
}

export function SourceDTOToJSON(json: any): SourceDTO {
  return SourceDTOToJSONTyped(json, false);
}

export function SourceDTOToJSONTyped(value?: SourceDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    primaryId: value['primaryId'],
    secondaryId: value['secondaryId'],
  };
}
