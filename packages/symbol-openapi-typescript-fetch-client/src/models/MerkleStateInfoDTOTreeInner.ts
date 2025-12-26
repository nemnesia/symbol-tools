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
import type { MerkleTreeBranchDTO } from './MerkleTreeBranchDTO.js';
import {
  MerkleTreeBranchDTOFromJSON,
  MerkleTreeBranchDTOFromJSONTyped,
  MerkleTreeBranchDTOToJSON,
  MerkleTreeBranchDTOToJSONTyped,
} from './MerkleTreeBranchDTO.js';
import type { MerkleTreeBranchLinkDTO } from './MerkleTreeBranchLinkDTO.js';
import {
  MerkleTreeBranchLinkDTOFromJSON,
  MerkleTreeBranchLinkDTOFromJSONTyped,
  MerkleTreeBranchLinkDTOToJSON,
  MerkleTreeBranchLinkDTOToJSONTyped,
} from './MerkleTreeBranchLinkDTO.js';
import type { MerkleTreeLeafDTO } from './MerkleTreeLeafDTO.js';
import {
  MerkleTreeLeafDTOFromJSON,
  MerkleTreeLeafDTOFromJSONTyped,
  MerkleTreeLeafDTOToJSON,
  MerkleTreeLeafDTOToJSONTyped,
} from './MerkleTreeLeafDTO.js';
import type { MerkleTreeNodeTypeEnum } from './MerkleTreeNodeTypeEnum.js';
import {
  MerkleTreeNodeTypeEnumFromJSON,
  MerkleTreeNodeTypeEnumFromJSONTyped,
  MerkleTreeNodeTypeEnumToJSON,
  MerkleTreeNodeTypeEnumToJSONTyped,
} from './MerkleTreeNodeTypeEnum.js';

/**
 *
 * @export
 * @interface MerkleStateInfoDTOTreeInner
 */
export interface MerkleStateInfoDTOTreeInner {
  /**
   *
   * @type {MerkleTreeNodeTypeEnum}
   * @memberof MerkleStateInfoDTOTreeInner
   */
  type: MerkleTreeNodeTypeEnum;
  /**
   * Leaf path.
   * @type {string}
   * @memberof MerkleStateInfoDTOTreeInner
   */
  path: string;
  /**
   * Encoded leaf path.
   * @type {string}
   * @memberof MerkleStateInfoDTOTreeInner
   */
  encodedPath: string;
  /**
   * Nibble count.
   * @type {number}
   * @memberof MerkleStateInfoDTOTreeInner
   */
  nibbleCount: number;
  /**
   * Branch link bitmask.
   * @type {string}
   * @memberof MerkleStateInfoDTOTreeInner
   */
  linkMask: string;
  /**
   * Branch links (max 16).
   * @type {Array<MerkleTreeBranchLinkDTO>}
   * @memberof MerkleStateInfoDTOTreeInner
   */
  links: Array<MerkleTreeBranchLinkDTO>;
  /**
   *
   * @type {string}
   * @memberof MerkleStateInfoDTOTreeInner
   */
  branchHash: string;
  /**
   * Leaf value (sha256 hash).
   * @type {string}
   * @memberof MerkleStateInfoDTOTreeInner
   */
  value: string;
  /**
   *
   * @type {string}
   * @memberof MerkleStateInfoDTOTreeInner
   */
  leafHash: string;
}

/**
 * Check if a given object implements the MerkleStateInfoDTOTreeInner interface.
 */
export function instanceOfMerkleStateInfoDTOTreeInner(value: object): value is MerkleStateInfoDTOTreeInner {
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('path' in value) || value['path'] === undefined) return false;
  if (!('encodedPath' in value) || value['encodedPath'] === undefined) return false;
  if (!('nibbleCount' in value) || value['nibbleCount'] === undefined) return false;
  if (!('linkMask' in value) || value['linkMask'] === undefined) return false;
  if (!('links' in value) || value['links'] === undefined) return false;
  if (!('branchHash' in value) || value['branchHash'] === undefined) return false;
  if (!('value' in value) || value['value'] === undefined) return false;
  if (!('leafHash' in value) || value['leafHash'] === undefined) return false;
  return true;
}

export function MerkleStateInfoDTOTreeInnerFromJSON(json: any): MerkleStateInfoDTOTreeInner {
  return MerkleStateInfoDTOTreeInnerFromJSONTyped(json, false);
}

export function MerkleStateInfoDTOTreeInnerFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MerkleStateInfoDTOTreeInner {
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
    value: json['value'],
    leafHash: json['leafHash'],
  };
}

export function MerkleStateInfoDTOTreeInnerToJSON(json: any): MerkleStateInfoDTOTreeInner {
  return MerkleStateInfoDTOTreeInnerToJSONTyped(json, false);
}

export function MerkleStateInfoDTOTreeInnerToJSONTyped(
  value?: MerkleStateInfoDTOTreeInner | null,
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
    value: value['value'],
    leafHash: value['leafHash'],
  };
}
