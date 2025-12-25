
# BalanceTransferReceiptDTO

Receipt stored when a state change that triggered a mosaic transfer.

## Properties

Name | Type
------------ | -------------
`version` | number
`type` | [ReceiptTypeEnum](ReceiptTypeEnum.md)
`mosaicId` | string
`amount` | string
`senderAddress` | string
`recipientAddress` | string

## Example

```typescript
import type { BalanceTransferReceiptDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "type": null,
  "mosaicId": 0DC67FBE1CAD29E3,
  "amount": 123456,
  "senderAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "recipientAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
} satisfies BalanceTransferReceiptDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BalanceTransferReceiptDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


