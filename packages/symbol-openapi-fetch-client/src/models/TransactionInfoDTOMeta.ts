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
import type { EmbeddedTransactionMetaDTO } from './EmbeddedTransactionMetaDTO.js';
import {
    EmbeddedTransactionMetaDTOFromJSON,
    EmbeddedTransactionMetaDTOFromJSONTyped,
    EmbeddedTransactionMetaDTOToJSON,
    EmbeddedTransactionMetaDTOToJSONTyped,
} from './EmbeddedTransactionMetaDTO.js';
import type { TransactionMetaDTO } from './TransactionMetaDTO.js';
import {
    TransactionMetaDTOFromJSON,
    TransactionMetaDTOFromJSONTyped,
    TransactionMetaDTOToJSON,
    TransactionMetaDTOToJSONTyped,
} from './TransactionMetaDTO.js';

/**
 * 
 * @export
 * @interface TransactionInfoDTOMeta
 */
export interface TransactionInfoDTOMeta {
    /**
     * Height of the blockchain.
     * @type {string}
     * @memberof TransactionInfoDTOMeta
     */
    height: string;
    /**
     * 
     * @type {string}
     * @memberof TransactionInfoDTOMeta
     */
    hash: string;
    /**
     * 
     * @type {string}
     * @memberof TransactionInfoDTOMeta
     */
    merkleComponentHash: string;
    /**
     * Transaction index within the aggregate.
     * @type {number}
     * @memberof TransactionInfoDTOMeta
     */
    index: number;
    /**
     * Number of milliseconds elapsed since the creation of the nemesis block. This value can be converted to epoch time by adding the network's 'epochAdjustment'.
     * @type {string}
     * @memberof TransactionInfoDTOMeta
     */
    timestamp?: string;
    /**
     * Fee multiplier applied to transactions contained in block.
     * @type {number}
     * @memberof TransactionInfoDTOMeta
     */
    feeMultiplier?: number;
    /**
     * 
     * @type {string}
     * @memberof TransactionInfoDTOMeta
     */
    aggregateHash: string;
    /**
     * Identifier of the aggregate transaction.
     * @type {string}
     * @memberof TransactionInfoDTOMeta
     */
    aggregateId: string;
}

/**
 * Check if a given object implements the TransactionInfoDTOMeta interface.
 */
export function instanceOfTransactionInfoDTOMeta(value: object): value is TransactionInfoDTOMeta {
    if (!('height' in value) || value['height'] === undefined) return false;
    if (!('hash' in value) || value['hash'] === undefined) return false;
    if (!('merkleComponentHash' in value) || value['merkleComponentHash'] === undefined) return false;
    if (!('index' in value) || value['index'] === undefined) return false;
    if (!('aggregateHash' in value) || value['aggregateHash'] === undefined) return false;
    if (!('aggregateId' in value) || value['aggregateId'] === undefined) return false;
    return true;
}

export function TransactionInfoDTOMetaFromJSON(json: any): TransactionInfoDTOMeta {
    return TransactionInfoDTOMetaFromJSONTyped(json, false);
}

export function TransactionInfoDTOMetaFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionInfoDTOMeta {
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
        'aggregateHash': json['aggregateHash'],
        'aggregateId': json['aggregateId'],
    };
}

export function TransactionInfoDTOMetaToJSON(json: any): TransactionInfoDTOMeta {
    return TransactionInfoDTOMetaToJSONTyped(json, false);
}

export function TransactionInfoDTOMetaToJSONTyped(value?: TransactionInfoDTOMeta | null, ignoreDiscriminator: boolean = false): any {
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
        'aggregateHash': value['aggregateHash'],
        'aggregateId': value['aggregateId'],
    };
}

