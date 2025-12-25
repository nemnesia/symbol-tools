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
 * @interface EmbeddedVotingKeyLinkTransactionDTO
 */
export interface EmbeddedVotingKeyLinkTransactionDTO {
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedVotingKeyLinkTransactionDTO
     */
    signerPublicKey: string;
    /**
     * Entity version.
     * @type {number}
     * @memberof EmbeddedVotingKeyLinkTransactionDTO
     */
    version: number;
    /**
     * 
     * @type {NetworkTypeEnum}
     * @memberof EmbeddedVotingKeyLinkTransactionDTO
     */
    network: NetworkTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof EmbeddedVotingKeyLinkTransactionDTO
     */
    type: number;
    /**
     * 32 bytes voting public key.
     * @type {string}
     * @memberof EmbeddedVotingKeyLinkTransactionDTO
     */
    linkedPublicKey: string;
    /**
     * Finalization Epoch
     * @type {number}
     * @memberof EmbeddedVotingKeyLinkTransactionDTO
     */
    startEpoch: number;
    /**
     * Finalization Epoch
     * @type {number}
     * @memberof EmbeddedVotingKeyLinkTransactionDTO
     */
    endEpoch: number;
    /**
     * 
     * @type {LinkActionEnum}
     * @memberof EmbeddedVotingKeyLinkTransactionDTO
     */
    linkAction: LinkActionEnum;
}



/**
 * Check if a given object implements the EmbeddedVotingKeyLinkTransactionDTO interface.
 */
export function instanceOfEmbeddedVotingKeyLinkTransactionDTO(value: object): value is EmbeddedVotingKeyLinkTransactionDTO {
    if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('network' in value) || value['network'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('linkedPublicKey' in value) || value['linkedPublicKey'] === undefined) return false;
    if (!('startEpoch' in value) || value['startEpoch'] === undefined) return false;
    if (!('endEpoch' in value) || value['endEpoch'] === undefined) return false;
    if (!('linkAction' in value) || value['linkAction'] === undefined) return false;
    return true;
}

export function EmbeddedVotingKeyLinkTransactionDTOFromJSON(json: any): EmbeddedVotingKeyLinkTransactionDTO {
    return EmbeddedVotingKeyLinkTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedVotingKeyLinkTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedVotingKeyLinkTransactionDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'signerPublicKey': json['signerPublicKey'],
        'version': json['version'],
        'network': NetworkTypeEnumFromJSON(json['network']),
        'type': json['type'],
        'linkedPublicKey': json['linkedPublicKey'],
        'startEpoch': json['startEpoch'],
        'endEpoch': json['endEpoch'],
        'linkAction': LinkActionEnumFromJSON(json['linkAction']),
    };
}

export function EmbeddedVotingKeyLinkTransactionDTOToJSON(json: any): EmbeddedVotingKeyLinkTransactionDTO {
    return EmbeddedVotingKeyLinkTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedVotingKeyLinkTransactionDTOToJSONTyped(value?: EmbeddedVotingKeyLinkTransactionDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'signerPublicKey': value['signerPublicKey'],
        'version': value['version'],
        'network': NetworkTypeEnumToJSON(value['network']),
        'type': value['type'],
        'linkedPublicKey': value['linkedPublicKey'],
        'startEpoch': value['startEpoch'],
        'endEpoch': value['endEpoch'],
        'linkAction': LinkActionEnumToJSON(value['linkAction']),
    };
}

