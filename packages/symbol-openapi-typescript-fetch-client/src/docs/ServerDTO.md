
# ServerDTO


## Properties

Name | Type
------------ | -------------
`restVersion` | string
`sdkVersion` | string
`deployment` | [DeploymentDTO](DeploymentDTO.md)

## Example

```typescript
import type { ServerDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "restVersion": 1.0.14,
  "sdkVersion": 0.7.14,
  "deployment": null,
} satisfies ServerDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ServerDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


