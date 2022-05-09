<?php
/**
 * Plugin_Activation interface.
 *
 * @package   Sherv/Elmi_Panel
 * @license   MIT
 * @link      https://www.mwpd.io/
 * @copyright 2019 Alain Schlesser
 */

/**
 * Original code modified for this project.
 *
 * @copyright 2022 Sherv Elmi
 * @license   GNU General Public License 3.0
 */

namespace Sherv\Elmi_Panel\Infrastructure;

/**
 * Something that can be activated.
 *
 * By tagging a service with this interface, the system will automatically hook
 * it up to the WordPress activation hook.
 *
 * This way, we can just add the simple interface marker and not worry about how
 * to wire up the code to reach that part during the static activation hook.
 *
 * @since 1.0.0
 */
interface Plugin_Activation {

	/**
	 * Do something on plugin activation.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function on_plugin_activation();
}
