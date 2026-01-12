
# EndpointDTO


## Properties

Name | Type
------------ | -------------
`protocol` | string
`port` | number
`host` | string

## Example

```typescript
import type { EndpointDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "protocol": http,
  "port": 7890,
  "host": t.nis1.rerena.nemnesia.com,
} satisfies EndpointDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EndpointDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


