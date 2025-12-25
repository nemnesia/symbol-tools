
# TransactionStatementDTO


## Properties

Name | Type
------------ | -------------
`height` | string
`source` | [SourceDTO](SourceDTO.md)
`receipts` | [Array&lt;TransactionStatementDTOReceiptsInner&gt;](TransactionStatementDTOReceiptsInner.md)

## Example

```typescript
import type { TransactionStatementDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "height": 1,
  "source": null,
  "receipts": null,
} satisfies TransactionStatementDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransactionStatementDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


