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
 * @interface ModelError
 */
export interface ModelError {
  /**
   *
   * @type {string}
   * @memberof ModelError
   */
  code: string;
  /**
   *
   * @type {string}
   * @memberof ModelError
   */
  message: string;
}

/**
 * Check if a given object implements the ModelError interface.
 */
export function instanceOfModelError(value: object): value is ModelError {
  if (!('code' in value) || value['code'] === undefined) return false;
  if (!('message' in value) || value['message'] === undefined) return false;
  return true;
}

export function ModelErrorFromJSON(json: any): ModelError {
  return ModelErrorFromJSONTyped(json, false);
}

export function ModelErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelError {
  if (json == null) {
    return json;
  }
  return {
    code: json['code'],
    message: json['message'],
  };
}

export function ModelErrorToJSON(json: any): ModelError {
  return ModelErrorToJSONTyped(json, false);
}

export function ModelErrorToJSONTyped(value?: ModelError | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    code: value['code'],
    message: value['message'],
  };
}
