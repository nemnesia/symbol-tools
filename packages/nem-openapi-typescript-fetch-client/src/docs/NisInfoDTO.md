
# NisInfoDTO


## Properties

Name | Type
------------ | -------------
`currentTime` | number
`application` | string
`startTime` | number
`version` | string
`signer` | string

## Example

```typescript
import type { NisInfoDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "currentTime": null,
  "application": null,
  "startTime": null,
  "version": null,
  "signer": null,
} satisfies NisInfoDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NisInfoDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


