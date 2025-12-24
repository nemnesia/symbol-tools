
# MerkleTreeBranchDTO

Merkle tree branch node.

## Properties

Name | Type
------------ | -------------
`type` | [MerkleTreeNodeTypeEnum](MerkleTreeNodeTypeEnum.md)
`path` | string
`encodedPath` | string
`nibbleCount` | number
`linkMask` | string
`links` | [Array&lt;MerkleTreeBranchLinkDTO&gt;](MerkleTreeBranchLinkDTO.md)
`branchHash` | string

## Example

```typescript
import type { MerkleTreeBranchDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "path": null,
  "encodedPath": null,
  "nibbleCount": null,
  "linkMask": null,
  "links": null,
  "branchHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
} satisfies MerkleTreeBranchDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MerkleTreeBranchDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


