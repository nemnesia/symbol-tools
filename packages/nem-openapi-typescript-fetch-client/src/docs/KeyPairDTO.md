
# KeyPairDTO


## Properties

Name | Type
------------ | -------------
`privateKey` | string
`address` | string
`publicKey` | string

## Example

```typescript
import type { KeyPairDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "privateKey": 0962c6505d02123c40e858ff8ef21e2b7b5466be12c4770e3bf557aae828390f,
  "address": NCKMNCU3STBWBR7E3XD2LR7WSIXF5IVJIDBHBZQT,
  "publicKey": c2e19751291d01140e62ece9ee3923120766c6302e1099b04014fe1009bc89d3,
} satisfies KeyPairDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as KeyPairDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


