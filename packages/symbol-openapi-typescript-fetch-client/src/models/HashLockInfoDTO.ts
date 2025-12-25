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
import type { HashLockEntryDTO } from './HashLockEntryDTO.js';
import {
    HashLockEntryDTOFromJSON,
    HashLockEntryDTOFromJSONTyped,
    HashLockEntryDTOToJSON,
    HashLockEntryDTOToJSONTyped,
} from './HashLockEntryDTO.js';

/**
 * 
 * @export
 * @interface HashLockInfoDTO
 */
export interface HashLockInfoDTO {
    /**
     * 
     * @type {string}
     * @memberof HashLockInfoDTO
     */
    id: string;
    /**
     * 
     * @type {HashLockEntryDTO}
     * @memberof HashLockInfoDTO
     */
    lock: HashLockEntryDTO;
}

/**
 * Check if a given object implements the HashLockInfoDTO interface.
 */
export function instanceOfHashLockInfoDTO(value: object): value is HashLockInfoDTO {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('lock' in value) || value['lock'] === undefined) return false;
    return true;
}

export function HashLockInfoDTOFromJSON(json: any): HashLockInfoDTO {
    return HashLockInfoDTOFromJSONTyped(json, false);
}

export function HashLockInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): HashLockInfoDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'lock': HashLockEntryDTOFromJSON(json['lock']),
    };
}

export function HashLockInfoDTOToJSON(json: any): HashLockInfoDTO {
    return HashLockInfoDTOToJSONTyped(json, false);
}

export function HashLockInfoDTOToJSONTyped(value?: HashLockInfoDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'lock': HashLockEntryDTOToJSON(value['lock']),
    };
}

