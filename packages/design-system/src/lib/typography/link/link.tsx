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
import tw from 'twin.macro';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { LinkProps, LinkRef, LinkSize } from './link-props';

const StyledLink = styled.a<LinkProps>(({ size }) => [
  tw`font-sans font-medium text-sm no-underline text-[#2667FB] m-0 p-0`,
  tw`duration-300 ease-in-out`,
  LinkSize.XSmall === size && tw`text-[.625rem]`,
  LinkSize.Small === size && tw`text-xs`,
  LinkSize.Large === size && tw`text-base`,
  LinkSize.XLarge === size && tw`text-lg`,
  tw`hover:(text-[#054BF0])`,
]);

export const Link = React.forwardRef<LinkRef, LinkProps>(function Link(
  { children, size = LinkSize.Medium, ...other },
  ref
) {
  return (
    <StyledLink size={size} ref={ref} {...other}>
      {children}
    </StyledLink>
  );
});

export default Link;
