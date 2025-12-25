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
import type { AccountLinkVotingKeyDTO } from './AccountLinkVotingKeyDTO.js';
import {
    AccountLinkVotingKeyDTOFromJSON,
    AccountLinkVotingKeyDTOFromJSONTyped,
    AccountLinkVotingKeyDTOToJSON,
    AccountLinkVotingKeyDTOToJSONTyped,
} from './AccountLinkVotingKeyDTO.js';

/**
 * 
 * @export
 * @interface AccountLinkVotingKeysDTO
 */
export interface AccountLinkVotingKeysDTO {
    /**
     * 
     * @type {Array<AccountLinkVotingKeyDTO>}
     * @memberof AccountLinkVotingKeysDTO
     */
    publicKeys: Array<AccountLinkVotingKeyDTO>;
}

/**
 * Check if a given object implements the AccountLinkVotingKeysDTO interface.
 */
export function instanceOfAccountLinkVotingKeysDTO(value: object): value is AccountLinkVotingKeysDTO {
    if (!('publicKeys' in value) || value['publicKeys'] === undefined) return false;
    return true;
}

export function AccountLinkVotingKeysDTOFromJSON(json: any): AccountLinkVotingKeysDTO {
    return AccountLinkVotingKeysDTOFromJSONTyped(json, false);
}

export function AccountLinkVotingKeysDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountLinkVotingKeysDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'publicKeys': ((json['publicKeys'] as Array<any>).map(AccountLinkVotingKeyDTOFromJSON)),
    };
}

export function AccountLinkVotingKeysDTOToJSON(json: any): AccountLinkVotingKeysDTO {
    return AccountLinkVotingKeysDTOToJSONTyped(json, false);
}

export function AccountLinkVotingKeysDTOToJSONTyped(value?: AccountLinkVotingKeysDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'publicKeys': ((value['publicKeys'] as Array<any>).map(AccountLinkVotingKeyDTOToJSON)),
    };
}

