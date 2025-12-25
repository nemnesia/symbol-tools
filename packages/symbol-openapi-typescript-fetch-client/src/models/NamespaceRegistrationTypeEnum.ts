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
 * Type of namespace:
 * * 0 - Root namespace.
 * * 1 - Subnamespace.
 * 
 * @export
 */
export const NamespaceRegistrationTypeEnum = {
    NUMBER_0: 0,
    NUMBER_1: 1
} as const;
export type NamespaceRegistrationTypeEnum = typeof NamespaceRegistrationTypeEnum[keyof typeof NamespaceRegistrationTypeEnum];


export function instanceOfNamespaceRegistrationTypeEnum(value: any): boolean {
    for (const key in NamespaceRegistrationTypeEnum) {
        if (Object.prototype.hasOwnProperty.call(NamespaceRegistrationTypeEnum, key)) {
            if (NamespaceRegistrationTypeEnum[key as keyof typeof NamespaceRegistrationTypeEnum] === value) {
                return true;
            }
        }
    }
    return false;
}

export function NamespaceRegistrationTypeEnumFromJSON(json: any): NamespaceRegistrationTypeEnum {
    return NamespaceRegistrationTypeEnumFromJSONTyped(json, false);
}

export function NamespaceRegistrationTypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): NamespaceRegistrationTypeEnum {
    return json as NamespaceRegistrationTypeEnum;
}

export function NamespaceRegistrationTypeEnumToJSON(value?: NamespaceRegistrationTypeEnum | null): any {
    return value as any;
}

export function NamespaceRegistrationTypeEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): NamespaceRegistrationTypeEnum {
    return value as NamespaceRegistrationTypeEnum;
}

