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
import type { LinkActionEnum } from './LinkActionEnum.js';
import {
    LinkActionEnumFromJSON,
    LinkActionEnumFromJSONTyped,
    LinkActionEnumToJSON,
    LinkActionEnumToJSONTyped,
} from './LinkActionEnum.js';

/**
 * 
 * @export
 * @interface EmbeddedNodeKeyLinkTransactionDTO
 */
export interface EmbeddedNodeKeyLinkTransactionDTO {
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedNodeKeyLinkTransactionDTO
     */
    signerPublicKey: string;
    /**
     * Entity version.
     * @type {number}
     * @memberof EmbeddedNodeKeyLinkTransactionDTO
     */
    version: number;
    /**
     * 
     * @type {NetworkTypeEnum}
     * @memberof EmbeddedNodeKeyLinkTransactionDTO
     */
    network: NetworkTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof EmbeddedNodeKeyLinkTransactionDTO
     */
    type: number;
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedNodeKeyLinkTransactionDTO
     */
    linkedPublicKey: string;
    /**
     * 
     * @type {LinkActionEnum}
     * @memberof EmbeddedNodeKeyLinkTransactionDTO
     */
    linkAction: LinkActionEnum;
}



/**
 * Check if a given object implements the EmbeddedNodeKeyLinkTransactionDTO interface.
 */
export function instanceOfEmbeddedNodeKeyLinkTransactionDTO(value: object): value is EmbeddedNodeKeyLinkTransactionDTO {
    if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('network' in value) || value['network'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('linkedPublicKey' in value) || value['linkedPublicKey'] === undefined) return false;
    if (!('linkAction' in value) || value['linkAction'] === undefined) return false;
    return true;
}

export function EmbeddedNodeKeyLinkTransactionDTOFromJSON(json: any): EmbeddedNodeKeyLinkTransactionDTO {
    return EmbeddedNodeKeyLinkTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedNodeKeyLinkTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedNodeKeyLinkTransactionDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'signerPublicKey': json['signerPublicKey'],
        'version': json['version'],
        'network': NetworkTypeEnumFromJSON(json['network']),
        'type': json['type'],
        'linkedPublicKey': json['linkedPublicKey'],
        'linkAction': LinkActionEnumFromJSON(json['linkAction']),
    };
}

export function EmbeddedNodeKeyLinkTransactionDTOToJSON(json: any): EmbeddedNodeKeyLinkTransactionDTO {
    return EmbeddedNodeKeyLinkTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedNodeKeyLinkTransactionDTOToJSONTyped(value?: EmbeddedNodeKeyLinkTransactionDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'signerPublicKey': value['signerPublicKey'],
        'version': value['version'],
        'network': NetworkTypeEnumToJSON(value['network']),
        'type': value['type'],
        'linkedPublicKey': value['linkedPublicKey'],
        'linkAction': LinkActionEnumToJSON(value['linkAction']),
    };
}

