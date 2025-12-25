
# NodeGeoLocation

Node geolocation data.

## Properties

Name | Type
------------ | -------------
`city` | string
`continent` | string
`country` | string
`isp` | string
`lat` | number
`lon` | number
`region` | string

## Example

```typescript
import type { NodeGeoLocation } from ''

// TODO: Update the object below with actual values
const example = {
  "city": Seattle,
  "continent": North America,
  "country": United States,
  "isp": Contabo Inc.,
  "lat": 47.3066,
  "lon": -122.2619,
  "region": WA,
} satisfies NodeGeoLocation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NodeGeoLocation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


