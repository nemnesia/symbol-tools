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
 * Merkle tree branch link.
 * @export
 * @interface MerkleTreeBranchLinkDTO
 */
export interface MerkleTreeBranchLinkDTO {
  /**
   * Branch link nibble bit index (hexadecimal).
   * @type {string}
   * @memberof MerkleTreeBranchLinkDTO
   */
  bit: string;
  /**
   *
   * @type {string}
   * @memberof MerkleTreeBranchLinkDTO
   */
  link: string;
}

/**
 * Check if a given object implements the MerkleTreeBranchLinkDTO interface.
 */
export function instanceOfMerkleTreeBranchLinkDTO(value: object): value is MerkleTreeBranchLinkDTO {
  if (!('bit' in value) || value['bit'] === undefined) return false;
  if (!('link' in value) || value['link'] === undefined) return false;
  return true;
}

export function MerkleTreeBranchLinkDTOFromJSON(json: any): MerkleTreeBranchLinkDTO {
  return MerkleTreeBranchLinkDTOFromJSONTyped(json, false);
}

export function MerkleTreeBranchLinkDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MerkleTreeBranchLinkDTO {
  if (json == null) {
    return json;
  }
  return {
    bit: json['bit'],
    link: json['link'],
  };
}

export function MerkleTreeBranchLinkDTOToJSON(json: any): MerkleTreeBranchLinkDTO {
  return MerkleTreeBranchLinkDTOToJSONTyped(json, false);
}

export function MerkleTreeBranchLinkDTOToJSONTyped(
  value?: MerkleTreeBranchLinkDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    bit: value['bit'],
    link: value['link'],
  };
}
