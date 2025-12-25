# RestrictionAccountRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAccountRestrictions**](RestrictionAccountRoutesApi.md#getaccountrestrictions) | **GET** /restrictions/account/{address} | Get the account restrictions |
| [**getAccountRestrictionsMerkle**](RestrictionAccountRoutesApi.md#getaccountrestrictionsmerkle) | **GET** /restrictions/account/{address}/merkle | Get the account restrictions merkle |
| [**searchAccountRestrictions**](RestrictionAccountRoutesApi.md#searchaccountrestrictions) | **GET** /restrictions/account | Search account restrictions |



## getAccountRestrictions

> AccountRestrictionsInfoDTO getAccountRestrictions(address)

Get the account restrictions

Returns the account restrictions for a given address.

### Example

```ts
import {
  Configuration,
  RestrictionAccountRoutesApi,
} from '';
import type { GetAccountRestrictionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RestrictionAccountRoutesApi();

  const body = {
    // string | Account address.
    address: address_example,
  } satisfies GetAccountRestrictionsRequest;

  try {
    const data = await api.getAccountRestrictions(body);
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
| **address** | `string` | Account address. | [Defaults to `undefined`] |

### Return type

[**AccountRestrictionsInfoDTO**](AccountRestrictionsInfoDTO.md)

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


## getAccountRestrictionsMerkle

> MerkleStateInfoDTO getAccountRestrictionsMerkle(address)

Get the account restrictions merkle

Returns the account restrictions merkle for a given address.

### Example

```ts
import {
  Configuration,
  RestrictionAccountRoutesApi,
} from '';
import type { GetAccountRestrictionsMerkleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RestrictionAccountRoutesApi();

  const body = {
    // string | Account address.
    address: address_example,
  } satisfies GetAccountRestrictionsMerkleRequest;

  try {
    const data = await api.getAccountRestrictionsMerkle(body);
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
| **address** | `string` | Account address. | [Defaults to `undefined`] |

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


## searchAccountRestrictions

> AccountRestrictionsPage searchAccountRestrictions(address, pageSize, pageNumber, offset, order)

Search account restrictions

Returns an array of account restrictions.

### Example

```ts
import {
  Configuration,
  RestrictionAccountRoutesApi,
} from '';
import type { SearchAccountRestrictionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RestrictionAccountRoutesApi();

  const body = {
    // string | Filter by address involved in the transaction. An account\'s address is considered to be involved in the transaction when the account is the sender, recipient, or it is required to cosign the transaction. This filter cannot be combined with ``recipientAddress`` and ``signerPublicKey`` query params.  (optional)
    address: address_example,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchAccountRestrictionsRequest;

  try {
    const data = await api.searchAccountRestrictions(body);
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
| **address** | `string` | Filter by address involved in the transaction. An account\&#39;s address is considered to be involved in the transaction when the account is the sender, recipient, or it is required to cosign the transaction. This filter cannot be combined with &#x60;&#x60;recipientAddress&#x60;&#x60; and &#x60;&#x60;signerPublicKey&#x60;&#x60; query params.  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**AccountRestrictionsPage**](AccountRestrictionsPage.md)

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

