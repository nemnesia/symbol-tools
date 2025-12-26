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

/**
 * Node geolocation data.
 * @export
 * @interface NodeGeoLocation
 */
export interface NodeGeoLocation {
  /**
   * The city where the IP address is estimated to be located.
   * @type {string}
   * @memberof NodeGeoLocation
   */
  city?: string;
  /**
   * The continent where the IP address is located.
   * @type {string}
   * @memberof NodeGeoLocation
   */
  continent?: string;
  /**
   * The country where the IP address is registered or detected.
   * @type {string}
   * @memberof NodeGeoLocation
   */
  country?: string;
  /**
   * The Internet Service Provider (ISP) associated with the IP address.
   * For cloud-hosted servers, this may correspond to the hosting company rather than the end user.
   *
   * @type {string}
   * @memberof NodeGeoLocation
   */
  isp?: string;
  /**
   * Latitude coordinate of the estimated IP location.
   * Expressed in decimal degrees within the range -90.0 to +90.0:
   * - Positive values indicate the Northern Hemisphere.
   * - Negative values indicate the Southern Hemisphere
   *
   * @type {number}
   * @memberof NodeGeoLocation
   */
  lat?: number;
  /**
   * Longitude coordinate of the estimated IP location.
   * Expressed in decimal degrees within the range -180.0 to +180.0:
   * - Positive values indicate the Eastern Hemisphere.
   * - Negative values indicate the Western Hemisphere.
   *
   * @type {number}
   * @memberof NodeGeoLocation
   */
  lon?: number;
  /**
   * The primary administrative subdivision of the country where the IP address is located.
   * Its meaning varies by country:
   * - United States, Canada, Australia: state or province code
   * - European Union: region code (e.g., federal state in Germany)
   * - Other countries: may represent province, prefecture, or equivalent
   *
   * @type {string}
   * @memberof NodeGeoLocation
   */
  region?: string;
}

/**
 * Check if a given object implements the NodeGeoLocation interface.
 */
export function instanceOfNodeGeoLocation(value: object): value is NodeGeoLocation {
  return true;
}

export function NodeGeoLocationFromJSON(json: any): NodeGeoLocation {
  return NodeGeoLocationFromJSONTyped(json, false);
}

export function NodeGeoLocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): NodeGeoLocation {
  if (json == null) {
    return json;
  }
  return {
    city: json['city'] == null ? undefined : json['city'],
    continent: json['continent'] == null ? undefined : json['continent'],
    country: json['country'] == null ? undefined : json['country'],
    isp: json['isp'] == null ? undefined : json['isp'],
    lat: json['lat'] == null ? undefined : json['lat'],
    lon: json['lon'] == null ? undefined : json['lon'],
    region: json['region'] == null ? undefined : json['region'],
  };
}

export function NodeGeoLocationToJSON(json: any): NodeGeoLocation {
  return NodeGeoLocationToJSONTyped(json, false);
}

export function NodeGeoLocationToJSONTyped(value?: NodeGeoLocation | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    city: value['city'],
    continent: value['continent'],
    country: value['country'],
    isp: value['isp'],
    lat: value['lat'],
    lon: value['lon'],
    region: value['region'],
  };
}
