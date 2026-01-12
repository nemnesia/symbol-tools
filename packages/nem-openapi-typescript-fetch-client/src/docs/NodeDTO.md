
# NodeDTO


## Properties

Name | Type
------------ | -------------
`metaData` | [NodeMetaDataDTO](NodeMetaDataDTO.md)
`endpoint` | [EndpointDTO](EndpointDTO.md)
`identity` | [IdentityDTO](IdentityDTO.md)

## Example

```typescript
import type { NodeDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "metaData": null,
  "endpoint": null,
  "identity": null,
} satisfies NodeDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NodeDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


