# MosaicRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getMosaic**](MosaicRoutesApi.md#getmosaic) | **GET** /mosaics/{mosaicId} | Get mosaic information |
| [**getMosaicMerkle**](MosaicRoutesApi.md#getmosaicmerkle) | **GET** /mosaics/{mosaicId}/merkle | Get mosaic merkle information |
| [**getMosaics**](MosaicRoutesApi.md#getmosaics) | **POST** /mosaics | Get mosaics information for an array of mosaics |
| [**searchMosaics**](MosaicRoutesApi.md#searchmosaics) | **GET** /mosaics | Search mosaics |



## getMosaic

> MosaicInfoDTO getMosaic(mosaicId)

Get mosaic information

Gets the mosaic definition for a given mosaic identifier.

### Example

```ts
import {
  Configuration,
  MosaicRoutesApi,
} from '';
import type { GetMosaicRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MosaicRoutesApi();

  const body = {
    // string | Mosaic identifier.
    mosaicId: mosaicId_example,
  } satisfies GetMosaicRequest;

  try {
    const data = await api.getMosaic(body);
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
| **mosaicId** | `string` | Mosaic identifier. | [Defaults to `undefined`] |

### Return type

[**MosaicInfoDTO**](MosaicInfoDTO.md)

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


## getMosaicMerkle

> MerkleStateInfoDTO getMosaicMerkle(mosaicId)

Get mosaic merkle information

Gets the mosaic definition merkle for a given mosaic identifier.

### Example

```ts
import {
  Configuration,
  MosaicRoutesApi,
} from '';
import type { GetMosaicMerkleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MosaicRoutesApi();

  const body = {
    // string | Mosaic identifier.
    mosaicId: mosaicId_example,
  } satisfies GetMosaicMerkleRequest;

  try {
    const data = await api.getMosaicMerkle(body);
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
| **mosaicId** | `string` | Mosaic identifier. | [Defaults to `undefined`] |

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


## getMosaics

> Array&lt;MosaicInfoDTO&gt; getMosaics(mosaicIds)

Get mosaics information for an array of mosaics

Gets an array of mosaic definition.

### Example

```ts
import {
  Configuration,
  MosaicRoutesApi,
} from '';
import type { GetMosaicsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MosaicRoutesApi();

  const body = {
    // MosaicIds
    mosaicIds: ...,
  } satisfies GetMosaicsRequest;

  try {
    const data = await api.getMosaics(body);
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

[**Array&lt;MosaicInfoDTO&gt;**](MosaicInfoDTO.md)

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


## searchMosaics

> MosaicPage searchMosaics(ownerAddress, pageSize, pageNumber, offset, order)

Search mosaics

Gets an array of mosaics.

### Example

```ts
import {
  Configuration,
  MosaicRoutesApi,
} from '';
import type { SearchMosaicsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MosaicRoutesApi();

  const body = {
    // string | Filter by owner address. (optional)
    ownerAddress: ownerAddress_example,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchMosaicsRequest;

  try {
    const data = await api.searchMosaics(body);
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
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**MosaicPage**](MosaicPage.md)

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

