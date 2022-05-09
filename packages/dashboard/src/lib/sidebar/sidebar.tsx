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
import { Logo } from '@elmi-panel/design-system';

/**
 * Internal dependencies
 */
import { SidebarProps } from './sidebar-props';
import { resolveRoute, useRouteHistory } from '../router/route';
import {
  Content,
  Header,
  NavLink,
  NavList,
  NavListItem,
  PathName,
  IconWrap,
} from './components';
import { SidebarPaths } from '../../constants';

const StyledSidebar = styled.nav<SidebarProps>(({ topOffset }) => [
  tw`fixed bottom-0`,
  tw`flex flex-col`,
  tw`w-[18rem] bg-[#F1F2F5]`,

  css`
    top: ${topOffset}px;
  `,
]);

export const Sidebar = ({ topOffset = 32 }: SidebarProps) => {
  const { state } = useRouteHistory();

  return (
    <StyledSidebar topOffset={Number(topOffset)}>
      <Header forwardedAs="h1">
        <Logo />
      </Header>
      <Content>
        <NavList>
          {SidebarPaths.map(({ Icon, label, value: path }) => (
            <NavListItem key={path}>
              <NavLink
                href={resolveRoute(path)}
                active={path === state.currentPath}
                size="xlarge"
              >
                <IconWrap>{Icon && <Icon />}</IconWrap>
                <PathName as="span">{label}</PathName>
              </NavLink>
            </NavListItem>
          ))}
        </NavList>
      </Content>
    </StyledSidebar>
  );
};

export default Sidebar;
