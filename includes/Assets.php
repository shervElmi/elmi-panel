<?php
/**
 * Assets class.
 *
 * @package   Sherv/Elmi_Panel
 * @copyright 2022 Sherv Elmi
 * @license   GNU General Public License 3.0
 * @link      https://elmi.dev/
 */

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

namespace Sherv\Elmi_Panel;

/**
 * Assets class.
 *
 * @since 1.0.0
 */
class Assets {

	/**
	 * List of registered styles.
	 *
	 * @var array
	 */
	protected $register_styles = [];

	/**
	 * List of registered scripts.
	 *
	 * @var array
	 */
	protected $register_scripts = [];

	/**
	 * Get path to file and directory.
	 *
	 * @since 1.0.0
	 *
	 * @param string $path Path.
	 *
	 * @return string
	 */
	public function get_base_path( string $path ): string {
		return ELMI_PANEL_PATH . $path;
	}

	/**
	 * Get url of file and directory.
	 *
	 * @since 1.0.0
	 *
	 * @param string $path Path.
	 *
	 * @return string
	 */
	public function get_base_url( string $path ): string {
		return ELMI_PANEL_URL . $path;
	}

	/**
	 * Register script using handle.
	 *
	 * @since 1.0.0
	 *
	 * @param string $script_handle Handle of script.
	 * @param array  $script_dependencies Array of extra dependencies.
	 *
	 * @return void
	 */
	public function register_script_asset( string $script_handle, array $script_dependencies = [] ) {
		if ( isset( $this->register_scripts[ $script_handle ] ) ) {
			return;
		}

		$base_script_path = $this->get_base_url( 'assets/js/' );
		$in_footer        = true;

		$this->register_script(
			$script_handle,
			$base_script_path . $script_handle . '.js',
			$script_dependencies,
			ELMI_PANEL_VERSION,
			$in_footer
		);
	}

	/**
	 * Enqueue script using handle.
	 *
	 * @since 1.0.0
	 *
	 * @param string $script_handle Handle of script.
	 * @param array  $script_dependencies Array of extra dependencies.
	 *
	 * @return void
	 */
	public function enqueue_script_asset( string $script_handle, array $script_dependencies = [] ) {
		$this->register_script_asset( $script_handle, $script_dependencies );
		$this->enqueue_script( $script_handle );
	}

	/**
	 * Register style using handle.
	 *
	 * @since 1.0.0
	 *
	 * @param string $style_handle Handle of style.
	 * @param array  $style_dependencies Array of extra dependencies.
	 *
	 * @return void
	 */
	public function register_style_asset( string $style_handle, array $style_dependencies = [] ) {
		if ( isset( $this->register_styles[ $style_handle ] ) ) {
			return;
		}

		$base_style_path = $this->get_base_url( 'assets/css/' );

		$this->register_style(
			$style_handle,
			$base_style_path . $style_handle . '.css',
			$style_dependencies,
			ELMI_PANEL_VERSION
		);

		wp_style_add_data( $style_handle, 'rtl', 'replace' );
	}

	/**
	 * Enqueue style using handle.
	 *
	 * @since 1.0.0
	 *
	 * @param string $style_handle Handle of style.
	 * @param array  $style_dependencies Array of extra dependencies.
	 *
	 * @return void
	 */
	public function enqueue_style_asset( string $style_handle, array $style_dependencies = [] ) {
		$this->register_style_asset( $style_handle, $style_dependencies );
		$this->enqueue_style( $style_handle );
	}

	/**
	 * Register a CSS stylesheet.
	 *
	 * @since 1.0.0
	 *
	 * @param string           $style_handle Name of the stylesheet. Should be unique.
	 * @param string|bool      $src    Full URL of the stylesheet, or path of the stylesheet relative to the WordPress root directory.
	 *                                 If source is set to false, stylesheet is an alias of other stylesheets it depends on.
	 * @param string[]         $deps   Optional. An array of registered stylesheet handles this stylesheet depends on. Default empty array.
	 * @param string|bool|null $ver    Optional. String specifying stylesheet version number, if it has one, which is added to the URL
	 *                                 as a query string for cache busting purposes. If version is set to false, a version
	 *                                 number is automatically added equal to current installed WordPress version.
	 *                                 If set to null, no version is added.
	 * @param string           $media  Optional. The media for which this stylesheet has been defined.
	 *                                 Default 'all'. Accepts media types like 'all', 'print' and 'screen', or media queries like
	 *                                 '(orientation: portrait)' and '(max-width: 640px)'.
	 * @return bool Whether the style has been registered. True on success, false on failure.
	 */
	public function register_style( string $style_handle, $src, array $deps = [], $ver = false, string $media = 'all' ): bool {
		if ( ! isset( $this->register_styles[ $style_handle ] ) ) {
			$this->register_styles[ $style_handle ] = wp_register_style( $style_handle, $src, $deps, $ver, $media );
		}

		return $this->register_styles[ $style_handle ];
	}

	/**
	 * Register a new script.
	 *
	 * @since 1.0.0
	 *
	 * @param string           $script_handle    Name of the script. Should be unique.
	 * @param string|bool      $src       Full URL of the script, or path of the script relative to the WordPress root directory.
	 *                                    If source is set to false, script is an alias of other scripts it depends on.
	 * @param string[]         $deps      Optional. An array of registered script handles this script depends on. Default empty array.
	 * @param string|bool|null $ver       Optional. String specifying script version number, if it has one, which is added to the URL
	 *                                    as a query string for cache busting purposes. If version is set to false, a version
	 *                                    number is automatically added equal to current installed WordPress version.
	 *                                    If set to null, no version is added.
	 * @param bool             $in_footer Optional. Whether to enqueue the script before </body> instead of in the <head>.
	 *                                    Default 'false'.
	 * @return bool Whether the script has been registered. True on success, false on failure.
	 */
	public function register_script( string $script_handle, $src, array $deps = [], $ver = false, bool $in_footer = false ): bool {
		if ( ! isset( $this->register_scripts[ $script_handle ] ) ) {
			$this->register_scripts[ $script_handle ] = wp_register_script( $script_handle, $src, $deps, $ver, $in_footer );

			if ( $src ) {
				wp_set_script_translations( $script_handle, 'elmi-panel' );
			}
		}

		return $this->register_scripts[ $script_handle ];
	}

	/**
	 * Enqueue a style.
	 *
	 * @since 1.0.0
	 *
	 * @param string           $style_handle Name of the stylesheet. Should be unique.
	 * @param string           $src    Full URL of the stylesheet, or path of the stylesheet relative to the WordPress root directory.
	 *                                 Default empty.
	 * @param string[]         $deps   Optional. An array of registered stylesheet handles this stylesheet depends on. Default empty array.
	 * @param string|bool|null $ver    Optional. String specifying stylesheet version number, if it has one, which is added to the URL
	 *                                 as a query string for cache busting purposes. If version is set to false, a version
	 *                                 number is automatically added equal to current installed WordPress version.
	 *                                 If set to null, no version is added.
	 * @param string           $media  Optional. The media for which this stylesheet has been defined.
	 *                                 Default 'all'. Accepts media types like 'all', 'print' and 'screen', or media queries like
	 *                                 '(orientation: portrait)' and '(max-width: 640px)'.
	 * @return void
	 */
	public function enqueue_style( string $style_handle, string $src = '', array $deps = [], $ver = false, string $media = 'all' ) {
		$this->register_style( $style_handle, $src, $deps, $ver, $media );
		wp_enqueue_style( $style_handle, $src, $deps, $ver, $media );
	}

	/**
	 * Enqueue a script.
	 *
	 * @since 1.0.0
	 *
	 * @param string           $script_handle    Name of the script. Should be unique.
	 * @param string           $src       Full URL of the script, or path of the script relative to the WordPress root directory.
	 *                                    Default empty.
	 * @param string[]         $deps      Optional. An array of registered script handles this script depends on. Default empty array.
	 * @param string|bool|null $ver       Optional. String specifying script version number, if it has one, which is added to the URL
	 *                                    as a query string for cache busting purposes. If version is set to false, a version
	 *                                    number is automatically added equal to current installed WordPress version.
	 *                                    If set to null, no version is added.
	 * @param bool             $in_footer Optional. Whether to enqueue the script before </body> instead of in the <head>.
	 *                                    Default 'false'.
	 * @return void
	 */
	public function enqueue_script( string $script_handle, string $src = '', array $deps = [], $ver = false, bool $in_footer = false ) {
		$this->register_script( $script_handle, $src, $deps, $ver, $in_footer );
		wp_enqueue_script( $script_handle, $src, $deps, $ver, $in_footer );
	}

	/**
	 * Remove admin styles.
	 *
	 * @since 1.0.0
	 *
	 * @param array $styles Array to style to be removed.
	 *
	 * @return void
	 */
	public function remove_admin_style( array $styles ) {
		wp_styles()->registered['wp-admin']->deps = array_diff( wp_styles()->registered['wp-admin']->deps, $styles );
	}
}
