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
import type { AccountInfoDTO } from './AccountInfoDTO.js';
import {
    AccountInfoDTOFromJSON,
    AccountInfoDTOFromJSONTyped,
    AccountInfoDTOToJSON,
    AccountInfoDTOToJSONTyped,
} from './AccountInfoDTO.js';
import type { Pagination } from './Pagination.js';
import {
    PaginationFromJSON,
    PaginationFromJSONTyped,
    PaginationToJSON,
    PaginationToJSONTyped,
} from './Pagination.js';

/**
 * 
 * @export
 * @interface AccountPage
 */
export interface AccountPage {
    /**
     * Array of accounts.
     * @type {Array<AccountInfoDTO>}
     * @memberof AccountPage
     */
    data: Array<AccountInfoDTO>;
    /**
     * 
     * @type {Pagination}
     * @memberof AccountPage
     */
    pagination: Pagination;
}

/**
 * Check if a given object implements the AccountPage interface.
 */
export function instanceOfAccountPage(value: object): value is AccountPage {
    if (!('data' in value) || value['data'] === undefined) return false;
    if (!('pagination' in value) || value['pagination'] === undefined) return false;
    return true;
}

export function AccountPageFromJSON(json: any): AccountPage {
    return AccountPageFromJSONTyped(json, false);
}

export function AccountPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountPage {
    if (json == null) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(AccountInfoDTOFromJSON)),
        'pagination': PaginationFromJSON(json['pagination']),
    };
}

export function AccountPageToJSON(json: any): AccountPage {
    return AccountPageToJSONTyped(json, false);
}

export function AccountPageToJSONTyped(value?: AccountPage | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': ((value['data'] as Array<any>).map(AccountInfoDTOToJSON)),
        'pagination': PaginationToJSON(value['pagination']),
    };
}

