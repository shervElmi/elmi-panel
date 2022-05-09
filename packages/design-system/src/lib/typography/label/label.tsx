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
import styled from 'styled-components';
import tw from 'twin.macro';

/**
 * Internal dependencies
 */
import { LabelProps, LabelSize } from './label-props';

const StyledLabel = styled.label<LabelProps>(({ size }) => [
  tw`font-sans font-normal text-sm text-[#9496B3] m-0 p-0`,
  LabelSize.XSmall === size && tw`text-[.625rem]`,
  LabelSize.Small === size && tw`text-xs`,
  LabelSize.Large === size && tw`text-base`,
  LabelSize.XLarge === size && tw`text-lg`,
]);

export const Label = ({
  children,
  size = LabelSize.Medium,
  ...other
}: LabelProps) => {
  return (
    <StyledLabel size={size} {...other}>
      {children}
    </StyledLabel>
  );
};

export default Label;
