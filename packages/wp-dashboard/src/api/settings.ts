/**
 * Copyright (C) 2022 Sherv Elmi.
 *
 * Licensed under GNU GPL, Version 3.0+ (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * ADDITIONAL TERMS per GNU GPL Section 7 The origin of the Program
 * must not be misrepresented; you must not claim that you wrote
 * the original Program. Altered source versions must be plainly marked
 * as such, and must not be misrepresented as being the original Program.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * External dependencies
 */
import { addQueryArgs } from '@elmi-panel/url';

export interface TransformedResponse {
  facebookPixel: {
    pixelId: string;
    enableConversionApi: boolean;
    apiToken: string;
  };
}

/**
 * Transform settings api response.
 *
 * @param {Object} response API response.
 * @return {Object} Transformed object.
 */
export const transformSettingResponse = (
  response: Record<string, any>
): TransformedResponse => ({
  facebookPixel: {
    pixelId: response['ep_facebook_pixel_id'],
    enableConversionApi: response['ep_facebook_pixel_enable_conversion_api'],
    apiToken: response['ep_facebook_pixel_api_token'],
  },
});

/**
 * Fetch settings.
 * Used on settings page.
 *
 * @param {string} apiPath API path.
 * @return {Promise} Request promise.
 */
export function fetchSettings(apiPath: string) {
  return apiFetch({
    path: apiPath,
  }).then(transformSettingResponse as any);
}

/**
 * Update settings.
 *
 * @param {string} apiPath API path.
 * @param {Object} queryParams Query parameters to apply to URL.
 * @return {Promise} Request promise.
 */
export function updateSettings(
  apiPath: string,
  queryParams: TransformedResponse
) {
  const { facebookPixel } = queryParams;

  const query: Record<string, any> = {};

  if (facebookPixel.pixelId !== undefined) {
    query['ep_facebook_pixel_id'] = facebookPixel.pixelId;
  }

  if (facebookPixel.enableConversionApi !== undefined) {
    query['ep_facebook_pixel_enable_conversion_api'] =
      facebookPixel.enableConversionApi;
  }

  if (facebookPixel.apiToken !== undefined) {
    query['ep_facebook_pixel_api_token'] = facebookPixel.apiToken;
  }

  const path = addQueryArgs(apiPath, query);

  return apiFetch({
    path,
    method: 'POST',
  }).then(transformSettingResponse as any);
}
