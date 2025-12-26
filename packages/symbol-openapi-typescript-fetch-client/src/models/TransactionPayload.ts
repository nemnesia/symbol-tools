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
 * @interface TransactionPayload
 */
export interface TransactionPayload {
  /**
   * Transaction payload in hexadecimal format.
   * @type {string}
   * @memberof TransactionPayload
   */
  payload?: string;
}

/**
 * Check if a given object implements the TransactionPayload interface.
 */
export function instanceOfTransactionPayload(value: object): value is TransactionPayload {
  return true;
}

export function TransactionPayloadFromJSON(json: any): TransactionPayload {
  return TransactionPayloadFromJSONTyped(json, false);
}

export function TransactionPayloadFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionPayload {
  if (json == null) {
    return json;
  }
  return {
    payload: json['payload'] == null ? undefined : json['payload'],
  };
}

export function TransactionPayloadToJSON(json: any): TransactionPayload {
  return TransactionPayloadToJSONTyped(json, false);
}

export function TransactionPayloadToJSONTyped(
  value?: TransactionPayload | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    payload: value['payload'],
  };
}
