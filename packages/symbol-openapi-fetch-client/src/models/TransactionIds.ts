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
 * @interface TransactionIds
 */
export interface TransactionIds {
    /**
     * Array of transaction identifiers.
     * @type {Array<string>}
     * @memberof TransactionIds
     */
    transactionIds?: Array<string>;
}

/**
 * Check if a given object implements the TransactionIds interface.
 */
export function instanceOfTransactionIds(value: object): value is TransactionIds {
    return true;
}

export function TransactionIdsFromJSON(json: any): TransactionIds {
    return TransactionIdsFromJSONTyped(json, false);
}

export function TransactionIdsFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionIds {
    if (json == null) {
        return json;
    }
    return {
        
        'transactionIds': json['transactionIds'] == null ? undefined : json['transactionIds'],
    };
}

export function TransactionIdsToJSON(json: any): TransactionIds {
    return TransactionIdsToJSONTyped(json, false);
}

export function TransactionIdsToJSONTyped(value?: TransactionIds | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'transactionIds': value['transactionIds'],
    };
}

