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
import type { NetworkTypeEnum } from './NetworkTypeEnum.js';
import {
    NetworkTypeEnumFromJSON,
    NetworkTypeEnumFromJSONTyped,
    NetworkTypeEnumToJSON,
    NetworkTypeEnumToJSONTyped,
} from './NetworkTypeEnum.js';
import type { AccountRestrictionFlagsEnum } from './AccountRestrictionFlagsEnum.js';
import {
    AccountRestrictionFlagsEnumFromJSON,
    AccountRestrictionFlagsEnumFromJSONTyped,
    AccountRestrictionFlagsEnumToJSON,
    AccountRestrictionFlagsEnumToJSONTyped,
} from './AccountRestrictionFlagsEnum.js';

/**
 * 
 * @export
 * @interface EmbeddedAccountMosaicRestrictionTransactionDTO
 */
export interface EmbeddedAccountMosaicRestrictionTransactionDTO {
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedAccountMosaicRestrictionTransactionDTO
     */
    signerPublicKey: string;
    /**
     * Entity version.
     * @type {number}
     * @memberof EmbeddedAccountMosaicRestrictionTransactionDTO
     */
    version: number;
    /**
     * 
     * @type {NetworkTypeEnum}
     * @memberof EmbeddedAccountMosaicRestrictionTransactionDTO
     */
    network: NetworkTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof EmbeddedAccountMosaicRestrictionTransactionDTO
     */
    type: number;
    /**
     * 
     * @type {AccountRestrictionFlagsEnum}
     * @memberof EmbeddedAccountMosaicRestrictionTransactionDTO
     */
    restrictionFlags: AccountRestrictionFlagsEnum;
    /**
     * Account restriction additions.
     * @type {Array<string>}
     * @memberof EmbeddedAccountMosaicRestrictionTransactionDTO
     */
    restrictionAdditions: Array<string>;
    /**
     * Account restriction deletions.
     * @type {Array<string>}
     * @memberof EmbeddedAccountMosaicRestrictionTransactionDTO
     */
    restrictionDeletions: Array<string>;
}



/**
 * Check if a given object implements the EmbeddedAccountMosaicRestrictionTransactionDTO interface.
 */
export function instanceOfEmbeddedAccountMosaicRestrictionTransactionDTO(value: object): value is EmbeddedAccountMosaicRestrictionTransactionDTO {
    if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('network' in value) || value['network'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('restrictionFlags' in value) || value['restrictionFlags'] === undefined) return false;
    if (!('restrictionAdditions' in value) || value['restrictionAdditions'] === undefined) return false;
    if (!('restrictionDeletions' in value) || value['restrictionDeletions'] === undefined) return false;
    return true;
}

export function EmbeddedAccountMosaicRestrictionTransactionDTOFromJSON(json: any): EmbeddedAccountMosaicRestrictionTransactionDTO {
    return EmbeddedAccountMosaicRestrictionTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedAccountMosaicRestrictionTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedAccountMosaicRestrictionTransactionDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'signerPublicKey': json['signerPublicKey'],
        'version': json['version'],
        'network': NetworkTypeEnumFromJSON(json['network']),
        'type': json['type'],
        'restrictionFlags': AccountRestrictionFlagsEnumFromJSON(json['restrictionFlags']),
        'restrictionAdditions': json['restrictionAdditions'],
        'restrictionDeletions': json['restrictionDeletions'],
    };
}

export function EmbeddedAccountMosaicRestrictionTransactionDTOToJSON(json: any): EmbeddedAccountMosaicRestrictionTransactionDTO {
    return EmbeddedAccountMosaicRestrictionTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedAccountMosaicRestrictionTransactionDTOToJSONTyped(value?: EmbeddedAccountMosaicRestrictionTransactionDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'signerPublicKey': value['signerPublicKey'],
        'version': value['version'],
        'network': NetworkTypeEnumToJSON(value['network']),
        'type': value['type'],
        'restrictionFlags': AccountRestrictionFlagsEnumToJSON(value['restrictionFlags']),
        'restrictionAdditions': value['restrictionAdditions'],
        'restrictionDeletions': value['restrictionDeletions'],
    };
}

