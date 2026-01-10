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
import type { AccountAddressRestrictionTransactionDTO } from './AccountAddressRestrictionTransactionDTO.js';
import {
  AccountAddressRestrictionTransactionDTOFromJSON,
  AccountAddressRestrictionTransactionDTOFromJSONTyped,
  AccountAddressRestrictionTransactionDTOToJSON,
  AccountAddressRestrictionTransactionDTOToJSONTyped,
} from './AccountAddressRestrictionTransactionDTO.js';
import type { AccountKeyLinkTransactionDTO } from './AccountKeyLinkTransactionDTO.js';
import {
  AccountKeyLinkTransactionDTOFromJSON,
  AccountKeyLinkTransactionDTOFromJSONTyped,
  AccountKeyLinkTransactionDTOToJSON,
  AccountKeyLinkTransactionDTOToJSONTyped,
} from './AccountKeyLinkTransactionDTO.js';
import type { AccountMetadataTransactionDTO } from './AccountMetadataTransactionDTO.js';
import {
  AccountMetadataTransactionDTOFromJSON,
  AccountMetadataTransactionDTOFromJSONTyped,
  AccountMetadataTransactionDTOToJSON,
  AccountMetadataTransactionDTOToJSONTyped,
} from './AccountMetadataTransactionDTO.js';
import type { AccountMosaicRestrictionTransactionDTO } from './AccountMosaicRestrictionTransactionDTO.js';
import {
  AccountMosaicRestrictionTransactionDTOFromJSON,
  AccountMosaicRestrictionTransactionDTOFromJSONTyped,
  AccountMosaicRestrictionTransactionDTOToJSON,
  AccountMosaicRestrictionTransactionDTOToJSONTyped,
} from './AccountMosaicRestrictionTransactionDTO.js';
import type { AccountOperationRestrictionTransactionDTO } from './AccountOperationRestrictionTransactionDTO.js';
import {
  AccountOperationRestrictionTransactionDTOFromJSON,
  AccountOperationRestrictionTransactionDTOFromJSONTyped,
  AccountOperationRestrictionTransactionDTOToJSON,
  AccountOperationRestrictionTransactionDTOToJSONTyped,
} from './AccountOperationRestrictionTransactionDTO.js';
import type { AccountRestrictionFlagsEnum } from './AccountRestrictionFlagsEnum.js';
import {
  AccountRestrictionFlagsEnumFromJSON,
  AccountRestrictionFlagsEnumFromJSONTyped,
  AccountRestrictionFlagsEnumToJSON,
  AccountRestrictionFlagsEnumToJSONTyped,
} from './AccountRestrictionFlagsEnum.js';
import type { AddressAliasTransactionDTO } from './AddressAliasTransactionDTO.js';
import {
  AddressAliasTransactionDTOFromJSON,
  AddressAliasTransactionDTOFromJSONTyped,
  AddressAliasTransactionDTOToJSON,
  AddressAliasTransactionDTOToJSONTyped,
} from './AddressAliasTransactionDTO.js';
import type { AggregateTransactionDTO } from './AggregateTransactionDTO.js';
import {
  AggregateTransactionDTOFromJSON,
  AggregateTransactionDTOFromJSONTyped,
  AggregateTransactionDTOToJSON,
  AggregateTransactionDTOToJSONTyped,
} from './AggregateTransactionDTO.js';
import type { AggregateTransactionExtendedDTO } from './AggregateTransactionExtendedDTO.js';
import {
  AggregateTransactionExtendedDTOFromJSON,
  AggregateTransactionExtendedDTOFromJSONTyped,
  AggregateTransactionExtendedDTOToJSON,
  AggregateTransactionExtendedDTOToJSONTyped,
} from './AggregateTransactionExtendedDTO.js';
import type { AliasActionEnum } from './AliasActionEnum.js';
import {
  AliasActionEnumFromJSON,
  AliasActionEnumFromJSONTyped,
  AliasActionEnumToJSON,
  AliasActionEnumToJSONTyped,
} from './AliasActionEnum.js';
import type { CosignatureDTO } from './CosignatureDTO.js';
import {
  CosignatureDTOFromJSON,
  CosignatureDTOFromJSONTyped,
  CosignatureDTOToJSON,
  CosignatureDTOToJSONTyped,
} from './CosignatureDTO.js';
import type { EmbeddedAccountAddressRestrictionTransactionDTO } from './EmbeddedAccountAddressRestrictionTransactionDTO.js';
import {
  EmbeddedAccountAddressRestrictionTransactionDTOFromJSON,
  EmbeddedAccountAddressRestrictionTransactionDTOFromJSONTyped,
  EmbeddedAccountAddressRestrictionTransactionDTOToJSON,
  EmbeddedAccountAddressRestrictionTransactionDTOToJSONTyped,
} from './EmbeddedAccountAddressRestrictionTransactionDTO.js';
import type { EmbeddedAccountKeyLinkTransactionDTO } from './EmbeddedAccountKeyLinkTransactionDTO.js';
import {
  EmbeddedAccountKeyLinkTransactionDTOFromJSON,
  EmbeddedAccountKeyLinkTransactionDTOFromJSONTyped,
  EmbeddedAccountKeyLinkTransactionDTOToJSON,
  EmbeddedAccountKeyLinkTransactionDTOToJSONTyped,
} from './EmbeddedAccountKeyLinkTransactionDTO.js';
import type { EmbeddedAccountMetadataTransactionDTO } from './EmbeddedAccountMetadataTransactionDTO.js';
import {
  EmbeddedAccountMetadataTransactionDTOFromJSON,
  EmbeddedAccountMetadataTransactionDTOFromJSONTyped,
  EmbeddedAccountMetadataTransactionDTOToJSON,
  EmbeddedAccountMetadataTransactionDTOToJSONTyped,
} from './EmbeddedAccountMetadataTransactionDTO.js';
import type { EmbeddedAccountMosaicRestrictionTransactionDTO } from './EmbeddedAccountMosaicRestrictionTransactionDTO.js';
import {
  EmbeddedAccountMosaicRestrictionTransactionDTOFromJSON,
  EmbeddedAccountMosaicRestrictionTransactionDTOFromJSONTyped,
  EmbeddedAccountMosaicRestrictionTransactionDTOToJSON,
  EmbeddedAccountMosaicRestrictionTransactionDTOToJSONTyped,
} from './EmbeddedAccountMosaicRestrictionTransactionDTO.js';
import type { EmbeddedAccountOperationRestrictionTransactionDTO } from './EmbeddedAccountOperationRestrictionTransactionDTO.js';
import {
  EmbeddedAccountOperationRestrictionTransactionDTOFromJSON,
  EmbeddedAccountOperationRestrictionTransactionDTOFromJSONTyped,
  EmbeddedAccountOperationRestrictionTransactionDTOToJSON,
  EmbeddedAccountOperationRestrictionTransactionDTOToJSONTyped,
} from './EmbeddedAccountOperationRestrictionTransactionDTO.js';
import type { EmbeddedAddressAliasTransactionDTO } from './EmbeddedAddressAliasTransactionDTO.js';
import {
  EmbeddedAddressAliasTransactionDTOFromJSON,
  EmbeddedAddressAliasTransactionDTOFromJSONTyped,
  EmbeddedAddressAliasTransactionDTOToJSON,
  EmbeddedAddressAliasTransactionDTOToJSONTyped,
} from './EmbeddedAddressAliasTransactionDTO.js';
import type { EmbeddedHashLockTransactionDTO } from './EmbeddedHashLockTransactionDTO.js';
import {
  EmbeddedHashLockTransactionDTOFromJSON,
  EmbeddedHashLockTransactionDTOFromJSONTyped,
  EmbeddedHashLockTransactionDTOToJSON,
  EmbeddedHashLockTransactionDTOToJSONTyped,
} from './EmbeddedHashLockTransactionDTO.js';
import type { EmbeddedMosaicAddressRestrictionTransactionDTO } from './EmbeddedMosaicAddressRestrictionTransactionDTO.js';
import {
  EmbeddedMosaicAddressRestrictionTransactionDTOFromJSON,
  EmbeddedMosaicAddressRestrictionTransactionDTOFromJSONTyped,
  EmbeddedMosaicAddressRestrictionTransactionDTOToJSON,
  EmbeddedMosaicAddressRestrictionTransactionDTOToJSONTyped,
} from './EmbeddedMosaicAddressRestrictionTransactionDTO.js';
import type { EmbeddedMosaicAliasTransactionDTO } from './EmbeddedMosaicAliasTransactionDTO.js';
import {
  EmbeddedMosaicAliasTransactionDTOFromJSON,
  EmbeddedMosaicAliasTransactionDTOFromJSONTyped,
  EmbeddedMosaicAliasTransactionDTOToJSON,
  EmbeddedMosaicAliasTransactionDTOToJSONTyped,
} from './EmbeddedMosaicAliasTransactionDTO.js';
import type { EmbeddedMosaicDefinitionTransactionDTO } from './EmbeddedMosaicDefinitionTransactionDTO.js';
import {
  EmbeddedMosaicDefinitionTransactionDTOFromJSON,
  EmbeddedMosaicDefinitionTransactionDTOFromJSONTyped,
  EmbeddedMosaicDefinitionTransactionDTOToJSON,
  EmbeddedMosaicDefinitionTransactionDTOToJSONTyped,
} from './EmbeddedMosaicDefinitionTransactionDTO.js';
import type { EmbeddedMosaicGlobalRestrictionTransactionDTO } from './EmbeddedMosaicGlobalRestrictionTransactionDTO.js';
import {
  EmbeddedMosaicGlobalRestrictionTransactionDTOFromJSON,
  EmbeddedMosaicGlobalRestrictionTransactionDTOFromJSONTyped,
  EmbeddedMosaicGlobalRestrictionTransactionDTOToJSON,
  EmbeddedMosaicGlobalRestrictionTransactionDTOToJSONTyped,
} from './EmbeddedMosaicGlobalRestrictionTransactionDTO.js';
import type { EmbeddedMosaicMetadataTransactionDTO } from './EmbeddedMosaicMetadataTransactionDTO.js';
import {
  EmbeddedMosaicMetadataTransactionDTOFromJSON,
  EmbeddedMosaicMetadataTransactionDTOFromJSONTyped,
  EmbeddedMosaicMetadataTransactionDTOToJSON,
  EmbeddedMosaicMetadataTransactionDTOToJSONTyped,
} from './EmbeddedMosaicMetadataTransactionDTO.js';
import type { EmbeddedMosaicSupplyChangeTransactionDTO } from './EmbeddedMosaicSupplyChangeTransactionDTO.js';
import {
  EmbeddedMosaicSupplyChangeTransactionDTOFromJSON,
  EmbeddedMosaicSupplyChangeTransactionDTOFromJSONTyped,
  EmbeddedMosaicSupplyChangeTransactionDTOToJSON,
  EmbeddedMosaicSupplyChangeTransactionDTOToJSONTyped,
} from './EmbeddedMosaicSupplyChangeTransactionDTO.js';
import type { EmbeddedMosaicSupplyRevocationTransactionDTO } from './EmbeddedMosaicSupplyRevocationTransactionDTO.js';
import {
  EmbeddedMosaicSupplyRevocationTransactionDTOFromJSON,
  EmbeddedMosaicSupplyRevocationTransactionDTOFromJSONTyped,
  EmbeddedMosaicSupplyRevocationTransactionDTOToJSON,
  EmbeddedMosaicSupplyRevocationTransactionDTOToJSONTyped,
} from './EmbeddedMosaicSupplyRevocationTransactionDTO.js';
import type { EmbeddedMultisigAccountModificationTransactionDTO } from './EmbeddedMultisigAccountModificationTransactionDTO.js';
import {
  EmbeddedMultisigAccountModificationTransactionDTOFromJSON,
  EmbeddedMultisigAccountModificationTransactionDTOFromJSONTyped,
  EmbeddedMultisigAccountModificationTransactionDTOToJSON,
  EmbeddedMultisigAccountModificationTransactionDTOToJSONTyped,
} from './EmbeddedMultisigAccountModificationTransactionDTO.js';
import type { EmbeddedNamespaceMetadataTransactionDTO } from './EmbeddedNamespaceMetadataTransactionDTO.js';
import {
  EmbeddedNamespaceMetadataTransactionDTOFromJSON,
  EmbeddedNamespaceMetadataTransactionDTOFromJSONTyped,
  EmbeddedNamespaceMetadataTransactionDTOToJSON,
  EmbeddedNamespaceMetadataTransactionDTOToJSONTyped,
} from './EmbeddedNamespaceMetadataTransactionDTO.js';
import type { EmbeddedNamespaceRegistrationTransactionDTO } from './EmbeddedNamespaceRegistrationTransactionDTO.js';
import {
  EmbeddedNamespaceRegistrationTransactionDTOFromJSON,
  EmbeddedNamespaceRegistrationTransactionDTOFromJSONTyped,
  EmbeddedNamespaceRegistrationTransactionDTOToJSON,
  EmbeddedNamespaceRegistrationTransactionDTOToJSONTyped,
} from './EmbeddedNamespaceRegistrationTransactionDTO.js';
import type { EmbeddedNodeKeyLinkTransactionDTO } from './EmbeddedNodeKeyLinkTransactionDTO.js';
import {
  EmbeddedNodeKeyLinkTransactionDTOFromJSON,
  EmbeddedNodeKeyLinkTransactionDTOFromJSONTyped,
  EmbeddedNodeKeyLinkTransactionDTOToJSON,
  EmbeddedNodeKeyLinkTransactionDTOToJSONTyped,
} from './EmbeddedNodeKeyLinkTransactionDTO.js';
import type { EmbeddedSecretLockTransactionDTO } from './EmbeddedSecretLockTransactionDTO.js';
import {
  EmbeddedSecretLockTransactionDTOFromJSON,
  EmbeddedSecretLockTransactionDTOFromJSONTyped,
  EmbeddedSecretLockTransactionDTOToJSON,
  EmbeddedSecretLockTransactionDTOToJSONTyped,
} from './EmbeddedSecretLockTransactionDTO.js';
import type { EmbeddedSecretProofTransactionDTO } from './EmbeddedSecretProofTransactionDTO.js';
import {
  EmbeddedSecretProofTransactionDTOFromJSON,
  EmbeddedSecretProofTransactionDTOFromJSONTyped,
  EmbeddedSecretProofTransactionDTOToJSON,
  EmbeddedSecretProofTransactionDTOToJSONTyped,
} from './EmbeddedSecretProofTransactionDTO.js';
import type { EmbeddedTransactionInfoDTO } from './EmbeddedTransactionInfoDTO.js';
import {
  EmbeddedTransactionInfoDTOFromJSON,
  EmbeddedTransactionInfoDTOFromJSONTyped,
  EmbeddedTransactionInfoDTOToJSON,
  EmbeddedTransactionInfoDTOToJSONTyped,
} from './EmbeddedTransactionInfoDTO.js';
import type { EmbeddedTransferTransactionDTO } from './EmbeddedTransferTransactionDTO.js';
import {
  EmbeddedTransferTransactionDTOFromJSON,
  EmbeddedTransferTransactionDTOFromJSONTyped,
  EmbeddedTransferTransactionDTOToJSON,
  EmbeddedTransferTransactionDTOToJSONTyped,
} from './EmbeddedTransferTransactionDTO.js';
import type { EmbeddedVotingKeyLinkTransactionDTO } from './EmbeddedVotingKeyLinkTransactionDTO.js';
import {
  EmbeddedVotingKeyLinkTransactionDTOFromJSON,
  EmbeddedVotingKeyLinkTransactionDTOFromJSONTyped,
  EmbeddedVotingKeyLinkTransactionDTOToJSON,
  EmbeddedVotingKeyLinkTransactionDTOToJSONTyped,
} from './EmbeddedVotingKeyLinkTransactionDTO.js';
import type { EmbeddedVrfKeyLinkTransactionDTO } from './EmbeddedVrfKeyLinkTransactionDTO.js';
import {
  EmbeddedVrfKeyLinkTransactionDTOFromJSON,
  EmbeddedVrfKeyLinkTransactionDTOFromJSONTyped,
  EmbeddedVrfKeyLinkTransactionDTOToJSON,
  EmbeddedVrfKeyLinkTransactionDTOToJSONTyped,
} from './EmbeddedVrfKeyLinkTransactionDTO.js';
import type { HashLockTransactionDTO } from './HashLockTransactionDTO.js';
import {
  HashLockTransactionDTOFromJSON,
  HashLockTransactionDTOFromJSONTyped,
  HashLockTransactionDTOToJSON,
  HashLockTransactionDTOToJSONTyped,
} from './HashLockTransactionDTO.js';
import type { LinkActionEnum } from './LinkActionEnum.js';
import {
  LinkActionEnumFromJSON,
  LinkActionEnumFromJSONTyped,
  LinkActionEnumToJSON,
  LinkActionEnumToJSONTyped,
} from './LinkActionEnum.js';
import type { LockHashAlgorithmEnum } from './LockHashAlgorithmEnum.js';
import {
  LockHashAlgorithmEnumFromJSON,
  LockHashAlgorithmEnumFromJSONTyped,
  LockHashAlgorithmEnumToJSON,
  LockHashAlgorithmEnumToJSONTyped,
} from './LockHashAlgorithmEnum.js';
import type { MosaicAddressRestrictionTransactionDTO } from './MosaicAddressRestrictionTransactionDTO.js';
import {
  MosaicAddressRestrictionTransactionDTOFromJSON,
  MosaicAddressRestrictionTransactionDTOFromJSONTyped,
  MosaicAddressRestrictionTransactionDTOToJSON,
  MosaicAddressRestrictionTransactionDTOToJSONTyped,
} from './MosaicAddressRestrictionTransactionDTO.js';
import type { MosaicAliasTransactionDTO } from './MosaicAliasTransactionDTO.js';
import {
  MosaicAliasTransactionDTOFromJSON,
  MosaicAliasTransactionDTOFromJSONTyped,
  MosaicAliasTransactionDTOToJSON,
  MosaicAliasTransactionDTOToJSONTyped,
} from './MosaicAliasTransactionDTO.js';
import type { MosaicDefinitionTransactionDTO } from './MosaicDefinitionTransactionDTO.js';
import {
  MosaicDefinitionTransactionDTOFromJSON,
  MosaicDefinitionTransactionDTOFromJSONTyped,
  MosaicDefinitionTransactionDTOToJSON,
  MosaicDefinitionTransactionDTOToJSONTyped,
} from './MosaicDefinitionTransactionDTO.js';
import type { MosaicGlobalRestrictionTransactionDTO } from './MosaicGlobalRestrictionTransactionDTO.js';
import {
  MosaicGlobalRestrictionTransactionDTOFromJSON,
  MosaicGlobalRestrictionTransactionDTOFromJSONTyped,
  MosaicGlobalRestrictionTransactionDTOToJSON,
  MosaicGlobalRestrictionTransactionDTOToJSONTyped,
} from './MosaicGlobalRestrictionTransactionDTO.js';
import type { MosaicMetadataTransactionDTO } from './MosaicMetadataTransactionDTO.js';
import {
  MosaicMetadataTransactionDTOFromJSON,
  MosaicMetadataTransactionDTOFromJSONTyped,
  MosaicMetadataTransactionDTOToJSON,
  MosaicMetadataTransactionDTOToJSONTyped,
} from './MosaicMetadataTransactionDTO.js';
import type { MosaicRestrictionTypeEnum } from './MosaicRestrictionTypeEnum.js';
import {
  MosaicRestrictionTypeEnumFromJSON,
  MosaicRestrictionTypeEnumFromJSONTyped,
  MosaicRestrictionTypeEnumToJSON,
  MosaicRestrictionTypeEnumToJSONTyped,
} from './MosaicRestrictionTypeEnum.js';
import type { MosaicSupplyChangeActionEnum } from './MosaicSupplyChangeActionEnum.js';
import {
  MosaicSupplyChangeActionEnumFromJSON,
  MosaicSupplyChangeActionEnumFromJSONTyped,
  MosaicSupplyChangeActionEnumToJSON,
  MosaicSupplyChangeActionEnumToJSONTyped,
} from './MosaicSupplyChangeActionEnum.js';
import type { MosaicSupplyChangeTransactionDTO } from './MosaicSupplyChangeTransactionDTO.js';
import {
  MosaicSupplyChangeTransactionDTOFromJSON,
  MosaicSupplyChangeTransactionDTOFromJSONTyped,
  MosaicSupplyChangeTransactionDTOToJSON,
  MosaicSupplyChangeTransactionDTOToJSONTyped,
} from './MosaicSupplyChangeTransactionDTO.js';
import type { MosaicSupplyRevocationTransactionDTO } from './MosaicSupplyRevocationTransactionDTO.js';
import {
  MosaicSupplyRevocationTransactionDTOFromJSON,
  MosaicSupplyRevocationTransactionDTOFromJSONTyped,
  MosaicSupplyRevocationTransactionDTOToJSON,
  MosaicSupplyRevocationTransactionDTOToJSONTyped,
} from './MosaicSupplyRevocationTransactionDTO.js';
import type { MultisigAccountModificationTransactionDTO } from './MultisigAccountModificationTransactionDTO.js';
import {
  MultisigAccountModificationTransactionDTOFromJSON,
  MultisigAccountModificationTransactionDTOFromJSONTyped,
  MultisigAccountModificationTransactionDTOToJSON,
  MultisigAccountModificationTransactionDTOToJSONTyped,
} from './MultisigAccountModificationTransactionDTO.js';
import type { NamespaceMetadataTransactionDTO } from './NamespaceMetadataTransactionDTO.js';
import {
  NamespaceMetadataTransactionDTOFromJSON,
  NamespaceMetadataTransactionDTOFromJSONTyped,
  NamespaceMetadataTransactionDTOToJSON,
  NamespaceMetadataTransactionDTOToJSONTyped,
} from './NamespaceMetadataTransactionDTO.js';
import type { NamespaceRegistrationTransactionDTO } from './NamespaceRegistrationTransactionDTO.js';
import {
  NamespaceRegistrationTransactionDTOFromJSON,
  NamespaceRegistrationTransactionDTOFromJSONTyped,
  NamespaceRegistrationTransactionDTOToJSON,
  NamespaceRegistrationTransactionDTOToJSONTyped,
} from './NamespaceRegistrationTransactionDTO.js';
import type { NamespaceRegistrationTypeEnum } from './NamespaceRegistrationTypeEnum.js';
import {
  NamespaceRegistrationTypeEnumFromJSON,
  NamespaceRegistrationTypeEnumFromJSONTyped,
  NamespaceRegistrationTypeEnumToJSON,
  NamespaceRegistrationTypeEnumToJSONTyped,
} from './NamespaceRegistrationTypeEnum.js';
import type { NetworkTypeEnum } from './NetworkTypeEnum.js';
import {
  NetworkTypeEnumFromJSON,
  NetworkTypeEnumFromJSONTyped,
  NetworkTypeEnumToJSON,
  NetworkTypeEnumToJSONTyped,
} from './NetworkTypeEnum.js';
import type { NodeKeyLinkTransactionDTO } from './NodeKeyLinkTransactionDTO.js';
import {
  NodeKeyLinkTransactionDTOFromJSON,
  NodeKeyLinkTransactionDTOFromJSONTyped,
  NodeKeyLinkTransactionDTOToJSON,
  NodeKeyLinkTransactionDTOToJSONTyped,
} from './NodeKeyLinkTransactionDTO.js';
import type { SecretLockTransactionDTO } from './SecretLockTransactionDTO.js';
import {
  SecretLockTransactionDTOFromJSON,
  SecretLockTransactionDTOFromJSONTyped,
  SecretLockTransactionDTOToJSON,
  SecretLockTransactionDTOToJSONTyped,
} from './SecretLockTransactionDTO.js';
import type { SecretProofTransactionDTO } from './SecretProofTransactionDTO.js';
import {
  SecretProofTransactionDTOFromJSON,
  SecretProofTransactionDTOFromJSONTyped,
  SecretProofTransactionDTOToJSON,
  SecretProofTransactionDTOToJSONTyped,
} from './SecretProofTransactionDTO.js';
import type { TransactionTypeEnum } from './TransactionTypeEnum.js';
import {
  TransactionTypeEnumFromJSON,
  TransactionTypeEnumFromJSONTyped,
  TransactionTypeEnumToJSON,
  TransactionTypeEnumToJSONTyped,
} from './TransactionTypeEnum.js';
import type { TransferTransactionDTO } from './TransferTransactionDTO.js';
import {
  TransferTransactionDTOFromJSON,
  TransferTransactionDTOFromJSONTyped,
  TransferTransactionDTOToJSON,
  TransferTransactionDTOToJSONTyped,
} from './TransferTransactionDTO.js';
import type { UnresolvedMosaic } from './UnresolvedMosaic.js';
import {
  UnresolvedMosaicFromJSON,
  UnresolvedMosaicFromJSONTyped,
  UnresolvedMosaicToJSON,
  UnresolvedMosaicToJSONTyped,
} from './UnresolvedMosaic.js';
import type { VotingKeyLinkTransactionDTO } from './VotingKeyLinkTransactionDTO.js';
import {
  VotingKeyLinkTransactionDTOFromJSON,
  VotingKeyLinkTransactionDTOFromJSONTyped,
  VotingKeyLinkTransactionDTOToJSON,
  VotingKeyLinkTransactionDTOToJSONTyped,
} from './VotingKeyLinkTransactionDTO.js';
import type { VrfKeyLinkTransactionDTO } from './VrfKeyLinkTransactionDTO.js';
import {
  VrfKeyLinkTransactionDTOFromJSON,
  VrfKeyLinkTransactionDTOFromJSONTyped,
  VrfKeyLinkTransactionDTOToJSON,
  VrfKeyLinkTransactionDTOToJSONTyped,
} from './VrfKeyLinkTransactionDTO.js';

/**
 *
 * @export
 * @interface TransactionInfoDTOTransaction
 */
export interface TransactionInfoDTOTransaction {
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof TransactionInfoDTOTransaction
   */
  size: number;
  /**
   * Entity's signature generated by the signer.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  signature: string;
  /**
   * Public key.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof TransactionInfoDTOTransaction
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof TransactionInfoDTOTransaction
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof TransactionInfoDTOTransaction
   */
  type: number;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  maxFee: string;
  /**
   * Duration expressed in number of blocks.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  deadline: string;
  /**
   * 32 bytes voting public key.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  linkedPublicKey: string;
  /**
   *
   * @type {LinkActionEnum}
   * @memberof TransactionInfoDTOTransaction
   */
  linkAction: LinkActionEnum;
  /**
   * Finalization Epoch
   * @type {number}
   * @memberof TransactionInfoDTOTransaction
   */
  startEpoch: number;
  /**
   * Finalization Epoch
   * @type {number}
   * @memberof TransactionInfoDTOTransaction
   */
  endEpoch: number;
  /**
   *
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  transactionsHash: string;
  /**
   * Array of transaction cosignatures.
   * @type {Array<CosignatureDTO>}
   * @memberof TransactionInfoDTOTransaction
   */
  cosignatures?: Array<CosignatureDTO>;
  /**
   * Array of transactions initiated by different accounts.
   * @type {Array<EmbeddedTransactionInfoDTO>}
   * @memberof TransactionInfoDTOTransaction
   */
  transactions?: Array<EmbeddedTransactionInfoDTO>;
  /**
   * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
   * is used instead of the real mosaic identifier.
   *
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  mosaicId: string;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  amount: string;
  /**
   * Duration expressed in number of blocks.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  duration: string;
  /**
   *
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  hash: string;
  /**
   * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
   * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA.
   * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
   *
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  recipientAddress: string;
  /**
   *
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  secret: string;
  /**
   *
   * @type {LockHashAlgorithmEnum}
   * @memberof TransactionInfoDTOTransaction
   */
  hashAlgorithm: LockHashAlgorithmEnum;
  /**
   * Original random set of bytes.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  proof: string;
  /**
   * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
   * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA.
   * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
   *
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  targetAddress: string;
  /**
   * Metadata key scoped to source, target and type expressed.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  scopedMetadataKey: string;
  /**
   * Change in value size in bytes.
   * @type {number}
   * @memberof TransactionInfoDTOTransaction
   */
  valueSizeDelta: number;
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof TransactionInfoDTOTransaction
   */
  valueSize: number;
  /**
   * Metadata value. If embedded in a transaction, this is calculated as xor(previous-value, value).
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  value: string;
  /**
   * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
   * is used instead of the real mosaic identifier.
   *
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  targetMosaicId: string;
  /**
   * Namespace identifier.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  targetNamespaceId?: string;
  /**
   * Namespace identifier.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  id: string;
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof TransactionInfoDTOTransaction
   */
  nonce: number;
  /**
   * - 0x00 (none) - No flags present.
   * - 0x01 (supplyMutable) - Mosaic supports supply changes even when mosaic owner owns partial supply.
   * - 0x02 (transferable) - Mosaic supports transfers between arbitrary accounts. When not set, mosaic can only be transferred to
   *     and from mosaic owner.
   * - 0x04 (restrictable) - Mosaic supports custom restrictions configured by mosaic owner.
   * - 0x08 (revokable) - Mosaic allows creator to revoke balances from another user.
   *
   * @type {number}
   * @memberof TransactionInfoDTOTransaction
   */
  flags: number;
  /**
   * Determines up to what decimal place the mosaic can be divided.
   * Divisibility of 3 means that a mosaic can be divided into smallest parts of 0.001 mosaics.
   * The divisibility must be in the range of 0 and 6.
   *
   * @type {number}
   * @memberof TransactionInfoDTOTransaction
   */
  divisibility: number;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  delta: string;
  /**
   *
   * @type {MosaicSupplyChangeActionEnum}
   * @memberof TransactionInfoDTOTransaction
   */
  action: MosaicSupplyChangeActionEnum;
  /**
   * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
   * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA.
   * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
   *
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  sourceAddress: string;
  /**
   * Namespace identifier.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  parentId?: string;
  /**
   *
   * @type {NamespaceRegistrationTypeEnum}
   * @memberof TransactionInfoDTOTransaction
   */
  registrationType: NamespaceRegistrationTypeEnum;
  /**
   * Namespace name.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  name: string;
  /**
   * Namespace identifier.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  namespaceId: string;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  address: string;
  /**
   *
   * @type {AliasActionEnum}
   * @memberof TransactionInfoDTOTransaction
   */
  aliasAction: AliasActionEnum;
  /**
   * Number of signatures needed to remove a cosignatory.
   * If we are modifying an existing multisig account, this indicates the relative change of the minimum cosignatories.
   *
   * @type {number}
   * @memberof TransactionInfoDTOTransaction
   */
  minRemovalDelta: number;
  /**
   * Number of signatures needed to approve a transaction.
   * If we are modifying an existing multisig account, this indicates the relative change of the minimum cosignatories.
   *
   * @type {number}
   * @memberof TransactionInfoDTOTransaction
   */
  minApprovalDelta: number;
  /**
   * Array of cosignatory accounts to add.
   * @type {Array<string>}
   * @memberof TransactionInfoDTOTransaction
   */
  addressAdditions: Array<string>;
  /**
   * Array of cosignatory accounts to delete.
   * @type {Array<string>}
   * @memberof TransactionInfoDTOTransaction
   */
  addressDeletions: Array<string>;
  /**
   *
   * @type {AccountRestrictionFlagsEnum}
   * @memberof TransactionInfoDTOTransaction
   */
  restrictionFlags: AccountRestrictionFlagsEnum;
  /**
   * Account restriction additions.
   * @type {Array<TransactionTypeEnum>}
   * @memberof TransactionInfoDTOTransaction
   */
  restrictionAdditions?: Array<TransactionTypeEnum>;
  /**
   * Account restriction deletions.
   * @type {Array<TransactionTypeEnum>}
   * @memberof TransactionInfoDTOTransaction
   */
  restrictionDeletions?: Array<TransactionTypeEnum>;
  /**
   * Mosaic identifier. If the most significant bit of byte 0 is set, a namespaceId (alias)
   * is used instead of the real mosaic identifier.
   *
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  referenceMosaicId: string;
  /**
   * Restriction key.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  restrictionKey: string;
  /**
   * Restriction value.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  previousRestrictionValue: string;
  /**
   * Restriction value.
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  newRestrictionValue: string;
  /**
   *
   * @type {MosaicRestrictionTypeEnum}
   * @memberof TransactionInfoDTOTransaction
   */
  previousRestrictionType: MosaicRestrictionTypeEnum;
  /**
   *
   * @type {MosaicRestrictionTypeEnum}
   * @memberof TransactionInfoDTOTransaction
   */
  newRestrictionType: MosaicRestrictionTypeEnum;
  /**
   * Array of mosaics sent to the recipient.
   *
   * @type {Array<UnresolvedMosaic>}
   * @memberof TransactionInfoDTOTransaction
   */
  mosaics?: Array<UnresolvedMosaic>;
  /**
   * Transfer transaction message
   * @type {string}
   * @memberof TransactionInfoDTOTransaction
   */
  message?: string;
}

/**
 * Check if a given object implements the TransactionInfoDTOTransaction interface.
 */
export function instanceOfTransactionInfoDTOTransaction(value: object): value is TransactionInfoDTOTransaction {
  if (!('size' in value) || value['size'] === undefined) return false;
  if (!('signature' in value) || value['signature'] === undefined) return false;
  if (!('signerPublicKey' in value) || value['signerPublicKey'] === undefined) return false;
  if (!('version' in value) || value['version'] === undefined) return false;
  if (!('network' in value) || value['network'] === undefined) return false;
  if (!('type' in value) || value['type'] === undefined) return false;
  if (!('maxFee' in value) || value['maxFee'] === undefined) return false;
  if (!('deadline' in value) || value['deadline'] === undefined) return false;
  if (!('linkedPublicKey' in value) || value['linkedPublicKey'] === undefined) return false;
  if (!('linkAction' in value) || value['linkAction'] === undefined) return false;
  if (!('startEpoch' in value) || value['startEpoch'] === undefined) return false;
  if (!('endEpoch' in value) || value['endEpoch'] === undefined) return false;
  if (!('transactionsHash' in value) || value['transactionsHash'] === undefined) return false;
  if (!('mosaicId' in value) || value['mosaicId'] === undefined) return false;
  if (!('amount' in value) || value['amount'] === undefined) return false;
  if (!('duration' in value) || value['duration'] === undefined) return false;
  if (!('hash' in value) || value['hash'] === undefined) return false;
  if (!('recipientAddress' in value) || value['recipientAddress'] === undefined) return false;
  if (!('secret' in value) || value['secret'] === undefined) return false;
  if (!('hashAlgorithm' in value) || value['hashAlgorithm'] === undefined) return false;
  if (!('proof' in value) || value['proof'] === undefined) return false;
  if (!('targetAddress' in value) || value['targetAddress'] === undefined) return false;
  if (!('scopedMetadataKey' in value) || value['scopedMetadataKey'] === undefined) return false;
  if (!('valueSizeDelta' in value) || value['valueSizeDelta'] === undefined) return false;
  if (!('valueSize' in value) || value['valueSize'] === undefined) return false;
  if (!('value' in value) || value['value'] === undefined) return false;
  if (!('targetMosaicId' in value) || value['targetMosaicId'] === undefined) return false;
  if (!('id' in value) || value['id'] === undefined) return false;
  if (!('nonce' in value) || value['nonce'] === undefined) return false;
  if (!('flags' in value) || value['flags'] === undefined) return false;
  if (!('divisibility' in value) || value['divisibility'] === undefined) return false;
  if (!('delta' in value) || value['delta'] === undefined) return false;
  if (!('action' in value) || value['action'] === undefined) return false;
  if (!('sourceAddress' in value) || value['sourceAddress'] === undefined) return false;
  if (!('registrationType' in value) || value['registrationType'] === undefined) return false;
  if (!('name' in value) || value['name'] === undefined) return false;
  if (!('namespaceId' in value) || value['namespaceId'] === undefined) return false;
  if (!('address' in value) || value['address'] === undefined) return false;
  if (!('aliasAction' in value) || value['aliasAction'] === undefined) return false;
  if (!('minRemovalDelta' in value) || value['minRemovalDelta'] === undefined) return false;
  if (!('minApprovalDelta' in value) || value['minApprovalDelta'] === undefined) return false;
  if (!('addressAdditions' in value) || value['addressAdditions'] === undefined) return false;
  if (!('addressDeletions' in value) || value['addressDeletions'] === undefined) return false;
  if (!('restrictionFlags' in value) || value['restrictionFlags'] === undefined) return false;
  if (!('referenceMosaicId' in value) || value['referenceMosaicId'] === undefined) return false;
  if (!('restrictionKey' in value) || value['restrictionKey'] === undefined) return false;
  if (!('previousRestrictionValue' in value) || value['previousRestrictionValue'] === undefined) return false;
  if (!('newRestrictionValue' in value) || value['newRestrictionValue'] === undefined) return false;
  if (!('previousRestrictionType' in value) || value['previousRestrictionType'] === undefined) return false;
  if (!('newRestrictionType' in value) || value['newRestrictionType'] === undefined) return false;
  return true;
}

export function TransactionInfoDTOTransactionFromJSON(json: any): TransactionInfoDTOTransaction {
  return TransactionInfoDTOTransactionFromJSONTyped(json, false);
}

export function TransactionInfoDTOTransactionFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): TransactionInfoDTOTransaction {
  if (json == null) {
    return json;
  }
  return {
    size: json['size'],
    signature: json['signature'],
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
    maxFee: json['maxFee'],
    deadline: json['deadline'],
    linkedPublicKey: json['linkedPublicKey'],
    linkAction: LinkActionEnumFromJSON(json['linkAction']),
    startEpoch: json['startEpoch'],
    endEpoch: json['endEpoch'],
    transactionsHash: json['transactionsHash'],
    cosignatures:
      json['cosignatures'] == null ? undefined : (json['cosignatures'] as Array<any>).map(CosignatureDTOFromJSON),
    transactions:
      json['transactions'] == null
        ? undefined
        : (json['transactions'] as Array<any>).map(EmbeddedTransactionInfoDTOFromJSON),
    mosaicId: json['mosaicId'],
    amount: json['amount'],
    duration: json['duration'],
    hash: json['hash'],
    recipientAddress: json['recipientAddress'],
    secret: json['secret'],
    hashAlgorithm: LockHashAlgorithmEnumFromJSON(json['hashAlgorithm']),
    proof: json['proof'],
    targetAddress: json['targetAddress'],
    scopedMetadataKey: json['scopedMetadataKey'],
    valueSizeDelta: json['valueSizeDelta'],
    valueSize: json['valueSize'],
    value: json['value'],
    targetMosaicId: json['targetMosaicId'],
    targetNamespaceId: json['targetNamespaceId'] == null ? undefined : json['targetNamespaceId'],
    id: json['id'],
    nonce: json['nonce'],
    flags: json['flags'],
    divisibility: json['divisibility'],
    delta: json['delta'],
    action: MosaicSupplyChangeActionEnumFromJSON(json['action']),
    sourceAddress: json['sourceAddress'],
    parentId: json['parentId'] == null ? undefined : json['parentId'],
    registrationType: NamespaceRegistrationTypeEnumFromJSON(json['registrationType']),
    name: json['name'],
    namespaceId: json['namespaceId'],
    address: json['address'],
    aliasAction: AliasActionEnumFromJSON(json['aliasAction']),
    minRemovalDelta: json['minRemovalDelta'],
    minApprovalDelta: json['minApprovalDelta'],
    addressAdditions: json['addressAdditions'],
    addressDeletions: json['addressDeletions'],
    restrictionFlags: AccountRestrictionFlagsEnumFromJSON(json['restrictionFlags']),
    restrictionAdditions:
      json['restrictionAdditions'] == null
        ? undefined
        : (json['restrictionAdditions'] as Array<any>).map(TransactionTypeEnumFromJSON),
    restrictionDeletions:
      json['restrictionDeletions'] == null
        ? undefined
        : (json['restrictionDeletions'] as Array<any>).map(TransactionTypeEnumFromJSON),
    referenceMosaicId: json['referenceMosaicId'],
    restrictionKey: json['restrictionKey'],
    previousRestrictionValue: json['previousRestrictionValue'],
    newRestrictionValue: json['newRestrictionValue'],
    previousRestrictionType: MosaicRestrictionTypeEnumFromJSON(json['previousRestrictionType']),
    newRestrictionType: MosaicRestrictionTypeEnumFromJSON(json['newRestrictionType']),
    mosaics: json['mosaics'] == null ? undefined : (json['mosaics'] as Array<any>).map(UnresolvedMosaicFromJSON),
    message: json['message'] == null ? undefined : json['message'],
  };
}

export function TransactionInfoDTOTransactionToJSON(json: any): TransactionInfoDTOTransaction {
  return TransactionInfoDTOTransactionToJSONTyped(json, false);
}

export function TransactionInfoDTOTransactionToJSONTyped(
  value?: TransactionInfoDTOTransaction | null,
  ignoreDiscriminator: boolean = false
): any {
  if (value == null) {
    return value;
  }

  return {
    size: value['size'],
    signature: value['signature'],
    signerPublicKey: value['signerPublicKey'],
    version: value['version'],
    network: NetworkTypeEnumToJSON(value['network']),
    type: value['type'],
    maxFee: value['maxFee'],
    deadline: value['deadline'],
    linkedPublicKey: value['linkedPublicKey'],
    linkAction: LinkActionEnumToJSON(value['linkAction']),
    startEpoch: value['startEpoch'],
    endEpoch: value['endEpoch'],
    transactionsHash: value['transactionsHash'],
    cosignatures:
      value['cosignatures'] == null ? undefined : (value['cosignatures'] as Array<any>).map(CosignatureDTOToJSON),
    transactions:
      value['transactions'] == null
        ? undefined
        : (value['transactions'] as Array<any>).map(EmbeddedTransactionInfoDTOToJSON),
    mosaicId: value['mosaicId'],
    amount: value['amount'],
    duration: value['duration'],
    hash: value['hash'],
    recipientAddress: value['recipientAddress'],
    secret: value['secret'],
    hashAlgorithm: LockHashAlgorithmEnumToJSON(value['hashAlgorithm']),
    proof: value['proof'],
    targetAddress: value['targetAddress'],
    scopedMetadataKey: value['scopedMetadataKey'],
    valueSizeDelta: value['valueSizeDelta'],
    valueSize: value['valueSize'],
    value: value['value'],
    targetMosaicId: value['targetMosaicId'],
    targetNamespaceId: value['targetNamespaceId'],
    id: value['id'],
    nonce: value['nonce'],
    flags: value['flags'],
    divisibility: value['divisibility'],
    delta: value['delta'],
    action: MosaicSupplyChangeActionEnumToJSON(value['action']),
    sourceAddress: value['sourceAddress'],
    parentId: value['parentId'],
    registrationType: NamespaceRegistrationTypeEnumToJSON(value['registrationType']),
    name: value['name'],
    namespaceId: value['namespaceId'],
    address: value['address'],
    aliasAction: AliasActionEnumToJSON(value['aliasAction']),
    minRemovalDelta: value['minRemovalDelta'],
    minApprovalDelta: value['minApprovalDelta'],
    addressAdditions: value['addressAdditions'],
    addressDeletions: value['addressDeletions'],
    restrictionFlags: AccountRestrictionFlagsEnumToJSON(value['restrictionFlags']),
    restrictionAdditions:
      value['restrictionAdditions'] == null
        ? undefined
        : (value['restrictionAdditions'] as Array<any>).map(TransactionTypeEnumToJSON),
    restrictionDeletions:
      value['restrictionDeletions'] == null
        ? undefined
        : (value['restrictionDeletions'] as Array<any>).map(TransactionTypeEnumToJSON),
    referenceMosaicId: value['referenceMosaicId'],
    restrictionKey: value['restrictionKey'],
    previousRestrictionValue: value['previousRestrictionValue'],
    newRestrictionValue: value['newRestrictionValue'],
    previousRestrictionType: MosaicRestrictionTypeEnumToJSON(value['previousRestrictionType']),
    newRestrictionType: MosaicRestrictionTypeEnumToJSON(value['newRestrictionType']),
    mosaics: value['mosaics'] == null ? undefined : (value['mosaics'] as Array<any>).map(UnresolvedMosaicToJSON),
    message: value['message'],
  };
}
