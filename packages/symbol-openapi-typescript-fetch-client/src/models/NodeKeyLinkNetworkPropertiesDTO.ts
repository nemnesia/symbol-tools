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
 * @interface NodeKeyLinkNetworkPropertiesDTO
 */
export interface NodeKeyLinkNetworkPropertiesDTO {
    /**
     * to trigger plugin load
     * @type {string}
     * @memberof NodeKeyLinkNetworkPropertiesDTO
     */
    dummy?: string;
}

/**
 * Check if a given object implements the NodeKeyLinkNetworkPropertiesDTO interface.
 */
export function instanceOfNodeKeyLinkNetworkPropertiesDTO(value: object): value is NodeKeyLinkNetworkPropertiesDTO {
    return true;
}

export function NodeKeyLinkNetworkPropertiesDTOFromJSON(json: any): NodeKeyLinkNetworkPropertiesDTO {
    return NodeKeyLinkNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function NodeKeyLinkNetworkPropertiesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NodeKeyLinkNetworkPropertiesDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'dummy': json['dummy'] == null ? undefined : json['dummy'],
    };
}

export function NodeKeyLinkNetworkPropertiesDTOToJSON(json: any): NodeKeyLinkNetworkPropertiesDTO {
    return NodeKeyLinkNetworkPropertiesDTOToJSONTyped(json, false);
}

export function NodeKeyLinkNetworkPropertiesDTOToJSONTyped(value?: NodeKeyLinkNetworkPropertiesDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'dummy': value['dummy'],
    };
}

