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

export type ActionType =
  | { type: Action.SettingSaved; payload: boolean }
  | { type: Action.UpdateSettingsSuccess; payload: StateType }
  | { type: Action.UpdateSettingsFailur; payload: Record<string, unknown> }
  | { type: Action.FetchSettingsSuccess; payload: StateType }
  | { type: Action.FetchSettingsFailur; payload: Record<string, unknown> };

export type StateType = typeof initialState;

export enum Action {
  SettingSaved = 'setting_saved',
  UpdateSettingsSuccess = 'update_settings_success',
  UpdateSettingsFailur = 'update_settings_failure',
  FetchSettingsSuccess = 'fetch_settings_success',
  FetchSettingsFailur = 'fetch_settings_failure',
}

export const initialState = {
  error: {},
  settingSaved: false,
  facebookPixel: {
    pixelId: '',
    enableConversionApi: false,
    apiToken: '',
  },
};

function settingsReducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case Action.SettingSaved: {
      return {
        ...state,
        settingSaved: action.payload,
      };
    }

    case Action.UpdateSettingsFailur:
    case Action.FetchSettingsFailur: {
      return {
        ...state,
        error: { ...action.payload, id: Date.now() },
      };
    }

    case Action.FetchSettingsSuccess:
    case Action.UpdateSettingsSuccess: {
      return {
        ...state,
        error: {},
        facebookPixel: {
          pixelId: action.payload.facebookPixel.pixelId,
          enableConversionApi: action.payload.facebookPixel.enableConversionApi,
          apiToken: action.payload.facebookPixel.apiToken,
        },
      };
    }

    default:
      return state;
  }
}

export default settingsReducer;
