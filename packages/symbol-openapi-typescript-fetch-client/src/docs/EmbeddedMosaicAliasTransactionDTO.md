
# EmbeddedMosaicAliasTransactionDTO


## Properties

Name | Type
------------ | -------------
`signerPublicKey` | string
`version` | number
`network` | [NetworkTypeEnum](NetworkTypeEnum.md)
`type` | number
`namespaceId` | string
`mosaicId` | string
`aliasAction` | [AliasActionEnum](AliasActionEnum.md)

## Example

```typescript
import type { EmbeddedMosaicAliasTransactionDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "signerPublicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
  "version": null,
  "network": null,
  "type": null,
  "namespaceId": 85BBEA6CC462B244,
  "mosaicId": 0DC67FBE1CAD29E3,
  "aliasAction": null,
} satisfies EmbeddedMosaicAliasTransactionDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EmbeddedMosaicAliasTransactionDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


