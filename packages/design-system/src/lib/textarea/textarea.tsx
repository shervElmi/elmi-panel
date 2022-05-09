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
import styled from 'styled-components';
import tw from 'twin.macro';

/**
 * Internal dependencies
 */
import { TextAreaProps, TextAreaRef } from './textarea-props';

const StyledTextArea = styled.textarea<TextAreaProps>(({ error }) => [
  tw`shadow-sm block w-full min-h-[8.75rem] py-2.5 px-3.5 bg-white border border-solid border-[#DBDCE6] rounded-md`,
  tw`font-sans text-sm font-normal text-[#5D5F83]`,
  tw`duration-300 ease-in-out`,
  tw`placeholder:(font-sans text-sm font-normal text-[#A9B0C6])`,
  tw`focus:(outline-none border-[#4B80FB])`,
  tw`disabled:(opacity-70)`,
  error && tw`!border-red-500`,
]);

export const TextArea = React.forwardRef<TextAreaRef, TextAreaProps>(
  function TextArea(
    {
      children = '',
      placeholder = 'placeholder',
      rows = 8,
      disabled = false,
      error = false,
      ...other
    },
    ref
  ) {
    return (
      <StyledTextArea
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        error={error}
        {...other}
      >
        {children}
      </StyledTextArea>
    );
  }
);

export default TextArea;
