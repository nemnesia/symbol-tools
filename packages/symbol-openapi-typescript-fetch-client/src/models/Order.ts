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

/**
 * Indicates how to sort the results:
 * * ``asc`` - ascending
 * * ``desc`` - descending
 *
 * @export
 */
export const Order = {
  Asc: 'asc',
  Desc: 'desc',
} as const;
export type Order = (typeof Order)[keyof typeof Order];

export function instanceOfOrder(value: any): boolean {
  for (const key in Order) {
    if (Object.prototype.hasOwnProperty.call(Order, key)) {
      if (Order[key as keyof typeof Order] === value) {
        return true;
      }
    }
  }
  return false;
}

export function OrderFromJSON(json: any): Order {
  return OrderFromJSONTyped(json, false);
}

export function OrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): Order {
  return json as Order;
}

export function OrderToJSON(value?: Order | null): any {
  return value as any;
}

export function OrderToJSONTyped(value: any, ignoreDiscriminator: boolean): Order {
  return value as Order;
}
