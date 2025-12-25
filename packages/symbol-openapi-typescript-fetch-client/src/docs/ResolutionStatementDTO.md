
# ResolutionStatementDTO


## Properties

Name | Type
------------ | -------------
`height` | string
`unresolved` | [ResolutionStatementDTOUnresolved](ResolutionStatementDTOUnresolved.md)
`resolutionEntries` | [Array&lt;ResolutionEntryDTO&gt;](ResolutionEntryDTO.md)

## Example

```typescript
import type { ResolutionStatementDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "height": 1,
  "unresolved": null,
  "resolutionEntries": null,
} satisfies ResolutionStatementDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResolutionStatementDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


