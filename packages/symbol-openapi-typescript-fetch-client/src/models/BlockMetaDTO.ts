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
 * @interface BlockMetaDTO
 */
export interface BlockMetaDTO {
    /**
     * 
     * @type {string}
     * @memberof BlockMetaDTO
     */
    hash: string;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof BlockMetaDTO
     */
    totalFee: string;
    /**
     * 
     * @type {string}
     * @memberof BlockMetaDTO
     */
    generationHash: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof BlockMetaDTO
     */
    stateHashSubCacheMerkleRoots: Array<string>;
    /**
     * Total number of [transactions](https://docs.symbol.dev/concepts/transaction.html) confirmed in this block,
     * including *embedded* transactions (i.e. transactions contained within aggregate transactions).
     * 
     * @type {number}
     * @memberof BlockMetaDTO
     */
    totalTransactionsCount: number;
    /**
     * Number of [transactions](https://docs.symbol.dev/concepts/transaction.html) confirmed in this block.
     * This does not count *embedded* transactions (i.e. transactions contained within aggregate transactions).
     * 
     * @type {number}
     * @memberof BlockMetaDTO
     */
    transactionsCount: number;
    /**
     * Number of statements (of any kind) present in this block.
     * Bear in mind that some of them (like
     * [resolution statements](https://docs.symbol.dev/concepts/receipt.html#resolution-statement)) are
     * triggered by transactions present in the block, but in general,
     * [transaction statements](https://docs.symbol.dev/concepts/receipt.html#transaction-statement) are not.
     * 
     * @type {number}
     * @memberof BlockMetaDTO
     */
    statementsCount: number;
}

/**
 * Check if a given object implements the BlockMetaDTO interface.
 */
export function instanceOfBlockMetaDTO(value: object): value is BlockMetaDTO {
    if (!('hash' in value) || value['hash'] === undefined) return false;
    if (!('totalFee' in value) || value['totalFee'] === undefined) return false;
    if (!('generationHash' in value) || value['generationHash'] === undefined) return false;
    if (!('stateHashSubCacheMerkleRoots' in value) || value['stateHashSubCacheMerkleRoots'] === undefined) return false;
    if (!('totalTransactionsCount' in value) || value['totalTransactionsCount'] === undefined) return false;
    if (!('transactionsCount' in value) || value['transactionsCount'] === undefined) return false;
    if (!('statementsCount' in value) || value['statementsCount'] === undefined) return false;
    return true;
}

export function BlockMetaDTOFromJSON(json: any): BlockMetaDTO {
    return BlockMetaDTOFromJSONTyped(json, false);
}

export function BlockMetaDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlockMetaDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'hash': json['hash'],
        'totalFee': json['totalFee'],
        'generationHash': json['generationHash'],
        'stateHashSubCacheMerkleRoots': json['stateHashSubCacheMerkleRoots'],
        'totalTransactionsCount': json['totalTransactionsCount'],
        'transactionsCount': json['transactionsCount'],
        'statementsCount': json['statementsCount'],
    };
}

export function BlockMetaDTOToJSON(json: any): BlockMetaDTO {
    return BlockMetaDTOToJSONTyped(json, false);
}

export function BlockMetaDTOToJSONTyped(value?: BlockMetaDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'hash': value['hash'],
        'totalFee': value['totalFee'],
        'generationHash': value['generationHash'],
        'stateHashSubCacheMerkleRoots': value['stateHashSubCacheMerkleRoots'],
        'totalTransactionsCount': value['totalTransactionsCount'],
        'transactionsCount': value['transactionsCount'],
        'statementsCount': value['statementsCount'],
    };
}

