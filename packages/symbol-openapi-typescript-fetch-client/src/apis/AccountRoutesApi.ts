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
  AccountIds,
  AccountInfoDTO,
  AccountOrderByEnum,
  AccountPage,
  MerkleStateInfoDTO,
  ModelError,
  Order,
} from '../models/index.js';
import {
  AccountIdsFromJSON,
  AccountIdsToJSON,
  AccountInfoDTOFromJSON,
  AccountInfoDTOToJSON,
  AccountOrderByEnumFromJSON,
  AccountOrderByEnumToJSON,
  AccountPageFromJSON,
  AccountPageToJSON,
  MerkleStateInfoDTOFromJSON,
  MerkleStateInfoDTOToJSON,
  ModelErrorFromJSON,
  ModelErrorToJSON,
  OrderFromJSON,
  OrderToJSON,
} from '../models/index.js';
import * as runtime from '../runtime.js';

export interface GetAccountInfoRequest {
  accountId: string;
}

export interface GetAccountInfoMerkleRequest {
  accountId: string;
}

export interface GetAccountsInfoRequest {
  accountIds?: AccountIds;
}

export interface SearchAccountsRequest {
  pageSize?: number;
  pageNumber?: number;
  offset?: string;
  order?: Order;
  orderBy?: AccountOrderByEnum;
  mosaicId?: string;
}

/**
 *
 */
export class AccountRoutesApi extends runtime.BaseAPI {
  /**
   * Returns the account information.
   * Get account information
   */
  async getAccountInfoRaw(
    requestParameters: GetAccountInfoRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<AccountInfoDTO>> {
    if (requestParameters['accountId'] == null) {
      throw new runtime.RequiredError(
        'accountId',
        'Required parameter "accountId" was null or undefined when calling getAccountInfo().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/accounts/{accountId}`;
    urlPath = urlPath.replace(`{${'accountId'}}`, encodeURIComponent(String(requestParameters['accountId'])));

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => AccountInfoDTOFromJSON(jsonValue));
  }

  /**
   * Returns the account information.
   * Get account information
   */
  async getAccountInfo(
    requestParameters: GetAccountInfoRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<AccountInfoDTO> {
    const response = await this.getAccountInfoRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns the account merkle information.
   * Get account merkle information
   */
  async getAccountInfoMerkleRaw(
    requestParameters: GetAccountInfoMerkleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<MerkleStateInfoDTO>> {
    if (requestParameters['accountId'] == null) {
      throw new runtime.RequiredError(
        'accountId',
        'Required parameter "accountId" was null or undefined when calling getAccountInfoMerkle().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/accounts/{accountId}/merkle`;
    urlPath = urlPath.replace(`{${'accountId'}}`, encodeURIComponent(String(requestParameters['accountId'])));

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => MerkleStateInfoDTOFromJSON(jsonValue));
  }

  /**
   * Returns the account merkle information.
   * Get account merkle information
   */
  async getAccountInfoMerkle(
    requestParameters: GetAccountInfoMerkleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<MerkleStateInfoDTO> {
    const response = await this.getAccountInfoMerkleRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns the account information for an array of accounts.
   * Get accounts information
   */
  async getAccountsInfoRaw(
    requestParameters: GetAccountsInfoRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<AccountInfoDTO>>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    let urlPath = `/accounts`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: AccountIdsToJSON(requestParameters['accountIds']),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AccountInfoDTOFromJSON));
  }

  /**
   * Returns the account information for an array of accounts.
   * Get accounts information
   */
  async getAccountsInfo(
    requestParameters: GetAccountsInfoRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<AccountInfoDTO>> {
    const response = await this.getAccountsInfoRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Gets an array of accounts.
   * Search accounts
   */
  async searchAccountsRaw(
    requestParameters: SearchAccountsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<AccountPage>> {
    const queryParameters: any = {};

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

    if (requestParameters['orderBy'] != null) {
      queryParameters['orderBy'] = requestParameters['orderBy'];
    }

    if (requestParameters['mosaicId'] != null) {
      queryParameters['mosaicId'] = requestParameters['mosaicId'];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/accounts`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => AccountPageFromJSON(jsonValue));
  }

  /**
   * Gets an array of accounts.
   * Search accounts
   */
  async searchAccounts(
    requestParameters: SearchAccountsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<AccountPage> {
    const response = await this.searchAccountsRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
