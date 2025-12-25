
# AccountKeyLinkTransactionDTO

Transaction to delegate the account importance score to a proxy account. Required for all accounts willing to activate delegated harvesting. 

## Properties

Name | Type
------------ | -------------
`size` | number
`signature` | string
`signerPublicKey` | string
`version` | number
`network` | [NetworkTypeEnum](NetworkTypeEnum.md)
`type` | number
`maxFee` | string
`deadline` | string
`linkedPublicKey` | string
`linkAction` | [LinkActionEnum](LinkActionEnum.md)

## Example

```typescript
import type { AccountKeyLinkTransactionDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "size": 2222212828,
  "signature": 4B408BBEDF25F2AC8E0E44A6E51E3CCBA03885902055F75EB9FF50433532CA44BF9175FDA7502EEE2\
FC1617126E453A2BD692BAFDAAF06BC8EDEBA7961B3730D
,
  "signerPublicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
  "version": null,
  "network": null,
  "type": null,
  "maxFee": 123456,
  "deadline": 200,
  "linkedPublicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
  "linkAction": null,
} satisfies AccountKeyLinkTransactionDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountKeyLinkTransactionDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


