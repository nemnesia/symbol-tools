# HeartbeatApi

All URIs are relative to *https://t.nis1.rerena.nemnesia.com:7891*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getHeartbeat**](HeartbeatApi.md#getheartbeat) | **GET** /heartbeat | Heart beat |



## getHeartbeat

> HeartbeatDTO getHeartbeat()

Heart beat

Determines if NIS is up and responsive.

### Example

```ts
import {
  Configuration,
  HeartbeatApi,
} from '';
import type { GetHeartbeatRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new HeartbeatApi();

  try {
    const data = await api.getHeartbeat();
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

[**HeartbeatDTO**](HeartbeatDTO.md)

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

