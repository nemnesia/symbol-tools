
# IdentityDTO


## Properties

Name | Type
------------ | -------------
`name` | string
`publicKey` | string

## Example

```typescript
import type { IdentityDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "name": testnet/rerena/.,
  "publicKey": bb0e019d28df2d5241790c47a3ff99f39a1fc56017a1d291fb74fe6762d66aea,
} satisfies IdentityDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as IdentityDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


