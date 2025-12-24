
# MosaicRestrictionTypeEnum

Type of mosaic restriction. * 0 - Uninitialized value indicating no restriction. * 1 (EQ) - Allow if equal. * 2 (NE) - Allow if not equal. * 3 (LT) - Allow if less than. * 4 (LE) - Allow if less than or equal. * 5 (GT) - Allow if greater than. * 6 (GE) - Allow if greater than or equal. 

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { MosaicRestrictionTypeEnum } from ''

// TODO: Update the object below with actual values
const example = {
} satisfies MosaicRestrictionTypeEnum

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MosaicRestrictionTypeEnum
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


