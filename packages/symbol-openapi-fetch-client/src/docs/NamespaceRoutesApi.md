# NamespaceRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAccountsNames**](NamespaceRoutesApi.md#getaccountsnames) | **POST** /namespaces/account/names | Get readable names for a set of accountIds |
| [**getMosaicsNames**](NamespaceRoutesApi.md#getmosaicsnames) | **POST** /namespaces/mosaic/names | Get readable names for a set of mosaics |
| [**getNamespace**](NamespaceRoutesApi.md#getnamespace) | **GET** /namespaces/{namespaceId} | Get namespace information |
| [**getNamespaceMerkle**](NamespaceRoutesApi.md#getnamespacemerkle) | **GET** /namespaces/{namespaceId}/merkle | Get namespace merkle information |
| [**getNamespacesNames**](NamespaceRoutesApi.md#getnamespacesnames) | **POST** /namespaces/names | Get readable names for a set of namespaces |
| [**searchNamespaces**](NamespaceRoutesApi.md#searchnamespaces) | **GET** /namespaces | Search namespaces |



## getAccountsNames

> AccountsNamesDTO getAccountsNames(addresses)

Get readable names for a set of accountIds

Returns friendly names for accounts.

### Example

```ts
import {
  Configuration,
  NamespaceRoutesApi,
} from '';
import type { GetAccountsNamesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NamespaceRoutesApi();

  const body = {
    // Addresses
    addresses: ...,
  } satisfies GetAccountsNamesRequest;

  try {
    const data = await api.getAccountsNames(body);
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
| **addresses** | [Addresses](Addresses.md) |  | |

### Return type

[**AccountsNamesDTO**](AccountsNamesDTO.md)

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


## getMosaicsNames

> MosaicsNamesDTO getMosaicsNames(mosaicIds)

Get readable names for a set of mosaics

Returns friendly names for mosaics.

### Example

```ts
import {
  Configuration,
  NamespaceRoutesApi,
} from '';
import type { GetMosaicsNamesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NamespaceRoutesApi();

  const body = {
    // MosaicIds
    mosaicIds: ...,
  } satisfies GetMosaicsNamesRequest;

  try {
    const data = await api.getMosaicsNames(body);
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
| **mosaicIds** | [MosaicIds](MosaicIds.md) |  | |

### Return type

[**MosaicsNamesDTO**](MosaicsNamesDTO.md)

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


## getNamespace

> NamespaceInfoDTO getNamespace(namespaceId)

Get namespace information

Gets the namespace for a given namespace identifier.

### Example

```ts
import {
  Configuration,
  NamespaceRoutesApi,
} from '';
import type { GetNamespaceRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NamespaceRoutesApi();

  const body = {
    // string | Namespace identifier.
    namespaceId: namespaceId_example,
  } satisfies GetNamespaceRequest;

  try {
    const data = await api.getNamespace(body);
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
| **namespaceId** | `string` | Namespace identifier. | [Defaults to `undefined`] |

### Return type

[**NamespaceInfoDTO**](NamespaceInfoDTO.md)

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


## getNamespaceMerkle

> MerkleStateInfoDTO getNamespaceMerkle(namespaceId)

Get namespace merkle information

Gets the namespace merkle for a given namespace identifier.

### Example

```ts
import {
  Configuration,
  NamespaceRoutesApi,
} from '';
import type { GetNamespaceMerkleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NamespaceRoutesApi();

  const body = {
    // string | Namespace identifier.
    namespaceId: namespaceId_example,
  } satisfies GetNamespaceMerkleRequest;

  try {
    const data = await api.getNamespaceMerkle(body);
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
| **namespaceId** | `string` | Namespace identifier. | [Defaults to `undefined`] |

### Return type

[**MerkleStateInfoDTO**](MerkleStateInfoDTO.md)

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


## getNamespacesNames

> Array&lt;NamespaceNameDTO&gt; getNamespacesNames(namespaceIds)

Get readable names for a set of namespaces

Returns friendly names for namespaces.

### Example

```ts
import {
  Configuration,
  NamespaceRoutesApi,
} from '';
import type { GetNamespacesNamesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NamespaceRoutesApi();

  const body = {
    // NamespaceIds
    namespaceIds: ...,
  } satisfies GetNamespacesNamesRequest;

  try {
    const data = await api.getNamespacesNames(body);
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
| **namespaceIds** | [NamespaceIds](NamespaceIds.md) |  | |

### Return type

[**Array&lt;NamespaceNameDTO&gt;**](NamespaceNameDTO.md)

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


## searchNamespaces

> NamespacePage searchNamespaces(ownerAddress, registrationType, level0, aliasType, pageSize, pageNumber, offset, order)

Search namespaces

Gets an array of namespaces.

### Example

```ts
import {
  Configuration,
  NamespaceRoutesApi,
} from '';
import type { SearchNamespacesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NamespaceRoutesApi();

  const body = {
    // string | Filter by owner address. (optional)
    ownerAddress: ownerAddress_example,
    // NamespaceRegistrationTypeEnum | Filter by registration type. (optional)
    registrationType: ...,
    // string | Filter by root namespace. (optional)
    level0: level0_example,
    // AliasTypeEnum | Filter by alias type. (optional)
    aliasType: ...,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchNamespacesRequest;

  try {
    const data = await api.searchNamespaces(body);
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
| **ownerAddress** | `string` | Filter by owner address. | [Optional] [Defaults to `undefined`] |
| **registrationType** | `NamespaceRegistrationTypeEnum` | Filter by registration type. | [Optional] [Defaults to `undefined`] [Enum: 0, 1] |
| **level0** | `string` | Filter by root namespace. | [Optional] [Defaults to `undefined`] |
| **aliasType** | `AliasTypeEnum` | Filter by alias type. | [Optional] [Defaults to `undefined`] [Enum: 0, 1, 2] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**NamespacePage**](NamespacePage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | success |  -  |
| **409** | InvalidArgument |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

