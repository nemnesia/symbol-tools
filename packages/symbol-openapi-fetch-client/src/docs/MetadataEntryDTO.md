
# MetadataEntryDTO


## Properties

Name | Type
------------ | -------------
`version` | number
`compositeHash` | string
`sourceAddress` | string
`targetAddress` | string
`scopedMetadataKey` | string
`targetId` | [MetadataEntryDTOTargetId](MetadataEntryDTOTargetId.md)
`metadataType` | [MetadataTypeEnum](MetadataTypeEnum.md)
`value` | string

## Example

```typescript
import type { MetadataEntryDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "version": 1,
  "compositeHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "sourceAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "targetAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "scopedMetadataKey": 0DC67FBE1CAD29E3,
  "targetId": null,
  "metadataType": null,
  "value": null,
} satisfies MetadataEntryDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MetadataEntryDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


