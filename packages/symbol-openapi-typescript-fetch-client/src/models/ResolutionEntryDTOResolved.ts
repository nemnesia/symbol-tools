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
 * @interface ResolutionEntryDTOResolved
 */
export interface ResolutionEntryDTOResolved {
}

/**
 * Check if a given object implements the ResolutionEntryDTOResolved interface.
 */
export function instanceOfResolutionEntryDTOResolved(value: object): value is ResolutionEntryDTOResolved {
    return true;
}

export function ResolutionEntryDTOResolvedFromJSON(json: any): ResolutionEntryDTOResolved {
    return ResolutionEntryDTOResolvedFromJSONTyped(json, false);
}

export function ResolutionEntryDTOResolvedFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResolutionEntryDTOResolved {
    return json;
}

export function ResolutionEntryDTOResolvedToJSON(json: any): ResolutionEntryDTOResolved {
    return ResolutionEntryDTOResolvedToJSONTyped(json, false);
}

export function ResolutionEntryDTOResolvedToJSONTyped(value?: ResolutionEntryDTOResolved | null, ignoreDiscriminator: boolean = false): any {
    return value;
}

