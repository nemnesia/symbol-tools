
# StorageInfoDTO


## Properties

Name | Type
------------ | -------------
`numBlocks` | number
`numTransactions` | number
`numAccounts` | number

## Example

```typescript
import type { StorageInfoDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "numBlocks": 245053,
  "numTransactions": 58590,
  "numAccounts": 177,
} satisfies StorageInfoDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StorageInfoDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


