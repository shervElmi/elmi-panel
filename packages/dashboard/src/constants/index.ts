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
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Facebook, Google, Woocommerce, Calendar } from '../icons';

export enum AppRoutes {
  FACEBOOK_PIXEL = '/',
  GOOGLE_ANALYTICS = '/google-analytics',
  WOOCOMMERCE = '/woocommerce',
  EVENTS = '/events',
}

export const SidebarPaths = [
  {
    value: AppRoutes.FACEBOOK_PIXEL,
    label: __('Facebook Pixel', 'elmi-panel'),
    Icon: Facebook,
  },
  {
    value: AppRoutes.GOOGLE_ANALYTICS,
    label: __('Google Analytics', 'elmi-panel'),
    Icon: Google,
  },
  {
    value: AppRoutes.WOOCOMMERCE,
    label: __('Woocommerce', 'elmi-panel'),
    Icon: Woocommerce,
  },
  {
    value: AppRoutes.EVENTS,
    label: __('Events', 'elmi-panel'),
    Icon: Calendar,
  },
];

// API Query Constants
export const TextInputDebounce = 300;

export * from './page-structure';
