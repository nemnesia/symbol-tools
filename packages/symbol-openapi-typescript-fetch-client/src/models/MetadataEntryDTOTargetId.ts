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
 * @interface MetadataEntryDTOTargetId
 */
export interface MetadataEntryDTOTargetId {}

/**
 * Check if a given object implements the MetadataEntryDTOTargetId interface.
 */
export function instanceOfMetadataEntryDTOTargetId(value: object): value is MetadataEntryDTOTargetId {
  return true;
}

export function MetadataEntryDTOTargetIdFromJSON(json: any): MetadataEntryDTOTargetId {
  return MetadataEntryDTOTargetIdFromJSONTyped(json, false);
}

export function MetadataEntryDTOTargetIdFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): MetadataEntryDTOTargetId {
  return json;
}

export function MetadataEntryDTOTargetIdToJSON(json: any): MetadataEntryDTOTargetId {
  return MetadataEntryDTOTargetIdToJSONTyped(json, false);
}

export function MetadataEntryDTOTargetIdToJSONTyped(
  value?: MetadataEntryDTOTargetId | null,
  ignoreDiscriminator: boolean = false
): any {
  return value;
}
