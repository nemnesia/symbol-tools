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
 * @interface TimeSeriesNodesCountInnerValues
 */
export interface TimeSeriesNodesCountInnerValues {
    /**
     * Total count of nodes.
     * @type {number}
     * @memberof TimeSeriesNodesCountInnerValues
     */
    total: number;
    /**
     * Count of nodes with role = 1.
     * @type {number}
     * @memberof TimeSeriesNodesCountInnerValues
     */
    _1?: number;
    /**
     * Count of nodes with role = 2.
     * @type {number}
     * @memberof TimeSeriesNodesCountInnerValues
     */
    _2?: number;
    /**
     * Count of nodes with role = 3.
     * @type {number}
     * @memberof TimeSeriesNodesCountInnerValues
     */
    _3?: number;
    /**
     * Count of nodes with role = 4.
     * @type {number}
     * @memberof TimeSeriesNodesCountInnerValues
     */
    _4?: number;
    /**
     * Count of nodes with role = 5.
     * @type {number}
     * @memberof TimeSeriesNodesCountInnerValues
     */
    _5?: number;
    /**
     * Count of nodes with role = 6.
     * @type {number}
     * @memberof TimeSeriesNodesCountInnerValues
     */
    _6?: number;
    /**
     * Count of nodes with role = 7.
     * @type {number}
     * @memberof TimeSeriesNodesCountInnerValues
     */
    _7?: number;
}

/**
 * Check if a given object implements the TimeSeriesNodesCountInnerValues interface.
 */
export function instanceOfTimeSeriesNodesCountInnerValues(value: object): value is TimeSeriesNodesCountInnerValues {
    if (!('total' in value) || value['total'] === undefined) return false;
    return true;
}

export function TimeSeriesNodesCountInnerValuesFromJSON(json: any): TimeSeriesNodesCountInnerValues {
    return TimeSeriesNodesCountInnerValuesFromJSONTyped(json, false);
}

export function TimeSeriesNodesCountInnerValuesFromJSONTyped(json: any, ignoreDiscriminator: boolean): TimeSeriesNodesCountInnerValues {
    if (json == null) {
        return json;
    }
    return {
        
        'total': json['total'],
        '_1': json['1'] == null ? undefined : json['1'],
        '_2': json['2'] == null ? undefined : json['2'],
        '_3': json['3'] == null ? undefined : json['3'],
        '_4': json['4'] == null ? undefined : json['4'],
        '_5': json['5'] == null ? undefined : json['5'],
        '_6': json['6'] == null ? undefined : json['6'],
        '_7': json['7'] == null ? undefined : json['7'],
    };
}

export function TimeSeriesNodesCountInnerValuesToJSON(json: any): TimeSeriesNodesCountInnerValues {
    return TimeSeriesNodesCountInnerValuesToJSONTyped(json, false);
}

export function TimeSeriesNodesCountInnerValuesToJSONTyped(value?: TimeSeriesNodesCountInnerValues | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'total': value['total'],
        '1': value['_1'],
        '2': value['_2'],
        '3': value['_3'],
        '4': value['_4'],
        '5': value['_5'],
        '6': value['_6'],
        '7': value['_7'],
    };
}

