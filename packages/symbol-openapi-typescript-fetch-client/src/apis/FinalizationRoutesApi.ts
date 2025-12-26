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
import type { FinalizationProofDTO, ModelError } from '../models/index.js';
import {
  FinalizationProofDTOFromJSON,
  FinalizationProofDTOToJSON,
  ModelErrorFromJSON,
  ModelErrorToJSON,
} from '../models/index.js';
import * as runtime from '../runtime.js';

export interface GetFinalizationProofAtEpochRequest {
  epoch: number;
}

export interface GetFinalizationProofAtHeightRequest {
  height: string;
}

/**
 *
 */
export class FinalizationRoutesApi extends runtime.BaseAPI {
  /**
   * Gets finalization proof for the greatest height associated with the given epoch.
   * Get finalization proof
   */
  async getFinalizationProofAtEpochRaw(
    requestParameters: GetFinalizationProofAtEpochRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<FinalizationProofDTO>> {
    if (requestParameters['epoch'] == null) {
      throw new runtime.RequiredError(
        'epoch',
        'Required parameter "epoch" was null or undefined when calling getFinalizationProofAtEpoch().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/finalization/proof/epoch/{epoch}`;
    urlPath = urlPath.replace(`{${'epoch'}}`, encodeURIComponent(String(requestParameters['epoch'])));

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => FinalizationProofDTOFromJSON(jsonValue));
  }

  /**
   * Gets finalization proof for the greatest height associated with the given epoch.
   * Get finalization proof
   */
  async getFinalizationProofAtEpoch(
    requestParameters: GetFinalizationProofAtEpochRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<FinalizationProofDTO> {
    const response = await this.getFinalizationProofAtEpochRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Gets finalization proof at the given height.
   * Get finalization proof
   */
  async getFinalizationProofAtHeightRaw(
    requestParameters: GetFinalizationProofAtHeightRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<FinalizationProofDTO>> {
    if (requestParameters['height'] == null) {
      throw new runtime.RequiredError(
        'height',
        'Required parameter "height" was null or undefined when calling getFinalizationProofAtHeight().'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    let urlPath = `/finalization/proof/height/{height}`;
    urlPath = urlPath.replace(`{${'height'}}`, encodeURIComponent(String(requestParameters['height'])));

    const response = await this.request(
      {
        path: urlPath,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => FinalizationProofDTOFromJSON(jsonValue));
  }

  /**
   * Gets finalization proof at the given height.
   * Get finalization proof
   */
  async getFinalizationProofAtHeight(
    requestParameters: GetFinalizationProofAtHeightRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<FinalizationProofDTO> {
    const response = await this.getFinalizationProofAtHeightRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
