
# TransactionInfoDTO


## Properties

Name | Type
------------ | -------------
`id` | string
`meta` | [TransactionInfoDTOMeta](TransactionInfoDTOMeta.md)
`transaction` | [TransactionInfoDTOTransaction](TransactionInfoDTOTransaction.md)

## Example

```typescript
import type { TransactionInfoDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "meta": null,
  "transaction": null,
} satisfies TransactionInfoDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransactionInfoDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


