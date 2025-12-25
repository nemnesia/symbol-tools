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
 * @interface RentalFeesDTO
 */
export interface RentalFeesDTO {
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof RentalFeesDTO
     */
    effectiveRootNamespaceRentalFeePerBlock: string;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof RentalFeesDTO
     */
    effectiveChildNamespaceRentalFee: string;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof RentalFeesDTO
     */
    effectiveMosaicRentalFee: string;
}

/**
 * Check if a given object implements the RentalFeesDTO interface.
 */
export function instanceOfRentalFeesDTO(value: object): value is RentalFeesDTO {
    if (!('effectiveRootNamespaceRentalFeePerBlock' in value) || value['effectiveRootNamespaceRentalFeePerBlock'] === undefined) return false;
    if (!('effectiveChildNamespaceRentalFee' in value) || value['effectiveChildNamespaceRentalFee'] === undefined) return false;
    if (!('effectiveMosaicRentalFee' in value) || value['effectiveMosaicRentalFee'] === undefined) return false;
    return true;
}

export function RentalFeesDTOFromJSON(json: any): RentalFeesDTO {
    return RentalFeesDTOFromJSONTyped(json, false);
}

export function RentalFeesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): RentalFeesDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'effectiveRootNamespaceRentalFeePerBlock': json['effectiveRootNamespaceRentalFeePerBlock'],
        'effectiveChildNamespaceRentalFee': json['effectiveChildNamespaceRentalFee'],
        'effectiveMosaicRentalFee': json['effectiveMosaicRentalFee'],
    };
}

export function RentalFeesDTOToJSON(json: any): RentalFeesDTO {
    return RentalFeesDTOToJSONTyped(json, false);
}

export function RentalFeesDTOToJSONTyped(value?: RentalFeesDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'effectiveRootNamespaceRentalFeePerBlock': value['effectiveRootNamespaceRentalFeePerBlock'],
        'effectiveChildNamespaceRentalFee': value['effectiveChildNamespaceRentalFee'],
        'effectiveMosaicRentalFee': value['effectiveMosaicRentalFee'],
    };
}

