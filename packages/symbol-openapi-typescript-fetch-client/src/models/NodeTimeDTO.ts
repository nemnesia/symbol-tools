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
import type { CommunicationTimestampsDTO } from './CommunicationTimestampsDTO.js';
import {
  CommunicationTimestampsDTOFromJSON,
  CommunicationTimestampsDTOFromJSONTyped,
  CommunicationTimestampsDTOToJSON,
  CommunicationTimestampsDTOToJSONTyped,
} from './CommunicationTimestampsDTO.js';

/**
 *
 * @export
 * @interface NodeTimeDTO
 */
export interface NodeTimeDTO {
  /**
   *
   * @type {CommunicationTimestampsDTO}
   * @memberof NodeTimeDTO
   */
  communicationTimestamps: CommunicationTimestampsDTO;
}

/**
 * Check if a given object implements the NodeTimeDTO interface.
 */
export function instanceOfNodeTimeDTO(value: object): value is NodeTimeDTO {
  if (!('communicationTimestamps' in value) || value['communicationTimestamps'] === undefined) return false;
  return true;
}

export function NodeTimeDTOFromJSON(json: any): NodeTimeDTO {
  return NodeTimeDTOFromJSONTyped(json, false);
}

export function NodeTimeDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NodeTimeDTO {
  if (json == null) {
    return json;
  }
  return {
    communicationTimestamps: CommunicationTimestampsDTOFromJSON(json['communicationTimestamps']),
  };
}

export function NodeTimeDTOToJSON(json: any): NodeTimeDTO {
  return NodeTimeDTOToJSONTyped(json, false);
}

export function NodeTimeDTOToJSONTyped(value?: NodeTimeDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    communicationTimestamps: CommunicationTimestampsDTOToJSON(value['communicationTimestamps']),
  };
}
