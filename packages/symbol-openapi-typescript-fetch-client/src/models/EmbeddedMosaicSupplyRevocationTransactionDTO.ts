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
import type { NetworkTypeEnum } from './NetworkTypeEnum.js';
import {
    NetworkTypeEnumFromJSON,
    NetworkTypeEnumFromJSONTyped,
    NetworkTypeEnumToJSON,
    NetworkTypeEnumToJSONTyped,
} from './NetworkTypeEnum.js';

/**
 * 
 * @export
 * @interface EmbeddedMosaicSupplyRevocationTransactionDTO
 */
export interface EmbeddedMosaicSupplyRevocationTransactionDTO {
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedMosaicSupplyRevocationTransactionDTO
     */
    signerPublicKey: string;
    /**
     * Entity version.
     * @type {number}
     * @memberof EmbeddedMosaicSupplyRevocationTransactionDTO
     */
    version: number;
    /**
     * 
     * @type {NetworkTypeEnum}
     * @memberof EmbeddedMosaicSupplyRevocationTransactionDTO
     */
    network: NetworkTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof EmbeddedMosaicSupplyRevocationTransactionDTO
     */
    type: number;
    /**
     * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
     * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA.
     * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
     * 
     * @type {string}
     * @memberof EmbeddedMosaicSupplyRevocationTransactionDTO
     */
    sourceAddress: string;
    /**
     * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
     * is used instead of the real mosaic identifier.
     * 
     * @type {string}
     * @memberof EmbeddedMosaicSupplyRevocationTransactionDTO
     */
    mosaicId: string;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof EmbeddedMosaicSupplyRevocationTransactionDTO
     */
    amount: string;
}



/**
 * Check if a given object implements the EmbeddedMosaicSupplyRevocationTransactionDTO interface.
 */
export function instanceOfEmbeddedMosaicSupplyRevocationTransactionDTO(value: object): value is EmbeddedMosaicSupplyRevocationTransactionDTO {
    if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('network' in value) || value['network'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('sourceAddress' in value) || value['sourceAddress'] === undefined) return false;
    if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
    if (!('amount' in value) || value['amount'] === undefined) return false;
    return true;
}

export function EmbeddedMosaicSupplyRevocationTransactionDTOFromJSON(json: any): EmbeddedMosaicSupplyRevocationTransactionDTO {
    return EmbeddedMosaicSupplyRevocationTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedMosaicSupplyRevocationTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedMosaicSupplyRevocationTransactionDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'signerPublicKey': json['signerPublicKey'],
        'version': json['version'],
        'network': NetworkTypeEnumFromJSON(json['network']),
        'type': json['type'],
        'sourceAddress': json['sourceAddress'],
        'mosaicId': json['mosaicId'],
        'amount': json['amount'],
    };
}

export function EmbeddedMosaicSupplyRevocationTransactionDTOToJSON(json: any): EmbeddedMosaicSupplyRevocationTransactionDTO {
    return EmbeddedMosaicSupplyRevocationTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedMosaicSupplyRevocationTransactionDTOToJSONTyped(value?: EmbeddedMosaicSupplyRevocationTransactionDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'signerPublicKey': value['signerPublicKey'],
        'version': value['version'],
        'network': NetworkTypeEnumToJSON(value['network']),
        'type': value['type'],
        'sourceAddress': value['sourceAddress'],
        'mosaicId': value['mosaicId'],
        'amount': value['amount'],
    };
}

