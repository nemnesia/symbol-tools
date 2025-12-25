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
import type { MultisigAccountInfoDTO } from './MultisigAccountInfoDTO.js';
import {
    MultisigAccountInfoDTOFromJSON,
    MultisigAccountInfoDTOFromJSONTyped,
    MultisigAccountInfoDTOToJSON,
    MultisigAccountInfoDTOToJSONTyped,
} from './MultisigAccountInfoDTO.js';

/**
 * 
 * @export
 * @interface MultisigAccountGraphInfoDTO
 */
export interface MultisigAccountGraphInfoDTO {
    /**
     * Level of the multisig account.
     * @type {number}
     * @memberof MultisigAccountGraphInfoDTO
     */
    level: number;
    /**
     * Array of multisig accounts for this level.
     * @type {Array<MultisigAccountInfoDTO>}
     * @memberof MultisigAccountGraphInfoDTO
     */
    multisigEntries: Array<MultisigAccountInfoDTO>;
}

/**
 * Check if a given object implements the MultisigAccountGraphInfoDTO interface.
 */
export function instanceOfMultisigAccountGraphInfoDTO(value: object): value is MultisigAccountGraphInfoDTO {
    if (!('level' in value) || value['level'] === undefined) return false;
    if (!('multisigEntries' in value) || value['multisigEntries'] === undefined) return false;
    return true;
}

export function MultisigAccountGraphInfoDTOFromJSON(json: any): MultisigAccountGraphInfoDTO {
    return MultisigAccountGraphInfoDTOFromJSONTyped(json, false);
}

export function MultisigAccountGraphInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MultisigAccountGraphInfoDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'level': json['level'],
        'multisigEntries': ((json['multisigEntries'] as Array<any>).map(MultisigAccountInfoDTOFromJSON)),
    };
}

export function MultisigAccountGraphInfoDTOToJSON(json: any): MultisigAccountGraphInfoDTO {
    return MultisigAccountGraphInfoDTOToJSONTyped(json, false);
}

export function MultisigAccountGraphInfoDTOToJSONTyped(value?: MultisigAccountGraphInfoDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'level': value['level'],
        'multisigEntries': ((value['multisigEntries'] as Array<any>).map(MultisigAccountInfoDTOToJSON)),
    };
}

