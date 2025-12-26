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
import type { ModelError, TransactionHashes, TransactionStatusDTO } from '../models/index.js';
import {
  ModelErrorFromJSON,
  ModelErrorToJSON,
  TransactionHashesFromJSON,
  TransactionHashesToJSON,
  TransactionStatusDTOFromJSON,
  TransactionStatusDTOToJSON,
} from '../models/index.js';
import * as runtime from '../runtime.js';

export interface GetTransactionStatusRequest {
  hash: string;
}

export interface GetTransactionStatusesRequest {
  transactionHashes: TransactionHashes;
}

/**
 *
 */
export class TransactionStatusRoutesApi extends runtime.BaseAPI {
  /**
   * Returns the transaction status for a given hash.
   * Get transaction status
   */
  async getTransactionStatusRaw(
    requestParameters: GetTransactionStatusRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<TransactionStatusDTO>> {
    if (requestParameters['hash'] == null) {
      throw new runtime.RequiredError(
        'hash',
        'Required parameter "hash" was null or undefined when calling getTransactionStatus().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/transactionStatus/{hash}`;
    urlPath = urlPath.replace(`{${'hash'}}`, encodeURIComponent(String(requestParameters['hash'])));

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TransactionStatusDTOFromJSON(jsonValue));
  }

  /**
   * Returns the transaction status for a given hash.
   * Get transaction status
   */
  async getTransactionStatus(
    requestParameters: GetTransactionStatusRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<TransactionStatusDTO> {
    const response = await this.getTransactionStatusRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns an array of transaction statuses for a given array of transaction hashes.
   * Get transaction statuses
   */
  async getTransactionStatusesRaw(
    requestParameters: GetTransactionStatusesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<TransactionStatusDTO>>> {
    if (requestParameters['transactionHashes'] == null) {
      throw new runtime.RequiredError(
        'transactionHashes',
        'Required parameter "transactionHashes" was null or undefined when calling getTransactionStatuses().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    let urlPath = `/transactionStatus`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: TransactionHashesToJSON(requestParameters['transactionHashes']),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TransactionStatusDTOFromJSON));
  }

  /**
   * Returns an array of transaction statuses for a given array of transaction hashes.
   * Get transaction statuses
   */
  async getTransactionStatuses(
    requestParameters: GetTransactionStatusesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<TransactionStatusDTO>> {
    const response = await this.getTransactionStatusesRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
