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
 * @interface CommunicationTimestampsDTO
 */
export interface CommunicationTimestampsDTO {
  /**
   * Number of milliseconds elapsed since the creation of the nemesis block. This value can be converted to epoch time by adding the network's 'epochAdjustment'.
   * @type {string}
   * @memberof CommunicationTimestampsDTO
   */
  sendTimestamp?: string;
  /**
   * Number of milliseconds elapsed since the creation of the nemesis block. This value can be converted to epoch time by adding the network's 'epochAdjustment'.
   * @type {string}
   * @memberof CommunicationTimestampsDTO
   */
  receiveTimestamp?: string;
}

/**
 * Check if a given object implements the CommunicationTimestampsDTO interface.
 */
export function instanceOfCommunicationTimestampsDTO(value: object): value is CommunicationTimestampsDTO {
  return true;
}

export function CommunicationTimestampsDTOFromJSON(json: any): CommunicationTimestampsDTO {
  return CommunicationTimestampsDTOFromJSONTyped(json, false);
}

export function CommunicationTimestampsDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CommunicationTimestampsDTO {
  if (json == null) {
    return json;
  }
  return {
    sendTimestamp: json['sendTimestamp'] == null ? undefined : json['sendTimestamp'],
    receiveTimestamp: json['receiveTimestamp'] == null ? undefined : json['receiveTimestamp'],
  };
}

export function CommunicationTimestampsDTOToJSON(json: any): CommunicationTimestampsDTO {
  return CommunicationTimestampsDTOToJSONTyped(json, false);
}

export function CommunicationTimestampsDTOToJSONTyped(
  value?: CommunicationTimestampsDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    sendTimestamp: value['sendTimestamp'],
    receiveTimestamp: value['receiveTimestamp'],
  };
}
