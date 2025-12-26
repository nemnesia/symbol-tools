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
import type { AliasDTO } from './AliasDTO.js';
import { AliasDTOFromJSON, AliasDTOFromJSONTyped, AliasDTOToJSON, AliasDTOToJSONTyped } from './AliasDTO.js';
import type { NamespaceRegistrationTypeEnum } from './NamespaceRegistrationTypeEnum.js';
import {
  NamespaceRegistrationTypeEnumFromJSON,
  NamespaceRegistrationTypeEnumFromJSONTyped,
  NamespaceRegistrationTypeEnumToJSON,
  NamespaceRegistrationTypeEnumToJSONTyped,
} from './NamespaceRegistrationTypeEnum.js';

/**
 *
 * @export
 * @interface NamespaceDTO
 */
export interface NamespaceDTO {
  /**
   * The version of the state
   * @type {number}
   * @memberof NamespaceDTO
   */
  version: number;
  /**
   *
   * @type {NamespaceRegistrationTypeEnum}
   * @memberof NamespaceDTO
   */
  registrationType: NamespaceRegistrationTypeEnum;
  /**
   * Level of the namespace.
   * @type {number}
   * @memberof NamespaceDTO
   */
  depth: number;
  /**
   * Namespace identifier.
   * @type {string}
   * @memberof NamespaceDTO
   */
  level0: string;
  /**
   * Namespace identifier.
   * @type {string}
   * @memberof NamespaceDTO
   */
  level1?: string;
  /**
   * Namespace identifier.
   * @type {string}
   * @memberof NamespaceDTO
   */
  level2?: string;
  /**
   *
   * @type {AliasDTO}
   * @memberof NamespaceDTO
   */
  alias: AliasDTO;
  /**
   * Namespace identifier.
   * @type {string}
   * @memberof NamespaceDTO
   */
  parentId: string;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof NamespaceDTO
   */
  ownerAddress: string;
  /**
   * Height of the blockchain.
   * @type {string}
   * @memberof NamespaceDTO
   */
  startHeight: string;
  /**
   * Height of the blockchain.
   * @type {string}
   * @memberof NamespaceDTO
   */
  endHeight: string;
}

/**
 * Check if a given object implements the NamespaceDTO interface.
 */
export function instanceOfNamespaceDTO(value: object): value is NamespaceDTO {
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('registrationType' in value) || value['registrationType'] === undefined) return false;
  if (!('depth' in value) || value['depth'] === undefined) return false;
  if (!('level0' in value) || value['level0'] === undefined) return false;
  if (!('alias' in value) || value['alias'] === undefined) return false;
  if (!('parentId' in value) || value['parentId'] === undefined) return false;
  if (!('ownerAddress' in value) || value['ownerAddress'] === undefined) return false;
  if (!('startHeight' in value) || value['startHeight'] === undefined) return false;
  if (!('endHeight' in value) || value['endHeight'] === undefined) return false;
  return true;
}

export function NamespaceDTOFromJSON(json: any): NamespaceDTO {
  return NamespaceDTOFromJSONTyped(json, false);
}

export function NamespaceDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NamespaceDTO {
  if (json == null) {
    return json;
  }
  return {
    version: json['version'],
    registrationType: NamespaceRegistrationTypeEnumFromJSON(json['registrationType']),
    depth: json['depth'],
    level0: json['level0'],
    level1: json['level1'] == null ? undefined : json['level1'],
    level2: json['level2'] == null ? undefined : json['level2'],
    alias: AliasDTOFromJSON(json['alias']),
    parentId: json['parentId'],
    ownerAddress: json['ownerAddress'],
    startHeight: json['startHeight'],
    endHeight: json['endHeight'],
  };
}

export function NamespaceDTOToJSON(json: any): NamespaceDTO {
  return NamespaceDTOToJSONTyped(json, false);
}

export function NamespaceDTOToJSONTyped(value?: NamespaceDTO | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    version: value['version'],
    registrationType: NamespaceRegistrationTypeEnumToJSON(value['registrationType']),
    depth: value['depth'],
    level0: value['level0'],
    level1: value['level1'],
    level2: value['level2'],
    alias: AliasDTOToJSON(value['alias']),
    parentId: value['parentId'],
    ownerAddress: value['ownerAddress'],
    startHeight: value['startHeight'],
    endHeight: value['endHeight'],
  };
}
