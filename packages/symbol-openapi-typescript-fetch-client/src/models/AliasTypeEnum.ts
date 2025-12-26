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
 * Type of alias:
 * * 0 - No alias.
 * * 1 - Mosaic id alias.
 * * 2 - Addres alias.
 *
 * @export
 */
export const AliasTypeEnum = {
  NUMBER_0: 0,
  NUMBER_1: 1,
  NUMBER_2: 2,
} as const;
export type AliasTypeEnum = (typeof AliasTypeEnum)[keyof typeof AliasTypeEnum];

export function instanceOfAliasTypeEnum(value: any): boolean {
  for (const key in AliasTypeEnum) {
    if (Object.prototype.hasOwnProperty.call(AliasTypeEnum, key)) {
      if (AliasTypeEnum[key as keyof typeof AliasTypeEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function AliasTypeEnumFromJSON(json: any): AliasTypeEnum {
  return AliasTypeEnumFromJSONTyped(json, false);
}

export function AliasTypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): AliasTypeEnum {
  return json as AliasTypeEnum;
}

export function AliasTypeEnumToJSON(value?: AliasTypeEnum | null): any {
  return value as any;
}

export function AliasTypeEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): AliasTypeEnum {
  return value as AliasTypeEnum;
}
