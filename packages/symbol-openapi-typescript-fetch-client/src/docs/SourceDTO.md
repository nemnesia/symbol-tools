
# SourceDTO

Transaction that triggered the receipt.

## Properties

Name | Type
------------ | -------------
`primaryId` | number
`secondaryId` | number

## Example

```typescript
import type { SourceDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "primaryId": 2222212828,
  "secondaryId": 2222212828,
} satisfies SourceDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SourceDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


