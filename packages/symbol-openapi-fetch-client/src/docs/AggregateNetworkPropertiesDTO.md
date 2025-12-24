
# AggregateNetworkPropertiesDTO


## Properties

Name | Type
------------ | -------------
`maxTransactionsPerAggregate` | string
`maxCosignaturesPerAggregate` | string
`enableStrictCosignatureCheck` | boolean
`enableBondedAggregateSupport` | boolean
`maxBondedTransactionLifetime` | string

## Example

```typescript
import type { AggregateNetworkPropertiesDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "maxTransactionsPerAggregate": 1'000,
  "maxCosignaturesPerAggregate": 15,
  "enableStrictCosignatureCheck": false,
  "enableBondedAggregateSupport": true,
  "maxBondedTransactionLifetime": 48h,
} satisfies AggregateNetworkPropertiesDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AggregateNetworkPropertiesDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


