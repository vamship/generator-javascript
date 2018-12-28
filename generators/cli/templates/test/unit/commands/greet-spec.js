'use strict';

const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;

const _sinon = require('sinon');

const { consoleHelper: _consoleHelper } = require('@vamship/test-utils');
const { Promise } = require('bluebird');
const command = require('../../../src/commands/greet');

describe('greet', () => {
    function _execHandler(args, noMute) {
        args = Object.assign({}, args);

        if (!noMute) {
            _consoleHelper.mute();
        }
        return Promise.try(() => {
            return command.handler(args);
        }).finally(() => {
            if (!noMute) {
                _consoleHelper.unmute();
            }
        });
    }

    describe('[init]', () => {
        it('should export properties required by the command', () => {
            const expectedCommand = 'greet';
            const expectedDescription = 'Print greeting message';
            const expectedBuilder = {};

            expect(command.command).to.equal(expectedCommand);
            expect(command.describe).to.equal(expectedDescription);
            expect(command.builder).to.deep.equal(expectedBuilder);
            expect(command.handler).to.be.a('function');
        });
    });

    describe('[execution]', () => {
        it('should return a promise when invoked', () => {
            const ret = _execHandler({});

            expect(ret).to.be.an('object');
            expect(ret.then).to.be.a('function');

            return ret;
        });

        it('should print a greeting message', () => {
            const stub = _sinon.stub(console, 'log');

            stub.resetHistory();
            const ret = _execHandler({}, true);

            return Promise.resolve()
                .then(() => {
                    return expect(ret).to.be.fulfilled;
                })
                .then(() => {
                    expect(stub).to.have.been.calledOnce;
                    expect(stub).to.have.been.calledWithExactly('Hello!');
                })
                .finally(() => {
                    stub.restore();
                });
        });
    });
});
