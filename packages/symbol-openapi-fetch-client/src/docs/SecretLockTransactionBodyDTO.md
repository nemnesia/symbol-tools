
# SecretLockTransactionBodyDTO


## Properties

Name | Type
------------ | -------------
`recipientAddress` | string
`secret` | string
`mosaicId` | string
`amount` | string
`duration` | string
`hashAlgorithm` | [LockHashAlgorithmEnum](LockHashAlgorithmEnum.md)

## Example

```typescript
import type { SecretLockTransactionBodyDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "recipientAddress": TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA,
  "secret": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "mosaicId": 85BBEA6CC462B244,
  "amount": 123456,
  "duration": 200,
  "hashAlgorithm": null,
} satisfies SecretLockTransactionBodyDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SecretLockTransactionBodyDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


