
# TransactionStatementDTOReceiptsInner


## Properties

Name | Type
------------ | -------------
`version` | number
`type` | [ReceiptTypeEnum](ReceiptTypeEnum.md)
`mosaicId` | string
`amount` | string
`senderAddress` | string
`recipientAddress` | string
`targetAddress` | string
`artifactId` | string

## Example

```typescript
import type { TransactionStatementDTOReceiptsInner } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "type": null,
  "mosaicId": 0DC67FBE1CAD29E3,
  "amount": 123456,
  "senderAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "recipientAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "targetAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "artifactId": 0DC67FBE1CAD29E3,
} satisfies TransactionStatementDTOReceiptsInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransactionStatementDTOReceiptsInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


