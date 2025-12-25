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
import type { AliasActionEnum } from './AliasActionEnum.js';
import {
    AliasActionEnumFromJSON,
    AliasActionEnumFromJSONTyped,
    AliasActionEnumToJSON,
    AliasActionEnumToJSONTyped,
} from './AliasActionEnum.js';

/**
 * 
 * @export
 * @interface EmbeddedAddressAliasTransactionDTO
 */
export interface EmbeddedAddressAliasTransactionDTO {
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedAddressAliasTransactionDTO
     */
    signerPublicKey: string;
    /**
     * Entity version.
     * @type {number}
     * @memberof EmbeddedAddressAliasTransactionDTO
     */
    version: number;
    /**
     * 
     * @type {NetworkTypeEnum}
     * @memberof EmbeddedAddressAliasTransactionDTO
     */
    network: NetworkTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof EmbeddedAddressAliasTransactionDTO
     */
    type: number;
    /**
     * Namespace identifier.
     * @type {string}
     * @memberof EmbeddedAddressAliasTransactionDTO
     */
    namespaceId: string;
    /**
     * Address encoded using a 32-character set.
     * @type {string}
     * @memberof EmbeddedAddressAliasTransactionDTO
     */
    address: string;
    /**
     * 
     * @type {AliasActionEnum}
     * @memberof EmbeddedAddressAliasTransactionDTO
     */
    aliasAction: AliasActionEnum;
}



/**
 * Check if a given object implements the EmbeddedAddressAliasTransactionDTO interface.
 */
export function instanceOfEmbeddedAddressAliasTransactionDTO(value: object): value is EmbeddedAddressAliasTransactionDTO {
    if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('network' in value) || value['network'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('namespaceId' in value) || value['namespaceId'] === undefined) return false;
    if (!('address' in value) || value['address'] === undefined) return false;
    if (!('aliasAction' in value) || value['aliasAction'] === undefined) return false;
    return true;
}

export function EmbeddedAddressAliasTransactionDTOFromJSON(json: any): EmbeddedAddressAliasTransactionDTO {
    return EmbeddedAddressAliasTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedAddressAliasTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedAddressAliasTransactionDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'signerPublicKey': json['signerPublicKey'],
        'version': json['version'],
        'network': NetworkTypeEnumFromJSON(json['network']),
        'type': json['type'],
        'namespaceId': json['namespaceId'],
        'address': json['address'],
        'aliasAction': AliasActionEnumFromJSON(json['aliasAction']),
    };
}

export function EmbeddedAddressAliasTransactionDTOToJSON(json: any): EmbeddedAddressAliasTransactionDTO {
    return EmbeddedAddressAliasTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedAddressAliasTransactionDTOToJSONTyped(value?: EmbeddedAddressAliasTransactionDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'signerPublicKey': value['signerPublicKey'],
        'version': value['version'],
        'network': NetworkTypeEnumToJSON(value['network']),
        'type': value['type'],
        'namespaceId': value['namespaceId'],
        'address': value['address'],
        'aliasAction': AliasActionEnumToJSON(value['aliasAction']),
    };
}

