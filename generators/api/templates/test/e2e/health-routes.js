'use strict';

const _chai = require('chai');
const _chaiAsPromised = require('chai-as-promised');
const _chaiHttp = require('chai-http');
const _sinonChai = require('sinon-chai');

_chai.use(_chaiAsPromised);
_chai.use(_sinonChai);
_chai.use(_chaiHttp);
const { expect, request } = _chai;

const {
    endpoint,
    getRouteBuilder: _getRouteBuilder
} = require('../utils/api-utils');

describe('[/health routes]', () => {
    const _buildRoute = _getRouteBuilder('/health');

    describe('GET /health', () => {
        it('should return a valid JSON response when invoked', () => {
            const path = _buildRoute();
            return request(endpoint)
                .get(path)
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.header['content-type']).to.match(
                        /^application\/json/
                    );
                    expect(res.body).to.deep.equal({
                        status: 'ok'
                    });
                });
        });
    });
});
