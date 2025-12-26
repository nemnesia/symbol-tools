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
import type { NodeHealthDTO } from './NodeHealthDTO.js';
import {
  NodeHealthDTOFromJSON,
  NodeHealthDTOFromJSONTyped,
  NodeHealthDTOToJSON,
  NodeHealthDTOToJSONTyped,
} from './NodeHealthDTO.js';

/**
 *
 * @export
 * @interface NodeHealthInfoDTO
 */
export interface NodeHealthInfoDTO {
  /**
   *
   * @type {NodeHealthDTO}
   * @memberof NodeHealthInfoDTO
   */
  status: NodeHealthDTO;
}

/**
 * Check if a given object implements the NodeHealthInfoDTO interface.
 */
export function instanceOfNodeHealthInfoDTO(value: object): value is NodeHealthInfoDTO {
  if (!('status' in value) || value['status'] === undefined) return false;
  return true;
}

export function NodeHealthInfoDTOFromJSON(json: any): NodeHealthInfoDTO {
  return NodeHealthInfoDTOFromJSONTyped(json, false);
}

export function NodeHealthInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NodeHealthInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    status: NodeHealthDTOFromJSON(json['status']),
  };
}

export function NodeHealthInfoDTOToJSON(json: any): NodeHealthInfoDTO {
  return NodeHealthInfoDTOToJSONTyped(json, false);
}

export function NodeHealthInfoDTOToJSONTyped(
  value?: NodeHealthInfoDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    status: NodeHealthDTOToJSON(value['status']),
  };
}
