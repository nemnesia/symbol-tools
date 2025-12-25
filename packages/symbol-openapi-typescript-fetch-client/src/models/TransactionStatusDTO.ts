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
import type { TransactionGroupEnum } from './TransactionGroupEnum.js';
import {
    TransactionGroupEnumFromJSON,
    TransactionGroupEnumFromJSONTyped,
    TransactionGroupEnumToJSON,
    TransactionGroupEnumToJSONTyped,
} from './TransactionGroupEnum.js';
import type { TransactionStatusEnum } from './TransactionStatusEnum.js';
import {
    TransactionStatusEnumFromJSON,
    TransactionStatusEnumFromJSONTyped,
    TransactionStatusEnumToJSON,
    TransactionStatusEnumToJSONTyped,
} from './TransactionStatusEnum.js';

/**
 * 
 * @export
 * @interface TransactionStatusDTO
 */
export interface TransactionStatusDTO {
    /**
     * 
     * @type {TransactionGroupEnum}
     * @memberof TransactionStatusDTO
     */
    group: TransactionGroupEnum;
    /**
     * 
     * @type {TransactionStatusEnum}
     * @memberof TransactionStatusDTO
     */
    code?: TransactionStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof TransactionStatusDTO
     */
    hash: string;
    /**
     * Duration expressed in number of blocks.
     * @type {string}
     * @memberof TransactionStatusDTO
     */
    deadline: string;
    /**
     * Height of the blockchain.
     * @type {string}
     * @memberof TransactionStatusDTO
     */
    height?: string;
}



/**
 * Check if a given object implements the TransactionStatusDTO interface.
 */
export function instanceOfTransactionStatusDTO(value: object): value is TransactionStatusDTO {
    if (!('group' in value) || value['group'] === undefined) return false;
    if (!('hash' in value) || value['hash'] === undefined) return false;
    if (!('deadline' in value) || value['deadline'] === undefined) return false;
    return true;
}

export function TransactionStatusDTOFromJSON(json: any): TransactionStatusDTO {
    return TransactionStatusDTOFromJSONTyped(json, false);
}

export function TransactionStatusDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionStatusDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'group': TransactionGroupEnumFromJSON(json['group']),
        'code': json['code'] == null ? undefined : TransactionStatusEnumFromJSON(json['code']),
        'hash': json['hash'],
        'deadline': json['deadline'],
        'height': json['height'] == null ? undefined : json['height'],
    };
}

export function TransactionStatusDTOToJSON(json: any): TransactionStatusDTO {
    return TransactionStatusDTOToJSONTyped(json, false);
}

export function TransactionStatusDTOToJSONTyped(value?: TransactionStatusDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'group': TransactionGroupEnumToJSON(value['group']),
        'code': TransactionStatusEnumToJSON(value['code']),
        'hash': value['hash'],
        'deadline': value['deadline'],
        'height': value['height'],
    };
}

