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
 * @interface TransactionHashes
 */
export interface TransactionHashes {
    /**
     * Array of transaction hashes.
     * @type {Array<string>}
     * @memberof TransactionHashes
     */
    hashes?: Array<string>;
}

/**
 * Check if a given object implements the TransactionHashes interface.
 */
export function instanceOfTransactionHashes(value: object): value is TransactionHashes {
    return true;
}

export function TransactionHashesFromJSON(json: any): TransactionHashes {
    return TransactionHashesFromJSONTyped(json, false);
}

export function TransactionHashesFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionHashes {
    if (json == null) {
        return json;
    }
    return {
        
        'hashes': json['hashes'] == null ? undefined : json['hashes'],
    };
}

export function TransactionHashesToJSON(json: any): TransactionHashes {
    return TransactionHashesToJSONTyped(json, false);
}

export function TransactionHashesToJSONTyped(value?: TransactionHashes | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'hashes': value['hashes'],
    };
}

