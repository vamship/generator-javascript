'use strict';

const { buildRoutes } = require('@vamship/expressjs-routes');
const routeDefinitions = require('./route-definitions');

/**
 * Configures and returns a set of routes based on a list of declarative route
 * definitions.
 *
 * @module routes
 */
const router = buildRoutes(routeDefinitions);

module.exports = router;
