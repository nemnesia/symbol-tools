# NamespaceApi

All URIs are relative to *https://t.nis1.rerena.nemnesia.com:7891*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**namespaceGet**](NamespaceApi.md#namespaceget) | **GET** /namespace | Retrieving a specific namespace |
| [**namespaceMosaicDefinitionPageGet**](NamespaceApi.md#namespacemosaicdefinitionpageget) | **GET** /namespace/mosaic/definition/page | Retrieving mosaic definitions |
| [**namespaceRootsGet**](NamespaceApi.md#namespacerootsget) | **GET** /namespace/roots | Retrieving root namespaces |



## namespaceGet

> object namespaceGet(namespace)

Retrieving a specific namespace

### Example

```ts
import {
  Configuration,
  NamespaceApi,
} from '';
import type { NamespaceGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NamespaceApi();

  const body = {
    // string (optional)
    namespace: makoto.metal.coins,
  } satisfies NamespaceGetRequest;

  try {
    const data = await api.namespaceGet(body);
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
| **namespace** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## namespaceMosaicDefinitionPageGet

> MosaicDefinitionListDTO namespaceMosaicDefinitionPageGet(namespace)

Retrieving mosaic definitions

### Example

```ts
import {
  Configuration,
  NamespaceApi,
} from '';
import type { NamespaceMosaicDefinitionPageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NamespaceApi();

  const body = {
    // string (optional)
    namespace: makoto.metal.coins,
  } satisfies NamespaceMosaicDefinitionPageGetRequest;

  try {
    const data = await api.namespaceMosaicDefinitionPageGet(body);
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
| **namespace** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**MosaicDefinitionListDTO**](MosaicDefinitionListDTO.md)

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


## namespaceRootsGet

> NamespaceListDTO namespaceRootsGet(id, pageSize)

Retrieving root namespaces

### Example

```ts
import {
  Configuration,
  NamespaceApi,
} from '';
import type { NamespaceRootsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NamespaceApi();

  const body = {
    // number (optional)
    id: 26754,
    // number (optional)
    pageSize: 35,
  } satisfies NamespaceRootsGetRequest;

  try {
    const data = await api.namespaceRootsGet(body);
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
| **id** | `number` |  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**NamespaceListDTO**](NamespaceListDTO.md)

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

