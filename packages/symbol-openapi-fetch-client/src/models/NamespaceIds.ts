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
 * @interface NamespaceIds
 */
export interface NamespaceIds {
    /**
     * Array of namespace identifiers.
     * @type {Array<string>}
     * @memberof NamespaceIds
     */
    namespaceIds?: Array<string>;
}

/**
 * Check if a given object implements the NamespaceIds interface.
 */
export function instanceOfNamespaceIds(value: object): value is NamespaceIds {
    return true;
}

export function NamespaceIdsFromJSON(json: any): NamespaceIds {
    return NamespaceIdsFromJSONTyped(json, false);
}

export function NamespaceIdsFromJSONTyped(json: any, ignoreDiscriminator: boolean): NamespaceIds {
    if (json == null) {
        return json;
    }
    return {
        
        'namespaceIds': json['namespaceIds'] == null ? undefined : json['namespaceIds'],
    };
}

export function NamespaceIdsToJSON(json: any): NamespaceIds {
    return NamespaceIdsToJSONTyped(json, false);
}

export function NamespaceIdsToJSONTyped(value?: NamespaceIds | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'namespaceIds': value['namespaceIds'],
    };
}

