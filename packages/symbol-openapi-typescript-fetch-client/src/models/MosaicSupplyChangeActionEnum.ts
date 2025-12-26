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
 * Direction of the supply change:
 * * 0  - Decrease.
 * * 1  - Increase.
 *
 * @export
 */
export const MosaicSupplyChangeActionEnum = {
  NUMBER_0: 0,
  NUMBER_1: 1,
} as const;
export type MosaicSupplyChangeActionEnum =
  (typeof MosaicSupplyChangeActionEnum)[keyof typeof MosaicSupplyChangeActionEnum];

export function instanceOfMosaicSupplyChangeActionEnum(value: any): boolean {
  for (const key in MosaicSupplyChangeActionEnum) {
    if (Object.prototype.hasOwnProperty.call(MosaicSupplyChangeActionEnum, key)) {
      if (MosaicSupplyChangeActionEnum[key as keyof typeof MosaicSupplyChangeActionEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function MosaicSupplyChangeActionEnumFromJSON(json: any): MosaicSupplyChangeActionEnum {
  return MosaicSupplyChangeActionEnumFromJSONTyped(json, false);
}

export function MosaicSupplyChangeActionEnumFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MosaicSupplyChangeActionEnum {
  return json as MosaicSupplyChangeActionEnum;
}

export function MosaicSupplyChangeActionEnumToJSON(value?: MosaicSupplyChangeActionEnum | null): any {
  return value as any;
}

export function MosaicSupplyChangeActionEnumToJSONTyped(
  value: any,
  ignoreDiscriminator: boolean
): MosaicSupplyChangeActionEnum {
  return value as MosaicSupplyChangeActionEnum;
}
