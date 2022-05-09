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
import { Story, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import tw from 'twin.macro';

/**
 * Internal dependencies
 */
import { Button } from './button';
import { ButtonSize, ButtonVariant } from './button-props';

export default {
  title: 'Design System/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Container = styled.div(() => [
  tw`grid gap-y-4 max-w-max p-6 px-8 bg-white border border-solid border-[#DBDCE6]`,
]);

export const All: Story = (args) => {
  return (
    <Container>
      <Primary {...Primary.args} />
      <Secondary {...Secondary.args} />
      <Disabled {...Disabled.args} />
    </Container>
  );
};

const Template: Story = (args) => <Button {...args} />;
const argTypes = {
  variant: {
    options: ButtonVariant,
    control: { type: 'select' },
  },
  size: {
    options: ButtonSize,
    control: { type: 'radio' },
  },
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  variant: ButtonVariant.Primary,
  size: ButtonSize.Medium,
  onClick: action('primary clicked'),
};
Primary.argTypes = argTypes;

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  variant: ButtonVariant.Secondary,
  size: ButtonSize.Medium,
  onClick: action('secondary clicked'),
};
Secondary.argTypes = argTypes;

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled Button',
  size: ButtonSize.Medium,
  disabled: 'disabled',
};
Disabled.argTypes = argTypes;
