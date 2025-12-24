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
 * @interface DeploymentDTO
 */
export interface DeploymentDTO {
    /**
     * The tool used to create, maintain and deploy the node. Examples: symbol-bootstrap, manual.
     * @type {string}
     * @memberof DeploymentDTO
     */
    deploymentTool: string;
    /**
     * The version of the tool used to create, maintain and deploy the node.
     * @type {string}
     * @memberof DeploymentDTO
     */
    deploymentToolVersion: string;
    /**
     * When was the node last upgraded.
     * @type {string}
     * @memberof DeploymentDTO
     */
    lastUpdatedDate: string;
}

/**
 * Check if a given object implements the DeploymentDTO interface.
 */
export function instanceOfDeploymentDTO(value: object): value is DeploymentDTO {
    if (!('deploymentTool' in value) || value['deploymentTool'] === undefined) return false;
    if (!('deploymentToolVersion' in value) || value['deploymentToolVersion'] === undefined) return false;
    if (!('lastUpdatedDate' in value) || value['lastUpdatedDate'] === undefined) return false;
    return true;
}

export function DeploymentDTOFromJSON(json: any): DeploymentDTO {
    return DeploymentDTOFromJSONTyped(json, false);
}

export function DeploymentDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeploymentDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'deploymentTool': json['deploymentTool'],
        'deploymentToolVersion': json['deploymentToolVersion'],
        'lastUpdatedDate': json['lastUpdatedDate'],
    };
}

export function DeploymentDTOToJSON(json: any): DeploymentDTO {
    return DeploymentDTOToJSONTyped(json, false);
}

export function DeploymentDTOToJSONTyped(value?: DeploymentDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'deploymentTool': value['deploymentTool'],
        'deploymentToolVersion': value['deploymentToolVersion'],
        'lastUpdatedDate': value['lastUpdatedDate'],
    };
}

