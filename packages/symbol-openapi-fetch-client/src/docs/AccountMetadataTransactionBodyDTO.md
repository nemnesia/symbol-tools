
# AccountMetadataTransactionBodyDTO


## Properties

Name | Type
------------ | -------------
`targetAddress` | string
`scopedMetadataKey` | string
`valueSizeDelta` | number
`valueSize` | number
`value` | string

## Example

```typescript
import type { AccountMetadataTransactionBodyDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "targetAddress": TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA,
  "scopedMetadataKey": 0DC67FBE1CAD29E3,
  "valueSizeDelta": null,
  "valueSize": 2222212828,
  "value": null,
} satisfies AccountMetadataTransactionBodyDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountMetadataTransactionBodyDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


