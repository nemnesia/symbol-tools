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
 * Receipt stored when a mosaic expires.
 * @export
 * @interface MosaicExpiryReceiptDTO
 */
export interface MosaicExpiryReceiptDTO {
    /**
     * Version of the receipt.
     * @type {number}
     * @memberof MosaicExpiryReceiptDTO
     */
    version: number;
    /**
     * 
     * @type {ReceiptTypeEnum}
     * @memberof MosaicExpiryReceiptDTO
     */
    type: ReceiptTypeEnum;
    /**
     * Mosaic identifier.
     * @type {string}
     * @memberof MosaicExpiryReceiptDTO
     */
    artifactId: string;
}



/**
 * Check if a given object implements the MosaicExpiryReceiptDTO interface.
 */
export function instanceOfMosaicExpiryReceiptDTO(value: object): value is MosaicExpiryReceiptDTO {
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('artifactId' in value) || value['artifactId'] === undefined) return false;
    return true;
}

export function MosaicExpiryReceiptDTOFromJSON(json: any): MosaicExpiryReceiptDTO {
    return MosaicExpiryReceiptDTOFromJSONTyped(json, false);
}

export function MosaicExpiryReceiptDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicExpiryReceiptDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'version': json['version'],
        'type': ReceiptTypeEnumFromJSON(json['type']),
        'artifactId': json['artifactId'],
    };
}

export function MosaicExpiryReceiptDTOToJSON(json: any): MosaicExpiryReceiptDTO {
    return MosaicExpiryReceiptDTOToJSONTyped(json, false);
}

export function MosaicExpiryReceiptDTOToJSONTyped(value?: MosaicExpiryReceiptDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'version': value['version'],
        'type': ReceiptTypeEnumToJSON(value['type']),
        'artifactId': value['artifactId'],
    };
}

