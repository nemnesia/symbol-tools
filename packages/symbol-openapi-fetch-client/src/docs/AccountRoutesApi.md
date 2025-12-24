# AccountRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAccountInfo**](AccountRoutesApi.md#getaccountinfo) | **GET** /accounts/{accountId} | Get account information |
| [**getAccountInfoMerkle**](AccountRoutesApi.md#getaccountinfomerkle) | **GET** /accounts/{accountId}/merkle | Get account merkle information |
| [**getAccountsInfo**](AccountRoutesApi.md#getaccountsinfo) | **POST** /accounts | Get accounts information |
| [**searchAccounts**](AccountRoutesApi.md#searchaccounts) | **GET** /accounts | Search accounts |



## getAccountInfo

> AccountInfoDTO getAccountInfo(accountId)

Get account information

Returns the account information.

### Example

```ts
import {
  Configuration,
  AccountRoutesApi,
} from '';
import type { GetAccountInfoRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountRoutesApi();

  const body = {
    // string | Account public key or address encoded using a 32-character set.
    accountId: accountId_example,
  } satisfies GetAccountInfoRequest;

  try {
    const data = await api.getAccountInfo(body);
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
| **accountId** | `string` | Account public key or address encoded using a 32-character set. | [Defaults to `undefined`] |

### Return type

[**AccountInfoDTO**](AccountInfoDTO.md)

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


## getAccountInfoMerkle

> MerkleStateInfoDTO getAccountInfoMerkle(accountId)

Get account merkle information

Returns the account merkle information.

### Example

```ts
import {
  Configuration,
  AccountRoutesApi,
} from '';
import type { GetAccountInfoMerkleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountRoutesApi();

  const body = {
    // string | Account public key or address encoded using a 32-character set.
    accountId: accountId_example,
  } satisfies GetAccountInfoMerkleRequest;

  try {
    const data = await api.getAccountInfoMerkle(body);
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
| **accountId** | `string` | Account public key or address encoded using a 32-character set. | [Defaults to `undefined`] |

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


## getAccountsInfo

> Array&lt;AccountInfoDTO&gt; getAccountsInfo(accountIds)

Get accounts information

Returns the account information for an array of accounts.

### Example

```ts
import {
  Configuration,
  AccountRoutesApi,
} from '';
import type { GetAccountsInfoRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountRoutesApi();

  const body = {
    // AccountIds (optional)
    accountIds: ...,
  } satisfies GetAccountsInfoRequest;

  try {
    const data = await api.getAccountsInfo(body);
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
| **accountIds** | [AccountIds](AccountIds.md) |  | [Optional] |

### Return type

[**Array&lt;AccountInfoDTO&gt;**](AccountInfoDTO.md)

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


## searchAccounts

> AccountPage searchAccounts(pageSize, pageNumber, offset, order, orderBy, mosaicId)

Search accounts

Gets an array of accounts.

### Example

```ts
import {
  Configuration,
  AccountRoutesApi,
} from '';
import type { SearchAccountsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountRoutesApi();

  const body = {
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
    // AccountOrderByEnum | Sort responses by the property set. If ``balance`` option is selected, the request must define the ``mosaicId`` filter.  (optional)
    orderBy: ...,
    // string | Filter by mosaic identifier. (optional)
    mosaicId: mosaicId_example,
  } satisfies SearchAccountsRequest;

  try {
    const data = await api.searchAccounts(body);
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
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |
| **orderBy** | `AccountOrderByEnum` | Sort responses by the property set. If &#x60;&#x60;balance&#x60;&#x60; option is selected, the request must define the &#x60;&#x60;mosaicId&#x60;&#x60; filter.  | [Optional] [Defaults to `undefined`] [Enum: id, balance] |
| **mosaicId** | `string` | Filter by mosaic identifier. | [Optional] [Defaults to `undefined`] |

### Return type

[**AccountPage**](AccountPage.md)

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

