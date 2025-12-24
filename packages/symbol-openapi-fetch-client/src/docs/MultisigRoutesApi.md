# MultisigRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAccountMultisig**](MultisigRoutesApi.md#getaccountmultisig) | **GET** /account/{address}/multisig | Get multisig account information |
| [**getAccountMultisigGraph**](MultisigRoutesApi.md#getaccountmultisiggraph) | **GET** /account/{address}/multisig/graph | Get multisig account graph information |
| [**getAccountMultisigMerkle**](MultisigRoutesApi.md#getaccountmultisigmerkle) | **GET** /account/{address}/multisig/merkle | Get multisig account merkle information |



## getAccountMultisig

> MultisigAccountInfoDTO getAccountMultisig(address)

Get multisig account information

Returns the multisig account information.

### Example

```ts
import {
  Configuration,
  MultisigRoutesApi,
} from '';
import type { GetAccountMultisigRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MultisigRoutesApi();

  const body = {
    // string | Account address.
    address: address_example,
  } satisfies GetAccountMultisigRequest;

  try {
    const data = await api.getAccountMultisig(body);
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
| **address** | `string` | Account address. | [Defaults to `undefined`] |

### Return type

[**MultisigAccountInfoDTO**](MultisigAccountInfoDTO.md)

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


## getAccountMultisigGraph

> Array&lt;MultisigAccountGraphInfoDTO&gt; getAccountMultisigGraph(address)

Get multisig account graph information

Returns the multisig account graph.

### Example

```ts
import {
  Configuration,
  MultisigRoutesApi,
} from '';
import type { GetAccountMultisigGraphRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MultisigRoutesApi();

  const body = {
    // string | Account address.
    address: address_example,
  } satisfies GetAccountMultisigGraphRequest;

  try {
    const data = await api.getAccountMultisigGraph(body);
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
| **address** | `string` | Account address. | [Defaults to `undefined`] |

### Return type

[**Array&lt;MultisigAccountGraphInfoDTO&gt;**](MultisigAccountGraphInfoDTO.md)

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


## getAccountMultisigMerkle

> MerkleStateInfoDTO getAccountMultisigMerkle(address)

Get multisig account merkle information

Returns the multisig account merkle information.

### Example

```ts
import {
  Configuration,
  MultisigRoutesApi,
} from '';
import type { GetAccountMultisigMerkleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MultisigRoutesApi();

  const body = {
    // string | Account address.
    address: address_example,
  } satisfies GetAccountMultisigMerkleRequest;

  try {
    const data = await api.getAccountMultisigMerkle(body);
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
| **address** | `string` | Account address. | [Defaults to `undefined`] |

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
| **404** | ResourceNotFound |  -  |
| **409** | InvalidArgument |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

