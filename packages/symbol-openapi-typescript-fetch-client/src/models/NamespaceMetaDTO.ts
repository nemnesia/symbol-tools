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
 * @interface NamespaceMetaDTO
 */
export interface NamespaceMetaDTO {
  /**
   * If true, the namespace is active.
   * @type {boolean}
   * @memberof NamespaceMetaDTO
   */
  active: boolean;
  /**
   *
   * @type {number}
   * @memberof NamespaceMetaDTO
   */
  index: number;
}

/**
 * Check if a given object implements the NamespaceMetaDTO interface.
 */
export function instanceOfNamespaceMetaDTO(value: object): value is NamespaceMetaDTO {
  if (!('active' in value) || value['active'] === undefined) return false;
  if (!('index' in value) || value['index'] === undefined) return false;
  return true;
}

export function NamespaceMetaDTOFromJSON(json: any): NamespaceMetaDTO {
  return NamespaceMetaDTOFromJSONTyped(json, false);
}

export function NamespaceMetaDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NamespaceMetaDTO {
  if (json == null) {
    return json;
  }
  return {
    active: json['active'],
    index: json['index'],
  };
}

export function NamespaceMetaDTOToJSON(json: any): NamespaceMetaDTO {
  return NamespaceMetaDTOToJSONTyped(json, false);
}

export function NamespaceMetaDTOToJSONTyped(
  value?: NamespaceMetaDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    active: value['active'],
    index: value['index'],
  };
}
