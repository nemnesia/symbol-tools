# NEMNodesApi

All URIs are relative to *https://nodewatch.symbol.tools/testnet*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getNemHeight**](NEMNodesApi.md#getnemheight) | **GET** /api/nem/height | Returns information about the NEM blockchain\&#39;s heights. |
| [**getNemNodes**](NEMNodesApi.md#getnemnodes) | **GET** /api/nem/nodes | Returns the list of known NEM nodes. |
| [**getNemNodesCount**](NEMNodesApi.md#getnemnodescount) | **GET** /api/nem/nodes/count | Returns NEM node count time series. |



## getNemHeight

> HeightInfo getNemHeight()

Returns information about the NEM blockchain\&#39;s heights.

### Example

```ts
import {
  Configuration,
  NEMNodesApi,
} from '';
import type { GetNemHeightRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NEMNodesApi();

  try {
    const data = await api.getNemHeight();
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

[**HeightInfo**](HeightInfo.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The current and finalized heights, calculated as the median of the values returned by all known nodes.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getNemNodes

> Array&lt;Node&gt; getNemNodes()

Returns the list of known NEM nodes.

### Example

```ts
import {
  Configuration,
  NEMNodesApi,
} from '';
import type { GetNemNodesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NEMNodesApi();

  try {
    const data = await api.getNemNodes();
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

[**Array&lt;Node&gt;**](Node.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The list of known NEM nodes. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getNemNodesCount

> Array&lt;TimeSeriesNodesCountInner&gt; getNemNodesCount()

Returns NEM node count time series.

### Example

```ts
import {
  Configuration,
  NEMNodesApi,
} from '';
import type { GetNemNodesCountRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NEMNodesApi();

  try {
    const data = await api.getNemNodesCount();
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

[**Array&lt;TimeSeriesNodesCountInner&gt;**](TimeSeriesNodesCountInner.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Time series of node counts. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

