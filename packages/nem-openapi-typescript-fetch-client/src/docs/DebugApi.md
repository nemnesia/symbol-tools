# DebugApi

All URIs are relative to *https://t.nis1.rerena.nemnesia.com:7891*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**debugConnectionsIncomingGet**](DebugApi.md#debugconnectionsincomingget) | **GET** /debug/connections/incoming | Monitoring incoming calls |
| [**debugConnectionsOutgoingGet**](DebugApi.md#debugconnectionsoutgoingget) | **GET** /debug/connections/outgoing | Monitoring outgoing calls |
| [**debugTimeSynchronizationGet**](DebugApi.md#debugtimesynchronizationget) | **GET** /debug/time-synchronization | Monitoring the network time |
| [**debugTimersGet**](DebugApi.md#debugtimersget) | **GET** /debug/timers | Monitoring timers |



## debugConnectionsIncomingGet

> object debugConnectionsIncomingGet()

Monitoring incoming calls

### Example

```ts
import {
  Configuration,
  DebugApi,
} from '';
import type { DebugConnectionsIncomingGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DebugApi();

  try {
    const data = await api.debugConnectionsIncomingGet();
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


## debugConnectionsOutgoingGet

> object debugConnectionsOutgoingGet()

Monitoring outgoing calls

### Example

```ts
import {
  Configuration,
  DebugApi,
} from '';
import type { DebugConnectionsOutgoingGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DebugApi();

  try {
    const data = await api.debugConnectionsOutgoingGet();
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


## debugTimeSynchronizationGet

> TimeSynchronizationListDTO debugTimeSynchronizationGet()

Monitoring the network time

### Example

```ts
import {
  Configuration,
  DebugApi,
} from '';
import type { DebugTimeSynchronizationGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DebugApi();

  try {
    const data = await api.debugTimeSynchronizationGet();
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

[**TimeSynchronizationListDTO**](TimeSynchronizationListDTO.md)

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


## debugTimersGet

> object debugTimersGet()

Monitoring timers

### Example

```ts
import {
  Configuration,
  DebugApi,
} from '';
import type { DebugTimersGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DebugApi();

  try {
    const data = await api.debugTimersGet();
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

