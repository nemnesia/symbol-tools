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
 * @interface AccountKeyLinkNetworkPropertiesDTO
 */
export interface AccountKeyLinkNetworkPropertiesDTO {
  /**
   * to trigger plugin load
   * @type {string}
   * @memberof AccountKeyLinkNetworkPropertiesDTO
   */
  dummy?: string;
}

/**
 * Check if a given object implements the AccountKeyLinkNetworkPropertiesDTO interface.
 */
export function instanceOfAccountKeyLinkNetworkPropertiesDTO(
  value: object
): value is AccountKeyLinkNetworkPropertiesDTO {
  return true;
}

export function AccountKeyLinkNetworkPropertiesDTOFromJSON(json: any): AccountKeyLinkNetworkPropertiesDTO {
  return AccountKeyLinkNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function AccountKeyLinkNetworkPropertiesDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AccountKeyLinkNetworkPropertiesDTO {
  if (json == null) {
    return json;
  }
  return {
    dummy: json['dummy'] == null ? undefined : json['dummy'],
  };
}

export function AccountKeyLinkNetworkPropertiesDTOToJSON(json: any): AccountKeyLinkNetworkPropertiesDTO {
  return AccountKeyLinkNetworkPropertiesDTOToJSONTyped(json, false);
}

export function AccountKeyLinkNetworkPropertiesDTOToJSONTyped(
  value?: AccountKeyLinkNetworkPropertiesDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    dummy: value['dummy'],
  };
}
