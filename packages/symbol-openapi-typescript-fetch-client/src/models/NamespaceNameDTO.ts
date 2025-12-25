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
 * @interface NamespaceNameDTO
 */
export interface NamespaceNameDTO {
    /**
     * Namespace identifier.
     * @type {string}
     * @memberof NamespaceNameDTO
     */
    parentId?: string;
    /**
     * Namespace identifier.
     * @type {string}
     * @memberof NamespaceNameDTO
     */
    id: string;
    /**
     * Namespace name.
     * @type {string}
     * @memberof NamespaceNameDTO
     */
    name: string;
}

/**
 * Check if a given object implements the NamespaceNameDTO interface.
 */
export function instanceOfNamespaceNameDTO(value: object): value is NamespaceNameDTO {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    return true;
}

export function NamespaceNameDTOFromJSON(json: any): NamespaceNameDTO {
    return NamespaceNameDTOFromJSONTyped(json, false);
}

export function NamespaceNameDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NamespaceNameDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'parentId': json['parentId'] == null ? undefined : json['parentId'],
        'id': json['id'],
        'name': json['name'],
    };
}

export function NamespaceNameDTOToJSON(json: any): NamespaceNameDTO {
    return NamespaceNameDTOToJSONTyped(json, false);
}

export function NamespaceNameDTOToJSONTyped(value?: NamespaceNameDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'parentId': value['parentId'],
        'id': value['id'],
        'name': value['name'],
    };
}

