
# TransactionDTO


## Properties

Name | Type
------------ | -------------
`timeStamp` | number
`amount` | number
`signature` | string
`fee` | number
`recipient` | string
`type` | number
`deadline` | number
`message` | [MessageDTO](MessageDTO.md)
`version` | number
`signer` | string

## Example

```typescript
import type { TransactionDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "timeStamp": null,
  "amount": null,
  "signature": null,
  "fee": null,
  "recipient": null,
  "type": null,
  "deadline": null,
  "message": null,
  "version": null,
  "signer": null,
} satisfies TransactionDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransactionDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


