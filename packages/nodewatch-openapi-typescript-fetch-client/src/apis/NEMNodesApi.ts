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
  HeightInfo,
  Node,
  TimeSeriesNodesCountInner,
} from '../models/index.js';
import {
    HeightInfoFromJSON,
    HeightInfoToJSON,
    NodeFromJSON,
    NodeToJSON,
    TimeSeriesNodesCountInnerFromJSON,
    TimeSeriesNodesCountInnerToJSON,
} from '../models/index.js';

/**
 * 
 */
export class NEMNodesApi extends runtime.BaseAPI {

    /**
     * Returns information about the NEM blockchain\'s heights.
     */
    async getNemHeightRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<HeightInfo>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/nem/height`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HeightInfoFromJSON(jsonValue));
    }

    /**
     * Returns information about the NEM blockchain\'s heights.
     */
    async getNemHeight(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<HeightInfo> {
        const response = await this.getNemHeightRaw(initOverrides);
        return await response.value();
    }

    /**
     * Returns the list of known NEM nodes.
     */
    async getNemNodesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Node>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/nem/nodes`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(NodeFromJSON));
    }

    /**
     * Returns the list of known NEM nodes.
     */
    async getNemNodes(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Node>> {
        const response = await this.getNemNodesRaw(initOverrides);
        return await response.value();
    }

    /**
     * Returns NEM node count time series.
     */
    async getNemNodesCountRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<TimeSeriesNodesCountInner>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/api/nem/nodes/count`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TimeSeriesNodesCountInnerFromJSON));
    }

    /**
     * Returns NEM node count time series.
     */
    async getNemNodesCount(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<TimeSeriesNodesCountInner>> {
        const response = await this.getNemNodesCountRaw(initOverrides);
        return await response.value();
    }

}
