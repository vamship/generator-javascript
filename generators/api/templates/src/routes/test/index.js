'use strict';

const {
    args: _argErrors,
    data: _dataErrors,
    http: _httpErrors,
} = require('@vamship/error-types');
const { Router } = require('express');

const { SchemaError } = _argErrors;
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
} = _httpErrors;
const { DuplicateRecordError, ConcurrencyControlError } = _dataErrors;

/**
 * Configures and returns a set of routes based on a list of declarative route
 * definitions.
 *
 * @module routes
 */
const router = Router();
router.get('/error/:type', (req, res, next) => {
    const errorType = req.params.type;
    switch (errorType.toLowerCase()) {
        case 'badrequest':
            next(new BadRequestError());
            break;
        case 'notfound':
            next(new NotFoundError());
            break;
        case 'unauthorized':
            next(new UnauthorizedError());
            break;
        case 'forbidden':
            next(new ForbiddenError());
            break;
        case 'schema':
            next(new SchemaError());
            break;
        case 'duplicaterecord':
            next(new DuplicateRecordError());
            break;
        case 'concurrencycontrol':
            next(new ConcurrencyControlError());
            break;
        case 'error':
        default:
            next(new Error());
    }
});

module.exports = router;
