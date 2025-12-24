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
import type { AccountLinkPublicKeyDTO } from './AccountLinkPublicKeyDTO.js';
import {
    AccountLinkPublicKeyDTOFromJSON,
    AccountLinkPublicKeyDTOFromJSONTyped,
    AccountLinkPublicKeyDTOToJSON,
    AccountLinkPublicKeyDTOToJSONTyped,
} from './AccountLinkPublicKeyDTO.js';
import type { AccountLinkVotingKeysDTO } from './AccountLinkVotingKeysDTO.js';
import {
    AccountLinkVotingKeysDTOFromJSON,
    AccountLinkVotingKeysDTOFromJSONTyped,
    AccountLinkVotingKeysDTOToJSON,
    AccountLinkVotingKeysDTOToJSONTyped,
} from './AccountLinkVotingKeysDTO.js';

/**
 * 
 * @export
 * @interface SupplementalPublicKeysDTO
 */
export interface SupplementalPublicKeysDTO {
    /**
     * 
     * @type {AccountLinkPublicKeyDTO}
     * @memberof SupplementalPublicKeysDTO
     */
    linked?: AccountLinkPublicKeyDTO;
    /**
     * 
     * @type {AccountLinkPublicKeyDTO}
     * @memberof SupplementalPublicKeysDTO
     */
    node?: AccountLinkPublicKeyDTO;
    /**
     * 
     * @type {AccountLinkPublicKeyDTO}
     * @memberof SupplementalPublicKeysDTO
     */
    vrf?: AccountLinkPublicKeyDTO;
    /**
     * 
     * @type {AccountLinkVotingKeysDTO}
     * @memberof SupplementalPublicKeysDTO
     */
    voting?: AccountLinkVotingKeysDTO;
}

/**
 * Check if a given object implements the SupplementalPublicKeysDTO interface.
 */
export function instanceOfSupplementalPublicKeysDTO(value: object): value is SupplementalPublicKeysDTO {
    return true;
}

export function SupplementalPublicKeysDTOFromJSON(json: any): SupplementalPublicKeysDTO {
    return SupplementalPublicKeysDTOFromJSONTyped(json, false);
}

export function SupplementalPublicKeysDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SupplementalPublicKeysDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'linked': json['linked'] == null ? undefined : AccountLinkPublicKeyDTOFromJSON(json['linked']),
        'node': json['node'] == null ? undefined : AccountLinkPublicKeyDTOFromJSON(json['node']),
        'vrf': json['vrf'] == null ? undefined : AccountLinkPublicKeyDTOFromJSON(json['vrf']),
        'voting': json['voting'] == null ? undefined : AccountLinkVotingKeysDTOFromJSON(json['voting']),
    };
}

export function SupplementalPublicKeysDTOToJSON(json: any): SupplementalPublicKeysDTO {
    return SupplementalPublicKeysDTOToJSONTyped(json, false);
}

export function SupplementalPublicKeysDTOToJSONTyped(value?: SupplementalPublicKeysDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'linked': AccountLinkPublicKeyDTOToJSON(value['linked']),
        'node': AccountLinkPublicKeyDTOToJSON(value['node']),
        'vrf': AccountLinkPublicKeyDTOToJSON(value['vrf']),
        'voting': AccountLinkVotingKeysDTOToJSON(value['voting']),
    };
}

