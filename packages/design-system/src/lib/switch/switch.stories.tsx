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
import { useState } from 'react';
import { ComponentMeta, ComponentStory, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import styled from 'styled-components';
import tw from 'twin.macro';

/**
 * Internal dependencies
 */
import { Switch } from './switch';

export default {
  title: 'Design System/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Container = styled.div(() => [
  tw`grid gap-y-5 max-w-md p-5 px-8 bg-white border border-solid border-[#A9B0C6]`,
]);

const Row = styled.div`
  ${tw`grid grid-cols-1 gap-y-4 last:(pt-5 border-0 border-t border-dashed border-[#DBDCE6])`}

  > div {
    ${tw`grid grid-cols-2 align-middle`}
  }

  label {
    ${tw`flex items-center`}
  }
`;

export const All: Story = (args) => {
  const [formState, setFormState] = useState({
    normal: false,
    normalDisabled: false,
    chekced: true,
    checkedDisabled: true,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name;
    const value = event.target.checked;

    action(`${name} changed`)(event);
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Row>
        <div>
          <label htmlFor="normal">
            <span>Normal</span>
          </label>
          <Switch
            id="normal"
            name="normal"
            checked={formState.normal}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="normal-disabled">
            <span>Disabled</span>
          </label>
          <Switch
            id="normal-disabled"
            name="normal-disabled"
            checked={formState.normalDisabled}
            onChange={handleChange}
            disabled
          />
        </div>
      </Row>
      <Row>
        <div>
          <label htmlFor="chekced">
            <span>Checked</span>
          </label>
          <Switch
            id="chekced"
            name="chekced"
            checked={formState.chekced}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="checked-disabled">
            <span>Checked and Disabled</span>
          </label>
          <Switch
            id="checked-disabled"
            name="checked-disabled"
            checked={formState.checkedDisabled}
            onChange={handleChange}
            disabled
          />
        </div>
      </Row>
    </Container>
  );
};

const Template: ComponentStory<typeof Switch> = (args) => {
  const [{ checked }, updateArgs] = useArgs();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    action(`${event.target.name} changed`)(event);
    updateArgs({ checked: !checked });
  };

  return <Switch checked={checked} onChange={handleChange} {...args} />;
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
  disabled: false,
};

export const UncheckedDisabled = Template.bind({});
UncheckedDisabled.args = {
  checked: false,
  disabled: true,
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  disabled: false,
};

export const CheckedDisabled = Template.bind({});
CheckedDisabled.args = {
  checked: true,
  disabled: true,
};
