
# PluginsPropertiesDTO

Plugin related configuration properties.

## Properties

Name | Type
------------ | -------------
`accountlink` | [AccountKeyLinkNetworkPropertiesDTO](AccountKeyLinkNetworkPropertiesDTO.md)
`aggregate` | [AggregateNetworkPropertiesDTO](AggregateNetworkPropertiesDTO.md)
`lockhash` | [HashLockNetworkPropertiesDTO](HashLockNetworkPropertiesDTO.md)
`locksecret` | [SecretLockNetworkPropertiesDTO](SecretLockNetworkPropertiesDTO.md)
`metadata` | [MetadataNetworkPropertiesDTO](MetadataNetworkPropertiesDTO.md)
`mosaic` | [MosaicNetworkPropertiesDTO](MosaicNetworkPropertiesDTO.md)
`multisig` | [MultisigNetworkPropertiesDTO](MultisigNetworkPropertiesDTO.md)
`namespace` | [NamespaceNetworkPropertiesDTO](NamespaceNetworkPropertiesDTO.md)
`restrictionaccount` | [AccountRestrictionNetworkPropertiesDTO](AccountRestrictionNetworkPropertiesDTO.md)
`restrictionmosaic` | [MosaicRestrictionNetworkPropertiesDTO](MosaicRestrictionNetworkPropertiesDTO.md)
`transfer` | [TransferNetworkPropertiesDTO](TransferNetworkPropertiesDTO.md)

## Example

```typescript
import type { PluginsPropertiesDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "accountlink": null,
  "aggregate": null,
  "lockhash": null,
  "locksecret": null,
  "metadata": null,
  "mosaic": null,
  "multisig": null,
  "namespace": null,
  "restrictionaccount": null,
  "restrictionmosaic": null,
  "transfer": null,
} satisfies PluginsPropertiesDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PluginsPropertiesDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


