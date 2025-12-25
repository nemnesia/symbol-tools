
# AccountDTO


## Properties

Name | Type
------------ | -------------
`version` | number
`address` | string
`addressHeight` | string
`publicKey` | string
`publicKeyHeight` | string
`accountType` | [AccountTypeEnum](AccountTypeEnum.md)
`supplementalPublicKeys` | [SupplementalPublicKeysDTO](SupplementalPublicKeysDTO.md)
`activityBuckets` | [Array&lt;ActivityBucketDTO&gt;](ActivityBucketDTO.md)
`mosaics` | [Array&lt;Mosaic&gt;](Mosaic.md)
`importance` | string
`importanceHeight` | string

## Example

```typescript
import type { AccountDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "version": 1,
  "address": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "addressHeight": 1,
  "publicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
  "publicKeyHeight": 1,
  "accountType": null,
  "supplementalPublicKeys": null,
  "activityBuckets": null,
  "mosaics": null,
  "importance": 0,
  "importanceHeight": 1,
} satisfies AccountDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


