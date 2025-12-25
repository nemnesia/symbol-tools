# HashLockRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getHashLock**](HashLockRoutesApi.md#gethashlock) | **GET** /lock/hash/{hash} | Get hash lock information |
| [**getHashLockMerkle**](HashLockRoutesApi.md#gethashlockmerkle) | **GET** /lock/hash/{hash}/merkle | Get hash lock merkle information |
| [**searchHashLock**](HashLockRoutesApi.md#searchhashlock) | **GET** /lock/hash | Search hash lock entries |



## getHashLock

> HashLockInfoDTO getHashLock(hash)

Get hash lock information

Gets the hash lock for a given hash.

### Example

```ts
import {
  Configuration,
  HashLockRoutesApi,
} from '';
import type { GetHashLockRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new HashLockRoutesApi();

  const body = {
    // string | Filter by hash.
    hash: hash_example,
  } satisfies GetHashLockRequest;

  try {
    const data = await api.getHashLock(body);
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
| **hash** | `string` | Filter by hash. | [Defaults to `undefined`] |

### Return type

[**HashLockInfoDTO**](HashLockInfoDTO.md)

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


## getHashLockMerkle

> MerkleStateInfoDTO getHashLockMerkle(hash)

Get hash lock merkle information

Gets the hash lock merkle for a given hash.

### Example

```ts
import {
  Configuration,
  HashLockRoutesApi,
} from '';
import type { GetHashLockMerkleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new HashLockRoutesApi();

  const body = {
    // string | Filter by hash.
    hash: hash_example,
  } satisfies GetHashLockMerkleRequest;

  try {
    const data = await api.getHashLockMerkle(body);
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
| **hash** | `string` | Filter by hash. | [Defaults to `undefined`] |

### Return type

[**MerkleStateInfoDTO**](MerkleStateInfoDTO.md)

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


## searchHashLock

> HashLockPage searchHashLock(address, pageSize, pageNumber, offset, order)

Search hash lock entries

Returns an array of hash locks.

### Example

```ts
import {
  Configuration,
  HashLockRoutesApi,
} from '';
import type { SearchHashLockRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new HashLockRoutesApi();

  const body = {
    // string | Filter by address involved in the transaction. An account\'s address is considered to be involved in the transaction when the account is the sender, recipient, or it is required to cosign the transaction. This filter cannot be combined with ``recipientAddress`` and ``signerPublicKey`` query params.  (optional)
    address: address_example,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchHashLockRequest;

  try {
    const data = await api.searchHashLock(body);
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
| **address** | `string` | Filter by address involved in the transaction. An account\&#39;s address is considered to be involved in the transaction when the account is the sender, recipient, or it is required to cosign the transaction. This filter cannot be combined with &#x60;&#x60;recipientAddress&#x60;&#x60; and &#x60;&#x60;signerPublicKey&#x60;&#x60; query params.  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**HashLockPage**](HashLockPage.md)

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

