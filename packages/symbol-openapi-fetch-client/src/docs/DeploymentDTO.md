
# DeploymentDTO


## Properties

Name | Type
------------ | -------------
`deploymentTool` | string
`deploymentToolVersion` | string
`lastUpdatedDate` | string

## Example

```typescript
import type { DeploymentDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "deploymentTool": symbol-bootstrap,
  "deploymentToolVersion": 1.0.6,
  "lastUpdatedDate": 2021-06-02,
} satisfies DeploymentDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DeploymentDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


