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
import type { MosaicDTO } from './MosaicDTO.js';
import {
    MosaicDTOFromJSON,
    MosaicDTOFromJSONTyped,
    MosaicDTOToJSON,
    MosaicDTOToJSONTyped,
} from './MosaicDTO.js';

/**
 * 
 * @export
 * @interface MosaicInfoDTO
 */
export interface MosaicInfoDTO {
    /**
     * Internal resource identifier.
     * @type {string}
     * @memberof MosaicInfoDTO
     */
    id: string;
    /**
     * 
     * @type {MosaicDTO}
     * @memberof MosaicInfoDTO
     */
    mosaic: MosaicDTO;
}

/**
 * Check if a given object implements the MosaicInfoDTO interface.
 */
export function instanceOfMosaicInfoDTO(value: object): value is MosaicInfoDTO {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('mosaic' in value) || value['mosaic'] === undefined) return false;
    return true;
}

export function MosaicInfoDTOFromJSON(json: any): MosaicInfoDTO {
    return MosaicInfoDTOFromJSONTyped(json, false);
}

export function MosaicInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicInfoDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'mosaic': MosaicDTOFromJSON(json['mosaic']),
    };
}

export function MosaicInfoDTOToJSON(json: any): MosaicInfoDTO {
    return MosaicInfoDTOToJSONTyped(json, false);
}

export function MosaicInfoDTOToJSONTyped(value?: MosaicInfoDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'mosaic': MosaicDTOToJSON(value['mosaic']),
    };
}

