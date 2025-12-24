# MetadataRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getMetadata**](MetadataRoutesApi.md#getmetadata) | **GET** /metadata/{compositeHash} | Get metadata information |
| [**getMetadataMerkle**](MetadataRoutesApi.md#getmetadatamerkle) | **GET** /metadata/{compositeHash}/merkle | Get metadata merkle information |
| [**searchMetadataEntries**](MetadataRoutesApi.md#searchmetadataentries) | **GET** /metadata | Search metadata entries |



## getMetadata

> MetadataInfoDTO getMetadata(compositeHash)

Get metadata information

Gets the metadata for a given composite hash.

### Example

```ts
import {
  Configuration,
  MetadataRoutesApi,
} from '';
import type { GetMetadataRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MetadataRoutesApi();

  const body = {
    // string | Filter by composite hash.
    compositeHash: compositeHash_example,
  } satisfies GetMetadataRequest;

  try {
    const data = await api.getMetadata(body);
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
| **compositeHash** | `string` | Filter by composite hash. | [Defaults to `undefined`] |

### Return type

[**MetadataInfoDTO**](MetadataInfoDTO.md)

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


## getMetadataMerkle

> MerkleStateInfoDTO getMetadataMerkle(compositeHash)

Get metadata merkle information

Gets the metadata merkle for a given composite hash.

### Example

```ts
import {
  Configuration,
  MetadataRoutesApi,
} from '';
import type { GetMetadataMerkleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MetadataRoutesApi();

  const body = {
    // string | Filter by composite hash.
    compositeHash: compositeHash_example,
  } satisfies GetMetadataMerkleRequest;

  try {
    const data = await api.getMetadataMerkle(body);
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
| **compositeHash** | `string` | Filter by composite hash. | [Defaults to `undefined`] |

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
| **409** | InvalidArgument |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## searchMetadataEntries

> MetadataPage searchMetadataEntries(sourceAddress, targetAddress, scopedMetadataKey, targetId, metadataType, pageSize, pageNumber, offset, order)

Search metadata entries

Returns an array of metadata.

### Example

```ts
import {
  Configuration,
  MetadataRoutesApi,
} from '';
import type { SearchMetadataEntriesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MetadataRoutesApi();

  const body = {
    // string | Filter by address sending the metadata entry. (optional)
    sourceAddress: sourceAddress_example,
    // string | Filter by target address. (optional)
    targetAddress: targetAddress_example,
    // string | Filter by metadata key. (optional)
    scopedMetadataKey: scopedMetadataKey_example,
    // string | Filter by namespace or mosaic id. (optional)
    targetId: 0DC67FBE1CAD29E3,
    // MetadataTypeEnum | Filter by metadata type. (optional)
    metadataType: ...,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchMetadataEntriesRequest;

  try {
    const data = await api.searchMetadataEntries(body);
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
| **sourceAddress** | `string` | Filter by address sending the metadata entry. | [Optional] [Defaults to `undefined`] |
| **targetAddress** | `string` | Filter by target address. | [Optional] [Defaults to `undefined`] |
| **scopedMetadataKey** | `string` | Filter by metadata key. | [Optional] [Defaults to `undefined`] |
| **targetId** | `string` | Filter by namespace or mosaic id. | [Optional] [Defaults to `undefined`] |
| **metadataType** | `MetadataTypeEnum` | Filter by metadata type. | [Optional] [Defaults to `undefined`] [Enum: 0, 1, 2] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**MetadataPage**](MetadataPage.md)

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

