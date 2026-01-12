# NodeApi

All URIs are relative to *https://t.nis1.rerena.nemnesia.com:7891*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**nodeActivePeersMaxChainHeightGet**](NodeApi.md#nodeactivepeersmaxchainheightget) | **GET** /node/active-peers/max-chain-height | Maximum chain height in the active neighborhood |
| [**nodeBootPost**](NodeApi.md#nodebootpost) | **POST** /node/boot | Booting the local node |
| [**nodeExperiencesGet**](NodeApi.md#nodeexperiencesget) | **GET** /node/experiences | Requesting node experiences |
| [**nodeExtendedInfoGet**](NodeApi.md#nodeextendedinfoget) | **GET** /node/extended-info | Extended node information |
| [**nodeInfoGet**](NodeApi.md#nodeinfoget) | **GET** /node/info | Basic node information |
| [**nodePeerListActiveGet**](NodeApi.md#nodepeerlistactiveget) | **GET** /node/peer-list/active | Active neighborhood |
| [**nodePeerListAllGet**](NodeApi.md#nodepeerlistallget) | **GET** /node/peer-list/all | Complete neighborhood |
| [**nodePeerListReachableGet**](NodeApi.md#nodepeerlistreachableget) | **GET** /node/peer-list/reachable | Reachable neighborhood |



## nodeActivePeersMaxChainHeightGet

> BlockHeightDTO nodeActivePeersMaxChainHeightGet()

Maximum chain height in the active neighborhood

### Example

```ts
import {
  Configuration,
  NodeApi,
} from '';
import type { NodeActivePeersMaxChainHeightGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NodeApi();

  try {
    const data = await api.nodeActivePeersMaxChainHeightGet();
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


## nodeBootPost

> nodeBootPost(bootNodeRequest)

Booting the local node

### Example

```ts
import {
  Configuration,
  NodeApi,
} from '';
import type { NodeBootPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NodeApi();

  const body = {
    // string (optional)
    bootNodeRequest: bootNodeRequest_example,
  } satisfies NodeBootPostRequest;

  try {
    const data = await api.nodeBootPost(body);
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
| **bootNodeRequest** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## nodeExperiencesGet

> object nodeExperiencesGet()

Requesting node experiences

### Example

```ts
import {
  Configuration,
  NodeApi,
} from '';
import type { NodeExperiencesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NodeApi();

  try {
    const data = await api.nodeExperiencesGet();
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

**object**

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


## nodeExtendedInfoGet

> ExtendedNodeInfoDTO nodeExtendedInfoGet()

Extended node information

### Example

```ts
import {
  Configuration,
  NodeApi,
} from '';
import type { NodeExtendedInfoGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NodeApi();

  try {
    const data = await api.nodeExtendedInfoGet();
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

[**ExtendedNodeInfoDTO**](ExtendedNodeInfoDTO.md)

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


## nodeInfoGet

> NodeDTO nodeInfoGet()

Basic node information

### Example

```ts
import {
  Configuration,
  NodeApi,
} from '';
import type { NodeInfoGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NodeApi();

  try {
    const data = await api.nodeInfoGet();
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

[**NodeDTO**](NodeDTO.md)

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


## nodePeerListActiveGet

> NodeListDTO nodePeerListActiveGet()

Active neighborhood

### Example

```ts
import {
  Configuration,
  NodeApi,
} from '';
import type { NodePeerListActiveGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NodeApi();

  try {
    const data = await api.nodePeerListActiveGet();
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

[**NodeListDTO**](NodeListDTO.md)

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


## nodePeerListAllGet

> NodeListDTO nodePeerListAllGet()

Complete neighborhood

### Example

```ts
import {
  Configuration,
  NodeApi,
} from '';
import type { NodePeerListAllGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NodeApi();

  try {
    const data = await api.nodePeerListAllGet();
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

[**NodeListDTO**](NodeListDTO.md)

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


## nodePeerListReachableGet

> NodeListDTO nodePeerListReachableGet()

Reachable neighborhood

### Example

```ts
import {
  Configuration,
  NodeApi,
} from '';
import type { NodePeerListReachableGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NodeApi();

  try {
    const data = await api.nodePeerListReachableGet();
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

[**NodeListDTO**](NodeListDTO.md)

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

