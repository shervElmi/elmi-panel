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
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDebounce } from 'use-debounce';
import { __ } from '@wordpress/i18n';
import { Input, Label, Title } from '@elmi-panel/design-system';

/**
 * Internal dependencies
 */
import { SettingForm } from '../components';
import { FacebookPixelIdProps } from './pixel-id-props';

const Text = {
  Title: __('Facebook Pixel ID', 'elmi-panel'),
  Subtitle: __(
    'In order to insert the Facebook Pixel on your site you just need to add your Facebook Pixel ID in the dedicated field.',
    'elmi-panel'
  ),
  SettingTitle: __('Pixel ID', 'elmi-panel'),
  Placeholder: __('Enter your Facebook Pixel ID', 'elmi-panel'),
};

export const FacebookPixelId = (
  {
    updateSettings
  }: FacebookPixelIdProps
) => {
  const [pixelId, setPixelId] = useState('');
  const debouncedPixelId = useDebounce(pixelId, 500);
  const inputRef = useRef(null);

  const onChangePixelId = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPixelId(e.target.value);
    },
    [pixelId]
  );

  useEffect(() => {
    updateSettings({
      pixelId: debouncedPixelId,
    });
  }, [debouncedPixelId]);

  return (
    <>
      <Title subtitleContent={Text.Subtitle}>{Text.Title}</Title>
      <SettingForm onSubmit={(e) => e.preventDefault()}>
        <Label htmlFor="ep-facebook-pixel-id">{Text.SettingTitle}</Label>
        <Input
          id="ep-facebook-pixel-id"
          placeholder={Text.Placeholder}
          value={pixelId}
          onChange={onChangePixelId}
          ref={inputRef}
        />
      </SettingForm>
    </>
  );
};
