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

import { mapValues } from '../runtime.js';
import type { MerklePathItemDTO } from './MerklePathItemDTO.js';
import {
    MerklePathItemDTOFromJSON,
    MerklePathItemDTOFromJSONTyped,
    MerklePathItemDTOToJSON,
    MerklePathItemDTOToJSONTyped,
} from './MerklePathItemDTO.js';

/**
 * 
 * @export
 * @interface MerkleProofInfoDTO
 */
export interface MerkleProofInfoDTO {
    /**
     * List of complementary merkle path items needed to recalculate the merkle root.
     * @type {Array<MerklePathItemDTO>}
     * @memberof MerkleProofInfoDTO
     */
    merklePath?: Array<MerklePathItemDTO>;
}

/**
 * Check if a given object implements the MerkleProofInfoDTO interface.
 */
export function instanceOfMerkleProofInfoDTO(value: object): value is MerkleProofInfoDTO {
    return true;
}

export function MerkleProofInfoDTOFromJSON(json: any): MerkleProofInfoDTO {
    return MerkleProofInfoDTOFromJSONTyped(json, false);
}

export function MerkleProofInfoDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MerkleProofInfoDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'merklePath': json['merklePath'] == null ? undefined : ((json['merklePath'] as Array<any>).map(MerklePathItemDTOFromJSON)),
    };
}

export function MerkleProofInfoDTOToJSON(json: any): MerkleProofInfoDTO {
    return MerkleProofInfoDTOToJSONTyped(json, false);
}

export function MerkleProofInfoDTOToJSONTyped(value?: MerkleProofInfoDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'merklePath': value['merklePath'] == null ? undefined : ((value['merklePath'] as Array<any>).map(MerklePathItemDTOToJSON)),
    };
}

