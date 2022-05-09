<?php
/**
 * Simple_Service_Container final class.
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

namespace Sherv\Elmi_Panel\Infrastructure\Service_Container;

use Sherv\Elmi_Panel\Infrastructure\Service_Container;
use Sherv\Elmi_Panel\Infrastructure\Service;
use Sherv\Elmi_Panel\Exception\InvalidService;
use ArrayObject;

/**
 * A simplified implementation of a service container.
 *
 * We extend ArrayObject so we have default implementations for iterators and
 * array access.
 *
 * @since 1.0.0
 */
final class Simple_Service_Container extends ArrayObject implements Service_Container {

	/**
	 * Find a service of the container by its identifier and return it.
	 *
	 * @since 1.0.0
	 *
	 * @param string $id Identifier of the service to look for.
	 *
	 * @throws InvalidService If the service could not be found.
	 *
	 * @return Service Service that was requested.
	 */
	public function get( string $id ): Service {
		if ( ! $this->has( $id ) ) {
			throw InvalidService::from_service_id( $id );
		}

		$service = $this->offsetGet( $id );

		// Instantiate actual services if they were stored lazily.
		if ( $service instanceof Lazily_Instantiated_Service ) {
			$service = $service->instantiate();
			$this->put( $id, $service );
		}

		return $service;
	}

	/**
	 * Check whether the container can return a service for the given
	 * identifier.
	 *
	 * @since 1.0.0
	 *
	 * @param string $id Identifier of the service to look for.
	 *
	 * @return bool
	 */
	public function has( string $id ): bool {
		return $this->offsetExists( $id );
	}

	/**
	 * Put a service into the container for later retrieval.
	 *
	 * @since 1.0.0
	 *
	 * @param string  $id      Identifier of the service to put into the
	 *                         container.
	 * @param Service $service Service to put into the container.
	 */
	public function put( string $id, Service $service ) {
		$this->offsetSet( $id, $service );
	}
}
