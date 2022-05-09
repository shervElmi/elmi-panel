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
 * External dependencies
 */
import { useCallback, useReducer } from 'react';
import { useConfig } from '@elmi-panel/dashboard';

/**
 * Internal dependencies
 */
import settingsReducer, {
  initialState as settingsInitialState,
  Action as SettingsAction,
} from '../reducers/settings';
import {
  fetchSettings as fetchSettingsCallback,
  updateSettings as updateSettingsCallback,
} from '../settings';
import { ERRORS } from '../../constants';

export default function useFacebookPixelApi() {
  const [state, dispatch] = useReducer(settingsReducer, settingsInitialState);

  const {
    api: { settings: settingsApiPath },
  } = useConfig();

  const fetchSettings = useCallback(async () => {
    try {
      const response: any = await fetchSettingsCallback(settingsApiPath);

      dispatch({
        type: SettingsAction.FetchSettingsSuccess,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: SettingsAction.FetchSettingsFailur,
        payload: {
          message: ERRORS.LOAD_SETTINGS.MESSAGE,
        },
      });
    }
  }, [settingsApiPath]);

  const updateSettings = useCallback(
    async (queryParams) => {
      dispatch({ type: SettingsAction.SettingSaved, payload: false });
      try {
        const response: any = await updateSettingsCallback(
          settingsApiPath,
          queryParams
        );

        dispatch({
          type: SettingsAction.UpdateSettingsSuccess,
          payload: response,
        });
        dispatch({ type: SettingsAction.SettingSaved, payload: true });
      } catch (err) {
        dispatch({
          type: SettingsAction.UpdateSettingsFailur,
          payload: {
            message: ERRORS.UPDATE_EDITOR_SETTINGS.MESSAGE,
          },
        });
      }
    },
    [settingsApiPath]
  );

  return {
    settings: state,
    api: {
      fetchSettings,
      updateSettings,
    },
  };
}
