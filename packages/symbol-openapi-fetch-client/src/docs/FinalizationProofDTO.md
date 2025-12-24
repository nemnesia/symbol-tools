
# FinalizationProofDTO


## Properties

Name | Type
------------ | -------------
`version` | number
`finalizationEpoch` | number
`finalizationPoint` | number
`height` | string
`hash` | string
`messageGroups` | [Array&lt;MessageGroup&gt;](MessageGroup.md)

## Example

```typescript
import type { FinalizationProofDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "finalizationEpoch": 123456,
  "finalizationPoint": 0,
  "height": 1,
  "hash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "messageGroups": null,
} satisfies FinalizationProofDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FinalizationProofDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


