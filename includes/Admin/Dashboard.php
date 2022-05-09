<?php
/**
 * Dashboard class.
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

use Sherv\Elmi_Panel\Traits\Screen;
use Sherv\Elmi_Panel\Infrastructure\{Service, Registerable};
use Sherv\Elmi_Panel\Assets;
use Sherv\Elmi_Panel\Admin\Google_Fonts;

/**
 * Dashboard class.
 *
 * @since 1.0.0
 */
class Dashboard implements Service, Registerable {
	use Screen;

	/**
	 * The slug of the elmi panel dashboard.
	 *
	 * @var string
	 */
	const PAGE_SLUG = 'elmi-panel-dashboard';

	/**
	 * Script handle.
	 *
	 * @var string
	 */
	const SCRIPT_HANDLE = 'wp-dashboard';

	/**
	 * Admin page hook suffixes.
	 *
	 * @var array List of the admin page's hook_suffix values.
	 */
	private $hook_suffix = [];

	/**
	 * Google_Fonts instance.
	 *
	 * @var Google_Fonts Google_Fonts instance.
	 */
	private $google_fonts;

	/**
	 * Assets instance.
	 *
	 * @var Assets Assets instance.
	 */
	private $assets;

	/**
	 * Dashboard constructor.
	 *
	 * @since 1.0.0
	 *
	 * @param Google_Fonts $google_fonts Google_Fonts instance.
	 * @param Assets       $assets       Assets instance.
	 */
	public function __construct( Google_Fonts $google_fonts, Assets $assets ) {
		$this->google_fonts = $google_fonts;
		$this->assets       = $assets;
	}

	/**
	 * Initializes the dashboard logic.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'admin_menu', [ $this, 'add_menu_page' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
	}

	/**
	 * Returns the admin page's hook suffix.
	 *
	 * @since 1.0.0
	 *
	 * @param string $key The current admin page key.
	 *
	 * @return string|false|null The dashboard page's hook_suffix, or false if
	 *                               the user does not have the capability required.
	 */
	public function get_hook_suffix( $key ) {
		return $this->hook_suffix[ $key ] ?? false;
	}

	/**
	 * Registers the dashboard admin menu page.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function add_menu_page() {
		add_menu_page(
			__( 'Elmi Panel', 'elmi-panel' ),
			__( 'Elmi Panel', 'elmi-panel' ),
			'edit_elmi-panel',
			self::PAGE_SLUG,
			[ $this, 'render' ],
			'dashicons-cart',
			25
		);

		$this->hook_suffix[ self::PAGE_SLUG ] = add_submenu_page(
			self::PAGE_SLUG,
			__( 'Dashboard', 'elmi-panel' ),
			__( 'Dashboard', 'elmi-panel' ),
			'edit_elmi-panel',
			self::PAGE_SLUG,
			[ $this, 'render' ],
			1
		);

		$this->hook_suffix[ self::PAGE_SLUG . '-facebook' ] = add_submenu_page(
			self::PAGE_SLUG,
			__( 'Facebook Pixel', 'elmi-panel' ),
			__( 'Facebook Pixel', 'elmi-panel' ),
			'edit_elmi-panel',
			self::PAGE_SLUG . '#/facebook-pixel',
			'__return_null',
			1
		);
	}

	/**
	 * Renders the dashboard page.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function render() {
		require_once ELMI_PANEL_PATH . 'includes/templates/admin/dashboard.php';
	}

	/**
	 * Enqueues dashboard scripts and styles.
	 *
	 * @since 1.0.0
	 *
	 * @param string $hook_suffix The current admin page.
	 *
	 * @return void
	 */
	public function enqueue_assets( $hook_suffix ) {
		if ( $this->get_hook_suffix( self::PAGE_SLUG ) !== $hook_suffix ) {
			return;
		}

		$this->assets->enqueue_script_asset( 'vendors-' . self::SCRIPT_HANDLE );
		$this->assets->enqueue_script_asset( self::SCRIPT_HANDLE );

		$this->assets->enqueue_style_asset( self::SCRIPT_HANDLE );

		wp_localize_script(
			self::SCRIPT_HANDLE,
			'elmiPanelDashboardSettings',
			$this->get_dashboard_settings()
		);

		$this->assets->remove_admin_style( [ 'forms' ] );
	}

	/**
	 * Get dashboard settings as an array.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	public function get_dashboard_settings(): array {
		$settings = [
			'dashboardUrl' => admin_url( 'admin.php?page=' . self::PAGE_SLUG ),
			'version'      => ELMI_PANEL_VERSION,
			'assetsUrl'    => $this->assets->get_base_url( 'assets' ),
			'isRTL'        => is_rtl(),
			'userId'       => get_current_user_id(),
			'capabilities' => [
				'canManageSettings' => current_user_can( 'manage_options' ),
				'canUploadFiles'    => current_user_can( 'upload_files' ),
			],
		];

		/**
		 * Filters settings passed to the elmi panel dashboard.
		 *
		 * @since 1.0.0
		 *
		 * @param array $settings Array of settings passed to elmi panel dashboard.
		 */
		return apply_filters( 'elmi_panel_dashboard_settings', $settings );
	}
}
