'use strict';

const routeDefinitions = [
    {
        method: 'GET',
        path: '/',
        handler: () => ({ status: 'ok' }),
        inputMapper: () => ({}),
    },
    {
        method: 'GET',
        path: '/ready',
        handler: () => ({ status: 'ok' }),
        inputMapper: () => ({}),
    },
];

module.exports = routeDefinitions;
