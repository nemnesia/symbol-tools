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
import type { DeploymentDTO } from './DeploymentDTO.js';
import {
    DeploymentDTOFromJSON,
    DeploymentDTOFromJSONTyped,
    DeploymentDTOToJSON,
    DeploymentDTOToJSONTyped,
} from './DeploymentDTO.js';

/**
 * 
 * @export
 * @interface ServerDTO
 */
export interface ServerDTO {
    /**
     * catapult-rest component version.
     * @type {string}
     * @memberof ServerDTO
     */
    restVersion: string;
    /**
     * catapult-sdk component version.
     * @type {string}
     * @memberof ServerDTO
     */
    sdkVersion: string;
    /**
     * 
     * @type {DeploymentDTO}
     * @memberof ServerDTO
     */
    deployment: DeploymentDTO;
}

/**
 * Check if a given object implements the ServerDTO interface.
 */
export function instanceOfServerDTO(value: object): value is ServerDTO {
    if (!('restVersion' in value) || value['restVersion'] === undefined) return false;
    if (!('sdkVersion' in value) || value['sdkVersion'] === undefined) return false;
    if (!('deployment' in value) || value['deployment'] === undefined) return false;
    return true;
}

export function ServerDTOFromJSON(json: any): ServerDTO {
    return ServerDTOFromJSONTyped(json, false);
}

export function ServerDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServerDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'restVersion': json['restVersion'],
        'sdkVersion': json['sdkVersion'],
        'deployment': DeploymentDTOFromJSON(json['deployment']),
    };
}

export function ServerDTOToJSON(json: any): ServerDTO {
    return ServerDTOToJSONTyped(json, false);
}

export function ServerDTOToJSONTyped(value?: ServerDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'restVersion': value['restVersion'],
        'sdkVersion': value['sdkVersion'],
        'deployment': DeploymentDTOToJSON(value['deployment']),
    };
}

