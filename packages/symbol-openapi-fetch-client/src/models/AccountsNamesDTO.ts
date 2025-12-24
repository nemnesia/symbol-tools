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
import type { AccountNamesDTO } from './AccountNamesDTO.js';
import {
    AccountNamesDTOFromJSON,
    AccountNamesDTOFromJSONTyped,
    AccountNamesDTOToJSON,
    AccountNamesDTOToJSONTyped,
} from './AccountNamesDTO.js';

/**
 * 
 * @export
 * @interface AccountsNamesDTO
 */
export interface AccountsNamesDTO {
    /**
     * Array of account names.
     * @type {Array<AccountNamesDTO>}
     * @memberof AccountsNamesDTO
     */
    accountNames: Array<AccountNamesDTO>;
}

/**
 * Check if a given object implements the AccountsNamesDTO interface.
 */
export function instanceOfAccountsNamesDTO(value: object): value is AccountsNamesDTO {
    if (!('accountNames' in value) || value['accountNames'] === undefined) return false;
    return true;
}

export function AccountsNamesDTOFromJSON(json: any): AccountsNamesDTO {
    return AccountsNamesDTOFromJSONTyped(json, false);
}

export function AccountsNamesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountsNamesDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'accountNames': ((json['accountNames'] as Array<any>).map(AccountNamesDTOFromJSON)),
    };
}

export function AccountsNamesDTOToJSON(json: any): AccountsNamesDTO {
    return AccountsNamesDTOToJSONTyped(json, false);
}

export function AccountsNamesDTOToJSONTyped(value?: AccountsNamesDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'accountNames': ((value['accountNames'] as Array<any>).map(AccountNamesDTOToJSON)),
    };
}

