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
import { ComponentMeta, ComponentStory } from '@storybook/react';

/**
 * Internal dependencies
 */
import Text from '../text/text';
import { List } from './list';
import { ListSize } from './list-props';

export default {
  title: 'Design System/Typography/List',
  component: List,
} as ComponentMeta<typeof List>;

export const All: ComponentStory<typeof List> = ({ children }) => (
  <>
    {Object.values(ListSize).map((presetSize) => (
      <div key={`${presetSize}_list`}>
        <Text>{presetSize}</Text>
        <List size={presetSize}>
          <li>List item one</li>
          <li>List item two</li>
          <li>List item three</li>
        </List>
      </div>
    ))}
  </>
);
