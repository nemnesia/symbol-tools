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
import type { NamespaceDTO } from './NamespaceDTO.js';
import {
  NamespaceDTOFromJSON,
  NamespaceDTOFromJSONTyped,
  NamespaceDTOToJSON,
  NamespaceDTOToJSONTyped,
} from './NamespaceDTO.js';
import type { NamespaceMetaDTO } from './NamespaceMetaDTO.js';
import {
  NamespaceMetaDTOFromJSON,
  NamespaceMetaDTOFromJSONTyped,
  NamespaceMetaDTOToJSON,
  NamespaceMetaDTOToJSONTyped,
} from './NamespaceMetaDTO.js';

/**
 *
 * @export
 * @interface NamespaceInfoDTO
 */
export interface NamespaceInfoDTO {
  /**
   * Internal resource identifier.
   * @type {string}
   * @memberof NamespaceInfoDTO
   */
  id: string;
  /**
   *
   * @type {NamespaceMetaDTO}
   * @memberof NamespaceInfoDTO
   */
  meta: NamespaceMetaDTO;
  /**
   *
   * @type {NamespaceDTO}
   * @memberof NamespaceInfoDTO
   */
  namespace: NamespaceDTO;
}

/**
 * Check if a given object implements the NamespaceInfoDTO interface.
 */
export function instanceOfNamespaceInfoDTO(value: object): value is NamespaceInfoDTO {
  if (!('id' in value) || value['id'] === undefined) return false;
  if (!('meta' in value) || value['meta'] === undefined) return false;
  if (!('namespace' in value) || value['namespace'] === undefined) return false;
  return true;
}

export function NamespaceInfoDTOFromJSON(json: any): NamespaceInfoDTO {
  return NamespaceInfoDTOFromJSONTyped(json, false);
}

export function NamespaceInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NamespaceInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    id: json['id'],
    meta: NamespaceMetaDTOFromJSON(json['meta']),
    namespace: NamespaceDTOFromJSON(json['namespace']),
  };
}

export function NamespaceInfoDTOToJSON(json: any): NamespaceInfoDTO {
  return NamespaceInfoDTOToJSONTyped(json, false);
}

export function NamespaceInfoDTOToJSONTyped(
  value?: NamespaceInfoDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    id: value['id'],
    meta: NamespaceMetaDTOToJSON(value['meta']),
    namespace: NamespaceDTOToJSON(value['namespace']),
  };
}
