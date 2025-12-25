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
 * @interface NamespaceMetadataTransactionBodyDTO
 */
export interface NamespaceMetadataTransactionBodyDTO {
    /**
     * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
     * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA.
     * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
     * 
     * @type {string}
     * @memberof NamespaceMetadataTransactionBodyDTO
     */
    targetAddress: string;
    /**
     * Metadata key scoped to source, target and type expressed.
     * @type {string}
     * @memberof NamespaceMetadataTransactionBodyDTO
     */
    scopedMetadataKey: string;
    /**
     * Namespace identifier.
     * @type {string}
     * @memberof NamespaceMetadataTransactionBodyDTO
     */
    targetNamespaceId?: string;
    /**
     * Change in value size in bytes.
     * @type {number}
     * @memberof NamespaceMetadataTransactionBodyDTO
     */
    valueSizeDelta: number;
    /**
     * A number that allows uint 32 values.
     * @type {number}
     * @memberof NamespaceMetadataTransactionBodyDTO
     */
    valueSize: number;
    /**
     * Metadata value. If embedded in a transaction, this is calculated as xor(previous-value, value).
     * @type {string}
     * @memberof NamespaceMetadataTransactionBodyDTO
     */
    value: string;
}

/**
 * Check if a given object implements the NamespaceMetadataTransactionBodyDTO interface.
 */
export function instanceOfNamespaceMetadataTransactionBodyDTO(value: object): value is NamespaceMetadataTransactionBodyDTO {
    if (!('targetAddress' in value) || value['targetAddress'] === undefined) return false;
    if (!('scopedMetadataKey' in value) || value['scopedMetadataKey'] === undefined) return false;
    if (!('valueSizeDelta' in value) || value['valueSizeDelta'] === undefined) return false;
    if (!('valueSize' in value) || value['valueSize'] === undefined) return false;
    if (!('value' in value) || value['value'] === undefined) return false;
    return true;
}

export function NamespaceMetadataTransactionBodyDTOFromJSON(json: any): NamespaceMetadataTransactionBodyDTO {
    return NamespaceMetadataTransactionBodyDTOFromJSONTyped(json, false);
}

export function NamespaceMetadataTransactionBodyDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NamespaceMetadataTransactionBodyDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'targetAddress': json['targetAddress'],
        'scopedMetadataKey': json['scopedMetadataKey'],
        'targetNamespaceId': json['targetNamespaceId'] == null ? undefined : json['targetNamespaceId'],
        'valueSizeDelta': json['valueSizeDelta'],
        'valueSize': json['valueSize'],
        'value': json['value'],
    };
}

export function NamespaceMetadataTransactionBodyDTOToJSON(json: any): NamespaceMetadataTransactionBodyDTO {
    return NamespaceMetadataTransactionBodyDTOToJSONTyped(json, false);
}

export function NamespaceMetadataTransactionBodyDTOToJSONTyped(value?: NamespaceMetadataTransactionBodyDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'targetAddress': value['targetAddress'],
        'scopedMetadataKey': value['scopedMetadataKey'],
        'targetNamespaceId': value['targetNamespaceId'],
        'valueSizeDelta': value['valueSizeDelta'],
        'valueSize': value['valueSize'],
        'value': value['value'],
    };
}

