# StatusApi

All URIs are relative to *https://t.nis1.rerena.nemnesia.com:7891*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getStatus**](StatusApi.md#getstatus) | **GET** /status | Status |



## getStatus

> StatusDTO getStatus()

Status

Determines the status of NIS.

### Example

```ts
import {
  Configuration,
  StatusApi,
} from '';
import type { GetStatusRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StatusApi();

  try {
    const data = await api.getStatus();
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

[**StatusDTO**](StatusDTO.md)

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

