
# HeightInfo

Node heights information, calculated as the median of the values returned by all known nodes. 

## Properties

Name | Type
------------ | -------------
`height` | number
`finalizedHeight` | number

## Example

```typescript
import type { HeightInfo } from ''

// TODO: Update the object below with actual values
const example = {
  "height": 2645184,
  "finalizedHeight": 2645154,
} satisfies HeightInfo

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HeightInfo
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


