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
import type { SecretLockInfoDTO } from './SecretLockInfoDTO.js';
import {
    SecretLockInfoDTOFromJSON,
    SecretLockInfoDTOFromJSONTyped,
    SecretLockInfoDTOToJSON,
    SecretLockInfoDTOToJSONTyped,
} from './SecretLockInfoDTO.js';

/**
 * 
 * @export
 * @interface SecretLockPage
 */
export interface SecretLockPage {
    /**
     * Array of secret locks.
     * @type {Array<SecretLockInfoDTO>}
     * @memberof SecretLockPage
     */
    data: Array<SecretLockInfoDTO>;
    /**
     * 
     * @type {Pagination}
     * @memberof SecretLockPage
     */
    pagination: Pagination;
}

/**
 * Check if a given object implements the SecretLockPage interface.
 */
export function instanceOfSecretLockPage(value: object): value is SecretLockPage {
    if (!('data' in value) || value['data'] === undefined) return false;
    if (!('pagination' in value) || value['pagination'] === undefined) return false;
    return true;
}

export function SecretLockPageFromJSON(json: any): SecretLockPage {
    return SecretLockPageFromJSONTyped(json, false);
}

export function SecretLockPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): SecretLockPage {
    if (json == null) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(SecretLockInfoDTOFromJSON)),
        'pagination': PaginationFromJSON(json['pagination']),
    };
}

export function SecretLockPageToJSON(json: any): SecretLockPage {
    return SecretLockPageToJSONTyped(json, false);
}

export function SecretLockPageToJSONTyped(value?: SecretLockPage | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': ((value['data'] as Array<any>).map(SecretLockInfoDTOToJSON)),
        'pagination': PaginationToJSON(value['pagination']),
    };
}

