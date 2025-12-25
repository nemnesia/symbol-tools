
# NamespaceInfoDTO


## Properties

Name | Type
------------ | -------------
`id` | string
`meta` | [NamespaceMetaDTO](NamespaceMetaDTO.md)
`namespace` | [NamespaceDTO](NamespaceDTO.md)

## Example

```typescript
import type { NamespaceInfoDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "meta": null,
  "namespace": null,
} satisfies NamespaceInfoDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NamespaceInfoDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


