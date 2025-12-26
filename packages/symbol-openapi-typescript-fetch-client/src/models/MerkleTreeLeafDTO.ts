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
import type { MerkleTreeNodeTypeEnum } from './MerkleTreeNodeTypeEnum.js';
import {
  MerkleTreeNodeTypeEnumFromJSON,
  MerkleTreeNodeTypeEnumFromJSONTyped,
  MerkleTreeNodeTypeEnumToJSON,
  MerkleTreeNodeTypeEnumToJSONTyped,
} from './MerkleTreeNodeTypeEnum.js';

/**
 * Merkle tree leaf node.
 * @export
 * @interface MerkleTreeLeafDTO
 */
export interface MerkleTreeLeafDTO {
  /**
   *
   * @type {MerkleTreeNodeTypeEnum}
   * @memberof MerkleTreeLeafDTO
   */
  type: MerkleTreeNodeTypeEnum;
  /**
   * Leaf path.
   * @type {string}
   * @memberof MerkleTreeLeafDTO
   */
  path: string;
  /**
   * Encoded leaf path.
   * @type {string}
   * @memberof MerkleTreeLeafDTO
   */
  encodedPath: string;
  /**
   * Nibble count.
   * @type {number}
   * @memberof MerkleTreeLeafDTO
   */
  nibbleCount: number;
  /**
   * Leaf value (sha256 hash).
   * @type {string}
   * @memberof MerkleTreeLeafDTO
   */
  value: string;
  /**
   *
   * @type {string}
   * @memberof MerkleTreeLeafDTO
   */
  leafHash: string;
}

/**
 * Check if a given object implements the MerkleTreeLeafDTO interface.
 */
export function instanceOfMerkleTreeLeafDTO(value: object): value is MerkleTreeLeafDTO {
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('path' in value) || value['path'] === undefined) return false;
  if (!('encodedPath' in value) || value['encodedPath'] === undefined) return false;
  if (!('nibbleCount' in value) || value['nibbleCount'] === undefined) return false;
  if (!('value' in value) || value['value'] === undefined) return false;
  if (!('leafHash' in value) || value['leafHash'] === undefined) return false;
  return true;
}

export function MerkleTreeLeafDTOFromJSON(json: any): MerkleTreeLeafDTO {
  return MerkleTreeLeafDTOFromJSONTyped(json, false);
}

export function MerkleTreeLeafDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MerkleTreeLeafDTO {
  if (json == null) {
    return json;
  }
  return {
    type: MerkleTreeNodeTypeEnumFromJSON(json['type']),
    path: json['path'],
    encodedPath: json['encodedPath'],
    nibbleCount: json['nibbleCount'],
    value: json['value'],
    leafHash: json['leafHash'],
  };
}

export function MerkleTreeLeafDTOToJSON(json: any): MerkleTreeLeafDTO {
  return MerkleTreeLeafDTOToJSONTyped(json, false);
}

export function MerkleTreeLeafDTOToJSONTyped(
  value?: MerkleTreeLeafDTO | null,
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
    value: value['value'],
    leafHash: value['leafHash'],
  };
}
