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

/**
 * Internal dependencies
 */
import {
  ButtonProps,
  ButtonRef,
  ButtonSize,
  ButtonVariant,
} from './button-props';
import tw from 'twin.macro';
import styled, { StyledComponent } from 'styled-components';

const Base = styled.button<ButtonProps>(({ size }) => [
  tw`flex items-center justify-center`,
  tw`m-0 px-5 py-2.5 border bg-transparent border-transparent rounded-md outline-none`,
  tw`relative cursor-pointer`,
  tw`font-sans text-sm font-normal text-[#66698f]`,
  tw`duration-300 ease-in-out`,
  tw`disabled:(pointer-events-none font-medium bg-[#E7E8EE] text-[#66698F])`,
  ButtonSize.Small === size && tw`px-4 py-2`,
  ButtonSize.Large === size && tw`py-3 text-lg`,
]);

const PrimaryButton = styled(Base)(() => [
  tw`text-white bg-[#2364FB]`,
  tw`hover:(bg-[#0C52E9])`,
]);

const SecondaryButton = styled(Base)(() => [
  tw`font-medium bg-[#DFE8FE] text-[#2364FB]`,
  tw`hover:(bg-[#C3D4FD])`,
]);

const ButtonOptions: Record<
  string,
  StyledComponent<'button', never, ButtonProps, never>
> = {
  [ButtonVariant.Primary]: PrimaryButton,
  [ButtonVariant.Secondary]: SecondaryButton,
};

export const Button = React.forwardRef<ButtonRef, ButtonProps>(function Button(
  { children, variant = ButtonVariant.Primary, size, ...other },
  ref
) {
  const StyledButton = ButtonOptions[variant];

  return (
    <StyledButton variant={variant} size={size} ref={ref} {...other}>
      {children}
    </StyledButton>
  );
});

export default Button;
