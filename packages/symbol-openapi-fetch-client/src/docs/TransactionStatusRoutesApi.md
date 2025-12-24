# TransactionStatusRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getTransactionStatus**](TransactionStatusRoutesApi.md#gettransactionstatus) | **GET** /transactionStatus/{hash} | Get transaction status |
| [**getTransactionStatuses**](TransactionStatusRoutesApi.md#gettransactionstatuses) | **POST** /transactionStatus | Get transaction statuses |



## getTransactionStatus

> TransactionStatusDTO getTransactionStatus(hash)

Get transaction status

Returns the transaction status for a given hash.

### Example

```ts
import {
  Configuration,
  TransactionStatusRoutesApi,
} from '';
import type { GetTransactionStatusRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionStatusRoutesApi();

  const body = {
    // string | Transaction hash.
    hash: hash_example,
  } satisfies GetTransactionStatusRequest;

  try {
    const data = await api.getTransactionStatus(body);
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
| **hash** | `string` | Transaction hash. | [Defaults to `undefined`] |

### Return type

[**TransactionStatusDTO**](TransactionStatusDTO.md)

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


## getTransactionStatuses

> Array&lt;TransactionStatusDTO&gt; getTransactionStatuses(transactionHashes)

Get transaction statuses

Returns an array of transaction statuses for a given array of transaction hashes.

### Example

```ts
import {
  Configuration,
  TransactionStatusRoutesApi,
} from '';
import type { GetTransactionStatusesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionStatusRoutesApi();

  const body = {
    // TransactionHashes
    transactionHashes: ...,
  } satisfies GetTransactionStatusesRequest;

  try {
    const data = await api.getTransactionStatuses(body);
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
| **transactionHashes** | [TransactionHashes](TransactionHashes.md) |  | |

### Return type

[**Array&lt;TransactionStatusDTO&gt;**](TransactionStatusDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | success |  -  |
| **400** | InvalidContent |  -  |
| **409** | InvalidArgument |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

