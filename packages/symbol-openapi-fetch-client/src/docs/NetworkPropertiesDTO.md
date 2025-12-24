
# NetworkPropertiesDTO

Network related configuration properties.

## Properties

Name | Type
------------ | -------------
`identifier` | string
`nodeEqualityStrategy` | [NodeIdentityEqualityStrategy](NodeIdentityEqualityStrategy.md)
`nemesisSignerPublicKey` | string
`generationHashSeed` | string
`epochAdjustment` | string

## Example

```typescript
import type { NetworkPropertiesDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "identifier": testnet,
  "nodeEqualityStrategy": null,
  "nemesisSignerPublicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
  "generationHashSeed": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "epochAdjustment": 1573430400s,
} satisfies NetworkPropertiesDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NetworkPropertiesDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


