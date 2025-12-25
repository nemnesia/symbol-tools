
# NamespaceRegistrationTransactionBodyDTO


## Properties

Name | Type
------------ | -------------
`duration` | string
`parentId` | string
`id` | string
`registrationType` | [NamespaceRegistrationTypeEnum](NamespaceRegistrationTypeEnum.md)
`name` | string

## Example

```typescript
import type { NamespaceRegistrationTransactionBodyDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "duration": 200,
  "parentId": 85BBEA6CC462B244,
  "id": 85BBEA6CC462B244,
  "registrationType": null,
  "name": null,
} satisfies NamespaceRegistrationTransactionBodyDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NamespaceRegistrationTransactionBodyDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


