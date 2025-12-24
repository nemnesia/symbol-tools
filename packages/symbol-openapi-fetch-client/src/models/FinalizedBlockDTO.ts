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
/**
 * 
 * @export
 * @interface FinalizedBlockDTO
 */
export interface FinalizedBlockDTO {
    /**
     * Finalization Epoch
     * @type {number}
     * @memberof FinalizedBlockDTO
     */
    finalizationEpoch: number;
    /**
     * Finalization point
     * @type {number}
     * @memberof FinalizedBlockDTO
     */
    finalizationPoint: number;
    /**
     * Height of the blockchain.
     * @type {string}
     * @memberof FinalizedBlockDTO
     */
    height: string;
    /**
     * 
     * @type {string}
     * @memberof FinalizedBlockDTO
     */
    hash: string;
}

/**
 * Check if a given object implements the FinalizedBlockDTO interface.
 */
export function instanceOfFinalizedBlockDTO(value: object): value is FinalizedBlockDTO {
    if (!('finalizationEpoch' in value) || value['finalizationEpoch'] === undefined) return false;
    if (!('finalizationPoint' in value) || value['finalizationPoint'] === undefined) return false;
    if (!('height' in value) || value['height'] === undefined) return false;
    if (!('hash' in value) || value['hash'] === undefined) return false;
    return true;
}

export function FinalizedBlockDTOFromJSON(json: any): FinalizedBlockDTO {
    return FinalizedBlockDTOFromJSONTyped(json, false);
}

export function FinalizedBlockDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): FinalizedBlockDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'finalizationEpoch': json['finalizationEpoch'],
        'finalizationPoint': json['finalizationPoint'],
        'height': json['height'],
        'hash': json['hash'],
    };
}

export function FinalizedBlockDTOToJSON(json: any): FinalizedBlockDTO {
    return FinalizedBlockDTOToJSONTyped(json, false);
}

export function FinalizedBlockDTOToJSONTyped(value?: FinalizedBlockDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'finalizationEpoch': value['finalizationEpoch'],
        'finalizationPoint': value['finalizationPoint'],
        'height': value['height'],
        'hash': value['hash'],
    };
}

