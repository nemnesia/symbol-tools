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

/**
 * Type of Merkle tree node:
 * * 0 - Branch node.
 * * 255 - Leaf node.
 *
 * @export
 */
export const MerkleTreeNodeTypeEnum = {
  NUMBER_0: 0,
  NUMBER_255: 255,
} as const;
export type MerkleTreeNodeTypeEnum = (typeof MerkleTreeNodeTypeEnum)[keyof typeof MerkleTreeNodeTypeEnum];

export function instanceOfMerkleTreeNodeTypeEnum(value: any): boolean {
  for (const key in MerkleTreeNodeTypeEnum) {
    if (Object.prototype.hasOwnProperty.call(MerkleTreeNodeTypeEnum, key)) {
      if (MerkleTreeNodeTypeEnum[key as keyof typeof MerkleTreeNodeTypeEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function MerkleTreeNodeTypeEnumFromJSON(json: any): MerkleTreeNodeTypeEnum {
  return MerkleTreeNodeTypeEnumFromJSONTyped(json, false);
}

export function MerkleTreeNodeTypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): MerkleTreeNodeTypeEnum {
  return json as MerkleTreeNodeTypeEnum;
}

export function MerkleTreeNodeTypeEnumToJSON(value?: MerkleTreeNodeTypeEnum | null): any {
  return value as any;
}

export function MerkleTreeNodeTypeEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): MerkleTreeNodeTypeEnum {
  return value as MerkleTreeNodeTypeEnum;
}
