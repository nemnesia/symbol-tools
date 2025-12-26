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
 * Type of mosaic restriction.
 * * 0 - Uninitialized value indicating no restriction.
 * * 1 (EQ) - Allow if equal.
 * * 2 (NE) - Allow if not equal.
 * * 3 (LT) - Allow if less than.
 * * 4 (LE) - Allow if less than or equal.
 * * 5 (GT) - Allow if greater than.
 * * 6 (GE) - Allow if greater than or equal.
 *
 * @export
 */
export const MosaicRestrictionTypeEnum = {
  NUMBER_0: 0,
  NUMBER_1: 1,
  NUMBER_2: 2,
  NUMBER_3: 3,
  NUMBER_4: 4,
  NUMBER_5: 5,
  NUMBER_6: 6,
} as const;
export type MosaicRestrictionTypeEnum = (typeof MosaicRestrictionTypeEnum)[keyof typeof MosaicRestrictionTypeEnum];

export function instanceOfMosaicRestrictionTypeEnum(value: any): boolean {
  for (const key in MosaicRestrictionTypeEnum) {
    if (Object.prototype.hasOwnProperty.call(MosaicRestrictionTypeEnum, key)) {
      if (MosaicRestrictionTypeEnum[key as keyof typeof MosaicRestrictionTypeEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function MosaicRestrictionTypeEnumFromJSON(json: any): MosaicRestrictionTypeEnum {
  return MosaicRestrictionTypeEnumFromJSONTyped(json, false);
}

export function MosaicRestrictionTypeEnumFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MosaicRestrictionTypeEnum {
  return json as MosaicRestrictionTypeEnum;
}

export function MosaicRestrictionTypeEnumToJSON(value?: MosaicRestrictionTypeEnum | null): any {
  return value as any;
}

export function MosaicRestrictionTypeEnumToJSONTyped(
  value: any,
  ignoreDiscriminator: boolean
): MosaicRestrictionTypeEnum {
  return value as MosaicRestrictionTypeEnum;
}
