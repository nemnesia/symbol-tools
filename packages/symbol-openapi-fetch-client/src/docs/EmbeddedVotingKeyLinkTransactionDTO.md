
# EmbeddedVotingKeyLinkTransactionDTO


## Properties

Name | Type
------------ | -------------
`signerPublicKey` | string
`version` | number
`network` | [NetworkTypeEnum](NetworkTypeEnum.md)
`type` | number
`linkedPublicKey` | string
`startEpoch` | number
`endEpoch` | number
`linkAction` | [LinkActionEnum](LinkActionEnum.md)

## Example

```typescript
import type { EmbeddedVotingKeyLinkTransactionDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "signerPublicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
  "version": null,
  "network": null,
  "type": null,
  "linkedPublicKey": 4EDDA97C991A0BF44E0570B0BA0E0F7F1CE821A799726888734F28DDCCE8C591,
  "startEpoch": 123456,
  "endEpoch": 123456,
  "linkAction": null,
} satisfies EmbeddedVotingKeyLinkTransactionDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EmbeddedVotingKeyLinkTransactionDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


