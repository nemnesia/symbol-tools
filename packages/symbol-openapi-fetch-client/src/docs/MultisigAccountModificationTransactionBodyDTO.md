
# MultisigAccountModificationTransactionBodyDTO


## Properties

Name | Type
------------ | -------------
`minRemovalDelta` | number
`minApprovalDelta` | number
`addressAdditions` | Array&lt;string&gt;
`addressDeletions` | Array&lt;string&gt;

## Example

```typescript
import type { MultisigAccountModificationTransactionBodyDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "minRemovalDelta": 1,
  "minApprovalDelta": 1,
  "addressAdditions": null,
  "addressDeletions": null,
} satisfies MultisigAccountModificationTransactionBodyDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MultisigAccountModificationTransactionBodyDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


