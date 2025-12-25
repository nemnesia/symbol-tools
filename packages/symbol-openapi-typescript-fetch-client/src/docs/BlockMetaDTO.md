
# BlockMetaDTO


## Properties

Name | Type
------------ | -------------
`hash` | string
`totalFee` | string
`generationHash` | string
`stateHashSubCacheMerkleRoots` | Array&lt;string&gt;
`totalTransactionsCount` | number
`transactionsCount` | number
`statementsCount` | number

## Example

```typescript
import type { BlockMetaDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "hash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "totalFee": 123456,
  "generationHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "stateHashSubCacheMerkleRoots": null,
  "totalTransactionsCount": 1,
  "transactionsCount": 1,
  "statementsCount": 1,
} satisfies BlockMetaDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BlockMetaDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


