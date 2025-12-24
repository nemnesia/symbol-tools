
# TransactionMetaDTO


## Properties

Name | Type
------------ | -------------
`height` | string
`hash` | string
`merkleComponentHash` | string
`index` | number
`timestamp` | string
`feeMultiplier` | number

## Example

```typescript
import type { TransactionMetaDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "height": 1,
  "hash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "merkleComponentHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "index": null,
  "timestamp": 108303181802,
  "feeMultiplier": 0,
} satisfies TransactionMetaDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransactionMetaDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


