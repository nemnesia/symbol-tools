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
 * Type of account key:
 * * 0 - Unset.
 * * 1 - Linked account public key.
 * * 2 - Node public key on which remote is allowed to harvest.
 * * 4 - VRF public key.
 *
 * @export
 */
export const AccountKeyTypeFlagsEnum = {
  NUMBER_0: 0,
  NUMBER_1: 1,
  NUMBER_2: 2,
  NUMBER_4: 4,
} as const;
export type AccountKeyTypeFlagsEnum = (typeof AccountKeyTypeFlagsEnum)[keyof typeof AccountKeyTypeFlagsEnum];

export function instanceOfAccountKeyTypeFlagsEnum(value: any): boolean {
  for (const key in AccountKeyTypeFlagsEnum) {
    if (Object.prototype.hasOwnProperty.call(AccountKeyTypeFlagsEnum, key)) {
      if (AccountKeyTypeFlagsEnum[key as keyof typeof AccountKeyTypeFlagsEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function AccountKeyTypeFlagsEnumFromJSON(json: any): AccountKeyTypeFlagsEnum {
  return AccountKeyTypeFlagsEnumFromJSONTyped(json, false);
}

export function AccountKeyTypeFlagsEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountKeyTypeFlagsEnum {
  return json as AccountKeyTypeFlagsEnum;
}

export function AccountKeyTypeFlagsEnumToJSON(value?: AccountKeyTypeFlagsEnum | null): any {
  return value as any;
}

export function AccountKeyTypeFlagsEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): AccountKeyTypeFlagsEnum {
  return value as AccountKeyTypeFlagsEnum;
}
