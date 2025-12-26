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
export const AccountOrderByEnum = {
  Id: 'id',
  Balance: 'balance',
} as const;
export type AccountOrderByEnum = (typeof AccountOrderByEnum)[keyof typeof AccountOrderByEnum];

export function instanceOfAccountOrderByEnum(value: any): boolean {
  for (const key in AccountOrderByEnum) {
    if (Object.prototype.hasOwnProperty.call(AccountOrderByEnum, key)) {
      if (AccountOrderByEnum[key as keyof typeof AccountOrderByEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function AccountOrderByEnumFromJSON(json: any): AccountOrderByEnum {
  return AccountOrderByEnumFromJSONTyped(json, false);
}

export function AccountOrderByEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountOrderByEnum {
  return json as AccountOrderByEnum;
}

export function AccountOrderByEnumToJSON(value?: AccountOrderByEnum | null): any {
  return value as any;
}

export function AccountOrderByEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): AccountOrderByEnum {
  return value as AccountOrderByEnum;
}
