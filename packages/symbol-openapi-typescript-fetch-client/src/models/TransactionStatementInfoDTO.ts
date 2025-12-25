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
import type { StatementMetaDTO } from './StatementMetaDTO.js';
import {
    StatementMetaDTOFromJSON,
    StatementMetaDTOFromJSONTyped,
    StatementMetaDTOToJSON,
    StatementMetaDTOToJSONTyped,
} from './StatementMetaDTO.js';
import type { TransactionStatementDTO } from './TransactionStatementDTO.js';
import {
    TransactionStatementDTOFromJSON,
    TransactionStatementDTOFromJSONTyped,
    TransactionStatementDTOToJSON,
    TransactionStatementDTOToJSONTyped,
} from './TransactionStatementDTO.js';

/**
 * Collection of receipts related to a transaction.
 * @export
 * @interface TransactionStatementInfoDTO
 */
export interface TransactionStatementInfoDTO {
    /**
     * Internal resource identifier.
     * @type {string}
     * @memberof TransactionStatementInfoDTO
     */
    id: string;
    /**
     * 
     * @type {StatementMetaDTO}
     * @memberof TransactionStatementInfoDTO
     */
    meta: StatementMetaDTO;
    /**
     * 
     * @type {TransactionStatementDTO}
     * @memberof TransactionStatementInfoDTO
     */
    statement: TransactionStatementDTO;
}

/**
 * Check if a given object implements the TransactionStatementInfoDTO interface.
 */
export function instanceOfTransactionStatementInfoDTO(value: object): value is TransactionStatementInfoDTO {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('meta' in value) || value['meta'] === undefined) return false;
    if (!('statement' in value) || value['statement'] === undefined) return false;
    return true;
}

export function TransactionStatementInfoDTOFromJSON(json: any): TransactionStatementInfoDTO {
    return TransactionStatementInfoDTOFromJSONTyped(json, false);
}

export function TransactionStatementInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionStatementInfoDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'meta': StatementMetaDTOFromJSON(json['meta']),
        'statement': TransactionStatementDTOFromJSON(json['statement']),
    };
}

export function TransactionStatementInfoDTOToJSON(json: any): TransactionStatementInfoDTO {
    return TransactionStatementInfoDTOToJSONTyped(json, false);
}

export function TransactionStatementInfoDTOToJSONTyped(value?: TransactionStatementInfoDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'meta': StatementMetaDTOToJSON(value['meta']),
        'statement': TransactionStatementDTOToJSON(value['statement']),
    };
}

