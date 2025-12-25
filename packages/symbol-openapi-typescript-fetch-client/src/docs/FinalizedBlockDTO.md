
# FinalizedBlockDTO


## Properties

Name | Type
------------ | -------------
`finalizationEpoch` | number
`finalizationPoint` | number
`height` | string
`hash` | string

## Example

```typescript
import type { FinalizedBlockDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "finalizationEpoch": 123456,
  "finalizationPoint": 0,
  "height": 1,
  "hash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
} satisfies FinalizedBlockDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FinalizedBlockDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


