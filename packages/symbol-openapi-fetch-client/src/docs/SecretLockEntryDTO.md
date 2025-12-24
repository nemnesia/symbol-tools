
# SecretLockEntryDTO


## Properties

Name | Type
------------ | -------------
`version` | number
`ownerAddress` | string
`mosaicId` | string
`amount` | string
`endHeight` | string
`status` | [LockStatus](LockStatus.md)
`hashAlgorithm` | [LockHashAlgorithmEnum](LockHashAlgorithmEnum.md)
`secret` | string
`recipientAddress` | string
`compositeHash` | string

## Example

```typescript
import type { SecretLockEntryDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "version": 1,
  "ownerAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "mosaicId": 0DC67FBE1CAD29E3,
  "amount": 123456,
  "endHeight": 1,
  "status": null,
  "hashAlgorithm": null,
  "secret": FB8558E82C1968A3536CD77ACD7F9BC65E8B8F346714C9F91B42D6C2177BEDC1,
  "recipientAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "compositeHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
} satisfies SecretLockEntryDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SecretLockEntryDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


