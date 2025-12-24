
# MosaicGlobalRestrictionEntryWrapperDTO


## Properties

Name | Type
------------ | -------------
`version` | number
`compositeHash` | string
`entryType` | [MosaicRestrictionEntryTypeEnum](MosaicRestrictionEntryTypeEnum.md)
`mosaicId` | string
`restrictions` | [Array&lt;MosaicGlobalRestrictionEntryDTO&gt;](MosaicGlobalRestrictionEntryDTO.md)

## Example

```typescript
import type { MosaicGlobalRestrictionEntryWrapperDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "version": 1,
  "compositeHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "entryType": null,
  "mosaicId": 0DC67FBE1CAD29E3,
  "restrictions": null,
} satisfies MosaicGlobalRestrictionEntryWrapperDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MosaicGlobalRestrictionEntryWrapperDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


