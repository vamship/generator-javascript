#!/usr/bin/env node
'use strict';

const _configProvider = require('@vamship/config');
const _loggerProvider = require('@vamship/logger');
const _yargs = require('yargs');

const config = _configProvider
    .configure('<%= projectCamelCasedName %>')
    .setApplicationScope(process.env.NODE_ENV)
    .getConfig();

_loggerProvider.configure('<%= projectName %>', {
    extreme: config.get('log.extremeLogging'),
    destination: 'process.stderr',
    level: config.get('log.level')
});
const _logger = _loggerProvider.getLogger('main');

_logger.trace('Logger initialized');

const argv = _yargs
    .usage('Usage $0 <command> <sub commands> <options>')
    .commandDir('../src/commands')
    .demandCommand()
    .help()
    .wrap(_yargs.terminalWidth()).argv;

_logger.trace('Input arguments', argv);
