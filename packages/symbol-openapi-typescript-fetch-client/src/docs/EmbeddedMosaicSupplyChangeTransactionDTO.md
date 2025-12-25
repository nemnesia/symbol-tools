
# EmbeddedMosaicSupplyChangeTransactionDTO


## Properties

Name | Type
------------ | -------------
`signerPublicKey` | string
`version` | number
`network` | [NetworkTypeEnum](NetworkTypeEnum.md)
`type` | number
`mosaicId` | string
`delta` | string
`action` | [MosaicSupplyChangeActionEnum](MosaicSupplyChangeActionEnum.md)

## Example

```typescript
import type { EmbeddedMosaicSupplyChangeTransactionDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "signerPublicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
  "version": null,
  "network": null,
  "type": null,
  "mosaicId": 85BBEA6CC462B244,
  "delta": 123456,
  "action": null,
} satisfies EmbeddedMosaicSupplyChangeTransactionDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EmbeddedMosaicSupplyChangeTransactionDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


