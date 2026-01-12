# TransactionApi

All URIs are relative to *https://t.nis1.rerena.nemnesia.com:7891*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**transactionAnnouncePost**](TransactionApi.md#transactionannouncepost) | **POST** /transaction/announce | Sending the data to NIS |
| [**transactionPrepareAnnouncePost**](TransactionApi.md#transactionprepareannouncepost) | **POST** /transaction/prepare-announce | Initiating a transaction |



## transactionAnnouncePost

> transactionAnnouncePost(requestAnnounce)

Sending the data to NIS

### Example

```ts
import {
  Configuration,
  TransactionApi,
} from '';
import type { TransactionAnnouncePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionApi();

  const body = {
    // string (optional)
    requestAnnounce: requestAnnounce_example,
  } satisfies TransactionAnnouncePostRequest;

  try {
    const data = await api.transactionAnnouncePost(body);
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
| **requestAnnounce** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## transactionPrepareAnnouncePost

> transactionPrepareAnnouncePost(requestPrepareAnnounce)

Initiating a transaction

### Example

```ts
import {
  Configuration,
  TransactionApi,
} from '';
import type { TransactionPrepareAnnouncePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionApi();

  const body = {
    // string (optional)
    requestPrepareAnnounce: requestPrepareAnnounce_example,
  } satisfies TransactionPrepareAnnouncePostRequest;

  try {
    const data = await api.transactionPrepareAnnouncePost(body);
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
| **requestPrepareAnnounce** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

