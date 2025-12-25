
# NodeInfoDTO


## Properties

Name | Type
------------ | -------------
`version` | number
`publicKey` | string
`networkGenerationHashSeed` | string
`roles` | number
`port` | number
`networkIdentifier` | number
`friendlyName` | string
`host` | string
`nodePublicKey` | string

## Example

```typescript
import type { NodeInfoDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "version": 0,
  "publicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
  "networkGenerationHashSeed": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "roles": 7,
  "port": 7900,
  "networkIdentifier": 144,
  "friendlyName": api-node-0,
  "host": 127.0.0.1,
  "nodePublicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
} satisfies NodeInfoDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NodeInfoDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


