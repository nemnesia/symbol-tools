# SecretLockRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getSecretLock**](SecretLockRoutesApi.md#getsecretlock) | **GET** /lock/secret/{compositeHash} | Get secret lock information |
| [**getSecretLockMerkle**](SecretLockRoutesApi.md#getsecretlockmerkle) | **GET** /lock/secret/{compositeHash}/merkle | Get secret lock merkle information |
| [**searchSecretLock**](SecretLockRoutesApi.md#searchsecretlock) | **GET** /lock/secret | Search secret lock entries |



## getSecretLock

> SecretLockInfoDTO getSecretLock(compositeHash)

Get secret lock information

Gets the hash lock for a given composite hash.

### Example

```ts
import {
  Configuration,
  SecretLockRoutesApi,
} from '';
import type { GetSecretLockRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SecretLockRoutesApi();

  const body = {
    // string | Filter by composite hash.
    compositeHash: compositeHash_example,
  } satisfies GetSecretLockRequest;

  try {
    const data = await api.getSecretLock(body);
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
| **compositeHash** | `string` | Filter by composite hash. | [Defaults to `undefined`] |

### Return type

[**SecretLockInfoDTO**](SecretLockInfoDTO.md)

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


## getSecretLockMerkle

> MerkleStateInfoDTO getSecretLockMerkle(compositeHash)

Get secret lock merkle information

Gets the hash lock merkle for a given composite hash.

### Example

```ts
import {
  Configuration,
  SecretLockRoutesApi,
} from '';
import type { GetSecretLockMerkleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SecretLockRoutesApi();

  const body = {
    // string | Filter by composite hash.
    compositeHash: compositeHash_example,
  } satisfies GetSecretLockMerkleRequest;

  try {
    const data = await api.getSecretLockMerkle(body);
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
| **compositeHash** | `string` | Filter by composite hash. | [Defaults to `undefined`] |

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


## searchSecretLock

> SecretLockPage searchSecretLock(address, secret, pageSize, pageNumber, offset, order)

Search secret lock entries

Returns an array of secret locks.

### Example

```ts
import {
  Configuration,
  SecretLockRoutesApi,
} from '';
import type { SearchSecretLockRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SecretLockRoutesApi();

  const body = {
    // string | Filter by address involved in the transaction. An account\'s address is considered to be involved in the transaction when the account is the sender, recipient, or it is required to cosign the transaction. This filter cannot be combined with ``recipientAddress`` and ``signerPublicKey`` query params.  (optional)
    address: address_example,
    // string | Filter by secret. (optional)
    secret: secret_example,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchSecretLockRequest;

  try {
    const data = await api.searchSecretLock(body);
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
| **secret** | `string` | Filter by secret. | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**SecretLockPage**](SecretLockPage.md)

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

