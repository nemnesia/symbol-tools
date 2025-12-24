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
 * @interface MosaicSupplyRevocationTransactionBodyDTO
 */
export interface MosaicSupplyRevocationTransactionBodyDTO {
    /**
     * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
     * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA.
     * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
     * 
     * @type {string}
     * @memberof MosaicSupplyRevocationTransactionBodyDTO
     */
    sourceAddress: string;
    /**
     * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
     * is used instead of the real mosaic identifier.
     * 
     * @type {string}
     * @memberof MosaicSupplyRevocationTransactionBodyDTO
     */
    mosaicId: string;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof MosaicSupplyRevocationTransactionBodyDTO
     */
    amount: string;
}

/**
 * Check if a given object implements the MosaicSupplyRevocationTransactionBodyDTO interface.
 */
export function instanceOfMosaicSupplyRevocationTransactionBodyDTO(value: object): value is MosaicSupplyRevocationTransactionBodyDTO {
    if (!('sourceAddress' in value) || value['sourceAddress'] === undefined) return false;
    if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
    if (!('amount' in value) || value['amount'] === undefined) return false;
    return true;
}

export function MosaicSupplyRevocationTransactionBodyDTOFromJSON(json: any): MosaicSupplyRevocationTransactionBodyDTO {
    return MosaicSupplyRevocationTransactionBodyDTOFromJSONTyped(json, false);
}

export function MosaicSupplyRevocationTransactionBodyDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicSupplyRevocationTransactionBodyDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'sourceAddress': json['sourceAddress'],
        'mosaicId': json['mosaicId'],
        'amount': json['amount'],
    };
}

export function MosaicSupplyRevocationTransactionBodyDTOToJSON(json: any): MosaicSupplyRevocationTransactionBodyDTO {
    return MosaicSupplyRevocationTransactionBodyDTOToJSONTyped(json, false);
}

export function MosaicSupplyRevocationTransactionBodyDTOToJSONTyped(value?: MosaicSupplyRevocationTransactionBodyDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'sourceAddress': value['sourceAddress'],
        'mosaicId': value['mosaicId'],
        'amount': value['amount'],
    };
}

