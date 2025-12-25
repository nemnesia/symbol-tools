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
import type { ParentPublicKeySignaturePair } from './ParentPublicKeySignaturePair.js';
import {
    ParentPublicKeySignaturePairFromJSON,
    ParentPublicKeySignaturePairFromJSONTyped,
    ParentPublicKeySignaturePairToJSON,
    ParentPublicKeySignaturePairToJSONTyped,
} from './ParentPublicKeySignaturePair.js';

/**
 * 
 * @export
 * @interface BmTreeSignature
 */
export interface BmTreeSignature {
    /**
     * 
     * @type {ParentPublicKeySignaturePair}
     * @memberof BmTreeSignature
     */
    root: ParentPublicKeySignaturePair;
    /**
     * 
     * @type {ParentPublicKeySignaturePair}
     * @memberof BmTreeSignature
     */
    bottom: ParentPublicKeySignaturePair;
}

/**
 * Check if a given object implements the BmTreeSignature interface.
 */
export function instanceOfBmTreeSignature(value: object): value is BmTreeSignature {
    if (!('root' in value) || value['root'] === undefined) return false;
    if (!('bottom' in value) || value['bottom'] === undefined) return false;
    return true;
}

export function BmTreeSignatureFromJSON(json: any): BmTreeSignature {
    return BmTreeSignatureFromJSONTyped(json, false);
}

export function BmTreeSignatureFromJSONTyped(json: any, ignoreDiscriminator: boolean): BmTreeSignature {
    if (json == null) {
        return json;
    }
    return {
        
        'root': ParentPublicKeySignaturePairFromJSON(json['root']),
        'bottom': ParentPublicKeySignaturePairFromJSON(json['bottom']),
    };
}

export function BmTreeSignatureToJSON(json: any): BmTreeSignature {
    return BmTreeSignatureToJSONTyped(json, false);
}

export function BmTreeSignatureToJSONTyped(value?: BmTreeSignature | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'root': ParentPublicKeySignaturePairToJSON(value['root']),
        'bottom': ParentPublicKeySignaturePairToJSON(value['bottom']),
    };
}

