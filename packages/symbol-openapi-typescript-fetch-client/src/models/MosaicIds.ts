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
 * @interface MosaicIds
 */
export interface MosaicIds {
  /**
   * Array of mosaic identifiers.
   * @type {Array<string>}
   * @memberof MosaicIds
   */
  mosaicIds?: Array<string>;
}

/**
 * Check if a given object implements the MosaicIds interface.
 */
export function instanceOfMosaicIds(value: object): value is MosaicIds {
  return true;
}

export function MosaicIdsFromJSON(json: any): MosaicIds {
  return MosaicIdsFromJSONTyped(json, false);
}

export function MosaicIdsFromJSONTyped(json: any, ignoreDiscriminator: boolean): MosaicIds {
  if (json == null) {
    return json;
  }
  return {
    mosaicIds: json['mosaicIds'] == null ? undefined : json['mosaicIds'],
  };
}

export function MosaicIdsToJSON(json: any): MosaicIds {
  return MosaicIdsToJSONTyped(json, false);
}

export function MosaicIdsToJSONTyped(value?: MosaicIds | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    mosaicIds: value['mosaicIds'],
  };
}
