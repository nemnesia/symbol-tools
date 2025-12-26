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
import type { ResolutionEntryDTO } from './ResolutionEntryDTO.js';
import {
  ResolutionEntryDTOFromJSON,
  ResolutionEntryDTOFromJSONTyped,
  ResolutionEntryDTOToJSON,
  ResolutionEntryDTOToJSONTyped,
} from './ResolutionEntryDTO.js';
import type { ResolutionStatementDTOUnresolved } from './ResolutionStatementDTOUnresolved.js';
import {
  ResolutionStatementDTOUnresolvedFromJSON,
  ResolutionStatementDTOUnresolvedFromJSONTyped,
  ResolutionStatementDTOUnresolvedToJSON,
  ResolutionStatementDTOUnresolvedToJSONTyped,
} from './ResolutionStatementDTOUnresolved.js';

/**
 *
 * @export
 * @interface ResolutionStatementDTO
 */
export interface ResolutionStatementDTO {
  /**
   * Height of the blockchain.
   * @type {string}
   * @memberof ResolutionStatementDTO
   */
  height: string;
  /**
   *
   * @type {ResolutionStatementDTOUnresolved}
   * @memberof ResolutionStatementDTO
   */
  unresolved: ResolutionStatementDTOUnresolved;
  /**
   * Array of resolution entries linked to the unresolved namespaceId.
   * It is an array instead of a single resolution entry since
   * within one block the resolution might change for different sources due to alias related transactions.
   *
   * @type {Array<ResolutionEntryDTO>}
   * @memberof ResolutionStatementDTO
   */
  resolutionEntries: Array<ResolutionEntryDTO>;
}

/**
 * Check if a given object implements the ResolutionStatementDTO interface.
 */
export function instanceOfResolutionStatementDTO(value: object): value is ResolutionStatementDTO {
  if (!('height' in value) || value['height'] === undefined) return false;
  if (!('unresolved' in value) || value['unresolved'] === undefined) return false;
  if (!('resolutionEntries' in value) || value['resolutionEntries'] === undefined) return false;
  return true;
}

export function ResolutionStatementDTOFromJSON(json: any): ResolutionStatementDTO {
  return ResolutionStatementDTOFromJSONTyped(json, false);
}

export function ResolutionStatementDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResolutionStatementDTO {
  if (json == null) {
    return json;
  }
  return {
    height: json['height'],
    unresolved: ResolutionStatementDTOUnresolvedFromJSON(json['unresolved']),
    resolutionEntries: (json['resolutionEntries'] as Array<any>).map(ResolutionEntryDTOFromJSON),
  };
}

export function ResolutionStatementDTOToJSON(json: any): ResolutionStatementDTO {
  return ResolutionStatementDTOToJSONTyped(json, false);
}

export function ResolutionStatementDTOToJSONTyped(
  value?: ResolutionStatementDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    height: value['height'],
    unresolved: ResolutionStatementDTOUnresolvedToJSON(value['unresolved']),
    resolutionEntries: (value['resolutionEntries'] as Array<any>).map(ResolutionEntryDTOToJSON),
  };
}
