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
 * @interface HashLockTransactionBodyDTO
 */
export interface HashLockTransactionBodyDTO {
    /**
     * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
     * is used instead of the real mosaic identifier.
     * 
     * @type {string}
     * @memberof HashLockTransactionBodyDTO
     */
    mosaicId: string;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof HashLockTransactionBodyDTO
     */
    amount: string;
    /**
     * Duration expressed in number of blocks.
     * @type {string}
     * @memberof HashLockTransactionBodyDTO
     */
    duration: string;
    /**
     * 
     * @type {string}
     * @memberof HashLockTransactionBodyDTO
     */
    hash: string;
}

/**
 * Check if a given object implements the HashLockTransactionBodyDTO interface.
 */
export function instanceOfHashLockTransactionBodyDTO(value: object): value is HashLockTransactionBodyDTO {
    if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
    if (!('amount' in value) || value['amount'] === undefined) return false;
    if (!('duration' in value) || value['duration'] === undefined) return false;
    if (!('hash' in value) || value['hash'] === undefined) return false;
    return true;
}

export function HashLockTransactionBodyDTOFromJSON(json: any): HashLockTransactionBodyDTO {
    return HashLockTransactionBodyDTOFromJSONTyped(json, false);
}

export function HashLockTransactionBodyDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): HashLockTransactionBodyDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'mosaicId': json['mosaicId'],
        'amount': json['amount'],
        'duration': json['duration'],
        'hash': json['hash'],
    };
}

export function HashLockTransactionBodyDTOToJSON(json: any): HashLockTransactionBodyDTO {
    return HashLockTransactionBodyDTOToJSONTyped(json, false);
}

export function HashLockTransactionBodyDTOToJSONTyped(value?: HashLockTransactionBodyDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'mosaicId': value['mosaicId'],
        'amount': value['amount'],
        'duration': value['duration'],
        'hash': value['hash'],
    };
}

