
# NodeMetaDataDTO


## Properties

Name | Type
------------ | -------------
`features` | number
`application` | string
`networkId` | number
`version` | string
`platform` | string

## Example

```typescript
import type { NodeMetaDataDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "features": 1,
  "application": null,
  "networkId": -104,
  "version": 0.6.102,
  "platform": Ubuntu (11.0.28) on Linux,
} satisfies NodeMetaDataDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NodeMetaDataDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


