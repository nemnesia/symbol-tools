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
 * * 0 - Unlinked.
 * * 1 - Balance-holding account that is linked to a remote harvester account.
 * * 2 - Remote harvester account that is linked to a balance-holding account.
 * * 3 - Remote harvester eligible account that is unlinked.
 *
 * @export
 */
export const AccountTypeEnum = {
  NUMBER_0: 0,
  NUMBER_1: 1,
  NUMBER_2: 2,
  NUMBER_3: 3,
} as const;
export type AccountTypeEnum = (typeof AccountTypeEnum)[keyof typeof AccountTypeEnum];

export function instanceOfAccountTypeEnum(value: any): boolean {
  for (const key in AccountTypeEnum) {
    if (Object.prototype.hasOwnProperty.call(AccountTypeEnum, key)) {
      if (AccountTypeEnum[key as keyof typeof AccountTypeEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function AccountTypeEnumFromJSON(json: any): AccountTypeEnum {
  return AccountTypeEnumFromJSONTyped(json, false);
}

export function AccountTypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountTypeEnum {
  return json as AccountTypeEnum;
}

export function AccountTypeEnumToJSON(value?: AccountTypeEnum | null): any {
  return value as any;
}

export function AccountTypeEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): AccountTypeEnum {
  return value as AccountTypeEnum;
}
