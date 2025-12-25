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
 * Position relative to the proofHash being evaluated.
 * @export
 */
export const PositionEnum = {
    Left: 'left',
    Right: 'right'
} as const;
export type PositionEnum = typeof PositionEnum[keyof typeof PositionEnum];


export function instanceOfPositionEnum(value: any): boolean {
    for (const key in PositionEnum) {
        if (Object.prototype.hasOwnProperty.call(PositionEnum, key)) {
            if (PositionEnum[key as keyof typeof PositionEnum] === value) {
                return true;
            }
        }
    }
    return false;
}

export function PositionEnumFromJSON(json: any): PositionEnum {
    return PositionEnumFromJSONTyped(json, false);
}

export function PositionEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): PositionEnum {
    return json as PositionEnum;
}

export function PositionEnumToJSON(value?: PositionEnum | null): any {
    return value as any;
}

export function PositionEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): PositionEnum {
    return value as PositionEnum;
}

