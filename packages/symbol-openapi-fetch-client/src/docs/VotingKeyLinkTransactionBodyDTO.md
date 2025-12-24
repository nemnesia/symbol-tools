
# VotingKeyLinkTransactionBodyDTO


## Properties

Name | Type
------------ | -------------
`linkedPublicKey` | string
`startEpoch` | number
`endEpoch` | number
`linkAction` | [LinkActionEnum](LinkActionEnum.md)

## Example

```typescript
import type { VotingKeyLinkTransactionBodyDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "linkedPublicKey": 4EDDA97C991A0BF44E0570B0BA0E0F7F1CE821A799726888734F28DDCCE8C591,
  "startEpoch": 123456,
  "endEpoch": 123456,
  "linkAction": null,
} satisfies VotingKeyLinkTransactionBodyDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VotingKeyLinkTransactionBodyDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


