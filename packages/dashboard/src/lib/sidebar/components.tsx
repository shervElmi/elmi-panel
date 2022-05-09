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
import { Title, Link, Text } from '@elmi-panel/design-system';

export const Header = styled(Title)`
  ${tw`m-[3.125rem 0 3.75rem]`}

  & > svg {
    ${tw`h-[8.5625rem] w-auto m-auto`}
  }
`;

export const Content = styled.div(() => [tw`flex flex-col m-0`]);

export const NavList = styled.ul(() => [tw`p-0 m-0`]);

export const NavListItem = styled.li(() => [tw`list-none p-0 my-2.5`]);

export const NavLink = styled(Link)<{ active: boolean }>(({ active }) => [
  tw`grid grid-cols-12 gap-0 items-center`,
  tw`rounded-xl px-6 py-4 mx-6`,

  css`
    * {
      transition: all 0.2s ease-in-out;
    }

    span {
      color: #888caa;
    }

    svg path {
      fill: #888caa;
    }

    &:hover {
      span {
        color: #66698f;
      }

      svg path {
        fill: #66698f;
      }
    }
  `,

  active &&
    css`
      ${tw`bg-[#2667FB]`}
      box-shadow: 0 6px 21px rgba(38, 103, 251, 0.4);

      span {
        color: #fff;
      }

      svg path {
        fill: #fff;
      }

      &:hover {
        span {
          color: #fff;
        }

        svg path {
          fill: #fff;
        }
      }
    `,
]);

export const PathName = styled(Text)`
  ${tw`col-span-10`}
`;

export const Image = styled.img(() => [tw`max-w-full`]);

export const IconWrap = styled.div(() => [tw`col-span-2 relative`]);
