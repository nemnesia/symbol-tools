# SymbolNodesApi

All URIs are relative to *https://nodewatch.symbol.tools/testnet*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getSymbolApiNodes**](SymbolNodesApi.md#getsymbolapinodes) | **GET** /api/symbol/nodes/api | Returns the list of known API-only Symbol nodes. |
| [**getSymbolHeight**](SymbolNodesApi.md#getsymbolheight) | **GET** /api/symbol/height | Returns information about the Symbol blockchain\&#39;s heights. |
| [**getSymbolNodeByMainPublicKey**](SymbolNodesApi.md#getsymbolnodebymainpublickey) | **GET** /api/symbol/nodes/mainPublicKey/{main_public_key} | Returns information about the Symbol node with matching main public key. |
| [**getSymbolNodeByNodePublicKey**](SymbolNodesApi.md#getsymbolnodebynodepublickey) | **GET** /api/symbol/nodes/nodePublicKey/{node_public_key} | Returns information about the Symbol node with matching node public key. |
| [**getSymbolNodesCount**](SymbolNodesApi.md#getsymbolnodescount) | **GET** /api/symbol/nodes/count | Returns Symbol node count time series. |
| [**getSymbolPeerNodes**](SymbolNodesApi.md#getsymbolpeernodes) | **GET** /api/symbol/nodes/peer | Returns the list of known Peer Symbol nodes. |



## getSymbolApiNodes

> Array&lt;Node&gt; getSymbolApiNodes(onlySsl, limit, order)

Returns the list of known API-only Symbol nodes.

### Example

```ts
import {
  Configuration,
  SymbolNodesApi,
} from '';
import type { GetSymbolApiNodesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SymbolNodesApi();

  const body = {
    // boolean | When `true`, only nodes that support HTTPS are returned. (optional)
    onlySsl: true,
    // number | Maximum number of nodes to return (0 means all items). (optional)
    limit: 56,
    // 'random' | Order of returned nodes.  The only currently supported option is `random` which returns the nodes in a non-specified order.  (optional)
    order: order_example,
  } satisfies GetSymbolApiNodesRequest;

  try {
    const data = await api.getSymbolApiNodes(body);
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
| **onlySsl** | `boolean` | When &#x60;true&#x60;, only nodes that support HTTPS are returned. | [Optional] [Defaults to `false`] |
| **limit** | `number` | Maximum number of nodes to return (0 means all items). | [Optional] [Defaults to `0`] |
| **order** | `random` | Order of returned nodes.  The only currently supported option is &#x60;random&#x60; which returns the nodes in a non-specified order.  | [Optional] [Defaults to `undefined`] [Enum: random] |

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
| **200** | List of Symbol API-only nodes. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSymbolHeight

> HeightInfo getSymbolHeight()

Returns information about the Symbol blockchain\&#39;s heights.

### Example

```ts
import {
  Configuration,
  SymbolNodesApi,
} from '';
import type { GetSymbolHeightRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SymbolNodesApi();

  try {
    const data = await api.getSymbolHeight();
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


## getSymbolNodeByMainPublicKey

> Node getSymbolNodeByMainPublicKey(mainPublicKey)

Returns information about the Symbol node with matching main public key.

### Example

```ts
import {
  Configuration,
  SymbolNodesApi,
} from '';
import type { GetSymbolNodeByMainPublicKeyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SymbolNodesApi();

  const body = {
    // string | The main public key of the Symbol node to retrieve.
    mainPublicKey: E3FC28889BDE31406465167F1D9D6A16DCA1FF67A3BABFA5E5A8596478848F78,
  } satisfies GetSymbolNodeByMainPublicKeyRequest;

  try {
    const data = await api.getSymbolNodeByMainPublicKey(body);
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
| **mainPublicKey** | `string` | The main public key of the Symbol node to retrieve. | [Defaults to `undefined`] |

### Return type

[**Node**](Node.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The node information. |  -  |
| **400** | Invalid main public key: The provided key must contain exactly 64 hexadecimal characters and nothing else.  |  -  |
| **404** | There is no node with the requested main public key. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSymbolNodeByNodePublicKey

> Node getSymbolNodeByNodePublicKey(nodePublicKey)

Returns information about the Symbol node with matching node public key.

### Example

```ts
import {
  Configuration,
  SymbolNodesApi,
} from '';
import type { GetSymbolNodeByNodePublicKeyRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SymbolNodesApi();

  const body = {
    // string | The public key of the Symbol node to retrieve.
    nodePublicKey: E3FC28889BDE31406465167F1D9D6A16DCA1FF67A3BABFA5E5A8596478848F78,
  } satisfies GetSymbolNodeByNodePublicKeyRequest;

  try {
    const data = await api.getSymbolNodeByNodePublicKey(body);
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
| **nodePublicKey** | `string` | The public key of the Symbol node to retrieve. | [Defaults to `undefined`] |

### Return type

[**Node**](Node.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The node information. |  -  |
| **400** | Invalid node public key: The provided key must contain exactly 64 hexadecimal characters and nothing else.  |  -  |
| **404** | There is no node with the requested public key. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSymbolNodesCount

> Array&lt;TimeSeriesNodesCountInner&gt; getSymbolNodesCount()

Returns Symbol node count time series.

### Example

```ts
import {
  Configuration,
  SymbolNodesApi,
} from '';
import type { GetSymbolNodesCountRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SymbolNodesApi();

  try {
    const data = await api.getSymbolNodesCount();
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


## getSymbolPeerNodes

> Array&lt;Node&gt; getSymbolPeerNodes(onlySsl, limit, order)

Returns the list of known Peer Symbol nodes.

### Example

```ts
import {
  Configuration,
  SymbolNodesApi,
} from '';
import type { GetSymbolPeerNodesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SymbolNodesApi();

  const body = {
    // boolean | When `true`, only nodes that support HTTPS are returned. (optional)
    onlySsl: true,
    // number | Maximum number of nodes to return (0 means all items). (optional)
    limit: 56,
    // 'random' | Order of returned nodes.  The only currently supported option is `random` which returns the nodes in a non-specified order.  (optional)
    order: order_example,
  } satisfies GetSymbolPeerNodesRequest;

  try {
    const data = await api.getSymbolPeerNodes(body);
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
| **onlySsl** | `boolean` | When &#x60;true&#x60;, only nodes that support HTTPS are returned. | [Optional] [Defaults to `false`] |
| **limit** | `number` | Maximum number of nodes to return (0 means all items). | [Optional] [Defaults to `0`] |
| **order** | `random` | Order of returned nodes.  The only currently supported option is &#x60;random&#x60; which returns the nodes in a non-specified order.  | [Optional] [Defaults to `undefined`] [Enum: random] |

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
| **200** | List of Symbol peer nodes. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

