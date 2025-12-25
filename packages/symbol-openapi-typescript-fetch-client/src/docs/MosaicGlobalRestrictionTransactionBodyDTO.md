
# MosaicGlobalRestrictionTransactionBodyDTO


## Properties

Name | Type
------------ | -------------
`mosaicId` | string
`referenceMosaicId` | string
`restrictionKey` | string
`previousRestrictionValue` | string
`newRestrictionValue` | string
`previousRestrictionType` | [MosaicRestrictionTypeEnum](MosaicRestrictionTypeEnum.md)
`newRestrictionType` | [MosaicRestrictionTypeEnum](MosaicRestrictionTypeEnum.md)

## Example

```typescript
import type { MosaicGlobalRestrictionTransactionBodyDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "mosaicId": 85BBEA6CC462B244,
  "referenceMosaicId": 85BBEA6CC462B244,
  "restrictionKey": 0DC67FBE1CAD29E3,
  "previousRestrictionValue": 1000,
  "newRestrictionValue": 1000,
  "previousRestrictionType": null,
  "newRestrictionType": null,
} satisfies MosaicGlobalRestrictionTransactionBodyDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MosaicGlobalRestrictionTransactionBodyDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


