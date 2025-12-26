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
 * Type of stage:
 * * 0 - Prevote.
 * * 1 - Precommit.
 * * 2 - Count.
 *
 * @export
 */
export const StageEnum = {
  NUMBER_0: 0,
  NUMBER_1: 1,
  NUMBER_2: 2,
} as const;
export type StageEnum = (typeof StageEnum)[keyof typeof StageEnum];

export function instanceOfStageEnum(value: any): boolean {
  for (const key in StageEnum) {
    if (Object.prototype.hasOwnProperty.call(StageEnum, key)) {
      if (StageEnum[key as keyof typeof StageEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function StageEnumFromJSON(json: any): StageEnum {
  return StageEnumFromJSONTyped(json, false);
}

export function StageEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): StageEnum {
  return json as StageEnum;
}

export function StageEnumToJSON(value?: StageEnum | null): any {
  return value as any;
}

export function StageEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): StageEnum {
  return value as StageEnum;
}
