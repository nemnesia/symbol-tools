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
 * @interface AccountLinkPublicKeyDTO
 */
export interface AccountLinkPublicKeyDTO {
    /**
     * 
     * @type {string}
     * @memberof AccountLinkPublicKeyDTO
     */
    publicKey: string;
}

/**
 * Check if a given object implements the AccountLinkPublicKeyDTO interface.
 */
export function instanceOfAccountLinkPublicKeyDTO(value: object): value is AccountLinkPublicKeyDTO {
    if (!('publicKey' in value) || value['publicKey'] === undefined) return false;
    return true;
}

export function AccountLinkPublicKeyDTOFromJSON(json: any): AccountLinkPublicKeyDTO {
    return AccountLinkPublicKeyDTOFromJSONTyped(json, false);
}

export function AccountLinkPublicKeyDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountLinkPublicKeyDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'publicKey': json['publicKey'],
    };
}

export function AccountLinkPublicKeyDTOToJSON(json: any): AccountLinkPublicKeyDTO {
    return AccountLinkPublicKeyDTOToJSONTyped(json, false);
}

export function AccountLinkPublicKeyDTOToJSONTyped(value?: AccountLinkPublicKeyDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'publicKey': value['publicKey'],
    };
}

