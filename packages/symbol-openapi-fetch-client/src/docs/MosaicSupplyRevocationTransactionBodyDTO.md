
# MosaicSupplyRevocationTransactionBodyDTO


## Properties

Name | Type
------------ | -------------
`sourceAddress` | string
`mosaicId` | string
`amount` | string

## Example

```typescript
import type { MosaicSupplyRevocationTransactionBodyDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "sourceAddress": TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA,
  "mosaicId": 85BBEA6CC462B244,
  "amount": 123456,
} satisfies MosaicSupplyRevocationTransactionBodyDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MosaicSupplyRevocationTransactionBodyDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


