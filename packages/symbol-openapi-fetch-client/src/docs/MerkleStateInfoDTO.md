
# MerkleStateInfoDTO

The merkle path information clients can use to proof the state of the given entity. 

## Properties

Name | Type
------------ | -------------
`raw` | string
`tree` | [Array&lt;MerkleStateInfoDTOTreeInner&gt;](MerkleStateInfoDTOTreeInner.md)

## Example

```typescript
import type { MerkleStateInfoDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "raw": 00008080DA9B4AF63BE985715EA635AF98E3CF3B0A22F9A2BE1C7DD40B79948AA63E36586E5D2E9D0\
C089C1C64BC0D42A11ADBD1CD6CDB4B7C294062F55113525A64AE3CFF3F04A7F2A487B42EA89323C4\
408F82415223ACFEC7DFA7924EFC31A70778AB17A00C3EAFF635F01BB3B474F0AF1BE99FBDA85EEFB\
209CC7BD158D3540DE3A3F2D1
,
  "tree": null,
} satisfies MerkleStateInfoDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MerkleStateInfoDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


