
# NodeHealthDTO


## Properties

Name | Type
------------ | -------------
`apiNode` | [NodeStatusEnum](NodeStatusEnum.md)
`db` | [NodeStatusEnum](NodeStatusEnum.md)

## Example

```typescript
import type { NodeHealthDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "apiNode": null,
  "db": null,
} satisfies NodeHealthDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NodeHealthDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


