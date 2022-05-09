<?php
/**
 * Admin class.
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

namespace Sherv\Elmi_Panel\Admin;

use WP_Screen;
use Sherv\Elmi_Panel\Traits\{Str, Screen};
use Sherv\Elmi_Panel\Infrastructure\{Service, Registerable, Delayed};

/**
 * Admin class.
 *
 * @since 1.0.0
 */
final class Admin implements Service, Registerable, Delayed {
	use Str;
	use Screen;

	/**
	 * Get the action to use for registering the service.
	 *
	 * @since 1.0.0
	 *
	 * @return string  Registration action to use.
	 */
	public static function get_registration_action(): string {
		return 'admin_init';
	}

	/**
	 * Get the action priority to use for registering the service.
	 *
	 * @since 1.0.0
	 *
	 * @return int Registration action priority to use.
	 */
	public static function get_registration_action_priority(): int {
		return 10;
	}

	/**
	 * Initialize admin-related functionality.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register() {
		add_filter( 'admin_body_class', [ $this, 'admin_body_class' ], 99 );
	}

	/**
	 * Filter the list of admin classes.
	 *
	 * @since 1.0.0
	 *
	 * @param string|mixed $class Current classes.
	 *
	 * @return string|mixed $class List of Classes.
	 */
	public function admin_body_class( $class ) {
		$screen = $this->get_current_screen();

		if ( ! $screen ) {
			return $class;
		}

		if ( ! $this->is_elmi_panel_admin_page( $screen ) ) {
			return;
		}

		$class .= ' elmi-panel-page';

		return $class;
	}

	/**
	 * Check if the current screen is Elmi Panel admin page.
	 *
	 * @since 1.0.0
	 *
	 * @return bool
	 */
	public function is_elmi_panel_admin_page( WP_Screen $screen = null ) {
		if ( null === $screen ) {
			$screen = $this->get_current_screen();
		}

		if ( ! $screen ) {
			return false;
		}

		if ( ! $this->str_contains( $screen->id, Dashboard::PAGE_SLUG ) ) {
			return false;
		}

		return true;
	}
}
