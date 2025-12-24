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
import type { BlockMetaDTO } from './BlockMetaDTO.js';
import {
    BlockMetaDTOFromJSON,
    BlockMetaDTOFromJSONTyped,
    BlockMetaDTOToJSON,
    BlockMetaDTOToJSONTyped,
} from './BlockMetaDTO.js';
import type { BlockInfoDTOBlock } from './BlockInfoDTOBlock.js';
import {
    BlockInfoDTOBlockFromJSON,
    BlockInfoDTOBlockFromJSONTyped,
    BlockInfoDTOBlockToJSON,
    BlockInfoDTOBlockToJSONTyped,
} from './BlockInfoDTOBlock.js';

/**
 * 
 * @export
 * @interface BlockInfoDTO
 */
export interface BlockInfoDTO {
    /**
     * Internal resource identifier.
     * @type {string}
     * @memberof BlockInfoDTO
     */
    id: string;
    /**
     * 
     * @type {BlockMetaDTO}
     * @memberof BlockInfoDTO
     */
    meta: BlockMetaDTO;
    /**
     * 
     * @type {BlockInfoDTOBlock}
     * @memberof BlockInfoDTO
     */
    block: BlockInfoDTOBlock;
}

/**
 * Check if a given object implements the BlockInfoDTO interface.
 */
export function instanceOfBlockInfoDTO(value: object): value is BlockInfoDTO {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('meta' in value) || value['meta'] === undefined) return false;
    if (!('block' in value) || value['block'] === undefined) return false;
    return true;
}

export function BlockInfoDTOFromJSON(json: any): BlockInfoDTO {
    return BlockInfoDTOFromJSONTyped(json, false);
}

export function BlockInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlockInfoDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'meta': BlockMetaDTOFromJSON(json['meta']),
        'block': BlockInfoDTOBlockFromJSON(json['block']),
    };
}

export function BlockInfoDTOToJSON(json: any): BlockInfoDTO {
    return BlockInfoDTOToJSONTyped(json, false);
}

export function BlockInfoDTOToJSONTyped(value?: BlockInfoDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'meta': BlockMetaDTOToJSON(value['meta']),
        'block': BlockInfoDTOBlockToJSON(value['block']),
    };
}

