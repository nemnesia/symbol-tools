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
  ChainInfoDTO,
} from '../models/index.js';
import {
    ChainInfoDTOFromJSON,
    ChainInfoDTOToJSON,
} from '../models/index.js';

/**
 * 
 */
export class ChainRoutesApi extends runtime.BaseAPI {

    /**
     * Returns the current information of the blockchain.  The higher the score, the better the chain. During synchronization, nodes try to get the best blockchain in the network.  The score for a block is derived from its difficulty and the time (in seconds) that has elapsed since the last block:      block score = difficulty − time elapsed since last block 
     * Get the current information of the chain
     */
    async getChainInfoRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ChainInfoDTO>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};


        let urlPath = `/chain/info`;

        const response = await this.request({
            path: urlPath,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ChainInfoDTOFromJSON(jsonValue));
    }

    /**
     * Returns the current information of the blockchain.  The higher the score, the better the chain. During synchronization, nodes try to get the best blockchain in the network.  The score for a block is derived from its difficulty and the time (in seconds) that has elapsed since the last block:      block score = difficulty − time elapsed since last block 
     * Get the current information of the chain
     */
    async getChainInfo(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ChainInfoDTO> {
        const response = await this.getChainInfoRaw(initOverrides);
        return await response.value();
    }

}
