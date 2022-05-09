<?php
/**
 * InvalidService final class.
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

namespace Sherv\Elmi_Panel\Exception;

use InvalidArgumentException;

/**
 * InvalidService final class.
 *
 * @since 1.0.0
 */
final class InvalidService
	extends InvalidArgumentException
	implements ElmiPanelException {

	/**
	 * Create a new instance of the exception for a service class name that is
	 * not recognized.
	 *
	 * @since 1.0.0
	 *
	 * @param string|object $service Class name of the service that was not
	 *                               recognized.
	 * @return static
	 */
	public static function from_service( $service ) {
		$message = \sprintf(
			'The service "%s" is not recognized and cannot be registered.',
			\is_object( $service )
				? \get_class( $service )
				: (string) $service
		);

		return new static( $message );
	}

	/**
	 * Create a new instance of the exception for a service identifier that is
	 * not recognized.
	 *
	 * @since 1.0.0
	 *
	 * @param string $service_id Identifier of the service that is not being
	 *                           recognized.
	 * @return static
	 */
	public static function from_service_id( string $service_id ) {
		$message = \sprintf(
			'The service ID "%s" is not recognized and cannot be retrieved.',
			$service_id
		);

		return new static( $message );
	}
}
