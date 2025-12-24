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
 * - 0 - Mosaic address restriction.
 * - 1 - Mosaic global restriction.
 * 
 * @export
 */
export const MosaicRestrictionEntryTypeEnum = {
    NUMBER_0: 0,
    NUMBER_1: 1
} as const;
export type MosaicRestrictionEntryTypeEnum = typeof MosaicRestrictionEntryTypeEnum[keyof typeof MosaicRestrictionEntryTypeEnum];


export function instanceOfMosaicRestrictionEntryTypeEnum(value: any): boolean {
    for (const key in MosaicRestrictionEntryTypeEnum) {
        if (Object.prototype.hasOwnProperty.call(MosaicRestrictionEntryTypeEnum, key)) {
            if (MosaicRestrictionEntryTypeEnum[key as keyof typeof MosaicRestrictionEntryTypeEnum] === value) {
                return true;
            }
        }
    }
    return false;
}

export function MosaicRestrictionEntryTypeEnumFromJSON(json: any): MosaicRestrictionEntryTypeEnum {
    return MosaicRestrictionEntryTypeEnumFromJSONTyped(json, false);
}

export function MosaicRestrictionEntryTypeEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicRestrictionEntryTypeEnum {
    return json as MosaicRestrictionEntryTypeEnum;
}

export function MosaicRestrictionEntryTypeEnumToJSON(value?: MosaicRestrictionEntryTypeEnum | null): any {
    return value as any;
}

export function MosaicRestrictionEntryTypeEnumToJSONTyped(value: any, ignoreDiscriminator: boolean): MosaicRestrictionEntryTypeEnum {
    return value as MosaicRestrictionEntryTypeEnum;
}

