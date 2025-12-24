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
import type { NodeStatusEnum } from './NodeStatusEnum.js';
import {
    NodeStatusEnumFromJSON,
    NodeStatusEnumFromJSONTyped,
    NodeStatusEnumToJSON,
    NodeStatusEnumToJSONTyped,
} from './NodeStatusEnum.js';

/**
 * 
 * @export
 * @interface NodeHealthDTO
 */
export interface NodeHealthDTO {
    /**
     * 
     * @type {NodeStatusEnum}
     * @memberof NodeHealthDTO
     */
    apiNode: NodeStatusEnum;
    /**
     * 
     * @type {NodeStatusEnum}
     * @memberof NodeHealthDTO
     */
    db: NodeStatusEnum;
}



/**
 * Check if a given object implements the NodeHealthDTO interface.
 */
export function instanceOfNodeHealthDTO(value: object): value is NodeHealthDTO {
    if (!('apiNode' in value) || value['apiNode'] === undefined) return false;
    if (!('db' in value) || value['db'] === undefined) return false;
    return true;
}

export function NodeHealthDTOFromJSON(json: any): NodeHealthDTO {
    return NodeHealthDTOFromJSONTyped(json, false);
}

export function NodeHealthDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NodeHealthDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'apiNode': NodeStatusEnumFromJSON(json['apiNode']),
        'db': NodeStatusEnumFromJSON(json['db']),
    };
}

export function NodeHealthDTOToJSON(json: any): NodeHealthDTO {
    return NodeHealthDTOToJSONTyped(json, false);
}

export function NodeHealthDTOToJSONTyped(value?: NodeHealthDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'apiNode': NodeStatusEnumToJSON(value['apiNode']),
        'db': NodeStatusEnumToJSON(value['db']),
    };
}

