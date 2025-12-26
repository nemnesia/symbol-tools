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
import type { ResolutionEntryDTOResolved } from './ResolutionEntryDTOResolved.js';
import {
  ResolutionEntryDTOResolvedFromJSON,
  ResolutionEntryDTOResolvedFromJSONTyped,
  ResolutionEntryDTOResolvedToJSON,
  ResolutionEntryDTOResolvedToJSONTyped,
} from './ResolutionEntryDTOResolved.js';
import type { SourceDTO } from './SourceDTO.js';
import { SourceDTOFromJSON, SourceDTOFromJSONTyped, SourceDTOToJSON, SourceDTOToJSONTyped } from './SourceDTO.js';

/**
 *
 * @export
 * @interface ResolutionEntryDTO
 */
export interface ResolutionEntryDTO {
  /**
   *
   * @type {SourceDTO}
   * @memberof ResolutionEntryDTO
   */
  source: SourceDTO;
  /**
   *
   * @type {ResolutionEntryDTOResolved}
   * @memberof ResolutionEntryDTO
   */
  resolved: ResolutionEntryDTOResolved;
}

/**
 * Check if a given object implements the ResolutionEntryDTO interface.
 */
export function instanceOfResolutionEntryDTO(value: object): value is ResolutionEntryDTO {
  if (!('source' in value) || value['source'] === undefined) return false;
  if (!('resolved' in value) || value['resolved'] === undefined) return false;
  return true;
}

export function ResolutionEntryDTOFromJSON(json: any): ResolutionEntryDTO {
  return ResolutionEntryDTOFromJSONTyped(json, false);
}

export function ResolutionEntryDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResolutionEntryDTO {
  if (json == null) {
    return json;
  }
  return {
    source: SourceDTOFromJSON(json['source']),
    resolved: ResolutionEntryDTOResolvedFromJSON(json['resolved']),
  };
}

export function ResolutionEntryDTOToJSON(json: any): ResolutionEntryDTO {
  return ResolutionEntryDTOToJSONTyped(json, false);
}

export function ResolutionEntryDTOToJSONTyped(
  value?: ResolutionEntryDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    source: SourceDTOToJSON(value['source']),
    resolved: ResolutionEntryDTOResolvedToJSON(value['resolved']),
  };
}
