
# MosaicGlobalRestrictionEntryRestrictionDTO


## Properties

Name | Type
------------ | -------------
`referenceMosaicId` | string
`restrictionValue` | string
`restrictionType` | [MosaicRestrictionTypeEnum](MosaicRestrictionTypeEnum.md)

## Example

```typescript
import type { MosaicGlobalRestrictionEntryRestrictionDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "referenceMosaicId": 0DC67FBE1CAD29E3,
  "restrictionValue": 1000,
  "restrictionType": null,
} satisfies MosaicGlobalRestrictionEntryRestrictionDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MosaicGlobalRestrictionEntryRestrictionDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


