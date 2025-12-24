
# MultisigDTO


## Properties

Name | Type
------------ | -------------
`version` | number
`accountAddress` | string
`minApproval` | number
`minRemoval` | number
`cosignatoryAddresses` | Array&lt;string&gt;
`multisigAddresses` | Array&lt;string&gt;

## Example

```typescript
import type { MultisigDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "version": 1,
  "accountAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "minApproval": 2222212828,
  "minRemoval": 2222212828,
  "cosignatoryAddresses": null,
  "multisigAddresses": null,
} satisfies MultisigDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MultisigDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


