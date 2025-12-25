
# Node

Node information gathered from the chain by Nodewatch.

## Properties

Name | Type
------------ | -------------
`mainPublicKey` | string
`nodePublicKey` | string
`endpoint` | string
`name` | string
`version` | string
`height` | number
`finalizedHeight` | number
`balance` | number
`finalizedEpoch` | number
`finalizedHash` | string
`finalizedPoint` | number
`isHealthy` | boolean
`isSslEnabled` | boolean
`restVersion` | string
`geoLocation` | [NodeGeoLocation](NodeGeoLocation.md)
`roles` | number

## Example

```typescript
import type { Node } from ''

// TODO: Update the object below with actual values
const example = {
  "mainPublicKey": E3FC28889BDE31406465167F1D9D6A16DCA1FF67A3BABFA5E5A8596478848FCC,
  "nodePublicKey": E3FC28889BDE31406465167F1D9D6A16DCA1FF67A3BABFA5E5A8596478848FCC,
  "endpoint": http://001-sai-dual.symboltest.net:3000,
  "name": 201-sai-dual,
  "version": 1.0.3.8,
  "height": 2645184,
  "finalizedHeight": 2643592,
  "balance": 1.761056,
  "finalizedEpoch": 3673,
  "finalizedHash": 6C4B9C101C803FE7DCFB77531F78D32BE68C17995A8005CD2F74F1BC6228CD86,
  "finalizedPoint": 29,
  "isHealthy": true,
  "isSslEnabled": true,
  "restVersion": 2.4.4,
  "geoLocation": null,
  "roles": 3,
} satisfies Node

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Node
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


