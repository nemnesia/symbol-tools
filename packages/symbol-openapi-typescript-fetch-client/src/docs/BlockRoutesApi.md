# BlockRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getBlockByHeight**](BlockRoutesApi.md#getblockbyheight) | **GET** /blocks/{height} | Get block information |
| [**getMerkleReceipts**](BlockRoutesApi.md#getmerklereceipts) | **GET** /blocks/{height}/statements/{hash}/merkle | Get the merkle path for a given a receipt statement hash and block |
| [**getMerkleTransaction**](BlockRoutesApi.md#getmerkletransaction) | **GET** /blocks/{height}/transactions/{hash}/merkle | Get the merkle path for a given a transaction and block |
| [**searchBlocks**](BlockRoutesApi.md#searchblocks) | **GET** /blocks | Search blocks |



## getBlockByHeight

> BlockInfoDTO getBlockByHeight(height)

Get block information

Gets a block from the chain that has the given height.

### Example

```ts
import {
  Configuration,
  BlockRoutesApi,
} from '';
import type { GetBlockByHeightRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockRoutesApi();

  const body = {
    // string | Block height.
    height: height_example,
  } satisfies GetBlockByHeightRequest;

  try {
    const data = await api.getBlockByHeight(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **height** | `string` | Block height. | [Defaults to `undefined`] |

### Return type

[**BlockInfoDTO**](BlockInfoDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | success |  -  |
| **404** | ResourceNotFound |  -  |
| **409** | InvalidArgument |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getMerkleReceipts

> MerkleProofInfoDTO getMerkleReceipts(height, hash)

Get the merkle path for a given a receipt statement hash and block

Returns the merkle path for a receipt statement or resolution linked to a block. The merkle path is the minimum number of nodes needed to calculate the merkle root.  Steps to calculate the merkle root: 1. proofHash &#x3D; hash (leaf). 2. Concatenate proofHash with the first unprocessed item from the merklePath list as follows: * a) If item.position &#x3D;&#x3D; left -&gt; proofHash &#x3D; sha_256(item.hash + proofHash). * b) If item.position &#x3D;&#x3D; right -&gt; proofHash &#x3D; sha_256(proofHash+ item.hash). 3. Repeat 2. for every item in the merklePath list. 4. Compare if the calculated proofHash equals the one recorded in the block header (block.receiptsHash) to verify if the statement was linked with the block. 

### Example

```ts
import {
  Configuration,
  BlockRoutesApi,
} from '';
import type { GetMerkleReceiptsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockRoutesApi();

  const body = {
    // string | Block height.
    height: height_example,
    // string | Receipt hash.
    hash: hash_example,
  } satisfies GetMerkleReceiptsRequest;

  try {
    const data = await api.getMerkleReceipts(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **height** | `string` | Block height. | [Defaults to `undefined`] |
| **hash** | `string` | Receipt hash. | [Defaults to `undefined`] |

### Return type

[**MerkleProofInfoDTO**](MerkleProofInfoDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | success |  -  |
| **404** | ResourceNotFound |  -  |
| **409** | InvalidArgument |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getMerkleTransaction

> MerkleProofInfoDTO getMerkleTransaction(height, hash)

Get the merkle path for a given a transaction and block

Returns the merkle path for a transaction included in a block. The merkle path is the minimum number of nodes needed to calculate the merkle root.  Steps to calculate the merkle root: 1. proofHash &#x3D; hash (leaf). 2. Concatenate proofHash with the first unprocessed item from the merklePath list as follows: * a) If item.position &#x3D;&#x3D; left -&gt; proofHash &#x3D; sha_256(item.hash + proofHash). * b) If item.position &#x3D;&#x3D; right -&gt; proofHash &#x3D; sha_256(proofHash+ item.hash). 3. Repeat 2. for every item in the merklePath list. 4. Compare if the calculated proofHash equals the one recorded in the block header (block.transactionsHash) to verify if the transaction was included in the block. 

### Example

```ts
import {
  Configuration,
  BlockRoutesApi,
} from '';
import type { GetMerkleTransactionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockRoutesApi();

  const body = {
    // string | Block height.
    height: height_example,
    // string | Transaction hash.
    hash: hash_example,
  } satisfies GetMerkleTransactionRequest;

  try {
    const data = await api.getMerkleTransaction(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **height** | `string` | Block height. | [Defaults to `undefined`] |
| **hash** | `string` | Transaction hash. | [Defaults to `undefined`] |

### Return type

[**MerkleProofInfoDTO**](MerkleProofInfoDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | success |  -  |
| **404** | ResourceNotFound |  -  |
| **409** | InvalidArgument |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## searchBlocks

> BlockPage searchBlocks(signerPublicKey, beneficiaryAddress, pageSize, pageNumber, offset, order, orderBy)

Search blocks

Gets an array of blocks.

### Example

```ts
import {
  Configuration,
  BlockRoutesApi,
} from '';
import type { SearchBlocksRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockRoutesApi();

  const body = {
    // string | Filter by public key of the account signing the entity. (optional)
    signerPublicKey: signerPublicKey_example,
    // string | Filter by beneficiary address. (optional)
    beneficiaryAddress: beneficiaryAddress_example,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
    // BlockOrderByEnum | Sort responses by the property set.  (optional)
    orderBy: ...,
  } satisfies SearchBlocksRequest;

  try {
    const data = await api.searchBlocks(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **signerPublicKey** | `string` | Filter by public key of the account signing the entity. | [Optional] [Defaults to `undefined`] |
| **beneficiaryAddress** | `string` | Filter by beneficiary address. | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |
| **orderBy** | `BlockOrderByEnum` | Sort responses by the property set.  | [Optional] [Defaults to `undefined`] [Enum: id, height] |

### Return type

[**BlockPage**](BlockPage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | success |  -  |
| **409** | InvalidArgument |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

