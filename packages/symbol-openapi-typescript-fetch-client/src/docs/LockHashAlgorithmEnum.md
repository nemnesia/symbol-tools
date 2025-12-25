
# LockHashAlgorithmEnum

Algorithm used to hash the proof: * 0 (Op_Sha3_256) - Proof is hashed using SHA3-256. * 1 (Op_Hash_160) - Proof is hashed twice: first with SHA-256 and then with RIPEMD-160 (bitcoin\'s OP_HASH160). * 2 (Op_Hash_256) - Proof is hashed twice with SHA3-256 (bitcoin\'s OP_HASH256). 

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { LockHashAlgorithmEnum } from ''

// TODO: Update the object below with actual values
const example = {
} satisfies LockHashAlgorithmEnum

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LockHashAlgorithmEnum
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


