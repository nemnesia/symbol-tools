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
import type { MosaicSupplyChangeActionEnum } from './MosaicSupplyChangeActionEnum.js';
import {
    MosaicSupplyChangeActionEnumFromJSON,
    MosaicSupplyChangeActionEnumFromJSONTyped,
    MosaicSupplyChangeActionEnumToJSON,
    MosaicSupplyChangeActionEnumToJSONTyped,
} from './MosaicSupplyChangeActionEnum.js';

/**
 * 
 * @export
 * @interface EmbeddedMosaicSupplyChangeTransactionDTO
 */
export interface EmbeddedMosaicSupplyChangeTransactionDTO {
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedMosaicSupplyChangeTransactionDTO
     */
    signerPublicKey: string;
    /**
     * Entity version.
     * @type {number}
     * @memberof EmbeddedMosaicSupplyChangeTransactionDTO
     */
    version: number;
    /**
     * 
     * @type {NetworkTypeEnum}
     * @memberof EmbeddedMosaicSupplyChangeTransactionDTO
     */
    network: NetworkTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof EmbeddedMosaicSupplyChangeTransactionDTO
     */
    type: number;
    /**
     * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
     * is used instead of the real mosaic identifier.
     * 
     * @type {string}
     * @memberof EmbeddedMosaicSupplyChangeTransactionDTO
     */
    mosaicId: string;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof EmbeddedMosaicSupplyChangeTransactionDTO
     */
    delta: string;
    /**
     * 
     * @type {MosaicSupplyChangeActionEnum}
     * @memberof EmbeddedMosaicSupplyChangeTransactionDTO
     */
    action: MosaicSupplyChangeActionEnum;
}



/**
 * Check if a given object implements the EmbeddedMosaicSupplyChangeTransactionDTO interface.
 */
export function instanceOfEmbeddedMosaicSupplyChangeTransactionDTO(value: object): value is EmbeddedMosaicSupplyChangeTransactionDTO {
    if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('network' in value) || value['network'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
    if (!('delta' in value) || value['delta'] === undefined) return false;
    if (!('action' in value) || value['action'] === undefined) return false;
    return true;
}

export function EmbeddedMosaicSupplyChangeTransactionDTOFromJSON(json: any): EmbeddedMosaicSupplyChangeTransactionDTO {
    return EmbeddedMosaicSupplyChangeTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedMosaicSupplyChangeTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedMosaicSupplyChangeTransactionDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'signerPublicKey': json['signerPublicKey'],
        'version': json['version'],
        'network': NetworkTypeEnumFromJSON(json['network']),
        'type': json['type'],
        'mosaicId': json['mosaicId'],
        'delta': json['delta'],
        'action': MosaicSupplyChangeActionEnumFromJSON(json['action']),
    };
}

export function EmbeddedMosaicSupplyChangeTransactionDTOToJSON(json: any): EmbeddedMosaicSupplyChangeTransactionDTO {
    return EmbeddedMosaicSupplyChangeTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedMosaicSupplyChangeTransactionDTOToJSONTyped(value?: EmbeddedMosaicSupplyChangeTransactionDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'signerPublicKey': value['signerPublicKey'],
        'version': value['version'],
        'network': NetworkTypeEnumToJSON(value['network']),
        'type': value['type'],
        'mosaicId': value['mosaicId'],
        'delta': value['delta'],
        'action': MosaicSupplyChangeActionEnumToJSON(value['action']),
    };
}

