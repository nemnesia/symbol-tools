
# MosaicAliasTransactionBodyDTO


## Properties

Name | Type
------------ | -------------
`namespaceId` | string
`mosaicId` | string
`aliasAction` | [AliasActionEnum](AliasActionEnum.md)

## Example

```typescript
import type { MosaicAliasTransactionBodyDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "namespaceId": 85BBEA6CC462B244,
  "mosaicId": 0DC67FBE1CAD29E3,
  "aliasAction": null,
} satisfies MosaicAliasTransactionBodyDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MosaicAliasTransactionBodyDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


