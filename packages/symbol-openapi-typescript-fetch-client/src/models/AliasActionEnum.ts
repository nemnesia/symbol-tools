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
 * Alias action:
 * * 0 - Unlink alias.
 * * 1 - Link alias.
 *
 * @export
 */
export const AliasActionEnum = {
  NUMBER_0: 0,
  NUMBER_1: 1,
} as const;
export type AliasActionEnum = (typeof AliasActionEnum)[keyof typeof AliasActionEnum];

export function instanceOfAliasActionEnum(value: any): boolean {
  for (const key in AliasActionEnum) {
    if (Object.prototype.hasOwnProperty.call(AliasActionEnum, key)) {
      if (AliasActionEnum[key as keyof typeof AliasActionEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function AliasActionEnumFromJSON(json: any): AliasActionEnum {
  return AliasActionEnumFromJSONTyped(json, false);
}

export function AliasActionEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): AliasActionEnum {
  return json as AliasActionEnum;
}

export function AliasActionEnumToJSON(value?: AliasActionEnum | null): any {
  return value as any;
}

export function AliasActionEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): AliasActionEnum {
  return value as AliasActionEnum;
}
