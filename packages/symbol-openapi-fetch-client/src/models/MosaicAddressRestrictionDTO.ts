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
import type { MosaicAddressRestrictionEntryWrapperDTO } from './MosaicAddressRestrictionEntryWrapperDTO.js';
import {
    MosaicAddressRestrictionEntryWrapperDTOFromJSON,
    MosaicAddressRestrictionEntryWrapperDTOFromJSONTyped,
    MosaicAddressRestrictionEntryWrapperDTOToJSON,
    MosaicAddressRestrictionEntryWrapperDTOToJSONTyped,
} from './MosaicAddressRestrictionEntryWrapperDTO.js';

/**
 * 
 * @export
 * @interface MosaicAddressRestrictionDTO
 */
export interface MosaicAddressRestrictionDTO {
    /**
     * Internal resource identifier.
     * @type {string}
     * @memberof MosaicAddressRestrictionDTO
     */
    id: string;
    /**
     * 
     * @type {MosaicAddressRestrictionEntryWrapperDTO}
     * @memberof MosaicAddressRestrictionDTO
     */
    mosaicRestrictionEntry: MosaicAddressRestrictionEntryWrapperDTO;
}

/**
 * Check if a given object implements the MosaicAddressRestrictionDTO interface.
 */
export function instanceOfMosaicAddressRestrictionDTO(value: object): value is MosaicAddressRestrictionDTO {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('mosaicRestrictionEntry' in value) || value['mosaicRestrictionEntry'] === undefined) return false;
    return true;
}

export function MosaicAddressRestrictionDTOFromJSON(json: any): MosaicAddressRestrictionDTO {
    return MosaicAddressRestrictionDTOFromJSONTyped(json, false);
}

export function MosaicAddressRestrictionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicAddressRestrictionDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'mosaicRestrictionEntry': MosaicAddressRestrictionEntryWrapperDTOFromJSON(json['mosaicRestrictionEntry']),
    };
}

export function MosaicAddressRestrictionDTOToJSON(json: any): MosaicAddressRestrictionDTO {
    return MosaicAddressRestrictionDTOToJSONTyped(json, false);
}

export function MosaicAddressRestrictionDTOToJSONTyped(value?: MosaicAddressRestrictionDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'mosaicRestrictionEntry': MosaicAddressRestrictionEntryWrapperDTOToJSON(value['mosaicRestrictionEntry']),
    };
}

