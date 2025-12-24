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
import type { PluginsPropertiesDTO } from './PluginsPropertiesDTO.js';
import {
    PluginsPropertiesDTOFromJSON,
    PluginsPropertiesDTOFromJSONTyped,
    PluginsPropertiesDTOToJSON,
    PluginsPropertiesDTOToJSONTyped,
} from './PluginsPropertiesDTO.js';
import type { ChainPropertiesDTO } from './ChainPropertiesDTO.js';
import {
    ChainPropertiesDTOFromJSON,
    ChainPropertiesDTOFromJSONTyped,
    ChainPropertiesDTOToJSON,
    ChainPropertiesDTOToJSONTyped,
} from './ChainPropertiesDTO.js';
import type { NetworkPropertiesDTO } from './NetworkPropertiesDTO.js';
import {
    NetworkPropertiesDTOFromJSON,
    NetworkPropertiesDTOFromJSONTyped,
    NetworkPropertiesDTOToJSON,
    NetworkPropertiesDTOToJSONTyped,
} from './NetworkPropertiesDTO.js';

/**
 * 
 * @export
 * @interface NetworkConfigurationDTO
 */
export interface NetworkConfigurationDTO {
    /**
     * 
     * @type {NetworkPropertiesDTO}
     * @memberof NetworkConfigurationDTO
     */
    network: NetworkPropertiesDTO;
    /**
     * 
     * @type {ChainPropertiesDTO}
     * @memberof NetworkConfigurationDTO
     */
    chain: ChainPropertiesDTO;
    /**
     * 
     * @type {PluginsPropertiesDTO}
     * @memberof NetworkConfigurationDTO
     */
    plugins: PluginsPropertiesDTO;
}

/**
 * Check if a given object implements the NetworkConfigurationDTO interface.
 */
export function instanceOfNetworkConfigurationDTO(value: object): value is NetworkConfigurationDTO {
    if (!('network' in value) || value['network'] === undefined) return false;
    if (!('chain' in value) || value['chain'] === undefined) return false;
    if (!('plugins' in value) || value['plugins'] === undefined) return false;
    return true;
}

export function NetworkConfigurationDTOFromJSON(json: any): NetworkConfigurationDTO {
    return NetworkConfigurationDTOFromJSONTyped(json, false);
}

export function NetworkConfigurationDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NetworkConfigurationDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'network': NetworkPropertiesDTOFromJSON(json['network']),
        'chain': ChainPropertiesDTOFromJSON(json['chain']),
        'plugins': PluginsPropertiesDTOFromJSON(json['plugins']),
    };
}

export function NetworkConfigurationDTOToJSON(json: any): NetworkConfigurationDTO {
    return NetworkConfigurationDTOToJSONTyped(json, false);
}

export function NetworkConfigurationDTOToJSONTyped(value?: NetworkConfigurationDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'network': NetworkPropertiesDTOToJSON(value['network']),
        'chain': ChainPropertiesDTOToJSON(value['chain']),
        'plugins': PluginsPropertiesDTOToJSON(value['plugins']),
    };
}

