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
import type { ServerDTO } from './ServerDTO.js';
import { ServerDTOFromJSON, ServerDTOFromJSONTyped, ServerDTOToJSON, ServerDTOToJSONTyped } from './ServerDTO.js';

/**
 *
 * @export
 * @interface ServerInfoDTO
 */
export interface ServerInfoDTO {
  /**
   *
   * @type {ServerDTO}
   * @memberof ServerInfoDTO
   */
  serverInfo: ServerDTO;
}

/**
 * Check if a given object implements the ServerInfoDTO interface.
 */
export function instanceOfServerInfoDTO(value: object): value is ServerInfoDTO {
  if (!('serverInfo' in value) || value['serverInfo'] === undefined) return false;
  return true;
}

export function ServerInfoDTOFromJSON(json: any): ServerInfoDTO {
  return ServerInfoDTOFromJSONTyped(json, false);
}

export function ServerInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServerInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    serverInfo: ServerDTOFromJSON(json['serverInfo']),
  };
}

export function ServerInfoDTOToJSON(json: any): ServerInfoDTO {
  return ServerInfoDTOToJSONTyped(json, false);
}

export function ServerInfoDTOToJSONTyped(value?: ServerInfoDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    serverInfo: ServerDTOToJSON(value['serverInfo']),
  };
}
