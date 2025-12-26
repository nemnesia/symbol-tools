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
 * Supplementary data stored for importance recalculation.
 * At each importance recalculation, existing buckets are shifted, the working bucket is finalized and a new working bucket is created.
 * Each bucket influences at most five importance recalculations.
 *
 * @export
 * @interface ActivityBucketDTO
 */
export interface ActivityBucketDTO {
  /**
   * Height of the blockchain.
   * @type {string}
   * @memberof ActivityBucketDTO
   */
  startHeight: string;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof ActivityBucketDTO
   */
  totalFeesPaid: string;
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof ActivityBucketDTO
   */
  beneficiaryCount: number;
  /**
   * Probability of an account to harvest the next block.
   * @type {string}
   * @memberof ActivityBucketDTO
   */
  rawScore: string;
}

/**
 * Check if a given object implements the ActivityBucketDTO interface.
 */
export function instanceOfActivityBucketDTO(value: object): value is ActivityBucketDTO {
  if (!('startHeight' in value) || value['startHeight'] === undefined) return false;
  if (!('totalFeesPaid' in value) || value['totalFeesPaid'] === undefined) return false;
  if (!('beneficiaryCount' in value) || value['beneficiaryCount'] === undefined) return false;
  if (!('rawScore' in value) || value['rawScore'] === undefined) return false;
  return true;
}

export function ActivityBucketDTOFromJSON(json: any): ActivityBucketDTO {
  return ActivityBucketDTOFromJSONTyped(json, false);
}

export function ActivityBucketDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ActivityBucketDTO {
  if (json == null) {
    return json;
  }
  return {
    startHeight: json['startHeight'],
    totalFeesPaid: json['totalFeesPaid'],
    beneficiaryCount: json['beneficiaryCount'],
    rawScore: json['rawScore'],
  };
}

export function ActivityBucketDTOToJSON(json: any): ActivityBucketDTO {
  return ActivityBucketDTOToJSONTyped(json, false);
}

export function ActivityBucketDTOToJSONTyped(
  value?: ActivityBucketDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    startHeight: value['startHeight'],
    totalFeesPaid: value['totalFeesPaid'],
    beneficiaryCount: value['beneficiaryCount'],
    rawScore: value['rawScore'],
  };
}
