
# SecretProofTransactionBodyDTO


## Properties

Name | Type
------------ | -------------
`recipientAddress` | string
`secret` | string
`hashAlgorithm` | [LockHashAlgorithmEnum](LockHashAlgorithmEnum.md)
`proof` | string

## Example

```typescript
import type { SecretProofTransactionBodyDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "recipientAddress": TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA,
  "secret": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "hashAlgorithm": null,
  "proof": null,
} satisfies SecretProofTransactionBodyDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SecretProofTransactionBodyDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


