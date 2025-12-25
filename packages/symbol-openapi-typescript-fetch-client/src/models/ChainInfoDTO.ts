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
import type { FinalizedBlockDTO } from './FinalizedBlockDTO.js';
import {
    FinalizedBlockDTOFromJSON,
    FinalizedBlockDTOFromJSONTyped,
    FinalizedBlockDTOToJSON,
    FinalizedBlockDTOToJSONTyped,
} from './FinalizedBlockDTO.js';

/**
 * 
 * @export
 * @interface ChainInfoDTO
 */
export interface ChainInfoDTO {
    /**
     * Height of the blockchain.
     * @type {string}
     * @memberof ChainInfoDTO
     */
    height: string;
    /**
     * Score of the blockchain. During synchronization, nodes try to get the
     * blockchain with highest score in the network.
     * 
     * @type {string}
     * @memberof ChainInfoDTO
     */
    scoreHigh: string;
    /**
     * Score of the blockchain. During synchronization, nodes try to get the
     * blockchain with highest score in the network.
     * 
     * @type {string}
     * @memberof ChainInfoDTO
     */
    scoreLow: string;
    /**
     * 
     * @type {FinalizedBlockDTO}
     * @memberof ChainInfoDTO
     */
    latestFinalizedBlock: FinalizedBlockDTO;
}

/**
 * Check if a given object implements the ChainInfoDTO interface.
 */
export function instanceOfChainInfoDTO(value: object): value is ChainInfoDTO {
    if (!('height' in value) || value['height'] === undefined) return false;
    if (!('scoreHigh' in value) || value['scoreHigh'] === undefined) return false;
    if (!('scoreLow' in value) || value['scoreLow'] === undefined) return false;
    if (!('latestFinalizedBlock' in value) || value['latestFinalizedBlock'] === undefined) return false;
    return true;
}

export function ChainInfoDTOFromJSON(json: any): ChainInfoDTO {
    return ChainInfoDTOFromJSONTyped(json, false);
}

export function ChainInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChainInfoDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'height': json['height'],
        'scoreHigh': json['scoreHigh'],
        'scoreLow': json['scoreLow'],
        'latestFinalizedBlock': FinalizedBlockDTOFromJSON(json['latestFinalizedBlock']),
    };
}

export function ChainInfoDTOToJSON(json: any): ChainInfoDTO {
    return ChainInfoDTOToJSONTyped(json, false);
}

export function ChainInfoDTOToJSONTyped(value?: ChainInfoDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'height': value['height'],
        'scoreHigh': value['scoreHigh'],
        'scoreLow': value['scoreLow'],
        'latestFinalizedBlock': FinalizedBlockDTOToJSON(value['latestFinalizedBlock']),
    };
}

