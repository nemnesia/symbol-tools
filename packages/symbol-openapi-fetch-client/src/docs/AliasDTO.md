
# AliasDTO


## Properties

Name | Type
------------ | -------------
`type` | [AliasTypeEnum](AliasTypeEnum.md)
`mosaicId` | string
`address` | string

## Example

```typescript
import type { AliasDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "mosaicId": 0DC67FBE1CAD29E3,
  "address": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
} satisfies AliasDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AliasDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


