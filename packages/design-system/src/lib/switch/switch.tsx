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
import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

/**
 * Internal dependencies
 */
import { SwitchProps, SwitchRef } from './switch-props';
import { WhiteCircle, GrayCircle } from '../../images';
import { renderToStaticMarkup } from 'react-dom/server';

const GrayCircleBG = encodeURIComponent(renderToStaticMarkup(<GrayCircle />));
const WhiteCircleBG = encodeURIComponent(renderToStaticMarkup(<WhiteCircle />));

const StyledSwitch = styled.input<SwitchProps>(() => [
  tw`cursor-pointer`,
  tw`w-10 h-6 border border-solid border-[#A9B0C6]`,
  tw`bg-white bg-no-repeat background-position[2px] appearance-none rounded-[2rem]`,
  tw`duration-200 ease-out`,
  css`
    background-image: url(data:image/svg+xml,${GrayCircleBG});
  `,
  tw`checked:(bg-[#2364FB] border-[#2364FB] background-position[right 2px center])`,
  css`
    &:checked {
      background-image: url(data:image/svg+xml,${WhiteCircleBG});
    }
  `,
  tw`disabled:(opacity-50 pointer-events-none)`,
]);

export const Switch = React.forwardRef<SwitchRef, SwitchProps>(function Switch(
  { checked = false, disabled = false, ...other },
  ref
) {
  return (
    <StyledSwitch
      type="checkbox"
      ref={ref}
      checked={checked}
      disabled={disabled}
      aria-checked={checked}
      {...other}
    />
  );
});

export default Switch;
