'use strict';

const routeDefinitions = [
    {
        method: 'GET',
        path: '/',
        handler: () => ({ status: 'ok' }),
        inputMapper: () => ({})
    }
];

module.exports = routeDefinitions;
