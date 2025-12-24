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
 * @interface TransactionMetaDTO
 */
export interface TransactionMetaDTO {
    /**
     * Height of the blockchain.
     * @type {string}
     * @memberof TransactionMetaDTO
     */
    height: string;
    /**
     * 
     * @type {string}
     * @memberof TransactionMetaDTO
     */
    hash: string;
    /**
     * 
     * @type {string}
     * @memberof TransactionMetaDTO
     */
    merkleComponentHash: string;
    /**
     * Transaction index within the block.
     * @type {number}
     * @memberof TransactionMetaDTO
     */
    index: number;
    /**
     * Number of milliseconds elapsed since the creation of the nemesis block. This value can be converted to epoch time by adding the network's 'epochAdjustment'.
     * @type {string}
     * @memberof TransactionMetaDTO
     */
    timestamp?: string;
    /**
     * Fee multiplier applied to transactions contained in block.
     * @type {number}
     * @memberof TransactionMetaDTO
     */
    feeMultiplier?: number;
}

/**
 * Check if a given object implements the TransactionMetaDTO interface.
 */
export function instanceOfTransactionMetaDTO(value: object): value is TransactionMetaDTO {
    if (!('height' in value) || value['height'] === undefined) return false;
    if (!('hash' in value) || value['hash'] === undefined) return false;
    if (!('merkleComponentHash' in value) || value['merkleComponentHash'] === undefined) return false;
    if (!('index' in value) || value['index'] === undefined) return false;
    return true;
}

export function TransactionMetaDTOFromJSON(json: any): TransactionMetaDTO {
    return TransactionMetaDTOFromJSONTyped(json, false);
}

export function TransactionMetaDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionMetaDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'height': json['height'],
        'hash': json['hash'],
        'merkleComponentHash': json['merkleComponentHash'],
        'index': json['index'],
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
        'feeMultiplier': json['feeMultiplier'] == null ? undefined : json['feeMultiplier'],
    };
}

export function TransactionMetaDTOToJSON(json: any): TransactionMetaDTO {
    return TransactionMetaDTOToJSONTyped(json, false);
}

export function TransactionMetaDTOToJSONTyped(value?: TransactionMetaDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'height': value['height'],
        'hash': value['hash'],
        'merkleComponentHash': value['merkleComponentHash'],
        'index': value['index'],
        'timestamp': value['timestamp'],
        'feeMultiplier': value['feeMultiplier'],
    };
}

