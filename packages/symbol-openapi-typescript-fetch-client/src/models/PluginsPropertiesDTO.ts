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
import type { AccountKeyLinkNetworkPropertiesDTO } from './AccountKeyLinkNetworkPropertiesDTO.js';
import {
  AccountKeyLinkNetworkPropertiesDTOFromJSON,
  AccountKeyLinkNetworkPropertiesDTOFromJSONTyped,
  AccountKeyLinkNetworkPropertiesDTOToJSON,
  AccountKeyLinkNetworkPropertiesDTOToJSONTyped,
} from './AccountKeyLinkNetworkPropertiesDTO.js';
import type { AccountRestrictionNetworkPropertiesDTO } from './AccountRestrictionNetworkPropertiesDTO.js';
import {
  AccountRestrictionNetworkPropertiesDTOFromJSON,
  AccountRestrictionNetworkPropertiesDTOFromJSONTyped,
  AccountRestrictionNetworkPropertiesDTOToJSON,
  AccountRestrictionNetworkPropertiesDTOToJSONTyped,
} from './AccountRestrictionNetworkPropertiesDTO.js';
import type { AggregateNetworkPropertiesDTO } from './AggregateNetworkPropertiesDTO.js';
import {
  AggregateNetworkPropertiesDTOFromJSON,
  AggregateNetworkPropertiesDTOFromJSONTyped,
  AggregateNetworkPropertiesDTOToJSON,
  AggregateNetworkPropertiesDTOToJSONTyped,
} from './AggregateNetworkPropertiesDTO.js';
import type { HashLockNetworkPropertiesDTO } from './HashLockNetworkPropertiesDTO.js';
import {
  HashLockNetworkPropertiesDTOFromJSON,
  HashLockNetworkPropertiesDTOFromJSONTyped,
  HashLockNetworkPropertiesDTOToJSON,
  HashLockNetworkPropertiesDTOToJSONTyped,
} from './HashLockNetworkPropertiesDTO.js';
import type { MetadataNetworkPropertiesDTO } from './MetadataNetworkPropertiesDTO.js';
import {
  MetadataNetworkPropertiesDTOFromJSON,
  MetadataNetworkPropertiesDTOFromJSONTyped,
  MetadataNetworkPropertiesDTOToJSON,
  MetadataNetworkPropertiesDTOToJSONTyped,
} from './MetadataNetworkPropertiesDTO.js';
import type { MosaicNetworkPropertiesDTO } from './MosaicNetworkPropertiesDTO.js';
import {
  MosaicNetworkPropertiesDTOFromJSON,
  MosaicNetworkPropertiesDTOFromJSONTyped,
  MosaicNetworkPropertiesDTOToJSON,
  MosaicNetworkPropertiesDTOToJSONTyped,
} from './MosaicNetworkPropertiesDTO.js';
import type { MosaicRestrictionNetworkPropertiesDTO } from './MosaicRestrictionNetworkPropertiesDTO.js';
import {
  MosaicRestrictionNetworkPropertiesDTOFromJSON,
  MosaicRestrictionNetworkPropertiesDTOFromJSONTyped,
  MosaicRestrictionNetworkPropertiesDTOToJSON,
  MosaicRestrictionNetworkPropertiesDTOToJSONTyped,
} from './MosaicRestrictionNetworkPropertiesDTO.js';
import type { MultisigNetworkPropertiesDTO } from './MultisigNetworkPropertiesDTO.js';
import {
  MultisigNetworkPropertiesDTOFromJSON,
  MultisigNetworkPropertiesDTOFromJSONTyped,
  MultisigNetworkPropertiesDTOToJSON,
  MultisigNetworkPropertiesDTOToJSONTyped,
} from './MultisigNetworkPropertiesDTO.js';
import type { NamespaceNetworkPropertiesDTO } from './NamespaceNetworkPropertiesDTO.js';
import {
  NamespaceNetworkPropertiesDTOFromJSON,
  NamespaceNetworkPropertiesDTOFromJSONTyped,
  NamespaceNetworkPropertiesDTOToJSON,
  NamespaceNetworkPropertiesDTOToJSONTyped,
} from './NamespaceNetworkPropertiesDTO.js';
import type { SecretLockNetworkPropertiesDTO } from './SecretLockNetworkPropertiesDTO.js';
import {
  SecretLockNetworkPropertiesDTOFromJSON,
  SecretLockNetworkPropertiesDTOFromJSONTyped,
  SecretLockNetworkPropertiesDTOToJSON,
  SecretLockNetworkPropertiesDTOToJSONTyped,
} from './SecretLockNetworkPropertiesDTO.js';
import type { TransferNetworkPropertiesDTO } from './TransferNetworkPropertiesDTO.js';
import {
  TransferNetworkPropertiesDTOFromJSON,
  TransferNetworkPropertiesDTOFromJSONTyped,
  TransferNetworkPropertiesDTOToJSON,
  TransferNetworkPropertiesDTOToJSONTyped,
} from './TransferNetworkPropertiesDTO.js';

/**
 * Plugin related configuration properties.
 * @export
 * @interface PluginsPropertiesDTO
 */
export interface PluginsPropertiesDTO {
  /**
   *
   * @type {AccountKeyLinkNetworkPropertiesDTO}
   * @memberof PluginsPropertiesDTO
   */
  accountlink?: AccountKeyLinkNetworkPropertiesDTO;
  /**
   *
   * @type {AggregateNetworkPropertiesDTO}
   * @memberof PluginsPropertiesDTO
   */
  aggregate?: AggregateNetworkPropertiesDTO;
  /**
   *
   * @type {HashLockNetworkPropertiesDTO}
   * @memberof PluginsPropertiesDTO
   */
  lockhash?: HashLockNetworkPropertiesDTO;
  /**
   *
   * @type {SecretLockNetworkPropertiesDTO}
   * @memberof PluginsPropertiesDTO
   */
  locksecret?: SecretLockNetworkPropertiesDTO;
  /**
   *
   * @type {MetadataNetworkPropertiesDTO}
   * @memberof PluginsPropertiesDTO
   */
  metadata?: MetadataNetworkPropertiesDTO;
  /**
   *
   * @type {MosaicNetworkPropertiesDTO}
   * @memberof PluginsPropertiesDTO
   */
  mosaic?: MosaicNetworkPropertiesDTO;
  /**
   *
   * @type {MultisigNetworkPropertiesDTO}
   * @memberof PluginsPropertiesDTO
   */
  multisig?: MultisigNetworkPropertiesDTO;
  /**
   *
   * @type {NamespaceNetworkPropertiesDTO}
   * @memberof PluginsPropertiesDTO
   */
  namespace?: NamespaceNetworkPropertiesDTO;
  /**
   *
   * @type {AccountRestrictionNetworkPropertiesDTO}
   * @memberof PluginsPropertiesDTO
   */
  restrictionaccount?: AccountRestrictionNetworkPropertiesDTO;
  /**
   *
   * @type {MosaicRestrictionNetworkPropertiesDTO}
   * @memberof PluginsPropertiesDTO
   */
  restrictionmosaic?: MosaicRestrictionNetworkPropertiesDTO;
  /**
   *
   * @type {TransferNetworkPropertiesDTO}
   * @memberof PluginsPropertiesDTO
   */
  transfer?: TransferNetworkPropertiesDTO;
}

/**
 * Check if a given object implements the PluginsPropertiesDTO interface.
 */
export function instanceOfPluginsPropertiesDTO(value: object): value is PluginsPropertiesDTO {
  return true;
}

export function PluginsPropertiesDTOFromJSON(json: any): PluginsPropertiesDTO {
  return PluginsPropertiesDTOFromJSONTyped(json, false);
}

export function PluginsPropertiesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): PluginsPropertiesDTO {
  if (json == null) {
    return json;
  }
  return {
    accountlink:
      json['accountlink'] == null ? undefined : AccountKeyLinkNetworkPropertiesDTOFromJSON(json['accountlink']),
    aggregate: json['aggregate'] == null ? undefined : AggregateNetworkPropertiesDTOFromJSON(json['aggregate']),
    lockhash: json['lockhash'] == null ? undefined : HashLockNetworkPropertiesDTOFromJSON(json['lockhash']),
    locksecret: json['locksecret'] == null ? undefined : SecretLockNetworkPropertiesDTOFromJSON(json['locksecret']),
    metadata: json['metadata'] == null ? undefined : MetadataNetworkPropertiesDTOFromJSON(json['metadata']),
    mosaic: json['mosaic'] == null ? undefined : MosaicNetworkPropertiesDTOFromJSON(json['mosaic']),
    multisig: json['multisig'] == null ? undefined : MultisigNetworkPropertiesDTOFromJSON(json['multisig']),
    namespace: json['namespace'] == null ? undefined : NamespaceNetworkPropertiesDTOFromJSON(json['namespace']),
    restrictionaccount:
      json['restrictionaccount'] == null
        ? undefined
        : AccountRestrictionNetworkPropertiesDTOFromJSON(json['restrictionaccount']),
    restrictionmosaic:
      json['restrictionmosaic'] == null
        ? undefined
        : MosaicRestrictionNetworkPropertiesDTOFromJSON(json['restrictionmosaic']),
    transfer: json['transfer'] == null ? undefined : TransferNetworkPropertiesDTOFromJSON(json['transfer']),
  };
}

export function PluginsPropertiesDTOToJSON(json: any): PluginsPropertiesDTO {
  return PluginsPropertiesDTOToJSONTyped(json, false);
}

export function PluginsPropertiesDTOToJSONTyped(
  value?: PluginsPropertiesDTO | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    accountlink: AccountKeyLinkNetworkPropertiesDTOToJSON(value['accountlink']),
    aggregate: AggregateNetworkPropertiesDTOToJSON(value['aggregate']),
    lockhash: HashLockNetworkPropertiesDTOToJSON(value['lockhash']),
    locksecret: SecretLockNetworkPropertiesDTOToJSON(value['locksecret']),
    metadata: MetadataNetworkPropertiesDTOToJSON(value['metadata']),
    mosaic: MosaicNetworkPropertiesDTOToJSON(value['mosaic']),
    multisig: MultisigNetworkPropertiesDTOToJSON(value['multisig']),
    namespace: NamespaceNetworkPropertiesDTOToJSON(value['namespace']),
    restrictionaccount: AccountRestrictionNetworkPropertiesDTOToJSON(value['restrictionaccount']),
    restrictionmosaic: MosaicRestrictionNetworkPropertiesDTOToJSON(value['restrictionmosaic']),
    transfer: TransferNetworkPropertiesDTOToJSON(value['transfer']),
  };
}
