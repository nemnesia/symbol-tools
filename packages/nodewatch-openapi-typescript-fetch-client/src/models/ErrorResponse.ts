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
 * @interface ErrorResponse
 */
export interface ErrorResponse {
  /**
   * HTTP error status code.
   * @type {number}
   * @memberof ErrorResponse
   */
  status: number;
  /**
   * Error message.
   * @type {string}
   * @memberof ErrorResponse
   */
  message: string;
}

/**
 * Check if a given object implements the ErrorResponse interface.
 */
export function instanceOfErrorResponse(value: object): value is ErrorResponse {
  if (!('status' in value) || value['status'] === undefined) return false;
  if (!('message' in value) || value['message'] === undefined) return false;
  return true;
}

export function ErrorResponseFromJSON(json: any): ErrorResponse {
  return ErrorResponseFromJSONTyped(json, false);
}

export function ErrorResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorResponse {
  if (json == null) {
    return json;
  }
  return {
    status: json['status'],
    message: json['message'],
  };
}

export function ErrorResponseToJSON(json: any): ErrorResponse {
  return ErrorResponseToJSONTyped(json, false);
}

export function ErrorResponseToJSONTyped(value?: ErrorResponse | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    status: value['status'],
    message: value['message'],
  };
}
