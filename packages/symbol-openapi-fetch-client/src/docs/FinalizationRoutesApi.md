# FinalizationRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getFinalizationProofAtEpoch**](FinalizationRoutesApi.md#getfinalizationproofatepoch) | **GET** /finalization/proof/epoch/{epoch} | Get finalization proof |
| [**getFinalizationProofAtHeight**](FinalizationRoutesApi.md#getfinalizationproofatheight) | **GET** /finalization/proof/height/{height} | Get finalization proof |



## getFinalizationProofAtEpoch

> FinalizationProofDTO getFinalizationProofAtEpoch(epoch)

Get finalization proof

Gets finalization proof for the greatest height associated with the given epoch.

### Example

```ts
import {
  Configuration,
  FinalizationRoutesApi,
} from '';
import type { GetFinalizationProofAtEpochRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FinalizationRoutesApi();

  const body = {
    // number | Finalization epoch.
    epoch: 789,
  } satisfies GetFinalizationProofAtEpochRequest;

  try {
    const data = await api.getFinalizationProofAtEpoch(body);
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
| **epoch** | `number` | Finalization epoch. | [Defaults to `undefined`] |

### Return type

[**FinalizationProofDTO**](FinalizationProofDTO.md)

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


## getFinalizationProofAtHeight

> FinalizationProofDTO getFinalizationProofAtHeight(height)

Get finalization proof

Gets finalization proof at the given height.

### Example

```ts
import {
  Configuration,
  FinalizationRoutesApi,
} from '';
import type { GetFinalizationProofAtHeightRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FinalizationRoutesApi();

  const body = {
    // string | Block height.
    height: height_example,
  } satisfies GetFinalizationProofAtHeightRequest;

  try {
    const data = await api.getFinalizationProofAtHeight(body);
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
| **height** | `string` | Block height. | [Defaults to `undefined`] |

### Return type

[**FinalizationProofDTO**](FinalizationProofDTO.md)

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

