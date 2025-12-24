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
import type { ReceiptTypeEnum } from './ReceiptTypeEnum.js';
import {
    ReceiptTypeEnumFromJSON,
    ReceiptTypeEnumFromJSONTyped,
    ReceiptTypeEnumToJSON,
    ReceiptTypeEnumToJSONTyped,
} from './ReceiptTypeEnum.js';

/**
 * Receipt stored when a namespace expires.
 * @export
 * @interface NamespaceExpiryReceiptDTO
 */
export interface NamespaceExpiryReceiptDTO {
    /**
     * Version of the receipt.
     * @type {number}
     * @memberof NamespaceExpiryReceiptDTO
     */
    version: number;
    /**
     * 
     * @type {ReceiptTypeEnum}
     * @memberof NamespaceExpiryReceiptDTO
     */
    type: ReceiptTypeEnum;
    /**
     * Namespace identifier.
     * @type {string}
     * @memberof NamespaceExpiryReceiptDTO
     */
    artifactId: string;
}



/**
 * Check if a given object implements the NamespaceExpiryReceiptDTO interface.
 */
export function instanceOfNamespaceExpiryReceiptDTO(value: object): value is NamespaceExpiryReceiptDTO {
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('artifactId' in value) || value['artifactId'] === undefined) return false;
    return true;
}

export function NamespaceExpiryReceiptDTOFromJSON(json: any): NamespaceExpiryReceiptDTO {
    return NamespaceExpiryReceiptDTOFromJSONTyped(json, false);
}

export function NamespaceExpiryReceiptDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NamespaceExpiryReceiptDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'version': json['version'],
        'type': ReceiptTypeEnumFromJSON(json['type']),
        'artifactId': json['artifactId'],
    };
}

export function NamespaceExpiryReceiptDTOToJSON(json: any): NamespaceExpiryReceiptDTO {
    return NamespaceExpiryReceiptDTOToJSONTyped(json, false);
}

export function NamespaceExpiryReceiptDTOToJSONTyped(value?: NamespaceExpiryReceiptDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'version': value['version'],
        'type': ReceiptTypeEnumToJSON(value['type']),
        'artifactId': value['artifactId'],
    };
}

