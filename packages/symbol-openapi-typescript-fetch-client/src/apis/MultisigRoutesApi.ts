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
  MerkleStateInfoDTO,
  ModelError,
  MultisigAccountGraphInfoDTO,
  MultisigAccountInfoDTO,
} from '../models/index.js';
import {
  MerkleStateInfoDTOFromJSON,
  MerkleStateInfoDTOToJSON,
  ModelErrorFromJSON,
  ModelErrorToJSON,
  MultisigAccountGraphInfoDTOFromJSON,
  MultisigAccountGraphInfoDTOToJSON,
  MultisigAccountInfoDTOFromJSON,
  MultisigAccountInfoDTOToJSON,
} from '../models/index.js';
import * as runtime from '../runtime.js';

export interface GetAccountMultisigRequest {
  address: string;
}

export interface GetAccountMultisigGraphRequest {
  address: string;
}

export interface GetAccountMultisigMerkleRequest {
  address: string;
}

/**
 *
 */
export class MultisigRoutesApi extends runtime.BaseAPI {
  /**
   * Returns the multisig account information.
   * Get multisig account information
   */
  async getAccountMultisigRaw(
    requestParameters: GetAccountMultisigRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<MultisigAccountInfoDTO>> {
    if (requestParameters['address'] == null) {
      throw new runtime.RequiredError(
        'address',
        'Required parameter "address" was null or undefined when calling getAccountMultisig().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/account/{address}/multisig`;
    urlPath = urlPath.replace(`{${'address'}}`, encodeURIComponent(String(requestParameters['address'])));

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => MultisigAccountInfoDTOFromJSON(jsonValue));
  }

  /**
   * Returns the multisig account information.
   * Get multisig account information
   */
  async getAccountMultisig(
    requestParameters: GetAccountMultisigRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<MultisigAccountInfoDTO> {
    const response = await this.getAccountMultisigRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns the multisig account graph.
   * Get multisig account graph information
   */
  async getAccountMultisigGraphRaw(
    requestParameters: GetAccountMultisigGraphRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<MultisigAccountGraphInfoDTO>>> {
    if (requestParameters['address'] == null) {
      throw new runtime.RequiredError(
        'address',
        'Required parameter "address" was null or undefined when calling getAccountMultisigGraph().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/account/{address}/multisig/graph`;
    urlPath = urlPath.replace(`{${'address'}}`, encodeURIComponent(String(requestParameters['address'])));

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MultisigAccountGraphInfoDTOFromJSON));
  }

  /**
   * Returns the multisig account graph.
   * Get multisig account graph information
   */
  async getAccountMultisigGraph(
    requestParameters: GetAccountMultisigGraphRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<MultisigAccountGraphInfoDTO>> {
    const response = await this.getAccountMultisigGraphRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns the multisig account merkle information.
   * Get multisig account merkle information
   */
  async getAccountMultisigMerkleRaw(
    requestParameters: GetAccountMultisigMerkleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<MerkleStateInfoDTO>> {
    if (requestParameters['address'] == null) {
      throw new runtime.RequiredError(
        'address',
        'Required parameter "address" was null or undefined when calling getAccountMultisigMerkle().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/account/{address}/multisig/merkle`;
    urlPath = urlPath.replace(`{${'address'}}`, encodeURIComponent(String(requestParameters['address'])));

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
   * Returns the multisig account merkle information.
   * Get multisig account merkle information
   */
  async getAccountMultisigMerkle(
    requestParameters: GetAccountMultisigMerkleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<MerkleStateInfoDTO> {
    const response = await this.getAccountMultisigMerkleRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
