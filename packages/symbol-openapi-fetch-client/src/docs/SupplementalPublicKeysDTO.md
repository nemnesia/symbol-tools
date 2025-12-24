
# SupplementalPublicKeysDTO


## Properties

Name | Type
------------ | -------------
`linked` | [AccountLinkPublicKeyDTO](AccountLinkPublicKeyDTO.md)
`node` | [AccountLinkPublicKeyDTO](AccountLinkPublicKeyDTO.md)
`vrf` | [AccountLinkPublicKeyDTO](AccountLinkPublicKeyDTO.md)
`voting` | [AccountLinkVotingKeysDTO](AccountLinkVotingKeysDTO.md)

## Example

```typescript
import type { SupplementalPublicKeysDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "linked": null,
  "node": null,
  "vrf": null,
  "voting": null,
} satisfies SupplementalPublicKeysDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SupplementalPublicKeysDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


