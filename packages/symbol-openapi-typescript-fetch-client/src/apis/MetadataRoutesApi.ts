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
  MetadataInfoDTO,
  MetadataPage,
  MetadataTypeEnum,
  ModelError,
  Order,
} from '../models/index.js';
import {
  MerkleStateInfoDTOFromJSON,
  MerkleStateInfoDTOToJSON,
  MetadataInfoDTOFromJSON,
  MetadataInfoDTOToJSON,
  MetadataPageFromJSON,
  MetadataPageToJSON,
  MetadataTypeEnumFromJSON,
  MetadataTypeEnumToJSON,
  ModelErrorFromJSON,
  ModelErrorToJSON,
  OrderFromJSON,
  OrderToJSON,
} from '../models/index.js';
import * as runtime from '../runtime.js';

export interface GetMetadataRequest {
  compositeHash: string;
}

export interface GetMetadataMerkleRequest {
  compositeHash: string;
}

export interface SearchMetadataEntriesRequest {
  sourceAddress?: string;
  targetAddress?: string;
  scopedMetadataKey?: string;
  targetId?: string;
  metadataType?: MetadataTypeEnum;
  pageSize?: number;
  pageNumber?: number;
  offset?: string;
  order?: Order;
}

/**
 *
 */
export class MetadataRoutesApi extends runtime.BaseAPI {
  /**
   * Gets the metadata for a given composite hash.
   * Get metadata information
   */
  async getMetadataRaw(
    requestParameters: GetMetadataRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<MetadataInfoDTO>> {
    if (requestParameters['compositeHash'] == null) {
      throw new runtime.RequiredError(
        'compositeHash',
        'Required parameter "compositeHash" was null or undefined when calling getMetadata().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/metadata/{compositeHash}`;
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

    return new runtime.JSONApiResponse(response, (jsonValue) => MetadataInfoDTOFromJSON(jsonValue));
  }

  /**
   * Gets the metadata for a given composite hash.
   * Get metadata information
   */
  async getMetadata(
    requestParameters: GetMetadataRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<MetadataInfoDTO> {
    const response = await this.getMetadataRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Gets the metadata merkle for a given composite hash.
   * Get metadata merkle information
   */
  async getMetadataMerkleRaw(
    requestParameters: GetMetadataMerkleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<MerkleStateInfoDTO>> {
    if (requestParameters['compositeHash'] == null) {
      throw new runtime.RequiredError(
        'compositeHash',
        'Required parameter "compositeHash" was null or undefined when calling getMetadataMerkle().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/metadata/{compositeHash}/merkle`;
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
   * Gets the metadata merkle for a given composite hash.
   * Get metadata merkle information
   */
  async getMetadataMerkle(
    requestParameters: GetMetadataMerkleRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<MerkleStateInfoDTO> {
    const response = await this.getMetadataMerkleRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns an array of metadata.
   * Search metadata entries
   */
  async searchMetadataEntriesRaw(
    requestParameters: SearchMetadataEntriesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<MetadataPage>> {
    const queryParameters: any = {};

    if (requestParameters['sourceAddress'] != null) {
      queryParameters['sourceAddress'] = requestParameters['sourceAddress'];
    }

    if (requestParameters['targetAddress'] != null) {
      queryParameters['targetAddress'] = requestParameters['targetAddress'];
    }

    if (requestParameters['scopedMetadataKey'] != null) {
      queryParameters['scopedMetadataKey'] = requestParameters['scopedMetadataKey'];
    }

    if (requestParameters['targetId'] != null) {
      queryParameters['targetId'] = requestParameters['targetId'];
    }

    if (requestParameters['metadataType'] != null) {
      queryParameters['metadataType'] = requestParameters['metadataType'];
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

    let urlPath = `/metadata`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => MetadataPageFromJSON(jsonValue));
  }

  /**
   * Returns an array of metadata.
   * Search metadata entries
   */
  async searchMetadataEntries(
    requestParameters: SearchMetadataEntriesRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<MetadataPage> {
    const response = await this.searchMetadataEntriesRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
