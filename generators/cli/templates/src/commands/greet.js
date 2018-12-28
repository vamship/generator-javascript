'use strict';

const Promise = require('bluebird');

/**
 * Sub command to show a greeting message
 */

module.exports.command = 'greet';
module.exports.describe = 'Print greeting message';
module.exports.builder = {};
module.exports.handler = (argv) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // eslint-disable-next-line no-console
            console.log('Hello!');

            resolve();
        }, 100);
    });
};
