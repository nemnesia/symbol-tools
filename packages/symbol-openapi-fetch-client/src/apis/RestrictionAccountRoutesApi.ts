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
  AccountRestrictionsInfoDTO,
  AccountRestrictionsPage,
  MerkleStateInfoDTO,
  ModelError,
  Order,
} from '../models/index.js';
import {
    AccountRestrictionsInfoDTOFromJSON,
    AccountRestrictionsInfoDTOToJSON,
    AccountRestrictionsPageFromJSON,
    AccountRestrictionsPageToJSON,
    MerkleStateInfoDTOFromJSON,
    MerkleStateInfoDTOToJSON,
    ModelErrorFromJSON,
    ModelErrorToJSON,
    OrderFromJSON,
    OrderToJSON,
} from '../models/index.js';

export interface GetAccountRestrictionsRequest {
    address: string;
}

export interface GetAccountRestrictionsMerkleRequest {
    address: string;
}

export interface SearchAccountRestrictionsRequest {
    address?: string;
    pageSize?: number;
    pageNumber?: number;
    offset?: string;
    order?: Order;
}

/**
 * 
 */
export class RestrictionAccountRoutesApi extends runtime.BaseAPI {

    /**
     * Returns the account restrictions for a given address.
     * Get the account restrictions
     */
    async getAccountRestrictionsRaw(requestParameters: GetAccountRestrictionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountRestrictionsInfoDTO>> {
        if (requestParameters['address'] == null) {
            throw new runtime.RequiredError(
                'address',
                'Required parameter "address" was null or undefined when calling getAccountRestrictions().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/restrictions/account/{address}`;
        urlPath = urlPath.replace(`{${"address"}}`, encodeURIComponent(String(requestParameters['address'])));

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountRestrictionsInfoDTOFromJSON(jsonValue));
    }

    /**
     * Returns the account restrictions for a given address.
     * Get the account restrictions
     */
    async getAccountRestrictions(requestParameters: GetAccountRestrictionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountRestrictionsInfoDTO> {
        const response = await this.getAccountRestrictionsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns the account restrictions merkle for a given address.
     * Get the account restrictions merkle
     */
    async getAccountRestrictionsMerkleRaw(requestParameters: GetAccountRestrictionsMerkleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MerkleStateInfoDTO>> {
        if (requestParameters['address'] == null) {
            throw new runtime.RequiredError(
                'address',
                'Required parameter "address" was null or undefined when calling getAccountRestrictionsMerkle().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/restrictions/account/{address}/merkle`;
        urlPath = urlPath.replace(`{${"address"}}`, encodeURIComponent(String(requestParameters['address'])));

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MerkleStateInfoDTOFromJSON(jsonValue));
    }

    /**
     * Returns the account restrictions merkle for a given address.
     * Get the account restrictions merkle
     */
    async getAccountRestrictionsMerkle(requestParameters: GetAccountRestrictionsMerkleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MerkleStateInfoDTO> {
        const response = await this.getAccountRestrictionsMerkleRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns an array of account restrictions.
     * Search account restrictions
     */
    async searchAccountRestrictionsRaw(requestParameters: SearchAccountRestrictionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountRestrictionsPage>> {
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


        let urlPath = `/restrictions/account`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountRestrictionsPageFromJSON(jsonValue));
    }

    /**
     * Returns an array of account restrictions.
     * Search account restrictions
     */
    async searchAccountRestrictions(requestParameters: SearchAccountRestrictionsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountRestrictionsPage> {
        const response = await this.searchAccountRestrictionsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
