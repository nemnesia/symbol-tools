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
 * Algorithm used to hash the proof:
 * * 0 (Op_Sha3_256) - Proof is hashed using SHA3-256.
 * * 1 (Op_Hash_160) - Proof is hashed twice: first with SHA-256 and then with RIPEMD-160 (bitcoin's OP_HASH160).
 * * 2 (Op_Hash_256) - Proof is hashed twice with SHA3-256 (bitcoin's OP_HASH256).
 *
 * @export
 */
export const LockHashAlgorithmEnum = {
  NUMBER_0: 0,
  NUMBER_1: 1,
  NUMBER_2: 2,
} as const;
export type LockHashAlgorithmEnum = (typeof LockHashAlgorithmEnum)[keyof typeof LockHashAlgorithmEnum];

export function instanceOfLockHashAlgorithmEnum(value: any): boolean {
  for (const key in LockHashAlgorithmEnum) {
    if (Object.prototype.hasOwnProperty.call(LockHashAlgorithmEnum, key)) {
      if (LockHashAlgorithmEnum[key as keyof typeof LockHashAlgorithmEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function LockHashAlgorithmEnumFromJSON(json: any): LockHashAlgorithmEnum {
  return LockHashAlgorithmEnumFromJSONTyped(json, false);
}

export function LockHashAlgorithmEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): LockHashAlgorithmEnum {
  return json as LockHashAlgorithmEnum;
}

export function LockHashAlgorithmEnumToJSON(value?: LockHashAlgorithmEnum | null): any {
  return value as any;
}

export function LockHashAlgorithmEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): LockHashAlgorithmEnum {
  return value as LockHashAlgorithmEnum;
}
