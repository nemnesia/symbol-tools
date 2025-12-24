
# MosaicNetworkPropertiesDTO


## Properties

Name | Type
------------ | -------------
`maxMosaicsPerAccount` | string
`maxMosaicDuration` | string
`maxMosaicDivisibility` | string
`mosaicRentalFeeSinkAddress` | string
`mosaicRentalFee` | string

## Example

```typescript
import type { MosaicNetworkPropertiesDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "maxMosaicsPerAccount": 10'000,
  "maxMosaicDuration": 3650d,
  "maxMosaicDivisibility": 6,
  "mosaicRentalFeeSinkAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "mosaicRentalFee": 500,
} satisfies MosaicNetworkPropertiesDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MosaicNetworkPropertiesDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


