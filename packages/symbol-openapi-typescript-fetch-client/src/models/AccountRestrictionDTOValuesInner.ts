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
import type { TransactionTypeEnum } from './TransactionTypeEnum.js';
import {
  TransactionTypeEnumFromJSON,
  TransactionTypeEnumFromJSONTyped,
  TransactionTypeEnumToJSON,
  TransactionTypeEnumToJSONTyped,
} from './TransactionTypeEnum.js';

/**
 *
 * @export
 * @interface AccountRestrictionDTOValuesInner
 */
export interface AccountRestrictionDTOValuesInner {}

/**
 * Check if a given object implements the AccountRestrictionDTOValuesInner interface.
 */
export function instanceOfAccountRestrictionDTOValuesInner(value: object): value is AccountRestrictionDTOValuesInner {
  return true;
}

export function AccountRestrictionDTOValuesInnerFromJSON(json: any): AccountRestrictionDTOValuesInner {
  return AccountRestrictionDTOValuesInnerFromJSONTyped(json, false);
}

export function AccountRestrictionDTOValuesInnerFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AccountRestrictionDTOValuesInner {
  return json;
}

export function AccountRestrictionDTOValuesInnerToJSON(json: any): AccountRestrictionDTOValuesInner {
  return AccountRestrictionDTOValuesInnerToJSONTyped(json, false);
}

export function AccountRestrictionDTOValuesInnerToJSONTyped(
  value?: AccountRestrictionDTOValuesInner | null,
  ignoreDiscriminator: boolean = false
): any {
  return value;
}
