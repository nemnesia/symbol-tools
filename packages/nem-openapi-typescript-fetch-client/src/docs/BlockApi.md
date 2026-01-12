# BlockApi

All URIs are relative to *https://t.nis1.rerena.nemnesia.com:7891*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**blockAtPublicPost**](BlockApi.md#blockatpublicpost) | **POST** /block/at/public | Getting a block with a given height |
| [**blockGetGet**](BlockApi.md#blockgetget) | **GET** /block/get | Getting a block with a given hash |



## blockAtPublicPost

> blockAtPublicPost(blockHeight)

Getting a block with a given height

### Example

```ts
import {
  Configuration,
  BlockApi,
} from '';
import type { BlockAtPublicPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockApi();

  const body = {
    // string (optional)
    blockHeight: blockHeight_example,
  } satisfies BlockAtPublicPostRequest;

  try {
    const data = await api.blockAtPublicPost(body);
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


## blockGetGet

> BlockDTO blockGetGet(blockHash)

Getting a block with a given hash

### Example

```ts
import {
  Configuration,
  BlockApi,
} from '';
import type { BlockGetGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new BlockApi();

  const body = {
    // string (optional)
    blockHash: 58efa578aea719b644e8d7c731852bb26d8505257e03a897c8102e8c894a99d6,
  } satisfies BlockGetGetRequest;

  try {
    const data = await api.blockGetGet(body);
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
| **blockHash** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**BlockDTO**](BlockDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

