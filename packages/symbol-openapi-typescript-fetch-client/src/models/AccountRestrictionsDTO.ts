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
import type { AccountRestrictionDTO } from './AccountRestrictionDTO.js';
import {
    AccountRestrictionDTOFromJSON,
    AccountRestrictionDTOFromJSONTyped,
    AccountRestrictionDTOToJSON,
    AccountRestrictionDTOToJSONTyped,
} from './AccountRestrictionDTO.js';

/**
 * 
 * @export
 * @interface AccountRestrictionsDTO
 */
export interface AccountRestrictionsDTO {
    /**
     * The version of the state
     * @type {number}
     * @memberof AccountRestrictionsDTO
     */
    version: number;
    /**
     * Address encoded using a 32-character set.
     * @type {string}
     * @memberof AccountRestrictionsDTO
     */
    address: string;
    /**
     * 
     * @type {Array<AccountRestrictionDTO>}
     * @memberof AccountRestrictionsDTO
     */
    restrictions: Array<AccountRestrictionDTO>;
}

/**
 * Check if a given object implements the AccountRestrictionsDTO interface.
 */
export function instanceOfAccountRestrictionsDTO(value: object): value is AccountRestrictionsDTO {
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('address' in value) || value['address'] === undefined) return false;
    if (!('restrictions' in value) || value['restrictions'] === undefined) return false;
    return true;
}

export function AccountRestrictionsDTOFromJSON(json: any): AccountRestrictionsDTO {
    return AccountRestrictionsDTOFromJSONTyped(json, false);
}

export function AccountRestrictionsDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountRestrictionsDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'version': json['version'],
        'address': json['address'],
        'restrictions': ((json['restrictions'] as Array<any>).map(AccountRestrictionDTOFromJSON)),
    };
}

export function AccountRestrictionsDTOToJSON(json: any): AccountRestrictionsDTO {
    return AccountRestrictionsDTOToJSONTyped(json, false);
}

export function AccountRestrictionsDTOToJSONTyped(value?: AccountRestrictionsDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'version': value['version'],
        'address': value['address'],
        'restrictions': ((value['restrictions'] as Array<any>).map(AccountRestrictionDTOToJSON)),
    };
}

