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
import type { AliasActionEnum } from './AliasActionEnum.js';
import {
    AliasActionEnumFromJSON,
    AliasActionEnumFromJSONTyped,
    AliasActionEnumToJSON,
    AliasActionEnumToJSONTyped,
} from './AliasActionEnum.js';

/**
 * 
 * @export
 * @interface MosaicAliasTransactionBodyDTO
 */
export interface MosaicAliasTransactionBodyDTO {
    /**
     * Namespace identifier.
     * @type {string}
     * @memberof MosaicAliasTransactionBodyDTO
     */
    namespaceId: string;
    /**
     * Mosaic identifier.
     * @type {string}
     * @memberof MosaicAliasTransactionBodyDTO
     */
    mosaicId: string;
    /**
     * 
     * @type {AliasActionEnum}
     * @memberof MosaicAliasTransactionBodyDTO
     */
    aliasAction: AliasActionEnum;
}



/**
 * Check if a given object implements the MosaicAliasTransactionBodyDTO interface.
 */
export function instanceOfMosaicAliasTransactionBodyDTO(value: object): value is MosaicAliasTransactionBodyDTO {
    if (!('namespaceId' in value) || value['namespaceId'] === undefined) return false;
    if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
    if (!('aliasAction' in value) || value['aliasAction'] === undefined) return false;
    return true;
}

export function MosaicAliasTransactionBodyDTOFromJSON(json: any): MosaicAliasTransactionBodyDTO {
    return MosaicAliasTransactionBodyDTOFromJSONTyped(json, false);
}

export function MosaicAliasTransactionBodyDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicAliasTransactionBodyDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'namespaceId': json['namespaceId'],
        'mosaicId': json['mosaicId'],
        'aliasAction': AliasActionEnumFromJSON(json['aliasAction']),
    };
}

export function MosaicAliasTransactionBodyDTOToJSON(json: any): MosaicAliasTransactionBodyDTO {
    return MosaicAliasTransactionBodyDTOToJSONTyped(json, false);
}

export function MosaicAliasTransactionBodyDTOToJSONTyped(value?: MosaicAliasTransactionBodyDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'namespaceId': value['namespaceId'],
        'mosaicId': value['mosaicId'],
        'aliasAction': AliasActionEnumToJSON(value['aliasAction']),
    };
}

