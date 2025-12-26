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
import type { MetadataEntryDTOTargetId } from './MetadataEntryDTOTargetId.js';
import {
  MetadataEntryDTOTargetIdFromJSON,
  MetadataEntryDTOTargetIdFromJSONTyped,
  MetadataEntryDTOTargetIdToJSON,
  MetadataEntryDTOTargetIdToJSONTyped,
} from './MetadataEntryDTOTargetId.js';
import type { MetadataTypeEnum } from './MetadataTypeEnum.js';
import {
  MetadataTypeEnumFromJSON,
  MetadataTypeEnumFromJSONTyped,
  MetadataTypeEnumToJSON,
  MetadataTypeEnumToJSONTyped,
} from './MetadataTypeEnum.js';

/**
 *
 * @export
 * @interface MetadataEntryDTO
 */
export interface MetadataEntryDTO {
  /**
   * The version of the state
   * @type {number}
   * @memberof MetadataEntryDTO
   */
  version: number;
  /**
   *
   * @type {string}
   * @memberof MetadataEntryDTO
   */
  compositeHash: string;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof MetadataEntryDTO
   */
  sourceAddress: string;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof MetadataEntryDTO
   */
  targetAddress: string;
  /**
   * Metadata key scoped to source, target and type expressed.
   * @type {string}
   * @memberof MetadataEntryDTO
   */
  scopedMetadataKey: string;
  /**
   *
   * @type {MetadataEntryDTOTargetId}
   * @memberof MetadataEntryDTO
   */
  targetId?: MetadataEntryDTOTargetId;
  /**
   *
   * @type {MetadataTypeEnum}
   * @memberof MetadataEntryDTO
   */
  metadataType: MetadataTypeEnum;
  /**
   * Metadata value.
   * @type {string}
   * @memberof MetadataEntryDTO
   */
  value: string;
}

/**
 * Check if a given object implements the MetadataEntryDTO interface.
 */
export function instanceOfMetadataEntryDTO(value: object): value is MetadataEntryDTO {
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('compositeHash' in value) || value['compositeHash'] === undefined) return false;
  if (!('sourceAddress' in value) || value['sourceAddress'] === undefined) return false;
  if (!('targetAddress' in value) || value['targetAddress'] === undefined) return false;
  if (!('scopedMetadataKey' in value) || value['scopedMetadataKey'] === undefined) return false;
  if (!('metadataType' in value) || value['metadataType'] === undefined) return false;
  if (!('value' in value) || value['value'] === undefined) return false;
  return true;
}

export function MetadataEntryDTOFromJSON(json: any): MetadataEntryDTO {
  return MetadataEntryDTOFromJSONTyped(json, false);
}

export function MetadataEntryDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetadataEntryDTO {
  if (json == null) {
    return json;
  }
  return {
    version: json['version'],
    compositeHash: json['compositeHash'],
    sourceAddress: json['sourceAddress'],
    targetAddress: json['targetAddress'],
    scopedMetadataKey: json['scopedMetadataKey'],
    targetId: json['targetId'] == null ? undefined : MetadataEntryDTOTargetIdFromJSON(json['targetId']),
    metadataType: MetadataTypeEnumFromJSON(json['metadataType']),
    value: json['value'],
  };
}

export function MetadataEntryDTOToJSON(json: any): MetadataEntryDTO {
  return MetadataEntryDTOToJSONTyped(json, false);
}

export function MetadataEntryDTOToJSONTyped(
  value?: MetadataEntryDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    version: value['version'],
    compositeHash: value['compositeHash'],
    sourceAddress: value['sourceAddress'],
    targetAddress: value['targetAddress'],
    scopedMetadataKey: value['scopedMetadataKey'],
    targetId: MetadataEntryDTOTargetIdToJSON(value['targetId']),
    metadataType: MetadataTypeEnumToJSON(value['metadataType']),
    value: value['value'],
  };
}
