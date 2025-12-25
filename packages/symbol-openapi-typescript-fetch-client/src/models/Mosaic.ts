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
 * @interface Mosaic
 */
export interface Mosaic {
    /**
     * Mosaic identifier.
     * @type {string}
     * @memberof Mosaic
     */
    id: string;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof Mosaic
     */
    amount: string;
}

/**
 * Check if a given object implements the Mosaic interface.
 */
export function instanceOfMosaic(value: object): value is Mosaic {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('amount' in value) || value['amount'] === undefined) return false;
    return true;
}

export function MosaicFromJSON(json: any): Mosaic {
    return MosaicFromJSONTyped(json, false);
}

export function MosaicFromJSONTyped(json: any, ignoreDiscriminator: boolean): Mosaic {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'amount': json['amount'],
    };
}

export function MosaicToJSON(json: any): Mosaic {
    return MosaicToJSONTyped(json, false);
}

export function MosaicToJSONTyped(value?: Mosaic | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'amount': value['amount'],
    };
}

