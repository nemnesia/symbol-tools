
# ImportanceBlockDTO


## Properties

Name | Type
------------ | -------------
`size` | number
`signature` | string
`signerPublicKey` | string
`version` | number
`network` | [NetworkTypeEnum](NetworkTypeEnum.md)
`type` | number
`height` | string
`timestamp` | string
`difficulty` | string
`proofGamma` | string
`proofVerificationHash` | string
`proofScalar` | string
`previousBlockHash` | string
`transactionsHash` | string
`receiptsHash` | string
`stateHash` | string
`beneficiaryAddress` | string
`feeMultiplier` | number
`votingEligibleAccountsCount` | number
`harvestingEligibleAccountsCount` | string
`totalVotingBalance` | string
`previousImportanceBlockHash` | string

## Example

```typescript
import type { ImportanceBlockDTO } from ''

// TODO: Update the object below with actual values
const example = {
  "size": 2222212828,
  "signature": 4B408BBEDF25F2AC8E0E44A6E51E3CCBA03885902055F75EB9FF50433532CA44BF9175FDA7502EEE2\
FC1617126E453A2BD692BAFDAAF06BC8EDEBA7961B3730D
,
  "signerPublicKey": AC1A6E1D8DE5B17D2C6B1293F1CAD3829EEACF38D09311BB3C8E5A880092DE26,
  "version": null,
  "network": null,
  "type": null,
  "height": 1,
  "timestamp": 108303181802,
  "difficulty": 100000000000000,
  "proofGamma": 8D49594A96C31EC6C64305FB2CCB47AA7A4AC0A4F614442BB3684D2BF41F274E,
  "proofVerificationHash": 82FB583BFE3EE78805784D078F2547AE,
  "proofScalar": 480175C83739B22C53EAECAA7E7F3B245F1DFAFA6B3AE5C1D0129502FCBAAD0C,
  "previousBlockHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "transactionsHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "receiptsHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "stateHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
  "beneficiaryAddress": TADP6C2GVEG654OP5LZI32P2GYJSCMEGQBYB7QY,
  "feeMultiplier": 0,
  "votingEligibleAccountsCount": 2222212828,
  "harvestingEligibleAccountsCount": 123456,
  "totalVotingBalance": 123456,
  "previousImportanceBlockHash": C8FC3FB54FDDFBCE0E8C71224990124E4EEC5AD5D30E592EDFA9524669A23810,
} satisfies ImportanceBlockDTO

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ImportanceBlockDTO
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


