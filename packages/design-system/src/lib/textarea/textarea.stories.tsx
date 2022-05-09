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
import { TextArea } from './textarea';

export default {
  title: 'Design System/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Container = styled.div(() => [
  tw`grid gap-y-4 max-w-2xl p-6 px-8 bg-white border border-solid border-[#DBDCE6]`,
]);

export const All: Story = (args) => {
  const [textAreaState, setTextAreaState] = useState({
    normal: 'Normal TextArea',
    disabled: 'Disabled TextArea',
    error: 'Error TextArea',
  });

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    action(`${name} changed`)(event);
    setTextAreaState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container>
      <TextArea
        id="normal"
        name="normal"
        value={textAreaState.normal}
        onChange={handleChange}
      />
      <TextArea
        id="error"
        name="error"
        value={textAreaState.error}
        onChange={handleChange}
        error
      />
      <TextArea
        id="disabled"
        name="disabled"
        value={textAreaState.disabled}
        onChange={handleChange}
        disabled
      />
    </Container>
  );
};

const Template: ComponentStory<typeof TextArea> = (args) => {
  const [{ value }, updateArgs] = useArgs();

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    action(`${name} changed`)(event);
    updateArgs({ value });
  };

  return <TextArea value={value} onChange={handleChange} {...args} />;
};

export const Normal = Template.bind({});
Normal.args = {
  children: 'Normal TextArea',
  disabled: false,
  error: false,
};

export const Error = Template.bind({});
Error.args = {
  children: 'Error TextArea',
  disabled: false,
  error: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled TextArea',
  disabled: true,
  error: false,
};
