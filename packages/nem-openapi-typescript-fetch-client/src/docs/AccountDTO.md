
# AccountDTO


## Properties

Name | Type
------------ | -------------
`address` | string
`harvestedBlocks` | number
`balance` | number
`importance` | number
`vestedBalance` | number
`publicKey` | string
`label` | string
`multisigInfo` | object

## Example

```typescript
import type { AccountDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "address": TB7PINA6CP6RZT6N3ETEZRJZRPMSAJ3FHAPB4NI7,
  "harvestedBlocks": 0,
  "balance": 9993550000,
  "importance": 0.0,
  "vestedBalance": 9993550000,
  "publicKey": 46ad1ec1647d7455493f51b1a11d9e61838fef43dbd50bfe7c68bb1bea7c1436,
  "label": null,
  "multisigInfo": null,
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


