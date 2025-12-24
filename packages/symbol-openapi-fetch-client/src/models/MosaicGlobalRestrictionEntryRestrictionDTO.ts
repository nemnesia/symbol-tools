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

import { mapValues } from '../runtime.js';
import type { MosaicRestrictionTypeEnum } from './MosaicRestrictionTypeEnum.js';
import {
    MosaicRestrictionTypeEnumFromJSON,
    MosaicRestrictionTypeEnumFromJSONTyped,
    MosaicRestrictionTypeEnumToJSON,
    MosaicRestrictionTypeEnumToJSONTyped,
} from './MosaicRestrictionTypeEnum.js';

/**
 * 
 * @export
 * @interface MosaicGlobalRestrictionEntryRestrictionDTO
 */
export interface MosaicGlobalRestrictionEntryRestrictionDTO {
    /**
     * Mosaic identifier.
     * @type {string}
     * @memberof MosaicGlobalRestrictionEntryRestrictionDTO
     */
    referenceMosaicId: string;
    /**
     * Restriction value.
     * @type {string}
     * @memberof MosaicGlobalRestrictionEntryRestrictionDTO
     */
    restrictionValue: string;
    /**
     * 
     * @type {MosaicRestrictionTypeEnum}
     * @memberof MosaicGlobalRestrictionEntryRestrictionDTO
     */
    restrictionType: MosaicRestrictionTypeEnum;
}



/**
 * Check if a given object implements the MosaicGlobalRestrictionEntryRestrictionDTO interface.
 */
export function instanceOfMosaicGlobalRestrictionEntryRestrictionDTO(value: object): value is MosaicGlobalRestrictionEntryRestrictionDTO {
    if (!('referenceMosaicId' in value) || value['referenceMosaicId'] === undefined) return false;
    if (!('restrictionValue' in value) || value['restrictionValue'] === undefined) return false;
    if (!('restrictionType' in value) || value['restrictionType'] === undefined) return false;
    return true;
}

export function MosaicGlobalRestrictionEntryRestrictionDTOFromJSON(json: any): MosaicGlobalRestrictionEntryRestrictionDTO {
    return MosaicGlobalRestrictionEntryRestrictionDTOFromJSONTyped(json, false);
}

export function MosaicGlobalRestrictionEntryRestrictionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicGlobalRestrictionEntryRestrictionDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'referenceMosaicId': json['referenceMosaicId'],
        'restrictionValue': json['restrictionValue'],
        'restrictionType': MosaicRestrictionTypeEnumFromJSON(json['restrictionType']),
    };
}

export function MosaicGlobalRestrictionEntryRestrictionDTOToJSON(json: any): MosaicGlobalRestrictionEntryRestrictionDTO {
    return MosaicGlobalRestrictionEntryRestrictionDTOToJSONTyped(json, false);
}

export function MosaicGlobalRestrictionEntryRestrictionDTOToJSONTyped(value?: MosaicGlobalRestrictionEntryRestrictionDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'referenceMosaicId': value['referenceMosaicId'],
        'restrictionValue': value['restrictionValue'],
        'restrictionType': MosaicRestrictionTypeEnumToJSON(value['restrictionType']),
    };
}

