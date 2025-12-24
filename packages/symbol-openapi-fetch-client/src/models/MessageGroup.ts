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
import type { BmTreeSignature } from './BmTreeSignature.js';
import {
    BmTreeSignatureFromJSON,
    BmTreeSignatureFromJSONTyped,
    BmTreeSignatureToJSON,
    BmTreeSignatureToJSONTyped,
} from './BmTreeSignature.js';
import type { StageEnum } from './StageEnum.js';
import {
    StageEnumFromJSON,
    StageEnumFromJSONTyped,
    StageEnumToJSON,
    StageEnumToJSONTyped,
} from './StageEnum.js';

/**
 * 
 * @export
 * @interface MessageGroup
 */
export interface MessageGroup {
    /**
     * 
     * @type {StageEnum}
     * @memberof MessageGroup
     */
    stage: StageEnum;
    /**
     * Height of the blockchain.
     * @type {string}
     * @memberof MessageGroup
     */
    height: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof MessageGroup
     */
    hashes: Array<string>;
    /**
     * 
     * @type {Array<BmTreeSignature>}
     * @memberof MessageGroup
     */
    signatures: Array<BmTreeSignature>;
}



/**
 * Check if a given object implements the MessageGroup interface.
 */
export function instanceOfMessageGroup(value: object): value is MessageGroup {
    if (!('stage' in value) || value['stage'] === undefined) return false;
    if (!('height' in value) || value['height'] === undefined) return false;
    if (!('hashes' in value) || value['hashes'] === undefined) return false;
    if (!('signatures' in value) || value['signatures'] === undefined) return false;
    return true;
}

export function MessageGroupFromJSON(json: any): MessageGroup {
    return MessageGroupFromJSONTyped(json, false);
}

export function MessageGroupFromJSONTyped(json: any, ignoreDiscriminator: boolean): MessageGroup {
    if (json == null) {
        return json;
    }
    return {
        
        'stage': StageEnumFromJSON(json['stage']),
        'height': json['height'],
        'hashes': json['hashes'],
        'signatures': ((json['signatures'] as Array<any>).map(BmTreeSignatureFromJSON)),
    };
}

export function MessageGroupToJSON(json: any): MessageGroup {
    return MessageGroupToJSONTyped(json, false);
}

export function MessageGroupToJSONTyped(value?: MessageGroup | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'stage': StageEnumToJSON(value['stage']),
        'height': value['height'],
        'hashes': value['hashes'],
        'signatures': ((value['signatures'] as Array<any>).map(BmTreeSignatureToJSON)),
    };
}

