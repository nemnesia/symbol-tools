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


import * as runtime from '../runtime.js';
import type {
  MerkleStateInfoDTO,
  ModelError,
  Order,
  SecretLockInfoDTO,
  SecretLockPage,
} from '../models/index.js';
import {
    MerkleStateInfoDTOFromJSON,
    MerkleStateInfoDTOToJSON,
    ModelErrorFromJSON,
    ModelErrorToJSON,
    OrderFromJSON,
    OrderToJSON,
    SecretLockInfoDTOFromJSON,
    SecretLockInfoDTOToJSON,
    SecretLockPageFromJSON,
    SecretLockPageToJSON,
} from '../models/index.js';

export interface GetSecretLockRequest {
    compositeHash: string;
}

export interface GetSecretLockMerkleRequest {
    compositeHash: string;
}

export interface SearchSecretLockRequest {
    address?: string;
    secret?: string;
    pageSize?: number;
    pageNumber?: number;
    offset?: string;
    order?: Order;
}

/**
 * 
 */
export class SecretLockRoutesApi extends runtime.BaseAPI {

    /**
     * Gets the hash lock for a given composite hash.
     * Get secret lock information
     */
    async getSecretLockRaw(requestParameters: GetSecretLockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SecretLockInfoDTO>> {
        if (requestParameters['compositeHash'] == null) {
            throw new runtime.RequiredError(
                'compositeHash',
                'Required parameter "compositeHash" was null or undefined when calling getSecretLock().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/lock/secret/{compositeHash}`;
        urlPath = urlPath.replace(`{${"compositeHash"}}`, encodeURIComponent(String(requestParameters['compositeHash'])));

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SecretLockInfoDTOFromJSON(jsonValue));
    }

    /**
     * Gets the hash lock for a given composite hash.
     * Get secret lock information
     */
    async getSecretLock(requestParameters: GetSecretLockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SecretLockInfoDTO> {
        const response = await this.getSecretLockRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Gets the hash lock merkle for a given composite hash.
     * Get secret lock merkle information
     */
    async getSecretLockMerkleRaw(requestParameters: GetSecretLockMerkleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MerkleStateInfoDTO>> {
        if (requestParameters['compositeHash'] == null) {
            throw new runtime.RequiredError(
                'compositeHash',
                'Required parameter "compositeHash" was null or undefined when calling getSecretLockMerkle().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/lock/secret/{compositeHash}/merkle`;
        urlPath = urlPath.replace(`{${"compositeHash"}}`, encodeURIComponent(String(requestParameters['compositeHash'])));

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MerkleStateInfoDTOFromJSON(jsonValue));
    }

    /**
     * Gets the hash lock merkle for a given composite hash.
     * Get secret lock merkle information
     */
    async getSecretLockMerkle(requestParameters: GetSecretLockMerkleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MerkleStateInfoDTO> {
        const response = await this.getSecretLockMerkleRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns an array of secret locks.
     * Search secret lock entries
     */
    async searchSecretLockRaw(requestParameters: SearchSecretLockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SecretLockPage>> {
        const queryParameters: any = {};

        if (requestParameters['address'] != null) {
            queryParameters['address'] = requestParameters['address'];
        }

        if (requestParameters['secret'] != null) {
            queryParameters['secret'] = requestParameters['secret'];
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


        let urlPath = `/lock/secret`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SecretLockPageFromJSON(jsonValue));
    }

    /**
     * Returns an array of secret locks.
     * Search secret lock entries
     */
    async searchSecretLock(requestParameters: SearchSecretLockRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SecretLockPage> {
        const response = await this.searchSecretLockRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
