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
import type { HashLockInfoDTO, HashLockPage, MerkleStateInfoDTO, ModelError, Order } from '../models/index.js';
import {
  HashLockInfoDTOFromJSON,
  HashLockInfoDTOToJSON,
  HashLockPageFromJSON,
  HashLockPageToJSON,
  MerkleStateInfoDTOFromJSON,
  MerkleStateInfoDTOToJSON,
  ModelErrorFromJSON,
  ModelErrorToJSON,
  OrderFromJSON,
  OrderToJSON,
} from '../models/index.js';
import * as runtime from '../runtime.js';

export interface GetHashLockRequest {
  hash: string;
}

export interface GetHashLockMerkleRequest {
  hash: string;
}

export interface SearchHashLockRequest {
  address?: string;
  pageSize?: number;
  pageNumber?: number;
  offset?: string;
  order?: Order;
}

/**
 *
 */
export class HashLockRoutesApi extends runtime.BaseAPI {
  /**
   * Gets the hash lock for a given hash.
   * Get hash lock information
   */
  async getHashLockRaw(
    requestParameters: GetHashLockRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<HashLockInfoDTO>> {
    if (requestParameters['hash'] == null) {
      throw new runtime.RequiredError(
        'hash',
        'Required parameter "hash" was null or undefined when calling getHashLock().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/lock/hash/{hash}`;
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

    return new runtime.JSONApiResponse(response, (jsonValue) => HashLockInfoDTOFromJSON(jsonValue));
  }

  /**
   * Gets the hash lock for a given hash.
   * Get hash lock information
   */
  async getHashLock(
    requestParameters: GetHashLockRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<HashLockInfoDTO> {
    const response = await this.getHashLockRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Gets the hash lock merkle for a given hash.
   * Get hash lock merkle information
   */
  async getHashLockMerkleRaw(
    requestParameters: GetHashLockMerkleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<MerkleStateInfoDTO>> {
    if (requestParameters['hash'] == null) {
      throw new runtime.RequiredError(
        'hash',
        'Required parameter "hash" was null or undefined when calling getHashLockMerkle().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/lock/hash/{hash}/merkle`;
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

    return new runtime.JSONApiResponse(response, (jsonValue) => MerkleStateInfoDTOFromJSON(jsonValue));
  }

  /**
   * Gets the hash lock merkle for a given hash.
   * Get hash lock merkle information
   */
  async getHashLockMerkle(
    requestParameters: GetHashLockMerkleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<MerkleStateInfoDTO> {
    const response = await this.getHashLockMerkleRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns an array of hash locks.
   * Search hash lock entries
   */
  async searchHashLockRaw(
    requestParameters: SearchHashLockRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<HashLockPage>> {
    const queryParameters: any = {};

    if (requestParameters['address'] != null) {
      queryParameters['address'] = requestParameters['address'];
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

    let urlPath = `/lock/hash`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => HashLockPageFromJSON(jsonValue));
  }

  /**
   * Returns an array of hash locks.
   * Search hash lock entries
   */
  async searchHashLock(
    requestParameters: SearchHashLockRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<HashLockPage> {
    const response = await this.searchHashLockRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
