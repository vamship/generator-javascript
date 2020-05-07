'use strict';

const _chai = require('chai');
const _chaiAsPromised = require('chai-as-promised');
const _chaiHttp = require('chai-http');
const _sinonChai = require('sinon-chai');

_chai.use(_chaiAsPromised);
_chai.use(_sinonChai);
_chai.use(_chaiHttp);
const { expect, request } = _chai;

const { testValues: _testValues } = require('@vamship/test-utils');
const {
    endpoint,
    getRouteBuilder: _getRouteBuilder,
} = require('../utils/api-utils');

describe('[core routes]', () => {
    const _buildRoute = _getRouteBuilder('/__test__');

    describe('[Bad Requests]', () => {
        it('should return a 400 if the handler throws a BadRequestError', () => {
            const path = _buildRoute('error/badrequest');
            return request(endpoint)
                .get(path)
                .then((res) => {
                    expect(res.status).to.equal(400);
                    expect(res.header['content-type']).to.match(
                        /^application\/json/
                    );
                    expect(res.body).to.deep.equal({
                        error:
                            '[BadRequestError] Incorrect or malformed request',
                    });
                    expect(res.error).to.exist;
                });
        });

        it('should return a 400 if the handler throws a SchemaError', () => {
            const path = _buildRoute('error/schema');
            return request(endpoint)
                .get(path)
                .then((res) => {
                    expect(res.status).to.equal(400);
                    expect(res.header['content-type']).to.match(
                        /^application\/json/
                    );
                    expect(res.body).to.deep.equal({
                        error:
                            '[BadRequestError] [SchemaError] Schema validation failed',
                    });
                    expect(res.error).to.exist;
                });
        });
    });

    describe('[Conflict Error Requests]', () => {
        it('should return a 409 if the handler throws a DuplicateRecordError', () => {
            const path = _buildRoute('error/duplicaterecord');
            return request(endpoint)
                .get(path)
                .then((res) => {
                    expect(res.status).to.equal(409);
                    expect(res.header['content-type']).to.match(
                        /^application\/json/
                    );
                    expect(res.body).to.deep.equal({
                        error: '[DuplicateRecordError] Duplicate record error',
                    });
                    expect(res.error).to.exist;
                });
        });

        it('should return a 409 if the handler throws a ConcurrencyControlError', () => {
            const path = _buildRoute('error/concurrencycontrol');
            return request(endpoint)
                .get(path)
                .then((res) => {
                    expect(res.status).to.equal(409);
                    expect(res.header['content-type']).to.match(
                        /^application\/json/
                    );
                    expect(res.body).to.deep.equal({
                        error:
                            '[ConcurrencyControlError] Concurrency check failed',
                    });
                    expect(res.error).to.exist;
                });
        });
    });

    describe('[Unauthorized Requests]', () => {
        it('should return a 401 if the handler throws an UnauthorizedError', () => {
            const path = _buildRoute('error/unauthorized');
            return request(endpoint)
                .get(path)
                .then((res) => {
                    expect(res.status).to.equal(401);
                    expect(res.header['content-type']).to.match(
                        /^application\/json/
                    );
                    expect(res.body).to.deep.equal({
                        error: '[UnauthorizedError] Authorization failed',
                    });
                    expect(res.error).to.exist;
                });
        });
    });

    describe('[Forbidden Requests]', () => {
        it('should return a 403 if the handler throws a ForbiddenError', () => {
            const path = _buildRoute('error/forbidden');
            return request(endpoint)
                .get(path)
                .then((res) => {
                    expect(res.status).to.equal(403);
                    expect(res.header['content-type']).to.match(
                        /^application\/json/
                    );
                    expect(res.body).to.deep.equal({
                        error:
                            '[ForbiddenError] Access to this resource is forbidden',
                    });
                    expect(res.error).to.exist;
                });
        });
    });

    describe('[Not Found Requests]', () => {
        it('should return a 404 if the handler throws a NotFoundError', () => {
            const path = _buildRoute('error/notfound');
            return request(endpoint)
                .get(path)
                .then((res) => {
                    expect(res.status).to.equal(404);
                    expect(res.header['content-type']).to.match(
                        /^application\/json/
                    );
                    expect(res.body).to.deep.equal({
                        error: '[NotFoundError] Resource not found',
                    });
                    expect(res.error).to.exist;
                });
        });

        it('should return a 404 for nonexistent paths', () => {
            const path = _buildRoute(_testValues.getString('badPath'));

            return request(endpoint)
                .get(path)
                .then((res) => {
                    expect(res.status).to.equal(404);
                    expect(res.header['content-type']).to.match(
                        /^application\/json/
                    );
                    expect(res.body).to.deep.equal({
                        error: '[NotFoundError] Resource not found',
                    });
                    expect(res.error).to.exist;
                });
        });
    });

    describe('[Catch All Errors]', () => {
        it('should return a 500 if the handler throws a generic error', () => {
            const path = _buildRoute('error/error');
            return request(endpoint)
                .get(path)
                .then((res) => {
                    expect(res.status).to.equal(500);
                    expect(res.header['content-type']).to.match(
                        /^application\/json/
                    );
                    expect(res.body).to.deep.equal({
                        error: 'Internal server error',
                    });
                    expect(res.error).to.exist;
                });
        });
    });
});
