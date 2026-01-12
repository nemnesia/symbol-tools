
# TransactionMetaDTO


## Properties

Name | Type
------------ | -------------
`innerHash` | object
`id` | number
`hash` | [HashDTO](HashDTO.md)
`height` | number

## Example

```typescript
import type { TransactionMetaDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "innerHash": null,
  "id": null,
  "hash": null,
  "height": null,
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


