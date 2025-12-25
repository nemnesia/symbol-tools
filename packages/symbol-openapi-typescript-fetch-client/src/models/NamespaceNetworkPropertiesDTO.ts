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
 * @interface NamespaceNetworkPropertiesDTO
 */
export interface NamespaceNetworkPropertiesDTO {
    /**
     * Maximum namespace name size.
     * @type {string}
     * @memberof NamespaceNetworkPropertiesDTO
     */
    maxNameSize?: string;
    /**
     * Maximum number of children for a root namespace.
     * @type {string}
     * @memberof NamespaceNetworkPropertiesDTO
     */
    maxChildNamespaces?: string;
    /**
     * Maximum namespace depth.
     * @type {string}
     * @memberof NamespaceNetworkPropertiesDTO
     */
    maxNamespaceDepth?: string;
    /**
     * Minimum namespace duration.
     * @type {string}
     * @memberof NamespaceNetworkPropertiesDTO
     */
    minNamespaceDuration?: string;
    /**
     * Maximum namespace duration.
     * @type {string}
     * @memberof NamespaceNetworkPropertiesDTO
     */
    maxNamespaceDuration?: string;
    /**
     * Grace period during which time only the previous owner can renew an expired namespace.
     * @type {string}
     * @memberof NamespaceNetworkPropertiesDTO
     */
    namespaceGracePeriodDuration?: string;
    /**
     * Reserved root namespaces that cannot be claimed.
     * @type {string}
     * @memberof NamespaceNetworkPropertiesDTO
     */
    reservedRootNamespaceNames?: string;
    /**
     * Address encoded using a 32-character set.
     * @type {string}
     * @memberof NamespaceNetworkPropertiesDTO
     */
    namespaceRentalFeeSinkAddress?: string;
    /**
     * Root namespace rental fee per block.
     * @type {string}
     * @memberof NamespaceNetworkPropertiesDTO
     */
    rootNamespaceRentalFeePerBlock?: string;
    /**
     * Child namespace rental fee.
     * @type {string}
     * @memberof NamespaceNetworkPropertiesDTO
     */
    childNamespaceRentalFee?: string;
}

/**
 * Check if a given object implements the NamespaceNetworkPropertiesDTO interface.
 */
export function instanceOfNamespaceNetworkPropertiesDTO(value: object): value is NamespaceNetworkPropertiesDTO {
    return true;
}

export function NamespaceNetworkPropertiesDTOFromJSON(json: any): NamespaceNetworkPropertiesDTO {
    return NamespaceNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function NamespaceNetworkPropertiesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NamespaceNetworkPropertiesDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'maxNameSize': json['maxNameSize'] == null ? undefined : json['maxNameSize'],
        'maxChildNamespaces': json['maxChildNamespaces'] == null ? undefined : json['maxChildNamespaces'],
        'maxNamespaceDepth': json['maxNamespaceDepth'] == null ? undefined : json['maxNamespaceDepth'],
        'minNamespaceDuration': json['minNamespaceDuration'] == null ? undefined : json['minNamespaceDuration'],
        'maxNamespaceDuration': json['maxNamespaceDuration'] == null ? undefined : json['maxNamespaceDuration'],
        'namespaceGracePeriodDuration': json['namespaceGracePeriodDuration'] == null ? undefined : json['namespaceGracePeriodDuration'],
        'reservedRootNamespaceNames': json['reservedRootNamespaceNames'] == null ? undefined : json['reservedRootNamespaceNames'],
        'namespaceRentalFeeSinkAddress': json['namespaceRentalFeeSinkAddress'] == null ? undefined : json['namespaceRentalFeeSinkAddress'],
        'rootNamespaceRentalFeePerBlock': json['rootNamespaceRentalFeePerBlock'] == null ? undefined : json['rootNamespaceRentalFeePerBlock'],
        'childNamespaceRentalFee': json['childNamespaceRentalFee'] == null ? undefined : json['childNamespaceRentalFee'],
    };
}

export function NamespaceNetworkPropertiesDTOToJSON(json: any): NamespaceNetworkPropertiesDTO {
    return NamespaceNetworkPropertiesDTOToJSONTyped(json, false);
}

export function NamespaceNetworkPropertiesDTOToJSONTyped(value?: NamespaceNetworkPropertiesDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'maxNameSize': value['maxNameSize'],
        'maxChildNamespaces': value['maxChildNamespaces'],
        'maxNamespaceDepth': value['maxNamespaceDepth'],
        'minNamespaceDuration': value['minNamespaceDuration'],
        'maxNamespaceDuration': value['maxNamespaceDuration'],
        'namespaceGracePeriodDuration': value['namespaceGracePeriodDuration'],
        'reservedRootNamespaceNames': value['reservedRootNamespaceNames'],
        'namespaceRentalFeeSinkAddress': value['namespaceRentalFeeSinkAddress'],
        'rootNamespaceRentalFeePerBlock': value['rootNamespaceRentalFeePerBlock'],
        'childNamespaceRentalFee': value['childNamespaceRentalFee'],
    };
}

