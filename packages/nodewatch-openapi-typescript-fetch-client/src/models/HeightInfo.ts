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
 * Node heights information, calculated as the median of the values returned by all known nodes.
 * 
 * @export
 * @interface HeightInfo
 */
export interface HeightInfo {
    /**
     * Current blockchain height, as seen by the node.
     * @type {number}
     * @memberof HeightInfo
     */
    height: number;
    /**
     * Network-wide blockchain finalized height, agreed-upon by the majority of nodes.
     * @type {number}
     * @memberof HeightInfo
     */
    finalizedHeight: number;
}

/**
 * Check if a given object implements the HeightInfo interface.
 */
export function instanceOfHeightInfo(value: object): value is HeightInfo {
    if (!('height' in value) || value['height'] === undefined) return false;
    if (!('finalizedHeight' in value) || value['finalizedHeight'] === undefined) return false;
    return true;
}

export function HeightInfoFromJSON(json: any): HeightInfo {
    return HeightInfoFromJSONTyped(json, false);
}

export function HeightInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): HeightInfo {
    if (json == null) {
        return json;
    }
    return {
        
        'height': json['height'],
        'finalizedHeight': json['finalizedHeight'],
    };
}

export function HeightInfoToJSON(json: any): HeightInfo {
    return HeightInfoToJSONTyped(json, false);
}

export function HeightInfoToJSONTyped(value?: HeightInfo | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'height': value['height'],
        'finalizedHeight': value['finalizedHeight'],
    };
}

