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
 * @interface AccountLinkVotingKeyDTO
 */
export interface AccountLinkVotingKeyDTO {
  /**
   *
   * @type {string}
   * @memberof AccountLinkVotingKeyDTO
   */
  publicKey: string;
  /**
   * Finalization Epoch
   * @type {number}
   * @memberof AccountLinkVotingKeyDTO
   */
  startEpoch: number;
  /**
   * Finalization Epoch
   * @type {number}
   * @memberof AccountLinkVotingKeyDTO
   */
  endEpoch: number;
}

/**
 * Check if a given object implements the AccountLinkVotingKeyDTO interface.
 */
export function instanceOfAccountLinkVotingKeyDTO(value: object): value is AccountLinkVotingKeyDTO {
  if (!('publicKey' in value) || value['publicKey'] === undefined) return false;
  if (!('startEpoch' in value) || value['startEpoch'] === undefined) return false;
  if (!('endEpoch' in value) || value['endEpoch'] === undefined) return false;
  return true;
}

export function AccountLinkVotingKeyDTOFromJSON(json: any): AccountLinkVotingKeyDTO {
  return AccountLinkVotingKeyDTOFromJSONTyped(json, false);
}

export function AccountLinkVotingKeyDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountLinkVotingKeyDTO {
  if (json == null) {
    return json;
  }
  return {
    publicKey: json['publicKey'],
    startEpoch: json['startEpoch'],
    endEpoch: json['endEpoch'],
  };
}

export function AccountLinkVotingKeyDTOToJSON(json: any): AccountLinkVotingKeyDTO {
  return AccountLinkVotingKeyDTOToJSONTyped(json, false);
}

export function AccountLinkVotingKeyDTOToJSONTyped(
  value?: AccountLinkVotingKeyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    publicKey: value['publicKey'],
    startEpoch: value['startEpoch'],
    endEpoch: value['endEpoch'],
  };
}
