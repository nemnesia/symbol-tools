# RestrictionMosaicRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getMosaicRestrictions**](RestrictionMosaicRoutesApi.md#getmosaicrestrictions) | **GET** /restrictions/mosaic/{compositeHash} | Get the mosaic restrictions |
| [**getMosaicRestrictionsMerkle**](RestrictionMosaicRoutesApi.md#getmosaicrestrictionsmerkle) | **GET** /restrictions/mosaic/{compositeHash}/merkle | Get the mosaic restrictions merkle |
| [**searchMosaicRestrictions**](RestrictionMosaicRoutesApi.md#searchmosaicrestrictions) | **GET** /restrictions/mosaic | Search mosaic restrictions |



## getMosaicRestrictions

> MosaicRestrictionDTO getMosaicRestrictions(compositeHash)

Get the mosaic restrictions

Returns the mosaic restrictions for a composite hash.

### Example

```ts
import {
  Configuration,
  RestrictionMosaicRoutesApi,
} from '';
import type { GetMosaicRestrictionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RestrictionMosaicRoutesApi();

  const body = {
    // string | Filter by composite hash.
    compositeHash: compositeHash_example,
  } satisfies GetMosaicRestrictionsRequest;

  try {
    const data = await api.getMosaicRestrictions(body);
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

[**MosaicRestrictionDTO**](MosaicRestrictionDTO.md)

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


## getMosaicRestrictionsMerkle

> MerkleStateInfoDTO getMosaicRestrictionsMerkle(compositeHash)

Get the mosaic restrictions merkle

Returns the mosaic restrictions merkle for a given composite hash.

### Example

```ts
import {
  Configuration,
  RestrictionMosaicRoutesApi,
} from '';
import type { GetMosaicRestrictionsMerkleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RestrictionMosaicRoutesApi();

  const body = {
    // string | Filter by composite hash.
    compositeHash: compositeHash_example,
  } satisfies GetMosaicRestrictionsMerkleRequest;

  try {
    const data = await api.getMosaicRestrictionsMerkle(body);
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
| **404** | ResourceNotFound |  -  |
| **409** | InvalidArgument |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## searchMosaicRestrictions

> MosaicRestrictionsPage searchMosaicRestrictions(mosaicId, entryType, targetAddress, pageSize, pageNumber, offset, order)

Search mosaic restrictions

Returns an array of mosaic restrictions.

### Example

```ts
import {
  Configuration,
  RestrictionMosaicRoutesApi,
} from '';
import type { SearchMosaicRestrictionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RestrictionMosaicRoutesApi();

  const body = {
    // string | Filter by mosaic identifier. (optional)
    mosaicId: mosaicId_example,
    // MosaicRestrictionEntryTypeEnum | Filter by entry type. (optional)
    entryType: ...,
    // string | Filter by target address. (optional)
    targetAddress: targetAddress_example,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchMosaicRestrictionsRequest;

  try {
    const data = await api.searchMosaicRestrictions(body);
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
| **mosaicId** | `string` | Filter by mosaic identifier. | [Optional] [Defaults to `undefined`] |
| **entryType** | `MosaicRestrictionEntryTypeEnum` | Filter by entry type. | [Optional] [Defaults to `undefined`] [Enum: 0, 1] |
| **targetAddress** | `string` | Filter by target address. | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**MosaicRestrictionsPage**](MosaicRestrictionsPage.md)

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

