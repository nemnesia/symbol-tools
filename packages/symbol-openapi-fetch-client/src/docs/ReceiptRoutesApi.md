# ReceiptRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**searchAddressResolutionStatements**](ReceiptRoutesApi.md#searchaddressresolutionstatements) | **GET** /statements/resolutions/address | Get receipts address resolution statements |
| [**searchMosaicResolutionStatements**](ReceiptRoutesApi.md#searchmosaicresolutionstatements) | **GET** /statements/resolutions/mosaic | Get receipts mosaic resolution statements |
| [**searchReceipts**](ReceiptRoutesApi.md#searchreceipts) | **GET** /statements/transaction | Search transaction statements |



## searchAddressResolutionStatements

> ResolutionStatementPage searchAddressResolutionStatements(height, pageSize, pageNumber, offset, order)

Get receipts address resolution statements

Gets an array of address resolution statements.

### Example

```ts
import {
  Configuration,
  ReceiptRoutesApi,
} from '';
import type { SearchAddressResolutionStatementsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ReceiptRoutesApi();

  const body = {
    // string | Filter by block height. (optional)
    height: height_example,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchAddressResolutionStatementsRequest;

  try {
    const data = await api.searchAddressResolutionStatements(body);
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
| **height** | `string` | Filter by block height. | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**ResolutionStatementPage**](ResolutionStatementPage.md)

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


## searchMosaicResolutionStatements

> ResolutionStatementPage searchMosaicResolutionStatements(height, pageSize, pageNumber, offset, order)

Get receipts mosaic resolution statements

Gets an array of mosaic resolution statements.

### Example

```ts
import {
  Configuration,
  ReceiptRoutesApi,
} from '';
import type { SearchMosaicResolutionStatementsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ReceiptRoutesApi();

  const body = {
    // string | Filter by block height. (optional)
    height: height_example,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchMosaicResolutionStatementsRequest;

  try {
    const data = await api.searchMosaicResolutionStatements(body);
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
| **height** | `string` | Filter by block height. | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**ResolutionStatementPage**](ResolutionStatementPage.md)

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


## searchReceipts

> TransactionStatementPage searchReceipts(height, fromHeight, toHeight, receiptType, recipientAddress, senderAddress, targetAddress, artifactId, pageSize, pageNumber, offset, order)

Search transaction statements

Gets an array of transaction statements.

### Example

```ts
import {
  Configuration,
  ReceiptRoutesApi,
} from '';
import type { SearchReceiptsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ReceiptRoutesApi();

  const body = {
    // string | Filter by block height. (optional)
    height: height_example,
    // string | Only blocks with height greater or equal than this one are returned. (optional)
    fromHeight: fromHeight_example,
    // string | Only blocks with height smaller or equal than this one are returned. (optional)
    toHeight: toHeight_example,
    // Array<ReceiptTypeEnum> | Filter by receipt type. To filter by multiple receipt types, add more filter query params like: ``receiptType=8515&receiptType=20803``.  (optional)
    receiptType: ...,
    // string | Filter by address of the account receiving the transaction. (optional)
    recipientAddress: recipientAddress_example,
    // string | Filter by address sending mosaics. (optional)
    senderAddress: senderAddress_example,
    // string | Filter by target address. (optional)
    targetAddress: targetAddress_example,
    // string | Mosaic or namespace identifier (optional)
    artifactId: artifactId_example,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchReceiptsRequest;

  try {
    const data = await api.searchReceipts(body);
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
| **height** | `string` | Filter by block height. | [Optional] [Defaults to `undefined`] |
| **fromHeight** | `string` | Only blocks with height greater or equal than this one are returned. | [Optional] [Defaults to `undefined`] |
| **toHeight** | `string` | Only blocks with height smaller or equal than this one are returned. | [Optional] [Defaults to `undefined`] |
| **receiptType** | `Array<ReceiptTypeEnum>` | Filter by receipt type. To filter by multiple receipt types, add more filter query params like: &#x60;&#x60;receiptType&#x3D;8515&amp;receiptType&#x3D;20803&#x60;&#x60;.  | [Optional] |
| **recipientAddress** | `string` | Filter by address of the account receiving the transaction. | [Optional] [Defaults to `undefined`] |
| **senderAddress** | `string` | Filter by address sending mosaics. | [Optional] [Defaults to `undefined`] |
| **targetAddress** | `string` | Filter by target address. | [Optional] [Defaults to `undefined`] |
| **artifactId** | `string` | Mosaic or namespace identifier | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**TransactionStatementPage**](TransactionStatementPage.md)

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

