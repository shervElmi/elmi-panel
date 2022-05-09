<?php
/**
 * Delayed interface.
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
 * Something that is delayed to a later point in the execution flow.
 *
 * A class marked as being delayed can return the action at which it requires
 * to be registered.
 *
 * This can be used to only register a given object after certain contextual
 * requirements are met, like registering a frontend rendering service only
 * after the loop has been set up.
 *
 * @since 1.0.0
 */
interface Delayed {

	/**
	 * Get the action to use for registering the service.
	 *
	 * @since 1.0.0
	 *
	 * @return string Registration action to use.
	 */
	public static function get_registration_action(): string;

	/**
	 * Get the action priority to use for registering the service.
	 *
	 * @since 1.0.0
	 *
	 * @return int Registration action priority to use.
	 */
	public static function get_registration_action_priority(): int;
}
