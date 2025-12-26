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
 * Network type:
 * * 0x68 (104 decimal) - Main network.
 * * 0x98 (152 decimal) - Test network.
 *
 * @export
 */
export const NetworkTypeEnum = {
  NUMBER_104: 104,
  NUMBER_152: 152,
} as const;
export type NetworkTypeEnum = (typeof NetworkTypeEnum)[keyof typeof NetworkTypeEnum];

export function instanceOfNetworkTypeEnum(value: any): boolean {
  for (const key in NetworkTypeEnum) {
    if (Object.prototype.hasOwnProperty.call(NetworkTypeEnum, key)) {
      if (NetworkTypeEnum[key as keyof typeof NetworkTypeEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function NetworkTypeEnumFromJSON(json: any): NetworkTypeEnum {
  return NetworkTypeEnumFromJSONTyped(json, false);
}

export function NetworkTypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): NetworkTypeEnum {
  return json as NetworkTypeEnum;
}

export function NetworkTypeEnumToJSON(value?: NetworkTypeEnum | null): any {
  return value as any;
}

export function NetworkTypeEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): NetworkTypeEnum {
  return value as NetworkTypeEnum;
}
