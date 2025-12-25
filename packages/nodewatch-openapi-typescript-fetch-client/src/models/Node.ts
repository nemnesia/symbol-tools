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
import type { NodeGeoLocation } from './NodeGeoLocation.js';
import {
    NodeGeoLocationFromJSON,
    NodeGeoLocationFromJSONTyped,
    NodeGeoLocationToJSON,
    NodeGeoLocationToJSONTyped,
} from './NodeGeoLocation.js';

/**
 * Node information gathered from the chain by Nodewatch.
 * @export
 * @interface Node
 */
export interface Node {
    /**
     * Main public key of the node.
     * @type {string}
     * @memberof Node
     */
    mainPublicKey: string;
    /**
     * Public key of the node.
     * @type {string}
     * @memberof Node
     */
    nodePublicKey?: string | null;
    /**
     * Endpoint of the node.
     * @type {string}
     * @memberof Node
     */
    endpoint: string;
    /**
     * User-friendly name of the node.
     * @type {string}
     * @memberof Node
     */
    name: string;
    /**
     * Version of the blockchain client run by the node.
     * @type {string}
     * @memberof Node
     */
    version: string;
    /**
     * Current blockchain height, as seen by the node.
     * @type {number}
     * @memberof Node
     */
    height: number;
    /**
     * Network-wide blockchain finalized height, agreed-upon by the majority of nodes.
     * @type {number}
     * @memberof Node
     */
    finalizedHeight: number;
    /**
     * Current balance of the node's main account.
     * @type {number}
     * @memberof Node
     */
    balance: number;
    /**
     * Finalized epoch.
     * @type {number}
     * @memberof Node
     */
    finalizedEpoch?: number;
    /**
     * Hash of the latest finalized block.
     * @type {string}
     * @memberof Node
     */
    finalizedHash?: string | null;
    /**
     * Point of the latest finalized block.
     * @type {number}
     * @memberof Node
     */
    finalizedPoint?: number;
    /**
     * Indicates the health status of an API node. For Symbol, `true` if both the node and MongoDB are responsive, 
     * `false` if either is unresponsive. `null` if the node is not an API or light node.
     * 
     * @type {boolean}
     * @memberof Node
     */
    isHealthy?: boolean | null;
    /**
     * Specifies whether the node endpoint uses SSL.
     * @type {boolean}
     * @memberof Node
     */
    isSslEnabled?: boolean | null;
    /**
     * Version of the REST API running on the node.
     * @type {string}
     * @memberof Node
     */
    restVersion?: string | null;
    /**
     * 
     * @type {NodeGeoLocation}
     * @memberof Node
     */
    geoLocation?: NodeGeoLocation;
    /**
     * For Symbol, number that defines the different roles the node provides. Possible roles are:
     * * 1 - Peer node.
     * * 2 - API node.
     * * 4 - Voting node.
     * 
     * The values are bitwise added together, for example:
     * 1 = Only Peer.
     * 2 = Only API.
     * 3 = Both Peer and API node.
     * 7 = Peer, API and Voting node.
     * 
     * @type {number}
     * @memberof Node
     */
    roles?: number;
}

/**
 * Check if a given object implements the Node interface.
 */
export function instanceOfNode(value: object): value is Node {
    if (!('mainPublicKey' in value) || value['mainPublicKey'] === undefined) return false;
    if (!('endpoint' in value) || value['endpoint'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('version' in value) || value['version'] === undefined) return false;
    if (!('height' in value) || value['height'] === undefined) return false;
    if (!('finalizedHeight' in value) || value['finalizedHeight'] === undefined) return false;
    if (!('balance' in value) || value['balance'] === undefined) return false;
    return true;
}

export function NodeFromJSON(json: any): Node {
    return NodeFromJSONTyped(json, false);
}

export function NodeFromJSONTyped(json: any, ignoreDiscriminator: boolean): Node {
    if (json == null) {
        return json;
    }
    return {
        
        'mainPublicKey': json['mainPublicKey'],
        'nodePublicKey': json['nodePublicKey'] == null ? undefined : json['nodePublicKey'],
        'endpoint': json['endpoint'],
        'name': json['name'],
        'version': json['version'],
        'height': json['height'],
        'finalizedHeight': json['finalizedHeight'],
        'balance': json['balance'],
        'finalizedEpoch': json['finalizedEpoch'] == null ? undefined : json['finalizedEpoch'],
        'finalizedHash': json['finalizedHash'] == null ? undefined : json['finalizedHash'],
        'finalizedPoint': json['finalizedPoint'] == null ? undefined : json['finalizedPoint'],
        'isHealthy': json['isHealthy'] == null ? undefined : json['isHealthy'],
        'isSslEnabled': json['isSslEnabled'] == null ? undefined : json['isSslEnabled'],
        'restVersion': json['restVersion'] == null ? undefined : json['restVersion'],
        'geoLocation': json['geoLocation'] == null ? undefined : NodeGeoLocationFromJSON(json['geoLocation']),
        'roles': json['roles'] == null ? undefined : json['roles'],
    };
}

export function NodeToJSON(json: any): Node {
    return NodeToJSONTyped(json, false);
}

export function NodeToJSONTyped(value?: Node | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'mainPublicKey': value['mainPublicKey'],
        'nodePublicKey': value['nodePublicKey'],
        'endpoint': value['endpoint'],
        'name': value['name'],
        'version': value['version'],
        'height': value['height'],
        'finalizedHeight': value['finalizedHeight'],
        'balance': value['balance'],
        'finalizedEpoch': value['finalizedEpoch'],
        'finalizedHash': value['finalizedHash'],
        'finalizedPoint': value['finalizedPoint'],
        'isHealthy': value['isHealthy'],
        'isSslEnabled': value['isSslEnabled'],
        'restVersion': value['restVersion'],
        'geoLocation': NodeGeoLocationToJSON(value['geoLocation']),
        'roles': value['roles'],
    };
}

