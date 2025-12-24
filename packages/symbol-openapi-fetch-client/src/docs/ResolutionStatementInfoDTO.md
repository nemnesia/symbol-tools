
# ResolutionStatementInfoDTO

A resolution statement keeps the relation between a namespace alias used in a transaction and the real address or mosaicId. 

## Properties

Name | Type
------------ | -------------
`id` | string
`meta` | [StatementMetaDTO](StatementMetaDTO.md)
`statement` | [ResolutionStatementDTO](ResolutionStatementDTO.md)

## Example

```typescript
import type { ResolutionStatementInfoDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "meta": null,
  "statement": null,
} satisfies ResolutionStatementInfoDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResolutionStatementInfoDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


