
# EmbeddedMosaicAddressRestrictionTransactionDTO


## Properties

Name | Type
------------ | -------------
`signerPublicKey` | string
`version` | number
`network` | [NetworkTypeEnum](NetworkTypeEnum.md)
`type` | number
`mosaicId` | string
`restrictionKey` | string
`previousRestrictionValue` | string
`newRestrictionValue` | string
`targetAddress` | string

## Example

```typescript
import type { EmbeddedMosaicAddressRestrictionTransactionDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "signerPublicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
  "version": null,
  "network": null,
  "type": null,
  "mosaicId": 85BBEA6CC462B244,
  "restrictionKey": 0DC67FBE1CAD29E3,
  "previousRestrictionValue": 1000,
  "newRestrictionValue": 1000,
  "targetAddress": TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA,
} satisfies EmbeddedMosaicAddressRestrictionTransactionDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EmbeddedMosaicAddressRestrictionTransactionDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


