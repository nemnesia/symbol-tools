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
import type { NamespaceRegistrationTypeEnum } from './NamespaceRegistrationTypeEnum.js';
import {
    NamespaceRegistrationTypeEnumFromJSON,
    NamespaceRegistrationTypeEnumFromJSONTyped,
    NamespaceRegistrationTypeEnumToJSON,
    NamespaceRegistrationTypeEnumToJSONTyped,
} from './NamespaceRegistrationTypeEnum.js';

/**
 * 
 * @export
 * @interface EmbeddedNamespaceRegistrationTransactionDTO
 */
export interface EmbeddedNamespaceRegistrationTransactionDTO {
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedNamespaceRegistrationTransactionDTO
     */
    signerPublicKey: string;
    /**
     * Entity version.
     * @type {number}
     * @memberof EmbeddedNamespaceRegistrationTransactionDTO
     */
    version: number;
    /**
     * 
     * @type {NetworkTypeEnum}
     * @memberof EmbeddedNamespaceRegistrationTransactionDTO
     */
    network: NetworkTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof EmbeddedNamespaceRegistrationTransactionDTO
     */
    type: number;
    /**
     * Duration expressed in number of blocks.
     * @type {string}
     * @memberof EmbeddedNamespaceRegistrationTransactionDTO
     */
    duration?: string;
    /**
     * Namespace identifier.
     * @type {string}
     * @memberof EmbeddedNamespaceRegistrationTransactionDTO
     */
    parentId?: string;
    /**
     * Namespace identifier.
     * @type {string}
     * @memberof EmbeddedNamespaceRegistrationTransactionDTO
     */
    id: string;
    /**
     * 
     * @type {NamespaceRegistrationTypeEnum}
     * @memberof EmbeddedNamespaceRegistrationTransactionDTO
     */
    registrationType: NamespaceRegistrationTypeEnum;
    /**
     * Namespace name.
     * @type {string}
     * @memberof EmbeddedNamespaceRegistrationTransactionDTO
     */
    name: string;
}



/**
 * Check if a given object implements the EmbeddedNamespaceRegistrationTransactionDTO interface.
 */
export function instanceOfEmbeddedNamespaceRegistrationTransactionDTO(value: object): value is EmbeddedNamespaceRegistrationTransactionDTO {
    if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('network' in value) || value['network'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('registrationType' in value) || value['registrationType'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    return true;
}

export function EmbeddedNamespaceRegistrationTransactionDTOFromJSON(json: any): EmbeddedNamespaceRegistrationTransactionDTO {
    return EmbeddedNamespaceRegistrationTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedNamespaceRegistrationTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedNamespaceRegistrationTransactionDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'signerPublicKey': json['signerPublicKey'],
        'version': json['version'],
        'network': NetworkTypeEnumFromJSON(json['network']),
        'type': json['type'],
        'duration': json['duration'] == null ? undefined : json['duration'],
        'parentId': json['parentId'] == null ? undefined : json['parentId'],
        'id': json['id'],
        'registrationType': NamespaceRegistrationTypeEnumFromJSON(json['registrationType']),
        'name': json['name'],
    };
}

export function EmbeddedNamespaceRegistrationTransactionDTOToJSON(json: any): EmbeddedNamespaceRegistrationTransactionDTO {
    return EmbeddedNamespaceRegistrationTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedNamespaceRegistrationTransactionDTOToJSONTyped(value?: EmbeddedNamespaceRegistrationTransactionDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'signerPublicKey': value['signerPublicKey'],
        'version': value['version'],
        'network': NetworkTypeEnumToJSON(value['network']),
        'type': value['type'],
        'duration': value['duration'],
        'parentId': value['parentId'],
        'id': value['id'],
        'registrationType': NamespaceRegistrationTypeEnumToJSON(value['registrationType']),
        'name': value['name'],
    };
}

