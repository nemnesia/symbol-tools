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
 * @interface AggregateNetworkPropertiesDTO
 */
export interface AggregateNetworkPropertiesDTO {
    /**
     * Maximum number of transactions per aggregate.
     * @type {string}
     * @memberof AggregateNetworkPropertiesDTO
     */
    maxTransactionsPerAggregate?: string;
    /**
     * Maximum number of cosignatures per aggregate.
     * @type {string}
     * @memberof AggregateNetworkPropertiesDTO
     */
    maxCosignaturesPerAggregate?: string;
    /**
     * Set to true if cosignatures must exactly match component signers. Set to false if cosignatures should be validated externally.
     * @type {boolean}
     * @memberof AggregateNetworkPropertiesDTO
     */
    enableStrictCosignatureCheck?: boolean;
    /**
     * Set to true if bonded aggregates should be allowed. Set to false if bonded aggregates should be rejected.
     * @type {boolean}
     * @memberof AggregateNetworkPropertiesDTO
     */
    enableBondedAggregateSupport?: boolean;
    /**
     * Maximum lifetime a bonded transaction can have before it expires.
     * @type {string}
     * @memberof AggregateNetworkPropertiesDTO
     */
    maxBondedTransactionLifetime?: string;
}

/**
 * Check if a given object implements the AggregateNetworkPropertiesDTO interface.
 */
export function instanceOfAggregateNetworkPropertiesDTO(value: object): value is AggregateNetworkPropertiesDTO {
    return true;
}

export function AggregateNetworkPropertiesDTOFromJSON(json: any): AggregateNetworkPropertiesDTO {
    return AggregateNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function AggregateNetworkPropertiesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AggregateNetworkPropertiesDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'maxTransactionsPerAggregate': json['maxTransactionsPerAggregate'] == null ? undefined : json['maxTransactionsPerAggregate'],
        'maxCosignaturesPerAggregate': json['maxCosignaturesPerAggregate'] == null ? undefined : json['maxCosignaturesPerAggregate'],
        'enableStrictCosignatureCheck': json['enableStrictCosignatureCheck'] == null ? undefined : json['enableStrictCosignatureCheck'],
        'enableBondedAggregateSupport': json['enableBondedAggregateSupport'] == null ? undefined : json['enableBondedAggregateSupport'],
        'maxBondedTransactionLifetime': json['maxBondedTransactionLifetime'] == null ? undefined : json['maxBondedTransactionLifetime'],
    };
}

export function AggregateNetworkPropertiesDTOToJSON(json: any): AggregateNetworkPropertiesDTO {
    return AggregateNetworkPropertiesDTOToJSONTyped(json, false);
}

export function AggregateNetworkPropertiesDTOToJSONTyped(value?: AggregateNetworkPropertiesDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'maxTransactionsPerAggregate': value['maxTransactionsPerAggregate'],
        'maxCosignaturesPerAggregate': value['maxCosignaturesPerAggregate'],
        'enableStrictCosignatureCheck': value['enableStrictCosignatureCheck'],
        'enableBondedAggregateSupport': value['enableBondedAggregateSupport'],
        'maxBondedTransactionLifetime': value['maxBondedTransactionLifetime'],
    };
}

