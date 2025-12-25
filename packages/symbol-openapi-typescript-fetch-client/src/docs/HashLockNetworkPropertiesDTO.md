
# HashLockNetworkPropertiesDTO


## Properties

Name | Type
------------ | -------------
`lockedFundsPerAggregate` | string
`maxHashLockDuration` | string

## Example

```typescript
import type { HashLockNetworkPropertiesDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "lockedFundsPerAggregate": 10'000'000,
  "maxHashLockDuration": 2d,
} satisfies HashLockNetworkPropertiesDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HashLockNetworkPropertiesDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


