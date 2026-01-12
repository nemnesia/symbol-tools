# LocalApi

All URIs are relative to *https://t.nis1.rerena.nemnesia.com:7891*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**localAccountTransfersAllPost**](LocalApi.md#localaccounttransfersallpost) | **POST** /local/account/transfers/all | All transactions with decoded messages |
| [**localAccountTransfersIncomingPost**](LocalApi.md#localaccounttransfersincomingpost) | **POST** /local/account/transfers/incoming | Incoming transactions with decoded messages |
| [**localAccountTransfersOutgoingPost**](LocalApi.md#localaccounttransfersoutgoingpost) | **POST** /local/account/transfers/outgoing | Outgoing transactions with decoded messages |
| [**localChainBlocksAfterPost**](LocalApi.md#localchainblocksafterpost) | **POST** /local/chain/blocks-after | Getting part of a chain |



## localAccountTransfersAllPost

> localAccountTransfersAllPost(page)

All transactions with decoded messages

### Example

```ts
import {
  Configuration,
  LocalApi,
} from '';
import type { LocalAccountTransfersAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LocalApi();

  const body = {
    // string (optional)
    page: page_example,
  } satisfies LocalAccountTransfersAllPostRequest;

  try {
    const data = await api.localAccountTransfersAllPost(body);
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
| **page** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## localAccountTransfersIncomingPost

> localAccountTransfersIncomingPost(page)

Incoming transactions with decoded messages

### Example

```ts
import {
  Configuration,
  LocalApi,
} from '';
import type { LocalAccountTransfersIncomingPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LocalApi();

  const body = {
    // string (optional)
    page: page_example,
  } satisfies LocalAccountTransfersIncomingPostRequest;

  try {
    const data = await api.localAccountTransfersIncomingPost(body);
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
| **page** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## localAccountTransfersOutgoingPost

> localAccountTransfersOutgoingPost(page)

Outgoing transactions with decoded messages

### Example

```ts
import {
  Configuration,
  LocalApi,
} from '';
import type { LocalAccountTransfersOutgoingPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LocalApi();

  const body = {
    // string (optional)
    page: page_example,
  } satisfies LocalAccountTransfersOutgoingPostRequest;

  try {
    const data = await api.localAccountTransfersOutgoingPost(body);
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
| **page** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## localChainBlocksAfterPost

> localChainBlocksAfterPost(blockHeight)

Getting part of a chain

### Example

```ts
import {
  Configuration,
  LocalApi,
} from '';
import type { LocalChainBlocksAfterPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LocalApi();

  const body = {
    // string (optional)
    blockHeight: blockHeight_example,
  } satisfies LocalChainBlocksAfterPostRequest;

  try {
    const data = await api.localChainBlocksAfterPost(body);
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
| **blockHeight** | `string` |  | [Optional] [Defaults to `undefined`] |

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

