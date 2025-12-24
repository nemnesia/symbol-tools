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
import type { CosignatureDTO } from './CosignatureDTO.js';
import {
    CosignatureDTOFromJSON,
    CosignatureDTOFromJSONTyped,
    CosignatureDTOToJSON,
    CosignatureDTOToJSONTyped,
} from './CosignatureDTO.js';
import type { EmbeddedTransactionInfoDTO } from './EmbeddedTransactionInfoDTO.js';
import {
    EmbeddedTransactionInfoDTOFromJSON,
    EmbeddedTransactionInfoDTOFromJSONTyped,
    EmbeddedTransactionInfoDTOToJSON,
    EmbeddedTransactionInfoDTOToJSONTyped,
} from './EmbeddedTransactionInfoDTO.js';

/**
 * 
 * @export
 * @interface AggregateTransactionBodyExtendedDTO
 */
export interface AggregateTransactionBodyExtendedDTO {
    /**
     * 
     * @type {string}
     * @memberof AggregateTransactionBodyExtendedDTO
     */
    transactionsHash: string;
    /**
     * Array of transaction cosignatures.
     * @type {Array<CosignatureDTO>}
     * @memberof AggregateTransactionBodyExtendedDTO
     */
    cosignatures: Array<CosignatureDTO>;
    /**
     * Array of transactions initiated by different accounts.
     * @type {Array<EmbeddedTransactionInfoDTO>}
     * @memberof AggregateTransactionBodyExtendedDTO
     */
    transactions: Array<EmbeddedTransactionInfoDTO>;
}

/**
 * Check if a given object implements the AggregateTransactionBodyExtendedDTO interface.
 */
export function instanceOfAggregateTransactionBodyExtendedDTO(value: object): value is AggregateTransactionBodyExtendedDTO {
    if (!('transactionsHash' in value) || value['transactionsHash'] === undefined) return false;
    if (!('cosignatures' in value) || value['cosignatures'] === undefined) return false;
    if (!('transactions' in value) || value['transactions'] === undefined) return false;
    return true;
}

export function AggregateTransactionBodyExtendedDTOFromJSON(json: any): AggregateTransactionBodyExtendedDTO {
    return AggregateTransactionBodyExtendedDTOFromJSONTyped(json, false);
}

export function AggregateTransactionBodyExtendedDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AggregateTransactionBodyExtendedDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'transactionsHash': json['transactionsHash'],
        'cosignatures': ((json['cosignatures'] as Array<any>).map(CosignatureDTOFromJSON)),
        'transactions': ((json['transactions'] as Array<any>).map(EmbeddedTransactionInfoDTOFromJSON)),
    };
}

export function AggregateTransactionBodyExtendedDTOToJSON(json: any): AggregateTransactionBodyExtendedDTO {
    return AggregateTransactionBodyExtendedDTOToJSONTyped(json, false);
}

export function AggregateTransactionBodyExtendedDTOToJSONTyped(value?: AggregateTransactionBodyExtendedDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'transactionsHash': value['transactionsHash'],
        'cosignatures': ((value['cosignatures'] as Array<any>).map(CosignatureDTOToJSON)),
        'transactions': ((value['transactions'] as Array<any>).map(EmbeddedTransactionInfoDTOToJSON)),
    };
}

