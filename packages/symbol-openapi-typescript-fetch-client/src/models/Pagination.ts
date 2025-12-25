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
 * @interface Pagination
 */
export interface Pagination {
    /**
     * 
     * @type {number}
     * @memberof Pagination
     */
    pageNumber: number;
    /**
     * 
     * @type {number}
     * @memberof Pagination
     */
    pageSize: number;
}

/**
 * Check if a given object implements the Pagination interface.
 */
export function instanceOfPagination(value: object): value is Pagination {
    if (!('pageNumber' in value) || value['pageNumber'] === undefined) return false;
    if (!('pageSize' in value) || value['pageSize'] === undefined) return false;
    return true;
}

export function PaginationFromJSON(json: any): Pagination {
    return PaginationFromJSONTyped(json, false);
}

export function PaginationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Pagination {
    if (json == null) {
        return json;
    }
    return {
        
        'pageNumber': json['pageNumber'],
        'pageSize': json['pageSize'],
    };
}

export function PaginationToJSON(json: any): Pagination {
    return PaginationToJSONTyped(json, false);
}

export function PaginationToJSONTyped(value?: Pagination | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'pageNumber': value['pageNumber'],
        'pageSize': value['pageSize'],
    };
}

