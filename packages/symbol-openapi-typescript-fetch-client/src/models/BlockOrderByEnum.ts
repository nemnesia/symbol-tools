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
 *
 * @export
 */
export const BlockOrderByEnum = {
  Id: 'id',
  Height: 'height',
} as const;
export type BlockOrderByEnum = (typeof BlockOrderByEnum)[keyof typeof BlockOrderByEnum];

export function instanceOfBlockOrderByEnum(value: any): boolean {
  for (const key in BlockOrderByEnum) {
    if (Object.prototype.hasOwnProperty.call(BlockOrderByEnum, key)) {
      if (BlockOrderByEnum[key as keyof typeof BlockOrderByEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function BlockOrderByEnumFromJSON(json: any): BlockOrderByEnum {
  return BlockOrderByEnumFromJSONTyped(json, false);
}

export function BlockOrderByEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlockOrderByEnum {
  return json as BlockOrderByEnum;
}

export function BlockOrderByEnumToJSON(value?: BlockOrderByEnum | null): any {
  return value as any;
}

export function BlockOrderByEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): BlockOrderByEnum {
  return value as BlockOrderByEnum;
}
