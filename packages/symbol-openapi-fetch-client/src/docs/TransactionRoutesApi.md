# TransactionRoutesApi

All URIs are relative to *https://reference.symboltest.net:3001*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**announceCosignatureTransaction**](TransactionRoutesApi.md#announcecosignaturetransaction) | **PUT** /transactions/cosignature | Announce a cosignature transaction |
| [**announcePartialTransaction**](TransactionRoutesApi.md#announcepartialtransaction) | **PUT** /transactions/partial | Announce an aggregate bonded transaction |
| [**announceTransaction**](TransactionRoutesApi.md#announcetransaction) | **PUT** /transactions | Announce a new transaction |
| [**getConfirmedTransaction**](TransactionRoutesApi.md#getconfirmedtransaction) | **GET** /transactions/confirmed/{transactionId} | Get confirmed transaction information |
| [**getConfirmedTransactions**](TransactionRoutesApi.md#getconfirmedtransactions) | **POST** /transactions/confirmed | Get confirmed trasactions information |
| [**getPartialTransaction**](TransactionRoutesApi.md#getpartialtransaction) | **GET** /transactions/partial/{transactionId} | Get partial transaction information |
| [**getPartialTransactions**](TransactionRoutesApi.md#getpartialtransactions) | **POST** /transactions/partial | Get partial trasactions information |
| [**getUnconfirmedTransaction**](TransactionRoutesApi.md#getunconfirmedtransaction) | **GET** /transactions/unconfirmed/{transactionId} | Get unconfirmed transaction information |
| [**getUnconfirmedTransactions**](TransactionRoutesApi.md#getunconfirmedtransactions) | **POST** /transactions/unconfirmed | Get unconfirmed trasactions information |
| [**searchConfirmedTransactions**](TransactionRoutesApi.md#searchconfirmedtransactions) | **GET** /transactions/confirmed | Search confirmed transactions |
| [**searchPartialTransactions**](TransactionRoutesApi.md#searchpartialtransactions) | **GET** /transactions/partial | Search partial transactions |
| [**searchUnconfirmedTransactions**](TransactionRoutesApi.md#searchunconfirmedtransactions) | **GET** /transactions/unconfirmed | Search unconfirmed transactions |



## announceCosignatureTransaction

> AnnounceTransactionInfoDTO announceCosignatureTransaction(cosignature)

Announce a cosignature transaction

Announces a cosignature transaction to the network.

### Example

```ts
import {
  Configuration,
  TransactionRoutesApi,
} from '';
import type { AnnounceCosignatureTransactionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionRoutesApi();

  const body = {
    // Cosignature
    cosignature: ...,
  } satisfies AnnounceCosignatureTransactionRequest;

  try {
    const data = await api.announceCosignatureTransaction(body);
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
| **cosignature** | [Cosignature](Cosignature.md) |  | |

### Return type

[**AnnounceTransactionInfoDTO**](AnnounceTransactionInfoDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | success |  -  |
| **400** | InvalidContent |  -  |
| **409** | InvalidArgument |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## announcePartialTransaction

> AnnounceTransactionInfoDTO announcePartialTransaction(transactionPayload)

Announce an aggregate bonded transaction

Announces an aggregate bonded transaction to the network.

### Example

```ts
import {
  Configuration,
  TransactionRoutesApi,
} from '';
import type { AnnouncePartialTransactionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionRoutesApi();

  const body = {
    // TransactionPayload
    transactionPayload: ...,
  } satisfies AnnouncePartialTransactionRequest;

  try {
    const data = await api.announcePartialTransaction(body);
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
| **transactionPayload** | [TransactionPayload](TransactionPayload.md) |  | |

### Return type

[**AnnounceTransactionInfoDTO**](AnnounceTransactionInfoDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | success |  -  |
| **400** | InvalidContent |  -  |
| **409** | InvalidArgument |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## announceTransaction

> AnnounceTransactionInfoDTO announceTransaction(transactionPayload)

Announce a new transaction

Announces a transaction to the network. The [catbuffer library](https://github.com/nemtech/catbuffer) defines the protocol to serialize and deserialize Symbol entities. Catbuffers are integrated into [Symbol SDKs](https://nemtech.github.io/sdk.html). It\&#39;s recommended to use SDKs instead of calling the API endpoint directly to announce transactions. 

### Example

```ts
import {
  Configuration,
  TransactionRoutesApi,
} from '';
import type { AnnounceTransactionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionRoutesApi();

  const body = {
    // TransactionPayload
    transactionPayload: ...,
  } satisfies AnnounceTransactionRequest;

  try {
    const data = await api.announceTransaction(body);
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
| **transactionPayload** | [TransactionPayload](TransactionPayload.md) |  | |

### Return type

[**AnnounceTransactionInfoDTO**](AnnounceTransactionInfoDTO.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | success |  -  |
| **400** | InvalidContent |  -  |
| **409** | InvalidArgument |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getConfirmedTransaction

> TransactionInfoDTO getConfirmedTransaction(transactionId)

Get confirmed transaction information

Returns confirmed transaction information given a transactionId or hash.

### Example

```ts
import {
  Configuration,
  TransactionRoutesApi,
} from '';
import type { GetConfirmedTransactionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionRoutesApi();

  const body = {
    // string | Transaction id or hash.
    transactionId: transactionId_example,
  } satisfies GetConfirmedTransactionRequest;

  try {
    const data = await api.getConfirmedTransaction(body);
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
| **transactionId** | `string` | Transaction id or hash. | [Defaults to `undefined`] |

### Return type

[**TransactionInfoDTO**](TransactionInfoDTO.md)

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


## getConfirmedTransactions

> Array&lt;TransactionInfoDTO&gt; getConfirmedTransactions(transactionIds)

Get confirmed trasactions information

Returns confirmed transactions information for a given array of transactionIds.

### Example

```ts
import {
  Configuration,
  TransactionRoutesApi,
} from '';
import type { GetConfirmedTransactionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionRoutesApi();

  const body = {
    // TransactionIds
    transactionIds: ...,
  } satisfies GetConfirmedTransactionsRequest;

  try {
    const data = await api.getConfirmedTransactions(body);
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
| **transactionIds** | [TransactionIds](TransactionIds.md) |  | |

### Return type

[**Array&lt;TransactionInfoDTO&gt;**](TransactionInfoDTO.md)

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


## getPartialTransaction

> TransactionInfoDTO getPartialTransaction(transactionId)

Get partial transaction information

Returns partial transaction information given a transactionId or hash.

### Example

```ts
import {
  Configuration,
  TransactionRoutesApi,
} from '';
import type { GetPartialTransactionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionRoutesApi();

  const body = {
    // string | Transaction id or hash.
    transactionId: transactionId_example,
  } satisfies GetPartialTransactionRequest;

  try {
    const data = await api.getPartialTransaction(body);
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
| **transactionId** | `string` | Transaction id or hash. | [Defaults to `undefined`] |

### Return type

[**TransactionInfoDTO**](TransactionInfoDTO.md)

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


## getPartialTransactions

> Array&lt;TransactionInfoDTO&gt; getPartialTransactions(transactionIds)

Get partial trasactions information

Returns partial transactions information for a given array of transactionIds.

### Example

```ts
import {
  Configuration,
  TransactionRoutesApi,
} from '';
import type { GetPartialTransactionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionRoutesApi();

  const body = {
    // TransactionIds
    transactionIds: ...,
  } satisfies GetPartialTransactionsRequest;

  try {
    const data = await api.getPartialTransactions(body);
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
| **transactionIds** | [TransactionIds](TransactionIds.md) |  | |

### Return type

[**Array&lt;TransactionInfoDTO&gt;**](TransactionInfoDTO.md)

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


## getUnconfirmedTransaction

> TransactionInfoDTO getUnconfirmedTransaction(transactionId)

Get unconfirmed transaction information

Returns unconfirmed transaction information given a transactionId or hash.

### Example

```ts
import {
  Configuration,
  TransactionRoutesApi,
} from '';
import type { GetUnconfirmedTransactionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionRoutesApi();

  const body = {
    // string | Transaction id or hash.
    transactionId: transactionId_example,
  } satisfies GetUnconfirmedTransactionRequest;

  try {
    const data = await api.getUnconfirmedTransaction(body);
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
| **transactionId** | `string` | Transaction id or hash. | [Defaults to `undefined`] |

### Return type

[**TransactionInfoDTO**](TransactionInfoDTO.md)

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


## getUnconfirmedTransactions

> Array&lt;TransactionInfoDTO&gt; getUnconfirmedTransactions(transactionIds)

Get unconfirmed trasactions information

Returns unconfirmed transactions information for a given array of transactionIds.

### Example

```ts
import {
  Configuration,
  TransactionRoutesApi,
} from '';
import type { GetUnconfirmedTransactionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionRoutesApi();

  const body = {
    // TransactionIds
    transactionIds: ...,
  } satisfies GetUnconfirmedTransactionsRequest;

  try {
    const data = await api.getUnconfirmedTransactions(body);
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
| **transactionIds** | [TransactionIds](TransactionIds.md) |  | |

### Return type

[**Array&lt;TransactionInfoDTO&gt;**](TransactionInfoDTO.md)

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


## searchConfirmedTransactions

> TransactionPage searchConfirmedTransactions(address, recipientAddress, signerPublicKey, height, fromHeight, toHeight, fromTransferAmount, toTransferAmount, type, embedded, transferMosaicId, pageSize, pageNumber, offset, order)

Search confirmed transactions

Returns an array of confirmed transactions. If a transaction was announced with an alias rather than an address, the address that will be considered when querying is the one that was resolved from the alias at confirmation time. 

### Example

```ts
import {
  Configuration,
  TransactionRoutesApi,
} from '';
import type { SearchConfirmedTransactionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionRoutesApi();

  const body = {
    // string | Filter by address involved in the transaction. An account\'s address is considered to be involved in the transaction when the account is the sender, recipient, or it is required to cosign the transaction. This filter cannot be combined with ``recipientAddress`` and ``signerPublicKey`` query params.  (optional)
    address: address_example,
    // string | Filter by address of the account receiving the transaction. (optional)
    recipientAddress: recipientAddress_example,
    // string | Filter by public key of the account signing the entity. (optional)
    signerPublicKey: signerPublicKey_example,
    // string | Filter by block height. (optional)
    height: height_example,
    // string | Only blocks with height greater or equal than this one are returned. (optional)
    fromHeight: fromHeight_example,
    // string | Only blocks with height smaller or equal than this one are returned. (optional)
    toHeight: toHeight_example,
    // string | Requires providing the `transferMosaicId` filter. Only transfer transactions with a transfer amount of the provided mosaic id, greater or equal than this amount are returned.  (optional)
    fromTransferAmount: fromTransferAmount_example,
    // string | Requires providing the `transferMosaicId` filter. Only transfer transactions with a transfer amount of the provided mosaic id, lesser or equal than this amount are returned.  (optional)
    toTransferAmount: toTransferAmount_example,
    // Array<TransactionTypeEnum> | Filter by transaction type. To filter by multiple transaction types, add more filter query params like: ``type=16974&type=16718``.  (optional)
    type: ...,
    // boolean | When true, the endpoint also returns all the embedded aggregate transactions. Otherwise, only top-level transactions used to calculate the block transactionsHash are returned. **Note:** This field does not work when combined with the ``address`` parameter. This is, embedded transactions containing the address specified through the ``address`` parameter will not be returned even when used with ``embedded=true``. There is no problem when using other parameters like ``recipientAddress`` instead.  (optional)
    embedded: true,
    // string | Filters transactions involving a specific ``mosaicId``. (optional)
    transferMosaicId: transferMosaicId_example,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchConfirmedTransactionsRequest;

  try {
    const data = await api.searchConfirmedTransactions(body);
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
| **recipientAddress** | `string` | Filter by address of the account receiving the transaction. | [Optional] [Defaults to `undefined`] |
| **signerPublicKey** | `string` | Filter by public key of the account signing the entity. | [Optional] [Defaults to `undefined`] |
| **height** | `string` | Filter by block height. | [Optional] [Defaults to `undefined`] |
| **fromHeight** | `string` | Only blocks with height greater or equal than this one are returned. | [Optional] [Defaults to `undefined`] |
| **toHeight** | `string` | Only blocks with height smaller or equal than this one are returned. | [Optional] [Defaults to `undefined`] |
| **fromTransferAmount** | `string` | Requires providing the &#x60;transferMosaicId&#x60; filter. Only transfer transactions with a transfer amount of the provided mosaic id, greater or equal than this amount are returned.  | [Optional] [Defaults to `undefined`] |
| **toTransferAmount** | `string` | Requires providing the &#x60;transferMosaicId&#x60; filter. Only transfer transactions with a transfer amount of the provided mosaic id, lesser or equal than this amount are returned.  | [Optional] [Defaults to `undefined`] |
| **type** | `Array<TransactionTypeEnum>` | Filter by transaction type. To filter by multiple transaction types, add more filter query params like: &#x60;&#x60;type&#x3D;16974&amp;type&#x3D;16718&#x60;&#x60;.  | [Optional] |
| **embedded** | `boolean` | When true, the endpoint also returns all the embedded aggregate transactions. Otherwise, only top-level transactions used to calculate the block transactionsHash are returned. **Note:** This field does not work when combined with the &#x60;&#x60;address&#x60;&#x60; parameter. This is, embedded transactions containing the address specified through the &#x60;&#x60;address&#x60;&#x60; parameter will not be returned even when used with &#x60;&#x60;embedded&#x3D;true&#x60;&#x60;. There is no problem when using other parameters like &#x60;&#x60;recipientAddress&#x60;&#x60; instead.  | [Optional] [Defaults to `false`] |
| **transferMosaicId** | `string` | Filters transactions involving a specific &#x60;&#x60;mosaicId&#x60;&#x60;. | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**TransactionPage**](TransactionPage.md)

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


## searchPartialTransactions

> TransactionPage searchPartialTransactions(address, recipientAddress, signerPublicKey, height, fromHeight, toHeight, fromTransferAmount, toTransferAmount, type, embedded, transferMosaicId, pageSize, pageNumber, offset, order)

Search partial transactions

Returns an array of partial transactions.

### Example

```ts
import {
  Configuration,
  TransactionRoutesApi,
} from '';
import type { SearchPartialTransactionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionRoutesApi();

  const body = {
    // string | Filter by address involved in the transaction. An account\'s address is considered to be involved in the transaction when the account is the sender, recipient, or it is required to cosign the transaction. This filter cannot be combined with ``recipientAddress`` and ``signerPublicKey`` query params.  (optional)
    address: address_example,
    // string | Filter by address of the account receiving the transaction. (optional)
    recipientAddress: recipientAddress_example,
    // string | Filter by public key of the account signing the entity. (optional)
    signerPublicKey: signerPublicKey_example,
    // string | Filter by block height. (optional)
    height: height_example,
    // string | Only blocks with height greater or equal than this one are returned. (optional)
    fromHeight: fromHeight_example,
    // string | Only blocks with height smaller or equal than this one are returned. (optional)
    toHeight: toHeight_example,
    // string | Requires providing the `transferMosaicId` filter. Only transfer transactions with a transfer amount of the provided mosaic id, greater or equal than this amount are returned.  (optional)
    fromTransferAmount: fromTransferAmount_example,
    // string | Requires providing the `transferMosaicId` filter. Only transfer transactions with a transfer amount of the provided mosaic id, lesser or equal than this amount are returned.  (optional)
    toTransferAmount: toTransferAmount_example,
    // Array<TransactionTypeEnum> | Filter by transaction type. To filter by multiple transaction types, add more filter query params like: ``type=16974&type=16718``.  (optional)
    type: ...,
    // boolean | When true, the endpoint also returns all the embedded aggregate transactions. Otherwise, only top-level transactions used to calculate the block transactionsHash are returned. **Note:** This field does not work when combined with the ``address`` parameter. This is, embedded transactions containing the address specified through the ``address`` parameter will not be returned even when used with ``embedded=true``. There is no problem when using other parameters like ``recipientAddress`` instead.  (optional)
    embedded: true,
    // string | Filters transactions involving a specific ``mosaicId``. (optional)
    transferMosaicId: transferMosaicId_example,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchPartialTransactionsRequest;

  try {
    const data = await api.searchPartialTransactions(body);
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
| **recipientAddress** | `string` | Filter by address of the account receiving the transaction. | [Optional] [Defaults to `undefined`] |
| **signerPublicKey** | `string` | Filter by public key of the account signing the entity. | [Optional] [Defaults to `undefined`] |
| **height** | `string` | Filter by block height. | [Optional] [Defaults to `undefined`] |
| **fromHeight** | `string` | Only blocks with height greater or equal than this one are returned. | [Optional] [Defaults to `undefined`] |
| **toHeight** | `string` | Only blocks with height smaller or equal than this one are returned. | [Optional] [Defaults to `undefined`] |
| **fromTransferAmount** | `string` | Requires providing the &#x60;transferMosaicId&#x60; filter. Only transfer transactions with a transfer amount of the provided mosaic id, greater or equal than this amount are returned.  | [Optional] [Defaults to `undefined`] |
| **toTransferAmount** | `string` | Requires providing the &#x60;transferMosaicId&#x60; filter. Only transfer transactions with a transfer amount of the provided mosaic id, lesser or equal than this amount are returned.  | [Optional] [Defaults to `undefined`] |
| **type** | `Array<TransactionTypeEnum>` | Filter by transaction type. To filter by multiple transaction types, add more filter query params like: &#x60;&#x60;type&#x3D;16974&amp;type&#x3D;16718&#x60;&#x60;.  | [Optional] |
| **embedded** | `boolean` | When true, the endpoint also returns all the embedded aggregate transactions. Otherwise, only top-level transactions used to calculate the block transactionsHash are returned. **Note:** This field does not work when combined with the &#x60;&#x60;address&#x60;&#x60; parameter. This is, embedded transactions containing the address specified through the &#x60;&#x60;address&#x60;&#x60; parameter will not be returned even when used with &#x60;&#x60;embedded&#x3D;true&#x60;&#x60;. There is no problem when using other parameters like &#x60;&#x60;recipientAddress&#x60;&#x60; instead.  | [Optional] [Defaults to `false`] |
| **transferMosaicId** | `string` | Filters transactions involving a specific &#x60;&#x60;mosaicId&#x60;&#x60;. | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**TransactionPage**](TransactionPage.md)

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


## searchUnconfirmedTransactions

> TransactionPage searchUnconfirmedTransactions(address, recipientAddress, signerPublicKey, height, fromHeight, toHeight, fromTransferAmount, toTransferAmount, type, embedded, transferMosaicId, pageSize, pageNumber, offset, order)

Search unconfirmed transactions

Returns an array of unconfirmed transactions.

### Example

```ts
import {
  Configuration,
  TransactionRoutesApi,
} from '';
import type { SearchUnconfirmedTransactionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TransactionRoutesApi();

  const body = {
    // string | Filter by address involved in the transaction. An account\'s address is considered to be involved in the transaction when the account is the sender, recipient, or it is required to cosign the transaction. This filter cannot be combined with ``recipientAddress`` and ``signerPublicKey`` query params.  (optional)
    address: address_example,
    // string | Filter by address of the account receiving the transaction. (optional)
    recipientAddress: recipientAddress_example,
    // string | Filter by public key of the account signing the entity. (optional)
    signerPublicKey: signerPublicKey_example,
    // string | Filter by block height. (optional)
    height: height_example,
    // string | Only blocks with height greater or equal than this one are returned. (optional)
    fromHeight: fromHeight_example,
    // string | Only blocks with height smaller or equal than this one are returned. (optional)
    toHeight: toHeight_example,
    // string | Requires providing the `transferMosaicId` filter. Only transfer transactions with a transfer amount of the provided mosaic id, greater or equal than this amount are returned.  (optional)
    fromTransferAmount: fromTransferAmount_example,
    // string | Requires providing the `transferMosaicId` filter. Only transfer transactions with a transfer amount of the provided mosaic id, lesser or equal than this amount are returned.  (optional)
    toTransferAmount: toTransferAmount_example,
    // Array<TransactionTypeEnum> | Filter by transaction type. To filter by multiple transaction types, add more filter query params like: ``type=16974&type=16718``.  (optional)
    type: ...,
    // boolean | When true, the endpoint also returns all the embedded aggregate transactions. Otherwise, only top-level transactions used to calculate the block transactionsHash are returned. **Note:** This field does not work when combined with the ``address`` parameter. This is, embedded transactions containing the address specified through the ``address`` parameter will not be returned even when used with ``embedded=true``. There is no problem when using other parameters like ``recipientAddress`` instead.  (optional)
    embedded: true,
    // string | Filters transactions involving a specific ``mosaicId``. (optional)
    transferMosaicId: transferMosaicId_example,
    // number | Select the number of entries to return. (optional)
    pageSize: 56,
    // number | Filter by page number. (optional)
    pageNumber: 56,
    // string | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  (optional)
    offset: offset_example,
    // Order | Sort responses in ascending or descending order based on the collection property set on the param ``orderBy``. If the request does not specify ``orderBy``, REST returns the collection ordered by id.  (optional)
    order: ...,
  } satisfies SearchUnconfirmedTransactionsRequest;

  try {
    const data = await api.searchUnconfirmedTransactions(body);
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
| **recipientAddress** | `string` | Filter by address of the account receiving the transaction. | [Optional] [Defaults to `undefined`] |
| **signerPublicKey** | `string` | Filter by public key of the account signing the entity. | [Optional] [Defaults to `undefined`] |
| **height** | `string` | Filter by block height. | [Optional] [Defaults to `undefined`] |
| **fromHeight** | `string` | Only blocks with height greater or equal than this one are returned. | [Optional] [Defaults to `undefined`] |
| **toHeight** | `string` | Only blocks with height smaller or equal than this one are returned. | [Optional] [Defaults to `undefined`] |
| **fromTransferAmount** | `string` | Requires providing the &#x60;transferMosaicId&#x60; filter. Only transfer transactions with a transfer amount of the provided mosaic id, greater or equal than this amount are returned.  | [Optional] [Defaults to `undefined`] |
| **toTransferAmount** | `string` | Requires providing the &#x60;transferMosaicId&#x60; filter. Only transfer transactions with a transfer amount of the provided mosaic id, lesser or equal than this amount are returned.  | [Optional] [Defaults to `undefined`] |
| **type** | `Array<TransactionTypeEnum>` | Filter by transaction type. To filter by multiple transaction types, add more filter query params like: &#x60;&#x60;type&#x3D;16974&amp;type&#x3D;16718&#x60;&#x60;.  | [Optional] |
| **embedded** | `boolean` | When true, the endpoint also returns all the embedded aggregate transactions. Otherwise, only top-level transactions used to calculate the block transactionsHash are returned. **Note:** This field does not work when combined with the &#x60;&#x60;address&#x60;&#x60; parameter. This is, embedded transactions containing the address specified through the &#x60;&#x60;address&#x60;&#x60; parameter will not be returned even when used with &#x60;&#x60;embedded&#x3D;true&#x60;&#x60;. There is no problem when using other parameters like &#x60;&#x60;recipientAddress&#x60;&#x60; instead.  | [Optional] [Defaults to `false`] |
| **transferMosaicId** | `string` | Filters transactions involving a specific &#x60;&#x60;mosaicId&#x60;&#x60;. | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` | Select the number of entries to return. | [Optional] [Defaults to `10`] |
| **pageNumber** | `number` | Filter by page number. | [Optional] [Defaults to `1`] |
| **offset** | `string` | Entry id at which to start pagination. If the ordering parameter is set to -id, the elements returned precede the identifier. Otherwise, newer elements with respect to the id are returned.  | [Optional] [Defaults to `undefined`] |
| **order** | `Order` | Sort responses in ascending or descending order based on the collection property set on the param &#x60;&#x60;orderBy&#x60;&#x60;. If the request does not specify &#x60;&#x60;orderBy&#x60;&#x60;, REST returns the collection ordered by id.  | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |

### Return type

[**TransactionPage**](TransactionPage.md)

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

