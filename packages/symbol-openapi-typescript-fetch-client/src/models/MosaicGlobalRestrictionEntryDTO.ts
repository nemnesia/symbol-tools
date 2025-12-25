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
import type { MosaicGlobalRestrictionEntryRestrictionDTO } from './MosaicGlobalRestrictionEntryRestrictionDTO.js';
import {
    MosaicGlobalRestrictionEntryRestrictionDTOFromJSON,
    MosaicGlobalRestrictionEntryRestrictionDTOFromJSONTyped,
    MosaicGlobalRestrictionEntryRestrictionDTOToJSON,
    MosaicGlobalRestrictionEntryRestrictionDTOToJSONTyped,
} from './MosaicGlobalRestrictionEntryRestrictionDTO.js';

/**
 * 
 * @export
 * @interface MosaicGlobalRestrictionEntryDTO
 */
export interface MosaicGlobalRestrictionEntryDTO {
    /**
     * Restriction key.
     * @type {string}
     * @memberof MosaicGlobalRestrictionEntryDTO
     */
    key: string;
    /**
     * 
     * @type {MosaicGlobalRestrictionEntryRestrictionDTO}
     * @memberof MosaicGlobalRestrictionEntryDTO
     */
    restriction: MosaicGlobalRestrictionEntryRestrictionDTO;
}

/**
 * Check if a given object implements the MosaicGlobalRestrictionEntryDTO interface.
 */
export function instanceOfMosaicGlobalRestrictionEntryDTO(value: object): value is MosaicGlobalRestrictionEntryDTO {
    if (!('key' in value) || value['key'] === undefined) return false;
    if (!('restriction' in value) || value['restriction'] === undefined) return false;
    return true;
}

export function MosaicGlobalRestrictionEntryDTOFromJSON(json: any): MosaicGlobalRestrictionEntryDTO {
    return MosaicGlobalRestrictionEntryDTOFromJSONTyped(json, false);
}

export function MosaicGlobalRestrictionEntryDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicGlobalRestrictionEntryDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'key': json['key'],
        'restriction': MosaicGlobalRestrictionEntryRestrictionDTOFromJSON(json['restriction']),
    };
}

export function MosaicGlobalRestrictionEntryDTOToJSON(json: any): MosaicGlobalRestrictionEntryDTO {
    return MosaicGlobalRestrictionEntryDTOToJSONTyped(json, false);
}

export function MosaicGlobalRestrictionEntryDTOToJSONTyped(value?: MosaicGlobalRestrictionEntryDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'key': value['key'],
        'restriction': MosaicGlobalRestrictionEntryRestrictionDTOToJSON(value['restriction']),
    };
}

