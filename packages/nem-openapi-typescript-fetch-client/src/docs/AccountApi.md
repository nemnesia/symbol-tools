# AccountApi

All URIs are relative to *https://t.nis1.rerena.nemnesia.com:7891*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**accountGetForwardedFromPublicKeyGet**](AccountApi.md#accountgetforwardedfrompublickeyget) | **GET** /account/get/forwarded/from-public-key | Requesting the original account data for a delegate account (Public key) |
| [**accountGetForwardedGet**](AccountApi.md#accountgetforwardedget) | **GET** /account/get/forwarded | Requesting the original account data for a delegate account |
| [**accountGetFromPublicKeyGet**](AccountApi.md#accountgetfrompublickeyget) | **GET** /account/get/from-public-key | Requesting the account data (public key) |
| [**accountGetGet**](AccountApi.md#accountgetget) | **GET** /account/get | Requesting the account data |
| [**accountHarvestsGet**](AccountApi.md#accountharvestsget) | **GET** /account/harvests | Requesting harvest info data for an account |
| [**accountHistoricalGetGet**](AccountApi.md#accounthistoricalgetget) | **GET** /account/historical/get | Retrieving historical account data |
| [**accountImportancesGet**](AccountApi.md#accountimportancesget) | **GET** /account/importances | Retrieving account importances for accounts |
| [**accountLockPost**](AccountApi.md#accountlockpost) | **POST** /account/lock | Locking the account (stops harvesting) |
| [**accountMosaicDefinitionPageGet**](AccountApi.md#accountmosaicdefinitionpageget) | **GET** /account/mosaic/definition/page | Retrieving mosaic definitions that an account has created |
| [**accountMosaicOwnedGet**](AccountApi.md#accountmosaicownedget) | **GET** /account/mosaic/owned | Retrieving mosaics that an account owns |
| [**accountNamespacePageGet**](AccountApi.md#accountnamespacepageget) | **GET** /account/namespace/page | Retrieving namespaces that an account owns |
| [**accountStatusGet**](AccountApi.md#accountstatusget) | **GET** /account/status | Requesting the account status |
| [**accountTransfersAllGet**](AccountApi.md#accounttransfersallget) | **GET** /account/transfers/all | Requesting transaction data for an account (All) |
| [**accountTransfersIncomingGet**](AccountApi.md#accounttransfersincomingget) | **GET** /account/transfers/incoming | Requesting transaction data for an account (Incoming) |
| [**accountTransfersOutgoingGet**](AccountApi.md#accounttransfersoutgoingget) | **GET** /account/transfers/outgoing | Requesting transaction data for an account (Outgoing) |
| [**accountUnconfirmedTransactionsGet**](AccountApi.md#accountunconfirmedtransactionsget) | **GET** /account/unconfirmedTransactions | Unconfirmed transactions |
| [**accountUnlockPost**](AccountApi.md#accountunlockpost) | **POST** /account/unlock | Unlocking the account (enables harvesting) |
| [**accountUnlockedInfoPost**](AccountApi.md#accountunlockedinfopost) | **POST** /account/unlocked/info | Retrieving the unlock info |
| [**generate**](AccountApi.md#generate) | **GET** /account/generate | Retrieving account data |



## accountGetForwardedFromPublicKeyGet

> AccountMetaDataPairDTO accountGetForwardedFromPublicKeyGet(publicKey)

Requesting the original account data for a delegate account (Public key)

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountGetForwardedFromPublicKeyGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string | The public key of the account as hex string. (optional)
    publicKey: bb0e019d28df2d5241790c47a3ff99f39a1fc56017a1d291fb74fe6762d66aea,
  } satisfies AccountGetForwardedFromPublicKeyGetRequest;

  try {
    const data = await api.accountGetForwardedFromPublicKeyGet(body);
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
| **publicKey** | `string` | The public key of the account as hex string. | [Optional] [Defaults to `undefined`] |

### Return type

[**AccountMetaDataPairDTO**](AccountMetaDataPairDTO.md)

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


## accountGetForwardedGet

> AccountMetaDataPairDTO accountGetForwardedGet(address)

Requesting the original account data for a delegate account

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountGetForwardedGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string | The address of the delegate account. (optional)
    address: TBAVMVQZ53M3T2LCXPYKVJO3MH7OERIKEG45LUH4,
  } satisfies AccountGetForwardedGetRequest;

  try {
    const data = await api.accountGetForwardedGet(body);
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
| **address** | `string` | The address of the delegate account. | [Optional] [Defaults to `undefined`] |

### Return type

[**AccountMetaDataPairDTO**](AccountMetaDataPairDTO.md)

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


## accountGetFromPublicKeyGet

> AccountMetaDataPairDTO accountGetFromPublicKeyGet(publicKey)

Requesting the account data (public key)

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountGetFromPublicKeyGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string | The public key of the account as hex string. (optional)
    publicKey: 46ad1ec1647d7455493f51b1a11d9e61838fef43dbd50bfe7c68bb1bea7c1436,
  } satisfies AccountGetFromPublicKeyGetRequest;

  try {
    const data = await api.accountGetFromPublicKeyGet(body);
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
| **publicKey** | `string` | The public key of the account as hex string. | [Optional] [Defaults to `undefined`] |

### Return type

[**AccountMetaDataPairDTO**](AccountMetaDataPairDTO.md)

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


## accountGetGet

> AccountMetaDataPairDTO accountGetGet(address)

Requesting the account data

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountGetGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string | The address of the account. (optional)
    address: TB7PINA6CP6RZT6N3ETEZRJZRPMSAJ3FHAPB4NI7,
  } satisfies AccountGetGetRequest;

  try {
    const data = await api.accountGetGet(body);
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
| **address** | `string` | The address of the account. | [Optional] [Defaults to `undefined`] |

### Return type

[**AccountMetaDataPairDTO**](AccountMetaDataPairDTO.md)

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


## accountHarvestsGet

> HarvestInfoListDTO accountHarvestsGet(address, hash)

Requesting harvest info data for an account

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountHarvestsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string (optional)
    address: TALICELCD3XPH4FFI5STGGNSNSWPOTG5E4DS2TOS,
    // string (optional)
    hash: 81d52a7df4abba8bb1613bcc42b6b93cf3114524939035d88ae8e864cd2c34c8,
  } satisfies AccountHarvestsGetRequest;

  try {
    const data = await api.accountHarvestsGet(body);
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
| **address** | `string` |  | [Optional] [Defaults to `undefined`] |
| **hash** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**HarvestInfoListDTO**](HarvestInfoListDTO.md)

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


## accountHistoricalGetGet

> object accountHistoricalGetGet(address, startHeight, endHeight, increment)

Retrieving historical account data

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountHistoricalGetGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string (optional)
    address: NALICELGU3IVY4DPJKHYLSSVYFFWYS5QPLYEZDJJ,
    // number (optional)
    startHeight: 17592,
    // number (optional)
    endHeight: 17592,
    // number (optional)
    increment: 1,
  } satisfies AccountHistoricalGetGetRequest;

  try {
    const data = await api.accountHistoricalGetGet(body);
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
| **address** | `string` |  | [Optional] [Defaults to `undefined`] |
| **startHeight** | `number` |  | [Optional] [Defaults to `undefined`] |
| **endHeight** | `number` |  | [Optional] [Defaults to `undefined`] |
| **increment** | `number` |  | [Optional] [Defaults to `undefined`] |

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


## accountImportancesGet

> AccountImportanceListDTO accountImportancesGet()

Retrieving account importances for accounts

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountImportancesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  try {
    const data = await api.accountImportancesGet();
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

[**AccountImportanceListDTO**](AccountImportanceListDTO.md)

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


## accountLockPost

> accountLockPost(privateKey)

Locking the account (stops harvesting)

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountLockPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string (optional)
    privateKey: privateKey_example,
  } satisfies AccountLockPostRequest;

  try {
    const data = await api.accountLockPost(body);
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
| **privateKey** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## accountMosaicDefinitionPageGet

> MosaicDefinitionListDTO accountMosaicDefinitionPageGet(address, parent)

Retrieving mosaic definitions that an account has created

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountMosaicDefinitionPageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string (optional)
    address: TD3RXTHBLK6J3UD2BH2PXSOFLPWZOTR34WCG4HXH,
    // string (optional)
    parent: makoto.metal.coins,
  } satisfies AccountMosaicDefinitionPageGetRequest;

  try {
    const data = await api.accountMosaicDefinitionPageGet(body);
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
| **address** | `string` |  | [Optional] [Defaults to `undefined`] |
| **parent** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## accountMosaicOwnedGet

> MosaicListDTO accountMosaicOwnedGet(address)

Retrieving mosaics that an account owns

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountMosaicOwnedGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string (optional)
    address: TD3RXTHBLK6J3UD2BH2PXSOFLPWZOTR34WCG4HXH,
  } satisfies AccountMosaicOwnedGetRequest;

  try {
    const data = await api.accountMosaicOwnedGet(body);
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
| **address** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**MosaicListDTO**](MosaicListDTO.md)

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


## accountNamespacePageGet

> NamespaceListDTO accountNamespacePageGet(address, parent)

Retrieving namespaces that an account owns

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountNamespacePageGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string (optional)
    address: TD3RXTHBLK6J3UD2BH2PXSOFLPWZOTR34WCG4HXH,
    // string (optional)
    parent: makoto.metal,
  } satisfies AccountNamespacePageGetRequest;

  try {
    const data = await api.accountNamespacePageGet(body);
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
| **address** | `string` |  | [Optional] [Defaults to `undefined`] |
| **parent** | `string` |  | [Optional] [Defaults to `undefined`] |

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


## accountStatusGet

> AccountMetaDataDTO accountStatusGet(address)

Requesting the account status

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountStatusGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string | The address of the account. (optional)
    address: TB7PINA6CP6RZT6N3ETEZRJZRPMSAJ3FHAPB4NI7,
  } satisfies AccountStatusGetRequest;

  try {
    const data = await api.accountStatusGet(body);
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
| **address** | `string` | The address of the account. | [Optional] [Defaults to `undefined`] |

### Return type

[**AccountMetaDataDTO**](AccountMetaDataDTO.md)

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


## accountTransfersAllGet

> TransactionListDTO accountTransfersAllGet(address)

Requesting transaction data for an account (All)

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountTransfersAllGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string | The address of the account. (optional)
    address: TB7PINA6CP6RZT6N3ETEZRJZRPMSAJ3FHAPB4NI7,
  } satisfies AccountTransfersAllGetRequest;

  try {
    const data = await api.accountTransfersAllGet(body);
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
| **address** | `string` | The address of the account. | [Optional] [Defaults to `undefined`] |

### Return type

[**TransactionListDTO**](TransactionListDTO.md)

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


## accountTransfersIncomingGet

> TransactionListDTO accountTransfersIncomingGet(address)

Requesting transaction data for an account (Incoming)

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountTransfersIncomingGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string | The address of the account. (optional)
    address: TB7PINA6CP6RZT6N3ETEZRJZRPMSAJ3FHAPB4NI7,
  } satisfies AccountTransfersIncomingGetRequest;

  try {
    const data = await api.accountTransfersIncomingGet(body);
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
| **address** | `string` | The address of the account. | [Optional] [Defaults to `undefined`] |

### Return type

[**TransactionListDTO**](TransactionListDTO.md)

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


## accountTransfersOutgoingGet

> TransactionListDTO accountTransfersOutgoingGet(address)

Requesting transaction data for an account (Outgoing)

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountTransfersOutgoingGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string | The address of the account. (optional)
    address: TB7PINA6CP6RZT6N3ETEZRJZRPMSAJ3FHAPB4NI7,
  } satisfies AccountTransfersOutgoingGetRequest;

  try {
    const data = await api.accountTransfersOutgoingGet(body);
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
| **address** | `string` | The address of the account. | [Optional] [Defaults to `undefined`] |

### Return type

[**TransactionListDTO**](TransactionListDTO.md)

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


## accountUnconfirmedTransactionsGet

> UnconfirmedTransactionListDTO accountUnconfirmedTransactionsGet(address)

Unconfirmed transactions

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountUnconfirmedTransactionsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string | The address of the account. (optional)
    address: TALICELCD3XPH4FFI5STGGNSNSWPOTG5E4DS2TOS,
  } satisfies AccountUnconfirmedTransactionsGetRequest;

  try {
    const data = await api.accountUnconfirmedTransactionsGet(body);
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
| **address** | `string` | The address of the account. | [Optional] [Defaults to `undefined`] |

### Return type

[**UnconfirmedTransactionListDTO**](UnconfirmedTransactionListDTO.md)

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


## accountUnlockPost

> accountUnlockPost(privateKey)

Unlocking the account (enables harvesting)

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountUnlockPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  const body = {
    // string (optional)
    privateKey: privateKey_example,
  } satisfies AccountUnlockPostRequest;

  try {
    const data = await api.accountUnlockPost(body);
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
| **privateKey** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## accountUnlockedInfoPost

> accountUnlockedInfoPost()

Retrieving the unlock info

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { AccountUnlockedInfoPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  try {
    const data = await api.accountUnlockedInfoPost();
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

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## generate

> KeyPairDTO generate()

Retrieving account data

Generates a KeyPairViewModel.

### Example

```ts
import {
  Configuration,
  AccountApi,
} from '';
import type { GenerateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountApi();

  try {
    const data = await api.generate();
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

[**KeyPairDTO**](KeyPairDTO.md)

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

