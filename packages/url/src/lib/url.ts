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
 * Appends search params to the provided URL.
 *
 * @param {string} url  URL to be modified.
 * @param {Object} args Query arguments to apply to URL.
 * @example
 * ```js
 * const newURL = addQueryArgs( 'https://elmi.dev', { q: 'test' } ); // https://elmi.dev/?q=test
 * ```
 * @return {string} URL with arguments applied.
 */
export function addQueryArgs(
  url: string,
  args: Record<string, string>
): string {
  let isRelativeUrl = false;
  let parsedURL;

  try {
    parsedURL = new URL(url);
  } catch {
    parsedURL = new URL(url, document.location.href);
    isRelativeUrl = true;
  }

  for (const key in args) {
    if (!Object.prototype.hasOwnProperty.call(args, key)) {
      continue;
    }

    const value = args[key];

    if (typeof value !== 'undefined' && value !== null) {
      parsedURL.searchParams.set(key, value);
    }
  }

  return isRelativeUrl ? parsedURL.pathname + parsedURL.search : parsedURL.href;
}

export function toAbsoluteUrl(base: string, path: string): string {
  try {
    return new URL(path, base).href;
  } catch (error) {
    return path;
  }
}

export function isValidUrl(url: string): boolean {
  try {
    // eslint-disable-next-line no-new -- Needed here just to catch errors.
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Prepends a protocol (default https) to a URL that doesn't have one
 *
 * @param {string} url URL.
 * @param {string} [protocol=https] default protocol to prepend
 * @return {string} the url with the protocol prepended to it
 */
export function withProtocol(url: string, protocol = 'https'): string {
  return /^(http:\/\/|https:\/\/|tel:|mailto:)/.test(url)
    ? url
    : `${protocol}://${url}`;
}
