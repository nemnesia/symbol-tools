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
import type { MerkleStateInfoDTOTreeInner } from './MerkleStateInfoDTOTreeInner.js';
import {
  MerkleStateInfoDTOTreeInnerFromJSON,
  MerkleStateInfoDTOTreeInnerFromJSONTyped,
  MerkleStateInfoDTOTreeInnerToJSON,
  MerkleStateInfoDTOTreeInnerToJSONTyped,
} from './MerkleStateInfoDTOTreeInner.js';

/**
 * The merkle path information clients can use to proof the state of the given entity.
 *
 * @export
 * @interface MerkleStateInfoDTO
 */
export interface MerkleStateInfoDTO {
  /**
   * The hex information of the complete merkle tree as returned by server api.
   * More information can be found in chapter 4.3 of the catapult whitepaper.
   *
   * @type {string}
   * @memberof MerkleStateInfoDTO
   */
  raw: string;
  /**
   * Merkle tree parsed from merkle tree raw.
   * @type {Array<MerkleStateInfoDTOTreeInner>}
   * @memberof MerkleStateInfoDTO
   */
  tree: Array<MerkleStateInfoDTOTreeInner>;
}

/**
 * Check if a given object implements the MerkleStateInfoDTO interface.
 */
export function instanceOfMerkleStateInfoDTO(value: object): value is MerkleStateInfoDTO {
  if (!('raw' in value) || value['raw'] === undefined) return false;
  if (!('tree' in value) || value['tree'] === undefined) return false;
  return true;
}

export function MerkleStateInfoDTOFromJSON(json: any): MerkleStateInfoDTO {
  return MerkleStateInfoDTOFromJSONTyped(json, false);
}

export function MerkleStateInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MerkleStateInfoDTO {
  if (json == null) {
    return json;
  }
  return {
    raw: json['raw'],
    tree: (json['tree'] as Array<any>).map(MerkleStateInfoDTOTreeInnerFromJSON),
  };
}

export function MerkleStateInfoDTOToJSON(json: any): MerkleStateInfoDTO {
  return MerkleStateInfoDTOToJSONTyped(json, false);
}

export function MerkleStateInfoDTOToJSONTyped(
  value?: MerkleStateInfoDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    raw: value['raw'],
    tree: (value['tree'] as Array<any>).map(MerkleStateInfoDTOTreeInnerToJSON),
  };
}
