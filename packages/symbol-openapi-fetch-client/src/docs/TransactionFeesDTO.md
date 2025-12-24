
# TransactionFeesDTO


## Properties

Name | Type
------------ | -------------
`averageFeeMultiplier` | number
`medianFeeMultiplier` | number
`highestFeeMultiplier` | number
`lowestFeeMultiplier` | number
`minFeeMultiplier` | number

## Example

```typescript
import type { TransactionFeesDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "averageFeeMultiplier": 0,
  "medianFeeMultiplier": 0,
  "highestFeeMultiplier": 0,
  "lowestFeeMultiplier": 0,
  "minFeeMultiplier": 0,
} satisfies TransactionFeesDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransactionFeesDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


