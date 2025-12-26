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
import type { TimeSeriesNodesCountInnerValues } from './TimeSeriesNodesCountInnerValues.js';
import {
  TimeSeriesNodesCountInnerValuesFromJSON,
  TimeSeriesNodesCountInnerValuesFromJSONTyped,
  TimeSeriesNodesCountInnerValuesToJSON,
  TimeSeriesNodesCountInnerValuesToJSONTyped,
} from './TimeSeriesNodesCountInnerValues.js';

/**
 *
 * @export
 * @interface TimeSeriesNodesCountInner
 */
export interface TimeSeriesNodesCountInner {
  /**
   *
   * @type {Date}
   * @memberof TimeSeriesNodesCountInner
   */
  date: Date;
  /**
   *
   * @type {TimeSeriesNodesCountInnerValues}
   * @memberof TimeSeriesNodesCountInner
   */
  values: TimeSeriesNodesCountInnerValues;
}

/**
 * Check if a given object implements the TimeSeriesNodesCountInner interface.
 */
export function instanceOfTimeSeriesNodesCountInner(value: object): value is TimeSeriesNodesCountInner {
  if (!('date' in value) || value['date'] === undefined) return false;
  if (!('values' in value) || value['values'] === undefined) return false;
  return true;
}

export function TimeSeriesNodesCountInnerFromJSON(json: any): TimeSeriesNodesCountInner {
  return TimeSeriesNodesCountInnerFromJSONTyped(json, false);
}

export function TimeSeriesNodesCountInnerFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): TimeSeriesNodesCountInner {
  if (json == null) {
    return json;
  }
  return {
    date: new Date(json['date']),
    values: TimeSeriesNodesCountInnerValuesFromJSON(json['values']),
  };
}

export function TimeSeriesNodesCountInnerToJSON(json: any): TimeSeriesNodesCountInner {
  return TimeSeriesNodesCountInnerToJSONTyped(json, false);
}

export function TimeSeriesNodesCountInnerToJSONTyped(
  value?: TimeSeriesNodesCountInner | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    date: value['date'].toISOString().substring(0, 10),
    values: TimeSeriesNodesCountInnerValuesToJSON(value['values']),
  };
}
