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
 * @interface AnnounceTransactionInfoDTO
 */
export interface AnnounceTransactionInfoDTO {
  /**
   *
   * @type {string}
   * @memberof AnnounceTransactionInfoDTO
   */
  message: string;
}

/**
 * Check if a given object implements the AnnounceTransactionInfoDTO interface.
 */
export function instanceOfAnnounceTransactionInfoDTO(value: object): value is AnnounceTransactionInfoDTO {
  if (!('message' in value) || value['message'] === undefined) return false;
  return true;
}

export function AnnounceTransactionInfoDTOFromJSON(json: any): AnnounceTransactionInfoDTO {
  return AnnounceTransactionInfoDTOFromJSONTyped(json, false);
}

export function AnnounceTransactionInfoDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AnnounceTransactionInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    message: json['message'],
  };
}

export function AnnounceTransactionInfoDTOToJSON(json: any): AnnounceTransactionInfoDTO {
  return AnnounceTransactionInfoDTOToJSONTyped(json, false);
}

export function AnnounceTransactionInfoDTOToJSONTyped(
  value?: AnnounceTransactionInfoDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    message: value['message'],
  };
}
