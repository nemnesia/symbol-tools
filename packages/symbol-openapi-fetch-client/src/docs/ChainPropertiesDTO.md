
# ChainPropertiesDTO

Chain related configuration properties.

## Properties

Name | Type
------------ | -------------
`enableVerifiableState` | boolean
`enableVerifiableReceipts` | boolean
`currencyMosaicId` | string
`harvestingMosaicId` | string
`blockGenerationTargetTime` | string
`blockTimeSmoothingFactor` | string
`blockFinalizationInterval` | string
`importanceGrouping` | string
`importanceActivityPercentage` | string
`maxRollbackBlocks` | string
`maxDifficultyBlocks` | string
`defaultDynamicFeeMultiplier` | string
`maxTransactionLifetime` | string
`maxBlockFutureTime` | string
`initialCurrencyAtomicUnits` | string
`maxMosaicAtomicUnits` | string
`totalChainImportance` | string
`minHarvesterBalance` | string
`maxHarvesterBalance` | string
`minVoterBalance` | string
`maxVotingKeysPerAccount` | string
`minVotingKeyLifetime` | string
`maxVotingKeyLifetime` | string
`harvestBeneficiaryPercentage` | string
`harvestNetworkPercentage` | string
`harvestNetworkFeeSinkAddress` | string
`blockPruneInterval` | string
`maxTransactionsPerBlock` | string

## Example

```typescript
import type { ChainPropertiesDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "enableVerifiableState": true,
  "enableVerifiableReceipts": true,
  "currencyMosaicId": 0x24F4'26B8'D549'3D4B,
  "harvestingMosaicId": 0x1D9C'DC7E'218C'A88D,
  "blockGenerationTargetTime": 30s,
  "blockTimeSmoothingFactor": 3000,
  "blockFinalizationInterval": 30,
  "importanceGrouping": 39,
  "importanceActivityPercentage": 5,
  "maxRollbackBlocks": 40,
  "maxDifficultyBlocks": 60,
  "defaultDynamicFeeMultiplier": 10'000,
  "maxTransactionLifetime": 24h,
  "maxBlockFutureTime": 500ms,
  "initialCurrencyAtomicUnits": 8'998'999'998'000'000,
  "maxMosaicAtomicUnits": 9'000'000'000'000'000,
  "totalChainImportance": 15'000'000,
  "minHarvesterBalance": 500,
  "maxHarvesterBalance": 4'000'000,
  "minVoterBalance": 50'000,
  "maxVotingKeysPerAccount": 3,
  "minVotingKeyLifetime": 72,
  "maxVotingKeyLifetime": 26280,
  "harvestBeneficiaryPercentage": 10,
  "harvestNetworkPercentage": 5,
  "harvestNetworkFeeSinkAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "blockPruneInterval": 360,
  "maxTransactionsPerBlock": 200'000,
} satisfies ChainPropertiesDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ChainPropertiesDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


