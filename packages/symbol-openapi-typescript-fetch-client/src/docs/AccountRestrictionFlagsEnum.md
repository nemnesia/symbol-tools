
# AccountRestrictionFlagsEnum

Type of account restriction: * 0x0001 (1 decimal) - Allow only incoming transactions from a given address. * 0x0002 (2 decimal) - Allow only incoming transactions containing a given mosaic identifier. * 0x4001 (16385 decimal) - Allow only outgoing transactions to a given address. * 0x4004 (16388 decimal) - Allow only outgoing transactions with a given transaction type. * 0x8001 (32769 decimal) - Block incoming transactions from a given address. * 0x8002 (32770 decimal) - Block incoming transactions containing a given mosaic identifier. * 0xC001 (49153 decimal) - Block outgoing transactions to a given address. * 0xC004 (49156 decimal) - Block outgoing transactions with a given transaction type. 

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { AccountRestrictionFlagsEnum } from ''

// TODO: Update the object below with actual values
const example = {
} satisfies AccountRestrictionFlagsEnum

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountRestrictionFlagsEnum
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


