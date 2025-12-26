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
import type { MultisigDTO } from './MultisigDTO.js';
import {
  MultisigDTOFromJSON,
  MultisigDTOFromJSONTyped,
  MultisigDTOToJSON,
  MultisigDTOToJSONTyped,
} from './MultisigDTO.js';

/**
 *
 * @export
 * @interface MultisigAccountInfoDTO
 */
export interface MultisigAccountInfoDTO {
  /**
   *
   * @type {MultisigDTO}
   * @memberof MultisigAccountInfoDTO
   */
  multisig: MultisigDTO;
}

/**
 * Check if a given object implements the MultisigAccountInfoDTO interface.
 */
export function instanceOfMultisigAccountInfoDTO(value: object): value is MultisigAccountInfoDTO {
  if (!('multisig' in value) || value['multisig'] === undefined) return false;
  return true;
}

export function MultisigAccountInfoDTOFromJSON(json: any): MultisigAccountInfoDTO {
  return MultisigAccountInfoDTOFromJSONTyped(json, false);
}

export function MultisigAccountInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MultisigAccountInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    multisig: MultisigDTOFromJSON(json['multisig']),
  };
}

export function MultisigAccountInfoDTOToJSON(json: any): MultisigAccountInfoDTO {
  return MultisigAccountInfoDTOToJSONTyped(json, false);
}

export function MultisigAccountInfoDTOToJSONTyped(
  value?: MultisigAccountInfoDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    multisig: MultisigDTOToJSON(value['multisig']),
  };
}
