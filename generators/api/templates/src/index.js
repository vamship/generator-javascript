'use strict';

const loggerProvider = require('@vamship/logger');
const express = require('express');

/**
 * @module app
 */
const logger = loggerProvider
    .configure('<%= projectName %>', {
        extreme: (config.get('log.extremeLogging') || '').toString() === 'true',
        level: config.get('log.level')
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

const port = parseInt(process.env.PORT || '');
logger.info({ port }, 'Port configuration');

logger.trace('Launching web server');
app.listen(port, () => {
    logger.info({ port }, 'Server started');
});
