
# NamespaceDTO


## Properties

Name | Type
------------ | -------------
`version` | number
`registrationType` | [NamespaceRegistrationTypeEnum](NamespaceRegistrationTypeEnum.md)
`depth` | number
`level0` | string
`level1` | string
`level2` | string
`alias` | [AliasDTO](AliasDTO.md)
`parentId` | string
`ownerAddress` | string
`startHeight` | string
`endHeight` | string

## Example

```typescript
import type { NamespaceDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "version": 1,
  "registrationType": null,
  "depth": 1,
  "level0": 85BBEA6CC462B244,
  "level1": 85BBEA6CC462B244,
  "level2": 85BBEA6CC462B244,
  "alias": null,
  "parentId": 85BBEA6CC462B244,
  "ownerAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "startHeight": 1,
  "endHeight": 1,
} satisfies NamespaceDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NamespaceDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


