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
import type { ErrorResponse, HeightInfo, Node, TimeSeriesNodesCountInner } from '../models/index.js';
import {
  ErrorResponseFromJSON,
  ErrorResponseToJSON,
  HeightInfoFromJSON,
  HeightInfoToJSON,
  NodeFromJSON,
  NodeToJSON,
  TimeSeriesNodesCountInnerFromJSON,
  TimeSeriesNodesCountInnerToJSON,
} from '../models/index.js';
import * as runtime from '../runtime.js';

export interface GetSymbolApiNodesRequest {
  onlySsl?: boolean;
  limit?: number;
  order?: GetSymbolApiNodesOrderEnum;
}

export interface GetSymbolNodeByMainPublicKeyRequest {
  mainPublicKey: string;
}

export interface GetSymbolNodeByNodePublicKeyRequest {
  nodePublicKey: string;
}

export interface GetSymbolPeerNodesRequest {
  onlySsl?: boolean;
  limit?: number;
  order?: GetSymbolPeerNodesOrderEnum;
}

/**
 *
 */
export class SymbolNodesApi extends runtime.BaseAPI {
  /**
   * Returns the list of known API-only Symbol nodes.
   */
  async getSymbolApiNodesRaw(
    requestParameters: GetSymbolApiNodesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<Node>>> {
    const queryParameters: any = {};

    if (requestParameters['onlySsl'] != null) {
      queryParameters['only_ssl'] = requestParameters['onlySsl'];
    }

    if (requestParameters['limit'] != null) {
      queryParameters['limit'] = requestParameters['limit'];
    }

    if (requestParameters['order'] != null) {
      queryParameters['order'] = requestParameters['order'];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/api/symbol/nodes/api`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(NodeFromJSON));
  }

  /**
   * Returns the list of known API-only Symbol nodes.
   */
  async getSymbolApiNodes(
    requestParameters: GetSymbolApiNodesRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<Node>> {
    const response = await this.getSymbolApiNodesRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns information about the Symbol blockchain\'s heights.
   */
  async getSymbolHeightRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<HeightInfo>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/api/symbol/height`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => HeightInfoFromJSON(jsonValue));
  }

  /**
   * Returns information about the Symbol blockchain\'s heights.
   */
  async getSymbolHeight(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<HeightInfo> {
    const response = await this.getSymbolHeightRaw(initOverrides);
    return await response.value();
  }

  /**
   * Returns information about the Symbol node with matching main public key.
   */
  async getSymbolNodeByMainPublicKeyRaw(
    requestParameters: GetSymbolNodeByMainPublicKeyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Node>> {
    if (requestParameters['mainPublicKey'] == null) {
      throw new runtime.RequiredError(
        'mainPublicKey',
        'Required parameter "mainPublicKey" was null or undefined when calling getSymbolNodeByMainPublicKey().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/api/symbol/nodes/mainPublicKey/{main_public_key}`;
    urlPath = urlPath.replace(`{${'main_public_key'}}`, encodeURIComponent(String(requestParameters['mainPublicKey'])));

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => NodeFromJSON(jsonValue));
  }

  /**
   * Returns information about the Symbol node with matching main public key.
   */
  async getSymbolNodeByMainPublicKey(
    requestParameters: GetSymbolNodeByMainPublicKeyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Node> {
    const response = await this.getSymbolNodeByMainPublicKeyRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns information about the Symbol node with matching node public key.
   */
  async getSymbolNodeByNodePublicKeyRaw(
    requestParameters: GetSymbolNodeByNodePublicKeyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Node>> {
    if (requestParameters['nodePublicKey'] == null) {
      throw new runtime.RequiredError(
        'nodePublicKey',
        'Required parameter "nodePublicKey" was null or undefined when calling getSymbolNodeByNodePublicKey().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/api/symbol/nodes/nodePublicKey/{node_public_key}`;
    urlPath = urlPath.replace(`{${'node_public_key'}}`, encodeURIComponent(String(requestParameters['nodePublicKey'])));

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => NodeFromJSON(jsonValue));
  }

  /**
   * Returns information about the Symbol node with matching node public key.
   */
  async getSymbolNodeByNodePublicKey(
    requestParameters: GetSymbolNodeByNodePublicKeyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Node> {
    const response = await this.getSymbolNodeByNodePublicKeyRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Returns Symbol node count time series.
   */
  async getSymbolNodesCountRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<TimeSeriesNodesCountInner>>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/api/symbol/nodes/count`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TimeSeriesNodesCountInnerFromJSON));
  }

  /**
   * Returns Symbol node count time series.
   */
  async getSymbolNodesCount(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<TimeSeriesNodesCountInner>> {
    const response = await this.getSymbolNodesCountRaw(initOverrides);
    return await response.value();
  }

  /**
   * Returns the list of known Peer Symbol nodes.
   */
  async getSymbolPeerNodesRaw(
    requestParameters: GetSymbolPeerNodesRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<Node>>> {
    const queryParameters: any = {};

    if (requestParameters['onlySsl'] != null) {
      queryParameters['only_ssl'] = requestParameters['onlySsl'];
    }

    if (requestParameters['limit'] != null) {
      queryParameters['limit'] = requestParameters['limit'];
    }

    if (requestParameters['order'] != null) {
      queryParameters['order'] = requestParameters['order'];
    }

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/api/symbol/nodes/peer`;

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(NodeFromJSON));
  }

  /**
   * Returns the list of known Peer Symbol nodes.
   */
  async getSymbolPeerNodes(
    requestParameters: GetSymbolPeerNodesRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<Node>> {
    const response = await this.getSymbolPeerNodesRaw(requestParameters, initOverrides);
    return await response.value();
  }
}

/**
 * @export
 */
export const GetSymbolApiNodesOrderEnum = {
  Random: 'random',
} as const;
export type GetSymbolApiNodesOrderEnum = (typeof GetSymbolApiNodesOrderEnum)[keyof typeof GetSymbolApiNodesOrderEnum];
/**
 * @export
 */
export const GetSymbolPeerNodesOrderEnum = {
  Random: 'random',
} as const;
export type GetSymbolPeerNodesOrderEnum =
  (typeof GetSymbolPeerNodesOrderEnum)[keyof typeof GetSymbolPeerNodesOrderEnum];
