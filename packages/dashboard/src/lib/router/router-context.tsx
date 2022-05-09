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
import React, {
  useRef,
  useMemo,
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react';
import { createHashHistory, History } from 'history';

/**
 * Internal dependencies
 */
import { State, RouterProps } from './router-props';

const initialState = {
  currentPath: '',
  queryParams: {},
};

const RouterContext = createContext<{
  state: State;
  action: Record<string, never>;
}>({
  state: initialState,
  action: {},
});

export function useRouter() {
  return useContext(RouterContext);
}

export const RouterProvider = ({ children, ...props }: RouterProps) => {
  const history = useRef<History>(props.history || createHashHistory());

  const [currentPath, setCurrentPath] = useState(
    history.current.location.pathname
  );

  const parse = (search: string) => {
    const params = new URLSearchParams(search);
    return Object.fromEntries(params);
  };

  const [queryParams, setQueryParams] = useState(
    parse(history.current.location.search)
  );

  useEffect(() => {
    return history.current.listen(({ location }) => {
      setQueryParams(parse(location.search));
      setCurrentPath(location.pathname);
    });
  }, []);

  const value = useMemo(
    () => ({
      state: {
        currentPath,
        queryParams,
      },
      action: {
        push: history.current.push,
        replace: history.current.replace,
      },
    }),
    [currentPath, queryParams]
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};
