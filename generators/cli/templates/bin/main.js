#!/usr/bin/env node
'use strict';

const _loggerProvider = require('@vamship/logger');
const _yargs = require('yargs');

_loggerProvider.configure('<%= projectName %>', {
    extreme: process.env.EXTREME_LOGGING === 'true',
    destination: 'process.stderr',
    level: process.env.LOG_LEVEL || 'info'
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
