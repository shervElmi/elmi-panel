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
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { Label } from '@elmi-panel/design-system';

export const Wrapper = styled.div``;

export const Main = styled.div(() => [tw`flex flex-col max-w-[60rem]`]);

export const SettingForm = styled.form(() => [
  tw`grid grid-cols-[25%_minmax(25rem, 1fr)] column-gap-[5%]`,
  tw`py-5`,

  css`
    border-top: 1px solid #e7e8ee;
    border-bottom: 1px solid #e7e8ee;
  `,
]);
