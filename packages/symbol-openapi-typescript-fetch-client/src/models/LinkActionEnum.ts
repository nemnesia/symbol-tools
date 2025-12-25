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
 * Type of action:
 * * 0 - Unlink.
 * * 1 - Link.
 * 
 * @export
 */
export const LinkActionEnum = {
    NUMBER_0: 0,
    NUMBER_1: 1
} as const;
export type LinkActionEnum = typeof LinkActionEnum[keyof typeof LinkActionEnum];


export function instanceOfLinkActionEnum(value: any): boolean {
    for (const key in LinkActionEnum) {
        if (Object.prototype.hasOwnProperty.call(LinkActionEnum, key)) {
            if (LinkActionEnum[key as keyof typeof LinkActionEnum] === value) {
                return true;
            }
        }
    }
    return false;
}

export function LinkActionEnumFromJSON(json: any): LinkActionEnum {
    return LinkActionEnumFromJSONTyped(json, false);
}

export function LinkActionEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): LinkActionEnum {
    return json as LinkActionEnum;
}

export function LinkActionEnumToJSON(value?: LinkActionEnum | null): any {
    return value as any;
}

export function LinkActionEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): LinkActionEnum {
    return value as LinkActionEnum;
}

