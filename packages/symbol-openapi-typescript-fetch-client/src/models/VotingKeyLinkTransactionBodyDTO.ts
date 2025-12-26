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
 * @interface VotingKeyLinkTransactionBodyDTO
 */
export interface VotingKeyLinkTransactionBodyDTO {
  /**
   * 32 bytes voting public key.
   * @type {string}
   * @memberof VotingKeyLinkTransactionBodyDTO
   */
  linkedPublicKey: string;
  /**
   * Finalization Epoch
   * @type {number}
   * @memberof VotingKeyLinkTransactionBodyDTO
   */
  startEpoch: number;
  /**
   * Finalization Epoch
   * @type {number}
   * @memberof VotingKeyLinkTransactionBodyDTO
   */
  endEpoch: number;
  /**
   *
   * @type {LinkActionEnum}
   * @memberof VotingKeyLinkTransactionBodyDTO
   */
  linkAction: LinkActionEnum;
}

/**
 * Check if a given object implements the VotingKeyLinkTransactionBodyDTO interface.
 */
export function instanceOfVotingKeyLinkTransactionBodyDTO(value: object): value is VotingKeyLinkTransactionBodyDTO {
  if (!('linkedPublicKey' in value) || value['linkedPublicKey'] === undefined) return false;
  if (!('startEpoch' in value) || value['startEpoch'] === undefined) return false;
  if (!('endEpoch' in value) || value['endEpoch'] === undefined) return false;
  if (!('linkAction' in value) || value['linkAction'] === undefined) return false;
  return true;
}

export function VotingKeyLinkTransactionBodyDTOFromJSON(json: any): VotingKeyLinkTransactionBodyDTO {
  return VotingKeyLinkTransactionBodyDTOFromJSONTyped(json, false);
}

export function VotingKeyLinkTransactionBodyDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): VotingKeyLinkTransactionBodyDTO {
  if (json == null) {
    return json;
  }
  return {
    linkedPublicKey: json['linkedPublicKey'],
    startEpoch: json['startEpoch'],
    endEpoch: json['endEpoch'],
    linkAction: LinkActionEnumFromJSON(json['linkAction']),
  };
}

export function VotingKeyLinkTransactionBodyDTOToJSON(json: any): VotingKeyLinkTransactionBodyDTO {
  return VotingKeyLinkTransactionBodyDTOToJSONTyped(json, false);
}

export function VotingKeyLinkTransactionBodyDTOToJSONTyped(
  value?: VotingKeyLinkTransactionBodyDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    linkedPublicKey: value['linkedPublicKey'],
    startEpoch: value['startEpoch'],
    endEpoch: value['endEpoch'],
    linkAction: LinkActionEnumToJSON(value['linkAction']),
  };
}
