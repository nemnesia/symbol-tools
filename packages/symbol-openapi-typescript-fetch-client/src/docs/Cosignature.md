
# Cosignature


## Properties

Name | Type
------------ | -------------
`parentHash` | string
`signature` | string
`signerPublicKey` | string
`version` | string

## Example

```typescript
import type { Cosignature } from ''

// TODO: Update the object below with actual values
const example = {
  "parentHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "signature": 4B408BBEDF25F2AC8E0E44A6E51E3CCBA03885902055F75EB9FF50433532CA44BF9175FDA7502EEE2\
FC1617126E453A2BD692BAFDAAF06BC8EDEBA7961B3730D
,
  "signerPublicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
  "version": 0,
} satisfies Cosignature

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Cosignature
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


