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
 * @interface UnresolvedMosaic
 */
export interface UnresolvedMosaic {
    /**
     * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
     * is used instead of the real mosaic identifier.
     * 
     * @type {string}
     * @memberof UnresolvedMosaic
     */
    id: string;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof UnresolvedMosaic
     */
    amount: string;
}

/**
 * Check if a given object implements the UnresolvedMosaic interface.
 */
export function instanceOfUnresolvedMosaic(value: object): value is UnresolvedMosaic {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('amount' in value) || value['amount'] === undefined) return false;
    return true;
}

export function UnresolvedMosaicFromJSON(json: any): UnresolvedMosaic {
    return UnresolvedMosaicFromJSONTyped(json, false);
}

export function UnresolvedMosaicFromJSONTyped(json: any, ignoreDiscriminator: boolean): UnresolvedMosaic {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'amount': json['amount'],
    };
}

export function UnresolvedMosaicToJSON(json: any): UnresolvedMosaic {
    return UnresolvedMosaicToJSONTyped(json, false);
}

export function UnresolvedMosaicToJSONTyped(value?: UnresolvedMosaic | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'amount': value['amount'],
    };
}

