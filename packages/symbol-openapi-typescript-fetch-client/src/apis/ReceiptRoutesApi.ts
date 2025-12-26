/* tslint:disable */
/* eslint-disable */
/**
 * Copyright © 2025 The Symbol Syndicate
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type {
  ModelError,
  Order,
  ReceiptTypeEnum,
  ResolutionStatementPage,
  TransactionStatementPage,
} from '../models/index.js';
import {
  ModelErrorFromJSON,
  ModelErrorToJSON,
  OrderFromJSON,
  OrderToJSON,
  ReceiptTypeEnumFromJSON,
  ReceiptTypeEnumToJSON,
  ResolutionStatementPageFromJSON,
  ResolutionStatementPageToJSON,
  TransactionStatementPageFromJSON,
  TransactionStatementPageToJSON,
} from '../models/index.js';
import * as runtime from '../runtime.js';

export interface SearchAddressResolutionStatementsRequest {
  height?: string;
  pageSize?: number;
  pageNumber?: number;
  offset?: string;
  order?: Order;
}

export interface SearchMosaicResolutionStatementsRequest {
  height?: string;
  pageSize?: number;
  pageNumber?: number;
  offset?: string;
  order?: Order;
}

export interface SearchReceiptsRequest {
  height?: string;
  fromHeight?: string;
  toHeight?: string;
  receiptType?: Array<ReceiptTypeEnum>;
  recipientAddress?: string;
  senderAddress?: string;
  targetAddress?: string;
  artifactId?: string;
  pageSize?: number;
  pageNumber?: number;
  offset?: string;
  order?: Order;
}

/**
 *
 */
export class ReceiptRoutesApi extends runtime.BaseAPI {
  /**
   * Gets an array of address resolution statements.
   * Get receipts address resolution statements
   */
  async searchAddressResolutionStatementsRaw(
    requestParameters: SearchAddressResolutionStatementsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ResolutionStatementPage>> {
    const queryParameters: any = {};

    if (requestParameters['height'] != null) {
      queryParameters['height'] = requestParameters['height'];
    }

    if (requestParameters['pageSize'] != null) {
      queryParameters['pageSize'] = requestParameters['pageSize'];
    }

    if (requestParameters['pageNumber'] != null) {
      queryParameters['pageNumber'] = requestParameters['pageNumber'];
    }

    if (requestParameters['offset'] != null) {
      queryParameters['offset'] = requestParameters['offset'];
    }

    if (requestParameters['order'] != null) {
      queryParameters['order'] = requestParameters['order'];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/statements/resolutions/address`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => ResolutionStatementPageFromJSON(jsonValue));
  }

  /**
   * Gets an array of address resolution statements.
   * Get receipts address resolution statements
   */
  async searchAddressResolutionStatements(
    requestParameters: SearchAddressResolutionStatementsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ResolutionStatementPage> {
    const response = await this.searchAddressResolutionStatementsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Gets an array of mosaic resolution statements.
   * Get receipts mosaic resolution statements
   */
  async searchMosaicResolutionStatementsRaw(
    requestParameters: SearchMosaicResolutionStatementsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ResolutionStatementPage>> {
    const queryParameters: any = {};

    if (requestParameters['height'] != null) {
      queryParameters['height'] = requestParameters['height'];
    }

    if (requestParameters['pageSize'] != null) {
      queryParameters['pageSize'] = requestParameters['pageSize'];
    }

    if (requestParameters['pageNumber'] != null) {
      queryParameters['pageNumber'] = requestParameters['pageNumber'];
    }

    if (requestParameters['offset'] != null) {
      queryParameters['offset'] = requestParameters['offset'];
    }

    if (requestParameters['order'] != null) {
      queryParameters['order'] = requestParameters['order'];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/statements/resolutions/mosaic`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => ResolutionStatementPageFromJSON(jsonValue));
  }

  /**
   * Gets an array of mosaic resolution statements.
   * Get receipts mosaic resolution statements
   */
  async searchMosaicResolutionStatements(
    requestParameters: SearchMosaicResolutionStatementsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ResolutionStatementPage> {
    const response = await this.searchMosaicResolutionStatementsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Gets an array of transaction statements.
   * Search transaction statements
   */
  async searchReceiptsRaw(
    requestParameters: SearchReceiptsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<TransactionStatementPage>> {
    const queryParameters: any = {};

    if (requestParameters['height'] != null) {
      queryParameters['height'] = requestParameters['height'];
    }

    if (requestParameters['fromHeight'] != null) {
      queryParameters['fromHeight'] = requestParameters['fromHeight'];
    }

    if (requestParameters['toHeight'] != null) {
      queryParameters['toHeight'] = requestParameters['toHeight'];
    }

    if (requestParameters['receiptType'] != null) {
      queryParameters['receiptType'] = requestParameters['receiptType'];
    }

    if (requestParameters['recipientAddress'] != null) {
      queryParameters['recipientAddress'] = requestParameters['recipientAddress'];
    }

    if (requestParameters['senderAddress'] != null) {
      queryParameters['senderAddress'] = requestParameters['senderAddress'];
    }

    if (requestParameters['targetAddress'] != null) {
      queryParameters['targetAddress'] = requestParameters['targetAddress'];
    }

    if (requestParameters['artifactId'] != null) {
      queryParameters['artifactId'] = requestParameters['artifactId'];
    }

    if (requestParameters['pageSize'] != null) {
      queryParameters['pageSize'] = requestParameters['pageSize'];
    }

    if (requestParameters['pageNumber'] != null) {
      queryParameters['pageNumber'] = requestParameters['pageNumber'];
    }

    if (requestParameters['offset'] != null) {
      queryParameters['offset'] = requestParameters['offset'];
    }

    if (requestParameters['order'] != null) {
      queryParameters['order'] = requestParameters['order'];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/statements/transaction`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TransactionStatementPageFromJSON(jsonValue));
  }

  /**
   * Gets an array of transaction statements.
   * Search transaction statements
   */
  async searchReceipts(
    requestParameters: SearchReceiptsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<TransactionStatementPage> {
    const response = await this.searchReceiptsRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
