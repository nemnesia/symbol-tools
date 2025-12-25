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
 * Metadata type:
 * * 0 - Account.
 * * 1 - Mosaic.
 * * 2 - Namespace.
 * 
 * @export
 */
export const MetadataTypeEnum = {
    NUMBER_0: 0,
    NUMBER_1: 1,
    NUMBER_2: 2
} as const;
export type MetadataTypeEnum = typeof MetadataTypeEnum[keyof typeof MetadataTypeEnum];


export function instanceOfMetadataTypeEnum(value: any): boolean {
    for (const key in MetadataTypeEnum) {
        if (Object.prototype.hasOwnProperty.call(MetadataTypeEnum, key)) {
            if (MetadataTypeEnum[key as keyof typeof MetadataTypeEnum] === value) {
                return true;
            }
        }
    }
    return false;
}

export function MetadataTypeEnumFromJSON(json: any): MetadataTypeEnum {
    return MetadataTypeEnumFromJSONTyped(json, false);
}

export function MetadataTypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetadataTypeEnum {
    return json as MetadataTypeEnum;
}

export function MetadataTypeEnumToJSON(value?: MetadataTypeEnum | null): any {
    return value as any;
}

export function MetadataTypeEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): MetadataTypeEnum {
    return value as MetadataTypeEnum;
}

