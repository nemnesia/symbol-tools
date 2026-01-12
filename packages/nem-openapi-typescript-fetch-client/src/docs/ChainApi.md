# ChainApi

All URIs are relative to *https://t.nis1.rerena.nemnesia.com:7891*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**chainHeightGet**](ChainApi.md#chainheightget) | **GET** /chain/height | Block chain height |
| [**chainLastBlockGet**](ChainApi.md#chainlastblockget) | **GET** /chain/last-block | Last block of the block chain score |
| [**chainScoreGet**](ChainApi.md#chainscoreget) | **GET** /chain/score | Block chain score |



## chainHeightGet

> BlockHeightDTO chainHeightGet()

Block chain height

### Example

```ts
import {
  Configuration,
  ChainApi,
} from '';
import type { ChainHeightGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ChainApi();

  try {
    const data = await api.chainHeightGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**BlockHeightDTO**](BlockHeightDTO.md)

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


## chainLastBlockGet

> BlockDTO chainLastBlockGet()

Last block of the block chain score

### Example

```ts
import {
  Configuration,
  ChainApi,
} from '';
import type { ChainLastBlockGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ChainApi();

  try {
    const data = await api.chainLastBlockGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

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


## chainScoreGet

> BlockChainScoreDTO chainScoreGet()

Block chain score

### Example

```ts
import {
  Configuration,
  ChainApi,
} from '';
import type { ChainScoreGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ChainApi();

  try {
    const data = await api.chainScoreGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**BlockChainScoreDTO**](BlockChainScoreDTO.md)

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

