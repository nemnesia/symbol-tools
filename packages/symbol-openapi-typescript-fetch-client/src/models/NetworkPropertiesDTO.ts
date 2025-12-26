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
import type { NodeIdentityEqualityStrategy } from './NodeIdentityEqualityStrategy.js';
import {
  NodeIdentityEqualityStrategyFromJSON,
  NodeIdentityEqualityStrategyFromJSONTyped,
  NodeIdentityEqualityStrategyToJSON,
  NodeIdentityEqualityStrategyToJSONTyped,
} from './NodeIdentityEqualityStrategy.js';

/**
 * Network related configuration properties.
 * @export
 * @interface NetworkPropertiesDTO
 */
export interface NetworkPropertiesDTO {
  /**
   * Network identifier.
   * @type {string}
   * @memberof NetworkPropertiesDTO
   */
  identifier?: string;
  /**
   *
   * @type {NodeIdentityEqualityStrategy}
   * @memberof NetworkPropertiesDTO
   */
  nodeEqualityStrategy?: NodeIdentityEqualityStrategy;
  /**
   * Public key.
   * @type {string}
   * @memberof NetworkPropertiesDTO
   */
  nemesisSignerPublicKey?: string;
  /**
   *
   * @type {string}
   * @memberof NetworkPropertiesDTO
   */
  generationHashSeed?: string;
  /**
   * Nemesis epoch time adjustment.
   * @type {string}
   * @memberof NetworkPropertiesDTO
   */
  epochAdjustment?: string;
}

/**
 * Check if a given object implements the NetworkPropertiesDTO interface.
 */
export function instanceOfNetworkPropertiesDTO(value: object): value is NetworkPropertiesDTO {
  return true;
}

export function NetworkPropertiesDTOFromJSON(json: any): NetworkPropertiesDTO {
  return NetworkPropertiesDTOFromJSONTyped(json, false);
}

export function NetworkPropertiesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NetworkPropertiesDTO {
  if (json == null) {
    return json;
  }
  return {
    identifier: json['identifier'] == null ? undefined : json['identifier'],
    nodeEqualityStrategy:
      json['nodeEqualityStrategy'] == null
        ? undefined
        : NodeIdentityEqualityStrategyFromJSON(json['nodeEqualityStrategy']),
    nemesisSignerPublicKey: json['nemesisSignerPublicKey'] == null ? undefined : json['nemesisSignerPublicKey'],
    generationHashSeed: json['generationHashSeed'] == null ? undefined : json['generationHashSeed'],
    epochAdjustment: json['epochAdjustment'] == null ? undefined : json['epochAdjustment'],
  };
}

export function NetworkPropertiesDTOToJSON(json: any): NetworkPropertiesDTO {
  return NetworkPropertiesDTOToJSONTyped(json, false);
}

export function NetworkPropertiesDTOToJSONTyped(
  value?: NetworkPropertiesDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    identifier: value['identifier'],
    nodeEqualityStrategy: NodeIdentityEqualityStrategyToJSON(value['nodeEqualityStrategy']),
    nemesisSignerPublicKey: value['nemesisSignerPublicKey'],
    generationHashSeed: value['generationHashSeed'],
    epochAdjustment: value['epochAdjustment'],
  };
}
