import _debug from 'debug';
import { argValidator } from '@vamship/arg-utils';

const APP_NAME = require('../../../package.json').name;
const LOG_METHODS = [
    { method: 'silly', color: '#CA2CCF' },
    { method: 'trace', color: '#6700CF' },
    { method: 'debug', color: '#05BD35' },
    { method: 'info', color: '#2B98CE' },
    { method: 'warn', color: '#FA7D12' },
    { method: 'error', color: '#E21515' }
];

let _logLevel = 1;
localStorage.debug = `${APP_NAME}:*`;

/**
 * Sets the current log level for all loggers. If an invalid level is specified,
 * the log level will remain unchanged.
 *
 * @param {String} level The log level to set. Must be one of the supported log
 *        levels.
 */
export function setLogLevel(level) {
    argValidator.checkString(level, 1, 'Invalid log level (arg #1)');
    const index = LOG_METHODS.indexOf((item) => item.method === level);
    if (index >= 0) {
        _logLevel = level;
    }
}

/**
 * Returns a reference to a logger method, namespaced to a specific component
 * or class.
 *
 * @param {String} namespace The namespace of the logger component.
 * @return {Object} A logger object with log methods at different levels.
 */
export function getLogger(namespace) {
    argValidator.checkString('namespace', 1, 'Invalid namespace (arg #1)');
    return LOG_METHODS.reduce((logger, methodInfo, index) => {
        const { method, color } = methodInfo;

        const logMethod = _debug(`${APP_NAME}:${namespace} [${method}]`);
        logMethod.color = color;

        logger[method] = (...args) => {
            if (index >= _logLevel) {
                logMethod(...args);
            }
        };

        return logger;
    }, {});
}
