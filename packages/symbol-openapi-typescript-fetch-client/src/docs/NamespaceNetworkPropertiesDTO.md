
# NamespaceNetworkPropertiesDTO


## Properties

Name | Type
------------ | -------------
`maxNameSize` | string
`maxChildNamespaces` | string
`maxNamespaceDepth` | string
`minNamespaceDuration` | string
`maxNamespaceDuration` | string
`namespaceGracePeriodDuration` | string
`reservedRootNamespaceNames` | string
`namespaceRentalFeeSinkAddress` | string
`rootNamespaceRentalFeePerBlock` | string
`childNamespaceRentalFee` | string

## Example

```typescript
import type { NamespaceNetworkPropertiesDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "maxNameSize": 64,
  "maxChildNamespaces": 500,
  "maxNamespaceDepth": 3,
  "minNamespaceDuration": 1m,
  "maxNamespaceDuration": 365d,
  "namespaceGracePeriodDuration": 2m,
  "reservedRootNamespaceNames": xem, nem, user, account, org, com, biz, net, edu, mil, gov, info,
  "namespaceRentalFeeSinkAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "rootNamespaceRentalFeePerBlock": 1,
  "childNamespaceRentalFee": 100,
} satisfies NamespaceNetworkPropertiesDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NamespaceNetworkPropertiesDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


