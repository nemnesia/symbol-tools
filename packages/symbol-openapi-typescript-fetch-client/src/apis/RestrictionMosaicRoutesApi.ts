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
  MosaicRestrictionDTO,
  MosaicRestrictionEntryTypeEnum,
  MosaicRestrictionsPage,
  Order,
} from '../models/index.js';
import {
  MerkleStateInfoDTOFromJSON,
  MerkleStateInfoDTOToJSON,
  ModelErrorFromJSON,
  ModelErrorToJSON,
  MosaicRestrictionDTOFromJSON,
  MosaicRestrictionDTOToJSON,
  MosaicRestrictionEntryTypeEnumFromJSON,
  MosaicRestrictionEntryTypeEnumToJSON,
  MosaicRestrictionsPageFromJSON,
  MosaicRestrictionsPageToJSON,
  OrderFromJSON,
  OrderToJSON,
} from '../models/index.js';
import * as runtime from '../runtime.js';

export interface GetMosaicRestrictionsRequest {
  compositeHash: string;
}

export interface GetMosaicRestrictionsMerkleRequest {
  compositeHash: string;
}

export interface SearchMosaicRestrictionsRequest {
  mosaicId?: string;
  entryType?: MosaicRestrictionEntryTypeEnum;
  targetAddress?: string;
  pageSize?: number;
  pageNumber?: number;
  offset?: string;
  order?: Order;
}

/**
 *
 */
export class RestrictionMosaicRoutesApi extends runtime.BaseAPI {
  /**
   * Returns the mosaic restrictions for a composite hash.
   * Get the mosaic restrictions
   */
  async getMosaicRestrictionsRaw(
    requestParameters: GetMosaicRestrictionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<MosaicRestrictionDTO>> {
    if (requestParameters['compositeHash'] == null) {
      throw new runtime.RequiredError(
        'compositeHash',
        'Required parameter "compositeHash" was null or undefined when calling getMosaicRestrictions().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/restrictions/mosaic/{compositeHash}`;
    urlPath = urlPath.replace(`{${'compositeHash'}}`, encodeURIComponent(String(requestParameters['compositeHash'])));

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => MosaicRestrictionDTOFromJSON(jsonValue));
  }

  /**
   * Returns the mosaic restrictions for a composite hash.
   * Get the mosaic restrictions
   */
  async getMosaicRestrictions(
    requestParameters: GetMosaicRestrictionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<MosaicRestrictionDTO> {
    const response = await this.getMosaicRestrictionsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns the mosaic restrictions merkle for a given composite hash.
   * Get the mosaic restrictions merkle
   */
  async getMosaicRestrictionsMerkleRaw(
    requestParameters: GetMosaicRestrictionsMerkleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<MerkleStateInfoDTO>> {
    if (requestParameters['compositeHash'] == null) {
      throw new runtime.RequiredError(
        'compositeHash',
        'Required parameter "compositeHash" was null or undefined when calling getMosaicRestrictionsMerkle().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/restrictions/mosaic/{compositeHash}/merkle`;
    urlPath = urlPath.replace(`{${'compositeHash'}}`, encodeURIComponent(String(requestParameters['compositeHash'])));

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
   * Returns the mosaic restrictions merkle for a given composite hash.
   * Get the mosaic restrictions merkle
   */
  async getMosaicRestrictionsMerkle(
    requestParameters: GetMosaicRestrictionsMerkleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<MerkleStateInfoDTO> {
    const response = await this.getMosaicRestrictionsMerkleRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns an array of mosaic restrictions.
   * Search mosaic restrictions
   */
  async searchMosaicRestrictionsRaw(
    requestParameters: SearchMosaicRestrictionsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<MosaicRestrictionsPage>> {
    const queryParameters: any = {};

    if (requestParameters['mosaicId'] != null) {
      queryParameters['mosaicId'] = requestParameters['mosaicId'];
    }

    if (requestParameters['entryType'] != null) {
      queryParameters['entryType'] = requestParameters['entryType'];
    }

    if (requestParameters['targetAddress'] != null) {
      queryParameters['targetAddress'] = requestParameters['targetAddress'];
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

    let urlPath = `/restrictions/mosaic`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => MosaicRestrictionsPageFromJSON(jsonValue));
  }

  /**
   * Returns an array of mosaic restrictions.
   * Search mosaic restrictions
   */
  async searchMosaicRestrictions(
    requestParameters: SearchMosaicRestrictionsRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<MosaicRestrictionsPage> {
    const response = await this.searchMosaicRestrictionsRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
