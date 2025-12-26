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
import type { LinkActionEnum } from './LinkActionEnum.js';
import {
  LinkActionEnumFromJSON,
  LinkActionEnumFromJSONTyped,
  LinkActionEnumToJSON,
  LinkActionEnumToJSONTyped,
} from './LinkActionEnum.js';

/**
 *
 * @export
 * @interface AccountKeyLinkTransactionBodyDTO
 */
export interface AccountKeyLinkTransactionBodyDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof AccountKeyLinkTransactionBodyDTO
   */
  linkedPublicKey: string;
  /**
   *
   * @type {LinkActionEnum}
   * @memberof AccountKeyLinkTransactionBodyDTO
   */
  linkAction: LinkActionEnum;
}

/**
 * Check if a given object implements the AccountKeyLinkTransactionBodyDTO interface.
 */
export function instanceOfAccountKeyLinkTransactionBodyDTO(value: object): value is AccountKeyLinkTransactionBodyDTO {
  if (!('linkedPublicKey' in value) || value['linkedPublicKey'] === undefined) return false;
  if (!('linkAction' in value) || value['linkAction'] === undefined) return false;
  return true;
}

export function AccountKeyLinkTransactionBodyDTOFromJSON(json: any): AccountKeyLinkTransactionBodyDTO {
  return AccountKeyLinkTransactionBodyDTOFromJSONTyped(json, false);
}

export function AccountKeyLinkTransactionBodyDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AccountKeyLinkTransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    linkedPublicKey: json['linkedPublicKey'],
    linkAction: LinkActionEnumFromJSON(json['linkAction']),
  };
}

export function AccountKeyLinkTransactionBodyDTOToJSON(json: any): AccountKeyLinkTransactionBodyDTO {
  return AccountKeyLinkTransactionBodyDTOToJSONTyped(json, false);
}

export function AccountKeyLinkTransactionBodyDTOToJSONTyped(
  value?: AccountKeyLinkTransactionBodyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    linkedPublicKey: value['linkedPublicKey'],
    linkAction: LinkActionEnumToJSON(value['linkAction']),
  };
}
