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
import type { MessageGroup } from './MessageGroup.js';
import {
    MessageGroupFromJSON,
    MessageGroupFromJSONTyped,
    MessageGroupToJSON,
    MessageGroupToJSONTyped,
} from './MessageGroup.js';

/**
 * 
 * @export
 * @interface FinalizationProofDTO
 */
export interface FinalizationProofDTO {
    /**
     * 
     * @type {number}
     * @memberof FinalizationProofDTO
     */
    version: number;
    /**
     * Finalization Epoch
     * @type {number}
     * @memberof FinalizationProofDTO
     */
    finalizationEpoch: number;
    /**
     * Finalization point
     * @type {number}
     * @memberof FinalizationProofDTO
     */
    finalizationPoint: number;
    /**
     * Height of the blockchain.
     * @type {string}
     * @memberof FinalizationProofDTO
     */
    height: string;
    /**
     * 
     * @type {string}
     * @memberof FinalizationProofDTO
     */
    hash: string;
    /**
     * 
     * @type {Array<MessageGroup>}
     * @memberof FinalizationProofDTO
     */
    messageGroups: Array<MessageGroup>;
}

/**
 * Check if a given object implements the FinalizationProofDTO interface.
 */
export function instanceOfFinalizationProofDTO(value: object): value is FinalizationProofDTO {
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('finalizationEpoch' in value) || value['finalizationEpoch'] === undefined) return false;
    if (!('finalizationPoint' in value) || value['finalizationPoint'] === undefined) return false;
    if (!('height' in value) || value['height'] === undefined) return false;
    if (!('hash' in value) || value['hash'] === undefined) return false;
    if (!('messageGroups' in value) || value['messageGroups'] === undefined) return false;
    return true;
}

export function FinalizationProofDTOFromJSON(json: any): FinalizationProofDTO {
    return FinalizationProofDTOFromJSONTyped(json, false);
}

export function FinalizationProofDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): FinalizationProofDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'version': json['version'],
        'finalizationEpoch': json['finalizationEpoch'],
        'finalizationPoint': json['finalizationPoint'],
        'height': json['height'],
        'hash': json['hash'],
        'messageGroups': ((json['messageGroups'] as Array<any>).map(MessageGroupFromJSON)),
    };
}

export function FinalizationProofDTOToJSON(json: any): FinalizationProofDTO {
    return FinalizationProofDTOToJSONTyped(json, false);
}

export function FinalizationProofDTOToJSONTyped(value?: FinalizationProofDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'version': value['version'],
        'finalizationEpoch': value['finalizationEpoch'],
        'finalizationPoint': value['finalizationPoint'],
        'height': value['height'],
        'hash': value['hash'],
        'messageGroups': ((value['messageGroups'] as Array<any>).map(MessageGroupToJSON)),
    };
}

