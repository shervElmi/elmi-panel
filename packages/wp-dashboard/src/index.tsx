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
 * Internal dependencies
 */
import './style.css'; // This way the general dashboard styles are loaded before all the component styles.

/**
 * External dependencies
 */
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

/**
 * Internal dependencies
 */
import { DashboardConfig } from '@elmi-panel/types';
import { domReady, setAppElement } from '@elmi-panel/design-system';
import { Dashboard } from '@elmi-panel/dashboard';

window.elmiPanel = window.elmiPanel || {};
window.elmiPanel.domReady = domReady;

/**
 * Initializes the Elmi Panel dashboard screen.
 *
 * @param {string} id       ID of the root element to render the screen in.
 * @param {Object} config   Story editor settings.
 */
window.elmiPanel.initializeDashboard = (
  id: string,
  config: DashboardConfig
) => {
  const appElement = document.getElementById(id) as HTMLElement;

  // see http://reactcommunity.org/react-modal/accessibility/
  setAppElement(appElement);

  ReactDOM.render(
    <StrictMode>
      <Dashboard />
    </StrictMode>,
    document.getElementById('root')
  );
};
