
# AccountNamesDTO


## Properties

Name | Type
------------ | -------------
`address` | string
`names` | Array&lt;string&gt;

## Example

```typescript
import type { AccountNamesDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "address": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "names": ["alias1","alias2"],
} satisfies AccountNamesDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountNamesDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


