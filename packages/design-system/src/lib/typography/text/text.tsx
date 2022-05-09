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
import { TextProps, TextSize } from './text-props';

const StyledText = styled.p<TextProps>(({ size }) => [
  tw`font-sans font-normal text-sm text-[#9496B3] m-0 p-0`,
  TextSize.XSmall === size && tw`text-[.625rem]`,
  TextSize.Small === size && tw`text-xs`,
  TextSize.Large === size && tw`text-base`,
  TextSize.XLarge === size && tw`text-lg`,
]);

export const Text = ({
  children,
  as = 'p',
  size = TextSize.Medium,
  ...other
}: TextProps) => {
  return (
    <StyledText as={as} size={size} {...other}>
      {children}
    </StyledText>
  );
};

export default Text;
