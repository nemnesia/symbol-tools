
# TransactionInfoDTOTransaction


## Properties

Name | Type
------------ | -------------
`size` | number
`signature` | string
`signerPublicKey` | string
`version` | number
`network` | [NetworkTypeEnum](NetworkTypeEnum.md)
`type` | number
`maxFee` | string
`deadline` | string
`linkedPublicKey` | string
`linkAction` | [LinkActionEnum](LinkActionEnum.md)
`startEpoch` | number
`endEpoch` | number
`transactionsHash` | string
`cosignatures` | [Array&lt;CosignatureDTO&gt;](CosignatureDTO.md)
`transactions` | [Array&lt;EmbeddedTransactionInfoDTO&gt;](EmbeddedTransactionInfoDTO.md)
`mosaicId` | string
`amount` | string
`duration` | string
`hash` | string
`recipientAddress` | string
`secret` | string
`hashAlgorithm` | [LockHashAlgorithmEnum](LockHashAlgorithmEnum.md)
`proof` | string
`targetAddress` | string
`scopedMetadataKey` | string
`valueSizeDelta` | number
`valueSize` | number
`value` | string
`targetMosaicId` | string
`targetNamespaceId` | string
`id` | string
`nonce` | number
`flags` | number
`divisibility` | number
`delta` | string
`action` | [MosaicSupplyChangeActionEnum](MosaicSupplyChangeActionEnum.md)
`sourceAddress` | string
`parentId` | string
`registrationType` | [NamespaceRegistrationTypeEnum](NamespaceRegistrationTypeEnum.md)
`name` | string
`namespaceId` | string
`address` | string
`aliasAction` | [AliasActionEnum](AliasActionEnum.md)
`minRemovalDelta` | number
`minApprovalDelta` | number
`addressAdditions` | Array&lt;string&gt;
`addressDeletions` | Array&lt;string&gt;
`restrictionFlags` | [AccountRestrictionFlagsEnum](AccountRestrictionFlagsEnum.md)
`restrictionAdditions` | [Array&lt;TransactionTypeEnum&gt;](TransactionTypeEnum.md)
`restrictionDeletions` | [Array&lt;TransactionTypeEnum&gt;](TransactionTypeEnum.md)
`referenceMosaicId` | string
`restrictionKey` | string
`previousRestrictionValue` | string
`newRestrictionValue` | string
`previousRestrictionType` | [MosaicRestrictionTypeEnum](MosaicRestrictionTypeEnum.md)
`newRestrictionType` | [MosaicRestrictionTypeEnum](MosaicRestrictionTypeEnum.md)
`mosaics` | [Array&lt;UnresolvedMosaic&gt;](UnresolvedMosaic.md)
`message` | string

## Example

```typescript
import type { TransactionInfoDTOTransaction } from ''

// TODO: Update the object below with actual values
const example = {
  "size": 2222212828,
  "signature": 4B408BBEDF25F2AC8E0E44A6E51E3CCBA03885902055F75EB9FF50433532CA44BF9175FDA7502EEE2\
FC1617126E453A2BD692BAFDAAF06BC8EDEBA7961B3730D
,
  "signerPublicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
  "version": null,
  "network": null,
  "type": null,
  "maxFee": 123456,
  "deadline": 200,
  "linkedPublicKey": 4EDDA97C991A0BF44E0570B0BA0E0F7F1CE821A799726888734F28DDCCE8C591,
  "linkAction": null,
  "startEpoch": 123456,
  "endEpoch": 123456,
  "transactionsHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "cosignatures": null,
  "transactions": null,
  "mosaicId": 85BBEA6CC462B244,
  "amount": 123456,
  "duration": 200,
  "hash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "recipientAddress": TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA,
  "secret": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "hashAlgorithm": null,
  "proof": null,
  "targetAddress": TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA,
  "scopedMetadataKey": 0DC67FBE1CAD29E3,
  "valueSizeDelta": null,
  "valueSize": 2222212828,
  "value": null,
  "targetMosaicId": 85BBEA6CC462B244,
  "targetNamespaceId": 85BBEA6CC462B244,
  "id": 85BBEA6CC462B244,
  "nonce": 2222212828,
  "flags": null,
  "divisibility": null,
  "delta": 123456,
  "action": null,
  "sourceAddress": TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA,
  "parentId": 85BBEA6CC462B244,
  "registrationType": null,
  "name": null,
  "namespaceId": 85BBEA6CC462B244,
  "address": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "aliasAction": null,
  "minRemovalDelta": 1,
  "minApprovalDelta": 1,
  "addressAdditions": null,
  "addressDeletions": null,
  "restrictionFlags": null,
  "restrictionAdditions": null,
  "restrictionDeletions": null,
  "referenceMosaicId": 85BBEA6CC462B244,
  "restrictionKey": 0DC67FBE1CAD29E3,
  "previousRestrictionValue": 1000,
  "newRestrictionValue": 1000,
  "previousRestrictionType": null,
  "newRestrictionType": null,
  "mosaics": null,
  "message": null,
} satisfies TransactionInfoDTOTransaction

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransactionInfoDTOTransaction
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


