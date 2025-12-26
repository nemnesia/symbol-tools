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
import type { NetworkTypeEnum } from './NetworkTypeEnum.js';
import {
  NetworkTypeEnumFromJSON,
  NetworkTypeEnumFromJSONTyped,
  NetworkTypeEnumToJSON,
  NetworkTypeEnumToJSONTyped,
} from './NetworkTypeEnum.js';

/**
 *
 * @export
 * @interface EmbeddedVrfKeyLinkTransactionDTO
 */
export interface EmbeddedVrfKeyLinkTransactionDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedVrfKeyLinkTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof EmbeddedVrfKeyLinkTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof EmbeddedVrfKeyLinkTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof EmbeddedVrfKeyLinkTransactionDTO
   */
  type: number;
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedVrfKeyLinkTransactionDTO
   */
  linkedPublicKey: string;
  /**
   *
   * @type {LinkActionEnum}
   * @memberof EmbeddedVrfKeyLinkTransactionDTO
   */
  linkAction: LinkActionEnum;
}

/**
 * Check if a given object implements the EmbeddedVrfKeyLinkTransactionDTO interface.
 */
export function instanceOfEmbeddedVrfKeyLinkTransactionDTO(value: object): value is EmbeddedVrfKeyLinkTransactionDTO {
  if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('network' in value) || value['network'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('linkedPublicKey' in value) || value['linkedPublicKey'] === undefined) return false;
  if (!('linkAction' in value) || value['linkAction'] === undefined) return false;
  return true;
}

export function EmbeddedVrfKeyLinkTransactionDTOFromJSON(json: any): EmbeddedVrfKeyLinkTransactionDTO {
  return EmbeddedVrfKeyLinkTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedVrfKeyLinkTransactionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedVrfKeyLinkTransactionDTO {
  if (json == null) {
    return json;
  }
  return {
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
    linkedPublicKey: json['linkedPublicKey'],
    linkAction: LinkActionEnumFromJSON(json['linkAction']),
  };
}

export function EmbeddedVrfKeyLinkTransactionDTOToJSON(json: any): EmbeddedVrfKeyLinkTransactionDTO {
  return EmbeddedVrfKeyLinkTransactionDTOToJSONTyped(json, false);
}

export function EmbeddedVrfKeyLinkTransactionDTOToJSONTyped(
  value?: EmbeddedVrfKeyLinkTransactionDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    signerPublicKey: value['signerPublicKey'],
    version: value['version'],
    network: NetworkTypeEnumToJSON(value['network']),
    type: value['type'],
    linkedPublicKey: value['linkedPublicKey'],
    linkAction: LinkActionEnumToJSON(value['linkAction']),
  };
}
