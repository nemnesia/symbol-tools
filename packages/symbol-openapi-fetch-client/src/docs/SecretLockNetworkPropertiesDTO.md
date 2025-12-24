
# SecretLockNetworkPropertiesDTO


## Properties

Name | Type
------------ | -------------
`maxSecretLockDuration` | string
`minProofSize` | string
`maxProofSize` | string

## Example

```typescript
import type { SecretLockNetworkPropertiesDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "maxSecretLockDuration": 30d,
  "minProofSize": 1,
  "maxProofSize": 1000,
} satisfies SecretLockNetworkPropertiesDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SecretLockNetworkPropertiesDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


