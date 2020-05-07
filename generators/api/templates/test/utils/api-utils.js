'use strict';

/**
 * The endpoint of the test server.
 */
module.exports.endpoint = `http://localhost:${process.env.PORT}`;

/**
 * Returns a route builder function prefixes any path with a mount point. The
 * mount point can be thought of: a base path that is prefixed to a relative
 * path, resulting in a "true" path on the server.
 *
 * @param mountPath The mount point for the path
 *
 * @returns A function that accepts a relative url, and returns a full path to
 *          a resource on the server.
 */
module.exports.getRouteBuilder = (mountPath) => {
    const baseTokens = mountPath.split('/').filter((token) => !!token);

    /**
     * Returns a path prefixed with the mount path.
     *
     * @param path An optional string that defaults to an empty string.
     *
     * @returns A full path to a resource.
     */
    return (path) => {
        path = path || '';
        const pathTokens = path.split('/').filter((token) => !!token);
        return `/${baseTokens.concat(pathTokens).join('/')}`;
    };
};
