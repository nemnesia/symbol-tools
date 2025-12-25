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
 * @interface EmbeddedAccountKeyLinkTransactionDTO
 */
export interface EmbeddedAccountKeyLinkTransactionDTO {
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedAccountKeyLinkTransactionDTO
     */
    signerPublicKey: string;
    /**
     * Entity version.
     * @type {number}
     * @memberof EmbeddedAccountKeyLinkTransactionDTO
     */
    version: number;
    /**
     * 
     * @type {NetworkTypeEnum}
     * @memberof EmbeddedAccountKeyLinkTransactionDTO
     */
    network: NetworkTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof EmbeddedAccountKeyLinkTransactionDTO
     */
    type: number;
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedAccountKeyLinkTransactionDTO
     */
    linkedPublicKey: string;
    /**
     * 
     * @type {LinkActionEnum}
     * @memberof EmbeddedAccountKeyLinkTransactionDTO
     */
    linkAction: LinkActionEnum;
}



/**
 * Check if a given object implements the EmbeddedAccountKeyLinkTransactionDTO interface.
 */
export function instanceOfEmbeddedAccountKeyLinkTransactionDTO(value: object): value is EmbeddedAccountKeyLinkTransactionDTO {
    if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('network' in value) || value['network'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('linkedPublicKey' in value) || value['linkedPublicKey'] === undefined) return false;
    if (!('linkAction' in value) || value['linkAction'] === undefined) return false;
    return true;
}

export function EmbeddedAccountKeyLinkTransactionDTOFromJSON(json: any): EmbeddedAccountKeyLinkTransactionDTO {
    return EmbeddedAccountKeyLinkTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedAccountKeyLinkTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedAccountKeyLinkTransactionDTO {
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

export function EmbeddedAccountKeyLinkTransactionDTOToJSON(json: any): EmbeddedAccountKeyLinkTransactionDTO {
    return EmbeddedAccountKeyLinkTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedAccountKeyLinkTransactionDTOToJSONTyped(value?: EmbeddedAccountKeyLinkTransactionDTO | null, ignoreDiscriminator: boolean = false): any {
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

