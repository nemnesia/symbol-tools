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
import type { MosaicGlobalRestrictionDTO } from './MosaicGlobalRestrictionDTO.js';
import {
    MosaicGlobalRestrictionDTOFromJSON,
    MosaicGlobalRestrictionDTOFromJSONTyped,
    MosaicGlobalRestrictionDTOToJSON,
    MosaicGlobalRestrictionDTOToJSONTyped,
} from './MosaicGlobalRestrictionDTO.js';
import type { MosaicAddressRestrictionDTO } from './MosaicAddressRestrictionDTO.js';
import {
    MosaicAddressRestrictionDTOFromJSON,
    MosaicAddressRestrictionDTOFromJSONTyped,
    MosaicAddressRestrictionDTOToJSON,
    MosaicAddressRestrictionDTOToJSONTyped,
} from './MosaicAddressRestrictionDTO.js';
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
 * @interface MosaicRestrictionsPageDataInner
 */
export interface MosaicRestrictionsPageDataInner {
    /**
     * Internal resource identifier.
     * @type {string}
     * @memberof MosaicRestrictionsPageDataInner
     */
    id: string;
    /**
     * 
     * @type {MosaicGlobalRestrictionEntryWrapperDTO}
     * @memberof MosaicRestrictionsPageDataInner
     */
    mosaicRestrictionEntry: MosaicGlobalRestrictionEntryWrapperDTO;
}

/**
 * Check if a given object implements the MosaicRestrictionsPageDataInner interface.
 */
export function instanceOfMosaicRestrictionsPageDataInner(value: object): value is MosaicRestrictionsPageDataInner {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('mosaicRestrictionEntry' in value) || value['mosaicRestrictionEntry'] === undefined) return false;
    return true;
}

export function MosaicRestrictionsPageDataInnerFromJSON(json: any): MosaicRestrictionsPageDataInner {
    return MosaicRestrictionsPageDataInnerFromJSONTyped(json, false);
}

export function MosaicRestrictionsPageDataInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicRestrictionsPageDataInner {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'mosaicRestrictionEntry': MosaicGlobalRestrictionEntryWrapperDTOFromJSON(json['mosaicRestrictionEntry']),
    };
}

export function MosaicRestrictionsPageDataInnerToJSON(json: any): MosaicRestrictionsPageDataInner {
    return MosaicRestrictionsPageDataInnerToJSONTyped(json, false);
}

export function MosaicRestrictionsPageDataInnerToJSONTyped(value?: MosaicRestrictionsPageDataInner | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'mosaicRestrictionEntry': MosaicGlobalRestrictionEntryWrapperDTOToJSON(value['mosaicRestrictionEntry']),
    };
}

