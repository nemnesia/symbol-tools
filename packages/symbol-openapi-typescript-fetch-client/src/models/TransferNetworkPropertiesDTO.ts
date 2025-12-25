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
 * @interface TransferNetworkPropertiesDTO
 */
export interface TransferNetworkPropertiesDTO {
    /**
     * Maximum transaction message size.
     * @type {string}
     * @memberof TransferNetworkPropertiesDTO
     */
    maxMessageSize?: string;
}

/**
 * Check if a given object implements the TransferNetworkPropertiesDTO interface.
 */
export function instanceOfTransferNetworkPropertiesDTO(value: object): value is TransferNetworkPropertiesDTO {
    return true;
}

export function TransferNetworkPropertiesDTOFromJSON(json: any): TransferNetworkPropertiesDTO {
    return TransferNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function TransferNetworkPropertiesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransferNetworkPropertiesDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'maxMessageSize': json['maxMessageSize'] == null ? undefined : json['maxMessageSize'],
    };
}

export function TransferNetworkPropertiesDTOToJSON(json: any): TransferNetworkPropertiesDTO {
    return TransferNetworkPropertiesDTOToJSONTyped(json, false);
}

export function TransferNetworkPropertiesDTOToJSONTyped(value?: TransferNetworkPropertiesDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'maxMessageSize': value['maxMessageSize'],
    };
}

