
# AccountRestrictionDTO


## Properties

Name | Type
------------ | -------------
`restrictionFlags` | [AccountRestrictionFlagsEnum](AccountRestrictionFlagsEnum.md)
`values` | [Array&lt;AccountRestrictionDTOValuesInner&gt;](AccountRestrictionDTOValuesInner.md)

## Example

```typescript
import type { AccountRestrictionDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "restrictionFlags": null,
  "values": null,
} satisfies AccountRestrictionDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountRestrictionDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


