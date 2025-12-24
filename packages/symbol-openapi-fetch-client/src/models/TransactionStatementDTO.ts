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
import type { SourceDTO } from './SourceDTO.js';
import {
    SourceDTOFromJSON,
    SourceDTOFromJSONTyped,
    SourceDTOToJSON,
    SourceDTOToJSONTyped,
} from './SourceDTO.js';
import type { TransactionStatementDTOReceiptsInner } from './TransactionStatementDTOReceiptsInner.js';
import {
    TransactionStatementDTOReceiptsInnerFromJSON,
    TransactionStatementDTOReceiptsInnerFromJSONTyped,
    TransactionStatementDTOReceiptsInnerToJSON,
    TransactionStatementDTOReceiptsInnerToJSONTyped,
} from './TransactionStatementDTOReceiptsInner.js';

/**
 * 
 * @export
 * @interface TransactionStatementDTO
 */
export interface TransactionStatementDTO {
    /**
     * Height of the blockchain.
     * @type {string}
     * @memberof TransactionStatementDTO
     */
    height: string;
    /**
     * 
     * @type {SourceDTO}
     * @memberof TransactionStatementDTO
     */
    source: SourceDTO;
    /**
     * Array of receipts.
     * @type {Array<TransactionStatementDTOReceiptsInner>}
     * @memberof TransactionStatementDTO
     */
    receipts: Array<TransactionStatementDTOReceiptsInner>;
}

/**
 * Check if a given object implements the TransactionStatementDTO interface.
 */
export function instanceOfTransactionStatementDTO(value: object): value is TransactionStatementDTO {
    if (!('height' in value) || value['height'] === undefined) return false;
    if (!('source' in value) || value['source'] === undefined) return false;
    if (!('receipts' in value) || value['receipts'] === undefined) return false;
    return true;
}

export function TransactionStatementDTOFromJSON(json: any): TransactionStatementDTO {
    return TransactionStatementDTOFromJSONTyped(json, false);
}

export function TransactionStatementDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionStatementDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'height': json['height'],
        'source': SourceDTOFromJSON(json['source']),
        'receipts': ((json['receipts'] as Array<any>).map(TransactionStatementDTOReceiptsInnerFromJSON)),
    };
}

export function TransactionStatementDTOToJSON(json: any): TransactionStatementDTO {
    return TransactionStatementDTOToJSONTyped(json, false);
}

export function TransactionStatementDTOToJSONTyped(value?: TransactionStatementDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'height': value['height'],
        'source': SourceDTOToJSON(value['source']),
        'receipts': ((value['receipts'] as Array<any>).map(TransactionStatementDTOReceiptsInnerToJSON)),
    };
}

