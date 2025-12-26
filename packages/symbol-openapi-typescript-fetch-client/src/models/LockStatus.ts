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
 * Possible status of lock states:
 * * 0 - UNUSED.
 * * 1 - USED.
 *
 * @export
 */
export const LockStatus = {
  NUMBER_0: 0,
  NUMBER_1: 1,
} as const;
export type LockStatus = (typeof LockStatus)[keyof typeof LockStatus];

export function instanceOfLockStatus(value: any): boolean {
  for (const key in LockStatus) {
    if (Object.prototype.hasOwnProperty.call(LockStatus, key)) {
      if (LockStatus[key as keyof typeof LockStatus] === value) {
        return true;
      }
    }
  }
  return false;
}

export function LockStatusFromJSON(json: any): LockStatus {
  return LockStatusFromJSONTyped(json, false);
}

export function LockStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): LockStatus {
  return json as LockStatus;
}

export function LockStatusToJSON(value?: LockStatus | null): any {
  return value as any;
}

export function LockStatusToJSONTyped(value: any, ignoreDiscriminator: boolean): LockStatus {
  return value as LockStatus;
}
