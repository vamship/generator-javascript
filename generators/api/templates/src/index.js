'use strict';

const configProvider = require('@vamship/config');
const loggerProvider = require('@vamship/logger');
const express = require('express');

/**
 * @module app
 */

const config = configProvider
    .configure('<%= projectCamelCasedName %>')
    .setApplicationScope(process.env.NODE_ENV)
    .getConfig();

const logger = loggerProvider
    .configure('<%= projectName %>', {
        extreme: (config.get('log.extremeLogging') || '').toString() === 'true',
        level: config.get('app.logLevel')
    })
    .getLogger('main');

logger.trace('Logger initialized');
logger.trace('Application configuration', {
    app: config.get('app')
});

// ---------- Application Initialization ----------
const routes = require('./routes');

logger.trace('Initializing application');
const app = express();

logger.trace('Registering routes and handlers');
routes.setup(app);

// ---------- Start web server ----------
logger.trace('Extracting port from environment');
let port = process.env.PORT;

if (!port) {
    port = config.get('app.defaultPort');
    logger.info('Using default port from config', {
        port
    });
} else {
    logger.info('Using port from environment', {
        port
    });
}

logger.trace('Launching web server');
app.listen(port, () => {
    logger.info('Server listening on port', {
        port
    });
});
