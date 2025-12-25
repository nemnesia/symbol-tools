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
import type { TransactionStatementInfoDTO } from './TransactionStatementInfoDTO.js';
import {
    TransactionStatementInfoDTOFromJSON,
    TransactionStatementInfoDTOFromJSONTyped,
    TransactionStatementInfoDTOToJSON,
    TransactionStatementInfoDTOToJSONTyped,
} from './TransactionStatementInfoDTO.js';

/**
 * 
 * @export
 * @interface TransactionStatementPage
 */
export interface TransactionStatementPage {
    /**
     * Array of transaction statements.
     * @type {Array<TransactionStatementInfoDTO>}
     * @memberof TransactionStatementPage
     */
    data: Array<TransactionStatementInfoDTO>;
    /**
     * 
     * @type {Pagination}
     * @memberof TransactionStatementPage
     */
    pagination: Pagination;
}

/**
 * Check if a given object implements the TransactionStatementPage interface.
 */
export function instanceOfTransactionStatementPage(value: object): value is TransactionStatementPage {
    if (!('data' in value) || value['data'] === undefined) return false;
    if (!('pagination' in value) || value['pagination'] === undefined) return false;
    return true;
}

export function TransactionStatementPageFromJSON(json: any): TransactionStatementPage {
    return TransactionStatementPageFromJSONTyped(json, false);
}

export function TransactionStatementPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionStatementPage {
    if (json == null) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(TransactionStatementInfoDTOFromJSON)),
        'pagination': PaginationFromJSON(json['pagination']),
    };
}

export function TransactionStatementPageToJSON(json: any): TransactionStatementPage {
    return TransactionStatementPageToJSONTyped(json, false);
}

export function TransactionStatementPageToJSONTyped(value?: TransactionStatementPage | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': ((value['data'] as Array<any>).map(TransactionStatementInfoDTOToJSON)),
        'pagination': PaginationToJSON(value['pagination']),
    };
}

