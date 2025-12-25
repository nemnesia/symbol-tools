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
import type { Pagination } from './Pagination.js';
import {
    PaginationFromJSON,
    PaginationFromJSONTyped,
    PaginationToJSON,
    PaginationToJSONTyped,
} from './Pagination.js';
import type { AccountRestrictionsInfoDTO } from './AccountRestrictionsInfoDTO.js';
import {
    AccountRestrictionsInfoDTOFromJSON,
    AccountRestrictionsInfoDTOFromJSONTyped,
    AccountRestrictionsInfoDTOToJSON,
    AccountRestrictionsInfoDTOToJSONTyped,
} from './AccountRestrictionsInfoDTO.js';

/**
 * 
 * @export
 * @interface AccountRestrictionsPage
 */
export interface AccountRestrictionsPage {
    /**
     * Array of account restrictions.
     * @type {Array<AccountRestrictionsInfoDTO>}
     * @memberof AccountRestrictionsPage
     */
    data: Array<AccountRestrictionsInfoDTO>;
    /**
     * 
     * @type {Pagination}
     * @memberof AccountRestrictionsPage
     */
    pagination: Pagination;
}

/**
 * Check if a given object implements the AccountRestrictionsPage interface.
 */
export function instanceOfAccountRestrictionsPage(value: object): value is AccountRestrictionsPage {
    if (!('data' in value) || value['data'] === undefined) return false;
    if (!('pagination' in value) || value['pagination'] === undefined) return false;
    return true;
}

export function AccountRestrictionsPageFromJSON(json: any): AccountRestrictionsPage {
    return AccountRestrictionsPageFromJSONTyped(json, false);
}

export function AccountRestrictionsPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountRestrictionsPage {
    if (json == null) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(AccountRestrictionsInfoDTOFromJSON)),
        'pagination': PaginationFromJSON(json['pagination']),
    };
}

export function AccountRestrictionsPageToJSON(json: any): AccountRestrictionsPage {
    return AccountRestrictionsPageToJSONTyped(json, false);
}

export function AccountRestrictionsPageToJSONTyped(value?: AccountRestrictionsPage | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': ((value['data'] as Array<any>).map(AccountRestrictionsInfoDTOToJSON)),
        'pagination': PaginationToJSON(value['pagination']),
    };
}

