
# AccountMosaicRestrictionTransactionBodyDTO


## Properties

Name | Type
------------ | -------------
`restrictionFlags` | [AccountRestrictionFlagsEnum](AccountRestrictionFlagsEnum.md)
`restrictionAdditions` | Array&lt;string&gt;
`restrictionDeletions` | Array&lt;string&gt;

## Example

```typescript
import type { AccountMosaicRestrictionTransactionBodyDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "restrictionFlags": null,
  "restrictionAdditions": null,
  "restrictionDeletions": null,
} satisfies AccountMosaicRestrictionTransactionBodyDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountMosaicRestrictionTransactionBodyDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


