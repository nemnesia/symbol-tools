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
import type { ReceiptTypeEnum } from './ReceiptTypeEnum.js';
import {
    ReceiptTypeEnumFromJSON,
    ReceiptTypeEnumFromJSONTyped,
    ReceiptTypeEnumToJSON,
    ReceiptTypeEnumToJSONTyped,
} from './ReceiptTypeEnum.js';

/**
 * Receipt stored when a state change modified an account balance.
 * @export
 * @interface BalanceChangeReceiptDTO
 */
export interface BalanceChangeReceiptDTO {
    /**
     * Version of the receipt.
     * @type {number}
     * @memberof BalanceChangeReceiptDTO
     */
    version: number;
    /**
     * 
     * @type {ReceiptTypeEnum}
     * @memberof BalanceChangeReceiptDTO
     */
    type: ReceiptTypeEnum;
    /**
     * Mosaic identifier.
     * @type {string}
     * @memberof BalanceChangeReceiptDTO
     */
    mosaicId: string;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof BalanceChangeReceiptDTO
     */
    amount: string;
    /**
     * Address encoded using a 32-character set.
     * @type {string}
     * @memberof BalanceChangeReceiptDTO
     */
    targetAddress: string;
}



/**
 * Check if a given object implements the BalanceChangeReceiptDTO interface.
 */
export function instanceOfBalanceChangeReceiptDTO(value: object): value is BalanceChangeReceiptDTO {
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
    if (!('amount' in value) || value['amount'] === undefined) return false;
    if (!('targetAddress' in value) || value['targetAddress'] === undefined) return false;
    return true;
}

export function BalanceChangeReceiptDTOFromJSON(json: any): BalanceChangeReceiptDTO {
    return BalanceChangeReceiptDTOFromJSONTyped(json, false);
}

export function BalanceChangeReceiptDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): BalanceChangeReceiptDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'version': json['version'],
        'type': ReceiptTypeEnumFromJSON(json['type']),
        'mosaicId': json['mosaicId'],
        'amount': json['amount'],
        'targetAddress': json['targetAddress'],
    };
}

export function BalanceChangeReceiptDTOToJSON(json: any): BalanceChangeReceiptDTO {
    return BalanceChangeReceiptDTOToJSONTyped(json, false);
}

export function BalanceChangeReceiptDTOToJSONTyped(value?: BalanceChangeReceiptDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'version': value['version'],
        'type': ReceiptTypeEnumToJSON(value['type']),
        'mosaicId': value['mosaicId'],
        'amount': value['amount'],
        'targetAddress': value['targetAddress'],
    };
}

