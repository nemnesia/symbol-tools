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
 * @interface MosaicNetworkPropertiesDTO
 */
export interface MosaicNetworkPropertiesDTO {
    /**
     * Maximum number of mosaics that an account can own.
     * @type {string}
     * @memberof MosaicNetworkPropertiesDTO
     */
    maxMosaicsPerAccount?: string;
    /**
     * Maximum mosaic duration.
     * @type {string}
     * @memberof MosaicNetworkPropertiesDTO
     */
    maxMosaicDuration?: string;
    /**
     * Maximum mosaic divisibility.
     * @type {string}
     * @memberof MosaicNetworkPropertiesDTO
     */
    maxMosaicDivisibility?: string;
    /**
     * Address encoded using a 32-character set.
     * @type {string}
     * @memberof MosaicNetworkPropertiesDTO
     */
    mosaicRentalFeeSinkAddress?: string;
    /**
     * Mosaic rental fee.
     * @type {string}
     * @memberof MosaicNetworkPropertiesDTO
     */
    mosaicRentalFee?: string;
}

/**
 * Check if a given object implements the MosaicNetworkPropertiesDTO interface.
 */
export function instanceOfMosaicNetworkPropertiesDTO(value: object): value is MosaicNetworkPropertiesDTO {
    return true;
}

export function MosaicNetworkPropertiesDTOFromJSON(json: any): MosaicNetworkPropertiesDTO {
    return MosaicNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function MosaicNetworkPropertiesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicNetworkPropertiesDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'maxMosaicsPerAccount': json['maxMosaicsPerAccount'] == null ? undefined : json['maxMosaicsPerAccount'],
        'maxMosaicDuration': json['maxMosaicDuration'] == null ? undefined : json['maxMosaicDuration'],
        'maxMosaicDivisibility': json['maxMosaicDivisibility'] == null ? undefined : json['maxMosaicDivisibility'],
        'mosaicRentalFeeSinkAddress': json['mosaicRentalFeeSinkAddress'] == null ? undefined : json['mosaicRentalFeeSinkAddress'],
        'mosaicRentalFee': json['mosaicRentalFee'] == null ? undefined : json['mosaicRentalFee'],
    };
}

export function MosaicNetworkPropertiesDTOToJSON(json: any): MosaicNetworkPropertiesDTO {
    return MosaicNetworkPropertiesDTOToJSONTyped(json, false);
}

export function MosaicNetworkPropertiesDTOToJSONTyped(value?: MosaicNetworkPropertiesDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'maxMosaicsPerAccount': value['maxMosaicsPerAccount'],
        'maxMosaicDuration': value['maxMosaicDuration'],
        'maxMosaicDivisibility': value['maxMosaicDivisibility'],
        'mosaicRentalFeeSinkAddress': value['mosaicRentalFeeSinkAddress'],
        'mosaicRentalFee': value['mosaicRentalFee'],
    };
}

