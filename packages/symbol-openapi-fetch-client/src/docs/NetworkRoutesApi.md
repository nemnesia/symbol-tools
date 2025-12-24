# NetworkRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getNetworkProperties**](NetworkRoutesApi.md#getnetworkproperties) | **GET** /network/properties | Get the network properties |
| [**getNetworkType**](NetworkRoutesApi.md#getnetworktype) | **GET** /network | Get the current network type of the chain |
| [**getRentalFees**](NetworkRoutesApi.md#getrentalfees) | **GET** /network/fees/rental | Get rental fees information |
| [**getTransactionFees**](NetworkRoutesApi.md#gettransactionfees) | **GET** /network/fees/transaction | Get transaction fees information |



## getNetworkProperties

> NetworkConfigurationDTO getNetworkProperties()

Get the network properties

Returns the content from a catapult-server network configuration file (resources/config-network.properties). To enable this feature, the REST setting \&quot;network.propertiesFilePath\&quot; must define where the file is located. This is adjustable via the configuration file (rest/resources/rest.json) per REST instance. 

### Example

```ts
import {
  Configuration,
  NetworkRoutesApi,
} from '';
import type { GetNetworkPropertiesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NetworkRoutesApi();

  try {
    const data = await api.getNetworkProperties();
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

[**NetworkConfigurationDTO**](NetworkConfigurationDTO.md)

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


## getNetworkType

> NetworkTypeDTO getNetworkType()

Get the current network type of the chain

Returns the current network type.

### Example

```ts
import {
  Configuration,
  NetworkRoutesApi,
} from '';
import type { GetNetworkTypeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NetworkRoutesApi();

  try {
    const data = await api.getNetworkType();
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

[**NetworkTypeDTO**](NetworkTypeDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getRentalFees

> RentalFeesDTO getRentalFees()

Get rental fees information

Returns the estimated effective rental fees for namespaces and mosaics. This endpoint is only available if the REST instance has access to catapult-server &#x60;&#x60;resources/config-network.properties&#x60;&#x60; file. To activate this feature, add the setting \&quot;network.propertiesFilePath\&quot; in the configuration file (rest/resources/rest.json). 

### Example

```ts
import {
  Configuration,
  NetworkRoutesApi,
} from '';
import type { GetRentalFeesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NetworkRoutesApi();

  try {
    const data = await api.getRentalFees();
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

[**RentalFeesDTO**](RentalFeesDTO.md)

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


## getTransactionFees

> TransactionFeesDTO getTransactionFees()

Get transaction fees information

Returns the average, median, highest and lower fee multiplier over the last \&quot;numBlocksTransactionFeeStats\&quot;. The setting \&quot;numBlocksTransactionFeeStats\&quot; is adjustable via the configuration file (rest/resources/rest.json) per REST instance. 

### Example

```ts
import {
  Configuration,
  NetworkRoutesApi,
} from '';
import type { GetTransactionFeesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NetworkRoutesApi();

  try {
    const data = await api.getTransactionFees();
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

[**TransactionFeesDTO**](TransactionFeesDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

