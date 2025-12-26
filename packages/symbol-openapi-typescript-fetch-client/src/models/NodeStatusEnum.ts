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
export const NodeStatusEnum = {
  Up: 'up',
  Down: 'down',
} as const;
export type NodeStatusEnum = (typeof NodeStatusEnum)[keyof typeof NodeStatusEnum];

export function instanceOfNodeStatusEnum(value: any): boolean {
  for (const key in NodeStatusEnum) {
    if (Object.prototype.hasOwnProperty.call(NodeStatusEnum, key)) {
      if (NodeStatusEnum[key as keyof typeof NodeStatusEnum] === value) {
        return true;
      }
    }
  }
  return false;
}

export function NodeStatusEnumFromJSON(json: any): NodeStatusEnum {
  return NodeStatusEnumFromJSONTyped(json, false);
}

export function NodeStatusEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): NodeStatusEnum {
  return json as NodeStatusEnum;
}

export function NodeStatusEnumToJSON(value?: NodeStatusEnum | null): any {
  return value as any;
}

export function NodeStatusEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): NodeStatusEnum {
  return value as NodeStatusEnum;
}
