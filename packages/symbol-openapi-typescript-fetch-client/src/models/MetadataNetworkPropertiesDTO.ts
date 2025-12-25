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
 * @interface MetadataNetworkPropertiesDTO
 */
export interface MetadataNetworkPropertiesDTO {
    /**
     * Maximum metadata value size.
     * @type {string}
     * @memberof MetadataNetworkPropertiesDTO
     */
    maxValueSize?: string;
}

/**
 * Check if a given object implements the MetadataNetworkPropertiesDTO interface.
 */
export function instanceOfMetadataNetworkPropertiesDTO(value: object): value is MetadataNetworkPropertiesDTO {
    return true;
}

export function MetadataNetworkPropertiesDTOFromJSON(json: any): MetadataNetworkPropertiesDTO {
    return MetadataNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function MetadataNetworkPropertiesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetadataNetworkPropertiesDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'maxValueSize': json['maxValueSize'] == null ? undefined : json['maxValueSize'],
    };
}

export function MetadataNetworkPropertiesDTOToJSON(json: any): MetadataNetworkPropertiesDTO {
    return MetadataNetworkPropertiesDTOToJSONTyped(json, false);
}

export function MetadataNetworkPropertiesDTOToJSONTyped(value?: MetadataNetworkPropertiesDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'maxValueSize': value['maxValueSize'],
    };
}

