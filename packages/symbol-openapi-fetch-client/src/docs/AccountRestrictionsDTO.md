
# AccountRestrictionsDTO


## Properties

Name | Type
------------ | -------------
`version` | number
`address` | string
`restrictions` | [Array&lt;AccountRestrictionDTO&gt;](AccountRestrictionDTO.md)

## Example

```typescript
import type { AccountRestrictionsDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "version": 1,
  "address": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "restrictions": null,
} satisfies AccountRestrictionsDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountRestrictionsDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


