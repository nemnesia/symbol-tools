
# ActivityBucketDTO

Supplementary data stored for importance recalculation. At each importance recalculation, existing buckets are shifted, the working bucket is finalized and a new working bucket is created. Each bucket influences at most five importance recalculations. 

## Properties

Name | Type
------------ | -------------
`startHeight` | string
`totalFeesPaid` | string
`beneficiaryCount` | number
`rawScore` | string

## Example

```typescript
import type { ActivityBucketDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "startHeight": 1,
  "totalFeesPaid": 123456,
  "beneficiaryCount": 2222212828,
  "rawScore": 0,
} satisfies ActivityBucketDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ActivityBucketDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


