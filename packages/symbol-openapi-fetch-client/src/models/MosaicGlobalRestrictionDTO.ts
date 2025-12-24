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
import type { MosaicGlobalRestrictionEntryWrapperDTO } from './MosaicGlobalRestrictionEntryWrapperDTO.js';
import {
    MosaicGlobalRestrictionEntryWrapperDTOFromJSON,
    MosaicGlobalRestrictionEntryWrapperDTOFromJSONTyped,
    MosaicGlobalRestrictionEntryWrapperDTOToJSON,
    MosaicGlobalRestrictionEntryWrapperDTOToJSONTyped,
} from './MosaicGlobalRestrictionEntryWrapperDTO.js';

/**
 * 
 * @export
 * @interface MosaicGlobalRestrictionDTO
 */
export interface MosaicGlobalRestrictionDTO {
    /**
     * Internal resource identifier.
     * @type {string}
     * @memberof MosaicGlobalRestrictionDTO
     */
    id: string;
    /**
     * 
     * @type {MosaicGlobalRestrictionEntryWrapperDTO}
     * @memberof MosaicGlobalRestrictionDTO
     */
    mosaicRestrictionEntry: MosaicGlobalRestrictionEntryWrapperDTO;
}

/**
 * Check if a given object implements the MosaicGlobalRestrictionDTO interface.
 */
export function instanceOfMosaicGlobalRestrictionDTO(value: object): value is MosaicGlobalRestrictionDTO {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('mosaicRestrictionEntry' in value) || value['mosaicRestrictionEntry'] === undefined) return false;
    return true;
}

export function MosaicGlobalRestrictionDTOFromJSON(json: any): MosaicGlobalRestrictionDTO {
    return MosaicGlobalRestrictionDTOFromJSONTyped(json, false);
}

export function MosaicGlobalRestrictionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicGlobalRestrictionDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'mosaicRestrictionEntry': MosaicGlobalRestrictionEntryWrapperDTOFromJSON(json['mosaicRestrictionEntry']),
    };
}

export function MosaicGlobalRestrictionDTOToJSON(json: any): MosaicGlobalRestrictionDTO {
    return MosaicGlobalRestrictionDTOToJSONTyped(json, false);
}

export function MosaicGlobalRestrictionDTOToJSONTyped(value?: MosaicGlobalRestrictionDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'mosaicRestrictionEntry': MosaicGlobalRestrictionEntryWrapperDTOToJSON(value['mosaicRestrictionEntry']),
    };
}

