
# AccountMetaDataDTO


## Properties

Name | Type
------------ | -------------
`cosignatories` | Array&lt;string&gt;
`cosignatoryOf` | Array&lt;string&gt;
`status` | string
`remoteStatus` | string

## Example

```typescript
import type { AccountMetaDataDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "cosignatories": null,
  "cosignatoryOf": null,
  "status": LOCKED,
  "remoteStatus": ACTIVE,
} satisfies AccountMetaDataDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountMetaDataDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


