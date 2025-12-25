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
  MosaicIds,
  MosaicInfoDTO,
  MosaicPage,
  Order,
} from '../models/index.js';
import {
    MerkleStateInfoDTOFromJSON,
    MerkleStateInfoDTOToJSON,
    ModelErrorFromJSON,
    ModelErrorToJSON,
    MosaicIdsFromJSON,
    MosaicIdsToJSON,
    MosaicInfoDTOFromJSON,
    MosaicInfoDTOToJSON,
    MosaicPageFromJSON,
    MosaicPageToJSON,
    OrderFromJSON,
    OrderToJSON,
} from '../models/index.js';

export interface GetMosaicRequest {
    mosaicId: string;
}

export interface GetMosaicMerkleRequest {
    mosaicId: string;
}

export interface GetMosaicsRequest {
    mosaicIds: MosaicIds;
}

export interface SearchMosaicsRequest {
    ownerAddress?: string;
    pageSize?: number;
    pageNumber?: number;
    offset?: string;
    order?: Order;
}

/**
 * 
 */
export class MosaicRoutesApi extends runtime.BaseAPI {

    /**
     * Gets the mosaic definition for a given mosaic identifier.
     * Get mosaic information
     */
    async getMosaicRaw(requestParameters: GetMosaicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MosaicInfoDTO>> {
        if (requestParameters['mosaicId'] == null) {
            throw new runtime.RequiredError(
                'mosaicId',
                'Required parameter "mosaicId" was null or undefined when calling getMosaic().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/mosaics/{mosaicId}`;
        urlPath = urlPath.replace(`{${"mosaicId"}}`, encodeURIComponent(String(requestParameters['mosaicId'])));

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MosaicInfoDTOFromJSON(jsonValue));
    }

    /**
     * Gets the mosaic definition for a given mosaic identifier.
     * Get mosaic information
     */
    async getMosaic(requestParameters: GetMosaicRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MosaicInfoDTO> {
        const response = await this.getMosaicRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Gets the mosaic definition merkle for a given mosaic identifier.
     * Get mosaic merkle information
     */
    async getMosaicMerkleRaw(requestParameters: GetMosaicMerkleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MerkleStateInfoDTO>> {
        if (requestParameters['mosaicId'] == null) {
            throw new runtime.RequiredError(
                'mosaicId',
                'Required parameter "mosaicId" was null or undefined when calling getMosaicMerkle().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/mosaics/{mosaicId}/merkle`;
        urlPath = urlPath.replace(`{${"mosaicId"}}`, encodeURIComponent(String(requestParameters['mosaicId'])));

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MerkleStateInfoDTOFromJSON(jsonValue));
    }

    /**
     * Gets the mosaic definition merkle for a given mosaic identifier.
     * Get mosaic merkle information
     */
    async getMosaicMerkle(requestParameters: GetMosaicMerkleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MerkleStateInfoDTO> {
        const response = await this.getMosaicMerkleRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Gets an array of mosaic definition.
     * Get mosaics information for an array of mosaics
     */
    async getMosaicsRaw(requestParameters: GetMosaicsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<MosaicInfoDTO>>> {
        if (requestParameters['mosaicIds'] == null) {
            throw new runtime.RequiredError(
                'mosaicIds',
                'Required parameter "mosaicIds" was null or undefined when calling getMosaics().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';


        let urlPath = `/mosaics`;

        const response = await this.request({
            path: urlPath,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MosaicIdsToJSON(requestParameters['mosaicIds']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MosaicInfoDTOFromJSON));
    }

    /**
     * Gets an array of mosaic definition.
     * Get mosaics information for an array of mosaics
     */
    async getMosaics(requestParameters: GetMosaicsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<MosaicInfoDTO>> {
        const response = await this.getMosaicsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Gets an array of mosaics.
     * Search mosaics
     */
    async searchMosaicsRaw(requestParameters: SearchMosaicsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MosaicPage>> {
        const queryParameters: any = {};

        if (requestParameters['ownerAddress'] != null) {
            queryParameters['ownerAddress'] = requestParameters['ownerAddress'];
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


        let urlPath = `/mosaics`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MosaicPageFromJSON(jsonValue));
    }

    /**
     * Gets an array of mosaics.
     * Search mosaics
     */
    async searchMosaics(requestParameters: SearchMosaicsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MosaicPage> {
        const response = await this.searchMosaicsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
