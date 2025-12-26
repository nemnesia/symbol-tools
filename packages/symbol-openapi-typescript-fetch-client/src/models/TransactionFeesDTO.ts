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
 * @interface TransactionFeesDTO
 */
export interface TransactionFeesDTO {
  /**
   * Fee multiplier applied to transactions contained in block.
   * @type {number}
   * @memberof TransactionFeesDTO
   */
  averageFeeMultiplier: number;
  /**
   * Fee multiplier applied to transactions contained in block.
   * @type {number}
   * @memberof TransactionFeesDTO
   */
  medianFeeMultiplier: number;
  /**
   * Fee multiplier applied to transactions contained in block.
   * @type {number}
   * @memberof TransactionFeesDTO
   */
  highestFeeMultiplier: number;
  /**
   * Fee multiplier applied to transactions contained in block.
   * @type {number}
   * @memberof TransactionFeesDTO
   */
  lowestFeeMultiplier: number;
  /**
   * Fee multiplier applied to transactions contained in block.
   * @type {number}
   * @memberof TransactionFeesDTO
   */
  minFeeMultiplier: number;
}

/**
 * Check if a given object implements the TransactionFeesDTO interface.
 */
export function instanceOfTransactionFeesDTO(value: object): value is TransactionFeesDTO {
  if (!('averageFeeMultiplier' in value) || value['averageFeeMultiplier'] === undefined) return false;
  if (!('medianFeeMultiplier' in value) || value['medianFeeMultiplier'] === undefined) return false;
  if (!('highestFeeMultiplier' in value) || value['highestFeeMultiplier'] === undefined) return false;
  if (!('lowestFeeMultiplier' in value) || value['lowestFeeMultiplier'] === undefined) return false;
  if (!('minFeeMultiplier' in value) || value['minFeeMultiplier'] === undefined) return false;
  return true;
}

export function TransactionFeesDTOFromJSON(json: any): TransactionFeesDTO {
  return TransactionFeesDTOFromJSONTyped(json, false);
}

export function TransactionFeesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionFeesDTO {
  if (json == null) {
    return json;
  }
  return {
    averageFeeMultiplier: json['averageFeeMultiplier'],
    medianFeeMultiplier: json['medianFeeMultiplier'],
    highestFeeMultiplier: json['highestFeeMultiplier'],
    lowestFeeMultiplier: json['lowestFeeMultiplier'],
    minFeeMultiplier: json['minFeeMultiplier'],
  };
}

export function TransactionFeesDTOToJSON(json: any): TransactionFeesDTO {
  return TransactionFeesDTOToJSONTyped(json, false);
}

export function TransactionFeesDTOToJSONTyped(
  value?: TransactionFeesDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    averageFeeMultiplier: value['averageFeeMultiplier'],
    medianFeeMultiplier: value['medianFeeMultiplier'],
    highestFeeMultiplier: value['highestFeeMultiplier'],
    lowestFeeMultiplier: value['lowestFeeMultiplier'],
    minFeeMultiplier: value['minFeeMultiplier'],
  };
}
