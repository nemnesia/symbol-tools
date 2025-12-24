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
import type { AliasTypeEnum } from './AliasTypeEnum.js';
import {
    AliasTypeEnumFromJSON,
    AliasTypeEnumFromJSONTyped,
    AliasTypeEnumToJSON,
    AliasTypeEnumToJSONTyped,
} from './AliasTypeEnum.js';

/**
 * 
 * @export
 * @interface AliasDTO
 */
export interface AliasDTO {
    /**
     * 
     * @type {AliasTypeEnum}
     * @memberof AliasDTO
     */
    type: AliasTypeEnum;
    /**
     * Mosaic identifier.
     * @type {string}
     * @memberof AliasDTO
     */
    mosaicId?: string;
    /**
     * Address encoded using a 32-character set.
     * @type {string}
     * @memberof AliasDTO
     */
    address?: string;
}



/**
 * Check if a given object implements the AliasDTO interface.
 */
export function instanceOfAliasDTO(value: object): value is AliasDTO {
    if (!('type' in value) || value['type'] === undefined) return false;
    return true;
}

export function AliasDTOFromJSON(json: any): AliasDTO {
    return AliasDTOFromJSONTyped(json, false);
}

export function AliasDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AliasDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'type': AliasTypeEnumFromJSON(json['type']),
        'mosaicId': json['mosaicId'] == null ? undefined : json['mosaicId'],
        'address': json['address'] == null ? undefined : json['address'],
    };
}

export function AliasDTOToJSON(json: any): AliasDTO {
    return AliasDTOToJSONTyped(json, false);
}

export function AliasDTOToJSONTyped(value?: AliasDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'type': AliasTypeEnumToJSON(value['type']),
        'mosaicId': value['mosaicId'],
        'address': value['address'],
    };
}

