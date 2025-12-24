
# MosaicDefinitionTransactionBodyDTO


## Properties

Name | Type
------------ | -------------
`id` | string
`duration` | string
`nonce` | number
`flags` | number
`divisibility` | number

## Example

```typescript
import type { MosaicDefinitionTransactionBodyDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 0DC67FBE1CAD29E3,
  "duration": 200,
  "nonce": 2222212828,
  "flags": null,
  "divisibility": null,
} satisfies MosaicDefinitionTransactionBodyDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MosaicDefinitionTransactionBodyDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


