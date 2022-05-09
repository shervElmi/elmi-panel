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
import { useRouter } from './router-context';

export interface RouteProps {
  component: React.ReactNode;
  path: string;
  exact: boolean;
}

export function useRouteHistory() {
  return useRouter();
}

export function parentRoute(): string {
  const potentialParent = window.location.hash
    .split('/')
    .slice(0, -1)
    .join('/');

  if (potentialParent.startsWith('#')) {
    return potentialParent;
  } else {
    return '#/';
  }
}

export function resolveRoute(route: string): string {
  if (
    route.toLowerCase().startsWith('http://') ||
    route.toLowerCase().startsWith('https://')
  ) {
    /**
     * If the url starts with a protocol assume it's a full path and
     * visit it normally.
     */
    return route;
  } else if (route.startsWith('/')) {
    /**
     * If the url starts with a backslash visit it as a root view
     * within the context of the dashboard app.
     */
    return `#${route}`;
  } else if (route === '') {
    /**
     * If the url is empty visit it as a root view
     * within the context of the dashboard app.
     */
    return '#/';
  } else {
    /**
     * If the url has no root append it to the current route and create
     * a nested root within the context of the dashboard app.
     */
    return `${window.location.hash}/${route}`;
  }
}

export function matchPath(
  currentPath: string,
  path: string,
  exact = false
): string | null {
  const match = new RegExp(`^${path}`).exec(currentPath);

  if (!match) {
    return null;
  }

  const matchUrl = match[0];
  const isExactMatch = currentPath === matchUrl;

  if (exact && !isExactMatch) {
    return null;
  }

  return matchUrl;
}

export function Route({
  component,
  path,
  exact,
}: RouteProps): React.ReactNode | null {
  const { state } = useRouteHistory();
  const match = matchPath(state.currentPath, path, exact);

  if (!match) {
    return null;
  }

  return component;
}

export default Route;
