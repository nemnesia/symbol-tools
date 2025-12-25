# ChainRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getChainInfo**](ChainRoutesApi.md#getchaininfo) | **GET** /chain/info | Get the current information of the chain |



## getChainInfo

> ChainInfoDTO getChainInfo()

Get the current information of the chain

Returns the current information of the blockchain.  The higher the score, the better the chain. During synchronization, nodes try to get the best blockchain in the network.  The score for a block is derived from its difficulty and the time (in seconds) that has elapsed since the last block:      block score &#x3D; difficulty − time elapsed since last block 

### Example

```ts
import {
  Configuration,
  ChainRoutesApi,
} from '';
import type { GetChainInfoRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ChainRoutesApi();

  try {
    const data = await api.getChainInfo();
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

[**ChainInfoDTO**](ChainInfoDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

