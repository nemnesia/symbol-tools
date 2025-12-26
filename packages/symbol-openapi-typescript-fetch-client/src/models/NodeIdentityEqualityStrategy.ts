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
 * Node equality strategy. Defines if the identifier for the node must be its public key or host.
 *
 * @export
 */
export const NodeIdentityEqualityStrategy = {
  Host: 'host',
  PublicKey: 'public-key',
} as const;
export type NodeIdentityEqualityStrategy =
  (typeof NodeIdentityEqualityStrategy)[keyof typeof NodeIdentityEqualityStrategy];

export function instanceOfNodeIdentityEqualityStrategy(value: any): boolean {
  for (const key in NodeIdentityEqualityStrategy) {
    if (Object.prototype.hasOwnProperty.call(NodeIdentityEqualityStrategy, key)) {
      if (NodeIdentityEqualityStrategy[key as keyof typeof NodeIdentityEqualityStrategy] === value) {
        return true;
      }
    }
  }
  return false;
}

export function NodeIdentityEqualityStrategyFromJSON(json: any): NodeIdentityEqualityStrategy {
  return NodeIdentityEqualityStrategyFromJSONTyped(json, false);
}

export function NodeIdentityEqualityStrategyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): NodeIdentityEqualityStrategy {
  return json as NodeIdentityEqualityStrategy;
}

export function NodeIdentityEqualityStrategyToJSON(value?: NodeIdentityEqualityStrategy | null): any {
  return value as any;
}

export function NodeIdentityEqualityStrategyToJSONTyped(
  value: any,
  ignoreDiscriminator: boolean
): NodeIdentityEqualityStrategy {
  return value as NodeIdentityEqualityStrategy;
}
