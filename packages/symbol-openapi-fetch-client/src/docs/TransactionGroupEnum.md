
# TransactionGroupEnum

A transaction could be classified in the following groups: * Unconfirmed: The transaction reached the P2P network.     At this point, it is not guaranteed that the transaction will be included in a block. * Confirmed: The transaction is included in a block. * Partial: The transaction requires to be cosigned by other transaction participants in order to be included in a block. * Failed: The transaction did not pass the network validation, and it was rejected. 

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { TransactionGroupEnum } from ''

// TODO: Update the object below with actual values
const example = {
} satisfies TransactionGroupEnum

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransactionGroupEnum
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


