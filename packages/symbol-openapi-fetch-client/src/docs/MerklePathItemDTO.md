
# MerklePathItemDTO

Each merkle path item is composed of a hash, and a position relative to the proofHash being evaluated.

## Properties

Name | Type
------------ | -------------
`position` | [PositionEnum](PositionEnum.md)
`hash` | string

## Example

```typescript
import type { MerklePathItemDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "position": null,
  "hash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
} satisfies MerklePathItemDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MerklePathItemDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


