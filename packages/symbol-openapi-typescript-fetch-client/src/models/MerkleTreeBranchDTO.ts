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
import type { MerkleTreeBranchLinkDTO } from './MerkleTreeBranchLinkDTO.js';
import {
  MerkleTreeBranchLinkDTOFromJSON,
  MerkleTreeBranchLinkDTOFromJSONTyped,
  MerkleTreeBranchLinkDTOToJSON,
  MerkleTreeBranchLinkDTOToJSONTyped,
} from './MerkleTreeBranchLinkDTO.js';
import type { MerkleTreeNodeTypeEnum } from './MerkleTreeNodeTypeEnum.js';
import {
  MerkleTreeNodeTypeEnumFromJSON,
  MerkleTreeNodeTypeEnumFromJSONTyped,
  MerkleTreeNodeTypeEnumToJSON,
  MerkleTreeNodeTypeEnumToJSONTyped,
} from './MerkleTreeNodeTypeEnum.js';

/**
 * Merkle tree branch node.
 * @export
 * @interface MerkleTreeBranchDTO
 */
export interface MerkleTreeBranchDTO {
  /**
   *
   * @type {MerkleTreeNodeTypeEnum}
   * @memberof MerkleTreeBranchDTO
   */
  type: MerkleTreeNodeTypeEnum;
  /**
   * Branch link path.
   * @type {string}
   * @memberof MerkleTreeBranchDTO
   */
  path: string;
  /**
   * Encoded branch link path.
   * @type {string}
   * @memberof MerkleTreeBranchDTO
   */
  encodedPath: string;
  /**
   * Nibble count.
   * @type {number}
   * @memberof MerkleTreeBranchDTO
   */
  nibbleCount: number;
  /**
   * Branch link bitmask.
   * @type {string}
   * @memberof MerkleTreeBranchDTO
   */
  linkMask: string;
  /**
   * Branch links (max 16).
   * @type {Array<MerkleTreeBranchLinkDTO>}
   * @memberof MerkleTreeBranchDTO
   */
  links: Array<MerkleTreeBranchLinkDTO>;
  /**
   *
   * @type {string}
   * @memberof MerkleTreeBranchDTO
   */
  branchHash: string;
}

/**
 * Check if a given object implements the MerkleTreeBranchDTO interface.
 */
export function instanceOfMerkleTreeBranchDTO(value: object): value is MerkleTreeBranchDTO {
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('path' in value) || value['path'] === undefined) return false;
  if (!('encodedPath' in value) || value['encodedPath'] === undefined) return false;
  if (!('nibbleCount' in value) || value['nibbleCount'] === undefined) return false;
  if (!('linkMask' in value) || value['linkMask'] === undefined) return false;
  if (!('links' in value) || value['links'] === undefined) return false;
  if (!('branchHash' in value) || value['branchHash'] === undefined) return false;
  return true;
}

export function MerkleTreeBranchDTOFromJSON(json: any): MerkleTreeBranchDTO {
  return MerkleTreeBranchDTOFromJSONTyped(json, false);
}

export function MerkleTreeBranchDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MerkleTreeBranchDTO {
  if (json == null) {
    return json;
  }
  return {
    type: MerkleTreeNodeTypeEnumFromJSON(json['type']),
    path: json['path'],
    encodedPath: json['encodedPath'],
    nibbleCount: json['nibbleCount'],
    linkMask: json['linkMask'],
    links: (json['links'] as Array<any>).map(MerkleTreeBranchLinkDTOFromJSON),
    branchHash: json['branchHash'],
  };
}

export function MerkleTreeBranchDTOToJSON(json: any): MerkleTreeBranchDTO {
  return MerkleTreeBranchDTOToJSONTyped(json, false);
}

export function MerkleTreeBranchDTOToJSONTyped(
  value?: MerkleTreeBranchDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    type: MerkleTreeNodeTypeEnumToJSON(value['type']),
    path: value['path'],
    encodedPath: value['encodedPath'],
    nibbleCount: value['nibbleCount'],
    linkMask: value['linkMask'],
    links: (value['links'] as Array<any>).map(MerkleTreeBranchLinkDTOToJSON),
    branchHash: value['branchHash'],
  };
}
