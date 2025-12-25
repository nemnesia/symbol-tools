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
import type { MosaicExpiryReceiptDTO } from './MosaicExpiryReceiptDTO.js';
import {
    MosaicExpiryReceiptDTOFromJSON,
    MosaicExpiryReceiptDTOFromJSONTyped,
    MosaicExpiryReceiptDTOToJSON,
    MosaicExpiryReceiptDTOToJSONTyped,
} from './MosaicExpiryReceiptDTO.js';
import type { InflationReceiptDTO } from './InflationReceiptDTO.js';
import {
    InflationReceiptDTOFromJSON,
    InflationReceiptDTOFromJSONTyped,
    InflationReceiptDTOToJSON,
    InflationReceiptDTOToJSONTyped,
} from './InflationReceiptDTO.js';
import type { BalanceTransferReceiptDTO } from './BalanceTransferReceiptDTO.js';
import {
    BalanceTransferReceiptDTOFromJSON,
    BalanceTransferReceiptDTOFromJSONTyped,
    BalanceTransferReceiptDTOToJSON,
    BalanceTransferReceiptDTOToJSONTyped,
} from './BalanceTransferReceiptDTO.js';
import type { NamespaceExpiryReceiptDTO } from './NamespaceExpiryReceiptDTO.js';
import {
    NamespaceExpiryReceiptDTOFromJSON,
    NamespaceExpiryReceiptDTOFromJSONTyped,
    NamespaceExpiryReceiptDTOToJSON,
    NamespaceExpiryReceiptDTOToJSONTyped,
} from './NamespaceExpiryReceiptDTO.js';
import type { BalanceChangeReceiptDTO } from './BalanceChangeReceiptDTO.js';
import {
    BalanceChangeReceiptDTOFromJSON,
    BalanceChangeReceiptDTOFromJSONTyped,
    BalanceChangeReceiptDTOToJSON,
    BalanceChangeReceiptDTOToJSONTyped,
} from './BalanceChangeReceiptDTO.js';
import type { ReceiptTypeEnum } from './ReceiptTypeEnum.js';
import {
    ReceiptTypeEnumFromJSON,
    ReceiptTypeEnumFromJSONTyped,
    ReceiptTypeEnumToJSON,
    ReceiptTypeEnumToJSONTyped,
} from './ReceiptTypeEnum.js';

/**
 * 
 * @export
 * @interface TransactionStatementDTOReceiptsInner
 */
export interface TransactionStatementDTOReceiptsInner {
    /**
     * Version of the receipt.
     * @type {number}
     * @memberof TransactionStatementDTOReceiptsInner
     */
    version: number;
    /**
     * 
     * @type {ReceiptTypeEnum}
     * @memberof TransactionStatementDTOReceiptsInner
     */
    type: ReceiptTypeEnum;
    /**
     * Mosaic identifier.
     * @type {string}
     * @memberof TransactionStatementDTOReceiptsInner
     */
    mosaicId: string;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof TransactionStatementDTOReceiptsInner
     */
    amount: string;
    /**
     * Address encoded using a 32-character set.
     * @type {string}
     * @memberof TransactionStatementDTOReceiptsInner
     */
    senderAddress: string;
    /**
     * Address encoded using a 32-character set.
     * @type {string}
     * @memberof TransactionStatementDTOReceiptsInner
     */
    recipientAddress: string;
    /**
     * Address encoded using a 32-character set.
     * @type {string}
     * @memberof TransactionStatementDTOReceiptsInner
     */
    targetAddress: string;
    /**
     * Mosaic identifier.
     * @type {string}
     * @memberof TransactionStatementDTOReceiptsInner
     */
    artifactId: string;
}



/**
 * Check if a given object implements the TransactionStatementDTOReceiptsInner interface.
 */
export function instanceOfTransactionStatementDTOReceiptsInner(value: object): value is TransactionStatementDTOReceiptsInner {
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
    if (!('amount' in value) || value['amount'] === undefined) return false;
    if (!('senderAddress' in value) || value['senderAddress'] === undefined) return false;
    if (!('recipientAddress' in value) || value['recipientAddress'] === undefined) return false;
    if (!('targetAddress' in value) || value['targetAddress'] === undefined) return false;
    if (!('artifactId' in value) || value['artifactId'] === undefined) return false;
    return true;
}

export function TransactionStatementDTOReceiptsInnerFromJSON(json: any): TransactionStatementDTOReceiptsInner {
    return TransactionStatementDTOReceiptsInnerFromJSONTyped(json, false);
}

export function TransactionStatementDTOReceiptsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionStatementDTOReceiptsInner {
    if (json == null) {
        return json;
    }
    return {
        
        'version': json['version'],
        'type': ReceiptTypeEnumFromJSON(json['type']),
        'mosaicId': json['mosaicId'],
        'amount': json['amount'],
        'senderAddress': json['senderAddress'],
        'recipientAddress': json['recipientAddress'],
        'targetAddress': json['targetAddress'],
        'artifactId': json['artifactId'],
    };
}

export function TransactionStatementDTOReceiptsInnerToJSON(json: any): TransactionStatementDTOReceiptsInner {
    return TransactionStatementDTOReceiptsInnerToJSONTyped(json, false);
}

export function TransactionStatementDTOReceiptsInnerToJSONTyped(value?: TransactionStatementDTOReceiptsInner | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'version': value['version'],
        'type': ReceiptTypeEnumToJSON(value['type']),
        'mosaicId': value['mosaicId'],
        'amount': value['amount'],
        'senderAddress': value['senderAddress'],
        'recipientAddress': value['recipientAddress'],
        'targetAddress': value['targetAddress'],
        'artifactId': value['artifactId'],
    };
}

