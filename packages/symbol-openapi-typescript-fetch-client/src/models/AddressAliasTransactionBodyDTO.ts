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
 * @interface AddressAliasTransactionBodyDTO
 */
export interface AddressAliasTransactionBodyDTO {
    /**
     * Namespace identifier.
     * @type {string}
     * @memberof AddressAliasTransactionBodyDTO
     */
    namespaceId: string;
    /**
     * Address encoded using a 32-character set.
     * @type {string}
     * @memberof AddressAliasTransactionBodyDTO
     */
    address: string;
    /**
     * 
     * @type {AliasActionEnum}
     * @memberof AddressAliasTransactionBodyDTO
     */
    aliasAction: AliasActionEnum;
}



/**
 * Check if a given object implements the AddressAliasTransactionBodyDTO interface.
 */
export function instanceOfAddressAliasTransactionBodyDTO(value: object): value is AddressAliasTransactionBodyDTO {
    if (!('namespaceId' in value) || value['namespaceId'] === undefined) return false;
    if (!('address' in value) || value['address'] === undefined) return false;
    if (!('aliasAction' in value) || value['aliasAction'] === undefined) return false;
    return true;
}

export function AddressAliasTransactionBodyDTOFromJSON(json: any): AddressAliasTransactionBodyDTO {
    return AddressAliasTransactionBodyDTOFromJSONTyped(json, false);
}

export function AddressAliasTransactionBodyDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddressAliasTransactionBodyDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'namespaceId': json['namespaceId'],
        'address': json['address'],
        'aliasAction': AliasActionEnumFromJSON(json['aliasAction']),
    };
}

export function AddressAliasTransactionBodyDTOToJSON(json: any): AddressAliasTransactionBodyDTO {
    return AddressAliasTransactionBodyDTOToJSONTyped(json, false);
}

export function AddressAliasTransactionBodyDTOToJSONTyped(value?: AddressAliasTransactionBodyDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'namespaceId': value['namespaceId'],
        'address': value['address'],
        'aliasAction': AliasActionEnumToJSON(value['aliasAction']),
    };
}

