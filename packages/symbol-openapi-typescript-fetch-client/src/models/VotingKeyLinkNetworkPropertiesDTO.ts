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
 * @interface VotingKeyLinkNetworkPropertiesDTO
 */
export interface VotingKeyLinkNetworkPropertiesDTO {
  /**
   * to trigger plugin load
   * @type {string}
   * @memberof VotingKeyLinkNetworkPropertiesDTO
   */
  dummy?: string;
}

/**
 * Check if a given object implements the VotingKeyLinkNetworkPropertiesDTO interface.
 */
export function instanceOfVotingKeyLinkNetworkPropertiesDTO(value: object): value is VotingKeyLinkNetworkPropertiesDTO {
  return true;
}

export function VotingKeyLinkNetworkPropertiesDTOFromJSON(json: any): VotingKeyLinkNetworkPropertiesDTO {
  return VotingKeyLinkNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function VotingKeyLinkNetworkPropertiesDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): VotingKeyLinkNetworkPropertiesDTO {
  if (json == null) {
    return json;
  }
  return {
    dummy: json['dummy'] == null ? undefined : json['dummy'],
  };
}

export function VotingKeyLinkNetworkPropertiesDTOToJSON(json: any): VotingKeyLinkNetworkPropertiesDTO {
  return VotingKeyLinkNetworkPropertiesDTOToJSONTyped(json, false);
}

export function VotingKeyLinkNetworkPropertiesDTOToJSONTyped(
  value?: VotingKeyLinkNetworkPropertiesDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    dummy: value['dummy'],
  };
}
