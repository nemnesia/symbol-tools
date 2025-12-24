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
/**
 * 
 * @export
 * @interface AccountNamesDTO
 */
export interface AccountNamesDTO {
    /**
     * Address encoded using a 32-character set.
     * @type {string}
     * @memberof AccountNamesDTO
     */
    address: string;
    /**
     * Account linked namespace names.
     * @type {Array<string>}
     * @memberof AccountNamesDTO
     */
    names: Array<string>;
}

/**
 * Check if a given object implements the AccountNamesDTO interface.
 */
export function instanceOfAccountNamesDTO(value: object): value is AccountNamesDTO {
    if (!('address' in value) || value['address'] === undefined) return false;
    if (!('names' in value) || value['names'] === undefined) return false;
    return true;
}

export function AccountNamesDTOFromJSON(json: any): AccountNamesDTO {
    return AccountNamesDTOFromJSONTyped(json, false);
}

export function AccountNamesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountNamesDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'address': json['address'],
        'names': json['names'],
    };
}

export function AccountNamesDTOToJSON(json: any): AccountNamesDTO {
    return AccountNamesDTOToJSONTyped(json, false);
}

export function AccountNamesDTOToJSONTyped(value?: AccountNamesDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'address': value['address'],
        'names': value['names'],
    };
}

