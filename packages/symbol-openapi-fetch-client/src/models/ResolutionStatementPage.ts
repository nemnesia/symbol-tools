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
import type { ResolutionStatementInfoDTO } from './ResolutionStatementInfoDTO.js';
import {
    ResolutionStatementInfoDTOFromJSON,
    ResolutionStatementInfoDTOFromJSONTyped,
    ResolutionStatementInfoDTOToJSON,
    ResolutionStatementInfoDTOToJSONTyped,
} from './ResolutionStatementInfoDTO.js';

/**
 * 
 * @export
 * @interface ResolutionStatementPage
 */
export interface ResolutionStatementPage {
    /**
     * Array of transaction address resolution statements.
     * @type {Array<ResolutionStatementInfoDTO>}
     * @memberof ResolutionStatementPage
     */
    data: Array<ResolutionStatementInfoDTO>;
    /**
     * 
     * @type {Pagination}
     * @memberof ResolutionStatementPage
     */
    pagination: Pagination;
}

/**
 * Check if a given object implements the ResolutionStatementPage interface.
 */
export function instanceOfResolutionStatementPage(value: object): value is ResolutionStatementPage {
    if (!('data' in value) || value['data'] === undefined) return false;
    if (!('pagination' in value) || value['pagination'] === undefined) return false;
    return true;
}

export function ResolutionStatementPageFromJSON(json: any): ResolutionStatementPage {
    return ResolutionStatementPageFromJSONTyped(json, false);
}

export function ResolutionStatementPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResolutionStatementPage {
    if (json == null) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(ResolutionStatementInfoDTOFromJSON)),
        'pagination': PaginationFromJSON(json['pagination']),
    };
}

export function ResolutionStatementPageToJSON(json: any): ResolutionStatementPage {
    return ResolutionStatementPageToJSONTyped(json, false);
}

export function ResolutionStatementPageToJSONTyped(value?: ResolutionStatementPage | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': ((value['data'] as Array<any>).map(ResolutionStatementInfoDTOToJSON)),
        'pagination': PaginationToJSON(value['pagination']),
    };
}

