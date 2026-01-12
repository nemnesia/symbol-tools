
# BlockDTO


## Properties

Name | Type
------------ | -------------
`timeStamp` | number
`signature` | string
`prevBlockHash` | [HashDTO](HashDTO.md)
`type` | number
`transactions` | Array&lt;object&gt;
`version` | number
`signer` | string
`height` | number

## Example

```typescript
import type { BlockDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "timeStamp": 340587654,
  "signature": null,
  "prevBlockHash": null,
  "type": 1,
  "transactions": null,
  "version": -1744830463,
  "signer": null,
  "height": 438874,
} satisfies BlockDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BlockDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


