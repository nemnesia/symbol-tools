
# MosaicDTO


## Properties

Name | Type
------------ | -------------
`version` | number
`id` | string
`supply` | string
`startHeight` | string
`ownerAddress` | string
`revision` | number
`flags` | number
`divisibility` | number
`duration` | string

## Example

```typescript
import type { MosaicDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "version": 1,
  "id": 0DC67FBE1CAD29E3,
  "supply": 123456,
  "startHeight": 1,
  "ownerAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "revision": 2222212828,
  "flags": null,
  "divisibility": null,
  "duration": 200,
} satisfies MosaicDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MosaicDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


