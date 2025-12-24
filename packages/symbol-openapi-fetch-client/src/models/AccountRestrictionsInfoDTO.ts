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
import type { AccountRestrictionsDTO } from './AccountRestrictionsDTO.js';
import {
    AccountRestrictionsDTOFromJSON,
    AccountRestrictionsDTOFromJSONTyped,
    AccountRestrictionsDTOToJSON,
    AccountRestrictionsDTOToJSONTyped,
} from './AccountRestrictionsDTO.js';

/**
 * 
 * @export
 * @interface AccountRestrictionsInfoDTO
 */
export interface AccountRestrictionsInfoDTO {
    /**
     * 
     * @type {AccountRestrictionsDTO}
     * @memberof AccountRestrictionsInfoDTO
     */
    accountRestrictions: AccountRestrictionsDTO;
}

/**
 * Check if a given object implements the AccountRestrictionsInfoDTO interface.
 */
export function instanceOfAccountRestrictionsInfoDTO(value: object): value is AccountRestrictionsInfoDTO {
    if (!('accountRestrictions' in value) || value['accountRestrictions'] === undefined) return false;
    return true;
}

export function AccountRestrictionsInfoDTOFromJSON(json: any): AccountRestrictionsInfoDTO {
    return AccountRestrictionsInfoDTOFromJSONTyped(json, false);
}

export function AccountRestrictionsInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountRestrictionsInfoDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'accountRestrictions': AccountRestrictionsDTOFromJSON(json['accountRestrictions']),
    };
}

export function AccountRestrictionsInfoDTOToJSON(json: any): AccountRestrictionsInfoDTO {
    return AccountRestrictionsInfoDTOToJSONTyped(json, false);
}

export function AccountRestrictionsInfoDTOToJSONTyped(value?: AccountRestrictionsInfoDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'accountRestrictions': AccountRestrictionsDTOToJSON(value['accountRestrictions']),
    };
}

