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
import type { MosaicRestrictionsPageDataInner } from './MosaicRestrictionsPageDataInner.js';
import {
    MosaicRestrictionsPageDataInnerFromJSON,
    MosaicRestrictionsPageDataInnerFromJSONTyped,
    MosaicRestrictionsPageDataInnerToJSON,
    MosaicRestrictionsPageDataInnerToJSONTyped,
} from './MosaicRestrictionsPageDataInner.js';
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
 * @interface MosaicRestrictionsPage
 */
export interface MosaicRestrictionsPage {
    /**
     * Array of mosaic restrictions.
     * @type {Array<MosaicRestrictionsPageDataInner>}
     * @memberof MosaicRestrictionsPage
     */
    data: Array<MosaicRestrictionsPageDataInner>;
    /**
     * 
     * @type {Pagination}
     * @memberof MosaicRestrictionsPage
     */
    pagination: Pagination;
}

/**
 * Check if a given object implements the MosaicRestrictionsPage interface.
 */
export function instanceOfMosaicRestrictionsPage(value: object): value is MosaicRestrictionsPage {
    if (!('data' in value) || value['data'] === undefined) return false;
    if (!('pagination' in value) || value['pagination'] === undefined) return false;
    return true;
}

export function MosaicRestrictionsPageFromJSON(json: any): MosaicRestrictionsPage {
    return MosaicRestrictionsPageFromJSONTyped(json, false);
}

export function MosaicRestrictionsPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicRestrictionsPage {
    if (json == null) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(MosaicRestrictionsPageDataInnerFromJSON)),
        'pagination': PaginationFromJSON(json['pagination']),
    };
}

export function MosaicRestrictionsPageToJSON(json: any): MosaicRestrictionsPage {
    return MosaicRestrictionsPageToJSONTyped(json, false);
}

export function MosaicRestrictionsPageToJSONTyped(value?: MosaicRestrictionsPage | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': ((value['data'] as Array<any>).map(MosaicRestrictionsPageDataInnerToJSON)),
        'pagination': PaginationToJSON(value['pagination']),
    };
}

