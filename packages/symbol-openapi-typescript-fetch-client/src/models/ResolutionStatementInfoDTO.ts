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
import type { ResolutionStatementDTO } from './ResolutionStatementDTO.js';
import {
  ResolutionStatementDTOFromJSON,
  ResolutionStatementDTOFromJSONTyped,
  ResolutionStatementDTOToJSON,
  ResolutionStatementDTOToJSONTyped,
} from './ResolutionStatementDTO.js';
import type { StatementMetaDTO } from './StatementMetaDTO.js';
import {
  StatementMetaDTOFromJSON,
  StatementMetaDTOFromJSONTyped,
  StatementMetaDTOToJSON,
  StatementMetaDTOToJSONTyped,
} from './StatementMetaDTO.js';

/**
 * A resolution statement keeps the relation between a namespace alias used in a transaction
 * and the real address or mosaicId.
 *
 * @export
 * @interface ResolutionStatementInfoDTO
 */
export interface ResolutionStatementInfoDTO {
  /**
   * Internal resource identifier.
   * @type {string}
   * @memberof ResolutionStatementInfoDTO
   */
  id: string;
  /**
   *
   * @type {StatementMetaDTO}
   * @memberof ResolutionStatementInfoDTO
   */
  meta: StatementMetaDTO;
  /**
   *
   * @type {ResolutionStatementDTO}
   * @memberof ResolutionStatementInfoDTO
   */
  statement: ResolutionStatementDTO;
}

/**
 * Check if a given object implements the ResolutionStatementInfoDTO interface.
 */
export function instanceOfResolutionStatementInfoDTO(value: object): value is ResolutionStatementInfoDTO {
  if (!('id' in value) || value['id'] === undefined) return false;
  if (!('meta' in value) || value['meta'] === undefined) return false;
  if (!('statement' in value) || value['statement'] === undefined) return false;
  return true;
}

export function ResolutionStatementInfoDTOFromJSON(json: any): ResolutionStatementInfoDTO {
  return ResolutionStatementInfoDTOFromJSONTyped(json, false);
}

export function ResolutionStatementInfoDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ResolutionStatementInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    id: json['id'],
    meta: StatementMetaDTOFromJSON(json['meta']),
    statement: ResolutionStatementDTOFromJSON(json['statement']),
  };
}

export function ResolutionStatementInfoDTOToJSON(json: any): ResolutionStatementInfoDTO {
  return ResolutionStatementInfoDTOToJSONTyped(json, false);
}

export function ResolutionStatementInfoDTOToJSONTyped(
  value?: ResolutionStatementInfoDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    id: value['id'],
    meta: StatementMetaDTOToJSON(value['meta']),
    statement: ResolutionStatementDTOToJSON(value['statement']),
  };
}
