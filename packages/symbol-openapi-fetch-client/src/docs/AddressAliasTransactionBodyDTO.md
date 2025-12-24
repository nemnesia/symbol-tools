
# AddressAliasTransactionBodyDTO


## Properties

Name | Type
------------ | -------------
`namespaceId` | string
`address` | string
`aliasAction` | [AliasActionEnum](AliasActionEnum.md)

## Example

```typescript
import type { AddressAliasTransactionBodyDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "namespaceId": 85BBEA6CC462B244,
  "address": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "aliasAction": null,
} satisfies AddressAliasTransactionBodyDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AddressAliasTransactionBodyDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


